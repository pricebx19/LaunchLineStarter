/**
 * Composable for fetching Wagtail home page data
 */
import { ref, computed } from 'vue'
import { useFeatureFlags } from './useFeatureFlags'

export interface WagtailHomeData {
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
  statistics?: {
    heading?: string
    metrics: Array<{
      value: string
      label: string
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
const homeData = ref<WagtailHomeData | null>(null)
const lastFetched = ref<Date | null>(null)

export function useWagtailHomeData() {
  const { isEnabled } = useFeatureFlags()

  const isWagtailEnabled = computed(() => isEnabled('WAGTAIL_HOME'))

  const fetchHomeData = async (apiUrl?: string) => {
    if (!isWagtailEnabled.value) {
      return null
    }

    if (!apiUrl) {
      apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.HomePage&fields=content,meta`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch home data: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const homePage = data.items[0]
        const processedData = processHomeData(homePage.content)
        homeData.value = processedData
        lastFetched.value = new Date()
        return processedData
      } else {
        throw new Error('No home page found')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch home data'
      error.value = errorMessage
      console.error('Error fetching Wagtail home data:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const processHomeData = (content: any[]): WagtailHomeData => {
    const processed: WagtailHomeData = {}

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

        case 'statistics':
          processed.statistics = {
            heading: block.value.heading,
            metrics: block.value.metrics.map((metric: any) => ({
              value: metric.value,
              label: metric.label
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
    return await fetchHomeData()
  }

  const clearCache = () => {
    homeData.value = null
    lastFetched.value = null
    error.value = null
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => homeData.value),
    lastFetched: computed(() => lastFetched.value),
    isWagtailEnabled,

    // Methods
    fetchHomeData,
    refresh,
    clearCache,

    // Computed helpers
    hasData: computed(() => homeData.value !== null),
    hasHero: computed(() => homeData.value?.hero !== undefined),
    hasFeatures: computed(() => homeData.value?.features !== undefined),
    hasStatistics: computed(() => homeData.value?.statistics !== undefined),
    hasTestimonial: computed(() => homeData.value?.testimonial !== undefined),
    hasCTA: computed(() => homeData.value?.cta !== undefined),
  }
}

// Auto-fetching composable for easy use in components
export function useWagtailHomeDataAuto(options: {
  autoFetch?: boolean
  apiUrl?: string
} = {}) {
  const { autoFetch = true, apiUrl } = options
  const homeData = useWagtailHomeData()

  if (autoFetch && homeData.isWagtailEnabled.value) {
    homeData.fetchHomeData(apiUrl)
  }

  return homeData
}
