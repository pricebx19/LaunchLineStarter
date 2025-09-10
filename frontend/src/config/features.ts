// Feature flag names - these should match backend FeatureFlag.FEATURE_CHOICES
export const FEATURE_FLAGS = {
  // Legacy features (being replaced by Wagtail)
  ROCKET_ANIMATION: 'ROCKET_ANIMATION',
  BLOG_PAGES: 'BLOG_PAGES',
  
  // Navigation & Layout
  WAGTAIL_NAVBAR: 'WAGTAIL_NAVBAR',
  WAGTAIL_FOOTER: 'WAGTAIL_FOOTER',
  WAGTAIL_LAYOUT: 'WAGTAIL_LAYOUT',
  
  // Content Management
  WAGTAIL_HERO: 'WAGTAIL_HERO',
  WAGTAIL_FEATURES: 'WAGTAIL_FEATURES', 
  WAGTAIL_TESTIMONIALS: 'WAGTAIL_TESTIMONIALS',
  WAGTAIL_CTA: 'WAGTAIL_CTA',
  WAGTAIL_BLOG: 'WAGTAIL_BLOG',
  WAGTAIL_PORTFOLIO: 'WAGTAIL_PORTFOLIO',
  WAGTAIL_SERVICES: 'WAGTAIL_SERVICES',
  WAGTAIL_HOME: 'WAGTAIL_HOME',
  WAGTAIL_ABOUT: 'WAGTAIL_ABOUT',
  
  // Forms & Interactions
  WAGTAIL_CONTACT_FORM: 'WAGTAIL_CONTACT_FORM',
  WAGTAIL_NEWSLETTER: 'WAGTAIL_NEWSLETTER',
  
  // Animations & Effects
  WAGTAIL_ANIMATIONS: 'WAGTAIL_ANIMATIONS',
  WAGTAIL_PARTICLES: 'WAGTAIL_PARTICLES',
  
  // SEO & Meta
  WAGTAIL_SEO: 'WAGTAIL_SEO',
  WAGTAIL_META: 'WAGTAIL_META',
  
  // Performance & Optimization
  WAGTAIL_LAZY_LOADING: 'WAGTAIL_LAZY_LOADING',
  WAGTAIL_CACHING: 'WAGTAIL_CACHING',
  
  // Experimental Features
  WAGTAIL_AI_CONTENT: 'WAGTAIL_AI_CONTENT',
  WAGTAIL_ANALYTICS: 'WAGTAIL_ANALYTICS',
} as const

// Feature flags configuration - now supports both env vars and API
export const FEATURES = {
  // Legacy features (environment variables)
  [FEATURE_FLAGS.ROCKET_ANIMATION]: import.meta.env.VITE_ROCKET_ANIMATION === 'true',
  [FEATURE_FLAGS.BLOG_PAGES]: import.meta.env.VITE_BLOG_PAGES === 'true',
  
  // Wagtail features - these will be overridden by API data
  [FEATURE_FLAGS.WAGTAIL_NAVBAR]: import.meta.env.VITE_WAGTAIL_NAVBAR === 'true',
  [FEATURE_FLAGS.WAGTAIL_FOOTER]: import.meta.env.VITE_WAGTAIL_FOOTER === 'true',
  [FEATURE_FLAGS.WAGTAIL_LAYOUT]: import.meta.env.VITE_WAGTAIL_LAYOUT === 'true',
  [FEATURE_FLAGS.WAGTAIL_HERO]: import.meta.env.VITE_WAGTAIL_HERO === 'true',
  [FEATURE_FLAGS.WAGTAIL_FEATURES]: import.meta.env.VITE_WAGTAIL_FEATURES === 'true',
  [FEATURE_FLAGS.WAGTAIL_TESTIMONIALS]: import.meta.env.VITE_WAGTAIL_TESTIMONIALS === 'true',
  [FEATURE_FLAGS.WAGTAIL_CTA]: import.meta.env.VITE_WAGTAIL_CTA === 'true',
  [FEATURE_FLAGS.WAGTAIL_BLOG]: import.meta.env.VITE_WAGTAIL_BLOG === 'true',
  [FEATURE_FLAGS.WAGTAIL_PORTFOLIO]: import.meta.env.VITE_WAGTAIL_PORTFOLIO === 'true',
  [FEATURE_FLAGS.WAGTAIL_SERVICES]: import.meta.env.VITE_WAGTAIL_SERVICES === 'true',
  [FEATURE_FLAGS.WAGTAIL_HOME]: import.meta.env.VITE_WAGTAIL_HOME === 'true',
  [FEATURE_FLAGS.WAGTAIL_ABOUT]: import.meta.env.VITE_WAGTAIL_ABOUT === 'true',
  [FEATURE_FLAGS.WAGTAIL_CONTACT_FORM]: import.meta.env.VITE_WAGTAIL_CONTACT_FORM === 'true',
  [FEATURE_FLAGS.WAGTAIL_NEWSLETTER]: import.meta.env.VITE_WAGTAIL_NEWSLETTER === 'true',
  [FEATURE_FLAGS.WAGTAIL_ANIMATIONS]: import.meta.env.VITE_WAGTAIL_ANIMATIONS === 'true',
  [FEATURE_FLAGS.WAGTAIL_PARTICLES]: import.meta.env.VITE_WAGTAIL_PARTICLES === 'true',
  [FEATURE_FLAGS.WAGTAIL_SEO]: import.meta.env.VITE_WAGTAIL_SEO === 'true',
  [FEATURE_FLAGS.WAGTAIL_META]: import.meta.env.VITE_WAGTAIL_META === 'true',
  [FEATURE_FLAGS.WAGTAIL_LAZY_LOADING]: import.meta.env.VITE_WAGTAIL_LAZY_LOADING === 'true',
  [FEATURE_FLAGS.WAGTAIL_CACHING]: import.meta.env.VITE_WAGTAIL_CACHING === 'true',
  [FEATURE_FLAGS.WAGTAIL_AI_CONTENT]: import.meta.env.VITE_WAGTAIL_AI_CONTENT === 'true',
  [FEATURE_FLAGS.WAGTAIL_ANALYTICS]: import.meta.env.VITE_WAGTAIL_ANALYTICS === 'true',
} as const

