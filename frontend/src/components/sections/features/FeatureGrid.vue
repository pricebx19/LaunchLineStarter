<template>
  <section class="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <!-- Floating particles - optimized -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 12" :key="i" 
           class="particle absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
           :style="{
             left: (i * 8.33) + '%',
             top: (i * 8.33) + '%',
             animationDelay: (i * 0.2) + 's',
             animationDuration: '4s'
           }">
      </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
      <!-- Cosmic Dust Background -->
      <div class="cosmic-dust-container absolute inset-0 pointer-events-none">
        <!-- Floating cosmic particles -->
        <div class="cosmic-particle" v-for="i in 40" :key="`particle-${i}`" :style="getCosmicStyle(i)"></div>
        
        <!-- Energy orbs -->
        <div class="energy-orb" v-for="i in 6" :key="`orb-${i}`" :style="getEnergyOrbStyle(i)"></div>
        
        <!-- Stardust trails -->
        <div class="stardust-trail" v-for="i in 12" :key="`trail-${i}`" :style="getStardustStyle(i)"></div>
      </div>
      
              <!-- Navigation Up Button -->
        <div class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <NavigationUpButton />
        </div>
        
        <!-- Enhanced Header Section -->
        <SectionHeader
          :title="title || 'Why'"
          highlighted-text="LaunchLine?"
          :description="subtitle || 'We combine cutting-edge technology with proven strategies to deliver exceptional results for your business.'"
          size="large"
          margin-class="mb-12"
          title-class="main-title text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-100"
        />

      <!-- Enhanced Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.id"
          class="feature-card relative cursor-pointer group"
          :style="{ animationDelay: index * 100 + 'ms' }"
        >
          <!-- Card Container -->
          <div class="relative h-full p-6 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/20 backdrop-blur-sm hover:border-blue-500/40 hover:bg-gray-800/60 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2">
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-600/0 to-cyan-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <!-- Animated border gradient -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-600/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-cyan-500/20 blur-sm"></div>
            </div>
            
            <!-- Icon Container - No box, just the icon -->
            <div class="icon-container relative z-10 w-16 h-16 mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
              <div class="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition-all duration-500 flex items-center justify-center overflow-hidden" v-html="getFeatureIcon(feature.icon || 'strategy')"></div>
            </div>
            
            <!-- Content -->
            <div class="relative z-10 text-center">
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {{ feature.title }}
              </h3>
              
              <!-- Description with improved typography -->
              <p class="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
                {{ feature.description }}
              </p>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Subtle accent line -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-1/2 transition-all duration-700"></div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Down Button -->
      <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <NavigationDownButton />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, defineAsyncComponent } from 'vue'
import { features as defaultFeatures } from '../../../data/componentData'
import type { FeatureGridProps, Feature } from '../../../types'

interface Props extends FeatureGridProps {}

const props = withDefaults(defineProps<Props>(), {
  features: () => defaultFeatures
})

// Use dynamic imports for navigation components
const NavigationUpButton = defineAsyncComponent(() => import('../../ui/navigation/NavigationUpButton.vue'))
const NavigationDownButton = defineAsyncComponent(() => import('../../ui/navigation/NavigationDownButton.vue'))
const SectionHeader = defineAsyncComponent(() => import('../../ui/layout/SectionHeader.vue'))

// Generate cosmic dust styles
const getCosmicStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 4
  const size = Math.random() * 2 + 1
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}

const getEnergyOrbStyle = (index: number) => {
  const positions = [
    { x: 15, y: 25, color: 'rgba(59, 130, 246, 0.4)' },
    { x: 85, y: 30, color: 'rgba(147, 51, 234, 0.4)' },
    { x: 25, y: 75, color: 'rgba(236, 72, 153, 0.4)' },
    { x: 75, y: 70, color: 'rgba(34, 211, 238, 0.4)' },
    { x: 50, y: 20, color: 'rgba(16, 185, 129, 0.4)' },
    { x: 50, y: 80, color: 'rgba(245, 158, 11, 0.4)' }
  ]
  
  const orb = positions[index - 1] || positions[0]
  const delay = index * 0.5
  
  return {
    left: `${orb.x}%`,
    top: `${orb.y}%`,
    backgroundColor: orb.color,
    animationDelay: `${delay}s`
  }
}

const getStardustStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const length = Math.random() * 50 + 20
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${length}px`,
    animationDelay: `${delay}s`
  }
}

// Icon mapping - enhanced with better SVG icons and proper sizing
const iconMap: Record<string, string> = {
  strategy: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>',
  technology: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
  analytics: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>',
  brand: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/></svg>',
  support: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"/></svg>',
  growth: '<svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg>'
}

const getFeatureIcon = (iconName: string): string => {
  return iconMap[iconName] || iconMap.strategy
}




</script>

<style scoped>
/* Floating animation for particles - optimized */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) translateX(8px);
    opacity: 0.6;
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
  will-change: transform, opacity;
}

/* Particle hover effect - simplified */
.particle:hover {
  opacity: 0.8;
  transform: scale(1.2);
}

/* Enhanced hover effects - completely fixed */
.feature-card {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: scale(1.05) translateY(-8px);
}

/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Gradient text animation */
.text-transparent {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Animated underline effect - fixed conflicts */
.main-title:hover .animated-underline {
  width: 100% !important;
}

/* Enhanced header animations - fixed conflicts */
@keyframes header-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    text-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

/* Cosmic Dust Background Styles */
.cosmic-dust-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cosmic-particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  animation: cosmic-float 6s ease-in-out infinite;
}

@keyframes cosmic-float {
  0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.8; }
}

.energy-orb {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  filter: blur(20px);
  animation: orb-pulse 4s ease-in-out infinite;
}

@keyframes orb-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

.stardust-trail {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent);
  animation: trail-fade 3s ease-in-out infinite;
}

@keyframes trail-fade {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.4; }
}

.main-title:hover {
  animation: header-glow 2s ease-in-out infinite;
}

/* Enhanced card animations - improved design */
.feature-card:hover .icon-container {
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

/* Icon sizing and positioning fixes */
.icon-container svg {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.icon-container > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Statistics section enhancements - completely fixed */
.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

/* Individual stat animations - no conflicts */
.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.stat-card:hover .stat-number {
  transform: scale(1.1);
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

/* Statistics highlight effects - completely fixed */
.stat-card:hover .highlight-effect {
  opacity: 1;
  transition: opacity 0.5s ease;
}

/* Enhanced counter animations - completely fixed */
.counter {
  display: inline-block;
  transition: transform 0.3s ease;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-7xl {
    font-size: 3.5rem;
  }
  
  .py-24 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .mb-20 {
    margin-bottom: 3rem;
  }
}

/* Smooth transitions for interactive elements only */
.feature-card,
.stat-card,
.icon-container,
.counter,
.animated-underline {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus states for accessibility */
button:focus-visible,
.group:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Performance optimizations */
.feature-card,
.stat-card,
.icon-container {
  will-change: transform;
  transform: translateZ(0);
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .feature-card:hover,
  .stat-card:hover {
    animation: none;
    transform: none;
  }
  
  .particle {
    animation: none;
  }
}
</style>