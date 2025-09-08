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
    <section class="enhanced-filter-section">
      <div class="section-background">
        <div class="bg-gradient"></div>
        <div class="floating-elements">
          <div class="floating-orb orb-1"></div>
          <div class="floating-orb orb-2"></div>
          <div class="floating-orb orb-3"></div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Search Section -->
        <div class="search-container">
          <div class="search-header">
            <h2 class="search-title">
              <span class="title-icon">🔍</span>
              Find Your Perfect Article
            </h2>
            <p class="search-subtitle">
              Search through our collection of {{ totalPosts }} articles and filter by category
            </p>
          </div>
          
          <!-- Enhanced Search Bar -->
          <div class="search-wrapper">
            <div class="search-input-container">
              <div class="search-icon">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              
              <input 
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text" 
                placeholder="Search articles, topics, technologies..." 
                class="enhanced-search-input"
              />
              
              <!-- Clear Button -->
              <transition name="fade">
                <button 
                  v-if="searchQuery" 
                  @click="clearSearch" 
                  class="clear-button"
                  aria-label="Clear search"
                >
                  <svg class="clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </transition>
              
              <!-- Search Suggestions (if search is active) -->
              <div v-if="searchQuery && searchSuggestions.length" class="search-suggestions">
                <div class="suggestions-header">
                  <span class="suggestions-title">Quick suggestions:</span>
                </div>
                <div class="suggestions-list">
                  <button 
                    v-for="suggestion in searchSuggestions" 
                    :key="suggestion"
                    @click="applySearchSuggestion(suggestion)"
                    class="suggestion-item"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Search Results Info -->
        <transition name="slide-fade">
          <div v-if="hasActiveSearch" class="search-results-info">
            <div class="results-container">
              <div class="results-icon">
                <span v-if="filteredPosts.length > 0">🎯</span>
                <span v-else>😔</span>
              </div>
              
              <div class="results-content">
                <div class="results-main">
                  <span v-if="searchQuery && filteredPosts.length > 0" class="results-text">
                    Found <span class="highlight">{{ filteredPosts.length }}</span> 
                    {{ filteredPosts.length === 1 ? 'article' : 'articles' }} 
                    matching "<span class="search-term">{{ searchQuery }}</span>"
                  </span>
                  <span v-else-if="searchQuery && filteredPosts.length === 0" class="results-text no-results">
                    No articles found for "<span class="search-term">{{ searchQuery }}</span>"
                  </span>
                  <span v-else-if="selectedCategories.filter(c => !c.toLowerCase().includes('all')).length > 0" class="results-text">
                    Showing <span class="highlight">{{ filteredPosts.length }}</span>
                    {{ filteredPosts.length === 1 ? 'article' : 'articles' }} 
                    in <span class="category-name">{{ selectedCategories.filter(c => !c.toLowerCase().includes('all')).join(', ') }}</span>
                  </span>
                  <span v-else-if="specialFilters.popular || specialFilters.featured || specialFilters.recent" class="results-text">
                    Displaying <span class="highlight">{{ filteredPosts.length }}</span> 
                    filtered {{ filteredPosts.length === 1 ? 'article' : 'articles' }}
                  </span>
                </div>
                
                <!-- Quick Actions -->
                <div class="quick-actions">
                  <button v-if="searchQuery" @click="clearSearch" class="quick-action">
                    Clear search
                  </button>
                  <button v-if="selectedCategories.filter(c => !c.toLowerCase().includes('all')).length > 0" @click="handleCategoriesChange([categories.find(c => c.toLowerCase().includes('all')) || 'All'])" class="quick-action">
                    Clear categories
                  </button>
                  <button v-if="specialFilters.popular || specialFilters.featured || specialFilters.recent" @click="handleSpecialFiltersChange({ popular: false, featured: false, recent: false })" class="quick-action">
                    Clear special filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>

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
    <transition name="fade">
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-30 bg-brand-primary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
    </transition>
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

// Scroll handling
const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
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

/* Enhanced Filter Section */
.enhanced-filter-section {
  position: relative;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
  overflow: hidden;
}

/* Section Background */
.section-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at bottom, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
}

.floating-elements {
  position: absolute;
  inset: 0;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  animation: floatOrb 8s ease-in-out infinite;
  filter: blur(1px);
}

.orb-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 15%;
  animation-delay: -3s;
}

.orb-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 70%;
  animation-delay: -6s;
}

