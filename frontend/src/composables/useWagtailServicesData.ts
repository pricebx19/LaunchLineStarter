/**
 * Composable for fetching Wagtail services page data
 */
import { ref, computed } from 'vue'
import { useFeatureFlags } from './useFeatureFlags'

export interface WagtailServicePackage {
  title: string
  description: string
  price: string
  duration: string
  icon: string
  features: string[]
}

export interface WagtailAlaCarteService {
  title: string
  description: string
  price: string
  icon: string
  category: string
  features: string[]
  popular?: boolean
}

export interface WagtailFAQ {
  question: string
  answer: string
}

export interface WagtailServicesData {
  hero?: {
    heading: string
    subheading: string
    cta_text?: string
    cta_link?: string
    background_image?: string
  }
  service_packages?: {
    heading?: string
    subheading?: string
    packages: WagtailServicePackage[]
  }
  ala_carte_services?: {
    heading?: string
    subheading?: string
    services: WagtailAlaCarteService[]
  }
  faq_section?: {
    heading?: string
    subheading?: string
    faqs: WagtailFAQ[]
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
const servicesData = ref<WagtailServicesData | null>(null)
const lastFetched = ref<Date | null>(null)

export function useWagtailServicesData() {
  const { isEnabled } = useFeatureFlags()

  const isWagtailEnabled = computed(() => isEnabled('WAGTAIL_SERVICES'))

  const fetchServicesData = async (apiUrl?: string) => {
    if (!isWagtailEnabled.value) {
      return null
    }

    if (!apiUrl) {
      apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.ServicesPage&fields=content,meta`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch services data: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const servicesPage = data.items[0]
        const processedData = processServicesData(servicesPage.content)
        servicesData.value = processedData
        lastFetched.value = new Date()
        return processedData
      } else {
        throw new Error('No services page found')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services data'
      error.value = errorMessage
      console.error('Error fetching Wagtail services data:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const processServicesData = (content: any[]): WagtailServicesData => {
    const processed: WagtailServicesData = {}

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

        case 'service_packages':
          processed.service_packages = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            packages: block.value.packages.map((pkg: any) => ({
              title: pkg.title,
              description: pkg.description,
              price: pkg.price,
              duration: pkg.duration,
              icon: pkg.icon,
              features: pkg.features
            }))
          }
          break

        case 'ala_carte_services':
          processed.ala_carte_services = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            services: block.value.services.map((service: any) => ({
              title: service.title,
              description: service.description,
              price: service.price,
              icon: service.icon,
              category: service.category,
              features: service.features,
              popular: service.popular
            }))
          }
          break

        case 'faq_section':
          processed.faq_section = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            faqs: block.value.faqs.map((faq: any) => ({
              question: faq.question,
              answer: faq.answer
            }))
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
    return await fetchServicesData()
  }

  const clearCache = () => {
    servicesData.value = null
    lastFetched.value = null
    error.value = null
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => servicesData.value),
    lastFetched: computed(() => lastFetched.value),
    isWagtailEnabled,

    // Methods
    fetchServicesData,
    refresh,
    clearCache,

    // Computed helpers
    hasData: computed(() => servicesData.value !== null),
    hasHero: computed(() => servicesData.value?.hero !== undefined),
    hasServicePackages: computed(() => servicesData.value?.service_packages !== undefined),
    hasAlaCarteServices: computed(() => servicesData.value?.ala_carte_services !== undefined),
    hasFAQ: computed(() => servicesData.value?.faq_section !== undefined),
    hasCTA: computed(() => servicesData.value?.cta !== undefined),
  }
}

// Auto-fetching composable for easy use in components
export function useWagtailServicesDataAuto(options: {
  autoFetch?: boolean
  apiUrl?: string
} = {}) {
  const { autoFetch = true, apiUrl } = options
  const servicesData = useWagtailServicesData()

  if (autoFetch && servicesData.isWagtailEnabled.value) {
    servicesData.fetchServicesData(apiUrl)
  }

  return servicesData
}
