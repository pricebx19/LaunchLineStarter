<template>
  <DebugPanel
    :is-dev="isDev ?? false"
    title="Contact Page Status"
    :strategy="contactStrategy"
    :is-wagtail-enabled="isWagtailEnabled ?? false"
    :migration-status="migrationStatus"
    :has-data="false"
    :has-error="false"
    :is-loading="false"
    :api-url="'http://localhost:8000'"
    :last-updated="null"
    feature-flag-name="WAGTAIL_CONTACT"
    @refresh="handleRefresh"
    @refresh-data="() => {}"
  >
    <template #debug-data>
      <div>Contact form integration ready</div>
      <div>Wagtail contact page available</div>
    </template>
  </DebugPanel>
</template>

<script setup lang="ts">
import DebugPanel from '../utility/DebugPanel.vue'
import type { DebugPanelProps } from '../../types'

interface Props extends DebugPanelProps {
  contactStrategy: string
  migrationStatus: string
}

interface Emits {
  (e: 'refresh'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleRefresh = () => {
  emit('refresh')
}
</script>
