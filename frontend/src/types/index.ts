// Centralized type exports

// Common types
export * from './Common'
export * from './Animation'
export * from './About'

// Additional missing types
export interface FloatingShape {
  id: string
  type: 'circle' | 'square' | 'triangle'
  size: number
  x: number
  y: number
  color: string
  opacity: number
  animationDelay: number
  gradient?: string
  position?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  delay?: number
}

export interface StreamFieldBlock {
  type: string
  value: any
  id: string
}

export interface WagtailPage {
  id?: number
  title: string
  slug: string
  content: any[]
  seo?: any
  phone?: string
  email?: string
}

export interface WagtailPortfolioData {
  heading?: string
  subheading?: string
  portfolio_projects?: any[] // Using any[] for now to avoid circular import
}

export interface ContactHeroData {
  title: string
  subtitle: string
  description: string
  backgroundImage?: string
  primaryCta?: string
  secondaryCta?: string
  metrics?: ContactMetric[]
}

export interface ContactMetric {
  label: string
  value: string
  description: string
}

export interface FloatingWidgetData {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  subtitle?: string
  methods?: Array<{
    type: string
    href: string
    icon: string
    label: string
  }>
}

// UI types - export specific to avoid conflicts
export type {
  ButtonProps,
  CardProps,
  InputProps,
  ModalProps,
  TooltipProps,
  BadgeProps,
  ProgressProps,
  Testimonial,
  TestimonialData,
  ErrorStateData,
  LoadingStateData,
  SectionHeaderData
} from './UI'

// Existing types
export * from './CompanyStats'
export * from './Service'
export * from './Footer'

// Content types - export specific to avoid conflicts
export type { 
  BlogPost, 
  Author,
  Category,
  Tag,
  Comment,
  NewsletterSubscription,
  WagtailBlogPost,
  WagtailBlogCategory,
  WagtailBlogTag,
  WagtailProject,
  ContentBlock
} from './Content'

// Portfolio types - export specific to avoid conflicts
export type { 
  Project,
  ProjectsData,
  ProjectCategory,
  ProjectStatus,
  Technology,
  TechnologyCategory,
  Client,
  ProjectResults,
  ProjectMetric,
  Award,
  CaseStudy,
  CaseStudyStep
} from './Portfolio'

// SocialSharing types - export specific to avoid conflicts
export type { 
  SocialLink as SocialSharingLink,
  SocialSharingProps as SocialSharingWidgetProps
} from './SocialSharing'

// Forms - export specific types to avoid conflicts
export type { 
  ContactFormData, 
  ProjectType, 
  BudgetRange, 
  TimelineRange, 
  FormField, 
  ValidationRule, 
  FormOption, 
  FormState, 
  FormSubmission, 
  WagtailContactData, 
  ContactABTestViewProps,
  Forms
} from './Forms'

// Form errors type
export interface FormErrors {
  [key: string]: string
}

// Page Props types
export interface HomePageProps {
  // Add any specific props for Home page
}

export interface AboutPageProps {
  // Add any specific props for About page
}

export interface BlogPageProps {
  // Add any specific props for Blog page
}

export interface BlogPostPageProps {
  // Add any specific props for BlogPost page
}

export interface ContactPageProps {
  // Add any specific props for Contact page
}

export interface PortfolioPageProps {
  // Add any specific props for Portfolio page
}

export interface ServicesPageProps {
  // Add any specific props for Services page
}

// Component Props types
export interface ContactFormProps {
  title?: string
  successMessage?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  subjectPlaceholder?: string
  subjectOptions?: string[]
  messagePlaceholder?: string
  messageRows?: number
  submitText?: string
  submittingText?: string
  disclaimerText?: string
}

export interface ContactFormSuccessProps {
  title?: string
  message?: string
  buttonText?: string
}

export interface ContactMethodData {
  // Add any specific props for ContactMethodData
}

export interface ContactInfoProps {
  title?: string
  description?: string
  contactMethods?: any[]
  responseTimeTitle?: string
  responseTimeDescription?: string
}

export interface HeroProps {
  isActive?: boolean
  subtitle?: string
  description?: string
  ctaLink?: string
  ctaText?: string
}

export interface ParentNavigation {
  goToNextSection?: () => void
}

export interface FeatureGridProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
}

export interface CTAProps {
  variant?: 'full' | 'section' | 'simple'
  title?: string
  subtitle?: string
  showStats?: boolean
  stats?: CTAStat[]
  features?: Feature[]
  primaryCtaLink?: string
  primaryCtaText?: string
  secondaryCtaLink?: string
  secondaryCtaText?: string
  additionalInfo?: string
  showNavigation?: boolean
  containerClass?: string
  showEffects?: boolean
}

export interface Stat {
  value: number
  label: string
  suffix?: string
  description?: string
}

export interface CategoryFilterProps {
  marginBottom?: string
  categories: string[]
  selectedCategories: string[]
  specialFilters: {
    popular: boolean
    featured: boolean
    recent: boolean
  }
  itemType?: string
  pageKey?: string
}

export interface DebugPanelProps {
  isDev?: boolean
  title?: string
  strategy?: string
  isWagtailEnabled?: boolean
  migrationStatus?: string
  hasData?: boolean
  hasError?: boolean
  isLoading?: boolean
  featureFlagName?: string
  apiUrl?: string
  lastUpdated?: string | null
}

export interface LoadMoreButtonProps {
  visible?: boolean
  showAll?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
  showIcon?: boolean
  showAllText?: string
  remainingCount?: number
  itemType?: string
  loadingText?: string
  showLessButton?: boolean
  showLessText?: string
}

export interface TechIconProps {
  count?: number
  color?: string
  speed?: number
}

export interface FeatureFlagProps {
  // Add any specific props for FeatureFlag component
}

export interface SearchProps {
  // Add any specific props for Search component
}


// Additional missing types
export interface Stat {
  value: number
  label: string
  suffix?: string
  description?: string
}

export interface NavigationItem {
  name: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Constellation types for ValuesConstellation component
export interface ConstellationLine {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}

export interface ConstellationStar {
  id: string
  x: number
  y: number
  size: number
  delay: number
}

// CTA Stat type
export interface CTAStat {
  value: string
  label: string
  suffix?: string
  description?: string
}

// HomePageData type
export interface HomePageData {
  title: string
  subtitle: string
  description: string
  heroImage?: string
  features?: Feature[]
  stats?: Stat[]
}

