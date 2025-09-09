<template>
  <div class="services-page">
    <!-- Wagtail Services (when feature flag is enabled) -->
    <WagtailServicesSection 
      v-if="useWagtailServices"
      :services-data="wagtailServicesData"
    />

    <!-- Legacy Services (when feature flag is disabled) -->
    <template v-else>
      <!-- Hero Section -->
      <HeroSection>
        <template #title>
          Our <span class="text-brand-primary">Services</span>
        </template>
        <template #subtitle>
          Professional web and software development packages designed for your business needs. 
          From quick launches to enterprise solutions, we deliver results that drive growth.
        </template>
      </HeroSection>

      <!-- Service Categories -->
      <ServicesGrid 
        title="Choose Your Perfect Package"
        subtitle="Whether you're a startup looking to make your mark or an established business ready to scale, we have the perfect solution to accelerate your growth and maximize your digital potential."
        :services="services"
        @select-service="selectedService = $event"
      />

      <!-- A La Carte Services Menu -->
      <AlaCarteMenu :services="alaCarteServices" />

      <!-- FAQ Section -->
      <FAQSection :faqs="faqs" />
    </template>

    <!-- Feature Flag Indicator (Development Only) -->
    <ServicesFeatureFlagIndicator
      :is-dev="isDev"
      :services-strategy="servicesStrategy"
      :is-wagtail-enabled="useWagtailServices"
      :migration-status="migrationStatus"
      :wagtail-data="wagtailServicesData"
      :wagtail-error="wagtailError"
      :is-loading="wagtailLoading"
      :api-url="apiUrl"
      :last-updated="lastFetched?.toISOString()"
      @refresh="refreshFlags"
      @refresh-data="refreshWagtailData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
import { useWagtailServicesDataAuto } from '../composables/useWagtailServicesData'
import { 
  servicePackages, 
  alaCarteServices as alaCarteData, 
  serviceFAQs,
  type Service,
  type FAQ,
  type AlaCarteService
} from '../data/servicesData'

// Async component imports for better performance
const HeroSection = defineAsyncComponent(() => import('../components/sections/hero/HeroSection.vue'))
const ServicesGrid = defineAsyncComponent(() => import('../components/sections/ServicesGrid.vue'))
const FAQSection = defineAsyncComponent(() => import('../components/sections/faq/FAQSection.vue'))
const AlaCarteMenu = defineAsyncComponent(() => import('../components/sections/AlaCarteMenu.vue'))
const WagtailServicesSection = defineAsyncComponent(() => import('../components/sections/WagtailServicesSection.vue'))
const ServicesFeatureFlagIndicator = defineAsyncComponent(() => import('../components/sections/ServicesFeatureFlagIndicator.vue'))

const { updateSeo } = useSeo()

// Feature flag management
const { 
  useWagtailVersion: useWagtailServices, 
  migrationStatus,
  shouldShowWagtail 
} = useComponentFlags('services')

// Wagtail services data
const {
  data: wagtailServicesData,
  isLoading: wagtailLoading,
  error: wagtailError,
  lastFetched,
  fetchServicesData,
  refresh: refreshWagtailData
} = useWagtailServicesDataAuto({ autoFetch: true })

// Legacy data
const selectedService = ref<Service | null>(null)
const services = ref<Service[]>(servicePackages)
const alaCarteServices = ref<AlaCarteService[]>(alaCarteData)
const faqs = ref<FAQ[]>(serviceFAQs)

// Computed properties for debug menu
const servicesStrategy = computed(() => {
  if (useWagtailServices.value) return 'wagtail'
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
    console.log('Before refresh - Services flags status:', {
      useWagtailServices: useWagtailServices.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Refresh feature flags
    const { refresh } = useFeatureFlags()
    await refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - Services flags status:', {
      useWagtailServices: useWagtailServices.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (useWagtailServices.value) {
      console.log('Refreshing Wagtail services data...')
      await refreshWagtailData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

onMounted(async () => {
  // Initialize feature flags first
  const featureFlags = useFeatureFlags()
  await featureFlags.initialize()
  
  // Fetch Wagtail data if feature flag is enabled
  if (useWagtailServices.value) {
    await fetchServicesData()
  }

  updateSeo({
    title: 'Services - LaunchLine',
    description: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    ogTitle: 'LaunchLine Services - Professional Launch Solutions',
    ogDescription: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    canonical: window.location.origin + '/services'
  })
})
</script>

