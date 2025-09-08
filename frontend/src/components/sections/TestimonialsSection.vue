<template>
  <section id="testimonials" :class="{ 'active': isActive }" class="relative">
    <div class="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      <!-- Galaxy Background -->
      <div class="galaxy-container absolute inset-0 pointer-events-none">
        <!-- Spiral galaxy arms -->
        <div class="galaxy-arm arm-1"></div>
        <div class="galaxy-arm arm-2"></div>
        <div class="galaxy-arm arm-3"></div>
        
        <!-- Central galaxy core -->
        <div class="galaxy-core"></div>
        
        <!-- Orbiting stars -->
        <div class="orbiting-star" v-for="i in 30" :key="`orbit-${i}`" :style="getOrbitingStyle(i)"></div>
      </div>
      
      <div class="text-center text-white max-w-5xl mx-auto px-6 relative z-10">
        <div class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <NavigationUpButton />
        </div>
        
        <h2 class="text-5xl font-bold mb-6 text-brand-primary">Success Stories That Soar</h2>
        <p class="text-xl mb-16 text-gray-300 max-w-3xl mx-auto">
          See how we've helped businesses across industries launch their digital presence and achieve measurable growth.
        </p>
        
        <!-- Testimonial Cards -->
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-brand-primary/50 transition-all duration-300 group">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🚗</span>
              </div>
              <h3 class="text-xl font-bold mb-2">Car Club Pro</h3>
              <p class="text-gray-400">Automotive Industry</p>
            </div>
            <blockquote class="text-lg text-gray-300 italic leading-relaxed">
              "LaunchLine transformed our car club's online presence. Our membership grew 300% in just 6 months, and the new website perfectly captures our brand's energy."
            </blockquote>
            <div class="mt-6 text-brand-primary font-semibold">- Mike Rodriguez, Founder</div>
          </div>
          
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-brand-primary/50 transition-all duration-300 group">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🎵</span>
              </div>
              <h3 class="text-xl font-bold mb-2">SoundWave Events</h3>
              <p class="text-gray-400">Event Promotion</p>
            </div>
            <blockquote class="text-lg text-gray-300 italic leading-relaxed">
              "Our event bookings increased 250% after LaunchLine redesigned our website. The user experience is incredible and our conversion rate is through the roof!"
            </blockquote>
            <div class="mt-6 text-brand-primary font-semibold">- Sarah Chen, CEO</div>
          </div>
        </div>
        
        <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <NavigationDownButton />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Use dynamic imports for navigation components
const NavigationUpButton = defineAsyncComponent(() => import('../ui/navigation/NavigationUpButton.vue'))
const NavigationDownButton = defineAsyncComponent(() => import('../ui/navigation/NavigationDownButton.vue'))

interface Props {
  isActive: boolean
}

defineProps<Props>()

// Generate orbiting star positions
const getOrbitingStyle = (index: number) => {
  const angle = (index / 30) * 2 * Math.PI
  const radius = 30 + (index % 3) * 15
  const centerX = 50
  const centerY = 50
  
  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)
  const delay = index * 0.1
  const size = Math.random() * 3 + 1
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
/* Section Styles */
section {
  /* Each section takes the full viewport height */
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden; /* Prevent content from spilling over */
  margin-bottom: 0;
  
  /* Position sections absolutely to overlay each other */
  position: absolute;
  top: 0; /* Start at top of viewport, navbar will overlay */
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Hide all sections by default */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  pointer-events: none; /* Prevent interaction with hidden sections */
}

/* Show only the active section */
section.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 20;
  /* Ensure text selection works on active sections */
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

/* Hide all sections by default */
section:not(.active) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Galaxy Background Styles */
.galaxy-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.galaxy-core {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 165, 0, 0.4) 50%, transparent 100%);
  border-radius: 50%;
  animation: core-pulse 4s ease-in-out infinite;
}

.galaxy-arm {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: arm-rotate 20s linear infinite;
}

.arm-1 {
  transform: translate(-50%, -50%) rotate(0deg);
  border-color: rgba(59, 130, 246, 0.2);
}

.arm-2 {
  transform: translate(-50%, -50%) rotate(120deg);
  border-color: rgba(147, 51, 234, 0.2);
  animation-duration: 25s;
}

.arm-3 {
  transform: translate(-50%, -50%) rotate(240deg);
  border-color: rgba(236, 72, 153, 0.2);
  animation-duration: 30s;
}

@keyframes core-pulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes arm-rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.orbiting-star {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  border-radius: 50%;
  animation: orbit-rotate 15s linear infinite;
}

@keyframes orbit-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
