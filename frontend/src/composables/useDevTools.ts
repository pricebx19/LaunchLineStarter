/**
 * Development tools composable
 */

import { ref, computed, watch } from 'vue'
import { errorHandler } from '../lib/error-handler'
import type { LogLevel, LogEntry } from '../types/errors'

export interface DevLog extends LogEntry {
  level: LogLevel
  message: string
  timestamp: number
  data?: unknown
}

export function useDevTools() {
  const isEnabled = ref(import.meta.env.DEV)
  const isVisible = ref(false)
  const activeTab = ref<'errors' | 'logs' | 'performance'>('errors')
  const logLevelFilter = ref<LogLevel>('log')

  // Computed properties
  const errors = computed(() => errorHandler.getErrors())
  const logs = computed(() => errorHandler.getLogs())
  const notifications = computed(() => errorHandler.getNotifications())
  const metrics = computed(() => errorHandler.getMetrics())

  const errorCount = computed(() => errors.value.length)
  const logCount = computed(() => logs.value.length)

  const recentErrors = computed(() => 
    errors.value.slice(-10).reverse()
  )

  const recentLogs = computed(() => 
    logs.value.slice(-20).reverse()
  )

  const filteredLogs = computed(() => 
    logs.value.filter(log => log.level === logLevelFilter.value)
  )

  // Methods
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value
  }

  const clearErrors = () => {
    errorHandler.clear()
  }

  const clearLogs = () => {
    // Clear logs by creating a new error handler instance
    // This is a workaround since clear() clears everything
    const currentErrors = errorHandler.getErrors()
    errorHandler.clear()
    currentErrors.forEach(error => {
      errorHandler.handle(new Error(error.message))
    })
  }

  const dismissNotification = (id: string) => {
    errorHandler.dismissNotification(id)
  }

  const setActiveTab = (tab: 'errors' | 'logs' | 'performance') => {
    activeTab.value = tab
  }

  const setLogLevelFilter = (level: LogLevel) => {
    logLevelFilter.value = level
  }

  // Watch for new errors and logs
  watch(errors, (newErrors) => {
    if (newErrors.length > 0 && isEnabled.value) {
      console.log('New error detected:', newErrors[newErrors.length - 1])
    }
  })

  watch(logs, (newLogs) => {
    if (newLogs.length > 0 && isEnabled.value) {
      console.log('New log entry:', newLogs[newLogs.length - 1])
    }
  })

  return {
    // State
    isEnabled,
    isVisible,
    activeTab,
    logLevelFilter,
    
    // Computed
    errors,
    logs,
    notifications,
    metrics,
    errorCount,
    logCount,
    recentErrors,
    recentLogs,
    filteredLogs,
    
    // Methods
    toggleVisibility,
    clearErrors,
    clearLogs,
    dismissNotification,
    setActiveTab,
    setLogLevelFilter
  }
}