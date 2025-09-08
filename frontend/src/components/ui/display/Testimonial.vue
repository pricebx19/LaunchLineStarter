<template>
  <section class="h-full bg-gray-800 flex items-center justify-center">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title || 'What Our Clients Say' }}
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          {{ subtitle || 'Don\'t just take our word for it. Here\'s what our clients have to say about their experience with LaunchLine.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.id"
          class="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-brand-primary transition-all duration-300 group"
        >
          <div class="flex items-center mb-4">
            <div 
              v-if="testimonial.avatar"
              class="w-12 h-12 rounded-full overflow-hidden mr-4"
            >
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name"
                class="w-full h-full object-cover"
              >
            </div>
            <div v-else class="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mr-4">
              <span class="text-brand-primary font-semibold text-lg">
                {{ testimonial.name.charAt(0) }}
              </span>
            </div>
            
            <div>
              <h4 class="font-semibold text-white group-hover:text-brand-primary transition-colors">
                {{ testimonial.name }}
              </h4>
              <p class="text-sm text-gray-400">
                {{ testimonial.role }} at {{ testimonial.company }}
              </p>
            </div>
          </div>
          
          <blockquote class="text-gray-300 leading-relaxed italic">
            "{{ testimonial.content }}"
          </blockquote>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="text-center mt-12">
        <button 
          @click="scrollToNextSection"
          class="inline-flex items-center justify-center w-10 h-10 bg-gray-800/80 hover:bg-brand-primary/90 border border-gray-700 hover:border-brand-primary rounded-full transition-all duration-300 hover:scale-110 group relative z-30"
          aria-label="Scroll to next section"
        >
          <svg 
            class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" 
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
// Remove duplicate interfaces - using the ones from componentData

interface Props {
  title?: string
  subtitle?: string
  testimonials?: TestimonialWithRating[]
}

const props = withDefaults(defineProps<Props>(), {
  testimonials: () => defaultTestimonials
})

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

import { inject } from 'vue'
import { testimonials as defaultTestimonials, type TestimonialWithRating } from '../../../data/componentData'

// Inject navigation function from parent
interface ParentNavigation {
  goToNextSection: () => void
  goToPreviousSection: () => void
  goToSection: (sectionId: string) => void
}

const parentNavigation = inject<ParentNavigation | null>('navigation', null)

// Navigate to next section using parent navigation
const scrollToNextSection = () => {
  if (parentNavigation?.goToNextSection) {
    parentNavigation.goToNextSection()
  }
}
</script>

<style scoped>
.testimonial-card {
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Avatar improvements */
.avatar-container {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.05) 100%);
  border: 1px solid rgba(14, 165, 233, 0.2);
}

.avatar-container:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%);
  border-color: rgba(14, 165, 233, 0.3);
}

/* Quote styling */
blockquote {
  position: relative;
  padding-left: 1rem;
}

blockquote::before {
  content: '"';
  position: absolute;
  left: -0.5rem;
  top: -0.5rem;
  font-size: 2rem;
  color: rgba(14, 165, 233, 0.3);
  font-family: serif;
}

/* Grid improvements */
.grid {
  gap: 1.5rem;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
  
  .text-center.mb-12 {
    margin-bottom: 2rem;
  }
}
</style>