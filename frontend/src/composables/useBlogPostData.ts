import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, type BlogPage } from '../lib/api'

export function useBlogPostData() {
  const route = useRoute()
  const blogPost = ref<BlogPage | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchBlogPost = async () => {
    try {
      loading.value = true
      error.value = null
      
      const slug = route.params.slug as string
      console.log('Fetching blog post with slug:', slug)
      
      const response = await api.getBlogPost(slug)
      console.log('API response:', response)
      
      if (response.success && response.data) {
        console.log('Response data structure:', response.data)
        
        // Handle Wagtail API v2 response structure
        const items = response.data.items || []
        console.log('Items found:', items.length)
        
        if (items.length > 0) {
          const item = items[0]
          console.log('Blog post item:', item)
          
          // Transform Wagtail response to match our BlogPage interface
          const publishedDate = item.meta?.first_published_at || item.date || new Date().toISOString()
          blogPost.value = {
            id: item.id,
            title: item.title,
            slug: item.meta?.slug || item.slug,
            intro: item.intro || item.title,
            date: publishedDate,
            body: item.body || '',
            publishedDate: publishedDate,
            author: item.author || 'Anonymous',
            featuredImage: item.featured_image || item.featuredImage,
            content: Array.isArray(item.content) ? item.content : [], // This is now an array from the API
            seo: {
              title: item.title,
              description: item.meta?.search_description || item.search_description || ''
            },
            // Additional properties to match BlogPost interface
            publishedAt: publishedDate,
            updatedAt: publishedDate,
            readTime: 5, // Default read time
            tags: [],
            category: 'General',
            featured: false,
            image: item.featured_image || item.featuredImage,
            seoTitle: item.title,
            seoDescription: item.meta?.search_description || item.search_description || ''
          }
          
          console.log('Transformed blog post:', blogPost.value)
        } else {
          console.error('No items found in response')
          error.value = 'Blog post not found'
        }
      } else {
        console.error('API response not successful:', response)
        error.value = response.error || 'Failed to load blog post'
      }
    } catch (err) {
      console.error('Error in fetchBlogPost:', err)
      error.value = 'Network error occurred'
    } finally {
      loading.value = false
      console.log('Loading finished, blogPost:', blogPost.value)
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    blogPost,
    loading,
    error,
    fetchBlogPost,
    formatDate
  }
}
