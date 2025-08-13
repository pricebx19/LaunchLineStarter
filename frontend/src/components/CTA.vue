<template>
  <section class="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {{ title || 'Ready to Launch Your Success?' }}
      </h2>
      
      <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
        {{ subtitle || 'Join hundreds of successful companies who have accelerated their growth with LaunchLine. Let\'s turn your vision into reality.' }}
      </p>

      <!-- Statistics (if provided) -->
      <div 
        v-if="showStats && stats.length > 0" 
        class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
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

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link
          :to="primaryCtaLink || '/contact'"
          class="btn-primary text-lg px-8 py-4 inline-block transform hover:scale-105 transition-transform duration-200"
        >
          {{ primaryCtaText || 'Start Your Launch' }}
        </router-link>
        
        <router-link
          :to="secondaryCtaLink || '/services'"
          class="btn-secondary text-lg px-8 py-4 inline-block"
        >
          {{ secondaryCtaText || 'View Services' }}
        </router-link>
      </div>

      <!-- Additional info -->
      <div class="mt-8 text-gray-400 text-sm">
        <p>{{ additionalInfo || 'No commitment required • Free consultation • Launch in 30 days' }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

interface Props {
  title?: string
  subtitle?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  additionalInfo?: string
  showStats?: boolean
  stats?: Stat[]
}

const props = withDefaults(defineProps<Props>(), {
  showStats: true,
  stats: () => [
    { value: '500+', label: 'Successful Launches' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '30', label: 'Days Average Launch' }
  ]
})
</script>