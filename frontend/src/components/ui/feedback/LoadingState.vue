<template>
  <div :class="containerClass">
    <div class="inline-flex items-center">
      <svg class="animate-spin h-8 w-8 text-brand-primary mr-3" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-gray-400">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingStateData } from '../../../types/UI'
import { LOADING_STATE_PRESETS } from '../../../data/ui'

interface Props {
  message?: string
  fullScreen?: boolean
  loadingData?: LoadingStateData
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  fullScreen: false,
  loadingData: () => LOADING_STATE_PRESETS.default
})

const containerClass = computed(() => {
  return props.fullScreen 
    ? 'min-h-screen bg-gray-900 flex items-center justify-center'
    : 'text-center py-12'
})

defineOptions({
  name: 'LoadingState'
})
</script>
