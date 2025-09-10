<template>
  <section id="hero" :class="{ 'active': isActive }" class="hero-section relative">
    <div class="w-full h-full bg-gradient-to-br from-gray-900 via-black to-black relative overflow-hidden flex items-center justify-center">
      <!-- Animated Starry Background -->
      <div class="stars-container absolute inset-0">
        <!-- Large stars -->
        <div class="star star-large" v-for="i in 20" :key="`large-${i}`" :style="getStarStyle(i, 'large')"></div>
        <!-- Medium stars -->
        <div class="star star-medium" v-for="i in 40" :key="`medium-${i}`" :style="getStarStyle(i, 'medium')"></div>
        <!-- Small stars -->
        <div class="star star-small" v-for="i in 60" :key="`small-${i}`" :style="getStarStyle(i, 'small')"></div>
        <!-- Shooting stars -->
        <div class="shooting-star" v-for="i in 3" :key="`shooting-${i}`" :style="getShootingStarStyle(i)"></div>
      </div>

      <!-- Content -->
      <div class="text-center text-white relative z-10">
        <h1 class="text-6xl font-bold mb-6 text-shadow-lg">
          <span class="text-brand-primary">{{ subtitle || 'Your brand. Your website. Done right.' }}</span>
        </h1>
        <p class="text-2xl mb-8 max-w-3xl mx-auto text-shadow-lg text-gray-300">{{ description || 'Professional websites that launch your business into the digital stratosphere.' }}</p>
        <div class="flex gap-4 justify-center mb-12">
          <router-link 
            :to="ctaLink || '/contact'" 
            class="bg-brand-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {{ ctaText || 'Get Started Today' }}
          </router-link>
          <router-link 
            to="/about" 
            class="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Learn More
          </router-link>
        </div>
        
        <NavigationDownButton />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { HeroProps } from '../../../types'

// Use dynamic imports for navigation components
const NavigationDownButton = defineAsyncComponent(() => import('../../ui/navigation/NavigationDownButton.vue'))

// Inject navigation function from parent
// const parentNavigation = inject<ParentNavigation | null>('navigation', null)

interface Props extends HeroProps {}

defineProps<Props>();

// Generate random star positions
const getStarStyle = (_index: number, _size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Generate shooting star positions
const getShootingStarStyle = (_index: number) => {
  const startX = Math.random() * 100
  const startY = Math.random() * 50
  const delay = Math.random() * 8
  
  return {
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`
  }
}

// Navigate to next section using parent navigation
// const scrollToNextSection = () => {
//   console.log('Scroll button clicked!')
//   console.log('parentNavigation:', parentNavigation)
//   
//   if (parentNavigation?.goToNextSection) {
//     console.log('Calling goToNextSection')
//     parentNavigation.goToNextSection()
//   } else {
//     console.log('No parent navigation, using fallback scroll')
//     // Fallback: scroll to next section manually
//     const nextSection = document.getElementById('features')
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: 'smooth' })
//     }
//   }
// }
</script>

<style scoped>
/* Hero Section Styles */
section {
  /* Each section takes the full viewport height */
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden; /* Prevent content from spilling over */
  margin-bottom: 0;
  
  /* Position sections absolutely to overlay each other */
  position: absolute;
  top: 0; /* Start at top of viewport, navbar will overlay */
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Hide all sections by default */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  pointer-events: none; /* Prevent interaction with hidden sections */
}

/* Show only the active section */
section.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 20;
  /* Ensure text selection works on active sections */
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

/* Hide all sections by default */
section:not(.active) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Ensure hero section is visible by default */
#hero {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 10;
  height: 100vh;
  min-height: 100vh;
  /* Ensure text selection works on hero section */
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

/* Force hide hero section when not active */
#hero:not(.active) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-large {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
}

.star-medium {
  width: 2px;
  height: 2px;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.6);
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Shooting Star */
.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, white, transparent);
  border-radius: 50%;
  animation: shooting-star 8s linear infinite;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, white, transparent);
  transform: translateX(-100px);
}

/* Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes shooting-star {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
    transform: translateX(100px) translateY(100px) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translateX(200px) translateY(200px) rotate(45deg);
  }
}

/* Text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Backdrop blur for modern browsers */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>