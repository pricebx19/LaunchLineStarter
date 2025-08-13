<template>
  <section class="py-24 bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title || 'What Our Clients Say' }}
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          {{ subtitle || 'Don\'t just take our word for it. Here\'s what our satisfied clients have to say about their LaunchLine experience.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id || testimonial.name"
          class="card bg-gray-900 hover:bg-gray-750 transition-all duration-300 group relative overflow-hidden"
        >
          <!-- Quote Icon -->
          <div class="absolute top-4 right-6 text-brand-primary/20 group-hover:text-brand-primary/30 transition-colors duration-300">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          <!-- Content -->
          <blockquote class="text-gray-300 mb-6 leading-relaxed pr-8">
            "{{ testimonial.content }}"
          </blockquote>

          <!-- Author -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div 
                v-if="testimonial.avatar" 
                class="w-12 h-12 rounded-full overflow-hidden bg-gray-700"
              >
                <img 
                  :src="testimonial.avatar" 
                  :alt="testimonial.name"
                  class="w-full h-full object-cover"
                >
              </div>
              <div 
                v-else 
                class="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center"
              >
                <span class="text-brand-primary font-semibold text-lg">
                  {{ getInitials(testimonial.name) }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="text-white font-semibold">{{ testimonial.name }}</h4>
              <p class="text-gray-400 text-sm">
                {{ testimonial.role }}
                <span v-if="testimonial.company" class="text-brand-accent">
                  at {{ testimonial.company }}
                </span>
              </p>
            </div>
          </div>

          <!-- Rating (if provided) -->
          <div 
            v-if="testimonial.rating" 
            class="flex items-center mt-4 pt-4 border-t border-gray-800"
          >
            <div class="flex space-x-1">
              <svg 
                v-for="star in 5" 
                :key="star"
                class="w-4 h-4"
                :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-600'"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="ml-2 text-sm text-gray-400">
              {{ testimonial.rating }}/5
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Testimonial } from '@/lib/api'

interface TestimonialWithRating extends Testimonial {
  rating?: number
}

interface Props {
  title?: string
  subtitle?: string
  testimonials?: TestimonialWithRating[]
}

const props = withDefaults(defineProps<Props>(), {
  testimonials: () => [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      content: 'LaunchLine transformed our product launch strategy completely. Their expertise and attention to detail helped us exceed our initial goals by 200%. Highly recommended!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      content: 'The strategic guidance and technical execution from LaunchLine was exceptional. They understood our vision and helped us bring it to market faster than we thought possible.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'GreenTech Solutions',
      content: 'Working with LaunchLine was a game-changer for our startup. Their comprehensive approach and professional team made our launch seamless and successful.',
      rating: 5
    }
  ]
})

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>