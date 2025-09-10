/**
 * LocalStorage cache implementation with TTL support
 */

export interface StorageCacheItem<T = any> {
  data: T
  timestamp: number
  ttl: number
}

export interface StorageCacheOptions {
  ttl?: number // Time to live in milliseconds
  prefix?: string // Key prefix
  maxAge?: number // Maximum age in milliseconds
}

export class StorageCache<T = any> {
  private readonly defaultTTL: number
  private readonly prefix: string
  private readonly maxAge: number
  private readonly storage: Storage

  constructor(options: StorageCacheOptions = {}, storage: Storage = localStorage) {
    this.defaultTTL = options.ttl || 24 * 60 * 60 * 1000 // 24 hours default
    this.prefix = options.prefix || 'cache_'
    this.maxAge = options.maxAge || 7 * 24 * 60 * 60 * 1000 // 7 days default
    this.storage = storage
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T, ttl?: number): void {
    try {
      const now = Date.now()
      const itemTTL = ttl || this.defaultTTL

      const item: StorageCacheItem<T> = {
        data: value,
        timestamp: now,
        ttl: itemTTL
      }

      this.storage.setItem(this.prefix + key, JSON.stringify(item))
    } catch (error) {
      console.warn('Failed to set cache item:', error)
    }
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | null {
    try {
      const itemStr = this.storage.getItem(this.prefix + key)
      
      if (!itemStr) {
        return null
      }

      const item: StorageCacheItem<T> = JSON.parse(itemStr)
      const now = Date.now()
      
      // Check if item has expired
      if (now - item.timestamp > item.ttl) {
        this.delete(key)
        return null
      }

      // Check if item is too old
      if (now - item.timestamp > this.maxAge) {
        this.delete(key)
        return null
      }

      return item.data
    } catch (error) {
      console.warn('Failed to get cache item:', error)
      return null
    }
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Delete a specific key
   */
  delete(key: string): void {
    try {
      this.storage.removeItem(this.prefix + key)
    } catch (error) {
      console.warn('Failed to delete cache item:', error)
    }
  }

  /**
   * Clear all cache entries with the prefix
   */
  clear(): void {
    try {
      const keys = Object.keys(this.storage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear cache:', error)
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number
    totalSize: number
    oldestItem: number | null
    newestItem: number | null
  } {
    try {
      const keys = Object.keys(this.storage)
      const cacheKeys = keys.filter(key => key.startsWith(this.prefix))
      
      let totalSize = 0
      let oldestItem: number | null = null
      let newestItem: number | null = null

      cacheKeys.forEach(key => {
        const itemStr = this.storage.getItem(key)
        if (itemStr) {
          totalSize += itemStr.length
          
          try {
            const item: StorageCacheItem<T> = JSON.parse(itemStr)
            if (oldestItem === null || item.timestamp < oldestItem) {
              oldestItem = item.timestamp
            }
            if (newestItem === null || item.timestamp > newestItem) {
              newestItem = item.timestamp
            }
          } catch (error) {
            // Skip invalid items
          }
        }
      })

      return {
        size: cacheKeys.length,
        totalSize,
        oldestItem,
        newestItem
      }
    } catch (error) {
      console.warn('Failed to get cache stats:', error)
      return {
        size: 0,
        totalSize: 0,
        oldestItem: null,
        newestItem: null
      }
    }
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    try {
      const keys = Object.keys(this.storage)
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.substring(this.prefix.length))
    } catch (error) {
      console.warn('Failed to get cache keys:', error)
      return []
    }
  }

  /**
   * Clean up expired items
   */
  cleanup(): void {
    try {
      const keys = Object.keys(this.storage)
      const cacheKeys = keys.filter(key => key.startsWith(this.prefix))
      const now = Date.now()

      cacheKeys.forEach(key => {
        const itemStr = this.storage.getItem(key)
        if (itemStr) {
          try {
            const item: StorageCacheItem<T> = JSON.parse(itemStr)
            
            // Remove expired items
            if (now - item.timestamp > item.ttl) {
              this.storage.removeItem(key)
              return
            }

            // Remove items that are too old
            if (now - item.timestamp > this.maxAge) {
              this.storage.removeItem(key)
              return
            }
          } catch (error) {
            // Remove invalid items
            this.storage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.warn('Failed to cleanup cache:', error)
    }
  }

  /**
   * Start periodic cleanup
   */
  startCleanup(intervalMs: number = 60 * 60 * 1000): () => void { // 1 hour default
    const interval = setInterval(() => {
      this.cleanup()
    }, intervalMs)

    return () => clearInterval(interval)
  }
}

// Global storage cache instances
export const userPreferencesCache = new StorageCache({
  ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
  prefix: 'user_prefs_',
  maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
})

export const featureFlagsCache = new StorageCache({
  ttl: 60 * 60 * 1000, // 1 hour
  prefix: 'feature_flags_',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
})

export const apiResponseCache = new StorageCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  prefix: 'api_response_',
  maxAge: 60 * 60 * 1000 // 1 hour
})
