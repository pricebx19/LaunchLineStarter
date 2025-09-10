<template>
  <section id="features" :class="{ 'active': isActive }" class="relative">
    <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      <!-- Enhanced Constellation Background -->
      <div class="constellation-container absolute inset-0 pointer-events-none">
        <!-- Connected constellation stars -->
        <div class="constellation-star" v-for="i in 15" :key="`constellation-${i}`" :style="getConstellationStyle(i)"></div>
        
        <!-- Additional floating orbs -->
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
        
        <!-- Energy waves -->
        <div class="energy-wave wave-1"></div>
        <div class="energy-wave wave-2"></div>
        <div class="energy-wave wave-3"></div>
        
        <!-- Particle field -->
        <div class="particle-field" v-for="i in 50" :key="`particle-${i}`" :style="getParticleStyle(i)"></div>
        
        <!-- Connection lines with enhanced styling -->
        <svg class="constellation-lines absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="20" y1="30" x2="35" y2="45" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="35" y1="45" x2="50" y2="35" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="50" y1="35" x2="65" y2="50" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="65" y1="50" x2="80" y2="40" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="30" y1="60" x2="45" y2="70" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="45" y1="70" x2="60" y2="65" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <line x1="60" y1="65" x2="75" y2="75" stroke="rgba(59, 130, 246, 0.4)" stroke-width="0.8" class="connection-line" />
          <!-- Additional connection lines for more complexity -->
          <line x1="25" y1="25" x2="40" y2="20" stroke="rgba(147, 51, 234, 0.3)" stroke-width="0.6" class="connection-line" />
          <line x1="70" y1="25" x2="85" y2="30" stroke="rgba(147, 51, 234, 0.3)" stroke-width="0.6" class="connection-line" />
          <line x1="15" y1="70" x2="25" y2="80" stroke="rgba(34, 211, 238, 0.3)" stroke-width="0.6" class="connection-line" />
          <line x1="85" y1="70" x2="75" y2="80" stroke="rgba(34, 211, 238, 0.3)" stroke-width="0.6" class="connection-line" />
        </svg>
        
        <!-- Glowing nodes at connection points -->
        <div class="connection-node" v-for="i in 8" :key="`node-${i}`" :style="getNodeStyle(i)"></div>
      </div>
      
      <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
        <div class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <NavigationUpButton />
        </div>
        
        <h2 class="text-5xl font-bold mb-6 text-brand-primary">Why LaunchLine?</h2>
        <p class="text-xl mb-12 text-gray-300 leading-relaxed">
          We don't just build websites—we build digital launchpads that accelerate your business growth and establish your brand authority. Experience the difference that strategic design, cutting-edge technology, and proven results can make for your business.
        </p>
        
        <!-- Simple feature grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Fast Launch</h3>
            <p class="text-gray-400">Get your website up and running quickly</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">💎</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Premium Quality</h3>
            <p class="text-gray-400">Professional design that converts</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">📈</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Results Driven</h3>
            <p class="text-gray-400">Websites that grow your business</p>
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
const NavigationUpButton = defineAsyncComponent(() => import('../../ui/navigation/NavigationUpButton.vue'))
const NavigationDownButton = defineAsyncComponent(() => import('../../ui/navigation/NavigationDownButton.vue'))

interface Props {
  isActive: boolean
}

defineProps<Props>()

// Generate constellation star positions
const getConstellationStyle = (index: number) => {
  const positions = [
    { x: 20, y: 30, size: 'small', color: 'bg-blue-400' },
    { x: 35, y: 45, size: 'medium', color: 'bg-blue-300' },
    { x: 50, y: 35, size: 'large', color: 'bg-blue-500' },
    { x: 65, y: 50, size: 'medium', color: 'bg-blue-400' },
    { x: 80, y: 40, size: 'small', color: 'bg-blue-300' },
    { x: 30, y: 60, size: 'medium', color: 'bg-blue-500' },
    { x: 45, y: 70, size: 'large', color: 'bg-blue-400' },
    { x: 60, y: 65, size: 'small', color: 'bg-blue-300' },
    { x: 75, y: 75, size: 'medium', color: 'bg-blue-500' },
    { x: 25, y: 25, size: 'small', color: 'bg-blue-400' },
    { x: 70, y: 25, size: 'medium', color: 'bg-blue-300' },
    { x: 15, y: 70, size: 'large', color: 'bg-blue-500' },
    { x: 85, y: 70, size: 'small', color: 'bg-blue-400' },
    { x: 40, y: 20, size: 'medium', color: 'bg-blue-300' },
    { x: 55, y: 80, size: 'small', color: 'bg-blue-500' }
  ]
  
  const star = positions[index - 1] || positions[0] || { x: 50, y: 50, size: 'medium', color: 'bg-white' }
  
  return {
    left: `${star.x}%`,
    top: `${star.y}%`,
    animationDelay: `${index * 0.2}s`
  }
}

