<template>
  <div v-if="isEnabled" class="dev-tools" :class="{ 'dev-tools--visible': isVisible }">
    <!-- Toggle Button -->
    <button 
      class="dev-tools__toggle"
      @click="toggleVisibility"
      :title="isVisible ? 'Hide DevTools' : 'Show DevTools (Ctrl+D)'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </button>

    <!-- DevTools Panel -->
    <div v-if="isVisible" class="dev-tools__panel">
      <!-- Header -->
      <div class="dev-tools__header">
        <h3 class="dev-tools__title">DevTools</h3>
        <div class="dev-tools__actions">
          <button @click="clearAllData" class="dev-tools__action" title="Clear All Data">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </button>
          <button @click="clearAllData" class="dev-tools__action" title="Clear All Data">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <button @click="toggleVisibility" class="dev-tools__action" title="Close">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="dev-tools__tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="setActiveTab(tab.id as 'errors' | 'logs' | 'performance')"
          class="dev-tools__tab"
          :class="{ 'dev-tools__tab--active': activeTab === tab.id }"
        >
          {{ tab.label }}
          <span v-if="tab.count > 0" class="dev-tools__tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Content -->
      <div class="dev-tools__content">
        <!-- Logs Tab -->
        <div v-if="activeTab === 'logs'" class="dev-tools__tab-content">
          <div class="dev-tools__filters">
            <select v-model="logLevelFilter" class="dev-tools__filter">
              <option value="">All Levels</option>
              <option value="log">Log</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
            <button @click="clearLogs" class="dev-tools__clear-btn">Clear Logs</button>
          </div>
          <div class="dev-tools__logs">
            <div 
              v-for="log in displayLogs" 
              :key="log.id"
              class="dev-tools__log"
              :class="`dev-tools__log--${log.level}`"
            >
              <span class="dev-tools__log-time">{{ formatTime(log.timestamp) }}</span>
              <span class="dev-tools__log-level">{{ log.level.toUpperCase() }}</span>
              <span class="dev-tools__log-message">{{ log.message }}</span>
              <span v-if="log.component" class="dev-tools__log-component">{{ log.component }}</span>
            </div>
          </div>
        </div>

        <!-- Performance Tab -->
        <div v-if="activeTab === 'performance'" class="dev-tools__tab-content">
          <div class="dev-tools__metrics">
            <div 
              v-for="(value, name) in performanceMetrics" 
              :key="name"
              class="dev-tools__metric"
            >
              <span class="dev-tools__metric-name">{{ name }}</span>
              <span class="dev-tools__metric-value">{{ formatMetricValue(value) }}</span>
            </div>
          </div>
          <button @click="updatePerformanceMetrics" class="dev-tools__clear-btn">Refresh Metrics</button>
        </div>


        <!-- Errors Tab -->
        <div v-if="activeTab === 'errors'" class="dev-tools__tab-content">
          <div class="dev-tools__errors">
            <div 
              v-for="error in recentErrors" 
              :key="error.timestamp"
              class="dev-tools__error"
              :class="`dev-tools__error--medium`"
            >
              <div class="dev-tools__error-header">
                <span class="dev-tools__error-time">{{ formatTime(error.timestamp) }}</span>
                <span class="dev-tools__error-severity">{{ error.name.toUpperCase() }}</span>
              </div>
              <div class="dev-tools__error-message">{{ error.message }}</div>
              <div v-if="'component' in error && error.component" class="dev-tools__error-component">
                Component: {{ error.component }}
              </div>
              <div v-if="error.stack" class="dev-tools__error-stack">
                <pre>{{ error.stack }}</pre>
              </div>
            </div>
          </div>
          <button @click="clearErrors" class="dev-tools__clear-btn">Clear Errors</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDevTools } from '../../composables/useDevTools'
import { usePerformance } from '../../composables/usePerformance'

