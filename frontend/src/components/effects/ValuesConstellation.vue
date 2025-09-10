<template>
  <section class="py-8 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Constellation Background -->
    <div class="constellation-container absolute inset-0">
      <svg class="constellation-svg" viewBox="0 0 1200 800" fill="none">
        <!-- Constellation lines -->
        <g class="constellation-lines" stroke="#3b82f6" stroke-width="1" opacity="0.3">
          <line v-for="line in constellationLines" :key="line.id" 
                :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" 
                class="constellation-line" 
                :style="{ animationDelay: `${line.delay}s` }" />
        </g>
        <!-- Constellation stars -->
        <g class="constellation-stars">
          <circle v-for="star in constellationStars" :key="star.id"
                  :cx="star.x" :cy="star.y" :r="star.size" 
                  fill="#3b82f6" class="constellation-star"
                  :style="{ animationDelay: `${star.delay}s` }" />
        </g>
      </svg>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">✨ {{ badgeText }}</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {{ description }}
        </p>
      </div>
      
      <!-- Values Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(value, index) in values" 
          :key="value.title"
          class="value-card group"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <!-- Value Icon -->
          <div class="value-icon-wrapper">
            <div class="value-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.iconPath || ''"></path>
              </svg>
            </div>
            <div class="value-glow"></div>
          </div>
          
          <!-- Value Content -->
          <div class="value-content">
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
              {{ value.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ value.description }}
            </p>
          </div>
          
          <!-- Floating elements -->
          <div class="value-float-1"></div>
          <div class="value-float-2"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Value, ConstellationLine, ConstellationStar } from '../../types'

const props = withDefaults(defineProps<{
  badgeText?: string
  title?: string
  description?: string
  valuesData?: Value[]
}>(), {
  badgeText: 'OUR VALUES',
  title: 'Our Values Constellation',
  description: 'The guiding principles that navigate every project we launch into the digital universe.'
})

const values = computed(() => props.valuesData || [
  {
    title: 'Excellence First',
    description: 'We deliver nothing short of exceptional. Every line of code, every design element, every user interaction is crafted with meticulous attention to detail.',
    iconPath: 'M5 3l1.5 2L10 3v2.5L8.5 7 10 8.5V11l-3.5-2L5 11V8.5L6.5 7 5 5.5V3z'
  },
  {
    title: 'Innovation Driven',
    description: 'We stay at the forefront of technology, constantly exploring new possibilities to give your business a competitive edge in the digital landscape.',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Client-Centric',
    description: 'Your success is our success. We listen, understand, and tailor every solution to meet your unique business needs and goals.',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    title: 'Transparent Process',
    description: 'No black boxes here. We keep you informed every step of the way, ensuring clear communication and full visibility into your project\'s progress.',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Future-Ready',
    description: 'We build for tomorrow, not just today. Our solutions are scalable, sustainable, and designed to grow with your business for years to come.',
    iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707'
  },
  {
    title: 'Continuous Growth',
    description: 'We believe in constant improvement. We learn, adapt, and evolve with every project, bringing fresh insights and enhanced expertise to your team.',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  }
])

const constellationLines = computed((): ConstellationLine[] => [
  { id: 'line1', x1: 200, y1: 150, x2: 400, y2: 200, delay: 0 },
  { id: 'line2', x1: 400, y1: 200, x2: 600, y2: 150, delay: 0.5 },
  { id: 'line3', x1: 600, y1: 150, x2: 800, y2: 250, delay: 1 },
  { id: 'line4', x1: 300, y1: 400, x2: 500, y2: 350, delay: 1.5 },
  { id: 'line5', x1: 500, y1: 350, x2: 700, y2: 400, delay: 2 },
  { id: 'line6', x1: 150, y1: 600, x2: 350, y2: 550, delay: 2.5 },
  { id: 'line7', x1: 350, y1: 550, x2: 550, y2: 600, delay: 3 },
  { id: 'line8', x1: 550, y1: 600, x2: 750, y2: 550, delay: 3.5 },
])

const constellationStars = computed((): ConstellationStar[] => [
  { id: 'star1', x: 200, y: 150, size: 3, delay: 0 },
  { id: 'star2', x: 400, y: 200, size: 4, delay: 0.2 },
  { id: 'star3', x: 600, y: 150, size: 3, delay: 0.4 },
  { id: 'star4', x: 800, y: 250, size: 5, delay: 0.6 },
  { id: 'star5', x: 300, y: 400, size: 3, delay: 0.8 },
  { id: 'star6', x: 500, y: 350, size: 4, delay: 1 },
  { id: 'star7', x: 700, y: 400, size: 3, delay: 1.2 },
  { id: 'star8', x: 150, y: 600, size: 4, delay: 1.4 },
  { id: 'star9', x: 350, y: 550, size: 3, delay: 1.6 },
  { id: 'star10', x: 550, y: 600, size: 5, delay: 1.8 },
  { id: 'star11', x: 750, y: 550, size: 3, delay: 2 },
])
</script>

<style scoped>
.constellation-container {
  opacity: 0.6;
}

.constellation-svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.constellation-line {
  stroke-dasharray: 5 5;
  animation: dash 4s ease-in-out infinite;
}

.constellation-star {
  animation: twinkle 3s ease-in-out infinite;
}

.value-card {
  @apply bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl p-6 border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-brand-primary/10 relative overflow-hidden;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.value-icon-wrapper {
  @apply relative mb-6 flex justify-center;
}

.value-icon {
  @apply w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-primary relative z-10;
}

.value-glow {
  @apply absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-blue-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500;
}

.value-content {
  @apply text-center;
}

.value-float-1,
.value-float-2 {
  @apply absolute w-2 h-2 bg-brand-primary/30 rounded-full;
}

.value-float-1 {
  top: 20%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
}

.value-float-2 {
  bottom: 20%;
  left: 15%;
  animation: float 6s ease-in-out infinite 3s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dash {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 20; }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
</style>
