<template>
  <div v-if="isEnabled" class="performance-monitor" :class="{ 'performance-monitor--visible': isVisible }">
    <!-- Toggle Button -->
    <button 
      class="performance-monitor__toggle"
      @click="toggleVisibility"
      :title="isVisible ? 'Hide Performance Monitor' : 'Show Performance Monitor'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    </button>

    <!-- Performance Panel -->
    <div v-if="isVisible" class="performance-monitor__panel">
      <!-- Header -->
      <div class="performance-monitor__header">
        <h3 class="performance-monitor__title">Performance Monitor</h3>
        <div class="performance-monitor__actions">
          <button @click="refreshMetrics" class="performance-monitor__action" title="Refresh">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
          <button @click="clearMetrics" class="performance-monitor__action" title="Clear">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <button @click="toggleVisibility" class="performance-monitor__action" title="Close">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="performance-monitor__content">
        <!-- Performance Score -->
        <div class="performance-monitor__score">
          <div class="performance-monitor__score-circle">
            <svg class="performance-monitor__score-svg" viewBox="0 0 100 100">
              <circle
                class="performance-monitor__score-bg"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#333"
                stroke-width="8"
              />
              <circle
                class="performance-monitor__score-fill"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                :stroke="scoreColor"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="scoreOffset"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div class="performance-monitor__score-text">
              <span class="performance-monitor__score-value">{{ performanceScore }}</span>
              <span class="performance-monitor__score-label">Score</span>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="performance-monitor__section">
          <h4 class="performance-monitor__section-title">Performance</h4>
          <div class="performance-monitor__metrics">
            <div class="performance-monitor__metric">
              <span class="performance-monitor__metric-label">Render Time</span>
              <span class="performance-monitor__metric-value">
                {{ formatTime(metrics.renderTime) }}
              </span>
            </div>
            <div class="performance-monitor__metric">
              <span class="performance-monitor__metric-label">Load Time</span>
              <span class="performance-monitor__metric-value">
                {{ formatTime(metrics.loadTime) }}
              </span>
            </div>
            <div class="performance-monitor__metric">
              <span class="performance-monitor__metric-label">Memory Usage</span>
              <span class="performance-monitor__metric-value">
                {{ metrics.memoryUsage.toFixed(2) }}MB
              </span>
            </div>
            <div class="performance-monitor__metric">
              <span class="performance-monitor__metric-label">Bundle Size</span>
              <span class="performance-monitor__metric-value">
                {{ metrics.bundleSize }}KB
              </span>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="recommendations.length > 0" class="performance-monitor__section">
          <h4 class="performance-monitor__section-title">Recommendations</h4>
          <div class="performance-monitor__recommendations">
            <div 
              v-for="(recommendation, index) in recommendations" 
              :key="index"
              class="performance-monitor__recommendation"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ recommendation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { usePerformance } from '../../composables/usePerformance'

const {
  metrics,
  performanceScore,
  getPerformanceRecommendations,
  updatePerformanceMetrics
} = usePerformance()

const isEnabled = ref(import.meta.env.DEV)
const isVisible = ref(false)

// Computed properties
const circumference = computed(() => 2 * Math.PI * 40)
const scoreOffset = computed(() => circumference.value - (performanceScore.value / 100) * circumference.value)
const scoreColor = computed(() => {
  if (performanceScore.value >= 90) return '#28a745'
  if (performanceScore.value >= 70) return '#ffc107'
  return '#dc3545'
})

// Remove unused computed property

const recommendations = computed(() => getPerformanceRecommendations())

// Methods
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const refreshMetrics = () => {
  // Force refresh of metrics
  updatePerformanceMetrics()
}

const clearMetrics = () => {
  // Clear metrics by updating them
  updatePerformanceMetrics()
}

const formatTime = (value: number): string => {
  if (value < 1000) return `${value.toFixed(0)}ms`
  return `${(value / 1000).toFixed(2)}s`
}

// Remove unused functions

// Auto-start monitoring on mount
onMounted(() => {
  if (isEnabled.value) {
    updatePerformanceMetrics()
  }
})
</script>

<style scoped>
.performance-monitor {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}

.performance-monitor__toggle {
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

.performance-monitor__toggle:hover {
  background: #2a2a2a;
  transform: scale(1.1);
}

.performance-monitor__panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  max-height: 600px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.performance-monitor--visible .performance-monitor__panel {
  transform: translateX(0);
}

.performance-monitor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #333;
  background: #2a2a2a;
}

.performance-monitor__title {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.performance-monitor__actions {
  display: flex;
  gap: 8px;
}

.performance-monitor__action {
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

.performance-monitor__action:hover {
  background: #333;
  color: #fff;
}

.performance-monitor__content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.performance-monitor__score {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.performance-monitor__score-circle {
  position: relative;
  width: 100px;
  height: 100px;
}

.performance-monitor__score-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.performance-monitor__score-bg {
  stroke: #333;
}

.performance-monitor__score-fill {
  transition: stroke-dashoffset 0.3s ease;
}

.performance-monitor__score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}

.performance-monitor__score-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
}

.performance-monitor__score-label {
  display: block;
  font-size: 10px;
  color: #ccc;
  margin-top: 2px;
}

.performance-monitor__section {
  margin-bottom: 20px;
}

.performance-monitor__section-title {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.performance-monitor__metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.performance-monitor__metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: #2a2a2a;
  border-radius: 4px;
  font-size: 11px;
}

.performance-monitor__metric-label {
  color: #ccc;
}

.performance-monitor__metric-value {
  color: #fff;
  font-weight: 600;
}

.performance-monitor__metric-value--good {
  color: #28a745;
}

.performance-monitor__metric-value--warning {
  color: #ffc107;
}

.performance-monitor__metric-value--poor {
  color: #dc3545;
}

.performance-monitor__memory {
  background: #2a2a2a;
  border-radius: 4px;
  padding: 8px;
}

.performance-monitor__memory-bar {
  width: 100%;
  height: 8px;
  background: #333;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.performance-monitor__memory-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
  transition: width 0.3s ease;
}

.performance-monitor__memory-text {
  color: #ccc;
  font-size: 10px;
  text-align: center;
}

.performance-monitor__recommendations {
  background: #2a2a2a;
  border-radius: 4px;
  padding: 8px;
}

.performance-monitor__recommendation {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
  color: #fff;
  font-size: 11px;
  line-height: 1.4;
}

.performance-monitor__recommendation svg {
  color: #ffc107;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Scrollbar styling */
.performance-monitor__content::-webkit-scrollbar {
  width: 6px;
}

.performance-monitor__content::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.performance-monitor__content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

.performance-monitor__content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
