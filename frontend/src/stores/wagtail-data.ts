import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WagtailDataState {
  home: any | null
  about: any | null
  services: any | null
  portfolio: any | null
  blog: any | null
  contact: any | null
  lastFetched: Record<string, Date | null>
  isLoading: Record<string, boolean>
  errors: Record<string, string | null>
}

export const useWagtailDataStore = defineStore('wagtailData', () => {
  // State
  const data = ref<WagtailDataState>({
    home: null,
    about: null,
    services: null,
    portfolio: null,
    blog: null,
    contact: null,
    lastFetched: {},
    isLoading: {},
    errors: {}
  })

  // Getters
  const getData = computed(() => (type: keyof Omit<WagtailDataState, 'lastFetched' | 'isLoading' | 'errors'>) => {
    return data.value[type]
  })

  const isLoading = computed(() => (type: string) => {
    return data.value.isLoading[type] ?? false
  })

  const getError = computed(() => (type: string) => {
    return data.value.errors[type] ?? null
  })

  const getLastFetched = computed(() => (type: string) => {
    return data.value.lastFetched[type] ?? null
  })

  const hasData = computed(() => (type: keyof Omit<WagtailDataState, 'lastFetched' | 'isLoading' | 'errors'>) => {
    return data.value[type] !== null
  })

  // Actions
  const setData = (type: keyof Omit<WagtailDataState, 'lastFetched' | 'isLoading' | 'errors'>, value: any) => {
    data.value[type] = value
    data.value.lastFetched[type] = new Date()
    data.value.errors[type] = null
  }

  const setLoading = (type: string, loading: boolean) => {
    data.value.isLoading[type] = loading
  }

  const setError = (type: string, error: string | null) => {
    data.value.errors[type] = error
    data.value.isLoading[type] = false
  }

  const clearError = (type: string) => {
    data.value.errors[type] = null
  }

  const clearData = (type: keyof Omit<WagtailDataState, 'lastFetched' | 'isLoading' | 'errors'>) => {
    data.value[type] = null
    data.value.lastFetched[type] = null
    data.value.errors[type] = null
  }

  const reset = () => {
    data.value = {
      home: null,
      about: null,
      services: null,
      portfolio: null,
      blog: null,
      contact: null,
      lastFetched: {},
      isLoading: {},
      errors: {}
    }
  }

  return {
    // State
    data,
    
    // Getters
    getData,
    isLoading,
    getError,
    getLastFetched,
    hasData,
    
    // Actions
    setData,
    setLoading,
    setError,
    clearError,
    clearData,
    reset
  }
})
