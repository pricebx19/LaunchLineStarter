import { ref, type Ref } from 'vue'
import { api, type BlogPage } from '../lib/api'

export interface BlogPagination {
  next: string | null
  previous: string | null
  count: number
}

export function useBlogData() {
  const blogPosts = ref<BlogPage[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const pagination = ref<BlogPagination | null>(null)

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

  const retry = () => {
    fetchBlogPosts(currentPage.value)
  }

  return {
    // State
    blogPosts,
    loading,
    error,
    currentPage,
    pagination,
    
    // Actions
    fetchBlogPosts,
    loadPage,
    retry
  }
}
