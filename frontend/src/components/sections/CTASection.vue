<template>
  <section id="cta" :class="{ 'active': isActive }" class="relative">
    <CTA
      variant="section"
      title="Ready to Launch Your Digital Success?"
      subtitle="Join the growing list of businesses who've transformed their online presence with LaunchLine. Your next big launch starts here."
      primary-cta-text="Start Your Launch"
      primary-cta-link="/contact"
      secondary-cta-text="View Our Work"
      secondary-cta-link="/portfolio"
      :show-navigation="true"
      :show-effects="true"
      container-class="w-full h-full flex items-center justify-center"
    />
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CTA = defineAsyncComponent(() => import('./cta/components/CTA.vue'))

interface Props {
  isActive: boolean
}

defineProps<Props>()
</script>

<style scoped>
/* Section Styles for Home Page Navigation */
section {
  /* Each section takes the full viewport height */
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden; /* Prevent content from spilling over */
  margin-bottom: 0;
  
  /* Position sections absolutely to overlay each other */
  position: absolute;
  top: 0; /* Start at top of viewport, navbar will overlay */
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Hide all sections by default */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  pointer-events: none; /* Prevent interaction with hidden sections */
}

/* Show only the active section */
section.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 20;
  /* Ensure text selection works on active sections */
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

/* Hide all sections by default */
section:not(.active) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}
</style>
