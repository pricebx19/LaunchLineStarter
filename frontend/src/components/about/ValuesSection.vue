<template>
  <section class="values-section py-8 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
    <!-- Cosmic Background -->
    <div class="cosmic-background absolute inset-0">
      <!-- Deep space gradient -->
      <div class="absolute inset-0 bg-gradient-radial from-purple-900/20 via-blue-900/10 to-transparent"></div>
      
      <!-- Nebula clouds -->
      <div class="nebula-cloud nebula-1"></div>
      <div class="nebula-cloud nebula-2"></div>
      <div class="nebula-cloud nebula-3"></div>
      
      <!-- Enhanced starfield -->
      <StarryBackground 
        :large-count="20"
        :medium-count="40"
        :small-count="80"
        :shooting-count="3"
        class="z-2"
      />
      
      <!-- Floating energy particles -->
      <div class="energy-particles absolute inset-0" style="z-index: 3;">
        <div 
          class="energy-particle" 
          v-for="i in 12" 
          :key="`energy-${i}`" 
          :style="getEnergyParticleStyle(i)"
        ></div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-primary/20 to-purple-600/20 border border-brand-primary/30 mb-8 backdrop-blur-sm">
          <div class="w-2 h-2 bg-brand-primary rounded-full mr-3 animate-pulse"></div>
          <span class="text-brand-primary text-sm font-bold tracking-wider uppercase">🌟 Core Values</span>
          <div class="w-2 h-2 bg-brand-primary rounded-full ml-3 animate-pulse" style="animation-delay: 0.5s;"></div>
        </div>
        
        <h2 class="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-400 to-cyan-300 animate-pulse">Guiding</span>
          <br class="hidden md:block">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-primary to-purple-500">Constellation</span>
        </h2>
        
        <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
          Like stars in the cosmos, our values illuminate every decision, guide every solution, and power every launch into the digital universe.
        </p>
        
        <div class="inline-flex items-center text-brand-primary font-semibold">
          <div class="w-1 h-1 bg-brand-primary rounded-full mr-2 animate-ping"></div>
          <span class="text-lg">Four Pillars. Infinite Possibilities.</span>
          <div class="w-1 h-1 bg-brand-primary rounded-full ml-2 animate-ping" style="animation-delay: 0.3s;"></div>
        </div>
      </div>
      
      <!-- Orbital Values System -->
      <div class="orbital-system relative" ref="orbitalSystemRef">
        <!-- Central Core -->
        <OrbitalCore />
        
        <!-- Orbital Values -->
        <div class="orbital-values">
          <ValuePlanet
            v-for="(value, index) in valuesConstellation"
            :key="value.title"
            :value="value"
            :index="index"
            @highlight="highlightOrbit"
            @unhighlight="unhighlightOrbit"
          />
        </div>
        
        <!-- Value Information Panels - Separate Layer -->
        <div class="value-panels-overlay">
          <ValueInfoPanel
            v-for="(value, index) in valuesConstellation"
            :key="`panel-${value.title}`"
            :value="value"
            :index="index"
          />
        </div>
        
        <!-- Constellation Connections -->
        <svg class="constellation-lines absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#0EA5E9;stop-opacity:0" />
              <stop offset="50%" style="stop-color:#0EA5E9;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0" />
            </linearGradient>
          </defs>
          
          <!-- Connection lines between values -->
          <path 
            v-for="(connection, index) in constellationConnections" 
            :key="`connection-${index}`"
            :d="connection.path" 
            stroke="url(#connectionGradient)" 
            stroke-width="1" 
            fill="none"
            class="constellation-line"
            :style="`animation-delay: ${index * 0.5}s`"
          />
        </svg>
      </div>
      
      <!-- Values Summary -->
      <AnimatedStatistics />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StarryBackground from '../effects/StarryBackground.vue'
import OrbitalCore from './OrbitalCore.vue'
import ValuePlanet from './ValuePlanet.vue'
import ValueInfoPanel from './ValueInfoPanel.vue'
import AnimatedStatistics from './AnimatedStatistics.vue'
import { 
  valuesConstellation, 
  constellationConnections 
} from '../../data/aboutData'

defineOptions({
  name: 'ValuesSection'
})

const orbitalSystemRef = ref<HTMLElement>()

// Track hover timeouts for better interaction
let hoverTimeouts: { [key: number]: number } = {}

