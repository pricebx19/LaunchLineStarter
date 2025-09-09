<template>
  <transition name="fade">
    <button 
      v-if="show"
      @click="scrollToTop"
      class="back-to-top-button"
      aria-label="Back to top"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import type { AnimationProps } from '../../types/Common'
import { scrollToTop } from '../../utils/helpers'

interface Props extends AnimationProps {
  show: boolean
  threshold?: number
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

withDefaults(defineProps<Props>(), {
  threshold: 300,
  position: 'bottom-right'
})

defineOptions({
  name: 'BackToTopButton'
})
</script>

<style scoped>
.back-to-top-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 30;
  background: #3b82f6;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.back-to-top-button:hover {
  background: #2563eb;
  transform: scale(1.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .back-to-top-button:hover {
    transform: none !important;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: none !important;
  }
}

/* Focus indicators */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
