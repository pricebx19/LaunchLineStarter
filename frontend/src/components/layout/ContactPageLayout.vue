<template>
  <div class="contact-page min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30">
      <StarryBackground 
        :small-count="50"
        :medium-count="15"
        :large-count="8"
        :show-shooting="true"
        :opacity="0.6"
      />
      
      <!-- Floating geometric shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const StarryBackground = defineAsyncComponent(() => import('../effects/StarryBackground.vue'))
</script>

<style scoped>
/* Floating Shapes */
.floating-shape {
  @apply absolute w-32 h-32 border border-white/10 rounded-full;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  @apply top-20 left-20;
  animation-delay: 0s;
}

.shape-2 {
  @apply top-40 right-20;
  animation-delay: 2s;
}

.shape-3 {
  @apply bottom-40 left-40;
  animation-delay: 4s;
}

.shape-4 {
  @apply bottom-20 right-40;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>
