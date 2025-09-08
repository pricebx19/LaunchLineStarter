<template>
  <section class="py-10 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
    <!-- Subtle starry background -->
    <StarryBackground 
      :medium-count="15"
      :show-large="false"
      :show-small="false" 
      :show-shooting="false"
      :opacity="0.2"
    />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ title }}</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          {{ subtitle }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <CaseStudyCard 
          v-for="caseStudy in caseStudies" 
          :key="caseStudy.id"
          :case-study="caseStudy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import StarryBackground from '../effects/StarryBackground.vue'
import CaseStudyCard from '../content/portfolio/CaseStudyCard.vue'

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
  title?: string
  subtitle?: string
  caseStudies: CaseStudy[]
}

withDefaults(defineProps<Props>(), {
  title: 'Success Stories',
  subtitle: 'Real results from real businesses. See how our websites have transformed their online presence and driven growth.'
})

defineOptions({
  name: 'CaseStudySection'
})
</script>
