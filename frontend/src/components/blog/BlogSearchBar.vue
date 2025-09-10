<template>
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
          :value="searchQuery"
          @input="handleInput"
          type="text" 
          :placeholder="placeholder || 'Search...'"
          class="enhanced-search-input"
        />
        
        <!-- Clear Button -->
        <transition name="fade">
          <button 
            v-if="searchQuery" 
            @click="handleClear" 
            class="clear-button"
            aria-label="Clear search"
          >
            <svg class="clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BLOG_SEARCH_SUGGESTIONS } from '../../data/blog'
import type { SearchProps } from '../../types/Common'

interface Props extends SearchProps {
  searchQuery: string
  totalPosts: number
  placeholder?: string
  suggestions?: string[]
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'clear'): void
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search articles, topics, technologies...',
  suggestions: () => BLOG_SEARCH_SUGGESTIONS
})

const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchQuery', target.value)
}

const handleClear = () => {
  emit('clear')
}
</script>

<style scoped>
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
  margin: 0 auto;
  max-width: 600px;
}

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
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(59, 130, 246, 0.1);
}

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

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 1024px) {
  .search-title { font-size: 1.75rem; }
  .title-icon { font-size: 2rem; }
}

@media (max-width: 768px) {
  .search-title {
    font-size: 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  .title-icon { font-size: 1.75rem; }
  .search-subtitle { font-size: 1rem; }
  .enhanced-search-input {
    padding: 0.875rem 1rem 0.875rem 3rem;
    font-size: 0.875rem;
  }
  .search-icon .icon { width: 1rem; height: 1rem; }
  .clear-button { width: 1.75rem; height: 1.75rem; }
}

@media (max-width: 640px) {
  .search-header { margin-bottom: 1.5rem; }
  .search-wrapper { margin-bottom: 0.75rem; }
  .enhanced-search-input {
    padding: 0.75rem 0.875rem 0.75rem 2.75rem;
  }
  .search-icon { left: 0.875rem; }
  .clear-button {
    right: 0.875rem;
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .enhanced-search-input:hover,
  .enhanced-search-input:focus,
  .clear-button:hover {
    transform: none !important;
  }
}

button:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
