<template>
  <div class="blog-page">
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
      @retry="() => fetchBlogPosts(currentPage)"
      @change-page="loadPage"
      @categories-change="handleCategoriesChange"
      @special-filters-change="handleSpecialFiltersChange"
    />

    <!-- Newsletter Signup -->
    <NewsletterSection @subscribe="handleNewsletterSubscribe" />

    <!-- Floating Back to Top Button -->
    <BackToTopButton :show="showBackToTop" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { api, type BlogPage } from '../lib/api'
import { useSeo } from '../lib/seo'
import { useBlogFilters } from '../composables/useBlogFilters'

// Async component imports for better performance
const BlogHero = defineAsyncComponent(() => import('../components/sections/hero/BlogHero.vue'))
const BlogSection = defineAsyncComponent(() => import('../components/sections/BlogSection.vue'))
const NewsletterSection = defineAsyncComponent(() => import('../components/sections/NewsletterSection.vue'))
const BlogFilterSection = defineAsyncComponent(() => import('../components/blog/BlogFilterSection.vue'))
const BackToTopButton = defineAsyncComponent(() => import('../components/ui/BackToTopButton.vue'))

const { updateSeo } = useSeo()

const blogPosts = ref<BlogPage[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pagination = ref<{
  next: string | null
  previous: string | null
  count: number
} | null>(null)

// Search and Filter State
const searchQuery = ref('')
const selectedCategories = ref(['All'])
const specialFilters = ref({
  popular: false,
  featured: false,
  recent: false
})
const showBackToTop = ref(false)
let searchTimeout: number | null = null

// Categories - could be fetched from API in real app
const categories = ref(['All', 'Web Development', 'Launch Strategies', 'Technology', 'Business', 'Digital Marketing'])

// Use blog filters composable
const {
  filteredPosts,
  searchSuggestions,
  hasActiveSearch,
  totalPosts: totalPostsFromComposable
} = useBlogFilters(blogPosts, categories, searchQuery, selectedCategories, specialFilters)

// Computed Properties
const totalPosts = computed(() => pagination.value?.count || totalPostsFromComposable.value)
const displayedPosts = computed(() => filteredPosts.value)

// Methods
const applySearchSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  debouncedSearch()
}

const handleNewsletterSubscribe = async (email: string) => {
  try {
    console.log('Newsletter subscription for:', email)
    
    // Submit as a lead with newsletter source
    const leadData = {
      name: 'Newsletter Subscriber', // Default name for newsletter subscriptions
      email: email,
      message: 'Newsletter subscription request',
      source: 'newsletter'
    }
    
    const response = await api.submitLead(leadData)
    
    if (response.success) {
      console.log('Newsletter subscription successful')
      // You could show a success message here if needed
    } else {
      console.error('Newsletter subscription failed:', response.error)
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
  }
}

const fetchBlogPosts = async (page: number = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const response = await api.getBlogList(page)
    
    if (response.success && response.data) {
      // Handle API response structure
      const items = response.data.items || []
      
      // Transform API response to match our BlogPage interface
      blogPosts.value = items.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.meta?.slug || item.slug,
        intro: item.intro || item.title, // Fallback to title if intro not available
        date: item.meta?.first_published_at || item.date || new Date().toISOString(),
        featured_image: item.featured_image || item.featuredImage,
        content: item.content,
        seo: {
          title: item.title,
          description: item.meta?.search_description || item.search_description || ''
        }
      }))
      

      
      // Handle pagination from API response
      pagination.value = {
        next: response.data.meta?.next || null,
        previous: response.data.meta?.previous || null,
        count: response.data.meta?.total_count || items.length
      }
      currentPage.value = page
    } else {
      error.value = response.error || 'Failed to load blog posts'

    }
  } catch (err) {
    error.value = 'Network error occurred'
    console.error('Failed to fetch blog posts:', err)
  } finally {
    loading.value = false
  }
}

const loadPage = (page: number) => {
  if (typeof page !== 'number' || isNaN(page)) {
    console.error('Invalid page number:', page)
    return
  }
  fetchBlogPosts(page)
}

// Search and Filter Methods
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    // In a real app, you might want to refetch from API with search query
    // console.log('Searching for:', searchQuery.value)
  }, 300)
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleCategoriesChange = (categories: string[]) => {
  selectedCategories.value = categories
  // Note: No pagination reset - maintain current page when filtering
}

const handleSpecialFiltersChange = (filters: { popular: boolean; featured: boolean; recent: boolean }) => {
  specialFilters.value = filters
  // Note: No pagination reset - maintain current page when filtering
}

const handleClearCategories = () => {
  selectedCategories.value = [categories.value.find(c => c.toLowerCase().includes('all')) || 'All']
}

const handleClearSpecialFilters = () => {
  specialFilters.value = { popular: false, featured: false, recent: false }
}

// Scroll handling
const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

onMounted(() => {
  // Reset filter state to defaults when component mounts
  searchQuery.value = ''
  selectedCategories.value = ['All']
  specialFilters.value = {
    popular: false,
    featured: false,
    recent: false
  }
  
  fetchBlogPosts()
  window.addEventListener('scroll', handleScroll)
  
  updateSeo({
    title: 'Blog - LaunchLine',
    description: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    ogTitle: 'LaunchLine Blog - Launch Strategy Insights',
    ogDescription: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    canonical: window.location.origin + '/blog'
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>

<style scoped>
/* Blog page specific styles */
.blog-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
}



/* Enhanced animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  }
}

/* Apply animations */
.blog-page > * {
  animation: slideInUp 0.6s ease-out forwards;
}

.blog-page > *:nth-child(2) {
  animation-delay: 0.1s;
}

.blog-page > *:nth-child(3) {
  animation-delay: 0.2s;
}

.blog-page > *:nth-child(4) {
  animation-delay: 0.3s;
}


/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .blog-page {
    background: linear-gradient(135deg, #0c0a1a 0%, #1a1625 50%, #2d1b3d 100%);
  }
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #60a5fa, #2563eb);
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, 
    rgba(55, 65, 81, 0.1) 25%, 
    rgba(75, 85, 99, 0.2) 50%, 
    rgba(55, 65, 81, 0.1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}
</style>