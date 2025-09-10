<template>
  <section class="enhanced-filter-section">
    <BlogBackgroundEffects />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Search Section -->
      <div class="search-input-container">
        <BlogSearchBar
          :search-query="localSearchQuery"
          :total-posts="totalPosts"
          @update:search-query="localSearchQuery = $event"
          @clear="handleClearSearch"
        />
        
        <BlogSearchSuggestions
          :search-query="localSearchQuery"
          :suggestions="searchSuggestions"
          @suggestion-click="handleSuggestionClick"
        />
      </div>

      <!-- Enhanced Search Results Info -->
      <BlogSearchResults
        :has-active-search="hasActiveSearch"
        :search-query="localSearchQuery"
        :filtered-posts="filteredPosts"
        :selected-categories="selectedCategories"
        :special-filters="specialFilters"
        :categories="categories"
        @clear-search="handleClearSearch"
        @clear-categories="handleClearCategories"
        @clear-special-filters="handleClearSpecialFilters"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from 'vue'
import type { BlogPost } from '../../types/Content'

interface SpecialFilters {
  popular: boolean
  featured: boolean
  recent: boolean
}

const BlogBackgroundEffects = defineAsyncComponent(() => import('./BlogBackgroundEffects.vue'))
const BlogSearchBar = defineAsyncComponent(() => import('./BlogSearchBar.vue'))
const BlogSearchSuggestions = defineAsyncComponent(() => import('./BlogSearchSuggestions.vue'))
const BlogSearchResults = defineAsyncComponent(() => import('./BlogSearchResults.vue'))

interface Props {
  searchQuery: string
  totalPosts: number
  searchSuggestions: string[]
  hasActiveSearch: boolean
  filteredPosts: BlogPost[]
  selectedCategories: string[]
  specialFilters: SpecialFilters
  categories: string[]
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'clear-search'): void
  (e: 'clear-categories'): void
  (e: 'clear-special-filters'): void
  (e: 'suggestion-click', suggestion: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local reactive copy of search query for v-model
const localSearchQuery = ref(props.searchQuery)

// Watch for external changes to search query
watch(() => props.searchQuery, (newValue) => {
  localSearchQuery.value = newValue
})

// Watch for local changes and emit to parent
watch(localSearchQuery, (newValue) => {
  emit('update:searchQuery', newValue)
})

const handleClearSearch = () => {
  localSearchQuery.value = ''
  emit('clear-search')
}

const handleClearCategories = () => {
  emit('clear-categories')
}

const handleClearSpecialFilters = () => {
  emit('clear-special-filters')
}

const handleSuggestionClick = (suggestion: string) => {
  localSearchQuery.value = suggestion
  emit('suggestion-click', suggestion)
}
</script>

<style scoped>
/* Enhanced Filter Section */
.enhanced-filter-section {
  position: relative;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
  overflow: hidden;
}

.search-input-container {
  position: relative;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .enhanced-filter-section {
    padding: 2rem 0;
  }
}
</style>
