<template>
  <DebugPanel
    :is-dev="isDev"
    title="Portfolio Page Status"
    :strategy="portfolioStrategy"
    :is-wagtail-enabled="isWagtailEnabled"
    :migration-status="migrationStatus"
    :has-data="!!portfolioData"
    :has-error="!!portfolioError"
    :is-loading="isLoading || false"
    :api-url="apiUrl || 'http://localhost:8000'"
    :last-updated="lastUpdated ?? null"
    feature-flag-name="WAGTAIL_PORTFOLIO"
    @refresh="handleRefresh"
    @refresh-data="handleRefreshData"
  >
    <template #debug-data>
      <div>Hero: {{ portfolioData?.hero ? '✅' : '❌' }}</div>
      <div>Statistics: {{ portfolioData?.statistics ? '✅' : '❌' }}</div>
      <div>Projects: {{ portfolioData?.portfolio_projects ? '✅' : '❌' }}</div>
      <div>Case Studies: {{ portfolioData?.case_studies ? '✅' : '❌' }}</div>
      <div>Technologies: {{ portfolioData?.technologies ? '✅' : '❌' }}</div>
      <div>CTA: {{ portfolioData?.cta ? '✅' : '❌' }}</div>
      <div v-if="portfolioData?.portfolio_projects" class="mt-1">
        <div><strong>Projects Count:</strong> {{ portfolioData.portfolio_projects.projects?.length || 0 }}</div>
      </div>
      <div v-if="portfolioData?.case_studies" class="mt-1">
        <div><strong>Case Studies Count:</strong> {{ portfolioData.case_studies.case_studies?.length || 0 }}</div>
      </div>
      <div v-if="portfolioData?.technologies" class="mt-1">
        <div><strong>Technologies Count:</strong> {{ portfolioData.technologies.technologies?.length || 0 }}</div>
      </div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'

interface Props {
  isDev: boolean
  portfolioStrategy: string
  isWagtailEnabled: boolean
  migrationStatus: string
  portfolioData?: any
  portfolioError?: string | null
  isLoading?: boolean
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

withDefaults(defineProps<Props>(), {
  portfolioData: null,
  portfolioError: null,
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