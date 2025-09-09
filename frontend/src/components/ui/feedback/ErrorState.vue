<template>
  <div :class="containerClass">
    <div class="card max-w-md mx-auto hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300">
      <svg :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
      </svg>
      <h3 class="text-lg font-semibold text-white mb-2">{{ title || errorData.title }}</h3>
      <p class="text-gray-400 mb-4">{{ message || errorData.description }}</p>
      <button 
        v-if="showRetryButton"
        @click="$emit('retry')" 
        class="btn-primary hover:scale-105 transition-transform duration-300"
      >
        {{ retryText }}
      </button>
      <slot v-else name="action"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ErrorStateData } from '../../../types/UI'
import { ERROR_STATE_PRESETS } from '../../../data/ui'

interface Props {
  title?: string
  message?: string
  fullScreen?: boolean
  showRetryButton?: boolean
  retryText?: string
  errorType?: 'error' | 'warning' | 'not-found'
  errorData?: ErrorStateData
}

const props = withDefaults(defineProps<Props>(), {
  fullScreen: false,
  showRetryButton: true,
  retryText: 'Try Again',
  errorType: 'error',
  errorData: () => ERROR_STATE_PRESETS.serverError
})

defineEmits<{
  retry: []
}>()

const containerClass = computed(() => {
  return props.fullScreen 
    ? 'min-h-screen bg-gray-900 flex items-center justify-center'
    : 'text-center py-12'
})

const iconClass = computed(() => {
  const baseClass = 'w-12 h-12 mx-auto mb-4'
  const colorClass = props.errorType === 'error' ? 'text-red-400' : 
                    props.errorType === 'warning' ? 'text-yellow-400' : 
                    'text-gray-500'
  return `${baseClass} ${colorClass}`
})

const iconPath = computed(() => {
  switch (props.errorType) {
    case 'error':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z'
    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z'
    case 'not-found':
      return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    default:
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z'
  }
})

defineOptions({
  name: 'ErrorState'
})
</script>

<style scoped>
/* Card hover effects */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
