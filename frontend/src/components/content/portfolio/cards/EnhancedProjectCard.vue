<template>
  <div 
    class="enhanced-project-card group cursor-pointer"
    :style="{ 
      '--animation-delay': `${animateDelay}ms`,
      '--index': index
    }"
    @click="$emit('select', project)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card-wrapper">
      <!-- Status Badge -->
      <div class="status-badge" :class="statusClass">
        {{ statusText }}
      </div>

      <!-- Project Image/Icon Container -->
      <div class="project-visual">
        <div class="icon-container">
          <div class="project-icon">{{ project.icon }}</div>
          <div class="icon-glow"></div>
        </div>
        
        <!-- Hover Overlay -->
        <div class="hover-overlay">
          <div class="action-buttons">
            <button 
              @click.stop="$emit('preview', project)"
              class="action-btn preview-btn"
              title="Quick Preview"
            >
              👁️
            </button>
            <button 
              @click.stop="$emit('select', project)"
              class="action-btn view-btn"
              title="View Details"
            >
              🚀
            </button>
          </div>
        </div>

        <!-- Metrics Overlay -->
        <div class="metrics-overlay" v-if="project.metrics">
          <div class="metric">
            <span class="metric-value">{{ project.metrics.performance }}</span>
            <span class="metric-label">Performance</span>
          </div>
        </div>
      </div>

      <!-- Project Content -->
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <div class="project-category">{{ project.category }}</div>
        </div>

        <p class="project-description">{{ project.description }}</p>

        <!-- Technology Stack -->
        <div class="tech-stack">
          <div class="tech-label">Built with:</div>
          <div class="tech-tags">
            <span 
              v-for="tech in project.technologies.slice(0, 3)" 
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
            <span v-if="project.technologies.length > 3" class="tech-more">
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
        </div>

        <!-- Project Tags -->
        <div class="project-tags">
          <span 
            v-for="tag in project.tags.slice(0, 2)" 
            :key="tag"
            class="project-tag"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Project Footer -->
        <div class="project-footer">
          <div class="project-meta">
            <span class="package">{{ project.package }}</span>
            <span class="timeline">{{ project.timeline }}</span>
          </div>
          
          <div class="project-metrics" v-if="project.metrics">
            <div class="metric-item">
              <span class="metric-icon">📊</span>
              <span class="metric-text">{{ project.metrics.visits }} visits</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Background Effects -->
      <div class="card-bg-effect"></div>
      <div class="card-border-effect"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  package: string
  timeline: string
  category: string
  image?: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'featured'
  metrics?: {
    visits?: string
    conversion?: string
    performance?: string
  }
}

interface Props {
  project: Project
  index: number
  animateDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  animateDelay: 0
})

defineEmits<{
  select: [project: Project]
  preview: [project: Project]
}>()

const isHovered = ref(false)

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

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

defineOptions({
  name: 'EnhancedProjectCard'
})
</script>

<style scoped>
.enhanced-project-card {
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--animation-delay);
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  will-change: opacity, transform;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.card-wrapper {
  position: relative;
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.card-wrapper:hover {
  transform: translate3d(0, -6px, 0) scale(1.01);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.1),
    0 0 25px rgba(59, 130, 246, 0.15);
}

/* Status Badge */
.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.status-featured {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.status-progress {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-completed {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Project Visual */
.project-visual {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  overflow: hidden;
}

.icon-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon {
  font-size: 4rem;
  z-index: 2;
  position: relative;
  transition: all 0.4s ease;
}

.card-wrapper:hover .project-icon {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.card-wrapper:hover .icon-glow {
  opacity: 1;
}

/* Hover Overlay */
.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  backdrop-filter: blur(5px);
  will-change: opacity;
}

.card-wrapper:hover .hover-overlay {
  opacity: 1;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  transform: translate3d(0, 15px, 0);
  will-change: transform;
}

.card-wrapper:hover .action-btn {
  transform: translate3d(0, 0, 0);
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.3);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translate3d(0, 0, 0) scale(1.05);
}

.preview-btn {
  transition-delay: 0.1s;
}

.view-btn {
  transition-delay: 0.2s;
}

/* Metrics Overlay */
.metrics-overlay {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.3s ease;
}

.card-wrapper:hover .metrics-overlay {
  opacity: 1;
}

.metric {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-value {
  display: block;
  color: #3b82f6;
  font-weight: 700;
  font-size: 1.125rem;
}

.metric-label {
  display: block;
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Project Content */
.project-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  transition: color 0.3s ease;
}

.card-wrapper:hover .project-title {
  color: #60a5fa;
}

.project-category {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.project-description {
  color: #d1d5db;
  line-height: 1.6;
  margin: 0;
  font-size: 0.875rem;
}

/* Technology Stack */
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tech-label {
  color: #9ca3af;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.tech-more {
  background: rgba(107, 114, 128, 0.2);
  color: #9ca3af;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

/* Project Tags */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

/* Project Footer */
.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(75, 85, 99, 0.3);
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.package {
  color: #fbbf24;
  font-weight: 600;
  font-size: 0.875rem;
}

.timeline {
  color: #9ca3af;
  font-size: 0.75rem;
}

.project-metrics {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(75, 85, 99, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.metric-icon {
  font-size: 0.875rem;
}

.metric-text {
  color: #d1d5db;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Background Effects */
.card-bg-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card-wrapper:hover .card-bg-effect {
  opacity: 1;
}

.card-border-effect {
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card-wrapper:hover .card-border-effect {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-content {
    padding: 1rem;
  }
  
  .project-icon {
    font-size: 3rem;
  }
  
  .action-btn {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
}
</style>
