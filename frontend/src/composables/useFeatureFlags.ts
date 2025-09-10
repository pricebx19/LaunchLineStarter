/**
 * Vue composable for feature flag management during Wagtail transition
 * Now uses Pinia store for state management
 */
import { computed, onMounted, onUnmounted } from 'vue'
import { useFeatureFlagsStore } from '../stores/feature-flags'
import { WagtailApiService } from '../services/wagtail-api'
import { errorHandler } from '../services/error-handler'
import { 
  FEATURE_FLAGS,
  type FeatureName
} from '../config/features'

// Global API service instance
const wagtailApi = new WagtailApiService(import.meta.env.VITE_API_URL || 'http://localhost:8000')

let stopPolling: number | null = null

export function useFeatureFlags() {
  const store = useFeatureFlagsStore()

  const initialize = async () => {
    store.setLoading(true)
    store.clearError()
    
    try {
      // Load feature flags from API
      const response = await wagtailApi.getFeatureFlags()
      
      if (response.success && response.data) {
        store.setFlags(response.data.flags)
        
        // Load metadata if available
        const metadataResponse = await wagtailApi.getFeatureMetadata()
        if (metadataResponse.success && metadataResponse.data) {
          store.setMetadata(metadataResponse.data)
        }
      } else {
        // Fallback to environment variables
        const envFlags: Record<string, boolean> = {}
        Object.entries(FEATURE_FLAGS).forEach(([key]) => {
          envFlags[key] = import.meta.env[`VITE_${key}`] === 'true'
        })
        store.setFlags(envFlags)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load feature flags'
      store.setError(errorMessage)
      errorHandler.logError(err as Error, { component: 'useFeatureFlags', action: 'initialize' })
    } finally {
      store.setLoading(false)
    }
  }

  const startPolling = (intervalMs: number = 30000) => {
    if (stopPolling) {
      clearInterval(stopPolling)
    }
    stopPolling = window.setInterval(() => {
      initialize().catch(console.warn)
    }, intervalMs)
  }

  const stopPollingFlags = () => {
    if (stopPolling) {
      clearInterval(stopPolling)
      stopPolling = null
    }
  }

  const refresh = async () => {
    await initialize()
  }

  return {
    // State
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    lastUpdated: computed(() => store.lastUpdated),
    
    // Methods
    initialize,
    refresh,
    startPolling,
    stopPolling: stopPollingFlags,
    
    // Feature flag helpers
    isEnabled: store.isEnabled,
    useWagtail: store.useWagtailComponent,
    getMigrationStatus: store.getMigrationStatus,
  }
}

/**
 * Composable for component-specific feature flag checks
 */
export function useComponentFlags(componentName: string) {
  const store = useFeatureFlagsStore()

  const wagtailFeature = `WAGTAIL_${componentName.toUpperCase()}` as FeatureName
  
  return {
    // Component-specific flags
    useWagtailVersion: computed(() => store.useWagtailComponent(componentName)),
    migrationStatus: computed(() => store.getMigrationStatus(componentName)),
    isWagtailEnabled: computed(() => store.isEnabled(wagtailFeature)),
    
    // Conditional rendering helpers
    shouldShowLegacy: computed(() => {
      const status = store.getMigrationStatus(componentName)
      return status === 'legacy' || (status === 'transitioning' && !store.isEnabled(wagtailFeature))
    }),
    
    shouldShowWagtail: computed(() => {
      return store.isEnabled(wagtailFeature)
    }),
    
    shouldShowBoth: computed(() => {
      const status = store.getMigrationStatus(componentName)
      return status === 'transitioning' && store.isEnabled(wagtailFeature)
    }),
    
    // Component state
    componentStatus: computed(() => {
      const status = store.getMigrationStatus(componentName)
      const enabled = store.isEnabled(wagtailFeature)
      
      return {
        status,
        enabled,
        canToggle: status === 'transitioning',
        message: getStatusMessage(status, enabled)
      }
    })
  }
}

/**
 * Composable for navigation-specific feature flags
 */
export function useNavigationFlags() {
  const store = useFeatureFlagsStore()
  
  return {
    useWagtailNavbar: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_NAVBAR)),
    useWagtailFooter: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_FOOTER)),
    useWagtailLayout: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_LAYOUT)),
    
    navigationStrategy: computed(() => {
      const navbar = store.isEnabled(FEATURE_FLAGS.WAGTAIL_NAVBAR)
      const footer = store.isEnabled(FEATURE_FLAGS.WAGTAIL_FOOTER)
      const layout = store.isEnabled(FEATURE_FLAGS.WAGTAIL_LAYOUT)
      
      if (layout) return 'full-wagtail'
      if (navbar && footer) return 'mixed-navigation'
      if (navbar || footer) return 'partial-wagtail'
      return 'legacy'
    })
  }
}

