<template>
  <div 
    class="card hover:bg-gray-750 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-brand-primary/50"
    @click="$emit('select', project)"
  >
    <div class="relative overflow-hidden rounded-lg mb-6">
      <div class="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div class="text-4xl text-brand-primary opacity-50 group-hover:opacity-75 transition-opacity">{{ project.icon }}</div>
      </div>
      <div class="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span class="text-white font-semibold">{{ hoverText }}</span>
      </div>
    </div>
    
    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
      {{ project.title }}
    </h3>
    
    <p class="text-gray-400 mb-4 leading-relaxed">
      {{ project.description }}
    </p>
    
    <div class="flex flex-wrap gap-2 mb-4">
      <span 
        v-for="tag in project.tags" 
        :key="tag"
        class="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm rounded-full group-hover:bg-brand-primary/20 transition-colors"
      >
        {{ tag }}
      </span>
    </div>
    
    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>{{ project.package }}</span>
      <span>{{ project.timeline }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  package: string
  timeline: string
}

interface Props {
  project: Project
  hoverText?: string
}

withDefaults(defineProps<Props>(), {
  hoverText: 'View Project'
})

defineEmits<{
  select: [project: Project]
}>()

defineOptions({
  name: 'ProjectCard'
})
</script>

<style scoped>
/* Card hover effects */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Portfolio card specific hover effects */
.card.hover\:scale-105:hover {
  transform: scale(1.05) translateY(-4px);
}

/* Project icon hover effects */
.aspect-video:hover .text-4xl {
  transform: scale(1.1);
}
</style>
