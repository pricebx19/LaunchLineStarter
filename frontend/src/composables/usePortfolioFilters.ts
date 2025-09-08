import { computed, ref, watch, type Ref } from 'vue'
import type { Project } from '../data/portfolioData'

export interface FilterState {
  selectedCategories: string[]
  specialFilters: {
    popular: boolean
    featured: boolean
    recent: boolean
  }
}

export function usePortfolioFilters(
  projects: Ref<Project[]>, 
  categories: Ref<string[]>,
  selectedCategories: Ref<string[]>,
  specialFilters: Ref<{
    popular: boolean
    featured: boolean
    recent: boolean
  }>,
  initialVisibleCount = 3
) {
  // Internal state
  const visibleProjects = ref<number>(initialVisibleCount)

  // Main filtering logic
  const totalFilteredProjects = computed(() => {
    let filtered = [...projects.value] // Create a copy to avoid mutations
    
    // Apply category filtering
    const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
    const activeCategories = selectedCategories.value.filter(c => c !== allCategory)
    
    if (activeCategories.length > 0) {
      filtered = filtered.filter(project => 
        activeCategories.includes(project.category)
      )
    }
    
    // Apply special filters
    if (specialFilters.value.featured) {
      filtered = filtered.filter(project => project.status === 'featured')
    }
    
    if (specialFilters.value.recent) {
      // Recent projects (last 3 projects - simulating newest)
      const recentProjectIds = projects.value.slice(-3).map(p => p.id)
      filtered = filtered.filter(project => recentProjectIds.includes(project.id))
    }
    
    if (specialFilters.value.popular) {
      // Popular projects (SaaS and Enterprise as they tend to be more complex/popular)
      filtered = filtered.filter(project => 
        project.category === 'SaaS' || project.category === 'Enterprise'
      )
    }
    
    return filtered
  })

  // Paginated projects
  const filteredProjects = computed(() => {
    const maxVisible = Math.min(visibleProjects.value, totalFilteredProjects.value.length)
    return totalFilteredProjects.value.slice(0, maxVisible)
  })

  // Pagination helpers
  const hasMoreProjects = computed(() => {
    return visibleProjects.value < totalFilteredProjects.value.length
  })

  const remainingProjectsCount = computed(() => {
    return Math.max(0, totalFilteredProjects.value.length - visibleProjects.value)
  })

  // Methods
  const loadMoreProjects = async () => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading
    visibleProjects.value += 3
  }

  const resetPagination = () => {
    visibleProjects.value = initialVisibleCount
  }

  const showLessProjects = () => {
    visibleProjects.value = initialVisibleCount
  }

  // Show Less button helper
  const shouldShowLessButton = computed(() => {
    return visibleProjects.value > initialVisibleCount && totalFilteredProjects.value.length > initialVisibleCount
  })

  // Category filter helpers
  const isFilterActive = computed(() => {
    const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
    const hasActiveCategories = selectedCategories.value.length > 0 && 
      !(selectedCategories.value.length === 1 && selectedCategories.value[0] === allCategory)
    const hasSpecialFilters = specialFilters.value.popular || 
      specialFilters.value.featured || 
      specialFilters.value.recent
    return hasActiveCategories || hasSpecialFilters
  })

  const getActiveFiltersCount = computed(() => {
    const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
    const activeCategories = selectedCategories.value.filter(c => c !== allCategory)
    const specialFiltersCount = Object.values(specialFilters.value).filter(Boolean).length
    return activeCategories.length + specialFiltersCount
  })

  return {
    // State
    visibleProjects,
    
    // Computed
    totalFilteredProjects,
    filteredProjects,
    hasMoreProjects,
    remainingProjectsCount,
    shouldShowLessButton,
    isFilterActive,
    getActiveFiltersCount,
    
    // Methods
    loadMoreProjects,
    showLessProjects,
    resetPagination
  }
}
