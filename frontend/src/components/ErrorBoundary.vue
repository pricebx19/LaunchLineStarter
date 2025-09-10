<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-boundary__content">
      <div class="error-boundary__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      
      <h2 class="error-boundary__title">Something went wrong</h2>
      <p class="error-boundary__message">
        {{ error?.message || 'An unexpected error occurred' }}
      </p>
      
      <div class="error-boundary__actions">
        <button 
          @click="retry" 
          class="error-boundary__button error-boundary__button--primary"
        >
          Try Again
        </button>
        <button 
          @click="goHome" 
          class="error-boundary__button error-boundary__button--secondary"
        >
          Go Home
        </button>
      </div>
      
      <details v-if="showDetails" class="error-boundary__details">
        <summary>Error Details</summary>
        <pre class="error-boundary__stack">{{ error?.stack }}</pre>
        <div class="error-boundary__context">
          <h4>Context:</h4>
          <pre>{{ JSON.stringify(context, null, 2) }}</pre>
        </div>
      </details>
      
      <button 
        @click="toggleDetails" 
        class="error-boundary__toggle"
      >
        {{ showDetails ? 'Hide' : 'Show' }} Details
      </button>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { errorHandler } from '../lib/error-handler'
import type { ErrorContext } from '../types/errors'

export interface ErrorBoundaryProps {
  fallback?: (error: Error, retry: () => void) => any
  onError?: (error: Error, errorInfo: any) => void
  resetOnPropsChange?: boolean
  resetOnRouteChange?: boolean
  showDetails?: boolean
}

const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  resetOnPropsChange: true,
  resetOnRouteChange: true,
  showDetails: false
})

const emit = defineEmits<{
  error: [error: Error, errorInfo: any]
  retry: []
}>()

const router = useRouter()
const hasError = ref(false)
const error = ref<Error | null>(null)
const context = ref<Partial<ErrorContext>>({})
const showDetails = ref(props.showDetails)


// Error handling
const handleError = (err: Error, info: any) => {
  hasError.value = true
  error.value = err
  context.value = { ...context.value, ...info }
  context.value = {
    component: 'ErrorBoundary',
    action: 'component-error',
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }

  // Report to error handler
  errorHandler.handle(err, context.value)

  // Call custom error handler
  if (props.onError) {
    props.onError(err, info)
  }

  // Emit error event
  emit('error', err, info)
}

// Retry function
const retry = () => {
  hasError.value = false
  error.value = null
  context.value = {}
  emit('retry')
}

// Go home function
const goHome = () => {
  router.push('/')
  retry()
}

// Toggle details
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

// Reset error state
const resetError = () => {
  hasError.value = false
  error.value = null
  context.value = {}
}

// Watch for route changes
watch(() => router.currentRoute.value.path, () => {
  if (props.resetOnRouteChange) {
    resetError()
  }
})

// Watch for props changes
watch(() => props, () => {
  if (props.resetOnPropsChange) {
    resetError()
  }
}, { deep: true })

// Setup error handling
onMounted(() => {
  // Handle unhandled errors in this component
  const handleUnhandledError = (event: ErrorEvent) => {
    handleError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  }

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    handleError(new Error(event.reason), {
      type: 'unhandledrejection'
    })
  }

  window.addEventListener('error', handleUnhandledError)
  window.addEventListener('unhandledrejection', handleUnhandledRejection)

  onUnmounted(() => {
    window.removeEventListener('error', handleUnhandledError)
    window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  })
})

// Expose methods for parent components
defineExpose({
  handleError,
  retry,
  resetError
})
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.error-boundary__content {
  text-align: center;
  max-width: 500px;
}

.error-boundary__icon {
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-boundary__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
}

.error-boundary__message {
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.error-boundary__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.error-boundary__button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.error-boundary__button--primary {
  background: #007bff;
  color: white;
}

.error-boundary__button--primary:hover {
  background: #0056b3;
}

.error-boundary__button--secondary {
  background: #6c757d;
  color: white;
}

.error-boundary__button--secondary:hover {
  background: #545b62;
}

.error-boundary__details {
  text-align: left;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
}

.error-boundary__details summary {
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1rem;
}

.error-boundary__stack {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #dc3545;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.error-boundary__context {
  margin-top: 1rem;
}

.error-boundary__context h4 {
  margin-bottom: 0.5rem;
  color: #495057;
}

.error-boundary__context pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #495057;
  overflow-x: auto;
}

.error-boundary__toggle {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.875rem;
}

.error-boundary__toggle:hover {
  color: #0056b3;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .error-boundary {
    background: #1a1a1a;
    border-color: #333;
  }
  
  .error-boundary__title {
    color: #fff;
  }
  
  .error-boundary__message {
    color: #ccc;
  }
  
  .error-boundary__details {
    background: #2d2d2d;
    border-color: #444;
  }
  
  .error-boundary__stack,
  .error-boundary__context pre {
    background: #2d2d2d;
    border-color: #444;
    color: #ff6b6b;
  }
  
  .error-boundary__context h4 {
    color: #ccc;
  }
}
</style>