@keyframes floatOrb {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  33% {
    transform: translateY(-20px) translateX(10px) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(10px) translateX(-10px) scale(0.9);
    opacity: 0.5;
  }
}

/* Search Container */
.search-container {
  margin-bottom: 2rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
}

.title-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
}

.search-subtitle {
  color: #9ca3af;
  font-size: 1.125rem;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Search Wrapper */
.search-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-input-container {
  position: relative;
  width: 100%;
  max-width: 600px;
}

/* Enhanced Search Input */
.enhanced-search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3.5rem;
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(75, 85, 99, 0.3);
  border-radius: 1.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.enhanced-search-input::placeholder {
  color: #6b7280;
}

.enhanced-search-input:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(31, 41, 55, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.enhanced-search-input:focus {
  border-color: #3b82f6;
  background: rgba(31, 41, 55, 0.95);
  transform: translateY(-2px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.15),
    0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Search Icon */
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  transition: color 0.3s ease;
  z-index: 2;
}

.search-input-container:hover .search-icon,
.enhanced-search-input:focus + .search-icon {
  color: #3b82f6;
}

.search-icon .icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Clear Button */
.clear-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.clear-button:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.clear-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: #ef4444;
}

/* Search Suggestions */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(31, 41, 55, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-top: none;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  z-index: 10;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestions-header {
  margin-bottom: 0.75rem;
}

.suggestions-title {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggestion-item {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
}

/* Search Results Info */
.search-results-info {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
}

.results-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.results-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.results-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.results-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.results-text {
  color: #d1d5db;
  font-size: 1rem;
  line-height: 1.5;
}

.results-text.no-results {
  color: #fbbf24;
}

.highlight {
  color: #3b82f6;
  font-weight: 700;
}

.search-term {
  color: #60a5fa;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
}

.category-name {
  color: #a78bfa;
  font-weight: 600;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.quick-action {
  background: rgba(75, 85, 99, 0.3);
  color: #d1d5db;
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Smooth transitions for everything */
* {
  transition: all 0.3s ease;
}

/* Search bar animations */
.search-bar input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Sticky header glassmorphism effect */
.sticky {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
}

/* Enhanced search input */
.search-input {
  background: rgba(31, 41, 55, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(75, 85, 99, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:hover {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

/* Floating back-to-top button */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
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

/* Enhanced mobile responsiveness */
@media (max-width: 1024px) {
  .search-title {
    font-size: 1.75rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .orb-3 {
    display: none;
  }
}

@media (max-width: 768px) {
  .enhanced-filter-section {
    padding: 2rem 0;
  }
  
  .search-title {
    font-size: 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .title-icon {
    font-size: 1.75rem;
  }
  
  .search-subtitle {
    font-size: 1rem;
  }
  
  .enhanced-search-input {
    padding: 0.875rem 1rem 0.875rem 3rem;
    font-size: 0.875rem;
  }
  
  .search-icon .icon {
    width: 1rem;
    height: 1rem;
  }
  
  .clear-button {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .orb-1, .orb-2 {
    display: none;
  }
  
  .results-container {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .results-icon {
    align-self: flex-start;
  }
  
  .quick-actions {
    gap: 0.5rem;
  }
  
  .quick-action {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 640px) {
  .search-header {
    margin-bottom: 1.5rem;
  }
  
  .search-wrapper {
    margin-bottom: 0.75rem;
  }
  
  .enhanced-search-input {
    padding: 0.75rem 0.875rem 0.75rem 2.75rem;
  }
  
  .search-icon {
    left: 0.875rem;
  }
  
  .clear-button {
    right: 0.875rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .search-results-info {
    padding: 1rem;
  }
  
  .suggestions-list {
    gap: 0.375rem;
  }
  
  .suggestion-item {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
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

/* Performance optimizations */
.enhanced-search-input,
.clear-button,
.suggestion-item,
.quick-action {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.enhanced-search-input:not(:focus),
.clear-button:not(:hover),
.suggestion-item:not(:hover),
.quick-action:not(:hover) {
  will-change: auto;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .floating-orb,
  .slideDown {
    animation: none !important;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
  
  .enhanced-search-input:hover,
  .enhanced-search-input:focus,
  .clear-button:hover,
  .suggestion-item:hover,
  .quick-action:hover {
    transform: none !important;
  }
}

/* Focus indicators */
button:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>