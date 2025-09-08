<template>
  <div class="text-center mt-12">
    <button 
      @click="navigation.goToNextSection"
      class="inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 hover:scale-125 group relative z-30 animate-bounce"
      aria-label="Scroll to next section"
    >
      <svg 
        class="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// Inject the navigation object from the parent
const navigation = inject('navigation', {
  goToNextSection: () => console.warn('Navigation not provided')
})
</script>
