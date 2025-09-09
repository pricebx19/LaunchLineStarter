/**
 * Composable for fetching Wagtail blog page data
 */
import { ref, computed } from 'vue'
import { useFeatureFlags } from './useFeatureFlags'

export interface WagtailBlogPost {
  id: number
  title: string
  slug: string
  intro: string
  date: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  url: string
}

export interface WagtailBlogData {
  hero?: {
    heading: string
    subheading: string
    cta_text?: string
    cta_link?: string
    background_image?: string
  }
  text?: {
    heading?: string
    text: string
  }
  cta?: {
    heading: string
    text?: string
    button_text: string
    button_link: string
    background_color: string
  }
  image?: {
    image: string
    caption?: string
  }
  blog_posts?: WagtailBlogPost[]
  intro?: string // Legacy field
}

// Global state
const isLoading = ref(false)
const error = ref<string | null>(null)
const blogData = ref<WagtailBlogData | null>(null)
const lastFetched = ref<Date | null>(null)

export function useWagtailBlogData() {
  const { isEnabled } = useFeatureFlags()

  const isWagtailEnabled = computed(() => isEnabled('WAGTAIL_BLOG'))

  const fetchBlogData = async (apiUrl?: string) => {
    if (!isWagtailEnabled.value) {
      return null
    }

    if (!apiUrl) {
      apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.BlogIndexPage&fields=content,intro,blog_posts`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog data: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const blogIndexPage = data.items[0]
        const processedData = processBlogData(blogIndexPage)
        blogData.value = processedData
        lastFetched.value = new Date()
        return processedData
      } else {
        throw new Error('No blog index page found')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog data'
      error.value = errorMessage
      console.error('Error fetching Wagtail blog data:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const processBlogData = (pageData: any): WagtailBlogData => {
    const processed: WagtailBlogData = {
      intro: pageData.intro,
      blog_posts: pageData.blog_posts || []
    }

    // Process StreamField content
    if (pageData.content) {
      pageData.content.forEach((block: any) => {
        switch (block.type) {
          case 'hero':
            processed.hero = {
              heading: block.value.heading,
              subheading: block.value.subheading,
              cta_text: block.value.cta_text,
              cta_link: block.value.cta_link,
              background_image: block.value.background_image?.url
            }
            break

          case 'text':
            processed.text = {
              heading: block.value.heading,
              text: block.value.text
            }
            break

          case 'cta':
            processed.cta = {
              heading: block.value.heading,
              text: block.value.text,
              button_text: block.value.button_text,
              button_link: block.value.button_link,
              background_color: block.value.background_color
            }
            break

          case 'image':
            processed.image = {
              image: block.value.image?.url,
              caption: block.value.caption
            }
            break
        }
      })
    }

    return processed
  }

  const refresh = async () => {
    return await fetchBlogData()
  }

  const clearCache = () => {
    blogData.value = null
    lastFetched.value = null
    error.value = null
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => blogData.value),
    lastFetched: computed(() => lastFetched.value),
    isWagtailEnabled,

    // Methods
    fetchBlogData,
    refresh,
    clearCache,

    // Computed helpers
    hasData: computed(() => blogData.value !== null),
    hasHero: computed(() => blogData.value?.hero !== undefined),
    hasText: computed(() => blogData.value?.text !== undefined),
    hasCTA: computed(() => blogData.value?.cta !== undefined),
    hasImage: computed(() => blogData.value?.image !== undefined),
    hasBlogPosts: computed(() => blogData.value?.blog_posts && blogData.value.blog_posts.length > 0),
    hasIntro: computed(() => blogData.value?.intro !== undefined),
  }
}

// Auto-fetching composable for easy use in components
export function useWagtailBlogDataAuto(options: {
  autoFetch?: boolean
  apiUrl?: string
} = {}) {
  const { autoFetch = true, apiUrl } = options
  const blogData = useWagtailBlogData()

  if (autoFetch && blogData.isWagtailEnabled.value) {
    blogData.fetchBlogData(apiUrl)
  }

  return blogData
}
