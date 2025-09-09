<template>
  <DebugPanel
    :is-dev="isDev"
    title="Services Page Status"
    :strategy="servicesStrategy"
    :is-wagtail-enabled="isWagtailEnabled"
    :migration-status="migrationStatus"
    :has-data="!!wagtailData"
    :has-error="!!wagtailError"
    :is-loading="isLoading"
    :api-url="apiUrl"
    :last-updated="lastUpdated"
    feature-flag-name="WAGTAIL_SERVICES"
    @refresh="handleRefresh"
    @refresh-data="handleRefreshData"
  >
    <template #debug-data>
      <div>Hero: {{ wagtailData?.hero ? '✅' : '❌' }}</div>
      <div>Service Packages: {{ wagtailData?.service_packages ? '✅' : '❌' }}</div>
      <div>A La Carte: {{ wagtailData?.ala_carte_services ? '✅' : '❌' }}</div>
      <div>FAQ: {{ wagtailData?.faq_section ? '✅' : '❌' }}</div>
      <div>CTA: {{ wagtailData?.cta ? '✅' : '❌' }}</div>
      <div v-if="wagtailData?.service_packages" class="mt-1">
        <div><strong>Packages Count:</strong> {{ wagtailData.service_packages.packages?.length || 0 }}</div>
      </div>
      <div v-if="wagtailData?.ala_carte_services" class="mt-1">
        <div><strong>Services Count:</strong> {{ wagtailData.ala_carte_services.services?.length || 0 }}</div>
      </div>
      <div v-if="wagtailData?.faq_section" class="mt-1">
        <div><strong>FAQs Count:</strong> {{ wagtailData.faq_section.faqs?.length || 0 }}</div>
      </div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'

interface Props {
  isDev: boolean
  servicesStrategy: string
  isWagtailEnabled: boolean
  migrationStatus: string
  wagtailData?: any
  wagtailError?: string | null
  isLoading?: boolean
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

const props = withDefaults(defineProps<Props>(), {
  wagtailData: null,
  wagtailError: null,
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