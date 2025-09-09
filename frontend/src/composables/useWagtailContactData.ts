import { ref } from 'vue'
import type { WagtailContactData } from '../types'

export function useWagtailContactData() {
  const wagtailData = ref<WagtailContactData>({
    id: 1,
    content: [],
    title: '',
    slug: '',
    seo: {}
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchWagtailContactData = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      
      // First, try to find the contact page by type (ContactPage) with StreamField content
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.ContactPage&fields=id,title,slug,content,first_published_at`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch contact page: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const contactPage = data.items[0]
        
        // Store the raw StreamField content directly
        wagtailData.value = {
          id: contactPage.id || 1,
          content: contactPage.content || [],
          title: contactPage.title || '',
          slug: contactPage.slug || '',
          seo: contactPage.seo || {}
        }
        
        // Validate that we have content blocks
        if (!wagtailData.value.content || wagtailData.value.content.length === 0) {
          throw new Error('Contact page has no content blocks')
        }
        
        console.log('Wagtail contact data loaded successfully from StreamField:', wagtailData.value)
        return { success: true, data: wagtailData.value }
      } else {
        throw new Error('No contact page found in Wagtail')
      }
    } catch (err) {
      console.error('Failed to fetch Wagtail contact data:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load contact page data'
      error.value = errorMessage
      
      // Clear the data so error state is shown
      wagtailData.value = {
        id: 1,
        content: [],
        title: '',
        slug: '',
        seo: {}
      }
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  const clearData = () => {
    wagtailData.value = {
      id: 1,
      content: [],
      title: '',
      slug: '',
      seo: {}
    }
    error.value = null
  }

  return {
    wagtailData,
    isLoading,
    error,
    fetchWagtailContactData,
    clearData
  }
}
