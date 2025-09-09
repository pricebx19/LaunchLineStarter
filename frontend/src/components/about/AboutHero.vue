<template>
  <section class="hero-section relative py-24 bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Animated Starry Background -->
    <StarryBackground v-if="heroData.background === 'starry'" />

    <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-shadow-lg">
        {{ heroData.title }}
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4">
        {{ heroData.subtitle }}
      </p>
      <p class="text-lg text-gray-300 leading-relaxed mb-4">
        {{ heroData.description }}
      </p>
      <p class="text-lg text-brand-primary font-semibold italic">{{ heroData.tagline }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StarryBackground from '../effects/StarryBackground.vue'
import { ABOUT_HERO_DATA } from '../../data/about'
import type { AboutHeroData } from '../../types/About'

interface Props {
  heroData?: AboutHeroData
}

const props = withDefaults(defineProps<Props>(), {
  heroData: () => ABOUT_HERO_DATA
})

const heroData = computed(() => props.heroData)
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
