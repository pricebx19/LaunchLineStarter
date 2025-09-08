<template>
  <div class="home-page">
    <!-- Conditional rendering based on device type -->
    <MobileHome v-if="isMobile" />
    <DesktopHome v-else />
  </div>
</template>

<style scoped>
.home-page {
  /* Base styles for home page container */
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useMobileDetection } from '../composables/useMobileDetection'

// Use mobile detection
const { isMobile } = useMobileDetection()

// Import components conditionally
const MobileHome = defineAsyncComponent(() => import('../components/pages/MobileHome.vue'))
const DesktopHome = defineAsyncComponent(() => import('../components/pages/DesktopHome.vue'))
</script>