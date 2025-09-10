import { useFeatureFlagsStore } from '../stores/feature-flags'
import { useWagtailDataStore } from '../stores/wagtail-data'
import { useUIStore } from '../stores/ui'
import { WagtailApiService } from '../services/wagtail-api'
import { errorHandler } from '../services/error-handler'
import { FEATURE_FLAGS, type FeatureName } from '../config/features'

// Global API service instance
const wagtailApi = new WagtailApiService(import.meta.env.VITE_API_URL || 'http://localhost:8000')

export function useStores() {
  const featureFlagsStore = useFeatureFlagsStore()
  const wagtailDataStore = useWagtailDataStore()
  const uiStore = useUIStore()

  return {
    featureFlags: featureFlagsStore,
    wagtailData: wagtailDataStore,
    ui: uiStore,
    api: wagtailApi,
    errorHandler
  }
}

// Enhanced feature flags composable that uses Pinia
export function useFeatureFlags() {
  const { featureFlags, ui } = useStores()

  const initialize = async () => {
    ui.setLoading('feature-flags', true)
    featureFlags.clearError()

    try {
      // Load feature flags from API
      const response = await wagtailApi.getFeatureFlags()
      
      if (response.success && response.data) {
        featureFlags.setFlags(response.data.flags)
        
        // Load metadata if available
        const metadataResponse = await wagtailApi.getFeatureMetadata()
        if (metadataResponse.success && metadataResponse.data) {
          featureFlags.setMetadata(metadataResponse.data)
        }
      } else {
        // Fallback to environment variables
        const envFlags: Record<string, boolean> = {}
        Object.entries(FEATURE_FLAGS).forEach(([key]) => {
          envFlags[key] = import.meta.env[`VITE_${key}`] === 'true'
        })
        featureFlags.setFlags(envFlags)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load feature flags'
      featureFlags.setError(errorMessage)
      errorHandler.logError(error as Error, { component: 'useFeatureFlags', action: 'initialize' })
    } finally {
      ui.setLoading('feature-flags', false)
    }
  }

  const refresh = async () => {
    await initialize()
  }

  const isEnabled = (feature: FeatureName): boolean => {
    return featureFlags.isEnabled(feature)
  }

  const useWagtail = (component: string): boolean => {
    return featureFlags.useWagtailComponent(component)
  }

  const getMigrationStatus = (component: string) => {
    return featureFlags.getMigrationStatus(component)
  }

  return {
    // State
    isLoading: featureFlags.isLoading,
    error: featureFlags.error,
    lastUpdated: featureFlags.lastUpdated,
    
    // Methods
    initialize,
    refresh,
    isEnabled,
    useWagtail,
    getMigrationStatus
  }
}

// Enhanced Wagtail data composable
export function useWagtailData() {
  const { wagtailData, ui, api } = useStores()

  const fetchData = async (type: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact') => {
    ui.setLoading(type, true)
    wagtailData.clearError(type)

    try {
      let response
      
      switch (type) {
        case 'home':
          response = await api.getHomePage()
          break
        case 'about':
          response = await api.getAboutPage()
          break
        case 'services':
          response = await api.getServicesPage()
          break
        case 'portfolio':
          response = await api.getPortfolioPage()
          break
        case 'blog':
          response = await api.getBlogIndexPage()
          break
        case 'contact':
          response = await api.getContactPage()
          break
        default:
          throw new Error(`Unknown data type: ${type}`)
      }

      if (response.success && response.data?.items?.[0]) {
        wagtailData.setData(type, response.data.items[0])
      } else {
        throw new Error(`Failed to fetch ${type} data`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to fetch ${type} data`
      wagtailData.setError(type, errorMessage)
      errorHandler.logError(error as Error, { component: 'useWagtailData', action: `fetch-${type}` })
    } finally {
      ui.setLoading(type, false)
    }
  }

  const getData = (type: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact') => {
    return wagtailData.getData(type)
  }

  const isLoading = (type: string) => {
    return wagtailData.isLoading(type)
  }

  const getError = (type: string) => {
    return wagtailData.getError(type)
  }

  const hasData = (type: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact') => {
    return wagtailData.hasData(type)
  }

  const getLastFetched = (type: string) => {
    return wagtailData.getLastFetched(type)
  }

  const clearData = (type: 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact') => {
    wagtailData.clearData(type)
  }

  return {
    // Methods
    fetchData,
    getData,
    isLoading,
    getError,
    hasData,
    getLastFetched,
    clearData
  }
}

// UI composable
export function useUI() {
  const { ui } = useStores()

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
    ui.addNotification({ message, type, duration: duration || 5000 })
  }

  const showError = (message: string, duration?: number) => {
    showNotification(message, 'error', duration)
  }

  const showSuccess = (message: string, duration?: number) => {
    showNotification(message, 'success', duration)
  }

  const showWarning = (message: string, duration?: number) => {
    showNotification(message, 'warning', duration)
  }

  return {
    // State
    notifications: ui.getNotifications,
    userPreferences: ui.getUserPreferences,
    isModalOpen: ui.isModalOpen,
    isSidebarOpen: ui.isSidebarOpen,
    isSidebarCollapsed: ui.isSidebarCollapsed,
    
    // Methods
    showNotification,
    showError,
    showSuccess,
    showWarning,
    removeNotification: ui.removeNotification,
    clearNotifications: ui.clearNotifications,
    setUserPreference: ui.setUserPreference,
    setModalOpen: ui.setModalOpen,
    toggleModal: ui.toggleModal,
    setSidebarOpen: ui.setSidebarOpen,
    toggleSidebar: ui.toggleSidebar,
    toggleSidebarCollapse: ui.toggleSidebarCollapse
  }
}