// Generate energy particle positions
const getEnergyParticleStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 8
  const duration = 6 + Math.random() * 6
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Orbital system interactions
const highlightOrbit = (index: number) => {
  // Clear any existing timeout for this orbit
  if (hoverTimeouts[index]) {
    clearTimeout(hoverTimeouts[index])
    delete hoverTimeouts[index]
  }
  
  const orbitElement = document.querySelector(`.orbital-value-${index + 1}`)
  const panelElement = document.querySelector(`.panel-${index + 1}`)
  
  if (orbitElement) {
    orbitElement.classList.add('orbit-highlighted')
  }
  if (panelElement) {
    panelElement.classList.add('panel-visible')
    
    // Add hover listener to panel to keep it visible
    const keepVisible = () => {
      if (hoverTimeouts[index]) {
        clearTimeout(hoverTimeouts[index])
        delete hoverTimeouts[index]
      }
    }
    
    const hideOnLeave = () => {
      unhighlightOrbit(index)
    }
    
    panelElement.addEventListener('mouseenter', keepVisible)
    panelElement.addEventListener('mouseleave', hideOnLeave)
  }
}

const unhighlightOrbit = (index: number) => {
  // Add a small delay before hiding to allow mouse to move to panel
  hoverTimeouts[index] = setTimeout(() => {
    const orbitElement = document.querySelector(`.orbital-value-${index + 1}`)
    const panelElement = document.querySelector(`.panel-${index + 1}`)
    
    if (orbitElement) {
      orbitElement.classList.remove('orbit-highlighted')
    }
    if (panelElement) {
      panelElement.classList.remove('panel-visible')
    }
    
    delete hoverTimeouts[index]
  }, 300) // 300ms delay
}

onMounted(() => {
  // Add scroll-triggered animations for orbital values
  const orbitalValues = document.querySelectorAll('.orbital-value')
  if (orbitalValues.length > 0) {
    const orbitalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('orbit-animate-in')
          }, index * 300)
        }
      })
    }, { threshold: 0.2 })
    
    orbitalValues.forEach(value => orbitalObserver.observe(value))
  }

  // Initialize constellation line animations
  const constellationLines = document.querySelectorAll('.constellation-line')
  if (constellationLines.length > 0) {
    setTimeout(() => {
      constellationLines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add('line-draw-in')
        }, index * 500)
      })
    }, 1000)
  }
})
</script>

<script lang="ts">
export default {
  name: 'ValuesSection'
}
</script>

<style scoped>
/* Values Section Background */
.values-section {
  min-height: 100vh;
  position: relative;
  overflow: visible;
}

/* Cosmic Background Effects */
.cosmic-background {
  pointer-events: none;
  z-index: 1;
}

.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-stops));
}

/* Nebula Clouds */
.nebula-cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: nebula-drift 20s ease-in-out infinite;
}

.nebula-1 {
  width: 400px;
  height: 200px;
  background: linear-gradient(45deg, #8B5CF6, #3B82F6);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.nebula-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(-45deg, #0EA5E9, #8B5CF6);
  top: 60%;
  right: 15%;
  animation-delay: 7s;
}

.nebula-3 {
  width: 250px;
  height: 150px;
  background: linear-gradient(135deg, #3B82F6, #06B6D4);
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

@keyframes nebula-drift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translate(20px, -30px) scale(1.1);
    opacity: 0.4;
  }
  66% {
    transform: translate(-15px, 20px) scale(0.9);
    opacity: 0.2;
  }
}

/* Energy Particles */
.energy-particles {
  pointer-events: none;
  z-index: 3;
}

.energy-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #0EA5E9, #3B82F6);
  border-radius: 50%;
  animation: energy-float 8s ease-in-out infinite;
  box-shadow: 0 0 10px #0EA5E9;
}

@keyframes energy-float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.8;
  }
  25% {
    transform: translateY(-30px) translateX(20px) scale(1.5);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) translateX(-15px) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: translateY(20px) translateX(10px) scale(1.2);
    opacity: 0.9;
  }
}

/* Orbital System */
.orbital-system {
  width: 100%;
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  overflow: visible;
  z-index: 100;
}

/* Orbital Values */
.orbital-values {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Value Panels Overlay */
.value-panels-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
}

/* Constellation Lines */
.constellation-lines {
  z-index: 50;
}

.constellation-line {
  stroke-dasharray: 10 5;
  stroke-dashoffset: 100;
  opacity: 0;
  transition: all 1s ease;
}

.constellation-line.line-draw-in {
  animation: line-draw 2s ease-out forwards;
}

@keyframes line-draw {
  to {
    stroke-dashoffset: 0;
    opacity: 0.6;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .orbital-system {
    height: 350px;
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .orbital-system {
    height: 300px;
    max-width: 600px;
  }
}

@media (max-width: 640px) {
  .values-section {
    padding: 4rem 0;
  }
  
  .orbital-system {
    height: 250px;
    max-width: 100%;
  }
}
</style>