const {
  isEnabled,
  isVisible,
  activeTab,
  errorCount,
  logCount,
  recentErrors,
  recentLogs,
  toggleVisibility,
  setActiveTab,
  clearLogs,
  clearErrors
} = useDevTools()

const {
  metrics: performanceMetrics,
  updatePerformanceMetrics
} = usePerformance()

const logLevelFilter = ref<string>('')

// Computed properties
const tabs = computed(() => [
  { id: 'logs', label: 'Logs', count: logCount.value },
  { id: 'performance', label: 'Performance', count: 0 },
  { id: 'errors', label: 'Errors', count: errorCount.value }
])

// Use the filtered logs from the composable
const displayLogs = computed(() => {
  if (!logLevelFilter.value) return recentLogs.value
  return recentLogs.value.filter((log: any) => log.level === logLevelFilter.value)
})

// Methods
const formatTime = (timestamp: string | number): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)
  return date.toLocaleTimeString()
}

const formatMetricValue = (value: number): string => {
  if (value < 1000) return `${value.toFixed(2)}ms`
  return `${(value / 1000).toFixed(2)}s`
}

// Remove unused function

const clearAllData = () => {
  clearLogs()
  clearErrors()
}
</script>

<style scoped>
.dev-tools {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}

.dev-tools__toggle {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10000;
}

.dev-tools__toggle:hover {
  background: #2a2a2a;
  transform: scale(1.1);
}

.dev-tools__panel {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 500px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.dev-tools--visible .dev-tools__panel {
  transform: translateY(0);
}

.dev-tools__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #333;
  background: #2a2a2a;
}

