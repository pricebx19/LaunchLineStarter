<template>
  <div v-if="isDev" class="fixed top-4 right-4 z-50">
    <div class="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h4 class="font-semibold mb-2">Contact Page Status</h4>
      <div class="text-sm space-y-1">
        <div>Strategy: {{ contactStrategy }}</div>
        <div>Wagtail Enabled: {{ isWagtailEnabled ? '✅' : '❌' }}</div>
        <div>Migration Status: {{ migrationStatus }}</div>
      </div>
      <button 
        @click="handleRefresh" 
        class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
      >
        Refresh Flags
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isDev: boolean
  contactStrategy: string
  isWagtailEnabled: boolean
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
