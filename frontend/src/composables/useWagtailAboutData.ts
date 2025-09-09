/**
 * Composable for fetching Wagtail about page data
 */
import { ref, computed } from 'vue'
import { useFeatureFlags } from './useFeatureFlags'

export interface WagtailAboutData {
  hero?: {
    heading: string
    subheading: string
    cta_text?: string
    cta_link?: string
    background_image?: string
  }
  features?: {
    heading?: string
    subheading?: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  testimonial?: {
    quote: string
    author_name: string
    author_title?: string
    company?: string
    author_image?: string
  }
  cta?: {
    heading: string
    text?: string
    button_text: string
    button_link: string
    background_color: string
  }
}

// Global state
const isLoading = ref(false)
const error = ref<string | null>(null)
const aboutData = ref<WagtailAboutData | null>(null)
const lastFetched = ref<Date | null>(null)

export function useWagtailAboutData() {
  const { isEnabled } = useFeatureFlags()

  const isWagtailEnabled = computed(() => isEnabled('WAGTAIL_ABOUT'))

  const fetchAboutData = async (apiUrl?: string) => {
    if (!isWagtailEnabled.value) {
      return null
    }

    if (!apiUrl) {
      apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.AboutPage&fields=content,meta`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch about data: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const aboutPage = data.items[0]
        const processedData = processAboutData(aboutPage.content)
        aboutData.value = processedData
        lastFetched.value = new Date()
        return processedData
      } else {
        throw new Error('No about page found')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch about data'
      error.value = errorMessage
      console.error('Error fetching Wagtail about data:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const processAboutData = (content: any[]): WagtailAboutData => {
    const processed: WagtailAboutData = {}

    content.forEach(block => {
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

        case 'features':
          processed.features = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            features: block.value.features.map((feature: any) => ({
              icon: feature.icon,
              title: feature.title,
              description: feature.description
            }))
          }
          break

        case 'testimonial':
          processed.testimonial = {
            quote: block.value.quote,
            author_name: block.value.author_name,
            author_title: block.value.author_title,
            company: block.value.company,
            author_image: block.value.author_image?.url
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
      }
    })

    return processed
  }

  const refresh = async () => {
    return await fetchAboutData()
  }

  const clearCache = () => {
    aboutData.value = null
    lastFetched.value = null
    error.value = null
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => aboutData.value),
    lastFetched: computed(() => lastFetched.value),
    isWagtailEnabled,

    // Methods
    fetchAboutData,
    refresh,
    clearCache,

    // Computed helpers
    hasData: computed(() => aboutData.value !== null),
    hasHero: computed(() => aboutData.value?.hero !== undefined),
    hasFeatures: computed(() => aboutData.value?.features !== undefined),
    hasTestimonial: computed(() => aboutData.value?.testimonial !== undefined),
    hasCTA: computed(() => aboutData.value?.cta !== undefined),
  }
}

// Auto-fetching composable for easy use in components
export function useWagtailAboutDataAuto(options: {
  autoFetch?: boolean
  apiUrl?: string
} = {}) {
  const { autoFetch = true, apiUrl } = options
  const aboutData = useWagtailAboutData()

  if (autoFetch && aboutData.isWagtailEnabled.value) {
    aboutData.fetchAboutData(apiUrl)
  }

  return aboutData
}
