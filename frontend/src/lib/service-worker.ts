/**
 * Service Worker registration and management
 */

export interface ServiceWorkerConfig {
  swPath?: string
  scope?: string
  updateInterval?: number
  enableNotifications?: boolean
  enableBackgroundSync?: boolean
}

export interface ServiceWorkerState {
  isSupported: boolean
  isRegistered: boolean
  isActive: boolean
  isInstalling: boolean
  isWaiting: boolean
  registration: ServiceWorkerRegistration | null
  error: string | null
}

class ServiceWorkerManager {
  private config: ServiceWorkerConfig
  private state: ServiceWorkerState
  private updateCheckInterval: number | null = null
  private listeners: Map<string, Function[]> = new Map()

  constructor(config: ServiceWorkerConfig = {}) {
    this.config = {
      swPath: '/sw.js',
      scope: '/',
      updateInterval: 60000, // 1 minute
      enableNotifications: true,
      enableBackgroundSync: true,
      ...config
    }

    this.state = {
      isSupported: 'serviceWorker' in navigator,
      isRegistered: false,
      isActive: false,
      isInstalling: false,
      isWaiting: false,
      registration: null,
      error: null
    }
  }

  /**
   * Register the service worker
   */
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!this.state.isSupported) {
      this.setState({ error: 'Service Worker not supported' })
      return null
    }

    try {
      const registration = await navigator.serviceWorker.register(
        this.config.swPath!,
        { scope: this.config.scope || '/' }
      )

      this.setState({
        isRegistered: true,
        registration,
        error: null
      })

      // Set up event listeners
      this.setupEventListeners(registration)

      // Start update checking
      this.startUpdateChecking()

      // Request notification permission
      if (this.config.enableNotifications) {
        this.requestNotificationPermission()
      }

      this.emit('registered', registration)
      return registration
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.setState({ error: errorMessage })
      this.emit('error', error)
      return null
    }
  }

  /**
   * Unregister the service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.state.registration) {
      return false
    }

    try {
      const result = await this.state.registration.unregister()
      this.setState({
        isRegistered: false,
        isActive: false,
        isInstalling: false,
        isWaiting: false,
        registration: null
      })

      this.stopUpdateChecking()
      this.emit('unregistered', result)
      return result
    } catch (error) {
      this.emit('error', error)
      return false
    }
  }

  /**
   * Update the service worker
   */
  async update(): Promise<boolean> {
    if (!this.state.registration) {
      return false
    }

    try {
      await this.state.registration.update()
      this.emit('updated', this.state.registration)
      return true
    } catch (error) {
      this.emit('error', error)
      return false
    }
  }

  /**
   * Skip waiting and activate the new service worker
   */
  async skipWaiting(): Promise<void> {
    if (!this.state.registration?.waiting) {
      return
    }

    this.state.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }

  /**
   * Request notification permission
   */
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!this.config.enableNotifications || !('Notification' in window)) {
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      return 'denied'
    }

    try {
      const permission = await Notification.requestPermission()
      this.emit('notification-permission', permission)
      return permission
    } catch (error) {
      this.emit('error', error)
      return 'denied'
    }
  }

  /**
   * Show notification
   */
  async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if (!this.state.registration || !this.config.enableNotifications) {
      return
    }

    try {
      await this.state.registration.showNotification(title, {
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        ...options
      })
    } catch (error) {
      this.emit('error', error)
    }
  }

  /**
   * Cache URLs
   */
  async cacheUrls(urls: string[]): Promise<void> {
    if (!this.state.registration?.active) {
      return
    }

    try {
      this.state.registration.active.postMessage({
        type: 'CACHE_URLS',
        urls
      })
    } catch (error) {
      this.emit('error', error)
    }
  }

  /**
   * Get current state
   */
  getState(): ServiceWorkerState {
    return { ...this.state }
  }

  /**
   * Set state and emit change event
   */
  private setState(updates: Partial<ServiceWorkerState>): void {
    this.state = { ...this.state, ...updates }
    this.emit('state-change', this.state)
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(registration: ServiceWorkerRegistration): void {
    // Service worker state changes
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        this.setState({ isInstalling: true })
        
        newWorker.addEventListener('statechange', () => {
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                this.setState({ isWaiting: true })
                this.emit('update-available', newWorker)
              } else {
                this.setState({ isActive: true })
                this.emit('activated', newWorker)
              }
              break
            case 'activated':
              this.setState({ isActive: true, isInstalling: false })
              this.emit('activated', newWorker)
              break
            case 'redundant':
              this.setState({ isInstalling: false })
              break
          }
        })
      }
    })

    // Service worker controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      this.setState({ isActive: true })
      this.emit('controller-change')
    })

    // Service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.emit('message', event.data)
    })
  }

  /**
   * Start periodic update checking
   */
  private startUpdateChecking(): void {
    if (this.updateCheckInterval) {
      return
    }

    this.updateCheckInterval = window.setInterval(() => {
      this.update()
    }, this.config.updateInterval)
  }

  /**
   * Stop periodic update checking
   */
  private stopUpdateChecking(): void {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval)
      this.updateCheckInterval = null
    }
  }

  /**
   * Add event listener
   */
  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(listener)
  }

  /**
   * Remove event listener
   */
  off(event: string, listener: Function): void {
    const listeners = this.listeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  /**
   * Emit event
   */
  private emit(event: string, data?: any): void {
    const listeners = this.listeners.get(event)
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data)
        } catch (error) {
          console.error('Service Worker event listener error:', error)
        }
      })
    }
  }
}

// Global service worker manager instance
export const serviceWorkerManager = new ServiceWorkerManager()

// Auto-register in development
if (import.meta.env.DEV) {
  serviceWorkerManager.register()
}

// Export for manual registration
export { ServiceWorkerManager }
