<template>
  <section class="mission-section py-8 bg-gradient-to-b from-gray-800 via-gray-900 to-black relative overflow-hidden">
    <!-- Animated geometric background -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-16 left-10 w-24 h-24 border border-brand-primary/30 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-20 w-16 h-16 border border-brand-primary/20 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-16 left-1/4 w-12 h-12 border border-brand-primary/25 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-32 right-1/3 w-20 h-20 border border-brand-primary/15 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
    </div>
    
    <!-- Floating particles -->
    <FloatingParticles :count="8" />
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Mission Statement -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
          <span class="text-brand-primary text-sm font-semibold">🚀 {{ missionData.title.toUpperCase() }}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {{ missionData.subtitle }}
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          {{ missionData.description }}
        </p>
      </div>

      <!-- Mission Details Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <MissionCard
          v-for="feature in missionData.features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
        >
          <template #icon>
            <component :is="getIconComponent(feature.icon)" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
          </template>
        </MissionCard>
      </div>

      <!-- Mission CTA -->
      <div class="text-center mt-16">
        <router-link to="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full text-white font-semibold text-lg hover:from-blue-600 hover:to-brand-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Start Your Digital Journey</span>
          <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MissionCard from './MissionCard.vue'
import FloatingParticles from '../effects/FloatingParticles.vue'
import { MISSION_DATA } from '../../data/about'
import type { MissionData } from '../../types/About'

interface Props {
  missionData?: MissionData
}

const props = withDefaults(defineProps<Props>(), {
  missionData: () => MISSION_DATA
})

const missionData = computed(() => props.missionData)

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    lightbulb: 'svg',
    star: 'svg',
    handshake: 'svg'
  }
  return icons[iconName] || 'svg'
}
</script>
