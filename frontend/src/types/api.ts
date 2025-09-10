/**
 * API-related type definitions
 */

// Base API response structure
export interface ApiResponse<T = unknown> {
  data: T | null
  success: boolean
  error?: string
  message?: string
  status?: number
}

// Paginated response structure
export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// API error structure
export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: Record<string, unknown>
  timestamp: string
}

// Request configuration
export interface RequestConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
  skipCache?: boolean
  cacheKey?: string
  headers?: Record<string, string>
}

// Cache configuration
export interface CacheConfig {
  ttl?: number
  maxSize?: number
  maxAge?: number
  strategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate' | 'network-only' | 'cache-only'
}

// Wagtail API types
export interface WagtailPage {
  id: number
  title: string
  slug: string
  url: string
  meta: {
    type: string
    detail_url: string
    html_url: string
    slug: string
    show_in_menus: boolean
    seo_title: string
    search_description: string
    first_published_at: string
    last_published_at: string
  }
}

export interface WagtailHomePage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  features: WagtailFeature[]
  statistics: WagtailStatistic[]
  testimonials: WagtailTestimonial[]
}

export interface WagtailAboutPage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  mission: string
  vision: string
  values: WagtailValue[]
  team: WagtailTeamMember[]
}

export interface WagtailServicesPage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  services: WagtailService[]
  packages: WagtailServicePackage[]
}

export interface WagtailPortfolioPage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  projects: WagtailProject[]
  case_studies: WagtailCaseStudy[]
}

export interface WagtailBlogPage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  posts: WagtailBlogPost[]
}

export interface WagtailContactPage extends WagtailPage {
  hero_title: string
  hero_subtitle: string
  hero_image: WagtailImage
  contact_info: WagtailContactInfo
  form_fields: WagtailFormField[]
}

// Wagtail content types
export interface WagtailImage {
  id: number
  title: string
  file: string
  width: number
  height: number
  alt_text: string
  caption?: string
}

export interface WagtailFeature {
  id: number
  title: string
  description: string
  icon: string
  image?: WagtailImage
}

export interface WagtailStatistic {
  id: number
  number: number
  label: string
  description?: string
}

export interface WagtailTestimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar?: WagtailImage
  rating?: number
}

export interface WagtailValue {
  id: number
  title: string
  description: string
  icon: string
}

export interface WagtailTeamMember {
  id: number
  name: string
  role: string
  bio: string
  avatar?: WagtailImage
  social_links: Record<string, string>
}

export interface WagtailService {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
  price?: number
  image?: WagtailImage
}

export interface WagtailServicePackage {
  id: number
  name: string
  description: string
  price: number
  features: string[]
  is_popular: boolean
  button_text: string
  button_url: string
}

export interface WagtailProject {
  id: number
  title: string
  description: string
  image: WagtailImage
  technologies: string[]
  url?: string
  github_url?: string
  featured: boolean
}

export interface WagtailCaseStudy {
  id: number
  title: string
  description: string
  image: WagtailImage
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  url?: string
}

export interface WagtailBlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: WagtailImage
  author: string
  published_at: string
  tags: string[]
  category: string
  read_time: number
}

export interface WagtailContactInfo {
  email: string
  phone: string
  address: string
  social_links: Record<string, string>
}

export interface WagtailFormField {
  id: number
  name: string
  label: string
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'
  required: boolean
  placeholder?: string
  options?: string[]
}

// Feature flags API types
export interface FeatureFlag {
  name: string
  enabled: boolean
  description?: string
  environment: 'development' | 'staging' | 'production'
  last_updated: string
}

export interface FeatureFlagsResponse {
  flags: Record<string, FeatureFlag>
  last_updated: string
  environment: string
}

// Lead submission types
export interface LeadData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface LeadSubmissionResponse {
  success: boolean
  message: string
  lead_id?: string
  errors?: Record<string, string[]>
}
