<template>
  <div class="enhanced-category-filter" :style="{ marginBottom: marginBottom }">
    <!-- Background Elements -->
    <div class="filter-background">
      <div class="floating-particle particle-1"></div>
      <div class="floating-particle particle-2"></div>
      <div class="floating-particle particle-3"></div>
    </div>
    
        <!-- Collapsible Header -->
    <div class="filter-header" @click="toggleCollapse">
      <div class="header-content">
        <div class="header-info">
          <h2 class="filter-main-title">
            <span class="main-icon">🎯</span>
            Filter & Search
          </h2>
          <p class="filter-description">
            {{ isCollapsed ? 'Click to expand filtering options' : 'Find exactly what you\'re looking for' }}
          </p>
        </div>
        
        <!-- Active Filters Summary (when collapsed) -->
        <div v-if="isCollapsed && hasActiveFilters" class="collapsed-filters-summary">
          <div class="active-summary">
            <span class="summary-icon">🔍</span>
            <span class="summary-text">
              {{ getActiveFiltersText() }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Toggle Button -->
      <div 
        class="collapse-toggle"
        :class="{ 'collapsed': isCollapsed }"
        :aria-label="isCollapsed ? 'Expand filters' : 'Collapse filters'"
        role="button"
        tabindex="0"
        @keydown.enter="toggleCollapse"
        @keydown.space.prevent="toggleCollapse"
      >
        <div class="toggle-icon">
          <svg 
            class="chevron" 
            :class="{ 'rotated': isCollapsed }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <span class="toggle-text">
          {{ isCollapsed ? 'Show' : 'Hide' }} Filters
        </span>
      </div>
    </div>
    
    <!-- Collapsible Filter Container -->
    <transition 
      name="filter-collapse"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="!isCollapsed" class="filter-container" ref="filterContainer">
      <!-- Category Filters -->
      <div class="categories-section">
        <div class="section-header">
          <h3 class="section-title">
            <span class="title-icon">🏷️</span>
            Categories
          </h3>
          <p class="section-description">
            Select multiple categories to combine results
          </p>
        </div>
        
        <div class="categories-grid">
    <button 
            v-for="(category, index) in categories" 
      :key="category"
            @click="handleCategoryChange(category)"
            :style="{ '--delay': `${index * 0.1}s` }"
            class="category-button"
      :class="{
              'active': isCategorySelected(category),
              'inactive': !isCategorySelected(category),
              'multi-select': isCategorySelected(category) && category !== 'All'
            }"
          >
            <div class="button-content">
              <span class="category-icon">{{ getCategoryIcon(category) }}</span>
              <span class="category-text">{{ category }}</span>
              <div class="button-count" v-if="getCategoryCount(category)">
                {{ getCategoryCount(category) }}
              </div>
              

            </div>
            
            <!-- Active State Effects -->
            <div v-if="isCategorySelected(category)" class="active-effects">
              <div class="glow-effect"></div>
              <div class="border-effect"></div>
              <div class="pulse-effect"></div>
            </div>
            
            <!-- Hover Effects -->
            <div class="hover-effects">
              <div class="hover-glow"></div>
              <div class="hover-shine"></div>
            </div>
    </button>
        </div>
      </div>
      
      <!-- Special Filters -->
      <div class="special-filters">
        <div class="section-header">
          <h3 class="section-title">
            <span class="title-icon">⭐</span>
            Special Filters
          </h3>
          <p class="section-description">
            Combine multiple special filters for precise results
          </p>
        </div>
        
                <!-- Popular Toggle -->
    <button 
          @click="() => handleSpecialFilterToggle('popular')"
          class="special-button popular-button"
          :class="{ 'active': specialFilters.popular }"
        >
          <div class="button-content">
            <div class="icon-container">
              <svg class="star-icon" :class="{ 'spinning': specialFilters.popular }" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
            </div>
            <span class="button-text">Popular {{ itemType || 'Posts' }}</span>
          </div>
          
          <!-- Active Effects -->
          <div v-if="specialFilters.popular" class="special-active-effects">
            <div class="golden-glow"></div>
            <div class="sparkles">
              <span class="sparkle sparkle-1">✨</span>
              <span class="sparkle sparkle-2">⭐</span>
              <span class="sparkle sparkle-3">💫</span>
            </div>
          </div>
        </button>
        
        <!-- Featured Items -->
        <button 
          @click="() => handleSpecialFilterToggle('featured')"
          class="special-button featured-button"
          :class="{ 'active': specialFilters.featured }"
        >
          <div class="button-content">
            <div class="icon-container">
              <svg class="featured-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <span class="button-text">Featured {{ itemType || 'Posts' }}</span>
          </div>
        </button>
        
        <!-- Recent Items -->
        <button 
          @click="() => handleSpecialFilterToggle('recent')"
          class="special-button recent-button"
          :class="{ 'active': specialFilters.recent }"
        >
          <div class="button-content">
            <div class="icon-container">
              <svg class="recent-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
            </div>
            <span class="button-text">Recent {{ itemType || 'Posts' }}</span>
          </div>
        </button>
      </div>

      <!-- Active Filter Display -->
      <div v-if="hasActiveFilters" class="active-filters-display">
        <div class="active-filter-header">
          <span class="filter-icon">🎯</span>
          <span class="filter-text">Active Filters:</span>
        </div>
        <div class="active-filter-tags">
          <!-- Selected Categories -->
          <span 
            v-for="category in selectedCategories.filter(c => !c.toLowerCase().includes('all'))" 
            :key="category"
            class="filter-tag category-tag"
          >
            {{ category }}
            <button @click="() => clearCategoryFilter(category)" class="remove-tag">×</button>
          </span>
          
          <!-- Special Filters -->
          <span v-if="specialFilters.popular" class="filter-tag popular-tag">
            Popular {{ itemType || 'Posts' }}
            <button @click="() => clearSpecialFilter('popular')" class="remove-tag">×</button>
          </span>
          <span v-if="specialFilters.featured" class="filter-tag featured-tag">
            Featured {{ itemType || 'Posts' }}
            <button @click="() => clearSpecialFilter('featured')" class="remove-tag">×</button>
          </span>
          <span v-if="specialFilters.recent" class="filter-tag recent-tag">
            Recent {{ itemType || 'Posts' }}
            <button @click="() => clearSpecialFilter('recent')" class="remove-tag">×</button>
          </span>
        </div>
        <button @click="clearAllFilters" class="clear-all-button">
          Clear All Filters
    </button>
      </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CategoryFilterProps } from '../../../types/index'

