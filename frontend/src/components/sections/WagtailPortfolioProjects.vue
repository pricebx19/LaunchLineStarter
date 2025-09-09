<template>
  <section class="wagtail-portfolio-projects">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="projectsData.heading" class="section-heading">
            {{ projectsData.heading }}
          </h2>
          <p v-if="projectsData.subheading" class="section-subheading">
            {{ projectsData.subheading }}
          </p>
        </div>

        <!-- Category Filter -->
        <div class="filter-container mb-12">
          <div class="filter-buttons">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectedCategory = category"
              class="filter-button"
              :class="{ 'active': selectedCategory === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.title"
            class="project-card"
            :class="{ 'featured': project.status === 'featured' }"
          >
            <!-- Featured Badge -->
            <div v-if="project.status === 'featured'" class="featured-badge">
              Featured
            </div>
            
            <!-- Project Image -->
            <div v-if="project.image" class="project-image">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="project-img"
              />
            </div>
            
            <!-- Project Icon (if no image) -->
            <div v-else class="project-icon" v-html="project.icon"></div>
            
            <!-- Project Content -->
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">{{ project.title }}</h3>
                <span class="project-category">{{ project.category }}</span>
              </div>
              
              <p class="project-description">{{ project.description }}</p>
              
              <!-- Project Meta -->
              <div class="project-meta">
                <span class="project-package">{{ project.package }}</span>
                <span class="project-timeline">{{ project.timeline }}</span>
              </div>
              
              <!-- Technologies -->
              <div class="project-technologies">
                <span 
                  v-for="tech in project.technologies.slice(0, 3)" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
                <span v-if="project.technologies.length > 3" class="tech-more">
                  +{{ project.technologies.length - 3 }} more
                </span>
              </div>
              
              <!-- Project Tags -->
              <div class="project-tags">
                <span 
                  v-for="tag in project.tags.slice(0, 3)" 
                  :key="tag"
                  class="project-tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <!-- Metrics (if available) -->
              <div v-if="project.metrics?.visits || project.metrics?.conversion || project.metrics?.performance" class="project-metrics">
                <div v-if="project.metrics?.visits" class="metric">
                  <span class="metric-value">{{ project.metrics.visits }}</span>
                  <span class="metric-label">Visits</span>
                </div>
                <div v-if="project.metrics?.conversion" class="metric">
                  <span class="metric-value">{{ project.metrics.conversion }}</span>
                  <span class="metric-label">Conversion</span>
                </div>
                <div v-if="project.metrics?.performance" class="metric">
                  <span class="metric-value">{{ project.metrics.performance }}</span>
                  <span class="metric-label">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredProjects.length === 0" class="no-results">
          <div class="no-results-content">
            <svg class="no-results-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <h3>No projects found</h3>
            <p>Try selecting a different category</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Project } from '../../data/portfolioData'

interface ProjectsData {
  heading?: string
  subheading?: string
  projects: Project[]
}

interface Props {
  projectsData: ProjectsData
}

const props = defineProps<Props>()

const selectedCategory = ref('All Projects')

// Get unique categories
const categories = computed(() => {
  const cats = ['All Projects', ...new Set(props.projectsData.projects.map(p => p.category))]
  return cats
})

// Filter projects by category
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All Projects') {
    return props.projectsData.projects
  }
  return props.projectsData.projects.filter(project => project.category === selectedCategory.value)
})
</script>

<style scoped>
.wagtail-portfolio-projects {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-subheading {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 3xl;
  margin: 0 auto;
}

.filter-container {
  display: flex;
  justify-content: center;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  color: #3b82f6;
  background: white;
}

.filter-button.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.project-card.featured {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
}

.project-image {
  width: 100%;
  height: 12rem;
  overflow: hidden;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.project-icon {
  width: 100%;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
}

.project-icon :deep(svg) {
  width: 4rem;
  height: 4rem;
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.project-category {
  font-size: 0.875rem;
  color: #3b82f6;
  background: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.project-description {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.project-package {
  color: #059669;
  font-weight: 600;
}

.project-timeline {
  color: #6b7280;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.tech-more {
  color: #6b7280;
  font-size: 0.75rem;
  font-style: italic;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.project-tag {
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-metrics {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-content {
  max-width: 20rem;
  margin: 0 auto;
}

.no-results-icon {
  width: 4rem;
  height: 4rem;
  color: #cbd5e1;
  margin: 0 auto 1rem;
}

.no-results h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .filter-buttons {
    gap: 0.25rem;
  }
  
  .filter-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .project-content {
    padding: 1.25rem;
  }
  
  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-metrics {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
