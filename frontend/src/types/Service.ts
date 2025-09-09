export interface Service {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  icon: string
}

export interface AlaCarteService {
  title: string
  description: string
  price: string
  icon: string
  category: string
  features: string[]
  popular?: boolean
}

// Re-export types from Forms.ts to avoid circular dependencies
export type { ProjectType, BudgetRange, TimelineRange } from './Forms'