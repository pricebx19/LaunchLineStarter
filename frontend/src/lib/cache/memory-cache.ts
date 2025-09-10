/**
 * In-memory cache implementation with TTL support
 */

export interface CacheItem<T = any> {
  data: T
  timestamp: number
  ttl: number
  hits: number
}

export interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum number of items
  maxAge?: number // Maximum age in milliseconds
}

export class MemoryCache<T = any> {
  private cache = new Map<string, CacheItem<T>>()
  private readonly defaultTTL: number
  private readonly maxSize: number
  private readonly maxAge: number

  constructor(options: CacheOptions = {}) {
    this.defaultTTL = options.ttl || 5 * 60 * 1000 // 5 minutes default
    this.maxSize = options.maxSize || 100 // 100 items default
    this.maxAge = options.maxAge || 30 * 60 * 1000 // 30 minutes default
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T, ttl?: number): void {
    const now = Date.now()
    const itemTTL = ttl || this.defaultTTL

    // Remove expired items if cache is full
    if (this.cache.size >= this.maxSize) {
      this.cleanup()
    }

    this.cache.set(key, {
      data: value,
      timestamp: now,
      ttl: itemTTL,
      hits: 0
    })
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    const now = Date.now()
    
    // Check if item has expired
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    // Check if item is too old
    if (now - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    // Increment hit counter
    item.hits++
    
    return item.data
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
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number
    maxSize: number
    hitRate: number
    totalHits: number
    oldestItem: number | null
    newestItem: number | null
  } {
    const items = Array.from(this.cache.values())
    const totalHits = items.reduce((sum, item) => sum + item.hits, 0)
    const hitRate = items.length > 0 ? totalHits / items.length : 0
    
    const timestamps = items.map(item => item.timestamp)
    const oldestItem = timestamps.length > 0 ? Math.min(...timestamps) : null
    const newestItem = timestamps.length > 0 ? Math.max(...timestamps) : null

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate,
      totalHits,
      oldestItem,
      newestItem
    }
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * Clean up expired and old items
   */
  private cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (const [key, item] of this.cache.entries()) {
      // Remove expired items
      if (now - item.timestamp > item.ttl) {
        keysToDelete.push(key)
        continue
      }

      // Remove items that are too old
      if (now - item.timestamp > this.maxAge) {
        keysToDelete.push(key)
        continue
      }
    }

    // Delete expired/old items
    keysToDelete.forEach(key => this.cache.delete(key))

    // If still over max size, remove least recently used items
    if (this.cache.size >= this.maxSize) {
      const items = Array.from(this.cache.entries())
      items.sort((a, b) => a[1].timestamp - b[1].timestamp) // Sort by timestamp (oldest first)
      
      const itemsToRemove = items.slice(0, this.cache.size - this.maxSize + 1)
      itemsToRemove.forEach(([key]) => this.cache.delete(key))
    }
  }

  /**
   * Start periodic cleanup
   */
  startCleanup(intervalMs: number = 60000): () => void {
    const interval = setInterval(() => {
      this.cleanup()
    }, intervalMs)

    return () => clearInterval(interval)
  }
}

// Global cache instances
export const apiCache = new MemoryCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 50,
  maxAge: 30 * 60 * 1000 // 30 minutes
})

export const componentCache = new MemoryCache({
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 100,
  maxAge: 60 * 60 * 1000 // 1 hour
})

export const userCache = new MemoryCache({
  ttl: 15 * 60 * 1000, // 15 minutes
  maxSize: 20,
  maxAge: 2 * 60 * 60 * 1000 // 2 hours
})
