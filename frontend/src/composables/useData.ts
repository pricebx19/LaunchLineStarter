// Data management composables

import { ref, computed, watch, type Ref } from 'vue'
import type { LoadingState } from '../types/Common'

/**
 * Generic data fetching composable
 */
export function useData<T>(
  fetcher: () => Promise<T>,
  options: {
    immediate?: boolean
    retryCount?: number
    retryDelay?: number
  } = {}
) {
  const {
    immediate = true,
    retryCount = 3,
    retryDelay = 1000
  } = options

  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const retryAttempts = ref(0)

  const state = computed<LoadingState>(() => ({
    isLoading: loading.value,
    error: error.value,
    data: data.value
  }))

  const fetch = async (): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const result = await fetcher()
      data.value = result
      retryAttempts.value = 0
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      
      if (retryAttempts.value < retryCount) {
        retryAttempts.value++
        setTimeout(() => fetch(), retryDelay)
      }
      
      throw err
    } finally {
      loading.value = false
    }
  }

  const retry = () => {
    retryAttempts.value = 0
    return fetch()
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
    retryAttempts.value = 0
  }

  if (immediate) {
    fetch()
  }

  return {
    data,
    loading,
    error,
    state,
    fetch,
    retry,
    reset,
    retryAttempts
  }
}

/**
 * Pagination composable
 */
export function usePagination<T>(
  items: Ref<T[]>,
  pageSize: number = 10
) {
  const currentPage = ref(1)
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))
  const totalItems = computed(() => items.value.length)
  
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return items.value.slice(start, end)
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const reset = () => {
    currentPage.value = 1
  }

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    reset
  }
}

/**
 * Search composable
 */
export function useSearch<T>(
  items: Ref<T[]>,
  searchFields: (keyof T)[],
  options: {
    minQueryLength?: number
    debounceDelay?: number
  } = {}
) {
  const {
    minQueryLength = 2,
    debounceDelay = 300
  } = options

  const query = ref('')
  const results = ref<T[]>([])
  const isSearching = ref(false)

  const search = (searchQuery: string) => {
    query.value = searchQuery
    
    if (searchQuery.length < minQueryLength) {
      results.value = []
      return
    }

    isSearching.value = true
    
    const filtered = items.value.filter(item => {
      return searchFields.some(field => {
        const value = item[field]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return false
      })
    })
    
    results.value = filtered
    isSearching.value = false
  }

  const clear = () => {
    query.value = ''
    results.value = []
  }

  const hasResults = computed(() => results.value.length > 0)
  const resultCount = computed(() => results.value.length)

  return {
    query,
    results,
    isSearching,
    search,
    clear,
    hasResults,
    resultCount
  }
}

/**
 * Filter composable
 */
export function useFilters<T>(
  items: Ref<T[]>,
  filterConfig: Record<string, (item: T, value: any) => boolean>
) {
  const filters = ref<Record<string, any>>({})
  const filteredItems = ref<T[]>([])

  const applyFilters = () => {
    filteredItems.value = items.value.filter(item => {
      return Object.entries(filters.value).every(([key, value]) => {
        if (value === null || value === undefined || value === '') return true
        return filterConfig[key]?.(item, value) ?? true
      })
    })
  }

  const setFilter = (key: string, value: any) => {
    filters.value[key] = value
    applyFilters()
  }

  const clearFilter = (key: string) => {
    delete filters.value[key]
    applyFilters()
  }

  const clearAllFilters = () => {
    filters.value = {}
    applyFilters()
  }

  const hasActiveFilters = computed(() => Object.keys(filters.value).length > 0)
  const activeFilterCount = computed(() => Object.keys(filters.value).length)

  // Watch for changes in items and reapply filters
  watch(items, applyFilters, { immediate: true })

  return {
    filters,
    filteredItems,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount
  }
}

/**
 * Local storage composable
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const value = ref<T>(initialValue)

  const setValue = (newValue: T) => {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  const removeValue = () => {
    value.value = defaultValue
    localStorage.removeItem(key)
  }

  return {
    value,
    setValue,
    removeValue
  }
}

/**
 * Session storage composable
 */
export function useSessionStorage<T>(key: string, defaultValue: T) {
  const storedValue = sessionStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const value = ref<T>(initialValue)

  const setValue = (newValue: T) => {
    value.value = newValue
    sessionStorage.setItem(key, JSON.stringify(newValue))
  }

  const removeValue = () => {
    value.value = defaultValue
    sessionStorage.removeItem(key)
  }

  return {
    value,
    setValue,
    removeValue
  }
}