// Type for feature names
export type FeatureName = keyof typeof FEATURES

// Runtime feature flags (loaded from API)
let runtimeFeatures: Record<string, boolean> = {}

// Feature flag metadata
interface FeatureMetadata {
  category: string
  description: string
  isDeprecated: boolean
  deprecationNotes?: string
}

let featureMetadata: Record<string, FeatureMetadata> = {}

// Helper function to check if a feature is enabled
export function isFeatureEnabled(feature: FeatureName): boolean {
  // Check runtime flags first (from API), then fall back to env vars
  if (feature in runtimeFeatures) {
    return runtimeFeatures[feature] || false
  }
  return FEATURES[feature] || false
}

// Helper function to check if using Wagtail version of a component
export function useWagtailComponent(component: string): boolean {
  const featureName = `WAGTAIL_${component.toUpperCase()}` as FeatureName
  return isFeatureEnabled(featureName)
}

// Load feature flags from API
export async function loadFeatureFlags(apiUrl?: string): Promise<void> {
  if (!apiUrl) {
    apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  }
  
  try {
    const response = await fetch(`${apiUrl}/api/feature-flags/`)
    if (response.ok) {
      const data = await response.json()
      runtimeFeatures = data.flags || {}
      
      // Update metadata if available
      if (data.metadata) {
        // Store any additional metadata for debugging/admin purposes
        console.log('Feature flags loaded:', data.metadata)
      }
    }
  } catch (error) {
    console.warn('Failed to load feature flags from API, using environment variables:', error)
  }
}

// Load detailed feature flag information
export async function loadFeatureMetadata(apiUrl?: string): Promise<void> {
  if (!apiUrl) {
    apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  }
  
  try {
    const response = await fetch(`${apiUrl}/api/wagtail-transition/`)
    if (response.ok) {
      const data = await response.json()
      
      // Process category data into metadata
      Object.values(data.categories).forEach((category: any) => {
        category.flags.forEach((flag: any) => {
          featureMetadata[flag.name] = {
            category: category.name,
            description: flag.display_name,
            isDeprecated: flag.is_deprecated,
            deprecationNotes: flag.deprecation_notes,
          }
        })
      })
    }
  } catch (error) {
    console.warn('Failed to load feature metadata:', error)
  }
}

// Get feature metadata
export function getFeatureMetadata(feature: FeatureName): FeatureMetadata | null {
  return featureMetadata[feature] || null
}

// Get all features by category
export function getFeaturesByCategory(category: string): FeatureName[] {
  return Object.keys(featureMetadata)
    .filter(key => featureMetadata[key]?.category === category) as FeatureName[]
}

// Check if a feature is deprecated
export function isFeatureDeprecated(feature: FeatureName): boolean {
  const metadata = getFeatureMetadata(feature)
  return metadata?.isDeprecated || false
}

// Get migration status for a component
export function getMigrationStatus(component: string): 'legacy' | 'transitioning' | 'wagtail' | 'deprecated' {
  const wagtailFeature = `WAGTAIL_${component.toUpperCase()}` as FeatureName
  const isWagtailEnabled = isFeatureEnabled(wagtailFeature)
  const isWagtailDeprecated = isFeatureDeprecated(wagtailFeature)
  
  if (isWagtailDeprecated) {
    return 'deprecated'
  } else if (isWagtailEnabled) {
    return 'wagtail'
  } else if (wagtailFeature in FEATURES) {
    return 'transitioning'
  } else {
    return 'legacy'
  }
}

// Development helper to list all feature flags
export function listAllFeatures(): Record<string, any> {
  const allFeatures: Record<string, any> = {}
  
  Object.keys(FEATURES).forEach(key => {
    const feature = key as FeatureName
    allFeatures[feature] = {
      enabled: isFeatureEnabled(feature),
      deprecated: isFeatureDeprecated(feature),
      metadata: getFeatureMetadata(feature),
      source: feature in runtimeFeatures ? 'api' : 'env'
    }
  })
  
  return allFeatures
}

// Initialize feature flags (call this in your app initialization)
export async function initializeFeatureFlags(): Promise<void> {
  await Promise.all([
    loadFeatureFlags(),
    loadFeatureMetadata()
  ])
}

// Reactive feature flag state for Vue components
import { ref, computed } from 'vue'

export const featureFlagsLoaded = ref(false)
export const featureFlagsError = ref<string | null>(null)

// Computed properties for common feature checks
export const useWagtailLayout = computed(() => isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_LAYOUT))
export const useWagtailNavigation = computed(() => 
  isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_NAVBAR) || isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_FOOTER)
)
export const useWagtailContent = computed(() => 
  isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_HERO) || 
  isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_FEATURES) ||
  isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_CTA)
)

// Auto-reload feature flags periodically (useful during development)
export function startFeatureFlagPolling(intervalMs: number = 30000): () => void {
  const interval = setInterval(() => {
    loadFeatureFlags().catch(console.warn)
  }, intervalMs)
  
  return () => clearInterval(interval)
}
