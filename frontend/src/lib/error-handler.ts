/**
 * Enhanced error handling system
 */

import type { 
  AppError, 
  ErrorContext, 
  ErrorSeverity, 
  LogLevel, 
  LogEntry, 
  Logger,
  ErrorMetrics,
  ErrorNotification,
} from '../types/errors'

class ErrorHandler implements Logger {
  private errors: AppError[] = []
  private logs: LogEntry[] = []
  private maxErrors = 100
  private maxLogs = 1000
  private context: Partial<ErrorContext> = {}
  private notifications: ErrorNotification[] = []

  constructor() {
    this.setupGlobalErrorHandlers()
  }

  /**
   * Set global error context
   */
  setContext(context: Partial<ErrorContext>): void {
    this.context = { ...this.context, ...context }
  }

  /**
   * Get current error context
   */
  getContext(): Partial<ErrorContext> {
    return { ...this.context }
  }

  /**
   * Handle an error
   */
  handle(error: Error, context?: Partial<ErrorContext>): void {
    const appError = this.normalizeError(error, context)
    this.errors.push(appError)
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors)
    }

    // Log the error
    this.error('Error handled', context)

    // Report to external service in production
    if (import.meta.env.PROD) {
      this.report(appError, context).catch(console.error)
    }

    // Show notification for high severity errors
    if (this.getErrorSeverity(appError) === 'critical') {
      this.showNotification({
        id: Math.random().toString(36).substr(2, 9),
        type: 'error',
        title: 'Critical Error',
        message: appError.message,
        severity: 'critical',
        timestamp: new Date().toISOString(),
        dismissed: false
      })
    }
  }

  /**
   * Report error to external service
   */
  async report(error: AppError, context?: Partial<ErrorContext>): Promise<void> {
    try {
      const errorData = {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: error.code
        },
        context: { ...this.context, ...context },
        timestamp: error.timestamp,
        userAgent: navigator.userAgent,
        url: window.location.href
      }

      // In a real application, you would send this to your error reporting service
      console.error('Error reported:', errorData)
      
      // Example: Send to external service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // })
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  /**
   * Clear all errors
   */
  clear(): void {
    this.errors = []
    this.logs = []
    this.notifications = []
  }

  /**
   * Get all errors
   */
  getErrors(): AppError[] {
    return [...this.errors]
  }

  /**
   * Get error count
   */
  getErrorCount(): number {
    return this.errors.length
  }

  /**
   * Get error metrics
   */
  getMetrics(): ErrorMetrics {
    const errorsByType: Record<string, number> = {}
    const errorsBySeverity: Record<ErrorSeverity, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    }
    const errorsByComponent: Record<string, number> = {}

    this.errors.forEach(error => {
      // Count by type
      errorsByType[error.name] = (errorsByType[error.name] || 0) + 1
      
      // Count by severity
      const severity = this.getErrorSeverity(error)
      errorsBySeverity[severity]++
      
      // Count by component (if available)
      if ('component' in error && error.component) {
        errorsByComponent[error.component] = (errorsByComponent[error.component] || 0) + 1
      }
    })

    return {
      totalErrors: this.errors.length,
      errorsByType,
      errorsBySeverity,
      errorsByComponent,
      lastErrorTime: this.errors[this.errors.length - 1]?.timestamp || new Date().toISOString(),
      errorRate: this.calculateErrorRate(),
      averageResolutionTime: 0,
    }
  }

  /**
   * Fatal error logging
   */
  fatal(message: string, data?: any): void {
    this.logEntry('error', message, data)
  }

  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  /**
   * Get notifications
   */
  getNotifications(): ErrorNotification[] {
    return [...this.notifications]
  }

  /**
   * Dismiss notification
   */
  dismissNotification(id: string): void {
    this.notifications = this.notifications.map(notification =>
      notification.id === id ? { ...notification, dismissed: true } : notification
    )
  }

  /**
   * Clear dismissed notifications
   */
  clearDismissedNotifications(): void {
    this.notifications = this.notifications.filter(notification => !notification.dismissed)
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handle(new Error(event.reason), {
        action: 'unhandledrejection',
        timestamp: new Date().toISOString()
      })
    })

    // Handle global errors
    window.addEventListener('error', (event) => {
      this.handle(event.error || new Error(event.message), {
        action: 'global-error',
        timestamp: new Date().toISOString()
      })
    })

    // Handle Vue errors (if Vue is available)
    if (typeof window !== 'undefined' && (window as any).Vue) {
      const Vue = (window as any).Vue
      Vue.config.errorHandler = (error: Error, instance: any) => {
        this.handle(error, {
          component: instance?.$options?.name || 'Unknown',
          action: 'vue-error',
          timestamp: new Date().toISOString()
        })
      }
    }
  }

  /**
   * Normalize error to AppError
   */
  private normalizeError(error: Error, context?: Partial<ErrorContext>): AppError {
    const baseError: AppError = {
      name: (error.name as any) || 'Error',
      message: error.message,
      timestamp: new Date().toISOString(),
      stack: error.stack || ''
    }

    // Add context information
    const fullContext = { ...this.context, ...context }
    if (fullContext.component) {
      (baseError as any).component = fullContext.component
    }
    if (fullContext.action) {
      (baseError as any).action = fullContext.action
    }

    return baseError
  }

  /**
   * Get error severity
   */
  private getErrorSeverity(error: AppError): ErrorSeverity {
    if (error.name === 'NetworkError' || error.name === 'ApiError') {
      return 'high'
    }
    if (error.name === 'ValidationError') {
      return 'medium'
    }
    if (error.name === 'CacheError') {
      return 'low'
    }
    return 'medium'
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(): number {
    const now = Date.now()
    const oneHourAgo = now - (60 * 60 * 1000)
    
    const recentErrors = this.errors.filter(error => {
      const errorTime = new Date(error.timestamp).getTime()
      return errorTime > oneHourAgo
    })

    return recentErrors.length / 60 // errors per minute
  }

  /**
   * Log entry
   */
  private logEntry(level: LogLevel, message: string, data?: any): void {
    const logEntry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      level,
      message,
      timestamp: Date.now(),
      component: this.context.component || 'unknown',
      source: 'error'
    }

    this.logs.push(logEntry)

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Console output based on level
    if (level === 'debug') {
      console.log(message, data)
    } else if (level === 'info') {
      console.info(message, data)
    } else if (level === 'warn') {
      console.warn(message, data)
    } else if (level === 'error') {
      console.error(message, data)
    } else {
      console.log(message, data)
    }
  }

  // Logger interface implementation
  log(message: string, data?: unknown): void {
    this.logEntry('info', message, data)
  }

  info(message: string, data?: unknown): void {
    this.logEntry('info', message, data)
  }

  warn(message: string, data?: unknown): void {
    this.logEntry('warn', message, data)
  }

  error(message: string, data?: unknown): void {
    this.logEntry('error', message, data)
  }

  debug(message: string, data?: unknown): void {
    this.logEntry('debug', message, data)
  }

  /**
   * Show notification
   */
  private showNotification(notification: ErrorNotification): void {
    this.notifications.push(notification)
    
    // Auto-dismiss after 5 seconds for non-critical errors
    if (notification.type !== 'error') {
      setTimeout(() => {
        this.dismissNotification(notification.id)
      }, 5000)
    }
  }
}

// Global error handler instance
export const errorHandler = new ErrorHandler()

// Export for use in components
export { ErrorHandler }
