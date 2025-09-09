// API Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: {
    total_count: number
    next: string | null
    previous: string | null
  }
}

export interface HomePage {
  id: number
  title: string
  hero_heading: string
  hero_subheading: string
  hero_cta_text: string
  hero_cta_link: string
  hero_background_image?: string
  content: ContentBlock[]
  seo: SeoMeta
}

export interface BlogPage {
  id: number
  title: string
  slug: string
  intro: string
  date: string
  featured_image?: string
  featuredImage?: string
  content?: ContentBlock[]
  seo: SeoMeta
  meta?: {
    slug?: string
    first_published_at?: string
    search_description?: string
  }
  body?: string
  author?: string
  publishedDate?: string
  search_description?: string
  // Additional properties to match BlogPost interface
  publishedAt?: string
  updatedAt?: string
  readTime?: number
  tags?: string[]
  category?: string
  featured?: boolean
  image?: string
  seoTitle?: string
  seoDescription?: string
}

export interface ContentBlock {
  type: string
  value: any
  id: string
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
  budget?: string
  timeline?: string
}

export interface SeoMeta {
  title?: string
  description?: string
  og_image?: string
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mrbagvqo'

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
  
  // Blog endpoints
  async getBlogList(page: number = 1): Promise<ApiResponse<PaginatedResponse<BlogPage>>> {
    const limit = 10; // posts per page
    const offset = (page - 1) * limit;
    return this.request<PaginatedResponse<BlogPage>>(`/api/v2/pages/?type=pages.BlogPage&limit=${limit}&offset=${offset}&order=-date&fields=id,title,slug,intro,date,featured_image,first_published_at`)
  }
  
  async getBlogPost(slug: string): Promise<ApiResponse<PaginatedResponse<BlogPage>>> {
    return this.request<PaginatedResponse<BlogPage>>(`/api/v2/pages/?type=pages.BlogPage&slug=${slug}&fields=id,title,slug,intro,date,featured_image,content`)
  }
  
  // Lead submission
  async submitLead(leadData: LeadData): Promise<ApiResponse<{ id: number; message: string }>> {
    // If Formspree endpoint is configured, use it for frontend-only deployment
    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            message: leadData.message,
            source: leadData.source || 'Website Contact Form',
            budget: leadData.budget || 'Not specified',
            timeline: leadData.timeline || 'Not specified'
          }),
        })
        
        if (!response.ok) {
          throw new ApiError(`Form submission failed: ${response.status}`, response.status)
        }
        
        return {
          data: { id: Date.now(), message: 'Thank you! Your message has been sent successfully.' },
          success: true
        }
      } catch (error) {
        console.error('Formspree submission error:', error)
        return {
          data: null as any,
          success: false,
          error: error instanceof Error ? error.message : 'Form submission failed'
        }
      }
    }
    
    // Fallback to backend API if available
    return this.request<{ id: number; message: string }>('/api/leads/', {
      method: 'POST',
      body: JSON.stringify(leadData),
    })
  }
  
  // Get any page by slug
  async getPageBySlug(slug: string, pageType?: string): Promise<ApiResponse<any>> {
    const typeFilter = pageType ? `&type=${pageType}` : '';
    return this.request<any>(`/api/v2/pages/?slug=${slug}${typeFilter}&fields=id,title,slug,intro,content`)
  }
  
  // Search pages
  async searchPages(query: string, pageType?: string): Promise<ApiResponse<PaginatedResponse<any>>> {
    const typeFilter = pageType ? `&type=${pageType}` : '';
    return this.request<PaginatedResponse<any>>(`/api/v2/pages/?search=${encodeURIComponent(query)}${typeFilter}`)
  }
}

// Export API client instance
export const apiClient = new ApiClient(API_BASE_URL)

// Convenience functions
export const api = {
  getBlogList: (page?: number) => apiClient.getBlogList(page),
  getBlogPost: (slug: string) => apiClient.getBlogPost(slug),
  submitLead: (leadData: LeadData) => apiClient.submitLead(leadData),
  getPageBySlug: (slug: string, pageType?: string) => apiClient.getPageBySlug(slug, pageType),
  searchPages: (query: string, pageType?: string) => apiClient.searchPages(query, pageType),
}