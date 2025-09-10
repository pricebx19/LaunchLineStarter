// Content-related interfaces

export interface BlogPost {
  id: string | number
  title: string
  slug: string
  intro: string
  content?: ContentBlock[] | string
  author?: Author | string
  publishedAt?: string
  updatedAt?: string
  readTime?: number
  tags?: string[]
  category?: string
  featured?: boolean
  image?: string
  seoTitle?: string
  seoDescription?: string
  // Additional properties for compatibility
  date?: string
  publishedDate?: string
  featuredImage?: string
}

export interface Author {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  socialLinks?: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postCount: number
}

export interface Comment {
  id: string
  content: string
  author: Author
  createdAt: string
  updatedAt: string
  parentId?: string
  replies?: Comment[]
  approved: boolean
}

export interface NewsletterSubscription {
  email: string
  firstName?: string
  lastName?: string
  interests?: string[]
  subscribedAt: string
  status: 'active' | 'unsubscribed' | 'pending'
}

// Wagtail-specific types
export interface WagtailBlogPost {
  id: number
  title: string
  slug: string
  intro: string
  date: string
  featured_image?: string
  featuredImage?: string
  content?: ContentBlock[]
  author?: string
  search_description?: string
}

export interface WagtailBlogCategory {
  id: number
  name: string
  slug: string
  description?: string
}

export interface WagtailBlogTag {
  id: number
  name: string
  slug: string
}

export interface WagtailProject {
  id: number
  title: string
  slug: string
  description: string
  image?: string
  technologies?: string[]
  category?: string
  featured?: boolean
  live_url?: string
  github_url?: string
}

export interface ContentBlock {
  type: string
  value: unknown
  id: string
}