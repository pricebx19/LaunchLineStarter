// API Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  next: string | null
  previous: string | null
  count: number
}

export interface HomePage {
  id: number
  title: string
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    backgroundImage?: string
  }
  features: Feature[]
  testimonials: Testimonial[]
  cta: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
  seo: SeoMeta
}

export interface BlogPage {
  id: number
  title: string
  slug: string
  intro: string
  body: string
  publishedDate: string
  author: string
  featuredImage?: string
  seo: SeoMeta
}

export interface Feature {
  id: number
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export interface LeadData {
  name: string
  email: string
  message: string
  source?: string
}

export interface SeoMeta {
  seoTitle?: string
  searchDescription?: string
  ogImage?: string
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

class ApiError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

// API Client
class ApiClient {
  private baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })
      
      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status
        )
      }
      
      const data = await response.json()
      
      return {
        data,
        success: true
      }
    } catch (error) {
      console.error('API request error:', error)
      
      return {
        data: null as any,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
  
  // Home page data
  async getHomePage(): Promise<ApiResponse<HomePage>> {
    return this.request<HomePage>('/api/pages/home/')
  }
  
  // Blog endpoints
  async getBlogList(page: number = 1): Promise<ApiResponse<PaginatedResponse<BlogPage>>> {
    return this.request<PaginatedResponse<BlogPage>>(`/api/blog/?page=${page}`)
  }
  
  async getBlogPost(slug: string): Promise<ApiResponse<BlogPage>> {
    return this.request<BlogPage>(`/api/blog/${slug}/`)
  }
  
  // Lead submission
  async submitLead(leadData: LeadData): Promise<ApiResponse<{ id: number }>> {
    return this.request<{ id: number }>('/api/leads/', {
      method: 'POST',
      body: JSON.stringify(leadData),
    })
  }
}

// Export API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Convenience functions
export const api = {
  getHomePage: () => apiClient.getHomePage(),
  getBlogList: (page?: number) => apiClient.getBlogList(page),
  getBlogPost: (slug: string) => apiClient.getBlogPost(slug),
  submitLead: (leadData: LeadData) => apiClient.submitLead(leadData),
}