interface Props extends CategoryFilterProps {}

const props = withDefaults(defineProps<Props>(), {
  marginBottom: '2rem',
  categories: () => [],
  selectedCategories: () => [],
  specialFilters: () => ({
    popular: false,
    featured: false,
    recent: false
  }),
  itemType: 'Posts',
  pageKey: ''
})

const emit = defineEmits<{
  categoriesChange: [categories: string[]]
  specialFiltersChange: [filters: { popular: boolean; featured: boolean; recent: boolean }]
}>()

// Reactive state for collapsible functionality
const isCollapsed = ref(true) // Start collapsed by default
const filterContainer = ref<HTMLElement>()

// Remember collapsed state in localStorage (page-specific)
if (typeof window !== 'undefined') {
  const storageKey = props.pageKey ? `filterCollapsed_${props.pageKey}` : 'filterCollapsed'
  const savedState = localStorage.getItem(storageKey)
  if (savedState !== null) {
    isCollapsed.value = JSON.parse(savedState)
  }
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  'All': '📚',
  'Web Development': '💻',
  'Launch Strategies': '🚀',
  'Technology': '⚡',
  'Business': '💼',
  'Digital Marketing': '📈',
  'Design': '🎨',
  'Growth': '📊',
  'Startup': '💡'
}

// Mock category counts (in real app, this would come from API)
const categoryCounts: Record<string, number> = {
  'All': 24,
  'Web Development': 8,
  'Launch Strategies': 6,
  'Technology': 5,
  'Business': 3,
  'Digital Marketing': 2
}

// Computed properties
const hasActiveFilters = computed(() => {
  const allCategory = props.categories.find(c => c.toLowerCase().includes('all'))
  const hasSelectedCategories = props.selectedCategories.length > 0 && 
    !(props.selectedCategories.length === 1 && props.selectedCategories[0] === allCategory)
  const hasSpecialFilters = props.specialFilters.popular || 
    props.specialFilters.featured || 
    props.specialFilters.recent
  return hasSelectedCategories || hasSpecialFilters
})

// Methods
const getCategoryIcon = (category: string): string => {
  return categoryIcons[category] || '📝'
}

const getCategoryCount = (category: string): number => {
  return categoryCounts[category] || 0
}

const isCategorySelected = (category: string): boolean => {
  return props.selectedCategories.includes(category)
}

