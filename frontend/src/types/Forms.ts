// Form-related interfaces

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  projectType?: ProjectType
  budget?: BudgetRange | string
  timeline?: TimelineRange | string
  services?: string[]
  source?: string
  newsletter?: boolean
}

export interface ProjectType {
  id: string
  name: string
  description?: string
  icon?: string
}

export interface BudgetRange {
  id: string
  name: string
  min: number
  max: number
  description?: string
}

export interface TimelineRange {
  id: string
  name: string
  minWeeks: number
  maxWeeks: number
  description?: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required: boolean
  placeholder?: string
  helpText?: string
  validation?: ValidationRule[]
  options?: FormOption[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: any
  message: string
}

export interface FormOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormState {
  data: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

export interface FormSubmission {
  formId: string
  data: Record<string, any>
  submittedAt: string
  status: 'pending' | 'success' | 'error'
  response?: any
  error?: string
}

export interface WagtailContactData {
  id?: number
  content: any[]
  title: string
  slug: string
  seo?: any
}

export interface ContactABTestViewProps {
  isLoadingWagtailData: boolean
  wagtailDataError: string | null
  wagtailData: WagtailContactData
}

// Main Forms interface
export interface Forms {
  contact: ContactFormData
  newsletter: {
    email: string
    firstName?: string
    lastName?: string
  }
}

// Additional form-related types
export interface ContactHeroData {
  title: string
  subtitle: string
  description: string
  backgroundImage?: string
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
}