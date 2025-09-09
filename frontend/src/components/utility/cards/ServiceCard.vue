<template>
  <div 
    class="service-card relative group cursor-pointer overflow-hidden"
    @click="$emit('select', service)"
  >
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/98 rounded-2xl"></div>
    
    <!-- Animated border glow -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/20 via-blue-500/10 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    <div class="absolute inset-[1px] bg-gradient-to-br from-gray-800 via-gray-800/98 to-gray-900 rounded-2xl"></div>
    
    <!-- Floating particles effect -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div class="floating-particle absolute top-4 right-4 w-1 h-1 bg-brand-primary rounded-full animate-float-1"></div>
      <div class="floating-particle absolute top-12 right-8 w-0.5 h-0.5 bg-blue-400 rounded-full animate-float-2"></div>
      <div class="floating-particle absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-float-3"></div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-10 h-full p-8 flex flex-col">
      <!-- Icon section with enhanced animations -->
      <div class="mb-8 relative">
        <div class="icon-container w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-500">
          <!-- Icon glow effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-blue-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
          <div v-html="service.icon" class="w-8 h-8 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300"></div>
          
          <!-- Rotating ring effect -->
          <div class="absolute inset-0 border-2 border-transparent group-hover:border-brand-primary/30 rounded-2xl animate-slow-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
      
      <!-- Title with shimmer effect -->
      <h3 class="text-2xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:via-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 relative">
        {{ service.title }}
        <!-- Shimmer overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
      </h3>
      
      <!-- Description with enhanced readability -->
      <p class="text-gray-300 mb-8 leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300 relative">
        {{ service.description }}
      </p>
      
      <!-- Price and duration with enhanced styling -->
      <div class="flex items-center justify-between mb-8 p-4 rounded-xl bg-gray-700/50 group-hover:bg-gray-700/70 transition-colors duration-300 backdrop-blur-sm">
        <div class="flex flex-col">
          <span class="text-xs text-gray-400 uppercase tracking-wider">Starting at</span>
          <span class="text-brand-primary font-bold text-xl group-hover:text-blue-400 transition-colors duration-300">{{ service.price }}</span>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-xs text-gray-400 uppercase tracking-wider">Timeline</span>
          <span class="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">{{ service.duration }}</span>
        </div>
      </div>
      
      <!-- Features list with staggered animations -->
      <ul class="space-y-3 mb-8">
        <li 
          v-for="(feature, index) in displayFeatures" 
          :key="feature"
          class="text-sm text-gray-300 flex items-center group-hover:text-gray-200 transition-all duration-300"
          :style="{ 'transition-delay': `${index * 50}ms` }"
        >
          <div class="w-5 h-5 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          {{ feature }}
        </li>
      </ul>
      
      <!-- Enhanced CTA button -->
      <button class="cta-button relative w-full mt-auto py-4 rounded-xl font-semibold text-white overflow-hidden group/btn transition-all duration-300 group-hover:scale-105">
        <!-- Button background with gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-600 transition-all duration-300"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-brand-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Button glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
        
        <!-- Button text -->
        <span class="relative z-10 flex items-center justify-center">
          {{ ctaText }}
          <svg class="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
        
        <!-- Ripple effect -->
        <div class="absolute inset-0 scale-0 group-hover/btn:scale-100 bg-white/20 rounded-xl transition-transform duration-500 ease-out"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Service } from '../../../types/Service'

interface Props {
  service: Service
  maxFeatures?: number
  ctaText?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxFeatures: 3,
  ctaText: 'Learn More'
})

defineEmits<{
  select: [service: Service]
}>()

defineOptions({
  name: 'ServiceCard'
})

const displayFeatures = computed(() => {
  return props.service.features.slice(0, props.maxFeatures)
})
</script>

<style scoped>
/* Main card styling with glassmorphism */
.service-card {
  height: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.service-card:hover {
  transform: translateY(-12px) rotateX(2deg) rotateY(-1deg);
  filter: brightness(1.05);
}

/* Floating particles animation */
@keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; } 50% { transform: translateY(-20px) rotate(180deg); opacity: 1; } }
@keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.5; } 33% { transform: translateY(-15px) rotate(120deg) scale(1.2); opacity: 0.8; } 66% { transform: translateY(-25px) rotate(240deg) scale(0.8); opacity: 1; } }
@keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; } 25% { transform: translateY(-10px) rotate(90deg); opacity: 0.9; } 75% { transform: translateY(-30px) rotate(270deg); opacity: 1; } }

.animate-float-1 { animation: float-1 4s ease-in-out infinite; }
.animate-float-2 { animation: float-2 6s ease-in-out infinite; animation-delay: 1s; }
.animate-float-3 { animation: float-3 5s ease-in-out infinite; animation-delay: 2s; }

/* Slow rotating animation for icon ring */
@keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-slow-spin { animation: slow-spin 8s linear infinite; }

/* Shimmer effect for title */
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.animate-shimmer { animation: shimmer 2s ease-in-out infinite; }

/* Enhanced icon container effects */
.icon-container::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #0EA5E9, #3B82F6, #8B5CF6, #0EA5E9);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.5s;
  z-index: -1;
  animation: icon-border-rotate 3s linear infinite;
  animation-play-state: paused;
}

.service-card:hover .icon-container::before { opacity: 0.7; animation-play-state: running; }
@keyframes icon-border-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* CTA Button advanced effects */
.cta-button {
  position: relative;
  background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s;
  border-radius: inherit;
}

.service-card:hover .cta-button::before { left: 100%; }

.cta-button:hover {
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 30px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* Card border glow animation */
.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(45deg, transparent, #0EA5E9, transparent, #8B5CF6, transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  opacity: 0;
  transition: opacity 0.5s;
}

.service-card:hover::after { opacity: 1; animation: border-glow 2s ease-in-out infinite; }
@keyframes border-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

/* Staggered feature animations */
.service-card:hover li:nth-child(1) { animation: feature-highlight 0.6s ease-out; animation-delay: 0.1s; animation-fill-mode: both; }
.service-card:hover li:nth-child(2) { animation: feature-highlight 0.6s ease-out; animation-delay: 0.2s; animation-fill-mode: both; }
.service-card:hover li:nth-child(3) { animation: feature-highlight 0.6s ease-out; animation-delay: 0.3s; animation-fill-mode: both; }

@keyframes feature-highlight { 0% { transform: translateX(-10px); opacity: 0.8; } 50% { transform: translateX(2px); } 100% { transform: translateX(0); opacity: 1; } }

/* Price section enhanced styling */
.service-card:hover .bg-gray-700\/50 {
  background: linear-gradient(135deg, rgba(55, 65, 81, 0.7), rgba(75, 85, 99, 0.6));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .service-card:hover { transform: translateY(-8px); }
  .floating-particle { display: none; }
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .service-card, .floating-particle, .icon-container, .cta-button { animation: none !important; transition: none !important; }
  .service-card:hover { transform: none; }
}
</style>
