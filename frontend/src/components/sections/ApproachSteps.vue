<template>
  <section class="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-15">
      <div class="absolute top-10 left-1/4 w-40 h-40 border border-brand-primary/20 rounded-full animate-pulse"></div>
      <div class="absolute top-32 right-1/3 w-32 h-32 border border-brand-primary/15 rounded-full animate-pulse" style="animation-delay: 1.5s;"></div>
      <div class="absolute bottom-20 left-1/3 w-24 h-24 border border-brand-primary/25 rounded-full animate-pulse" style="animation-delay: 3s;"></div>
    </div>
    
    <!-- Floating tech icons -->
    <div class="tech-icons-container absolute inset-0">
      <div class="tech-icon" v-for="i in 6" :key="`tech-${i}`" :style="getTechIconStyle(i)">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">⚡ {{ badgeText }}</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {{ description }}
        </p>
      </div>
      
      <!-- Process Steps -->
      <div class="relative process-steps-container">
        <!-- Connection Line -->
        <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transform -translate-y-1/2"></div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div 
            v-for="(step, index) in steps" 
            :key="step.title"
            class="approach-step group relative flex flex-col h-full"
          >
            <!-- Step Number Badge -->
            <div class="step-number-badge">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-pulse"></div>
            </div>
            
            <!-- Step Content -->
            <div class="approach-card group-hover:scale-105 transition-all duration-500 flex-1 flex flex-col">
              <div class="step-icon-wrapper">
                <div class="step-icon">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.iconPath"></path>
                  </svg>
                </div>
              </div>
              
              <div class="card-content flex-1 flex flex-col">
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">{{ step.title }}</h3>
                <p class="text-gray-400 leading-relaxed mb-6 flex-1">{{ step.description }}</p>
                
                <!-- Step Features -->
                <div class="step-features mt-auto">
                  <div v-for="feature in step.features" :key="feature" class="flex items-center mb-2">
                    <div class="feature-check">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="text-sm text-gray-300 ml-2">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-brand-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          <span>{{ ctaText }}</span>
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

interface ApproachStep {
  title: string
  description: string
  features: string[]
  iconPath: string
}

const props = withDefaults(defineProps<{
  badgeText?: string
  title?: string
  description?: string
  ctaText?: string
  approachSteps?: ApproachStep[]
}>(), {
  badgeText: 'OUR PROCESS',
  title: 'The LaunchLine Methodology',
  description: 'A proven 3-phase rocket launch sequence that transforms your vision into a digital reality that outperforms expectations.',
  ctaText: 'Ready to Launch?'
})

const steps = computed(() => props.approachSteps || [
  {
    title: 'Discovery & Strategy',
    description: 'We dive deep into understanding your business, target audience, and competitive landscape to develop a website strategy that drives results.',
    features: [
      'Business analysis & research',
      'Competitive landscape review',
      'Target audience profiling',
      'Conversion strategy planning'
    ],
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    title: 'Design & Development',
    description: 'Our expert team brings your vision to life with cutting-edge technology and beautiful, conversion-focused design that matches your brand perfectly.',
    features: [
      'UX/UI design creation',
      'Responsive development',
      'Performance optimization',
      'Quality assurance testing'
    ],
    iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
  },
  {
    title: 'Launch & Optimize',
    description: 'We execute your website launch with precision and provide ongoing support to ensure your online success continues to grow.',
    features: [
      'Seamless deployment',
      'Performance monitoring',
      'Ongoing optimization',
      '24/7 support available'
    ],
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
])

const getTechIconStyle = (index: number): Record<string, string> => {
  const positions: Array<{ top: string; animationDelay: string } & ({ left: string } | { right: string })> = [
    { top: '15%', left: '10%', animationDelay: '0s' },
    { top: '25%', right: '15%', animationDelay: '2s' },
    { top: '45%', left: '5%', animationDelay: '4s' },
    { top: '65%', right: '10%', animationDelay: '1s' },
    { top: '75%', left: '20%', animationDelay: '3s' },
    { top: '35%', right: '5%', animationDelay: '5s' }
  ]
  
  const position = positions[index - 1] || positions[0]
  const baseStyle: Record<string, string> = {
    position: 'absolute',
    width: '32px',
    height: '32px',
    color: '#3b82f6',
    opacity: '0.4',
    animation: 'float 8s ease-in-out infinite',
    top: position.top,
    animationDelay: position.animationDelay
  }
  
  // Add left or right positioning
  if ('left' in position) {
    baseStyle.left = position.left
  } else if ('right' in position) {
    baseStyle.right = position.right
  }
  
  return baseStyle
}
</script>

<style scoped>
.step-number-badge {
  @apply absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 lg:relative lg:top-0 lg:left-0 lg:transform-none lg:mx-auto lg:mb-6 lg:w-16 lg:h-16;
}

.step-number {
  @apply w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg relative z-10;
}

.step-pulse {
  @apply absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20;
}

.approach-card {
  @apply bg-gradient-to-br from-gray-800/90 to-gray-900/95 rounded-2xl p-8 border border-gray-700/50 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/10 mt-6 lg:mt-0;
}

.step-icon-wrapper {
  @apply mb-6;
}

.step-icon {
  @apply w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-primary mx-auto;
}

.feature-check {
  @apply w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs;
}

.tech-icon {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}
</style>
