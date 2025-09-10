import type { ApiResponse } from '../lib/api'
import { cacheManager } from '../lib/cache/cache-strategies'

export interface ApiClientConfig {
  baseUrl: string
  timeout: number
  retries: number
  retryDelay: number
}

export interface RequestConfig extends Omit<RequestInit, 'cache'> {
  timeout?: number
  retries?: number
  retryDelay?: number
  cache?: boolean
  cacheKey?: string
  skipCache?: boolean
}

export class ApiError extends Error {
  status: number
  statusText: string
  response?: Response

  constructor(message: string, status: number, statusText: string, response?: Response) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.response = response || new Response()
  }
}

export class BaseApiClient {
  private config: ApiClientConfig
  protected cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  constructor(config: ApiClientConfig) {
    this.config = config
  }

  private async request<T>(
    endpoint: string, 
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.config.timeout,
      retries = this.config.retries,
      retryDelay = this.config.retryDelay,
      cache = false,
      cacheKey,
      ...fetchOptions
    } = options

    const url = `${this.config.baseUrl}${endpoint}`
    const requestKey = cacheKey || url

    // Check cache first
    if (cache && this.cache.has(requestKey)) {
      const cached = this.cache.get(requestKey)!
      if (Date.now() - cached.timestamp < this.CACHE_TTL) {
        return { data: cached.data, success: true }
      }
    }

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new ApiError(
            `API request failed: ${response.status} ${response.statusText}`,
            response.status,
            response.statusText,
            response
          )
        }

        const data = await response.json()

        // Cache successful response
        if (cache) {
          this.cache.set(requestKey, { data, timestamp: Date.now() })
        }

        return { data, success: true }
      } catch (error) {
        lastError = error as Error

        // Don't retry on certain errors
        if (error instanceof ApiError && (error.status >= 400 && error.status < 500)) {
          break
        }

        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
        }
      }
    }

    return {
      data: null as any,
      success: false,
      error: lastError?.message || 'Unknown error occurred'
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    const cacheKey = `api/${endpoint}`
    
    // Use cache strategy for GET requests
    if (!options.skipCache) {
      try {
        const cachedData = await cacheManager.get(
          cacheKey,
          () => this.request<T>(endpoint, { ...options, method: 'GET' })
        )
        return cachedData
      } catch (error) {
        // If cache fails, fallback to direct request
        console.warn('Cache failed, falling back to direct request:', error)
      }
    }
    
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async put<T>(endpoint: string, data?: any, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async patch<T>(endpoint: string, data?: any, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
    })
  }

  async delete<T>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // Cache management
  clearCache(): void {
    this.cache.clear()
  }

  clearCacheKey(key: string): void {
    this.cache.delete(key)
  }

  getCacheSize(): number {
    return this.cache.size
  }

  // Configuration
  updateConfig(newConfig: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  getConfig(): ApiClientConfig {
    return { ...this.config }
  }
}
