<template>
  <DebugPanel
    :is-dev="isDev"
    title="Blog Page Status"
    :strategy="blogStrategy"
    :is-wagtail-enabled="isWagtailEnabled"
    :migration-status="migrationStatus"
    :has-data="!!blogData"
    :has-error="!!blogError"
    :is-loading="isLoading"
    :api-url="apiUrl"
    :last-updated="lastUpdated"
    feature-flag-name="WAGTAIL_BLOG"
    @refresh="handleRefresh"
    @refresh-data="handleRefreshData"
  >
    <template #debug-data>
      <div>Hero: {{ blogData?.hero ? '✅' : '❌' }}</div>
      <div>Text: {{ blogData?.text ? '✅' : '❌' }}</div>
      <div>CTA: {{ blogData?.cta ? '✅' : '❌' }}</div>
      <div>Image: {{ blogData?.image ? '✅' : '❌' }}</div>
      <div>Blog Posts: {{ blogData?.blog_posts ? '✅' : '❌' }}</div>
      <div>Intro: {{ blogData?.intro ? '✅' : '❌' }}</div>
      <div v-if="blogData?.blog_posts" class="mt-1">
        <div><strong>Blog Posts Count:</strong> {{ blogData.blog_posts.length }}</div>
      </div>
      <div v-if="blogData?.intro" class="mt-1">
        <div><strong>Legacy Intro:</strong> {{ blogData.intro.substring(0, 50) }}...</div>
      </div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'

interface Props {
  isDev: boolean
  blogStrategy: string
  isWagtailEnabled: boolean
  migrationStatus: string
  blogData?: any
  blogError?: string | null
  isLoading?: boolean
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

const props = withDefaults(defineProps<Props>(), {
  blogData: null,
  blogError: null,
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