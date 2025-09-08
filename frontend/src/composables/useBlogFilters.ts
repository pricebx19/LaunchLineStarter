import { computed, ref, type Ref } from 'vue'

// Use the same BlogPage type from the API
export interface BlogPost {
  id: number
  title: string
  intro: string
  date: string
  slug: string
  featured_image?: string
  content?: any // Match the API structure
  seo?: {
    title?: string
    description?: string
  }
}

export function useBlogFilters(
  blogPosts: Ref<any[]>, // Use any[] to match BlogPage type
  categories: Ref<string[]>,
  searchQuery: Ref<string>,
  selectedCategories: Ref<string[]>,
  specialFilters: Ref<{
    popular: boolean
    featured: boolean
    recent: boolean
  }>
) {
  // Main filtering logic
  const filteredPosts = computed(() => {
    let posts = [...blogPosts.value]
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.intro.toLowerCase().includes(query)
      )
    }
    
    // Apply category filters (multi-select)
    const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
    const activeCategories = selectedCategories.value.filter(c => c !== allCategory)
    if (activeCategories.length > 0) {
      posts = posts.filter(post => {
        const content = post.intro.toLowerCase()
        return activeCategories.some(category => {
          const categoryTerm = category.toLowerCase().split(' ')[0]
          return content.includes(categoryTerm)
        })
      })
    }
    
    // Apply special filters
    if (specialFilters.value.popular) {
      // Simulate popular posts (first half)
      posts = posts.filter((_, index) => index < Math.ceil(blogPosts.value.length / 2))
    }
    
    if (specialFilters.value.featured) {
      // Simulate featured posts (every 3rd post)
      posts = posts.filter((_, index) => index % 3 === 0)
    }
    
    if (specialFilters.value.recent) {
      // Simulate recent posts (last 30% of posts)
      const recentThreshold = Math.ceil(blogPosts.value.length * 0.7)
      posts = posts.filter((_, index) => index >= recentThreshold)
    }
    
    return posts
  })

  // Search suggestions based on common topics
  const searchSuggestions = computed(() => {
    if (!searchQuery.value || searchQuery.value.length < 2) return []
    
    const suggestions = [
      'Vue.js', 'React', 'Web Development', 'JavaScript', 'TypeScript',
      'Launch Strategy', 'Digital Marketing', 'SEO', 'Performance',
      'Backend Development', 'Frontend Framework', 'API Design'
    ]
    
    return suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .slice(0, 4)
  })

  // Check if any search/filter is active
  const hasActiveSearch = computed(() => {
    const hasSearch = searchQuery.value
    const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
    const hasCategories = selectedCategories.value.length > 0 && 
      !(selectedCategories.value.length === 1 && selectedCategories.value[0] === allCategory)
    const hasSpecialFilters = specialFilters.value.popular || 
      specialFilters.value.featured || 
      specialFilters.value.recent
    return hasSearch || hasCategories || hasSpecialFilters
  })

  // Total posts count
  const totalPosts = computed(() => blogPosts.value.length)

  return {
    // Computed
    filteredPosts,
    searchSuggestions,
    hasActiveSearch,
    totalPosts,
    
    // Helper functions could be added here if needed
    // clearAllFilters, getActiveFiltersCount, etc.
  }
}
