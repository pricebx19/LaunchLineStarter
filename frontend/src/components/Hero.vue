<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image/Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {{ title || 'Launch Your Vision' }}
          <span class="text-brand-primary block mt-2">
            {{ subtitle || 'With Confidence' }}
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {{ description || 'Professional launch solutions designed to accelerate your business growth and maximize your success from day one.' }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link
            :to="ctaLink || '/contact'"
            class="btn-primary text-lg px-8 py-4 inline-block"
          >
            {{ ctaText || 'Get Started Today' }}
          </router-link>
          
          <router-link
            to="/about"
            class="btn-secondary text-lg px-8 py-4 inline-block"
          >
            Learn More
          </router-link>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg 
        class="w-6 h-6 text-gray-400" 
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
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-1/4 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

defineProps<Props>()
</script>