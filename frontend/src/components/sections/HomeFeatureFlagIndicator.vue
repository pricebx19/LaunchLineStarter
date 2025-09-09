<template>
  <DebugPanel
    :is-dev="isDev"
    title="Home Page Status"
    :strategy="homeStrategy"
    :is-wagtail-enabled="isWagtailEnabled"
    :migration-status="migrationStatus"
    :has-data="!!homeData"
    :has-error="!!homeError"
    :is-loading="isLoading"
    :api-url="apiUrl"
    :last-updated="lastUpdated"
    feature-flag-name="WAGTAIL_HOME"
    @refresh="handleRefresh"
    @refresh-data="handleRefreshData"
  >
    <template #debug-data>
      <div>Hero: {{ homeData?.hero ? '✅' : '❌' }}</div>
      <div>Features: {{ homeData?.features ? '✅' : '❌' }}</div>
      <div>Statistics: {{ homeData?.statistics ? '✅' : '❌' }}</div>
      <div>Testimonial: {{ homeData?.testimonial ? '✅' : '❌' }}</div>
      <div>CTA: {{ homeData?.cta ? '✅' : '❌' }}</div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'

interface Props {
  isDev: boolean
  homeStrategy: string
  isWagtailEnabled: boolean
  migrationStatus: string
  homeData?: any
  homeError?: string | null
  isLoading?: boolean
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

const props = withDefaults(defineProps<Props>(), {
  homeData: null,
  homeError: null,
  isLoading: false,
  apiUrl: 'http://localhost:8000',
  lastUpdated: null
})

const emit = defineEmits<Emits>()

const handleRefresh = () => {
  emit('refresh')
}

const handleRefreshData = () => {
  emit('refreshData')
}
</script>

