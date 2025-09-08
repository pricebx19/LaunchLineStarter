<template>
  <div class="about-page">
    <!-- Hero Section -->
    <AboutHero />

    <!-- Mission & Vision -->
    <MissionSection />

    <!-- Our Approach -->
    <ProcessSection />

    <!-- Our Values - Orbital System -->
    <ValuesSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSeo } from '../lib/seo'
import AboutHero from '../components/about/AboutHero.vue'
import MissionSection from '../components/about/MissionSection.vue'
import ProcessSection from '../components/about/ProcessSection.vue'
import ValuesSection from '../components/about/ValuesSection.vue'

const { updateSeo } = useSeo()

defineOptions({
  name: 'About'
})

onMounted(() => {
  updateSeo({
    title: 'About - LaunchLine',
    description: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    ogTitle: 'About LaunchLine - Professional Launch Solutions',
    ogDescription: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    canonical: window.location.origin + '/about'
  })
})
</script>

<script lang="ts">
export default {
  name: 'About'
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}
</style>