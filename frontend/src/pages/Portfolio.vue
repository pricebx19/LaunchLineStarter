<template>
  <div class="portfolio-page overflow-hidden">
    <!-- Wagtail Portfolio (when feature flag is enabled) -->
    <WagtailPortfolioSection 
      v-if="useWagtailPortfolio"
      :portfolio-data="wagtailPortfolioData"
    />

    <!-- Legacy Portfolio (when feature flag is disabled) -->
    <template v-else>
      <!-- Portfolio Hero Section -->
      <PortfolioHero :stats="stats" />

      <!-- Portfolio Grid with Filters -->
      <PortfolioGrid
        :categories="categories"
        :selected-categories="selectedCategories"
        :special-filters="specialFilters"
        :projects="projects"
        @categories-change="handleCategoriesChange"
        @special-filters-change="handleSpecialFiltersChange"
      />

      <!-- Success Stories Section -->
      <SuccessStoriesSection :case-studies="caseStudies" />

      <!-- Technologies Showcase -->
      <TechnologiesShowcase :technologies="technologies" />

      <!-- Portfolio CTA Section -->
      <PortfolioCTASection />
    </template>

    <!-- Feature Flag Indicator (Development Only) -->
    <PortfolioFeatureFlagIndicator
      :is-dev="isDev"
      :portfolio-strategy="portfolioStrategy"
      :is-wagtail-enabled="useWagtailPortfolio"
      :migration-status="migrationStatus"
      :portfolio-data="wagtailPortfolioData"
      :portfolio-error="wagtailError"
      :is-loading="wagtailLoading"
      :api-url="apiUrl"
      :last-updated="lastFetched?.toISOString() || null"
      @refresh="refreshFlags"
      @refresh-data="refreshWagtailData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
import { useWagtailPortfolioDataAuto } from '../composables/useWagtailPortfolioData'
import { 
  portfolioCategories, 
  portfolioStats, 
  portfolioTechnologies, 
  portfolioProjects, 
  portfolioCaseStudies,
  type Project,
  type CaseStudy,
  type Technology,
} from '../data/portfolioData'
import type { CTAStat } from '../types/index'

// Feature flag management
const { 
  useWagtailVersion: useWagtailPortfolio, 
  migrationStatus,
  shouldShowWagtail 
} = useComponentFlags('portfolio')

// Wagtail portfolio data
const {
  data: wagtailPortfolioData,
  isLoading: wagtailLoading,
  error: wagtailError,
  lastFetched,
  fetchPortfolioData,
  refresh: refreshWagtailData
} = useWagtailPortfolioDataAuto({ autoFetch: true })

// Computed properties for debug menu
const portfolioStrategy = computed(() => {
  if (useWagtailPortfolio.value) return 'wagtail'
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
    console.log('Before refresh - Portfolio flags status:', {
      useWagtailPortfolio: useWagtailPortfolio.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Refresh feature flags
    const featureFlags = useFeatureFlags()
    await featureFlags.refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - Portfolio flags status:', {
      useWagtailPortfolio: useWagtailPortfolio.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (useWagtailPortfolio.value) {
      console.log('Refreshing Wagtail portfolio data...')
      await refreshWagtailData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

const { updateSeo } = useSeo()

// Async components for better performance
const PortfolioHero = defineAsyncComponent(() => import('../components/sections/hero/PortfolioHero.vue'))
const PortfolioGrid = defineAsyncComponent(() => import('../components/content/portfolio/grids/PortfolioGrid.vue'))
const SuccessStoriesSection = defineAsyncComponent(() => import('../components/sections/SuccessStoriesSection.vue'))
const TechnologiesShowcase = defineAsyncComponent(() => import('../components/sections/features/TechnologiesShowcase.vue'))
const PortfolioCTASection = defineAsyncComponent(() => import('../components/sections/PortfolioCTASection.vue'))
const WagtailPortfolioSection = defineAsyncComponent(() => import('../components/sections/WagtailPortfolioSection.vue'))
const PortfolioFeatureFlagIndicator = defineAsyncComponent(() => import('../components/sections/PortfolioFeatureFlagIndicator.vue'))

// Reactive state
const selectedCategories = ref<string[]>(['All Projects'])
const specialFilters = ref({
  popular: false,
  featured: false,
  recent: false
})
// Data from external files
const categories = ref<string[]>(portfolioCategories)
const stats = ref<CTAStat[]>(portfolioStats)
const technologies = ref<Technology[]>(portfolioTechnologies)
const projects = ref<Project[]>(portfolioProjects)
const caseStudies = ref<CaseStudy[]>(portfolioCaseStudies)

// Methods (none needed - all handled by child components)

// Handle filter changes
const handleCategoriesChange = (categories: string[]) => {
  selectedCategories.value = categories
}

const handleSpecialFiltersChange = (filters: { popular: boolean; featured: boolean; recent: boolean }) => {
  specialFilters.value = filters
}

onMounted(async () => {
  // Initialize feature flags first
  const featureFlags = useFeatureFlags()
  await featureFlags.initialize()
  
  // Fetch Wagtail data if feature flag is enabled
  if (useWagtailPortfolio.value) {
    await fetchPortfolioData()
  }

  // Reset filter state to defaults when component mounts
  selectedCategories.value = ['All Projects']
  specialFilters.value = {
    popular: false,
    featured: false,
    recent: false
  }
  
  updateSeo({
    title: 'Portfolio - LaunchLine LLC | Our Work & Success Stories',
    description: 'See how LaunchLine has launched businesses into the digital stratosphere. View our stunning portfolio of SaaS platforms, e-commerce sites, and enterprise solutions.',
    ogTitle: 'Portfolio - LaunchLine LLC | Our Work & Success Stories',
    ogDescription: 'See how LaunchLine has launched businesses into the digital stratosphere. View our stunning portfolio of SaaS platforms, e-commerce sites, and enterprise solutions.',
    canonical: window.location.origin + '/portfolio'
  })
})
</script>