const handleCategoryChange = (category: string) => {
  let newCategories = [...props.selectedCategories]
  
  // Find the "All" category (could be "All", "All Projects", "All Services", etc.)
  const allCategory = props.categories.find(c => c.toLowerCase().includes('all'))
  
  if (category === allCategory) {
    // If "All" variant is clicked, clear all other selections
    newCategories = [allCategory]
  } else {
    // Remove any "All" variant if it exists when selecting specific categories
    if (allCategory) {
      newCategories = newCategories.filter(c => c !== allCategory)
    }
    
    if (newCategories.includes(category)) {
      // Remove category if already selected
      newCategories = newCategories.filter(c => c !== category)
      // If no categories left, default to "All" variant
      if (newCategories.length === 0 && allCategory) {
        newCategories = [allCategory]
      }
    } else {
      // Add category to selection
      newCategories.push(category)
    }
  }
  
  emit('categoriesChange', newCategories)
}

const handleSpecialFilterToggle = (filterType: 'popular' | 'featured' | 'recent') => {
  const newFilters = { ...props.specialFilters }
  newFilters[filterType] = !newFilters[filterType]
  emit('specialFiltersChange', newFilters)
}

const clearCategoryFilter = (category: string) => {
  const newCategories = props.selectedCategories.filter(c => c !== category)
  const allCategory = props.categories.find(c => c.toLowerCase().includes('all'))
  
  if (newCategories.length === 0 && allCategory) {
    emit('categoriesChange', [allCategory])
  } else {
    emit('categoriesChange', newCategories)
  }
}

const clearSpecialFilter = (filterType: 'popular' | 'featured' | 'recent') => {
  const newFilters = { ...props.specialFilters }
  newFilters[filterType] = false
  emit('specialFiltersChange', newFilters)
}

const clearAllFilters = () => {
  const allCategory = props.categories.find(c => c.toLowerCase().includes('all'))
  emit('categoriesChange', allCategory ? [allCategory] : [])
  emit('specialFiltersChange', { popular: false, featured: false, recent: false })
}

// Collapsible functionality
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  
  // Save state to localStorage (page-specific)
  if (typeof window !== 'undefined') {
    const storageKey = props.pageKey ? `filterCollapsed_${props.pageKey}` : 'filterCollapsed'
    localStorage.setItem(storageKey, JSON.stringify(isCollapsed.value))
  }
}

const getActiveFiltersText = (): string => {
  const filters = []
  
  // Add selected categories (excluding any "All" variant)
  const allCategory = props.categories.find(c => c.toLowerCase().includes('all'))
  const selectedCategories = props.selectedCategories.filter(c => c !== allCategory)
  if (selectedCategories.length > 0) {
    if (selectedCategories.length === 1) {
      filters.push(selectedCategories[0])
    } else {
      filters.push(`${selectedCategories.length} categories`)
    }
  }
  
  // Add special filters
  if (props.specialFilters.popular) filters.push('Popular')
  if (props.specialFilters.featured) filters.push('Featured')
  if (props.specialFilters.recent) filters.push('Recent')
  
  if (filters.length === 0) {
    return 'No active filters'
  }
  
  if (filters.length === 1) {
    return filters[0] || ''
  }
  
  if (filters.length === 2) {
    return filters.join(' + ')
  }
  
  return `${filters.length} filters active`
}

// Transition event handlers for smooth height animation
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.opacity = '1'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  const height = element.scrollHeight
  element.style.height = `${height}px`
  
  // Force reflow
  element.offsetHeight
  
  element.style.height = '0'
  element.style.opacity = '0'
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

defineOptions({
  name: 'CategoryFilter'
})
</script>

<style scoped>
/* Enhanced Category Filter Container */
.enhanced-category-filter {
  position: relative;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1.5rem;
  overflow: hidden;
}

/* Filter Header */
.filter-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
}

.filter-header:hover {
  background: rgba(31, 41, 55, 0.3);
}

.header-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header-info {
  flex: 1;
}

.filter-main-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.main-icon {
  font-size: 1.75rem;
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
}

.filter-description {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
  transition: color 0.3s ease;
}

/* Collapsed Filters Summary */
.collapsed-filters-summary {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.active-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  font-size: 0.875rem;
  font-weight: 500;
}

.summary-icon {
  font-size: 1rem;
}

.summary-text {
  white-space: nowrap;
}

/* Toggle Button */
.collapse-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(75, 85, 99, 0.3);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 120px;
  justify-content: center;
}

.collapse-toggle:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #60a5fa;
  transform: translateY(-1px);
}

.collapse-toggle.collapsed {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chevron.rotated {
  transform: rotate(180deg);
}

.toggle-text {
  font-weight: 500;
}

/* Background Effects */
.filter-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 20%;
  animation-delay: -2s;
}

.particle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Filter Container */
.filter-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  overflow: hidden;
}

