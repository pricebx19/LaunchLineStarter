<template>
  <section class="py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Enhanced starry background -->
    <div class="stars-container absolute inset-0 opacity-25">
      <div class="star star-small" v-for="i in 40" :key="`alacarte-${i}`" :style="getStarStyle(i, 'small')"></div>
      <div class="star star-medium" v-for="i in 12" :key="`alacarte-med-${i}`" :style="getStarStyle(i, 'medium')"></div>
    </div>
    
    <!-- Ambient gradient overlays -->
    <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-blue-600/5"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/50 to-transparent"></div>
    
    <!-- Floating orbs -->
    <div class="absolute top-32 right-20 w-96 h-96 bg-gradient-to-br from-brand-primary/8 to-blue-600/8 rounded-full blur-3xl opacity-50 animate-float-slow"></div>
    <div class="absolute bottom-20 left-16 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-brand-primary/8 rounded-full blur-3xl opacity-40 animate-float-reverse"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header section -->
      <SectionHeader
        badge="À La Carte Services"
        title="Build Your "
        highlighted-text="Custom Solution"
        description="Mix and match individual services to create the perfect solution for your unique needs. Professional quality with flexible pricing."
        size="large"
        margin-class="mb-20"
      />
      
      <!-- Category filter tabs -->
      <CategoryFilter 
        :categories="categories"
        :selected-categories="selectedCategories"
        :special-filters="specialFilters"
        :item-type="'Services'"
        :page-key="'services'"
        :margin-bottom="'2rem'"
        @categories-change="handleCategoriesChange"
        @special-filters-change="handleSpecialFiltersChange"
      />
      
      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" :key="`${selectedCategories.join(',')}-${JSON.stringify(specialFilters)}-${showAll}`">
        <AlaCarteCard
          v-for="(service, index) in filteredServices" 
          :key="service.title"
          :service="service"
          :animation-delay="index * 100"
          @select="handleServiceSelect"
        />
      </div>
      
      <!-- Show More/Less Button -->
      <LoadMoreButton
        :visible="hasMoreServices"
        :show-all="showAll"
        :remaining-count="remainingCount"
        item-type="Service"
        variant="secondary"
        @show-more="showMoreServices"
        @show-less="showLessServices"
      />
      
      <!-- Bottom CTA -->
      <div class="mt-10 text-center">
        <div class="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-3xl border border-gray-600/50 backdrop-blur-sm max-w-2xl">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
            <h3 class="text-xl font-bold text-white">Need Multiple Services?</h3>
          </div>
          <p class="text-gray-300 text-center">
            Combine 3+ services and save 15% with our custom package deals. Let's build something amazing together.
          </p>
          <a href="/contact" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Get Custom Quote
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, defineAsyncComponent } from 'vue'

const CategoryFilter = defineAsyncComponent(() => import('../utility/filters/CategoryFilter.vue'))
const AlaCarteCard = defineAsyncComponent(() => import('../utility/cards/AlaCarteCard.vue'))
const SectionHeader = defineAsyncComponent(() => import('../ui/layout/SectionHeader.vue'))
const LoadMoreButton = defineAsyncComponent(() => import('../utility/LoadMoreButton.vue'))

import type { AlaCarteService } from '../../types'

interface Props {
  services: AlaCarteService[]
}

const props = defineProps<Props>()

defineOptions({
  name: 'AlaCarteMenu'
})

// Category and special filtering (multi-select)
const selectedCategories = ref(['All'])
const specialFilters = ref({
  popular: false,
  featured: false,
  recent: false
})

// Pagination for services
const showAll = ref(false)
const servicesPerPage = 3

const categories = computed(() => {
  const cats = ['All', ...new Set(props.services.map(service => service.category))]
  return cats
})

const allFilteredServices = computed(() => {
  let filtered = props.services
  
  // Filter by categories (multi-select)
  const allCategory = categories.value.find(c => c.toLowerCase().includes('all'))
  const activeCategories = selectedCategories.value.filter(c => c !== allCategory)
  if (activeCategories.length > 0) {
    filtered = filtered.filter(service => 
      activeCategories.includes(service.category)
    )
  }
  
  // Filter by special filters
  if (specialFilters.value.popular) {
    filtered = filtered.filter(service => service.popular)
  }
  
  // Note: featured and recent filters would need additional data on services
  // For now, they're available but don't filter anything since services don't have these properties
  
  return filtered
})

