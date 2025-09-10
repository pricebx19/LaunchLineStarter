<template>
  <div v-if="isVisible" class="dev-tools">
    <div class="dev-tools__header">
      <h3>Development Tools</h3>
      <button @click="toggleVisibility" class="dev-tools__close">×</button>
    </div>
    
    <div class="dev-tools__tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="setActiveTab(tab.id as 'errors' | 'logs' | 'performance')"
        :class="['dev-tools__tab', { 'dev-tools__tab--active': activeTab === tab.id }]"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="dev-tools__tab-count">{{ tab.count }}</span>
      </button>
    </div>
    
    <div class="dev-tools__content">
      <!-- Errors Tab -->
      <div v-if="activeTab === 'errors'" class="dev-tools__panel">
        <div class="dev-tools__panel-header">
          <h4>Errors ({{ errorCount }})</h4>
          <button @click="clearErrors" class="dev-tools__button dev-tools__button--danger">
            Clear All
          </button>
        </div>
        
        <div v-if="errors.length === 0" class="dev-tools__empty">
          No errors found
        </div>
        
        <div v-else class="dev-tools__error-list">
          <div 
            v-for="error in recentErrors" 
            :key="error.timestamp"
            class="dev-tools__error-item"
          >
            <div class="dev-tools__error-header">
              <span class="dev-tools__error-name">{{ error.name }}</span>
              <span class="dev-tools__error-time">{{ formatTime(error.timestamp) }}</span>
            </div>
            <div class="dev-tools__error-message">{{ error.message }}</div>
            <div v-if="error.stack" class="dev-tools__error-stack">
              <details>
                <summary>Stack Trace</summary>
                <pre>{{ error.stack }}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Logs Tab -->
      <div v-if="activeTab === 'logs'" class="dev-tools__panel">
        <div class="dev-tools__panel-header">
          <h4>Logs ({{ logCount }})</h4>
        </div>
        
        <div v-if="logs.length === 0" class="dev-tools__empty">
          No logs found
        </div>
        
        <div v-else class="dev-tools__log-list">
          <div 
            v-for="log in recentLogs" 
            :key="log.timestamp"
            :class="['dev-tools__log-item', `dev-tools__log-item--${log.level}`]"
          >
            <div class="dev-tools__log-header">
              <span class="dev-tools__log-level">{{ log.level.toUpperCase() }}</span>
              <span class="dev-tools__log-time">{{ formatTime(log.timestamp as any) }}</span>
            </div>
            <div class="dev-tools__log-message">{{ log.message }}</div>
            <div v-if="log.data" class="dev-tools__log-data">
              <pre>{{ JSON.stringify(log.data, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Performance Tab -->
      <div v-if="activeTab === 'performance'" class="dev-tools__panel">
        <div class="dev-tools__panel-header">
          <h4>Performance</h4>
          <button @click="updatePerformanceMetrics" class="dev-tools__button">
            Refresh
          </button>
        </div>
        
        <div class="dev-tools__metrics">
          <div class="dev-tools__metric">
            <label>Render Time</label>
            <span>{{ performanceMetrics.renderTime.toFixed(2) }}ms</span>
          </div>
          <div class="dev-tools__metric">
            <label>Memory Usage</label>
            <span>{{ performanceMetrics.memoryUsage.toFixed(2) }}MB</span>
          </div>
          <div class="dev-tools__metric">
            <label>Bundle Size</label>
            <span>{{ performanceMetrics.bundleSize }}KB</span>
          </div>
        </div>
        
        <div class="dev-tools__metrics">
          <div class="dev-tools__metric">
            <label>Total Errors</label>
            <span>{{ errorMetrics.totalErrors }}</span>
          </div>
          <div class="dev-tools__metric">
            <label>Error Rate</label>
            <span>{{ errorMetrics.errorRate.toFixed(2) }}/min</span>
          </div>
          <div class="dev-tools__metric">
            <label>Critical Errors</label>
            <span>{{ errorMetrics.errorsBySeverity.critical }}</span>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="dev-tools__footer">
      <button @click="clearErrors" class="dev-tools__button">
        Clear All
      </button>
      <span class="dev-tools__shortcut">Ctrl+Shift+D to toggle</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDevTools } from '../composables/useDevTools'
import { usePerformance } from '../composables/usePerformance'

const {
  isVisible,
  activeTab,
  errorCount,
  logCount,
  recentErrors,
  recentLogs,
  errors,
  logs,
  metrics: errorMetrics,
  toggleVisibility,
  setActiveTab,
  clearErrors
} = useDevTools()

const {
  metrics: performanceMetrics,
  updatePerformanceMetrics
} = usePerformance()

const tabs = computed(() => [
  { id: 'errors', label: 'Errors', count: errorCount.value },
  { id: 'logs', label: 'Logs', count: logCount.value },
  { id: 'performance', label: 'Performance', count: 0 }
])

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>

<style scoped>
.dev-tools {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #1a1a1a;
  color: #fff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #333;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.dev-tools__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #333;
}

.dev-tools__header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.dev-tools__close {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dev-tools__close:hover {
  background: #444;
  border-radius: 4px;
}

.dev-tools__tabs {
  display: flex;
  background: #2d2d2d;
  border-bottom: 1px solid #333;
}

.dev-tools__tab {
  flex: 1;
  background: none;
  border: none;
  color: #ccc;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.dev-tools__tab:hover {
  background: #444;
}

.dev-tools__tab--active {
  background: #007bff;
  color: #fff;
}

.dev-tools__tab-count {
  background: #dc3545;
  color: #fff;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  min-width: 16px;
  text-align: center;
}

.dev-tools__content {
  flex: 1;
  overflow-y: auto;
}

.dev-tools__panel {
  padding: 1rem;
}

.dev-tools__panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.dev-tools__panel-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.dev-tools__button {
  background: #007bff;
  border: none;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}

.dev-tools__button:hover {
  background: #0056b3;
}

.dev-tools__button--danger {
  background: #dc3545;
}

.dev-tools__button--danger:hover {
  background: #c82333;
}

.dev-tools__empty {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.dev-tools__error-list,
.dev-tools__log-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dev-tools__error-item,
.dev-tools__log-item {
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem;
}

.dev-tools__error-header,
.dev-tools__log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.dev-tools__error-name,
.dev-tools__log-level {
  font-weight: 600;
  color: #ff6b6b;
}

.dev-tools__error-time,
.dev-tools__log-time {
  color: #666;
  font-size: 10px;
}

.dev-tools__error-message,
.dev-tools__log-message {
  color: #ccc;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.dev-tools__error-stack,
.dev-tools__log-data {
  margin-top: 0.5rem;
}

.dev-tools__error-stack details,
.dev-tools__log-data pre {
  background: #1a1a1a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 10px;
  color: #ff6b6b;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.dev-tools__log-data pre {
  color: #ccc;
}

.dev-tools__log-item--debug {
  border-left: 3px solid #6c757d;
}

.dev-tools__log-item--info {
  border-left: 3px solid #007bff;
}

.dev-tools__log-item--warn {
  border-left: 3px solid #ffc107;
}

.dev-tools__log-item--error {
  border-left: 3px solid #dc3545;
}

.dev-tools__log-item--fatal {
  border-left: 3px solid #dc3545;
  background: #2d1b1b;
}

.dev-tools__metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dev-tools__metric {
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem;
  text-align: center;
}

.dev-tools__metric label {
  display: block;
  color: #666;
  font-size: 10px;
  margin-bottom: 0.25rem;
}

.dev-tools__metric span {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.dev-tools__state-info,
.dev-tools__network-info {
  color: #666;
  text-align: center;
  padding: 2rem;
}

.dev-tools__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #2d2d2d;
  border-top: 1px solid #333;
}

.dev-tools__shortcut {
  color: #666;
  font-size: 10px;
}

/* Scrollbar styling */
.dev-tools__content::-webkit-scrollbar {
  width: 8px;
}

.dev-tools__content::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.dev-tools__content::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.dev-tools__content::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
