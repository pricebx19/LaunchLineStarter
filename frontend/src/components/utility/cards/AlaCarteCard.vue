<template>
  <div 
    class="alacarte-item relative group opacity-0 translate-y-8"
    :style="{ 'animation-delay': `${animationDelay}ms` }"
  >
    <!-- Animated background layers -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/98 rounded-2xl transition-all duration-500"></div>
    
    <!-- Glow border effect -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/20 via-blue-500/10 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    <div class="absolute inset-[1px] bg-gradient-to-br from-gray-800 via-gray-800/98 to-gray-900 rounded-2xl transition-all duration-500"></div>
    
    <!-- Popular badge -->
    <div v-if="service.popular" class="absolute -top-3 -right-3 z-20">
      <div class="bg-gradient-to-r from-brand-primary to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
        Popular
      </div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-10 p-8 h-full flex flex-col cursor-pointer" @click="$emit('select', service)">
      <!-- Icon and category -->
      <div class="flex items-center justify-between mb-6">
        <div class="w-14 h-14 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
          <!-- Icon glow effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-blue-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
          <div v-html="service.icon" class="w-7 h-7 text-brand-primary relative z-10 group-hover:scale-110 transition-transform duration-300"></div>
        </div>
        <span class="text-xs font-medium text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/30">
          {{ service.category }}
        </span>
      </div>
      
      <!-- Service title -->
      <h3 class="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500">
        {{ service.title }}
      </h3>
      
      <!-- Service description -->
      <p class="text-gray-300 mb-6 leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
        {{ service.description }}
      </p>
      
      <!-- Features list -->
      <ul class="space-y-2 mb-6">
        <li 
          v-for="(feature, featureIndex) in service.features" 
          :key="feature"
          class="text-sm text-gray-300 flex items-center group-hover:text-gray-200 transition-all duration-300"
          :style="{ 'transition-delay': `${featureIndex * 50}ms` }"
        >
          <div class="w-4 h-4 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          {{ feature }}
        </li>
      </ul>
      
      <!-- Price and CTA -->
      <div class="mt-auto">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-2xl font-bold text-brand-primary group-hover:text-blue-400 transition-colors duration-300">
              {{ service.price }}
            </span>
          </div>
        </div>
        
        <!-- Enhanced CTA button -->
        <button class="alacarte-cta-button relative w-full py-3 rounded-xl font-semibold text-white overflow-hidden group/btn transition-all duration-300 group-hover:scale-105">
          <!-- Button background with gradient -->
          <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-600 transition-all duration-300"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-brand-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Button glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
          
          <!-- Button text -->
          <span class="relative z-10 flex items-center justify-center">
            {{ ctaText }}
            <svg class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </span>
          
          <!-- Ripple effect -->
          <div class="absolute inset-0 scale-0 group-hover/btn:scale-100 bg-white/20 rounded-xl transition-transform duration-500 ease-out"></div>
        </button>
      </div>
    </div>
    
    <!-- Particle effects on hover -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div class="floating-particle absolute top-4 right-6 w-1 h-1 bg-brand-primary rounded-full animate-float-particle-1"></div>
      <div class="floating-particle absolute top-12 right-10 w-0.5 h-0.5 bg-blue-400 rounded-full animate-float-particle-2"></div>
      <div class="floating-particle absolute top-6 right-14 w-1 h-1 bg-purple-400 rounded-full animate-float-particle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AlaCarteService {
  title: string
  description: string
  price: string
  icon: string
  category: string
  features: string[]
  popular?: boolean
}

interface Props {
  service: AlaCarteService
  animationDelay?: number
  ctaText?: string
}

withDefaults(defineProps<Props>(), {
  animationDelay: 0,
  ctaText: 'Get Started'
})

defineEmits<{
  select: [service: AlaCarteService]
}>()

defineOptions({
  name: 'AlaCarteCard'
})
</script>

<style scoped>
/* A La Carte Item Staggered Animation */
.alacarte-item {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.alacarte-item.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Service Card Advanced Styling */
.alacarte-item:hover {
  transform: translateY(-12px) scale(1.03);
  filter: brightness(1.05);
}

/* Floating Particles Animations */
@keyframes float-particle-1 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes float-particle-2 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.5;
  }
  33% {
    transform: translateY(-12px) rotate(120deg) scale(1.3);
    opacity: 0.8;
  }
  66% {
    transform: translateY(-25px) rotate(240deg) scale(0.7);
    opacity: 1;
  }
}

@keyframes float-particle-3 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-10px) rotate(90deg);
    opacity: 0.9;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 1;
  }
}

.animate-float-particle-1 {
  animation: float-particle-1 4s ease-in-out infinite;
}

.animate-float-particle-2 {
  animation: float-particle-2 6s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-particle-3 {
  animation: float-particle-3 5s ease-in-out infinite;
  animation-delay: 2s;
}

/* CTA Button advanced effects */
.alacarte-cta-button {
  position: relative;
  background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%);
  border: none;
  box-shadow: 
    0 4px 15px rgba(14, 165, 233, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.alacarte-cta-button::before {
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

.alacarte-item:hover .alacarte-cta-button::before {
  left: 100%;
}

.alacarte-cta-button:hover {
  box-shadow: 
    0 8px 25px rgba(14, 165, 233, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 0 30px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .alacarte-item:hover {
    transform: translateY(-6px) scale(1.01);
  }
  
  .floating-particle {
    display: none;
  }
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .alacarte-item,
  .floating-particle {
    animation: none !important;
    transition: none !important;
  }
  
  .alacarte-item {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .alacarte-item:hover {
    transform: none;
  }
}

/* Focus states for accessibility */
.alacarte-item:focus-within {
  outline: 2px solid #0EA5E9;
  outline-offset: 2px;
}
</style>
