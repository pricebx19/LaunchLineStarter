<template>
  <div class="about-page">
    <!-- Wagtail About (when feature flag is enabled) -->
    <WagtailAboutSection 
      v-if="useWagtailAbout"
      :about-data="wagtailAboutData"
    />

    <!-- Legacy About (when feature flag is disabled) -->
    <template v-else>
      <!-- Hero Section -->
      <AboutHero />

      <!-- Mission & Vision -->
      <MissionSection />

      <!-- Our Approach -->
      <ProcessSection />

      <!-- Our Values - Orbital System -->
      <ValuesSection />
    </template>

    <!-- Feature Flag Indicator (Development Only) -->
    <AboutFeatureFlagIndicator
      :is-dev="isDev"
      :about-strategy="aboutStrategy"
      :is-wagtail-enabled="useWagtailAbout"
      :migration-status="migrationStatus"
      :about-data="wagtailAboutData"
      :about-error="wagtailError"
      :is-loading="wagtailLoading"
      :api-url="apiUrl"
      :last-updated="lastFetched?.toISOString() || null"
      @refresh="refreshFlags"
      @refresh-data="refreshWagtailData"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
import { useWagtailAboutDataAuto } from '../composables/useWagtailAboutData'
// import type { AboutPageProps } from '../types'

// Feature flag management
const { 
  useWagtailVersion: useWagtailAbout, 
  migrationStatus,
  shouldShowWagtail 
} = useComponentFlags('about')

// Wagtail about data
const {
  data: wagtailAboutData,
  isLoading: wagtailLoading,
  error: wagtailError,
  lastFetched,
  fetchAboutData,
  refresh: refreshWagtailData
} = useWagtailAboutDataAuto({ autoFetch: true })

// Computed properties for debug menu
const aboutStrategy = computed(() => {
  if (useWagtailAbout.value) return 'wagtail'
  if (migrationStatus.value === 'transitioning') return 'transitioning'
  return 'legacy'
})

const isDev = computed(() => {
  // Check if we're in development mode
  return typeof window !== 'undefined' && window.location.hostname === 'localhost'
})

const apiUrl = computed(() => {
  return 'http://localhost:8000' // Default API URL
})

// Methods for debug menu
const refreshFlags = async () => {
  try {
    console.log('Refreshing feature flags...')
    console.log('Before refresh - About flags status:', {
      useWagtailAbout: useWagtailAbout.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Refresh feature flags
    const featureFlags = useFeatureFlags()
    await featureFlags.refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - About flags status:', {
      useWagtailAbout: useWagtailAbout.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (useWagtailAbout.value) {
      console.log('Refreshing Wagtail about data...')
      await refreshWagtailData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

// Import components conditionally
const AboutHero = defineAsyncComponent(() => import('../components/about/AboutHero.vue'))
const MissionSection = defineAsyncComponent(() => import('../components/about/MissionSection.vue'))
const ProcessSection = defineAsyncComponent(() => import('../components/about/ProcessSection.vue'))
const ValuesSection = defineAsyncComponent(() => import('../components/about/ValuesSection.vue'))
const WagtailAboutSection = defineAsyncComponent(() => import('../components/sections/WagtailAboutSection.vue'))
const AboutFeatureFlagIndicator = defineAsyncComponent(() => import('../components/sections/AboutFeatureFlagIndicator.vue'))

const { updateSeo } = useSeo()

defineOptions({
  name: 'About'
})

onMounted(async () => {
  // Initialize feature flags first
  const featureFlags = useFeatureFlags()
  await featureFlags.initialize()
  
  // Fetch Wagtail data if feature flag is enabled
  if (useWagtailAbout.value) {
    await fetchAboutData()
  }

  updateSeo({
    title: 'About - LaunchLine',
    description: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    ogTitle: 'About LaunchLine - Professional Launch Solutions',
    ogDescription: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    canonical: window.location.origin + '/about'
  })
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}
</style>