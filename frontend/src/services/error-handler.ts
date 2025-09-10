import { ApiError } from './base-api'

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  timestamp?: Date
  userAgent?: string
  url?: string
}

export interface ErrorReport {
  id: string
  message: string
  stack?: string
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'api' | 'validation' | 'network' | 'runtime' | 'unknown'
  resolved: boolean
  createdAt: Date
  resolvedAt?: Date
}

export class ErrorHandler {
  private errors: ErrorReport[] = []
  private maxErrors = 100

  // Error categorization
  categorizeError(error: Error): ErrorReport['category'] {
    if (error instanceof ApiError) {
      return 'api'
    }
    
    if (error.name === 'ValidationError' || error.message.includes('validation')) {
      return 'validation'
    }
    
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      return 'network'
    }
    
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'runtime'
    }
    
    return 'unknown'
  }

  // Severity assessment
  assessSeverity(error: Error, context: ErrorContext): ErrorReport['severity'] {
    // Critical: API errors that break core functionality
    if (error instanceof ApiError && error.status >= 500) {
      return 'critical'
    }
    
    // High: API errors that affect user experience
    if (error instanceof ApiError && error.status >= 400) {
      return 'high'
    }
    
    // Medium: Runtime errors in components
    if (context.component && error.name === 'TypeError') {
      return 'medium'
    }
    
    // Low: Validation errors, network timeouts
    if (error.name === 'ValidationError' || error.message.includes('timeout')) {
      return 'low'
    }
    
    return 'medium'
  }

  // Generate user-friendly error messages
  getUserFriendlyMessage(error: Error): string {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input and try again.'
        case 401:
          return 'You are not authorized to perform this action.'
        case 403:
          return 'Access denied. You do not have permission to access this resource.'
        case 404:
          return 'The requested resource was not found.'
        case 408:
          return 'Request timeout. Please try again.'
        case 429:
          return 'Too many requests. Please wait a moment and try again.'
        case 500:
          return 'Server error. Please try again later.'
        case 502:
          return 'Service temporarily unavailable. Please try again later.'
        case 503:
          return 'Service maintenance in progress. Please try again later.'
        default:
          return 'An unexpected error occurred. Please try again.'
      }
    }
    
    if (error.name === 'ValidationError') {
      return 'Please check your input and try again.'
    }
    
    if (error.name === 'NetworkError') {
      return 'Network connection error. Please check your internet connection.'
    }
    
    if (error.name === 'TypeError') {
      return 'An unexpected error occurred. Please refresh the page and try again.'
    }
    
    return 'An unexpected error occurred. Please try again.'
  }

  // Log error
  logError(error: Error, context: ErrorContext = {}): ErrorReport {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: error.message,
      stack: error.stack || '',
      context: {
        ...context,
        timestamp: new Date(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        url: typeof window !== 'undefined' ? window.location.href : '',
      },
      severity: this.assessSeverity(error, context),
      category: this.categorizeError(error),
      resolved: false,
      createdAt: new Date()
    }

    // Add to errors array
    this.errors.unshift(errorReport)
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorReport)
    }

    // Send to external service in production
    if (import.meta.env.PROD) {
      this.sendToExternalService(errorReport)
    }

    return errorReport
  }

  // Generate unique error ID
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Send error to external service (implement based on your error tracking service)
  private async sendToExternalService(_errorReport: ErrorReport): Promise<void> {
    try {
      // Example: Send to Sentry, LogRocket, or custom error tracking service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // })
    } catch (err) {
      console.error('Failed to send error to external service:', err)
    }
  }

  // Get errors
  getErrors(): ErrorReport[] {
    return [...this.errors]
  }

  // Get errors by category
  getErrorsByCategory(category: ErrorReport['category']): ErrorReport[] {
    return this.errors.filter(error => error.category === category)
  }

  // Get errors by severity
  getErrorsBySeverity(severity: ErrorReport['severity']): ErrorReport[] {
    return this.errors.filter(error => error.severity === severity)
  }

  // Get unresolved errors
  getUnresolvedErrors(): ErrorReport[] {
    return this.errors.filter(error => !error.resolved)
  }

  // Mark error as resolved
  resolveError(errorId: string): void {
    const error = this.errors.find(e => e.id === errorId)
    if (error) {
      error.resolved = true
      error.resolvedAt = new Date()
    }
  }

  // Clear resolved errors
  clearResolvedErrors(): void {
    this.errors = this.errors.filter(error => !error.resolved)
  }

  // Clear all errors
  clearAllErrors(): void {
    this.errors = []
  }

  // Get error statistics
  getErrorStats(): {
    total: number
    unresolved: number
    byCategory: Record<string, number>
    bySeverity: Record<string, number>
  } {
    const stats = {
      total: this.errors.length,
      unresolved: this.getUnresolvedErrors().length,
      byCategory: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>
    }

    this.errors.forEach(error => {
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1
    })

    return stats
  }
}

// Global error handler instance
export const errorHandler = new ErrorHandler()

// Global error handler for unhandled errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorHandler.logError(event.error, {
      component: 'global',
      action: 'unhandled-error'
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    errorHandler.logError(new Error(event.reason), {
      component: 'global',
      action: 'unhandled-promise-rejection'
    })
  })
}
