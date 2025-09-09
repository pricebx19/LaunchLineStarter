<template>
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
            <button v-if="searchQuery" @click="handleClearSearch" class="quick-action">
              Clear search
            </button>
            <button v-if="selectedCategories.filter(c => !c.toLowerCase().includes('all')).length > 0" @click="handleClearCategories" class="quick-action">
              Clear categories
            </button>
            <button v-if="specialFilters.popular || specialFilters.featured || specialFilters.recent" @click="handleClearSpecialFilters" class="quick-action">
              Clear special filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { BlogPost } from '../../types/Content'
import type { SearchFilters } from '../../types/Common'

interface SpecialFilters {
  popular: boolean
  featured: boolean
  recent: boolean
}

interface Props {
  hasActiveSearch: boolean
  searchQuery: string
  filteredPosts: BlogPost[]
  selectedCategories: string[]
  specialFilters: SpecialFilters
  categories: string[]
}

interface Emits {
  (e: 'clear-search'): void
  (e: 'clear-categories'): void
  (e: 'clear-special-filters'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClearSearch = () => {
  emit('clear-search')
}

const handleClearCategories = () => {
  emit('clear-categories')
}

const handleClearSpecialFilters = () => {
  emit('clear-special-filters')
}
</script>

<style scoped>
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

/* Mobile responsiveness */
@media (max-width: 768px) {
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
  .search-results-info {
    padding: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .quick-action:hover {
    transform: none !important;
  }
}

/* Focus indicators */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