/**
 * Composable for content-specific feature flags
 */
export function useContentFlags() {
  const store = useFeatureFlagsStore()
  
  return {
    useWagtailHero: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_HERO)),
    useWagtailFeatures: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_FEATURES)),
    useWagtailTestimonials: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_TESTIMONIALS)),
    useWagtailCTA: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_CTA)),
    useWagtailBlog: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_BLOG)),
    useWagtailPortfolio: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_PORTFOLIO)),
    useWagtailServices: computed(() => store.isEnabled(FEATURE_FLAGS.WAGTAIL_SERVICES)),
    
    contentStrategy: computed(() => {
      const wagtailFlags = [
        FEATURE_FLAGS.WAGTAIL_HERO,
        FEATURE_FLAGS.WAGTAIL_FEATURES,
        FEATURE_FLAGS.WAGTAIL_TESTIMONIALS,
        FEATURE_FLAGS.WAGTAIL_CTA
      ]
      
      const enabledCount = wagtailFlags.reduce((count, flag) => {
        return count + (store.isEnabled(flag) ? 1 : 0)
      }, 0)
      
      const percentage = (enabledCount / wagtailFlags.length) * 100
      
      if (percentage === 100) return 'full-wagtail'
      if (percentage >= 50) return 'mostly-wagtail'
      if (percentage > 0) return 'transitioning'
      return 'legacy'
    })
  }
}

/**
 * Auto-initializing composable for app setup
 */
export function useFeatureFlagsApp(options: {
  enablePolling?: boolean
  pollingInterval?: number
  autoStart?: boolean
} = {}) {
  const {
    enablePolling = false,
    pollingInterval = 30000,
    autoStart = true
  } = options

  const featureFlags = useFeatureFlags()
  
  onMounted(async () => {
    if (autoStart) {
      await featureFlags.initialize()
      
      if (enablePolling) {
        featureFlags.startPolling(pollingInterval)
      }
    }
  })
  
  onUnmounted(() => {
    if (enablePolling) {
      featureFlags.stopPolling()
    }
  })
  
  return featureFlags
}

// Helper function for status messages
function getStatusMessage(
  status: 'legacy' | 'transitioning' | 'wagtail' | 'deprecated',
  enabled: boolean
): string {
  switch (status) {
    case 'legacy':
      return 'Using legacy implementation'
    case 'transitioning':
      return enabled 
        ? 'Using Wagtail implementation (transitioning)'
        : 'Using legacy implementation (Wagtail available)'
    case 'wagtail':
      return 'Using Wagtail implementation'
    case 'deprecated':
      return 'Component deprecated'
    default:
      return 'Unknown status'
  }
}

// Development helpers
export function useFeatureFlagsDev() {
  const store = useFeatureFlagsStore()
  
  const debugInfo = computed(() => {
    const allFlags = Object.values(FEATURE_FLAGS)
    
    return {
      total: allFlags.length,
      enabled: allFlags.filter(flag => store.isEnabled(flag)).length,
      wagtailFlags: allFlags.filter(flag => flag.startsWith('WAGTAIL_')),
      legacyFlags: allFlags.filter(flag => !flag.startsWith('WAGTAIL_')),
    }
  })
  
  const logAllFlags = () => {
    console.group('🚩 Feature Flags Status')
    Object.values(FEATURE_FLAGS).forEach(flag => {
      const enabled = store.isEnabled(flag)
      const status = enabled ? '✅' : '❌'
      console.log(`${status} ${flag}: ${enabled}`)
    })
    console.groupEnd()
  }
  
  return {
    debugInfo,
    logAllFlags
  }
}