/* Collapse Transitions */
.filter-collapse-enter-active,
.filter-collapse-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.filter-collapse-enter-from,
.filter-collapse-leave-to {
  height: 0 !important;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.filter-collapse-enter-to,
.filter-collapse-leave-from {
  opacity: 1;
}

/* Section Headers */
.section-header {
  margin-bottom: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.title-icon {
  font-size: 1.25rem;
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}

.section-description {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

/* Categories Section */
.categories-section {
  position: relative;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Category Buttons */
.category-button {
  position: relative;
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: slideInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(20px);
  backdrop-filter: blur(10px);
}

@keyframes slideInUp {
  to {
    opacity: 1;
  transform: translateY(0);
  }
}

.category-button:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.4);
}

.category-button.active {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  color: #60a5fa;
}

.category-button.inactive {
  color: #d1d5db;
}

.category-button.inactive:hover {
  color: white;
  background: rgba(75, 85, 99, 0.4);
}

/* Button Content */
.button-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.category-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.category-button:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
}

.category-text {
  flex: 1;
  font-weight: 500;
  text-align: left;
}

.button-count {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.3);
}



/* Multi-select button styling */
.category-button.multi-select {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.category-button.multi-select:hover {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
}

/* Active Effects */
.active-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  border-radius: 1rem;
  opacity: 0.7;
  animation: pulse 2s ease-in-out infinite;
}

.border-effect {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: borderRotate 3s linear infinite;
}

.pulse-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 1rem;
  animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes borderRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
}

/* Hover Effects */
.hover-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-button:hover .hover-effects {
  opacity: 1;
}

.hover-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  border-radius: 1rem;
}

.hover-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.category-button:hover .hover-shine {
  left: 100%;
}

/* Special Filters */
.special-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.special-button {
  position: relative;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  color: #a78bfa;
  backdrop-filter: blur(10px);
}

.special-button:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.15);
}

.special-button.active {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.5);
  color: #fbbf24;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.star-icon,
.featured-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.star-icon.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.button-text {
  font-weight: 500;
}

/* Special Active Effects */
.special-active-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.golden-glow {
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
  border-radius: 1rem;
  animation: goldenPulse 2s ease-in-out infinite;
}

@keyframes goldenPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.sparkles {
  position: absolute;
  inset: 0;
}

.sparkle {
  position: absolute;
  font-size: 0.875rem;
  animation: sparkle 3s ease-in-out infinite;
}

.sparkle-1 {
  top: 20%;
  left: 80%;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 70%;
  left: 20%;
  animation-delay: -1s;
}

.sparkle-3 {
  top: 40%;
  left: 60%;
  animation-delay: -2s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
}

/* Active Filters Display */
.active-filters-display {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.active-filter-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.filter-icon {
  font-size: 1rem;
}

.filter-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.active-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.filter-tag.popular-tag {
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

.filter-tag.featured-tag {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.3);
}

.filter-tag.recent-tag {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.3);
}

.remove-tag {
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.remove-tag:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.clear-all-button {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-all-button:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  
  .filter-container {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .filter-header {
    padding: 1.25rem 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .filter-main-title {
    font-size: 1.25rem;
    justify-content: center;
  }
  
  .main-icon {
    font-size: 1.5rem;
  }
  
  .filter-description {
    text-align: center;
  }
  
  .collapsed-filters-summary {
    margin-left: 0;
    justify-content: center;
  }
  
  .collapse-toggle {
    min-width: auto;
    width: 100%;
  }
  
  .filter-container {
    padding: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .category-button,
  .special-button {
    padding: 0.75rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
  
  .category-icon {
    font-size: 1.25rem;
  }
  
  .active-filter-tags {
    gap: 0.375rem;
  }
  
  .filter-tag {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 640px) {
  .categories-grid {
    gap: 0.5rem;
  }
  
  .button-content {
    gap: 0.5rem;
  }
  
  .category-text {
    font-size: 0.875rem;
  }
  
  .active-filters-display {
    padding: 0.75rem;
  }
}

/* Performance optimizations */
.category-button,
.special-button {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.category-button:not(:hover),
.special-button:not(:hover) {
  will-change: auto;
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .floating-particle,
  .glow-effect,
  .border-effect,
  .pulse-effect,
  .star-icon.spinning,
  .sparkle {
    animation: none !important;
  }
  
  .category-button,
  .special-button,
  .hover-effects {
    transition: none !important;
  }
  
  .category-button:hover,
  .special-button:hover {
    transform: none !important;
  }
}

/* Focus indicators for accessibility */
.category-button:focus-visible,
.special-button:focus-visible,
.remove-tag:focus-visible,
.clear-all-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
