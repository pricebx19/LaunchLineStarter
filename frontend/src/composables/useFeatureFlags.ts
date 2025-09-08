/**
 * Vue composable for feature flag management during Wagtail transition
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  isFeatureEnabled, 
  useWagtailComponent,
  getMigrationStatus,
  isFeatureDeprecated,
  getFeatureMetadata,
  loadFeatureFlags,
  initializeFeatureFlags,
  startFeatureFlagPolling,
  FEATURE_FLAGS,
  type FeatureName
} from '../config/features'

// Global state for feature flags
const isLoading = ref(false)
const error = ref<string | null>(null)
const lastUpdated = ref<Date | null>(null)

let stopPolling: (() => void) | null = null

export function useFeatureFlags() {
  const initialize = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      await initializeFeatureFlags()
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load feature flags'
      console.error('Feature flags initialization failed:', err)
    } finally {
      isLoading.value = false
    }
  }

  const startPolling = (intervalMs: number = 30000) => {
    if (stopPolling) {
      stopPolling()
    }
    stopPolling = startFeatureFlagPolling(intervalMs)
  }

  const stopPollingFlags = () => {
    if (stopPolling) {
      stopPolling()
      stopPolling = null
    }
  }

  const refresh = async () => {
    try {
      await loadFeatureFlags()
      lastUpdated.value = new Date()
    } catch (err) {
      console.warn('Failed to refresh feature flags:', err)
    }
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    lastUpdated: computed(() => lastUpdated.value),
    
    // Methods
    initialize,
    refresh,
    startPolling,
    stopPolling: stopPollingFlags,
    
    // Feature flag helpers
    isEnabled: isFeatureEnabled,
    useWagtail: useWagtailComponent,
    getMigrationStatus,
    isDeprecated: isFeatureDeprecated,
    getMetadata: getFeatureMetadata,
  }
}

/**
 * Composable for component-specific feature flag checks
 */
export function useComponentFlags(componentName: string) {
  const {
    isEnabled,
    useWagtail,
    getMigrationStatus,
    isDeprecated
  } = useFeatureFlags()

  const wagtailFeature = `WAGTAIL_${componentName.toUpperCase()}` as FeatureName
  
  return {
    // Component-specific flags
    useWagtailVersion: computed(() => useWagtail(componentName)),
    migrationStatus: computed(() => getMigrationStatus(componentName)),
    isWagtailEnabled: computed(() => isEnabled(wagtailFeature)),
    isWagtailDeprecated: computed(() => isDeprecated(wagtailFeature)),
    
    // Conditional rendering helpers
    shouldShowLegacy: computed(() => {
      const status = getMigrationStatus(componentName)
      return status === 'legacy' || (status === 'transitioning' && !isEnabled(wagtailFeature))
    }),
    
    shouldShowWagtail: computed(() => {
      return isEnabled(wagtailFeature) && !isDeprecated(wagtailFeature)
    }),
    
    shouldShowBoth: computed(() => {
      const status = getMigrationStatus(componentName)
      return status === 'transitioning' && isEnabled(wagtailFeature)
    }),
    
    // Component state
    componentStatus: computed(() => {
      const status = getMigrationStatus(componentName)
      const enabled = isEnabled(wagtailFeature)
      const deprecated = isDeprecated(wagtailFeature)
      
      return {
        status,
        enabled,
        deprecated,
        canToggle: status === 'transitioning',
        message: getStatusMessage(status, enabled, deprecated)
      }
    })
  }
}

/**
 * Composable for navigation-specific feature flags
 */
export function useNavigationFlags() {
  const { isEnabled } = useFeatureFlags()
  
  return {
    useWagtailNavbar: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_NAVBAR)),
    useWagtailFooter: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_FOOTER)),
    useWagtailLayout: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_LAYOUT)),
    
    navigationStrategy: computed(() => {
      const navbar = isEnabled(FEATURE_FLAGS.WAGTAIL_NAVBAR)
      const footer = isEnabled(FEATURE_FLAGS.WAGTAIL_FOOTER)
      const layout = isEnabled(FEATURE_FLAGS.WAGTAIL_LAYOUT)
      
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
  const { isEnabled } = useFeatureFlags()
  
  return {
    useWagtailHero: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_HERO)),
    useWagtailFeatures: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_FEATURES)),
    useWagtailTestimonials: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_TESTIMONIALS)),
    useWagtailCTA: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_CTA)),
    useWagtailBlog: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_BLOG)),
    useWagtailPortfolio: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_PORTFOLIO)),
    useWagtailServices: computed(() => isEnabled(FEATURE_FLAGS.WAGTAIL_SERVICES)),
    
    contentStrategy: computed(() => {
      const wagtailFlags = [
        FEATURE_FLAGS.WAGTAIL_HERO,
        FEATURE_FLAGS.WAGTAIL_FEATURES,
        FEATURE_FLAGS.WAGTAIL_TESTIMONIALS,
        FEATURE_FLAGS.WAGTAIL_CTA
      ]
      
      const enabledCount = wagtailFlags.reduce((count, flag) => {
        return count + (isEnabled(flag) ? 1 : 0)
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
  enabled: boolean,
  deprecated: boolean
): string {
  if (deprecated) {
    return 'This component has been deprecated'
  }
  
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
  const { isEnabled } = useFeatureFlags()
  
  const debugInfo = computed(() => {
    const allFlags = Object.values(FEATURE_FLAGS)
    
    return {
      total: allFlags.length,
      enabled: allFlags.filter(flag => isEnabled(flag)).length,
      wagtailFlags: allFlags.filter(flag => flag.startsWith('WAGTAIL_')),
      legacyFlags: allFlags.filter(flag => !flag.startsWith('WAGTAIL_')),
    }
  })
  
  const logAllFlags = () => {
    console.group('🚩 Feature Flags Status')
    Object.values(FEATURE_FLAGS).forEach(flag => {
      const enabled = isEnabled(flag)
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
