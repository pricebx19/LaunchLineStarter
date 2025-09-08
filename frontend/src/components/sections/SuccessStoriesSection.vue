<template>
  <section class="py-12 bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950 relative overflow-hidden">
    <!-- Simple background -->
    <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-purple-600/5"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Minimal Header -->
      <div class="text-center mb-8">
        <div class="mb-3">
          <span class="inline-block px-3 py-1.5 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full text-green-400 text-xs font-medium border border-green-400/30 backdrop-blur-sm">
            Success Stories
          </span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight tracking-normal">
          Real <span class="text-gradient bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Results</span>
        </h2>
        <p class="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          See how our websites have transformed businesses and driven growth.
        </p>
      </div>
      
      <!-- Compact Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <EnhancedCaseStudyCard 
          v-for="(caseStudy, index) in caseStudies" 
          :key="caseStudy.id"
          :case-study="caseStudy"
          :index="index"
          class="transform hover:scale-102 transition-all duration-300 text-sm"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const EnhancedCaseStudyCard = defineAsyncComponent(() => import('../content/portfolio/cards/EnhancedCaseStudyCard.vue'))

interface CaseStudy {
  id: number
  title: string
  business: string
  icon: string
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  description: string
  package: string
  timeline: string
  testimonial?: string
  client?: string
}

defineProps<{
  caseStudies: CaseStudy[]
}>()
</script>

<style scoped>
/* Text gradient effects */
.text-gradient {
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 3s ease infinite;
}

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

/* Glassmorphism Effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Enhanced hover effects */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Staggered animation for cards */
.grid > :nth-child(1) {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.grid > :nth-child(2) {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.grid > :nth-child(3) {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
