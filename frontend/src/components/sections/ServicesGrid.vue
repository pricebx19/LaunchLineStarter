<template>
  <section class="py-16 bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Enhanced starry background -->
    <StarryBackground 
      :small-count="30"
      :show-large="true"
      :show-medium="true" 
      :show-shooting="true"
      :opacity="0.4"
    />
    
    <!-- Ambient gradient overlays -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div v-if="title || subtitle" class="text-center mb-20">
        <h2 v-if="title" class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- Services grid with staggered animations -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div 
          v-for="(service, index) in services" 
          :key="service.title"
          class="service-item opacity-0 translate-y-8"
          :style="{ 'animation-delay': `${index * 200}ms` }"
        >
          <ServiceCard 
            :service="service"
            @select="$emit('selectService', $event)"
          />
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-brand-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import StarryBackground from '../effects/StarryBackground.vue'
import ServiceCard from '../utility/cards/ServiceCard.vue'

interface Service {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  icon: string
}

interface Props {
  title?: string
  subtitle?: string
  services: Service[]
}

defineProps<Props>()

defineEmits<{
  selectService: [service: Service]
}>()

defineOptions({
  name: 'ServicesGrid'
})

// Intersection Observer for staggered animations
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Create intersection observer for service items
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  )

  // Observe all service items
  const serviceItems = document.querySelectorAll('.service-item')
  serviceItems.forEach((item) => {
    observer?.observe(item)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* Service item staggered animation */
.service-item {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-item.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Enhanced background gradients */
.bg-gradient-to-b {
  background: linear-gradient(
    to bottom,
    rgb(31, 41, 55),
    rgb(17, 24, 39) 30%,
    rgb(15, 23, 42) 60%,
    rgb(17, 24, 39)
  );
}

/* Decorative elements animations */
@keyframes float-glow {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-10px) scale(1.05);
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: float-glow 4s ease-in-out infinite;
}

/* Grid responsive enhancements */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 3rem;
  }
}

/* Ambient lighting effects */
.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(14, 165, 233, 0.5),
    transparent
  );
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  .service-item {
    animation-delay: 0ms !important;
  }
  
  .decorative-elements {
    display: none;
  }
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .service-item {
    transition: none;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .animate-pulse,
  .floating-particle {
    animation: none !important;
  }
}
</style>
