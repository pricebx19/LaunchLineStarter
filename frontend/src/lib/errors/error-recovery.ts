/**
 * Error recovery strategies and implementations
 */

import type { 
  AppError, 
  ErrorRecoveryStrategy, 
  ErrorRecoveryConfig,
  ErrorContext
} from '../../types/errors'
import { 
  ApiErrorClass, 
  NetworkErrorClass, 
  ValidationErrorClass,
  isApiError,
  isNetworkError,
  isValidationError
} from './typed-errors'

// Error recovery strategies
export class ErrorRecoveryManager {
  private retryAttempts = new Map<string, number>()
  private readonly maxRetries = 3
  private readonly retryDelay = 1000

  /**
   * Determine the appropriate recovery strategy for an error
   */
  determineStrategy(error: AppError): ErrorRecoveryStrategy {
    if (isApiError(error)) {
      return this.getApiErrorStrategy(error)
    }
    
    if (isNetworkError(error)) {
      return this.getNetworkErrorStrategy(error)
    }
    
    if (isValidationError(error)) {
      return this.getValidationErrorStrategy(error)
    }

    // Default strategy for unknown errors
    return 'show-error'
  }

  /**
   * Get recovery strategy for API errors
   */
  private getApiErrorStrategy(error: ApiErrorClass): ErrorRecoveryStrategy {
    const status = error.status

    // Retry for server errors (5xx)
    if (status && status >= 500) {
      return 'retry'
    }

    // Retry for rate limiting (429)
    if (status === 429) {
      return 'retry'
    }

    // Retry for temporary network issues
    if (status === 0 || !status) {
      return 'retry'
    }

    // Show error for client errors (4xx)
    if (status && status >= 400 && status < 500) {
      return 'show-error'
    }

    return 'show-error'
  }

  /**
   * Get recovery strategy for network errors
   */
  private getNetworkErrorStrategy(error: NetworkErrorClass): ErrorRecoveryStrategy {
    // Retry for timeout errors
    if (error.timeout) {
      return 'retry'
    }

    // Retry for offline errors when connection is restored
    if (error.offline) {
      return 'retry'
    }

    // Show error for other network issues
    return 'show-error'
  }

  /**
   * Get recovery strategy for validation errors
   */
  private getValidationErrorStrategy(_error: ValidationErrorClass): ErrorRecoveryStrategy {
    // Show error for validation issues (user needs to fix input)
    return 'show-error'
  }

  /**
   * Execute recovery strategy
   */
  async executeRecovery(
    error: AppError,
    config: ErrorRecoveryConfig,
    context?: ErrorContext
  ): Promise<boolean> {
    const errorKey = this.getErrorKey(error, context)
    
    switch (config.strategy) {
      case 'retry':
        return this.handleRetry(error, config, errorKey)
      
      case 'fallback':
        return this.handleFallback(error, config)
      
      case 'ignore':
        return this.handleIgnore(error)
      
      case 'redirect':
        return this.handleRedirect(error, config)
      
      case 'reload':
        return this.handleReload(error)
      
      case 'show-error':
        return this.handleShowError(error, config)
      
      default:
        console.warn(`Unknown recovery strategy: ${config.strategy}`)
        return false
    }
  }

