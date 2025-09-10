/**
 * Typed error classes for better error handling
 */

import type { 
  AppError, 
  ApiError, 
  ValidationError, 
  NetworkError, 
  AuthError, 
  ComponentError, 
  StateError, 
  CacheError, 
  ServiceWorkerError,
  ErrorContext,
  ErrorSeverity
} from '../../types/errors'

// Base error class
export abstract class BaseAppError extends Error {
  abstract override readonly name: string
  abstract readonly code?: string
  abstract readonly severity: ErrorSeverity
  
  public readonly timestamp: string
  public readonly context?: ErrorContext
  public override readonly stack?: string

  constructor(
    message: string,
    context?: ErrorContext
  ) {
    super(message)
    this.timestamp = new Date().toISOString()
    if (context !== undefined) {
      this.context = context
    }
    const errorStack = new Error().stack
    if (this.stack) {
      // Keep existing stack
    } else if (errorStack) {
      this.stack = errorStack
    }
  }

  abstract toJSON(): AppError
}

// API Error class
export class ApiErrorClass extends BaseAppError {
  override readonly name = 'ApiError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'high'
  
  public readonly status?: number
  public readonly response?: {
    data?: unknown
    status: number
    statusText: string
  }
  public readonly request?: {
    url: string
    method: string
    data?: unknown
  }

  constructor(
    message: string,
    options: {
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
      context?: ErrorContext
    } = {}
  ) {
    super(message, options.context)
    if (options.status !== undefined) {
      this.status = options.status
    }
    if (options.response !== undefined) {
      this.response = options.response
    }
    if (options.request !== undefined) {
      this.request = options.request
    }
  }

