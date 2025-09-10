<template>
  <div v-if="isDev" class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex">
    <!-- Debug Panel -->
    <div 
      class="bg-gray-800 text-white shadow-lg transition-all duration-300 overflow-hidden flex"
      :class="isExpanded ? 'w-80' : 'w-0'"
    >
      <div class="p-4 min-w-80 flex-1">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-semibold text-sm">{{ title || 'Debug Panel' }}</h4>
        </div>

        <!-- Status Info -->
        <div class="text-xs space-y-2 mb-4">
          <div class="flex justify-between">
            <span>Strategy:</span>
            <span class="font-mono">{{ strategy || 'Unknown' }}</span>
          </div>
          <div class="flex justify-between">
            <span>Wagtail:</span>
            <span :class="isWagtailEnabled ? 'text-green-400' : 'text-red-400'">
              {{ isWagtailEnabled ? '✅' : '❌' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Migration:</span>
            <span class="font-mono">{{ migrationStatus || 'Unknown' }}</span>
          </div>
          <div v-if="hasData" class="flex justify-between">
            <span>Data:</span>
            <span class="text-green-400">✅ Loaded</span>
          </div>
          <div v-if="hasError" class="flex justify-between">
            <span>Error:</span>
            <span class="text-red-400">❌</span>
          </div>
          <div v-if="isLoading" class="flex justify-between">
            <span>Loading:</span>
            <span class="text-yellow-400">⏳</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2 mb-4">
          <button 
            @click="handleRefresh" 
            class="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Flags
          </button>
          <button 
            @click="handleRefreshData" 
            class="w-full px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
        
        <!-- Debug Information Panel -->
        <div class="border-t border-gray-600 pt-3">
          <button 
            @click="toggleDebugInfo" 
            class="w-full flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors mb-2"
          >
            <span>Debug Info</span>
            <svg 
              class="w-3 h-3 transition-transform duration-200"
              :class="{ 'rotate-180': showDebugInfo }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          
          <div v-if="showDebugInfo" class="text-xs space-y-2 text-gray-300">
            <div>
              <div class="font-semibold text-white mb-1">Feature Flags:</div>
              <div class="ml-2 space-y-1">
                <div>{{ featureFlagName || 'Unknown' }}: {{ isWagtailEnabled ? 'ON' : 'OFF' }}</div>
                <div>API URL: {{ apiUrl || 'Not set' }}</div>
                <div>Last Updated: {{ lastUpdated || 'Never' }}</div>
              </div>
            </div>
            <div v-if="hasData">
              <div class="font-semibold text-white mb-1">Wagtail Data:</div>
              <div class="ml-2 space-y-1">
                <slot name="debug-data" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggle Button -->
    <button 
      @click="togglePanel"
      class="bg-gray-800 text-white p-2 rounded-l-lg shadow-lg hover:bg-gray-700 transition-all duration-300 flex-shrink-0"
      :class="{ 'bg-gray-700': isExpanded }"
    >
      <svg v-if="!isExpanded" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isDev?: boolean
  title?: string
  strategy?: string
  isWagtailEnabled?: boolean
  migrationStatus?: string
  hasData?: boolean
  hasError?: boolean
  isLoading?: boolean
  featureFlagName?: string
  apiUrl?: string
  lastUpdated?: string | null
}

interface Emits {
  (e: 'refresh'): void
  (e: 'refreshData'): void
}

const props = withDefaults(defineProps<Props>(), {
  isDev: false,
  hasData: false,
  hasError: false,
  isLoading: false,
  apiUrl: 'http://localhost:8000',
  lastUpdated: null
})

// Use props to avoid unused variable warning
const { isDev, title, strategy, isWagtailEnabled, migrationStatus, hasData, hasError, isLoading, featureFlagName, apiUrl, lastUpdated } = props

const emit = defineEmits<Emits>()

const isExpanded = ref(false)
const showDebugInfo = ref(false)

const togglePanel = () => {
  isExpanded.value = !isExpanded.value
}

const handleRefresh = () => {
  emit('refresh')
}

const handleRefreshData = () => {
  emit('refreshData')
}

const toggleDebugInfo = () => {
  showDebugInfo.value = !showDebugInfo.value
}
</script>

<script lang="ts">
export default {
  name: 'DebugPanel'
}
</script>

<style scoped>
/* Side panel styling */
.bg-gray-800 {
  backdrop-filter: blur(10px);
  background: rgba(31, 41, 55, 0.95);
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

/* Panel slide animation */
.transition-all {
  transition: width 0.3s ease-in-out;
}

/* Debug info panel animation */
.border-t {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 300px;
  }
}

/* Ensure the panel doesn't interfere with page content */
.fixed {
  pointer-events: auto;
}

/* Debug info expand animation */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
