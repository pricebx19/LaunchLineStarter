<template>
  <section class="relative h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 overflow-hidden flex items-center justify-center">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          LaunchLine by the Numbers
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Real results that speak for themselves
        </p>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.id" 
             class="stat-card text-center cursor-pointer">
          <div class="relative">
            <div class="stat-icon w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm flex items-center justify-center hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-500">
              <div class="w-10 h-10 text-blue-400 hover:text-blue-300 transition-colors" v-html="stat.icon"></div>
            </div>
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-600/0 rounded-2xl blur opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div class="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-blue-300 transition-colors relative">
            <span class="stat-number counter" :data-target="stat.value">0</span>{{ stat.suffix }}
            <!-- Animated highlight effect -->
            <div class="highlight-effect absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-purple-500/0 opacity-0 rounded-lg"></div>
          </div>
          <p class="text-gray-400 text-sm font-medium">{{ stat.label }}</p>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="text-center mt-12">
        <button 
          @click="navigateToNext"
          class="inline-flex items-center justify-center w-12 h-12 bg-gray-800/80 hover:bg-brand-primary/90 border border-gray-700 hover:border-brand-primary rounded-full transition-all duration-300 hover:scale-110 group"
          aria-label="Go to next section"
        >
          <svg 
            class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" 
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
// import { scrollToNextSection as scrollToNext } from '../../../lib/scroll'
import { statistics as defaultStatistics, type Stat } from '../../../data/componentData'

// Export the component for use in other files
defineOptions({
  name: 'Statistics'
})

// Make the component available for import
defineExpose({})

// Inject navigation function from parent
interface ParentNavigation {
  goToNextSection: () => void
  goToPreviousSection: () => void
  goToSection: (sectionId: string) => void
}

const parentNavigation = inject<ParentNavigation | null>('navigation', null)

// Remove duplicate interface - using the one from componentData
const stats = ref<Stat[]>(defaultStatistics)

// Animated counter functionality
onMounted(() => {
  const counters = document.querySelectorAll('.counter')
  
  const animateCounter = (counter: Element) => {
    const target = parseInt(counter.getAttribute('data-target') || '0')
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0
    
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current).toString()
    }, 16)
  }
  
  // Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })
  
  counters.forEach(counter => observer.observe(counter))
})

// Scroll to next section
// const _scrollToNextSection = () => {
//   scrollToNext('testimonials')
// }

// Navigate to next section using parent navigation
const navigateToNext = () => {
  if (parentNavigation?.goToNextSection) {
    parentNavigation.goToNextSection()
  }
}
</script>

<style scoped>
/* Enhanced hover effects */
.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-card:hover .stat-number {
  transform: scale(1.1);
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.stat-card:hover .highlight-effect {
  opacity: 1;
  transition: opacity 0.5s ease;
}

/* Enhanced counter animations */
.counter {
  display: inline-block;
  transition: transform 0.3s ease;
}

/* Performance optimizations */
.stat-card,
.stat-icon {
  will-change: transform;
  transform: translateZ(0);
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .stat-card:hover {
    transform: none;
  }
  
  .stat-card:hover .stat-icon,
  .stat-card:hover .stat-number {
    transform: none;
  }
}
</style>
