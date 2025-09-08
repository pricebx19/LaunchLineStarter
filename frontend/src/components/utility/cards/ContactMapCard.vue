<template>
  <div class="glass-card p-6">
    <h3 class="text-white font-semibold mb-4">{{ title }}</h3>
    <div class="map-container">
      <div class="map-placeholder">
        <div class="map-pin">
          <svg class="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div class="map-info">
          <p class="text-white font-semibold">{{ locationName }}</p>
          <p class="text-gray-300 text-sm">{{ address.street }}</p>
          <p class="text-gray-300 text-sm">{{ address.city }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Address {
  street: string
  city: string
}

withDefaults(defineProps<{
  title?: string
  locationName?: string
  address?: Address
}>(), {
  title: 'Our Location',
  locationName: 'LaunchLine HQ',
  address: () => ({
    street: '123 Innovation Drive',
    city: 'Tech City, TC 12345'
  })
})
</script>

<style scoped>
.glass-card {
  @apply bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl;
}

.map-container {
  @apply bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-white/10;
}

.map-placeholder {
  @apply flex items-center space-x-4;
}

.map-pin {
  @apply w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-full flex items-center justify-center;
}

.map-info {
  @apply flex-1;
}
</style>
