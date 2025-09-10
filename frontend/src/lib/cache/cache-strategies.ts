/**
 * Cache strategies for different types of data
 */

import { MemoryCache } from './memory-cache'
import { StorageCache } from './storage-cache'

export type CacheStrategy = 'cache-first' | 'network-first' | 'stale-while-revalidate' | 'network-only' | 'cache-only'

export interface CacheStrategyOptions {
  strategy: CacheStrategy
  ttl?: number
  staleWhileRevalidate?: number
  maxAge?: number
}

export class CacheManager {
  private memoryCache: MemoryCache
  private storageCache: StorageCache
  private strategies = new Map<string, CacheStrategyOptions>()

  constructor() {
    this.memoryCache = new MemoryCache({
      ttl: 5 * 60 * 1000, // 5 minutes
      maxSize: 100
    })
    
    this.storageCache = new StorageCache({
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      prefix: 'app_cache_'
    })
  }

  /**
   * Set cache strategy for a specific key pattern
   */
  setStrategy(keyPattern: string, options: CacheStrategyOptions): void {
    this.strategies.set(keyPattern, options)
  }

  /**
   * Get cache strategy for a key
   */
  private getStrategy(key: string): CacheStrategyOptions {
    // Find matching strategy pattern
    for (const [pattern, strategy] of this.strategies.entries()) {
      if (key.includes(pattern) || key.startsWith(pattern)) {
        return strategy
      }
    }

    // Default strategy
    return {
      strategy: 'stale-while-revalidate',
      ttl: 5 * 60 * 1000,
      staleWhileRevalidate: 2 * 60 * 1000
    }
  }

  /**
   * Get data using cache strategy
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: Partial<CacheStrategyOptions>
  ): Promise<T> {
    const strategy = { ...this.getStrategy(key), ...options }
    
    switch (strategy.strategy) {
      case 'cache-first':
        return this.cacheFirst(key, fetcher, strategy)
      
      case 'network-first':
        return this.networkFirst(key, fetcher, strategy)
      
      case 'stale-while-revalidate':
        return this.staleWhileRevalidate(key, fetcher, strategy)
      
      case 'network-only':
        return this.networkOnly(key, fetcher, strategy)
      
      case 'cache-only':
        return this.cacheOnly(key, strategy)
      
      default:
        return this.staleWhileRevalidate(key, fetcher, strategy)
    }
  }

  /**
   * Cache-first strategy: Check cache first, fallback to network
   */
  private async cacheFirst<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheStrategyOptions
  ): Promise<T> {
    // Check memory cache first
    let data = this.memoryCache.get(key) as T | null
    if (data) {
      return data
    }

    // Check storage cache
    data = this.storageCache.get(key) as T | null
    if (data) {
      // Store in memory cache for faster access
      this.memoryCache.set(key, data, options.ttl)
      return data
    }

    // Fetch from network
    const freshData = await fetcher()
    
    // Store in both caches
    this.memoryCache.set(key, freshData, options.ttl)
    this.storageCache.set(key, freshData, options.ttl)
    
    return freshData
  }

  /**
   * Network-first strategy: Try network first, fallback to cache
   */
  private async networkFirst<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheStrategyOptions
  ): Promise<T> {
    try {
      // Try network first
      const freshData = await fetcher()
      
      // Store in both caches
      this.memoryCache.set(key, freshData, options.ttl)
      this.storageCache.set(key, freshData, options.ttl)
      
      return freshData
    } catch (error) {
      // Fallback to cache
      let data = this.memoryCache.get(key) as T | null
      if (data) {
        return data
      }

      data = this.storageCache.get(key) as T | null
      if (data) {
        this.memoryCache.set(key, data, options.ttl)
        return data
      }

      // No cache available, re-throw error
      throw error
    }
  }

  /**
   * Stale-while-revalidate strategy: Return stale data immediately, update in background
   */
  private async staleWhileRevalidate<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheStrategyOptions
  ): Promise<T> {
    // Check for stale data
    let staleData = this.memoryCache.get(key) as T | null
    if (!staleData) {
      staleData = this.storageCache.get(key) as T | null
    }

    // If we have stale data, return it immediately and update in background
    if (staleData) {
      // Update in background (don't await)
      this.updateInBackground(key, fetcher, options)
      return staleData
    }

    // No stale data, fetch fresh
    const freshData = await fetcher()
    this.memoryCache.set(key, freshData, options.ttl)
    this.storageCache.set(key, freshData, options.ttl)
    
    return freshData
  }

  /**
   * Network-only strategy: Always fetch from network
   */
  private async networkOnly<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheStrategyOptions
  ): Promise<T> {
    const freshData = await fetcher()
    
    // Still cache the result for other strategies
    this.memoryCache.set(key, freshData, options.ttl)
    this.storageCache.set(key, freshData, options.ttl)
    
    return freshData
  }

  /**
   * Cache-only strategy: Only use cache, never network
   */
  private async cacheOnly<T>(
    key: string,
    options: CacheStrategyOptions
  ): Promise<T> {
    let data = this.memoryCache.get(key) as T | null
    if (data) {
      return data
    }

    data = this.storageCache.get(key) as T | null
    if (data) {
      this.memoryCache.set(key, data, options.ttl)
      return data
    }

    throw new Error(`No cached data found for key: ${key}`)
  }

  /**
   * Update cache in background
   */
  private async updateInBackground<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheStrategyOptions
  ): Promise<void> {
    try {
      const freshData = await fetcher()
      this.memoryCache.set(key, freshData, options.ttl)
      this.storageCache.set(key, freshData, options.ttl)
    } catch (error) {
      console.warn('Background cache update failed:', error)
    }
  }

  /**
   * Invalidate cache entry
   */
  invalidate(key: string): void {
    this.memoryCache.delete(key)
    this.storageCache.delete(key)
  }

  /**
   * Clear all caches
   */
  clear(): void {
    this.memoryCache.clear()
    this.storageCache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    memory: ReturnType<MemoryCache['getStats']>
    storage: ReturnType<StorageCache['getStats']>
  } {
    return {
      memory: this.memoryCache.getStats(),
      storage: this.storageCache.getStats()
    }
  }
}

// Global cache manager instance
export const cacheManager = new CacheManager()

// Set up default strategies
cacheManager.setStrategy('api/', {
  strategy: 'stale-while-revalidate',
  ttl: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: 2 * 60 * 1000 // 2 minutes
})

cacheManager.setStrategy('feature-flags', {
  strategy: 'network-first',
  ttl: 60 * 60 * 1000, // 1 hour
  staleWhileRevalidate: 30 * 60 * 1000 // 30 minutes
})

cacheManager.setStrategy('user-preferences', {
  strategy: 'cache-first',
  ttl: 24 * 60 * 60 * 1000, // 24 hours
  staleWhileRevalidate: 12 * 60 * 60 * 1000 // 12 hours
})

cacheManager.setStrategy('static-data', {
  strategy: 'cache-first',
  ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  staleWhileRevalidate: 24 * 60 * 60 * 1000 // 24 hours
})
