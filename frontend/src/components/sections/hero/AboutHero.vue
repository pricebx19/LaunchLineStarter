<template>
  <section class="hero-section relative py-10 bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Animated Starry Background -->
    <StarryBackground />

    <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
        {{ title }} <span class="text-brand-primary">{{ highlight }}</span>
      </h1>
      <p class="text-xl text-gray-300 leading-relaxed mb-4">
        {{ description }}
      </p>
      <p class="text-lg text-brand-primary font-semibold italic">{{ tagline }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const StarryBackground = defineAsyncComponent(() => import('../effects/StarryBackground.vue'))

withDefaults(defineProps<{
  title?: string
  highlight?: string
  description?: string
  tagline?: string
}>(), {
  title: 'About',
  highlight: 'LaunchLine',
  description: 'We\'re dedicated to transforming businesses into digital powerhouses through cutting-edge web and software development. Our mission is to provide professional solutions that launch your brand into the digital stratosphere.',
  tagline: 'We\'re taking off.'
})
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}
</style>