.dev-tools__title {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.dev-tools__actions {
  display: flex;
  gap: 8px;
}

.dev-tools__action {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.dev-tools__action:hover {
  background: #333;
  color: #fff;
}

.dev-tools__tabs {
  display: flex;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.dev-tools__tab {
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.dev-tools__tab:hover {
  background: #333;
  color: #fff;
}

.dev-tools__tab--active {
  background: #1a1a1a;
  color: #fff;
}

.dev-tools__tab-count {
  background: #666;
  color: #fff;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  margin-left: 4px;
}

.dev-tools__tab--active .dev-tools__tab-count {
  background: #007acc;
}

.dev-tools__content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dev-tools__tab-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dev-tools__filters {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid #333;
  background: #2a2a2a;
}

.dev-tools__filter {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.dev-tools__clear-btn {
  background: #dc3545;
  border: none;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dev-tools__clear-btn:hover {
  background: #c82333;
}

.dev-tools__logs {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__log {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  margin-bottom: 2px;
  border-radius: 4px;
  font-size: 11px;
}

.dev-tools__log--log { background: #1a1a1a; color: #fff; }
.dev-tools__log--info { background: #0c5460; color: #fff; }
.dev-tools__log--warn { background: #856404; color: #fff; }
.dev-tools__log--error { background: #721c24; color: #fff; }
.dev-tools__log--debug { background: #383d41; color: #fff; }

.dev-tools__log-time {
  color: #666;
  font-size: 10px;
  min-width: 60px;
}

.dev-tools__log-level {
  font-weight: 600;
  min-width: 40px;
}

.dev-tools__log-message {
  flex: 1;
  word-break: break-word;
}

.dev-tools__log-component {
  color: #007acc;
  font-size: 10px;
}

.dev-tools__metrics {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 2px;
  background: #1a1a1a;
  border-radius: 4px;
  font-size: 11px;
}

.dev-tools__metric-name {
  color: #ccc;
}

.dev-tools__metric-value {
  color: #fff;
  font-weight: 600;
}

.dev-tools__component-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__component {
  margin-bottom: 8px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.dev-tools__component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.dev-tools__component-name {
  color: #fff;
  font-weight: 600;
  font-size: 11px;
}

.dev-tools__component-time {
  color: #007acc;
  font-size: 10px;
}

.dev-tools__component-state {
  padding: 8px;
  background: #1a1a1a;
}

.dev-tools__component-state pre {
  color: #ccc;
  font-size: 10px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.dev-tools__store-state {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__store {
  margin-bottom: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.dev-tools__store-name {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  padding: 8px;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.dev-tools__store-data {
  color: #ccc;
  font-size: 10px;
  margin: 0;
  padding: 8px;
  background: #1a1a1a;
  white-space: pre-wrap;
  word-break: break-word;
}

.dev-tools__network-requests {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__request {
  margin-bottom: 4px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.dev-tools__request--success { border-left: 3px solid #28a745; }
.dev-tools__request--warning { border-left: 3px solid #ffc107; }
.dev-tools__request--error { border-left: 3px solid #dc3545; }

.dev-tools__request-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: #2a2a2a;
  font-size: 11px;
}

.dev-tools__request-method {
  background: #007acc;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.dev-tools__request-url {
  flex: 1;
  color: #fff;
  word-break: break-all;
}

.dev-tools__request-duration {
  color: #007acc;
  font-size: 10px;
  min-width: 50px;
  text-align: right;
}

.dev-tools__request-status {
  padding: 4px 8px;
  background: #1a1a1a;
  color: #ccc;
  font-size: 10px;
}

.dev-tools__errors {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.dev-tools__error {
  margin-bottom: 8px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.dev-tools__error--low { border-left: 3px solid #6c757d; }
.dev-tools__error--medium { border-left: 3px solid #ffc107; }
.dev-tools__error--high { border-left: 3px solid #fd7e14; }
.dev-tools__error--critical { border-left: 3px solid #dc3545; }

.dev-tools__error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.dev-tools__error-time {
  color: #666;
  font-size: 10px;
}

.dev-tools__error-severity {
  color: #fff;
  font-size: 10px;
  font-weight: 600;
}

.dev-tools__error-message {
  padding: 8px;
  background: #1a1a1a;
  color: #fff;
  font-size: 11px;
  word-break: break-word;
}

.dev-tools__error-component {
  padding: 4px 8px;
  background: #2a2a2a;
  color: #007acc;
  font-size: 10px;
  border-top: 1px solid #333;
}

.dev-tools__error-stack {
  padding: 8px;
  background: #1a1a1a;
  border-top: 1px solid #333;
}

.dev-tools__error-stack pre {
  color: #ccc;
  font-size: 10px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Scrollbar styling */
.dev-tools__logs::-webkit-scrollbar,
.dev-tools__metrics::-webkit-scrollbar,
.dev-tools__component-tree::-webkit-scrollbar,
.dev-tools__store-state::-webkit-scrollbar,
.dev-tools__network-requests::-webkit-scrollbar,
.dev-tools__errors::-webkit-scrollbar {
  width: 6px;
}

.dev-tools__logs::-webkit-scrollbar-track,
.dev-tools__metrics::-webkit-scrollbar-track,
.dev-tools__component-tree::-webkit-scrollbar-track,
.dev-tools__store-state::-webkit-scrollbar-track,
.dev-tools__network-requests::-webkit-scrollbar-track,
.dev-tools__errors::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.dev-tools__logs::-webkit-scrollbar-thumb,
.dev-tools__metrics::-webkit-scrollbar-thumb,
.dev-tools__component-tree::-webkit-scrollbar-thumb,
.dev-tools__store-state::-webkit-scrollbar-thumb,
.dev-tools__network-requests::-webkit-scrollbar-thumb,
.dev-tools__errors::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

.dev-tools__logs::-webkit-scrollbar-thumb:hover,
.dev-tools__metrics::-webkit-scrollbar-thumb:hover,
.dev-tools__component-tree::-webkit-scrollbar-thumb:hover,
.dev-tools__store-state::-webkit-scrollbar-thumb:hover,
.dev-tools__network-requests::-webkit-scrollbar-thumb:hover,
.dev-tools__errors::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
