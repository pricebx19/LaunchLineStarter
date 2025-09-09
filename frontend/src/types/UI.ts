// UI Component interfaces

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  label?: string
  helpText?: string
}

export interface ModalProps {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  persistent?: boolean
}

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  disabled?: boolean
}

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

export interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  animated?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating?: number
}

export interface TestimonialData {
  title: string
  description: string
  testimonials: Testimonial[]
}

export interface ErrorStateData {
  title: string
  description: string
  actionText?: string
  actionUrl?: string
  icon?: string
}

export interface LoadingStateData {
  title: string
  description: string
  showSpinner?: boolean
  progress?: number
}

export interface SectionHeaderData {
  badgeText?: string
  title: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}