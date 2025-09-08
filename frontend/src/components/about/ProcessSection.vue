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
          <span class="text-brand-primary text-sm font-semibold">⚡ OUR PROCESS</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          The <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-cyan-300">LaunchLine</span> 
          <br class="hidden md:block">Methodology
        </h2>
        <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          A proven 3-phase rocket launch sequence that transforms your vision into a digital reality that <span class="text-brand-primary font-semibold">outperforms</span> expectations.
        </p>
      </div>
      
      <!-- Process Steps -->
      <div class="relative process-steps-container">
        <!-- Connection Line -->
        <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transform -translate-y-1/2"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <ProcessStep
            v-for="(step, index) in approachSteps"
            :key="step.title"
            :step-number="index + 1"
            :title="step.title"
            :description="step.description"
            :features="step.features"
          >
            <template #icon>
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="index === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                <path v-else-if="index === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
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
import ProcessStep from './ProcessStep.vue'
import TechIcons from '../effects/TechIcons.vue'
import { approachSteps } from '../../data/aboutData'

defineOptions({
  name: 'ProcessSection'
})
</script>

<script lang="ts">
export default {
  name: 'ProcessSection'
}
</script>

<style scoped>
.process-steps-container {
  height: fit-content;
}
</style>
