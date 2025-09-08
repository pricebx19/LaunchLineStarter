<template>
  <section class="hero-section relative py-10 bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Animated Starry Background -->
    <StarryBackground />

    <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
        About <span class="text-brand-primary">LaunchLine</span>
      </h1>
      <p class="text-xl text-gray-300 leading-relaxed mb-4">
        We're dedicated to transforming businesses into digital powerhouses through cutting-edge web and software development. 
        Our mission is to provide professional solutions that launch your brand into the digital stratosphere.
      </p>
      <p class="text-lg text-brand-primary font-semibold italic">We're taking off.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import StarryBackground from '../effects/StarryBackground.vue'

defineOptions({
  name: 'AboutHero'
})
</script>

<script lang="ts">
export default {
  name: 'AboutHero'
}
</script>

<style scoped>
/* Hero section specific styles */
.hero-section {
  position: relative;
  overflow: hidden;
}

/* Text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>
