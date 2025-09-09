<template>
  <div 
    :class="`value-info-panel panel-${index + 1}`"
    class="value-info-panel"
  >
    <div class="panel-header">
      <div class="panel-icon">
        <div class="w-6 h-6 text-brand-primary">{{ value.icon }}</div>
      </div>
      <h3 class="panel-title">{{ value.title }}</h3>
      <div class="panel-metrics">
        <div class="metric">
          <span class="metric-value">High</span>
          <span class="metric-label">Impact</span>
        </div>
        <div class="metric">
          <span class="metric-value">Core</span>
          <span class="metric-label">Priority</span>
        </div>
      </div>
    </div>
    
    <div class="panel-content">
      <p class="value-description">{{ value.description }}</p>
      
      <div class="value-principles">
        <h4 class="principles-title">Core Principles</h4>
        <ul class="principles-list">
          <li class="principle-item">
            <div class="principle-dot"></div>
            <span>Integrity in all actions</span>
          </li>
          <li class="principle-item">
            <div class="principle-dot"></div>
            <span>Continuous improvement</span>
          </li>
          <li class="principle-item">
            <div class="principle-dot"></div>
            <span>Client-focused approach</span>
          </li>
        </ul>
      </div>
      
      <div class="value-impact">
        <div class="impact-bar">
          <div class="impact-fill" :style="`width: 85%`"></div>
        </div>
        <span class="impact-text">High impact on project success</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Value } from '../../types/About'

interface Props {
  value: Value
  index: number
}

defineProps<Props>()

defineOptions({
  name: 'ValueInfoPanel'
})
</script>

<style scoped>
/* Value Information Panels */
.value-info-panel {
  position: absolute;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 20px;
  padding: 24px;
  width: 320px;
  margin-left: -160px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(14, 165, 233, 0.1);
  pointer-events: none;
  z-index: 10001;
}

/* Panel positioning - offset from planets to avoid hover interference */
.panel-1 {
  top: 15%;
  right: 15%;
  margin-right: -160px;
}

.panel-2 {
  top: 10%;
  left: 15%;
  margin-left: -160px;
}

.panel-3 {
  top: 90%;
  left: 15%;
  margin-left: -160px;
}

.panel-4 {
  top: 85%;
  right: 15%;
  margin-right: -160px;
}

/* Panel visibility */
.panel-visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
  pointer-events: auto !important;
  transition-delay: 0.2s;
}

/* Ensure panels don't interfere with planet hover */
.value-info-panel:hover {
  opacity: 1 !important;
  transform: translateY(0) !important;
  pointer-events: auto !important;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(14, 165, 233, 0.2);
}

.panel-icon {
  width: 40px;
  height: 40px;
  background: rgba(14, 165, 233, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  flex: 1;
  margin-left: 12px;
}

.panel-metrics {
  display: flex;
  gap: 12px;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0EA5E9;
}

.metric-label {
  display: block;
  font-size: 0.75rem;
  color: #9CA3AF;
  margin-top: 2px;
}

.panel-content {
  color: #D1D5DB;
}

.value-description {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.value-principles {
  margin-bottom: 16px;
}

.principles-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.principles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principle-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.8rem;
}

.principle-dot {
  width: 6px;
  height: 6px;
  background: #0EA5E9;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.value-impact {
  border-top: 1px solid rgba(14, 165, 233, 0.2);
  padding-top: 12px;
}

.impact-bar {
  height: 4px;
  background: rgba(14, 165, 233, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.impact-fill {
  height: 100%;
  background: linear-gradient(90deg, #0EA5E9, #8B5CF6);
  border-radius: 2px;
  transition: width 1s ease-out;
}

.impact-text {
  font-size: 0.75rem;
  color: #9CA3AF;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .value-info-panel {
    width: 280px;
    margin-left: -140px;
  }
}

@media (max-width: 768px) {
  .value-info-panel {
    width: 260px;
    margin-left: -130px;
    padding: 20px;
  }
}

@media (max-width: 640px) {
  .value-info-panel {
    position: relative;
    width: 100%;
    margin: 20px 0 0 0;
    opacity: 1;
    transform: none;
  }
}
</style>
