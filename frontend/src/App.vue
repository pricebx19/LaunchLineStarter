<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

onMounted(() => {
  // Set default SEO if no specific page meta
  updateSeo({
    title: 'LaunchLine - Professional Launch Solutions',
    description: 'LaunchLine provides professional launch solutions for your business needs.'
  })
})
</script>