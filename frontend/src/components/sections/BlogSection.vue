<template>
  <section class="py-16 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Subtle starry background -->
    <div class="stars-container absolute inset-0 opacity-25">
      <div class="star star-small" v-for="i in 20" :key="`blog-${i}`" :style="getStarStyle()"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Loading State -->
      <LoadingState 
        v-if="loading" 
        :message="loadingMessage ?? 'Loading blog posts...'"
      />

      <!-- Error State -->
      <ErrorState 
        v-else-if="error"
        :title="errorTitle ?? 'Error Loading Blog'"
        :message="error"
        @retry="$emit('retry')"
      />

      <!-- Blog Content -->
      <div v-else-if="blogPosts.length > 0" class="space-y-10">
        <!-- Category Filters -->
        <div class="filter-section">
          <CategoryFilter 
            :categories="categories"
            :selected-categories="selectedCategories"
            :special-filters="specialFilters"
            :item-type="'Posts'"
            :page-key="'blog'"
            @categories-change="$emit('categoriesChange', $event)"
            @special-filters-change="$emit('specialFiltersChange', $event)"
          />
        </div>

        <BlogGrid 
          :blog-posts="blogPosts"
          :current-page="currentPage"
          :pagination="pagination"
          @change-page="$emit('changePage', $event)"
        />
      </div>

      <!-- Empty State -->
      <ErrorState 
        v-else
        title="No Blog Posts Yet"
        message="Check back soon for our latest insights and updates!"
        :show-retry-button="false"
        error-type="not-found"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPage } from '../../lib/api'
import LoadingState from '../ui/feedback/LoadingState.vue'
import ErrorState from '../ui/feedback/ErrorState.vue'
import BlogGrid from '../content/blog/BlogGrid.vue'
import CategoryFilter from '../utility/filters/CategoryFilter.vue'

interface Pagination {
  next: string | null
  previous: string | null
  count: number
}

interface Props {
  blogPosts: BlogPage[]
  loading: boolean
  error: string | null
  currentPage: number
  pagination: Pagination | null
  categories: string[]
  selectedCategories: string[]
  specialFilters: { popular: boolean; featured: boolean; recent: boolean }
  loadingMessage?: string
  errorTitle?: string
}

withDefaults(defineProps<Props>(), {
  loadingMessage: 'Loading blog posts...',
  errorTitle: 'Failed to Load Blog Posts'
})

defineEmits<{
  retry: []
  changePage: [page: number]
  categoriesChange: [categories: string[]]
  specialFiltersChange: [filters: { popular: boolean; featured: boolean; recent: boolean }]
}>()

// Generate random star positions
const getStarStyle = () => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

defineOptions({
  name: 'BlogSection'
})
</script>

<style scoped>
/* Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Add subtle animations */
.space-y-10 > * {
  transition: all 0.3s ease;
}

.space-y-10 > *:hover {
  transform: translateY(-1px);
}
</style>
