<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Dynamic Background -->
    <StarryBackground 
      :large-count="25"
      :medium-count="40" 
      :small-count="60"
      :shooting-count="3"
      :opacity="0.8"
    />
    
    <!-- Parallax Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-transparent"></div>
    
    <!-- Floating Geometric Shapes -->
    <FloatingShapes />
    
    <!-- Hero Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <HeroTitle />
      
      <!-- Stats Counter -->
      <StatsCounter :stats="stats" />
    </div>
    
    <!-- Scroll Indicator -->
    <ScrollIndicator />
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, nextTick } from 'vue'

const StarryBackground = defineAsyncComponent(() => import('../../effects/StarryBackground.vue'))
const FloatingShapes = defineAsyncComponent(() => import('../../effects/FloatingShapes.vue'))
const HeroTitle = defineAsyncComponent(() => import('./HeroTitle.vue'))
const StatsCounter = defineAsyncComponent(() => import('../../ui/display/StatsCounter.vue'))
const ScrollIndicator = defineAsyncComponent(() => import('../../ui/navigation/ScrollIndicator.vue'))

interface Stat {
  value: string
  label: string
}

defineProps<{
  stats: Stat[]
}>()

onMounted(() => {
  // Add scroll animations
  nextTick(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)
    
    document.querySelectorAll('.hero-entrance, .stat-counter').forEach((el) => {
      observer.observe(el)
    })
  })
})
</script>

<style scoped>
/* Main container styles only - component-specific styles moved to individual components */
</style>
