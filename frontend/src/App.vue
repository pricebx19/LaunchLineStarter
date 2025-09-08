<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer v-if="!isHomePage" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useSeo } from './lib/seo'

// Use dynamic imports for components
const Navbar = defineAsyncComponent(() => import('./components/layout/Navbar.vue'))
const Footer = defineAsyncComponent(() => import('./components/layout/Footer.vue'))

const route = useRoute()
const { updateSeo } = useSeo()

// Check if current page is home page
const isHomePage = computed(() => route.path === '/')

onMounted(() => {
  // Set default SEO if no specific page meta
  updateSeo({
    title: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
    description: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.'
  })
})
</script>