<template>
  <BlogPageLayout>
    <!-- Wagtail Blog (when feature flag is enabled) -->
    <WagtailBlogSection 
      v-if="useWagtailBlog"
      :blog-data="wagtailBlogData"
    />

    <!-- Legacy Blog (when feature flag is disabled) -->
    <template v-else>
      <!-- Hero Section -->
      <BlogHero>
        <template #title>
          LaunchLine LLC <span class="text-brand-primary">Blog</span>
        </template>
        <template #subtitle>
          Explore insights on web development, launch strategies, and digital transformation. 
          <span class="block mt-2 text-lg">{{ totalPosts }} articles and counting...</span>
        </template>
      </BlogHero>

      <!-- Enhanced Search and Filter Section -->
      <BlogFilterSection
        :search-query="searchQuery"
        :total-posts="totalPosts"
        :search-suggestions="searchSuggestions"
        :has-active-search="Boolean(hasActiveSearch)"
        :filtered-posts="filteredPosts"
        :selected-categories="selectedCategories"
        :special-filters="specialFilters"
        :categories="categories"
        @update:search-query="searchQuery = $event"
        @clear-search="clearSearch"
        @clear-categories="handleClearCategories"
        @clear-special-filters="handleClearSpecialFilters"
        @suggestion-click="applySearchSuggestion"
      />

      <!-- Blog Posts -->
      <BlogSection 
        :blog-posts="displayedPosts"
        :loading="loading"
        :error="error"
        :current-page="currentPage"
        :pagination="pagination"
        :categories="categories"
        :selected-categories="selectedCategories"
        :special-filters="specialFilters"
        @retry="retry"
        @change-page="loadPage"
        @categories-change="handleCategoriesChange"
        @special-filters-change="handleSpecialFiltersChange"
      />

      <!-- Newsletter Signup -->
      <NewsletterSection @subscribe="handleNewsletterSubscribe" />
    </template>

    <!-- Floating Back to Top Button -->
    <BackToTopButton :show="showBackToTop" />

    <!-- Feature Flag Indicator (Development Only) -->
    <BlogFeatureFlagIndicator
      :is-dev="isDev"
      :blog-strategy="blogStrategy"
      :is-wagtail-enabled="useWagtailBlog"
      :migration-status="migrationStatus"
      :blog-data="wagtailBlogData"
      :blog-error="wagtailError"
      :is-loading="wagtailLoading"
      :api-url="apiUrl"
      :last-updated="lastFetched?.toISOString() || null"
      @refresh="refreshFlags"
      @refresh-data="refreshWagtailData"
    />
  </BlogPageLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
import { useWagtailBlogDataAuto } from '../composables/useWagtailBlogData'
import { useBlogData } from '../composables/useBlogData'
import { useBlogState } from '../composables/useBlogState'
import { useNewsletter } from '../composables/useNewsletter'
import { useScroll } from '../composables/useScroll'
// import type { BlogPageProps } from '../types'

// Feature flag management
const { 
  useWagtailVersion: useWagtailBlog, 
  migrationStatus,
  shouldShowWagtail 
} = useComponentFlags('blog')

// Wagtail blog data
const {
  data: wagtailBlogData,
  isLoading: wagtailLoading,
  error: wagtailError,
  lastFetched,
  fetchBlogData,
  refresh: refreshWagtailData
} = useWagtailBlogDataAuto({ autoFetch: true })

// Computed properties for debug menu
const blogStrategy = computed(() => {
  if (useWagtailBlog.value) return 'wagtail'
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
    console.log('Before refresh - Blog flags status:', {
      useWagtailBlog: useWagtailBlog.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Refresh feature flags
    const featureFlags = useFeatureFlags()
    await featureFlags.refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - Blog flags status:', {
      useWagtailBlog: useWagtailBlog.value,
      migrationStatus: migrationStatus.value,
      shouldShowWagtail: shouldShowWagtail.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (useWagtailBlog.value) {
      console.log('Refreshing Wagtail blog data...')
      await refreshWagtailData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

// Async component imports for better performance
const BlogHero = defineAsyncComponent(() => import('../components/sections/hero/BlogHero.vue'))
const BlogSection = defineAsyncComponent(() => import('../components/sections/BlogSection.vue'))
const NewsletterSection = defineAsyncComponent(() => import('../components/sections/NewsletterSection.vue'))
const BlogFilterSection = defineAsyncComponent(() => import('../components/blog/BlogFilterSection.vue'))
const BackToTopButton = defineAsyncComponent(() => import('../components/ui/BackToTopButton.vue'))
const BlogPageLayout = defineAsyncComponent(() => import('../components/layout/BlogPageLayout.vue'))
const WagtailBlogSection = defineAsyncComponent(() => import('../components/sections/WagtailBlogSection.vue'))
const BlogFeatureFlagIndicator = defineAsyncComponent(() => import('../components/sections/BlogFeatureFlagIndicator.vue'))

// Composables
const { updateSeo } = useSeo()
const { handleNewsletterSubscribe } = useNewsletter()
const { showBackToTop } = useScroll()

// Blog data management
const {
  blogPosts,
  loading,
  error,
  currentPage,
  pagination,
  fetchBlogPosts,
  loadPage,
  retry
} = useBlogData()

// Blog state management
const {
  searchQuery,
  selectedCategories,
  specialFilters,
  categories,
  filteredPosts,
  searchSuggestions,
  hasActiveSearch,
  totalPostsFromComposable,
  applySearchSuggestion,
  clearSearch,
  handleCategoriesChange,
  handleSpecialFiltersChange,
  handleClearCategories,
  handleClearSpecialFilters,
  resetFilters,
  cleanup
} = useBlogState(blogPosts)

// Computed Properties
const totalPosts = computed(() => pagination.value?.count || totalPostsFromComposable.value)
const displayedPosts = computed(() => filteredPosts.value)

// Lifecycle
onMounted(async () => {
  // Initialize feature flags first
  const featureFlags = useFeatureFlags()
  await featureFlags.initialize()
  
  // Fetch Wagtail data if feature flag is enabled
  if (useWagtailBlog.value) {
    await fetchBlogData()
  }

  // Reset filter state to defaults when component mounts
  resetFilters()
  
  // Fetch initial blog posts (for legacy mode)
  if (!useWagtailBlog.value) {
    await fetchBlogPosts()
  }
  
  // Setup SEO
  updateSeo({
    title: 'Blog - LaunchLine',
    description: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    ogTitle: 'LaunchLine Blog - Launch Strategy Insights',
    ogDescription: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    canonical: window.location.origin + '/blog'
  })
})

onUnmounted(() => {
  cleanup()
})
</script>
