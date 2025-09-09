/**
 * Composable for fetching Wagtail portfolio page data
 */
import { ref, computed } from 'vue'
import { useFeatureFlags } from './useFeatureFlags'

export interface WagtailProject {
  title: string
  description: string
  icon: string
  tags: string[]
  package: string
  timeline: string
  category: string
  image?: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'featured'
  visits?: string
  conversion?: string
  performance?: string
}

export interface WagtailCaseStudy {
  title: string
  business: string
  icon: string
  metric1_value: string
  metric1_label: string
  metric2_value: string
  metric2_label: string
  description: string
  package: string
  timeline: string
  testimonial?: string
  client?: string
}

export interface WagtailTechnology {
  name: string
  icon: string
}

export interface WagtailPortfolioData {
  hero?: {
    heading: string
    subheading: string
    cta_text?: string
    cta_link?: string
    background_image?: string
  }
  statistics?: {
    heading?: string
    metrics: Array<{
      value: string
      label: string
    }>
  }
  portfolio_projects?: {
    heading?: string
    subheading?: string
    projects: WagtailProject[]
  }
  case_studies?: {
    heading?: string
    subheading?: string
    case_studies: WagtailCaseStudy[]
  }
  technologies?: {
    heading?: string
    subheading?: string
    technologies: WagtailTechnology[]
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
const portfolioData = ref<WagtailPortfolioData | null>(null)
const lastFetched = ref<Date | null>(null)

export function useWagtailPortfolioData() {
  const { isEnabled } = useFeatureFlags()

  const isWagtailEnabled = computed(() => isEnabled('WAGTAIL_PORTFOLIO'))

  const fetchPortfolioData = async (apiUrl?: string) => {
    if (!isWagtailEnabled.value) {
      return null
    }

    if (!apiUrl) {
      apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.PortfolioPage&fields=content,meta`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio data: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        const portfolioPage = data.items[0]
        const processedData = processPortfolioData(portfolioPage.content)
        portfolioData.value = processedData
        lastFetched.value = new Date()
        return processedData
      } else {
        throw new Error('No portfolio page found')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch portfolio data'
      error.value = errorMessage
      console.error('Error fetching Wagtail portfolio data:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const processPortfolioData = (content: any[]): WagtailPortfolioData => {
    const processed: WagtailPortfolioData = {}

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

        case 'statistics':
          processed.statistics = {
            heading: block.value.heading,
            metrics: block.value.metrics.map((metric: any) => ({
              value: metric.value,
              label: metric.label
            }))
          }
          break

        case 'portfolio_projects':
          processed.portfolio_projects = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            projects: block.value.projects.map((project: any) => ({
              title: project.title,
              description: project.description,
              icon: project.icon,
              tags: project.tags,
              package: project.package,
              timeline: project.timeline,
              category: project.category,
              image: project.image?.url,
              technologies: project.technologies,
              status: project.status,
              visits: project.visits,
              conversion: project.conversion,
              performance: project.performance
            }))
          }
          break

        case 'case_studies':
          processed.case_studies = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            case_studies: block.value.case_studies.map((caseStudy: any) => ({
              title: caseStudy.title,
              business: caseStudy.business,
              icon: caseStudy.icon,
              metric1_value: caseStudy.metric1_value,
              metric1_label: caseStudy.metric1_label,
              metric2_value: caseStudy.metric2_value,
              metric2_label: caseStudy.metric2_label,
              description: caseStudy.description,
              package: caseStudy.package,
              timeline: caseStudy.timeline,
              testimonial: caseStudy.testimonial,
              client: caseStudy.client
            }))
          }
          break

        case 'technologies':
          processed.technologies = {
            heading: block.value.heading,
            subheading: block.value.subheading,
            technologies: block.value.technologies.map((tech: any) => ({
              name: tech.name,
              icon: tech.icon
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
    return await fetchPortfolioData()
  }

  const clearCache = () => {
    portfolioData.value = null
    lastFetched.value = null
    error.value = null
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => portfolioData.value),
    lastFetched: computed(() => lastFetched.value),
    isWagtailEnabled,

    // Methods
    fetchPortfolioData,
    refresh,
    clearCache,

    // Computed helpers
    hasData: computed(() => portfolioData.value !== null),
    hasHero: computed(() => portfolioData.value?.hero !== undefined),
    hasStatistics: computed(() => portfolioData.value?.statistics !== undefined),
    hasProjects: computed(() => portfolioData.value?.portfolio_projects !== undefined),
    hasCaseStudies: computed(() => portfolioData.value?.case_studies !== undefined),
    hasTechnologies: computed(() => portfolioData.value?.technologies !== undefined),
    hasCTA: computed(() => portfolioData.value?.cta !== undefined),
  }
}

// Auto-fetching composable for easy use in components
export function useWagtailPortfolioDataAuto(options: {
  autoFetch?: boolean
  apiUrl?: string
} = {}) {
  const { autoFetch = true, apiUrl } = options
  const portfolioData = useWagtailPortfolioData()

  if (autoFetch && portfolioData.isWagtailEnabled.value) {
    portfolioData.fetchPortfolioData(apiUrl)
  }

  return portfolioData
}
