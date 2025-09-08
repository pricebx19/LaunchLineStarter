<template>
  <section class="py-10 bg-gray-900 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeader
        title="Technologies"
        highlighted-text="We Master"
        description="Cutting-edge technologies and frameworks that power our exceptional websites."
        margin-class=""
      />
      
      <TechOrbit :technologies="technologies" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const SectionHeader = defineAsyncComponent(() => import('../../ui/layout/SectionHeader.vue'))
const TechOrbit = defineAsyncComponent(() => import('../../effects/TechOrbit.vue'))

interface Technology {
  name: string
  icon: string
}

defineProps<{
  technologies: Technology[]
}>()
</script>

<style scoped>
/* Main container styles only - component-specific styles moved to individual components */
</style>
