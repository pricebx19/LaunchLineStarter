import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UIState {
  loading: Record<string, boolean>
  errors: Record<string, string | null>
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>
  userPreferences: {
    theme: 'light' | 'dark' | 'auto'
    animations: boolean
    reducedMotion: boolean
  }
  modals: Record<string, boolean>
  sidebar: {
    isOpen: boolean
    isCollapsed: boolean
  }
}

export const useUIStore = defineStore('ui', () => {
  // State
  const state = ref<UIState>({
    loading: {},
    errors: {},
    notifications: [],
    userPreferences: {
      theme: 'auto',
      animations: true,
      reducedMotion: false
    },
    modals: {},
    sidebar: {
      isOpen: false,
      isCollapsed: false
    }
  })

  // Getters
  const isLoading = computed(() => (key: string) => {
    return state.value.loading[key] ?? false
  })

  const getError = computed(() => (key: string) => {
    return state.value.errors[key] ?? null
  })

  const hasError = computed(() => (key: string) => {
    return state.value.errors[key] !== null
  })

  const getNotifications = computed(() => {
    return state.value.notifications
  })

  const getUserPreferences = computed(() => {
    return state.value.userPreferences
  })

  const isModalOpen = computed(() => (modalId: string) => {
    return state.value.modals[modalId] ?? false
  })

  const isSidebarOpen = computed(() => {
    return state.value.sidebar.isOpen
  })

  const isSidebarCollapsed = computed(() => {
    return state.value.sidebar.isCollapsed
  })

  // Actions
  const setLoading = (key: string, loading: boolean) => {
    state.value.loading[key] = loading
  }

  const setError = (key: string, error: string | null) => {
    state.value.errors[key] = error
  }

  const clearError = (key: string) => {
    state.value.errors[key] = null
  }

  const clearAllErrors = () => {
    state.value.errors = {}
  }

  const addNotification = (notification: Omit<UIState['notifications'][0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    state.value.notifications.push({
      ...notification,
      id
    })

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration)
    }
  }

  const removeNotification = (id: string) => {
    const index = state.value.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      state.value.notifications.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    state.value.notifications = []
  }

  const setUserPreference = <K extends keyof UIState['userPreferences']>(
    key: K, 
    value: UIState['userPreferences'][K]
  ) => {
    state.value.userPreferences[key] = value
  }

  const setModalOpen = (modalId: string, isOpen: boolean) => {
    state.value.modals[modalId] = isOpen
  }

  const toggleModal = (modalId: string) => {
    state.value.modals[modalId] = !state.value.modals[modalId]
  }

  const setSidebarOpen = (isOpen: boolean) => {
    state.value.sidebar.isOpen = isOpen
  }

  const setSidebarCollapsed = (isCollapsed: boolean) => {
    state.value.sidebar.isCollapsed = isCollapsed
  }

  const toggleSidebar = () => {
    state.value.sidebar.isOpen = !state.value.sidebar.isOpen
  }

  const toggleSidebarCollapse = () => {
    state.value.sidebar.isCollapsed = !state.value.sidebar.isCollapsed
  }

  const reset = () => {
    state.value = {
      loading: {},
      errors: {},
      notifications: [],
      userPreferences: {
        theme: 'auto',
        animations: true,
        reducedMotion: false
      },
      modals: {},
      sidebar: {
        isOpen: false,
        isCollapsed: false
      }
    }
  }

  return {
    // State
    state,
    
    // Getters
    isLoading,
    getError,
    hasError,
    getNotifications,
    getUserPreferences,
    isModalOpen,
    isSidebarOpen,
    isSidebarCollapsed,
    
    // Actions
    setLoading,
    setError,
    clearError,
    clearAllErrors,
    addNotification,
    removeNotification,
    clearNotifications,
    setUserPreference,
    setModalOpen,
    toggleModal,
    setSidebarOpen,
    setSidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapse,
    reset
  }
})
