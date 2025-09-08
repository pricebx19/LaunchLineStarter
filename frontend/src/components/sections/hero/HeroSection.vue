<template>
  <section class="hero-section relative py-24 bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Animated Starry Background -->
    <StarryBackground 
      :large-count="15"
      :medium-count="30" 
      :small-count="45"
      :shooting-count="2"
    />

    <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>
      
      <p v-if="subtitle" class="text-xl text-gray-300 leading-relaxed mb-4">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </p>
      
      <p v-if="tagline" class="text-lg text-brand-primary font-semibold italic">
        <slot name="tagline">
          {{ tagline }}
        </slot>
      </p>
      
      <!-- Optional CTA buttons -->
      <div v-if="showCta" class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <slot name="cta">
          <router-link 
            v-if="primaryCtaText && primaryCtaLink"
            :to="primaryCtaLink" 
            class="btn-primary inline-flex items-center justify-center"
          >
            {{ primaryCtaText }}
          </router-link>
          <router-link 
            v-if="secondaryCtaText && secondaryCtaLink"
            :to="secondaryCtaLink" 
            class="btn-secondary inline-flex items-center justify-center"
          >
            {{ secondaryCtaText }}
          </router-link>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import StarryBackground from '../../effects/StarryBackground.vue'

interface Props {
  title?: string
  subtitle?: string
  tagline?: string
  showCta?: boolean
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  tagline: 'We\'re taking off.',
  showCta: false
})

defineOptions({
  name: 'HeroSection'
})
</script>

<style scoped>
/* Text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Hero section specific styles */
.hero-section {
  position: relative;
  overflow: hidden;
}
</style>