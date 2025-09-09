// Common interfaces used across multiple components

export interface BaseProps {
  id?: string
  class?: string
  style?: string
}

export interface AnimationProps {
  animationDelay?: number
  duration?: number
  easing?: string
}

export interface ResponsiveProps {
  mobile?: boolean
  tablet?: boolean
  desktop?: boolean
}

export interface ThemeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
  data?: any
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

export interface FilterProps {
  searchQuery?: string
  selectedCategories?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchFilters {
  query?: string
  categories?: string[]
  tags?: string[]
  dateRange?: {
    start: string
    end: string
  }
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  popular?: boolean
  featured?: boolean
  recent?: boolean
}

export interface SearchProps {
  placeholder?: string
  suggestions?: string[]
  onSearch?: (query: string) => void
  onSuggestionClick?: (suggestion: string) => void
}