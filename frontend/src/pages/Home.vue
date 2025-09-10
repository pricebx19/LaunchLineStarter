<template>
  <div class="home-page">
    <!-- Wagtail Home (when feature flag is enabled) -->
    <WagtailHomeSection 
      v-if="useWagtailHome"
      :home-data="wagtailHomeData"
    />

    <!-- Legacy Home (when feature flag is disabled) -->
    <template v-else>
      <!-- Conditional rendering based on device type -->
      <MobileHome v-if="isMobile" />
      <DesktopHome v-else />
    </template>

    <!-- Feature Flag Indicator (Development Only) -->
    <HomeFeatureFlagIndicator
      :is-dev="isDev"
      :home-strategy="homeStrategy"
      :is-wagtail-enabled="useWagtailHome"
      :migration-status="migrationStatus"
      :home-data="wagtailHomeData"
      :home-error="wagtailError"
      :is-loading="wagtailLoading"
      :api-url="apiUrl"
      :last-updated="lastFetched?.toISOString() || null"
      @refresh="refreshFlags"
      @refresh-data="fetchWagtailData"
    />
  </div>
</template>

<style scoped>
.home-page {
  /* Base styles for home page container */
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useMobileDetection } from '../composables/useMobileDetection'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
import { useWagtailData } from '../composables/useStores'
import { useSeo } from '../lib/seo'
// import type { HomePageProps } from '../types'

// Use mobile detection
const { isMobile } = useMobileDetection()

// Feature flag management
const { 
  useWagtailVersion: useWagtailHome, 
  migrationStatus,
  shouldShowWagtail 
} = useComponentFlags('home')

// Wagtail home data using new stores
const wagtailData = useWagtailData()
// const _ui = useUI()

const wagtailHomeData = computed(() => wagtailData.getData('home'))
const wagtailLoading = computed(() => wagtailData.isLoading('home'))
const wagtailError = computed(() => wagtailData.getError('home'))
// const _hasWagtailData = computed(() => wagtailData.hasData('home'))
const lastFetched = computed(() => wagtailData.getLastFetched('home'))

const fetchWagtailData = () => wagtailData.fetchData('home')

// Computed properties for debug menu
const homeStrategy = computed(() => {
  if (useWagtailHome.value) return 'wagtail'
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
    console.log('Before refresh - Home flags status:', {
      useWagtailHome: useWagtailHome.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Refresh feature flags
    const featureFlags = useFeatureFlags()
    await featureFlags.refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - Home flags status:', {
      useWagtailHome: useWagtailHome.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (useWagtailHome.value) {
      console.log('Refreshing Wagtail home data...')
      await fetchWagtailData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

// Import components conditionally
const MobileHome = defineAsyncComponent(() => import('../components/pages/MobileHome.vue'))
const DesktopHome = defineAsyncComponent(() => import('../components/pages/DesktopHome.vue'))
const WagtailHomeSection = defineAsyncComponent(() => import('../components/sections/WagtailHomeSection.vue'))
const HomeFeatureFlagIndicator = defineAsyncComponent(() => import('../components/sections/HomeFeatureFlagIndicator.vue'))

// SEO
const { updateSeo } = useSeo()

onMounted(async () => {
  // Initialize feature flags first
  const featureFlags = useFeatureFlags()
  await featureFlags.initialize()
  
  // Fetch Wagtail data if feature flag is enabled
  if (useWagtailHome.value) {
    await fetchWagtailData()
  }

  updateSeo({
    title: 'LaunchLine LLC - Professional Launch Solutions',
    description: 'Transform your business with professional web development and launch strategies. From startups to enterprise, we deliver results that drive growth.',
    ogTitle: 'LaunchLine LLC - Professional Launch Solutions',
    ogDescription: 'Transform your business with professional web development and launch strategies. From startups to enterprise, we deliver results that drive growth.',
    canonical: window.location.origin + '/'
  })
})
</script>