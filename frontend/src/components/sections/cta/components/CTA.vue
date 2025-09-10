<template>
  <component 
    :is="variant === 'full' ? 'section' : 'div'"
    :class="[
      'relative overflow-hidden',
      variant === 'full' ? 'h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center' : 'py-10 bg-gradient-to-br from-gray-900 to-black',
      containerClass
    ]"
  >
    <!-- Background effects -->
    <div v-if="showEffects" class="absolute inset-0">
      <!-- Starry background for full variant -->
      <div v-if="variant === 'full'" class="stars-container absolute inset-0 opacity-20">
        <div class="star star-small" v-for="i in 15" :key="`cta-${i}`" :style="getStarStyle(i, 'small')"></div>
      </div>
      
      <!-- Meteor shower for section variant -->
      <div v-if="variant === 'section'" class="meteor-container absolute inset-0 pointer-events-none">
        <div class="meteor" v-for="i in 8" :key="`meteor-${i}`" :style="getMeteorStyle(i)"></div>
        <div class="twinkle-star" v-for="i in 20" :key="`twinkle-${i}`" :style="getTwinkleStyle(i)"></div>
        <div class="shooting-star" v-for="i in 5" :key="`shooting-${i}`" :style="getShootingStyle(i)"></div>
      </div>
      
      <!-- Simple stars for other variants -->
      <div v-if="variant === 'simple'" class="stars-container absolute inset-0 opacity-20">
        <div class="star star-small" v-for="i in 15" :key="`simple-${i}`" :style="getStarStyle(i, 'small')"></div>
      </div>
      
      <!-- Decorative gradients -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
    </div>

    <div :class="[
      'relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center',
      variant === 'full' ? 'max-w-4xl flex flex-col items-center justify-center h-full' : 'max-w-4xl'
    ]">
      <!-- Navigation buttons for home page variants at the top -->
      <div v-if="(variant === 'full' || variant === 'section') && showNavigation" class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
        <NavigationUpButton />
      </div>
      
      <h2 :class="[
        'font-bold text-white mb-6 leading-tight',
        variant === 'full' ? 'text-3xl md:text-5xl' : variant === 'section' ? 'text-6xl text-brand-primary' : 'text-4xl md:text-6xl'
      ]">
        {{ title }}
      </h2>
      
      <p :class="[
        'mb-8 leading-relaxed max-w-3xl mx-auto',
        variant === 'full' ? 'text-xl md:text-2xl text-gray-300' : variant === 'section' ? 'text-2xl text-gray-300' : 'text-xl md:text-2xl text-white/90'
      ]">
        {{ subtitle }}
      </p>

      <!-- Statistics (for full variant) -->
      <div 
        v-if="variant === 'full' && showStats && stats && stats.length > 0" 
        class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
      >
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="text-center"
        >
          <div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
            {{ stat.value }}
          </div>
          <div class="text-gray-400 text-sm uppercase tracking-wider">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Feature highlights (for section variant) -->
      <div v-if="variant === 'section' && features && features.length > 0" class="grid md:grid-cols-3 gap-8 text-center mb-12">
        <div v-for="feature in features" :key="feature.title" class="group">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/30 transition-all duration-300">
            <span class="text-2xl">{{ feature.icon }}</span>
          </div>
          <h3 class="text-lg font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <router-link
          :to="primaryCtaLink || '/'"
          :class="[
            'text-lg px-8 py-4 inline-block transform hover:scale-105 transition-transform duration-200 font-bold rounded-lg',
            variant === 'section' 
              ? 'bg-brand-primary hover:bg-blue-600 text-white shadow-lg hover:shadow-xl' 
              : 'btn-primary'
          ]"
        >
          {{ primaryCtaText }}
        </router-link>
        
        <router-link
          v-if="secondaryCtaText"
          :to="secondaryCtaLink || '/'"
          :class="[
            'text-lg px-8 py-4 inline-block font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105',
            variant === 'section' 
              ? 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white' 
              : 'btn-secondary'
          ]"
        >
          {{ secondaryCtaText }}
        </router-link>
      </div>

      <!-- Additional info -->
      <div v-if="additionalInfo" class="text-gray-400 text-sm">
        <p>{{ additionalInfo }}</p>
      </div>
      
      <!-- Navigation buttons for home page variants -->
      <div v-if="showNavigation" class="flex gap-4 mt-12 justify-center">
        <NavigationDownButton v-if="variant === 'full'" />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { ctaFeatures, ctaStats } from '../../../../data/componentData'
import type { CTAProps } from '../../../../types'

// Use dynamic imports for navigation components
const NavigationUpButton = defineAsyncComponent(() => import('../../../ui/navigation/NavigationUpButton.vue'))
const NavigationDownButton = defineAsyncComponent(() => import('../../../ui/navigation/NavigationDownButton.vue'))

interface Props extends CTAProps {}

withDefaults(defineProps<Props>(), {
  variant: 'simple',
  title: 'Ready to Launch Your Success?',
  subtitle: 'Join the growing list of businesses who\'ve transformed their online presence with LaunchLine. Your next big launch starts here.',
  primaryCtaText: 'Start Your Launch',
  primaryCtaLink: '/contact',
  secondaryCtaText: 'View Services',
  secondaryCtaLink: '/services',
  additionalInfo: 'No commitment required • Free consultation • Launch in 2-8 weeks',
  showStats: false,
  stats: () => ctaStats,
  features: () => ctaFeatures,
  showEffects: true,
  showNavigation: false,
  containerClass: ''
})

// Generate star styles
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

// Generate meteor styles
const getMeteorStyle = (index: number) => {
  const startX = 100 + (index * 15)
  const startY = index * 10
  const delay = index * 0.5
  
  return {
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`
  }
}

const getTwinkleStyle = (_index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const size = Math.random() * 3 + 1
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}

const getShootingStyle = (_index: number) => {
  const startX = Math.random() * 100
  const startY = Math.random() * 50
  const delay = Math.random() * 4
  
  return {
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
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

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Meteor Shower Background Styles */
.meteor-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  animation: meteor-fall 3s linear infinite;
}

.twinkle-star {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  border-radius: 50%;
  animation: twinkle-fade 2s ease-in-out infinite;
}

.shooting-star {
  position: absolute;
  width: 3px;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  animation: shooting-trail 2s linear infinite;
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

@keyframes meteor-fall {
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-200px) translateY(200px) rotate(45deg);
    opacity: 0;
  }
}

@keyframes twinkle-fade {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

@keyframes shooting-trail {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-150px) translateY(100px);
    opacity: 0;
  }
}

/* Button styles */
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.4);
}

.btn-secondary:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(148, 163, 184, 0.3);
}
</style>