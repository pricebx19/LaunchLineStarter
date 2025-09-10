/**
 * Service Worker for caching static assets and API responses
 */

const CACHE_NAME = 'launchline-v1'
const STATIC_CACHE_NAME = 'launchline-static-v1'
const API_CACHE_NAME = 'launchline-api-v1'

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
]

// API endpoints to cache
const _API_ENDPOINTS = [
  '/api/',
  '/api/feature-flags/',
  '/api/home/',
  '/api/about/',
  '/api/services/',
  '/api/portfolio/',
  '/api/blog/',
  '/api/contact/'
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - cache first
  static: 'cache-first',
  // API responses - stale while revalidate
  api: 'stale-while-revalidate',
  // Images - cache first with long TTL
  images: 'cache-first'
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets...')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE_NAME && 
                cacheName !== API_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }
  
  // Determine cache strategy based on request type
  const strategy = getCacheStrategy(request)
  
  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(request))
      break
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(request))
      break
    case 'network-first':
      event.respondWith(networkFirst(request))
      break
    default:
      event.respondWith(staleWhileRevalidate(request))
  }
})

// Cache strategies implementation
async function cacheFirst(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // If not in cache, fetch from network
    const networkResponse = await fetch(request)
    
    // Cache the response if it's successful
    if (networkResponse.ok) {
      const cache = await getCache(request)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Network error', { status: 503 })
  }
}

async function staleWhileRevalidate(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    
    // Fetch from network in background
    const networkPromise = fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          const cache = getCache(request)
          cache.then(c => c.put(request, networkResponse.clone()))
        }
        return networkResponse
      })
      .catch((error) => {
        console.error('Network request failed:', error)
        return null
      })
    
    // Return cached response immediately if available
    if (cachedResponse) {
      // Update cache in background
      networkPromise.catch(() => {}) // Ignore errors
      return cachedResponse
    }
    
    // If no cached response, wait for network
    const networkResponse = await networkPromise
    if (networkResponse) {
      return networkResponse
    }
    
    // Fallback to offline page
    return new Response('Offline', { status: 503 })
  } catch (error) {
    console.error('Stale while revalidate strategy failed:', error)
    return new Response('Network error', { status: 503 })
  }
}

async function networkFirst(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await getCache(request)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    console.error('Network first strategy failed:', error)
    return new Response('Offline', { status: 503 })
  }
}

// Helper functions
function getCacheStrategy(request) {
  const url = new URL(request.url)
  
  // Static assets
  if (url.pathname.endsWith('.js') || 
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico')) {
    return CACHE_STRATEGIES.static
  }
  
  // Images
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
    return CACHE_STRATEGIES.images
  }
  
  // API requests
  if (url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.api
  }
  
  // Default strategy
  return CACHE_STRATEGIES.static
}

async function getCache(request) {
  const url = new URL(request.url)
  
  if (url.pathname.startsWith('/api/')) {
    return caches.open(API_CACHE_NAME)
  }
  
  return caches.open(STATIC_CACHE_NAME)
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Implement background sync logic here
    console.log('Performing background sync...')
    
    // Example: Sync offline form submissions
    // const offlineData = await getOfflineData()
    // await syncOfflineData(offlineData)
    
    console.log('Background sync completed')
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: data.tag || 'default',
      data: data.data,
      actions: data.actions || []
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action) {
    // Handle specific action
    console.log('Action clicked:', event.action)
  } else {
    // Default click action
    event.waitUntil(
      self.clients.openWindow('/')
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => cache.addAll(event.data.urls))
    )
  }
})