const filteredServices = computed(() => {
  const services = allFilteredServices.value
  if (showAll.value) {
    return services
  }
  return services.slice(0, servicesPerPage)
})

const hasMoreServices = computed(() => {
  return allFilteredServices.value.length > servicesPerPage
})

const remainingCount = computed(() => {
  return Math.max(0, allFilteredServices.value.length - servicesPerPage)
})

// Handle service selection
const handleServiceSelect = (service: AlaCarteService) => {
  // Here you can add any custom logic for service selection
  // You could emit an event or handle routing to a service detail page
}

// Handle show more functionality
const showMoreServices = () => {
  showAll.value = true
}

const showLessServices = () => {
  showAll.value = false
}

// Handle filter changes
const handleCategoriesChange = (categories: string[]) => {
  selectedCategories.value = categories
  // Note: No pagination reset - maintain expanded view when filtering
}

const handleSpecialFiltersChange = (filters: { popular: boolean; featured: boolean; recent: boolean }) => {
  specialFilters.value = filters
  // Note: No pagination reset - maintain expanded view when filtering
}

// Generate random star positions
const getStarStyle = (index: number, size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 4
  const duration = size === 'medium' ? 3 + Math.random() * 2 : 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Intersection Observer for staggered animations
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (observer) {
    observer.disconnect()
  }
  
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

  // Observe all visible service items with better timing
  const observeItems = () => {
    const serviceItems = document.querySelectorAll('.alacarte-item')
    if (serviceItems.length === 0) {
      // If no items found, try again after a short delay
      setTimeout(observeItems, 100)
      return
    }
    
    serviceItems.forEach((item) => {
      // Reset animation state for newly filtered items
      item.classList.remove('animate-in')
      observer?.observe(item)
    })
  }
  
  // Use nextTick to ensure DOM is updated, then add a delay for async components
  nextTick(() => {
    setTimeout(observeItems, 150)
  })
}

onMounted(() => {
  // Reset filter state to defaults when component mounts
  selectedCategories.value = ['All']
  specialFilters.value = {
    popular: false,
    featured: false,
    recent: false
  }
  showAll.value = false
  
  setupObserver()
  
  // Fallback: ensure cards are visible after a reasonable delay if observer fails
  setTimeout(() => {
    const hiddenItems = document.querySelectorAll('.alacarte-item:not(.animate-in)')
    hiddenItems.forEach((item) => {
      item.classList.add('animate-in')
    })
  }, 1000)
})

onUnmounted(() => {
  observer?.disconnect()
})

// Re-setup observer when filtered services change
watch([filteredServices, selectedCategories, specialFilters], () => {
  setupObserver()
}, { flush: 'post', deep: true })
</script>

<style scoped>
/* Enhanced Starry Background Styles */
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

.star-medium {
  width: 2px;
  height: 2px;
  box-shadow: 0 0 4px 2px rgba(14, 165, 233, 0.6);
}

/* Enhanced Animations */
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

/* Floating orbs animations */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.5;
  }
  33% {
    transform: translateY(-25px) translateX(15px) scale(1.1);
    opacity: 0.7;
  }
  66% {
    transform: translateY(15px) translateX(-20px) scale(0.9);
    opacity: 0.6;
  }
}

@keyframes float-reverse {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  33% {
    transform: translateY(20px) translateX(-15px) scale(0.8);
    opacity: 0.6;
  }
  66% {
    transform: translateY(-30px) translateX(25px) scale(1.2);
    opacity: 0.5;
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 12s ease-in-out infinite;
}

/* Component-specific styles (most styles moved to extracted components) */

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .animate-float-slow,
  .animate-float-reverse {
    animation: none;
    opacity: 0.2 !important;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* Tablet responsiveness */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-float-slow,
  .animate-float-reverse,
  .star {
    animation: none !important;
    transition: none !important;
  }
}
</style>
