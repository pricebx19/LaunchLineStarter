<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <!-- Close Button -->
        <button class="close-btn" @click="$emit('close')">
          <span class="sr-only">Close</span>
          ✕
        </button>

        <!-- Modal Header -->
        <div class="modal-header">
          <div class="project-icon-large">{{ project.icon }}</div>
          <div class="header-content">
            <h2 class="project-title">{{ project.title }}</h2>
            <div class="project-meta">
              <span class="category-badge">{{ project.category }}</span>
              <span class="status-badge" :class="statusClass">{{ statusText }}</span>
            </div>
          </div>
        </div>

        <!-- Project Details -->
        <div class="modal-body">
          <div class="description-section">
            <h3>Project Overview</h3>
            <p>{{ project.description }}</p>
          </div>

          <!-- Metrics -->
          <div class="metrics-section" v-if="project.metrics">
            <h3>Key Metrics</h3>
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-label">Monthly Visits</div>
                <div class="metric-value">{{ project.metrics.visits }}</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">Conversion Rate</div>
                <div class="metric-value">{{ project.metrics.conversion }}</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">Performance Score</div>
                <div class="metric-value">{{ project.metrics.performance }}</div>
              </div>
            </div>
          </div>

          <!-- Technologies -->
          <div class="tech-section">
            <h3>Technologies Used</h3>
            <div class="tech-grid">
              <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Project Tags -->
          <div class="tags-section">
            <h3>Project Tags</h3>
            <div class="tags-grid">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <div class="project-details">
            <div class="detail">
              <span class="label">Package:</span>
              <span class="value">{{ project.package }}</span>
            </div>
            <div class="detail">
              <span class="label">Timeline:</span>
              <span class="value">{{ project.timeline }}</span>
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn btn-secondary" @click="$emit('close')">
              Close
            </button>
            <button class="btn btn-primary" @click="handleContactClick">
              Start Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import type { Project } from '../../../../data/portfolioData'

interface Props {
  project: Project
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

const statusClass = computed(() => {
  switch (props.project.status) {
    case 'featured':
      return 'status-featured'
    case 'in-progress':
      return 'status-progress'
    default:
      return 'status-completed'
  }
})

const statusText = computed(() => {
  switch (props.project.status) {
    case 'featured':
      return '⭐ Featured'
    case 'in-progress':
      return '🚧 In Progress'
    default:
      return '✅ Completed'
  }
})

const handleOverlayClick = () => {
  emit('close')
}

const handleContactClick = () => {
  router.push('/contact')
  emit('close')
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})

defineOptions({
  name: 'ProjectModal'
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1.5rem;
  max-width: 48rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 1.25rem;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: scale(1.1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
}

.project-icon-large {
  font-size: 4rem;
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
}

.header-content {
  flex: 1;
}

.project-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
}

.project-meta {
  display: flex;
  gap: 1rem;
}

.category-badge {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-featured {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.status-progress {
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.status-completed {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.description-section h3,
.metrics-section h3,
.tech-section h3,
.tags-section h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.description-section p {
  color: #d1d5db;
  line-height: 1.7;
  margin: 0;
  font-size: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.metric-item {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.metric-label {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  color: #3b82f6;
  font-size: 1.5rem;
  font-weight: 700;
}

.tech-grid,
.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.project-tag {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.modal-footer {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid rgba(75, 85, 99, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail .label {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

.detail .value {
  color: white;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-secondary {
  background: rgba(75, 85, 99, 0.3);
  color: #d1d5db;
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.btn-secondary:hover {
  background: rgba(75, 85, 99, 0.5);
  border-color: rgba(75, 85, 99, 0.7);
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: 1px solid transparent;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .project-icon-large {
    font-size: 3rem;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
