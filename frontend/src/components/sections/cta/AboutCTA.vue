<template>
  <section class="py-8 bg-gradient-to-br from-brand-primary via-blue-600 to-purple-600 relative overflow-hidden">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    
    <!-- Floating elements -->
    <div class="absolute inset-0">
      <div class="cta-float-1"></div>
      <div class="cta-float-2"></div>
      <div class="cta-float-3"></div>
    </div>
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <!-- CTA Badge -->
      <div class="mb-6">
        <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium border border-white/30 backdrop-blur-sm">
          {{ badge }}
        </span>
      </div>
      
      <!-- Main CTA -->
      <h2 class="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
        {{ title }}
      </h2>
      
      <p class="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
        {{ description }}
      </p>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <router-link 
          :to="primaryButton.link"
          class="cta-button primary group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="primaryButton.iconPath"/>
          </svg>
          {{ primaryButton.text }}
          <svg class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </router-link>
        
        <router-link 
          :to="secondaryButton.link"
          class="cta-button secondary group"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="secondaryButton.iconPath"/>
          </svg>
          {{ secondaryButton.text }}
        </router-link>
      </div>
      
      <!-- Trust indicators -->
      <div class="mt-12 pt-8 border-t border-white/20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div 
            v-for="(indicator, index) in trustIndicators" 
            :key="indicator.label"
            class="trust-indicator"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <div class="trust-value">{{ indicator.value }}</div>
            <div class="trust-label">{{ indicator.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CTAButton {
  text: string
  link: string
  iconPath: string
}

interface TrustIndicator {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  badge?: string
  title?: string
  description?: string
  primaryCTA?: CTAButton
  secondaryCTA?: CTAButton
  trust?: TrustIndicator[]
}>(), {
  badge: 'Ready to Launch?',
  title: 'Let\'s Build Something Amazing Together',
  description: 'Join hundreds of successful businesses that have transformed their digital presence with LaunchLine. Your journey to digital excellence starts here.'
})

const primaryButton = computed(() => props.primaryCTA || {
  text: 'Start Your Project',
  link: '/contact',
  iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
})

const secondaryButton = computed(() => props.secondaryCTA || {
  text: 'View Our Work',
  link: '/portfolio',
  iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
})

const trustIndicators = computed(() => props.trust || [
  { value: '150+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '48hrs', label: 'Response Time' }
])
</script>

<style scoped>
.cta-button {
  @apply inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl;
}

.cta-button.primary {
  @apply bg-white text-brand-primary hover:bg-gray-100 hover:shadow-white/20;
}

.cta-button.secondary {
  @apply bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white;
}

.trust-indicator {
  @apply opacity-0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.trust-value {
  @apply text-2xl md:text-3xl font-bold text-white mb-2;
}

.trust-label {
  @apply text-white/80 text-sm uppercase tracking-wider;
}

.cta-float-1,
.cta-float-2,
.cta-float-3 {
  @apply absolute w-32 h-32 bg-white/10 rounded-full blur-xl;
}

.cta-float-1 {
  top: 20%;
  left: 10%;
  animation: float 8s ease-in-out infinite;
}

.cta-float-2 {
  top: 60%;
  right: 15%;
  animation: float 8s ease-in-out infinite 2s;
}

.cta-float-3 {
  bottom: 20%;
  left: 20%;
  animation: float 8s ease-in-out infinite 4s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
</style>
