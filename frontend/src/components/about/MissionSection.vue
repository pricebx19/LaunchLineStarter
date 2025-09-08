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
          <span class="text-brand-primary text-sm font-semibold">🚀 OUR MISSION</span>
        </div>
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          To <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-400 to-cyan-300">Launch</span> 
          <br class="hidden md:block">Every Business Into 
          <br class="hidden md:block"><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-primary to-blue-500">Digital Orbit</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We transform ambitious ideas into digital reality, crafting web experiences that don't just look professional—they <span class="text-brand-primary font-semibold">perform</span> like rockets.
        </p>
      </div>

      <!-- Mission Details Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <MissionCard
          title="Accelerate Growth"
          description="We don't just build websites—we build digital engines that drive traffic, convert visitors, and scale your business to new heights."
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </template>
        </MissionCard>
        
        <MissionCard
          title="Innovate Constantly"
          description="We stay ahead of the curve with cutting-edge technologies, ensuring your digital presence is always one step ahead of the competition."
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </template>
        </MissionCard>

        <MissionCard
          title="Partner for Success"
          description="We become an extension of your team, invested in your success and committed to building long-term relationships that grow with your business."
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
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
import MissionCard from './MissionCard.vue'
import FloatingParticles from '../effects/FloatingParticles.vue'

defineOptions({
  name: 'MissionSection'
})
</script>

<script lang="ts">
export default {
  name: 'MissionSection'
}
</script>

<style scoped>
/* Mission Section Styles */
.mission-section {
  position: relative;
}
</style>