// Generate particle field positions
const getParticleStyle = (_index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 4
  const size = Math.random() * 2 + 1
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}

// Generate connection node positions
const getNodeStyle = (index: number) => {
  const positions = [
    { x: 20, y: 30 }, { x: 35, y: 45 }, { x: 50, y: 35 }, { x: 65, y: 50 },
    { x: 80, y: 40 }, { x: 30, y: 60 }, { x: 45, y: 70 }, { x: 60, y: 65 }
  ]
  
  const node = positions[index - 1] || positions[0] || { x: 50, y: 50 }
  const delay = index * 0.3
  
  return {
    left: `${node.x}%`,
    top: `${node.y}%`,
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

/* Enhanced Constellation Background Styles */
.constellation-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.constellation-star {
  position: absolute;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%);
  border-radius: 50%;
  animation: constellation-twinkle 3s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.6));
}

.constellation-star:nth-child(1) { width: 8px; height: 8px; }
.constellation-star:nth-child(2) { width: 6px; height: 6px; }
.constellation-star:nth-child(3) { width: 10px; height: 10px; }
.constellation-star:nth-child(4) { width: 6px; height: 6px; }
.constellation-star:nth-child(5) { width: 8px; height: 8px; }
.constellation-star:nth-child(6) { width: 6px; height: 6px; }
.constellation-star:nth-child(7) { width: 10px; height: 10px; }
.constellation-star:nth-child(8) { width: 8px; height: 8px; }
.constellation-star:nth-child(9) { width: 6px; height: 6px; }
.constellation-star:nth-child(10) { width: 8px; height: 8px; }
.constellation-star:nth-child(11) { width: 6px; height: 6px; }
.constellation-star:nth-child(12) { width: 10px; height: 10px; }
.constellation-star:nth-child(13) { width: 8px; height: 8px; }
.constellation-star:nth-child(14) { width: 6px; height: 6px; }
.constellation-star:nth-child(15) { width: 8px; height: 8px; }

@keyframes constellation-twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
}

.constellation-lines {
  opacity: 0.6;
  animation: constellation-fade 4s ease-in-out infinite;
}

.connection-line {
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4));
  animation: line-pulse 3s ease-in-out infinite;
}

@keyframes constellation-fade {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes line-pulse {
  0%, 100% { stroke-width: 0.8; opacity: 0.4; }
  50% { stroke-width: 1.2; opacity: 0.6; }
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  filter: blur(20px);
  animation: orb-float 8s ease-in-out infinite;
}

.orb-1 {
  background: radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 70%, transparent 100%);
  left: 15%;
  top: 25%;
  animation-delay: 0s;
}

.orb-2 {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0.1) 70%, transparent 100%);
  left: 75%;
  top: 35%;
  animation-delay: 2s;
}

.orb-3 {
  background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%);
  left: 45%;
  top: 75%;
  animation-delay: 4s;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50% { transform: translate(15px, -20px) scale(1.3); opacity: 0.7; }
}

/* Energy Waves */
.energy-wave {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  animation: wave-expand 6s ease-in-out infinite;
}

.wave-1 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-color: rgba(59, 130, 246, 0.3);
  animation-delay: 0s;
}

.wave-2 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-color: rgba(147, 51, 234, 0.2);
  animation-delay: 2s;
}

.wave-3 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-color: rgba(34, 211, 238, 0.2);
  animation-delay: 4s;
}

@keyframes wave-expand {
  0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

/* Particle Field */
.particle-field {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  border-radius: 50%;
  animation: particle-drift 8s ease-in-out infinite;
}

@keyframes particle-drift {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50% { transform: translate(10px, -15px) scale(1.5); opacity: 0.8; }
}

/* Connection Nodes */
.connection-node {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%);
  border-radius: 50%;
  animation: node-pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
}

@keyframes node-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.4); }
}
</style>
