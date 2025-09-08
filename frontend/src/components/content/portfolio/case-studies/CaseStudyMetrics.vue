<template>
  <div class="metrics-section">
    <div class="metrics-grid">
      <div class="metric-card metric-1">
        <div class="metric-value">{{ metric1.value }}</div>
        <div class="metric-label">{{ metric1.label }}</div>
      </div>
      <div class="metric-card metric-2">
        <div class="metric-value">{{ metric2.value }}</div>
        <div class="metric-label">{{ metric2.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Metric {
  value: string
  label: string
}

defineProps<{
  metric1: Metric
  metric2: Metric
}>()
</script>

<style scoped>
.metrics-section {
  margin-bottom: 1.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.metric-card:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.metric-card:hover::before {
  opacity: 1;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.metric-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  line-height: 1.3;
}

.metric-1 .metric-value {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metric-2 .metric-value {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
