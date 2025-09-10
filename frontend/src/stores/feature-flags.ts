import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { FEATURE_FLAGS, type FeatureName } from '../config/features'

export interface FeatureFlagState {
  flags: Record<string, boolean>
  metadata: Record<string, any>
  lastUpdated: Date | null
  isLoading: boolean
  error: string | null
}

export const useFeatureFlagsStore = defineStore('featureFlags', () => {
  // State
  const flags = ref<Record<string, boolean>>({})
  const metadata = ref<Record<string, any>>({})
  const lastUpdated = ref<Date | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isEnabled = computed(() => (feature: FeatureName): boolean => {
    return flags.value[feature] ?? false
  })

  const useWagtailComponent = computed(() => (component: string): boolean => {
    const featureName = `WAGTAIL_${component.toUpperCase()}` as FeatureName
    return isEnabled.value(featureName)
  })

  const getMigrationStatus = computed(() => (component: string): 'legacy' | 'transitioning' | 'wagtail' | 'deprecated' => {
    const wagtailFeature = `WAGTAIL_${component.toUpperCase()}` as FeatureName
    const isWagtailEnabled = isEnabled.value(wagtailFeature)
    
    if (isWagtailEnabled) {
      return 'wagtail'
    } else if (wagtailFeature in FEATURE_FLAGS) {
      return 'transitioning'
    } else {
      return 'legacy'
    }
  })

  // Actions
  const setFlag = (feature: FeatureName, value: boolean) => {
    flags.value[feature] = value
  }

  const setFlags = (newFlags: Record<string, boolean>) => {
    flags.value = { ...flags.value, ...newFlags }
    lastUpdated.value = new Date()
  }

  const setMetadata = (newMetadata: Record<string, any>) => {
    metadata.value = { ...metadata.value, ...newMetadata }
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const reset = () => {
    flags.value = {}
    metadata.value = {}
    lastUpdated.value = null
    isLoading.value = false
    error.value = null
  }

  return {
    // State
    flags,
    metadata,
    lastUpdated,
    isLoading,
    error,
    
    // Getters
    isEnabled,
    useWagtailComponent,
    getMigrationStatus,
    
    // Actions
    setFlag,
    setFlags,
    setMetadata,
    setLoading,
    setError,
    clearError,
    reset
  }
})
