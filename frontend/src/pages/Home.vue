<template>
  <div class="home-page">
    <!-- Hero Section - Initially visible by default -->
      <Hero
        :is-active="currentSection === 'hero'"
      />

    <!-- Features Section -->
    <FeaturesSection 
      :is-active="currentSection === 'features'"
    />

    <!-- Statistics Section -->
    <StatisticsSection 
      :is-active="currentSection === 'statistics'"
    />

    <!-- Testimonials Section -->
    <TestimonialsSection 
      :is-active="currentSection === 'testimonials'"
    />

    <!-- Call to Action Section -->
    <CTASection 
      :is-active="currentSection === 'cta'"
    />
  </div>
</template>

<style scoped>
.home-page {
  /* Disable all scrolling on the home page */
  overflow: hidden;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Ensure buttons and interactive elements have proper z-index */
.home-page section button,
.home-page section [role="button"] {
  position: relative;
  z-index: 30;
}

/* Ensure the scroll indicator buttons are always clickable */
.home-page section .text-center button {
  position: relative;
  z-index: 30;
  pointer-events: auto;
}

/* Disable scrollbar and scroll wheel */
.home-page::-webkit-scrollbar {
  display: none;
}

.home-page {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Ensure the body and html also don't scroll when on home page */
:global(body.home-page-active) {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

/* Ensure text selection works on all content */
.home-page {
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

.home-page * {
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

:global(html.home-page-active) {
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { onMounted, onUnmounted, defineAsyncComponent, ref, provide, nextTick } from 'vue'
import { useSeo } from '../lib/seo'

// Use dynamic imports for components
const Hero = defineAsyncComponent(() => import('../components/sections/hero/Hero.vue'))
const Statistics = defineAsyncComponent(() => import('../components/ui/display/Statistics.vue'))
const FeatureGrid = defineAsyncComponent(() => import('../components/sections/features/FeatureGrid.vue'))
const Testimonial = defineAsyncComponent(() => import('../components/ui/display/Testimonial.vue'))
const CTA = defineAsyncComponent(() => import('../components/sections/cta/components/CTA.vue'))
const FeaturesSection = defineAsyncComponent(() => import('../components/sections/features/FeaturesSection.vue'))
const StatisticsSection = defineAsyncComponent(() => import('../components/sections/StatisticsSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('../components/sections/TestimonialsSection.vue'))
const CTASection = defineAsyncComponent(() => import('../components/sections/CTASection.vue'))

const { updateSeo } = useSeo()

// Section navigation state
const currentSection = ref('hero')
const hasNavigated = ref(false) // Track if user has clicked any navigation button
const sections = ['hero', 'features', 'statistics', 'testimonials', 'cta']
const isNavigating = ref(false) // Prevent rapid navigation

// Create navigation object
const navigation = {
  goToSection: (sectionId: string) => {
    console.log('goToSection called with:', sectionId)
    if (sections.includes(sectionId) && !isNavigating.value) {
      isNavigating.value = true
      hasNavigated.value = true
      currentSection.value = sectionId
      console.log('Section changed to:', sectionId, 'hasNavigated:', hasNavigated.value)
      
      // Reset navigation lock after a short delay
      setTimeout(() => {
        isNavigating.value = false
      }, 500)
    }
  },

  goToNextSection: () => {
    if (isNavigating.value) {
      return;
    }
    
    isNavigating.value = true
    hasNavigated.value = true
    const currentIndex = sections.indexOf(currentSection.value)
    const nextIndex = (currentIndex + 1) % sections.length
    const nextSection = sections[nextIndex]
    currentSection.value = nextSection
    
    // Reset navigation lock after a short delay
    setTimeout(() => {
      isNavigating.value = false
    }, 500)
  },

  goToPreviousSection: () => {
    if (isNavigating.value) {
      return;
    }
    
    isNavigating.value = true
    hasNavigated.value = true
    const currentIndex = sections.indexOf(currentSection.value)
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1
    currentSection.value = sections[prevIndex]
    
    // Reset navigation lock after a short delay
    setTimeout(() => {
      isNavigating.value = false
    }, 500)
  }
}

// Expose navigation object to template
defineExpose({
  navigation
})

// Provide navigation object to child components
provide('navigation', navigation)

onMounted(async () => {
  // Add body class to disable global scrolling
  document.body.classList.add('home-page-active')
  document.documentElement.classList.add('home-page-active')
  
  // Ensure the hero section is active after components are mounted
  await nextTick()
  currentSection.value = 'hero'
  hasNavigated.value = false
  
  updateSeo({
    title: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    description: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.',
    ogTitle: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    ogDescription: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.',
    canonical: window.location.origin + '/'
  })
})

onUnmounted(() => {
  // Remove body class to restore global scrolling
  document.body.classList.remove('home-page-active')
  document.documentElement.classList.remove('home-page-active')
})
</script>