  /**
   * Handle retry strategy
   */
  private async handleRetry(
    error: AppError,
    config: ErrorRecoveryConfig,
    errorKey: string
  ): Promise<boolean> {
    const maxRetries = config.maxRetries || this.maxRetries
    const retryDelay = config.retryDelay || this.retryDelay
    const currentAttempts = this.retryAttempts.get(errorKey) || 0

    if (currentAttempts >= maxRetries) {
      console.warn(`Max retries (${maxRetries}) exceeded for error:`, error)
      this.retryAttempts.delete(errorKey)
      return false
    }

    this.retryAttempts.set(errorKey, currentAttempts + 1)

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, retryDelay * (currentAttempts + 1)))

    console.log(`Retrying operation (attempt ${currentAttempts + 1}/${maxRetries}):`, error)
    return true
  }

  /**
   * Handle fallback strategy
   */
  private handleFallback(error: AppError, config: ErrorRecoveryConfig): boolean {
    if (config.fallbackUrl) {
      window.location.href = config.fallbackUrl
      return true
    }

    if (config.fallbackComponent) {
      // This would be handled by the component system
      console.log(`Fallback to component: ${config.fallbackComponent}`)
      return true
    }

    console.warn('Fallback strategy specified but no fallback configured:', error)
    return false
  }

  /**
   * Handle ignore strategy
   */
  private handleIgnore(error: AppError): boolean {
    console.log('Ignoring error:', error)
    return true
  }

  /**
   * Handle redirect strategy
   */
  private handleRedirect(error: AppError, config: ErrorRecoveryConfig): boolean {
    if (config.fallbackUrl) {
      window.location.href = config.fallbackUrl
      return true
    }

    console.warn('Redirect strategy specified but no URL configured:', error)
    return false
  }

  /**
   * Handle reload strategy
   */
  private handleReload(error: AppError): boolean {
    console.log('Reloading page due to error:', error)
    window.location.reload()
    return true
  }

  /**
   * Handle show error strategy
   */
  private handleShowError(error: AppError, config: ErrorRecoveryConfig): boolean {
    if (config.showUserMessage !== false) {
      this.showUserErrorMessage(error)
    }

    if (config.logError !== false) {
      console.error('Error occurred:', error)
    }

    return true
  }

  /**
   * Show user-friendly error message
   */
  private showUserErrorMessage(error: AppError): void {
    const message = this.getUserFriendlyMessage(error)
    
    // This would integrate with your notification system
    // For now, we'll use a simple alert
    if (typeof window !== 'undefined') {
      // You could replace this with a toast notification or modal
      console.error('User Error:', message)
    }
  }

  /**
   * Get user-friendly error message
   */
  private getUserFriendlyMessage(error: AppError): string {
    if (isApiError(error)) {
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input and try again.'
        case 401:
          return 'You are not authorized to perform this action.'
        case 403:
          return 'Access denied. You do not have permission to access this resource.'
        case 404:
          return 'The requested resource was not found.'
        case 429:
          return 'Too many requests. Please wait a moment and try again.'
        case 500:
          return 'Server error. Please try again later.'
        case 502:
        case 503:
        case 504:
          return 'Service temporarily unavailable. Please try again later.'
        default:
          return 'An error occurred while processing your request.'
      }
    }

    if (isNetworkError(error)) {
      if (error.offline) {
        return 'You are currently offline. Please check your internet connection.'
      }
      if (error.timeout) {
        return 'Request timed out. Please try again.'
      }
      return 'Network error. Please check your connection and try again.'
    }

    if (isValidationError(error)) {
      return `Invalid ${error.field}: ${error.message}`
    }

    return 'An unexpected error occurred. Please try again.'
  }

  /**
   * Get unique key for error tracking
   */
  private getErrorKey(error: AppError, context?: ErrorContext): string {
    const parts = [
      error.name,
      error.message,
      context?.component || '',
      context?.action || '',
      context?.url || ''
    ]
    return parts.join('|')
  }

  /**
   * Clear retry attempts for an error
   */
  clearRetryAttempts(errorKey: string): void {
    this.retryAttempts.delete(errorKey)
  }

  /**
   * Clear all retry attempts
   */
  clearAllRetryAttempts(): void {
    this.retryAttempts.clear()
  }

  /**
   * Get retry count for an error
   */
  getRetryCount(errorKey: string): number {
    return this.retryAttempts.get(errorKey) || 0
  }
}

// Global error recovery manager instance
export const errorRecoveryManager = new ErrorRecoveryManager()

// Utility functions for common recovery scenarios
export const recoveryStrategies = {
  /**
   * Create retry configuration
   */
  retry: (maxRetries = 3, retryDelay = 1000): ErrorRecoveryConfig => ({
    strategy: 'retry',
    maxRetries,
    retryDelay,
    logError: true
  }),

  /**
   * Create fallback configuration
   */
  fallback: (url?: string, component?: string): ErrorRecoveryConfig => ({
    strategy: 'fallback',
    ...(url && { fallbackUrl: url }),
    ...(component && { fallbackComponent: component }),
    logError: true
  }),

  /**
   * Create show error configuration
   */
  showError: (showUserMessage = true, logError = true): ErrorRecoveryConfig => ({
    strategy: 'show-error',
    showUserMessage,
    logError
  }),

  /**
   * Create ignore configuration
   */
  ignore: (): ErrorRecoveryConfig => ({
    strategy: 'ignore',
    logError: false
  }),

  /**
   * Create redirect configuration
   */
  redirect: (url: string): ErrorRecoveryConfig => ({
    strategy: 'redirect',
    fallbackUrl: url,
    logError: true
  }),

  /**
   * Create reload configuration
   */
  reload: (): ErrorRecoveryConfig => ({
    strategy: 'reload',
    logError: true
  })
}
