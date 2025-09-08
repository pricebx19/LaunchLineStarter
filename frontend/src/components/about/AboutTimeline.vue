<template>
  <section class="py-8 bg-gradient-to-b from-black via-gray-900 to-gray-800 relative overflow-hidden">
    <!-- Timeline background -->
    <div class="absolute inset-0 opacity-20">
      <div class="timeline-bg"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">🚀 {{ badgeText }}</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p class="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          {{ description }}
        </p>
      </div>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary via-blue-600 to-purple-600 opacity-30"></div>
        
        <div class="space-y-16">
          <div 
            v-for="(milestone, index) in milestones" 
            :key="milestone.year"
            class="relative"
            :style="{ animationDelay: `${index * 300}ms` }"
          >
            <!-- Timeline node -->
            <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div class="timeline-node">
                <div class="node-inner">{{ milestone.year }}</div>
                <div class="node-glow"></div>
              </div>
            </div>
            
            <!-- Milestone content -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <!-- Left side (odd indices) or right side (even indices) -->
              <div 
                :class="[
                  'milestone-card',
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                ]"
              >
                <div class="milestone-content">
                  <div class="milestone-badge">{{ milestone.badge }}</div>
                  <h3 class="milestone-title">{{ milestone.title }}</h3>
                  <p class="milestone-description">{{ milestone.description }}</p>
                  
                  <!-- Achievements -->
                  <div class="milestone-achievements">
                    <div 
                      v-for="achievement in milestone.achievements" 
                      :key="achievement"
                      class="achievement-item"
                    >
                      <svg class="achievement-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <span>{{ achievement }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty space for alternating layout -->
              <div 
                :class="[
                  'hidden lg:block',
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Future vision -->
      <div class="text-center mt-20">
        <div class="future-card">
          <div class="future-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">{{ futureTitle }}</h3>
          <p class="text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {{ futureDescription }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { timelineMilestones as defaultTimelineMilestones, type TimelineMilestone } from '../../data/componentData'

// Remove duplicate interface - using TimelineMilestone from componentData

const props = withDefaults(defineProps<{
  badgeText?: string
  title?: string
  description?: string
  futureTitle?: string
  futureDescription?: string
  timeline?: TimelineMilestone[]
}>(), {
  badgeText: 'OUR JOURNEY',
  title: 'From Startup to Launch Pad',
  description: 'The story of how we evolved from a small idea into a team dedicated to launching businesses into digital success.',
  futureTitle: 'The Future is Limitless',
  futureDescription: 'As we continue to grow and evolve, our mission remains the same: to launch every business we work with into digital orbit, creating lasting success stories that inspire the next generation of entrepreneurs.'
})

const milestones = computed(() => props.timeline || defaultTimelineMilestones)
</script>

<style scoped>
.timeline-bg {
  background: radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%);
  background-size: 600px 600px;
  animation: timelineDrift 25s ease-in-out infinite;
}

.timeline-node {
  @apply relative w-16 h-16 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg;
}

.node-inner {
  @apply relative z-10;
}

.node-glow {
  @apply absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full blur-lg opacity-50 animate-pulse;
}

.milestone-card {
  @apply bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl p-8 border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-500;
  animation: slideInFromSide 0.8s ease-out forwards;
  opacity: 0;
}

.milestone-content {
  @apply space-y-4;
}

.milestone-badge {
  @apply inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary text-sm font-semibold rounded-full border border-brand-primary/30;
}

.milestone-title {
  @apply text-2xl font-bold text-white;
}

.milestone-description {
  @apply text-gray-300 leading-relaxed;
}

.milestone-achievements {
  @apply space-y-2;
}

.achievement-item {
  @apply flex items-center text-sm text-gray-400;
}

.achievement-icon {
  @apply w-4 h-4 text-green-400 mr-2 flex-shrink-0;
}

.future-card {
  @apply bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-2xl p-8 border border-brand-primary/30 max-w-3xl mx-auto;
}

.future-icon {
  @apply w-16 h-16 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6;
}

@keyframes slideInFromSide {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes timelineDrift {
  0%, 100% { transform: translateY(-20px); }
  50% { transform: translateY(20px); }
}

/* Alternate animation for even indices */
.milestone-card:nth-child(even) {
  animation: slideInFromSideRight 0.8s ease-out forwards;
}

@keyframes slideInFromSideRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
