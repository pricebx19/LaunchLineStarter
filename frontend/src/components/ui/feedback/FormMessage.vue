<template>
  <div v-if="show" :class="containerClass">
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" :class="iconClass" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" :d="iconPath" clip-rule="evenodd"/>
      </svg>
      <span :class="textClass">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: true
})

const containerClass = computed(() => {
  const baseClass = 'rounded-lg p-4'
  const typeClass = {
    success: 'bg-green-900/20 border border-green-500/50',
    error: 'bg-red-900/20 border border-red-500/50',
    warning: 'bg-yellow-900/20 border border-yellow-500/50',
    info: 'bg-blue-900/20 border border-blue-500/50'
  }
  return `${baseClass} ${typeClass[props.type]}`
})

const iconClass = computed(() => {
  return {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }[props.type]
})

const textClass = computed(() => {
  const baseClass = 'font-medium'
  const typeClass = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }
  return `${baseClass} ${typeClass[props.type]}`
})

const iconPath = computed(() => {
  switch (props.type) {
    case 'success':
      return 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
    case 'error':
      return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
    case 'warning':
      return 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
    case 'info':
      return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
})

defineOptions({
  name: 'FormMessage'
})
</script>

<style scoped>
/* Message animations could be added here */
</style>
