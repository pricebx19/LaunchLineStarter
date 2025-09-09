<template>
  <section class="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-15">
      <div class="absolute top-10 left-1/4 w-40 h-40 border border-brand-primary/20 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-1/3 w-32 h-32 border border-brand-primary/15 rounded-full animate-pulse" style="animation-delay: 1.5s;"></div>
      <div class="absolute bottom-20 left-1/3 w-24 h-24 border border-brand-primary/25 rounded-full animate-pulse" style="animation-delay: 3s;"></div>
    </div>
    
    <!-- Floating tech icons -->
    <TechIcons :count="6" />
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">⚡ {{ processData.title.toUpperCase() }}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {{ processData.subtitle }}
        </h2>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
          {{ processData.description }}
        </p>
      </div>
      
      <!-- Process Steps -->
      <div class="relative process-steps-container">
        <!-- Connection Line -->
        <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transform -translate-y-1/2"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <ProcessStep
            v-for="(step, index) in processData.steps"
            :key="step.id"
            :step-number="index + 1"
            :title="step.title"
            :description="step.description"
            :features="[]"
          >
            <template #icon>
              <component :is="getIconComponent(step.icon)" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
            </template>
          </ProcessStep>
        </div>
      </div>
      
      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-brand-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          <span>Ready to Launch?</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProcessStep from './ProcessStep.vue'
import TechIcons from '../effects/TechIcons.vue'
import { PROCESS_DATA } from '../../data/about'
import type { ProcessData } from '../../types/About'

interface Props {
  processData?: ProcessData
}

const props = withDefaults(defineProps<Props>(), {
  processData: () => PROCESS_DATA
})

const processData = computed(() => props.processData)

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    search: 'svg',
    palette: 'svg',
    code: 'svg',
    rocket: 'svg'
  }
  return icons[iconName] || 'svg'
}
</script>

