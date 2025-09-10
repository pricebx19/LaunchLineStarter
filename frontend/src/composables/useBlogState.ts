import { ref, type Ref } from 'vue'
import { useBlogFilters } from './useBlogFilters'

export interface SpecialFilters {
  popular: boolean
  featured: boolean
  recent: boolean
}

export function useBlogState(blogPosts?: Ref<any[]>) {
  // Search and Filter State
  const searchQuery = ref('')
  const selectedCategories = ref(['All'])
  const specialFilters = ref<SpecialFilters>({
    popular: false,
    featured: false,
    recent: false
  })

  // Categories - could be fetched from API in real app
  const categories = ref(['All', 'Web Development', 'Launch Strategies', 'Technology', 'Business', 'Digital Marketing'])

  // Use blog filters composable
  const {
    filteredPosts,
    searchSuggestions,
    hasActiveSearch,
    totalPosts: totalPostsFromComposable
  } = useBlogFilters(
    blogPosts || ref([]),
    categories,
    searchQuery,
    selectedCategories,
    specialFilters
  )

  // Search timeout for debouncing
  let searchTimeout: ReturnType<typeof setTimeout> | null = null

  // Methods
  const applySearchSuggestion = (suggestion: string) => {
    searchQuery.value = suggestion
    debouncedSearch()
  }

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

  const handleSpecialFiltersChange = (filters: SpecialFilters) => {
    specialFilters.value = filters
    // Note: No pagination reset - maintain current page when filtering
  }

  const handleClearCategories = () => {
    selectedCategories.value = [categories.value.find(c => c.toLowerCase().includes('all')) || 'All']
  }

  const handleClearSpecialFilters = () => {
    specialFilters.value = { popular: false, featured: false, recent: false }
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategories.value = ['All']
    specialFilters.value = {
      popular: false,
      featured: false,
      recent: false
    }
  }

  const cleanup = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
  }

  return {
    // State
    searchQuery,
    selectedCategories,
    specialFilters,
    categories,
    filteredPosts,
    searchSuggestions,
    hasActiveSearch,
    totalPostsFromComposable,

    // Actions
    applySearchSuggestion,
    clearSearch,
    handleCategoriesChange,
    handleSpecialFiltersChange,
    handleClearCategories,
    handleClearSpecialFilters,
    resetFilters,
    cleanup
  }
}
