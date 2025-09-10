<template>
  <ErrorBoundary>
    <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main>
        <router-view />
      </main>
      <Footer v-if="shouldShowFooter" />
    </div>
    
    <!-- Development Tools (only in development) -->
    <DevTools v-if="isDevelopment" />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useSeo } from './lib/seo'
import { useMobileDetection } from './composables/useMobileDetection'
import { errorHandler } from './lib/error-handler'

// Use dynamic imports for components
const Navbar = defineAsyncComponent(() => import('./components/layout/Navbar.vue'))
const Footer = defineAsyncComponent(() => import('./components/layout/Footer.vue'))
const ErrorBoundary = defineAsyncComponent(() => import('./components/ErrorBoundary.vue'))
const DevTools = defineAsyncComponent(() => import('./components/DevTools.vue'))

const route = useRoute()
const { updateSeo } = useSeo()
const { isMobile } = useMobileDetection()

// Check if current page is home page
const isHomePage = computed(() => route.path === '/')

// Check if we're in development mode
const isDevelopment = computed(() => (import.meta as any).env?.DEV || false)

// Show footer only on mobile home page
const shouldShowFooter = computed(() => {
  if (isHomePage.value) {
    return isMobile.value // Show footer only on mobile home page
  }
  return true // Show footer on all other pages
})

onMounted(() => {
  // Set default SEO if no specific page meta
  updateSeo({
    title: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    description: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.'
  })

  // Set up error handler context
  errorHandler.setContext({
    userId: 'anonymous',
    sessionId: Math.random().toString(36).substr(2, 9),
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  })

  // Log app initialization
  errorHandler.info('Application initialized', {
    route: route.path,
    isMobile: isMobile.value,
    isDevelopment: isDevelopment.value
  })
})
</script>