  toJSON(): ApiError {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      ...(this.status !== undefined && { status: this.status }),
      ...(this.response !== undefined && { response: this.response }),
      ...(this.request !== undefined && { request: this.request }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Validation Error class
export class ValidationErrorClass extends BaseAppError {
  override readonly name = 'ValidationError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'medium'
  
  public readonly field: string
  public readonly value: unknown
  public readonly rule: string
  public readonly details?: Record<string, unknown>

  constructor(
    message: string,
    options: {
      field: string
      value: unknown
      rule: string
      details?: Record<string, unknown>
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.field = options.field
    this.value = options.value
    this.rule = options.rule
    if (options.details !== undefined) {
      this.details = options.details
    }
  }

  toJSON(): ValidationError {
    return {
      name: this.name,
      message: this.message,
      field: this.field,
      value: this.value,
      rule: this.rule,
      timestamp: this.timestamp,
      ...(this.details !== undefined && { details: this.details }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Network Error class
export class NetworkErrorClass extends BaseAppError {
  override readonly name = 'NetworkError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'high'
  
  public readonly url: string
  public readonly method: string
  public readonly timeout?: boolean
  public readonly offline?: boolean

  constructor(
    message: string,
    options: {
      url: string
      method: string
      timeout?: boolean
      offline?: boolean
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.url = options.url
    this.method = options.method
    if (options.timeout !== undefined) {
      this.timeout = options.timeout
    }
    if (options.offline !== undefined) {
      this.offline = options.offline
    }
  }

  toJSON(): NetworkError {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      method: this.method,
      timestamp: this.timestamp,
      ...(this.timeout !== undefined && { timeout: this.timeout }),
      ...(this.offline !== undefined && { offline: this.offline }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Authentication Error class
export class AuthErrorClass extends BaseAppError {
  override readonly name = 'AuthError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'high'
  
  public readonly type: 'unauthorized' | 'forbidden' | 'expired' | 'invalid'
  public readonly token?: string

  constructor(
    message: string,
    options: {
      type: 'unauthorized' | 'forbidden' | 'expired' | 'invalid'
      token?: string
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.type = options.type
    if (options.token !== undefined) {
      this.token = options.token
    }
  }

  toJSON(): AuthError {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      timestamp: this.timestamp,
      ...(this.token !== undefined && { token: this.token }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Component Error class
export class ComponentErrorClass extends BaseAppError {
  override readonly name = 'ComponentError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'medium'
  
  public readonly component: string
  public readonly props?: Record<string, unknown>
  public readonly lifecycle?: 'mounted' | 'updated' | 'unmounted'

  constructor(
    message: string,
    options: {
      component: string
      props?: Record<string, unknown>
      lifecycle?: 'mounted' | 'updated' | 'unmounted'
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.component = options.component
    if (options.props !== undefined) {
      this.props = options.props
    }
    if (options.lifecycle !== undefined) {
      this.lifecycle = options.lifecycle
    }
  }

  toJSON(): ComponentError {
    return {
      name: this.name,
      message: this.message,
      component: this.component,
      timestamp: this.timestamp,
      ...(this.props !== undefined && { props: this.props }),
      ...(this.lifecycle !== undefined && { lifecycle: this.lifecycle }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// State Error class
export class StateErrorClass extends BaseAppError {
  override readonly name = 'StateError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'medium'
  
  public readonly store: string
  public readonly action?: string
  public readonly state?: Record<string, unknown>

  constructor(
    message: string,
    options: {
      store: string
      action?: string
      state?: Record<string, unknown>
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.store = options.store
    if (options.action !== undefined) {
      this.action = options.action
    }
    if (options.state !== undefined) {
      this.state = options.state
    }
  }

  toJSON(): StateError {
    return {
      name: this.name,
      message: this.message,
      store: this.store,
      timestamp: this.timestamp,
      ...(this.action !== undefined && { action: this.action }),
      ...(this.state !== undefined && { state: this.state }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Cache Error class
export class CacheErrorClass extends BaseAppError {
  override readonly name = 'CacheError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'low'
  
  public readonly key: string
  public readonly operation: 'get' | 'set' | 'delete' | 'clear'
  public readonly reason?: string

  constructor(
    message: string,
    options: {
      key: string
      operation: 'get' | 'set' | 'delete' | 'clear'
      reason?: string
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.key = options.key
    this.operation = options.operation
    if (options.reason !== undefined) {
      this.reason = options.reason
    }
  }

  toJSON(): CacheError {
    return {
      name: this.name,
      message: this.message,
      key: this.key,
      operation: this.operation,
      timestamp: this.timestamp,
      ...(this.reason !== undefined && { reason: this.reason }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Service Worker Error class
export class ServiceWorkerErrorClass extends BaseAppError {
  override readonly name = 'ServiceWorkerError' as const
  readonly code?: string
  readonly severity: ErrorSeverity = 'medium'
  
  public readonly event: string
  public readonly registration?: ServiceWorkerRegistration

  constructor(
    message: string,
    options: {
      event: string
      registration?: ServiceWorkerRegistration
      context?: ErrorContext
    }
  ) {
    super(message, options.context)
    this.event = options.event
    if (options.registration !== undefined) {
      this.registration = options.registration
    }
  }

  toJSON(): ServiceWorkerError {
    return {
      name: this.name,
      message: this.message,
      event: this.event,
      timestamp: this.timestamp,
      ...(this.registration !== undefined && { registration: this.registration }),
      ...(this.stack !== undefined && { stack: this.stack })
    }
  }
}

// Error factory function
export function createError<T extends AppError>(
  type: T['name'],
  message: string,
  options: Record<string, unknown> = {}
): BaseAppError {
  const context = options.context as ErrorContext | undefined
  delete options.context

  switch (type) {
    case 'ApiError':
      return new ApiErrorClass(message, { ...options, context } as any)
    case 'ValidationError':
      return new ValidationErrorClass(message, { ...options, context } as any)
    case 'NetworkError':
      return new NetworkErrorClass(message, { ...options, context } as any)
    case 'AuthError':
      return new AuthErrorClass(message, { ...options, context } as any)
    case 'ComponentError':
      return new ComponentErrorClass(message, { ...options, context } as any)
    case 'StateError':
      return new StateErrorClass(message, { ...options, context } as any)
    case 'CacheError':
      return new CacheErrorClass(message, { ...options, context } as any)
    case 'ServiceWorkerError':
      return new ServiceWorkerErrorClass(message, { ...options, context } as any)
    default:
      throw new Error(`Unknown error type: ${type}`)
  }
}

// Type guards
export function isApiError(error: unknown): error is ApiErrorClass {
  return error instanceof ApiErrorClass
}

export function isValidationError(error: unknown): error is ValidationErrorClass {
  return error instanceof ValidationErrorClass
}

export function isNetworkError(error: unknown): error is NetworkErrorClass {
  return error instanceof NetworkErrorClass
}

export function isAuthError(error: unknown): error is AuthErrorClass {
  return error instanceof AuthErrorClass
}

export function isComponentError(error: unknown): error is ComponentErrorClass {
  return error instanceof ComponentErrorClass
}

export function isStateError(error: unknown): error is StateErrorClass {
  return error instanceof StateErrorClass
}

export function isCacheError(error: unknown): error is CacheErrorClass {
  return error instanceof CacheErrorClass
}

export function isServiceWorkerError(error: unknown): error is ServiceWorkerErrorClass {
  return error instanceof ServiceWorkerErrorClass
}

export function isAppError(error: unknown): error is BaseAppError {
  return error instanceof BaseAppError
}