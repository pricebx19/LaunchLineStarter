<template>
  <div class="mobile-home">
    <!-- Mobile Navigation -->
    <MobileNavigation />
    
    <!-- Main Content -->
    <main class="mobile-main">
      <!-- Hero Section -->
      <MobileHero />
      
      <!-- Features Section -->
      <MobileFeaturesSection />
      
      <!-- Statistics Section -->
      <MobileStatisticsSection />
      
      <!-- Testimonials Section -->
      <MobileTestimonialsSection />
      
      <!-- CTA Section -->
      <MobileCTASection />
    </main>
    
    <!-- Scroll to Top Button -->
    <button 
      v-show="showScrollTop"
      @click="scrollToTop"
      class="scroll-to-top fixed bottom-6 right-6 z-40 bg-brand-primary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      aria-label="Scroll to top"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v14" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../../lib/seo'
import type { HomePageData } from '../../types'
import { HOME_PAGE_DATA } from '../../data/content'

defineOptions({
  name: 'MobileHome'
})

// Import mobile components dynamically
const MobileNavigation = defineAsyncComponent(() => import('../ui/navigation/MobileNavigation.vue'))
const MobileHero = defineAsyncComponent(() => import('../sections/hero/MobileHero.vue'))
const MobileFeaturesSection = defineAsyncComponent(() => import('../sections/features/MobileFeaturesSection.vue'))
const MobileStatisticsSection = defineAsyncComponent(() => import('../sections/MobileStatisticsSection.vue'))
const MobileTestimonialsSection = defineAsyncComponent(() => import('../sections/MobileTestimonialsSection.vue'))
const MobileCTASection = defineAsyncComponent(() => import('../sections/MobileCTASection.vue'))

const { updateSeo } = useSeo()

interface Props {
  homeData?: HomePageData
}

const props = withDefaults(defineProps<Props>(), {
  homeData: () => HOME_PAGE_DATA
})

// Scroll to top functionality
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
  
  // Update SEO
  updateSeo({
    title: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    description: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.',
    ogTitle: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    ogDescription: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.',
    canonical: window.location.origin + '/'
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.mobile-home {
  /* Ensure proper mobile viewport handling */
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
}

.mobile-main {
  /* Smooth scrolling for better mobile experience */
  scroll-behavior: smooth;
  /* Account for mobile navigation height */
  padding-top: 0;
}

/* Scroll to top button */
.scroll-to-top {
  /* Touch-friendly size */
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top:active {
  transform: scale(0.95);
}

/* Ensure proper spacing for mobile navigation */
@media (max-width: 768px) {
  .mobile-main {
    padding-top: 0;
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s ease;
}

/* Optimize for mobile performance */
.mobile-home * {
  /* Reduce motion for users who prefer it */
  animation-duration: 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-home * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
