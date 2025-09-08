<template>
  <div class="projects-container">
    <div class="projects-grid" ref="projectsGrid">
      <EnhancedProjectCard 
        v-for="(project, index) in projects" 
        :key="`${filterKey}-${project.id}`"
        :project="project"
        :index="index"
        :animate-delay="index * 100"
        @select="$emit('select-project', project)"
        @preview="$emit('preview-project', project)"
        class="project-item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch, nextTick } from 'vue'

const EnhancedProjectCard = defineAsyncComponent(() => import('../cards/EnhancedProjectCard.vue'))

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

const props = defineProps<{
  projects: Project[]
  filterKey: string // Used for Vue's key to trigger re-renders on filter changes
}>()

defineEmits<{
  'select-project': [project: Project]
  'preview-project': [project: Project]
}>()

// Refs for animation control
const projectsGrid = ref<HTMLElement>()
const isFilterTransition = ref(false)

// Watch for filter changes with optimized animation
watch(() => props.filterKey, async (newKey, oldKey) => {
  if (newKey !== oldKey && oldKey !== undefined) {
    isFilterTransition.value = true
    
    // Fade out current projects
    if (projectsGrid.value) {
      projectsGrid.value.style.opacity = '0'
      projectsGrid.value.style.transform = 'translateY(20px)'
    }
    
    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Wait for Vue to update DOM
    await nextTick()
    
    // Fade in new projects
    if (projectsGrid.value) {
      projectsGrid.value.style.opacity = '1'
      projectsGrid.value.style.transform = 'translateY(0)'
    }
    
    // Reset animation flag
    setTimeout(() => {
      isFilterTransition.value = false
    }, 600)
  }
})
</script>

<style scoped>
/* Optimized Projects Container */
.projects-container {
  position: relative;
  overflow: hidden;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-item {
  animation: projectFadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes projectFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
