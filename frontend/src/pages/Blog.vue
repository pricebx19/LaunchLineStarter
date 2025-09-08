<template>
  <BlogPageLayout>
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

    <!-- Floating Back to Top Button -->
    <BackToTopButton :show="showBackToTop" />
  </BlogPageLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useBlogData } from '../composables/useBlogData'
import { useBlogState } from '../composables/useBlogState'
import { useNewsletter } from '../composables/useNewsletter'
import { useScroll } from '../composables/useScroll'

// Async component imports for better performance
const BlogHero = defineAsyncComponent(() => import('../components/sections/hero/BlogHero.vue'))
const BlogSection = defineAsyncComponent(() => import('../components/sections/BlogSection.vue'))
const NewsletterSection = defineAsyncComponent(() => import('../components/sections/NewsletterSection.vue'))
const BlogFilterSection = defineAsyncComponent(() => import('../components/blog/BlogFilterSection.vue'))
const BackToTopButton = defineAsyncComponent(() => import('../components/ui/BackToTopButton.vue'))
const BlogPageLayout = defineAsyncComponent(() => import('../components/layout/BlogPageLayout.vue'))

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
  // Reset filter state to defaults when component mounts
  resetFilters()
  
  // Fetch initial blog posts
  await fetchBlogPosts()
  
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
