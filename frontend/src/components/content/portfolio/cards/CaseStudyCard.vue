<template>
  <div class="card hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-brand-primary/50 group">
    <div class="flex items-start space-x-4 mb-6">
      <div class="w-16 h-16 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:scale-110">
        <div class="text-2xl text-brand-primary">{{ caseStudy.icon }}</div>
      </div>
      <div>
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{{ caseStudy.title }}</h3>
        <p class="text-gray-400">{{ caseStudy.business }}</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-4 bg-gray-800 rounded-lg group-hover:bg-gray-750 transition-colors">
          <div class="text-2xl font-bold text-brand-primary mb-1">{{ caseStudy.metric1.value }}</div>
          <div class="text-sm text-gray-400">{{ caseStudy.metric1.label }}</div>
        </div>
        <div class="text-center p-4 bg-gray-800 rounded-lg group-hover:bg-gray-750 transition-colors">
          <div class="text-2xl font-bold text-brand-primary mb-1">{{ caseStudy.metric2.value }}</div>
          <div class="text-sm text-gray-400">{{ caseStudy.metric2.label }}</div>
        </div>
      </div>
      
      <p class="text-gray-300 leading-relaxed">
        {{ caseStudy.description }}
      </p>
      
      <div class="flex items-center space-x-4 text-sm text-gray-400">
        <span>Package: {{ caseStudy.package }}</span>
        <span>Timeline: {{ caseStudy.timeline }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CaseStudy {
  id: number
  title: string
  business: string
  icon: string
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  description: string
  package: string
  timeline: string
}

interface Props {
  caseStudy: CaseStudy
}

defineProps<Props>()

defineOptions({
  name: 'CaseStudyCard'
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

/* Case study card specific hover effects */
.card.hover\:scale-105:hover {
  transform: scale(1.05) translateY(-4px);
}
</style>
