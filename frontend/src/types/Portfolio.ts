// Portfolio-related interfaces
import type { Author } from './Content'

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  image: string
  images: string[]
  technologies: Technology[]
  category: ProjectCategory
  status: ProjectStatus
  client?: Client
  startDate: string
  endDate?: string
  duration?: string
  budget?: string
  teamSize?: number
  features: string[]
  challenges: string[]
  solutions: string[]
  results: ProjectResults
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface ProjectCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
}

export interface ProjectStatus {
  id: string
  name: string
  color: string
  description?: string
}

export interface Technology {
  id: string
  name: string
  category: TechnologyCategory
  icon?: string
  color?: string
  description?: string
}

export interface TechnologyCategory {
  id: string
  name: string
  icon?: string
  color?: string
}

export interface Client {
  id: string
  name: string
  logo?: string
  website?: string
  industry?: string
  size?: string
  location?: string
}

export interface ProjectResults {
  metrics: ProjectMetric[]
  testimonials: Testimonial[]
  awards?: Award[]
}

export interface ProjectMetric {
  label: string
  value: string
  description?: string
  improvement?: string
}

export interface Testimonial {
  id: string
  content: string
  author: Author
  role: string
  company: string
  rating: number
  projectId: string
}

export interface ProjectsData {
  heading?: string
  subheading?: string
  projects: Project[]
}

export interface Award {
  id: string
  name: string
  organization: string
  year: number
  category?: string
  projectId: string
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  project: Project
  challenge: string
  solution: string
  process: CaseStudyStep[]
  results: ProjectResults
  lessons: string[]
  featured: boolean
}

export interface CaseStudyStep {
  id: string
  title: string
  description: string
  image?: string
  order: number
}
