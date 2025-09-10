/**
 * Comprehensive error type definitions
 */

// Base error interface
export interface BaseError {
  name: string
  message: string
  code?: string
  timestamp: string
  stack?: string
}

// API-specific errors
export interface ApiError extends BaseError {
  name: 'ApiError'
  status?: number
  response?: {
    data?: unknown
    status: number
    statusText: string
  }
  request?: {
    url: string
    method: string
    data?: unknown
  }
}

// Validation errors
export interface ValidationError extends BaseError {
  name: 'ValidationError'
  field: string
  value: unknown
  rule: string
  details?: Record<string, unknown>
}

// Network errors
export interface NetworkError extends BaseError {
  name: 'NetworkError'
  url: string
  method: string
  timeout?: boolean
  offline?: boolean
}

// Authentication errors
export interface AuthError extends BaseError {
  name: 'AuthError'
  type: 'unauthorized' | 'forbidden' | 'expired' | 'invalid'
  token?: string
}

// Component errors
export interface ComponentError extends BaseError {
  name: 'ComponentError'
  component: string
  props?: Record<string, unknown>
  lifecycle?: 'mounted' | 'updated' | 'unmounted'
}

// State management errors
export interface StateError extends BaseError {
  name: 'StateError'
  store: string
  action?: string
  state?: Record<string, unknown>
}

// Cache errors
export interface CacheError extends BaseError {
  name: 'CacheError'
  key: string
  operation: 'get' | 'set' | 'delete' | 'clear'
  reason?: string
}

// Service worker errors
export interface ServiceWorkerError extends BaseError {
  name: 'ServiceWorkerError'
  event: string
  registration?: ServiceWorkerRegistration
}

// Union type for all error types
export type AppError = 
  | ApiError
  | ValidationError
  | NetworkError
  | AuthError
  | ComponentError
  | StateError
  | CacheError
  | ServiceWorkerError

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

// Error context
export interface ErrorContext {
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
  timestamp: string
  component?: string
  action?: string
  metadata?: Record<string, unknown>
}

// Error report structure
export interface ErrorReport {
  error: AppError
  context: ErrorContext
  severity: ErrorSeverity
  resolved: boolean
  reported: boolean
}

// Error recovery strategies
export type ErrorRecoveryStrategy = 
  | 'retry'
  | 'fallback'
  | 'ignore'
  | 'redirect'
  | 'reload'
  | 'show-error'

// Error recovery configuration
export interface ErrorRecoveryConfig {
  strategy: ErrorRecoveryStrategy
  maxRetries?: number
  retryDelay?: number
  fallbackUrl?: string
  fallbackComponent?: string
  showUserMessage?: boolean
  logError?: boolean
}

// Error boundary state
export interface ErrorBoundaryState {
  hasError: boolean
  error: AppError | null
  errorInfo?: {
    componentStack: string
    errorBoundary?: string
  }
  retryCount: number
  lastErrorTime: number
}

// Error metrics
export interface ErrorMetrics {
  totalErrors: number
  errorsByType: Record<string, number>
  errorsBySeverity: Record<ErrorSeverity, number>
  errorsByComponent: Record<string, number>
  averageResolutionTime: number
  errorRate: number
  lastErrorTime: string
}

// Additional types for error handler compatibility
export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface LogEntry {
  id: string
  timestamp: number
  level: LogLevel
  message: string
  data?: unknown
  component?: string
  source: 'console' | 'component' | 'api' | 'store' | 'error'
}

export interface Logger {
  log: (message: string, data?: unknown) => void
  info: (message: string, data?: unknown) => void
  warn: (message: string, data?: unknown) => void
  error: (message: string, data?: unknown) => void
  debug: (message: string, data?: unknown) => void
}

export interface ErrorNotification {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  severity: ErrorSeverity
  timestamp: string
  dismissed: boolean
  actions?: Array<{
    label: string
    action: () => void
  }>
}