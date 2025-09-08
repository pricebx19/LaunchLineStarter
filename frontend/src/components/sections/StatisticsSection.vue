<template>
  <section id="statistics" :class="{ 'active': isActive }" class="relative">
    <div class="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      <!-- Nebula Background -->
      <div class="nebula-container absolute inset-0 pointer-events-none">
        <!-- Colorful nebula clouds -->
        <div class="nebula-cloud nebula-purple" style="left: 10%; top: 20%; animation-delay: 0s;"></div>
        <div class="nebula-cloud nebula-blue" style="left: 70%; top: 30%; animation-delay: 1s;"></div>
        <div class="nebula-cloud nebula-pink" style="left: 20%; top: 70%; animation-delay: 2s;"></div>
        <div class="nebula-cloud nebula-cyan" style="left: 80%; top: 60%; animation-delay: 0.5s;"></div>
        
        <!-- Sparkling stars -->
        <div class="sparkle-star" v-for="i in 25" :key="`sparkle-${i}`" :style="getSparkleStyle(i)"></div>
      </div>
      
      <div class="text-center text-white max-w-6xl mx-auto px-6 relative z-10">
        <div class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <NavigationUpButton />
        </div>
        
        <h2 class="text-5xl font-bold mb-6 text-brand-primary">LaunchLine by the Numbers</h2>
        <p class="text-xl mb-16 text-gray-300 max-w-3xl mx-auto">
          Real results that speak for themselves. See how we've launched businesses into digital success.
        </p>
        
        <!-- Statistics Grid -->
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/30 transition-all duration-300">
              <span class="text-4xl font-bold text-brand-primary">50+</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Websites Launched</h3>
            <p class="text-gray-400">Successfully deployed</p>
          </div>
          
          <div class="text-center group">
            <div class="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/30 transition-all duration-300">
              <span class="text-4xl font-bold text-brand-primary">98%</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Client Satisfaction</h3>
            <p class="text-gray-400">Happy customers</p>
          </div>
          
          <div class="text-center group">
            <div class="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/30 transition-all duration-300">
              <span class="text-4xl font-bold text-brand-primary">24/7</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Support Available</h3>
            <p class="text-gray-400">Always here for you</p>
          </div>
          
          <div class="text-center group">
            <div class="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/30 transition-all duration-300">
              <span class="text-4xl font-bold text-brand-primary">2x</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Traffic Growth</h3>
            <p class="text-gray-400">Average increase</p>
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

// Generate sparkle star positions
const getSparkleStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const size = Math.random() * 4 + 2
  
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

/* Nebula Background Styles */
.nebula-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.nebula-cloud {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(40px);
  animation: nebula-drift 8s ease-in-out infinite;
}

.nebula-purple {
  background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 70%, transparent 100%);
}

.nebula-blue {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 100%);
}

.nebula-pink {
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%);
}

.nebula-cyan {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.1) 70%, transparent 100%);
}

@keyframes nebula-drift {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50% { transform: translate(20px, -15px) scale(1.1); opacity: 0.6; }
}

.sparkle-star {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  border-radius: 50%;
  animation: sparkle-twinkle 2s ease-in-out infinite;
}

@keyframes sparkle-twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
}
</style>
