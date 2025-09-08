<template>
  <div class="text-center mb-8">
    <button 
      @click="navigation.goToPreviousSection"
      class="inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 hover:scale-125 group animate-bounce"
      aria-label="Go to previous section"
    >
      <svg class="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v14" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// Inject the navigation object from the parent
const navigation = inject('navigation', {
  goToPreviousSection: () => console.warn('Navigation not provided')
})
</script>
