import { BaseApiClient } from './base-api'
import type { ApiResponse, PaginatedResponse, BlogPage, LeadData } from '../lib/api'

export interface WagtailPageResponse {
  id: number
  title: string
  slug: string
  content: any[]
  meta: any
  seo: any
}

export interface WagtailBlogResponse {
  items: BlogPage[]
  meta: {
    total_count: number
    next: string | null
    previous: string | null
  }
}

export class WagtailApiService extends BaseApiClient {
  constructor(baseUrl: string = 'http://localhost:8000') {
    super({
      baseUrl,
      timeout: 10000,
      retries: 3,
      retryDelay: 1000
    })
  }

  // Feature Flags
  async getFeatureFlags(): Promise<ApiResponse<{ flags: Record<string, boolean> }>> {
    return this.get('/api/feature-flags/', { cache: true, cacheKey: 'feature-flags' })
  }

  async getFeatureMetadata(): Promise<ApiResponse<any>> {
    return this.get('/api/wagtail-transition/', { cache: true, cacheKey: 'feature-metadata' })
  }

  // Pages
  async getPageByType<T = WagtailPageResponse>(
    pageType: string, 
    fields?: string[]
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    const fieldsParam = fields ? `&fields=${fields.join(',')}` : ''
    const endpoint = `/api/v2/pages/?type=${pageType}${fieldsParam}`
    
    return this.get<PaginatedResponse<T>>(endpoint, { 
      cache: true, 
      cacheKey: `page-${pageType}-${fields?.join(',') || 'all'}` 
    })
  }

  async getPageBySlug<T = WagtailPageResponse>(
    slug: string, 
    pageType?: string,
    fields?: string[]
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    const typeFilter = pageType ? `&type=${pageType}` : ''
    const fieldsParam = fields ? `&fields=${fields.join(',')}` : ''
    const endpoint = `/api/v2/pages/?slug=${slug}${typeFilter}${fieldsParam}`
    
    return this.get<PaginatedResponse<T>>(endpoint, { 
      cache: true, 
      cacheKey: `page-slug-${slug}-${pageType || 'any'}` 
    })
  }

  // Home Page
  async getHomePage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.HomePage', ['content', 'meta'])
  }

  // About Page
  async getAboutPage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.AboutPage', ['content', 'meta'])
  }

  // Services Page
  async getServicesPage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.ServicesPage', ['content', 'meta'])
  }

  // Portfolio Page
  async getPortfolioPage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.PortfolioPage', ['content', 'meta'])
  }

  // Blog
  async getBlogIndexPage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.BlogIndexPage', ['content', 'intro', 'blog_posts'])
  }

  async getBlogPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<WagtailBlogResponse>> {
    const offset = (page - 1) * limit
    const endpoint = `/api/v2/pages/?type=pages.BlogPage&limit=${limit}&offset=${offset}&order=-date&fields=id,title,slug,intro,date,featured_image,first_published_at`
    
    return this.get<WagtailBlogResponse>(endpoint, { 
      cache: true, 
      cacheKey: `blog-posts-${page}-${limit}` 
    })
  }

  async getBlogPost(slug: string): Promise<ApiResponse<PaginatedResponse<BlogPage>>> {
    const endpoint = `/api/v2/pages/?type=pages.BlogPage&slug=${slug}&fields=id,title,slug,intro,date,featured_image,content`
    
    return this.get<PaginatedResponse<BlogPage>>(endpoint, { 
      cache: true, 
      cacheKey: `blog-post-${slug}` 
    })
  }

  // Contact Page
  async getContactPage(): Promise<ApiResponse<PaginatedResponse<WagtailPageResponse>>> {
    return this.getPageByType('pages.ContactPage', ['content', 'meta'])
  }

  // Search
  async searchPages(
    query: string, 
    pageType?: string
  ): Promise<ApiResponse<PaginatedResponse<any>>> {
    const typeFilter = pageType ? `&type=${pageType}` : ''
    const endpoint = `/api/v2/pages/?search=${encodeURIComponent(query)}${typeFilter}`
    
    return this.get<PaginatedResponse<any>>(endpoint, { 
      cache: true, 
      cacheKey: `search-${query}-${pageType || 'all'}` 
    })
  }

  // Lead Submission
  async submitLead(leadData: LeadData): Promise<ApiResponse<{ id: number; message: string }>> {
    return this.post('/api/leads/', leadData, { cache: false })
  }

  // Cache management for Wagtail-specific data
  clearPageCache(pageType?: string): void {
    if (pageType) {
      // Clear specific page type cache
      const keysToDelete = Array.from(this.cache.keys()).filter(key => 
        key.includes(`page-${pageType}`)
      )
      keysToDelete.forEach(key => this.clearCacheKey(key))
    } else {
      // Clear all page cache
      const keysToDelete = Array.from(this.cache.keys()).filter(key => 
        key.startsWith('page-') || key.startsWith('blog-')
      )
      keysToDelete.forEach(key => this.clearCacheKey(key))
    }
  }

  clearBlogCache(): void {
    const keysToDelete = Array.from(this.cache.keys()).filter(key => 
      key.startsWith('blog-')
    )
    keysToDelete.forEach(key => this.clearCacheKey(key))
  }

  clearFeatureFlagCache(): void {
    this.clearCacheKey('feature-flags')
    this.clearCacheKey('feature-metadata')
  }
}
