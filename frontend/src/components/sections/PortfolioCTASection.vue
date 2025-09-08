<template>
  <section class="py-20 bg-gradient-to-br from-brand-primary via-purple-600 to-blue-600 relative overflow-hidden">
    <div class="absolute inset-0 bg-black/20"></div>
    <StarryBackground 
      :large-count="20"
      :show-medium="false"
      :show-small="false" 
      :opacity="0.6"
    />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeader 
        badge="Ready to Get Started?"
        title="Let's Build Your Next"
        highlighted-text="Success Story"
        description="Join the growing list of businesses who've transformed their online presence with LaunchLine. Your journey to digital excellence starts here."
        size="large"
        margin-class="mb-12"
      />
      
      <CTAButtons 
        :primary-button="{
          text: 'Start Your Project',
          link: '/contact',
          icon: '🚀'
        }"
        :secondary-button="{
          text: 'View Our Services',
          link: '/services',
          icon: '⚡'
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const StarryBackground = defineAsyncComponent(() => import('../effects/StarryBackground.vue'))
const SectionHeader = defineAsyncComponent(() => import('../ui/layout/SectionHeader.vue'))
const CTAButtons = defineAsyncComponent(() => import('./cta/components/CTAButtons.vue'))
</script>

<style scoped>
/* Main container styles only - component-specific styles moved to individual components */
</style>
