<template>
  <DebugPanel
    :is-dev="isDev"
    title="About Page Status"
    :strategy="aboutStrategy"
    :is-wagtail-enabled="isWagtailEnabled"
    :migration-status="migrationStatus"
    :has-data="!!aboutData"
    :has-error="!!aboutError"
    :is-loading="isLoading ?? false"
    :api-url="apiUrl ?? ''"
    :last-updated="lastUpdated ?? null"
    feature-flag-name="WAGTAIL_ABOUT"
    @refresh="handleRefresh"
    @refresh-data="handleRefreshData"
  >
    <template #debug-data>
      <div>Hero: {{ aboutData?.hero ? '✅' : '❌' }}</div>
      <div>Features: {{ aboutData?.features ? '✅' : '❌' }}</div>
      <div>Testimonial: {{ aboutData?.testimonial ? '✅' : '❌' }}</div>
      <div>CTA: {{ aboutData?.cta ? '✅' : '❌' }}</div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'

interface Props {
  isDev: boolean
  aboutStrategy: string
  isWagtailEnabled: boolean
  migrationStatus: string
  aboutData?: any
  aboutError?: string | null
  isLoading?: boolean
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

withDefaults(defineProps<Props>(), {
  aboutData: null,
  aboutError: null,
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
