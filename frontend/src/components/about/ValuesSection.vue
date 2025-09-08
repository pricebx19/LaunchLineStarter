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
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-8 leading-tight">
          Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-400 to-cyan-300 animate-pulse">Guiding</span>
          <br class="block sm:hidden md:block">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-brand-primary to-purple-500">Constellation</span>
        </h2>
        
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 px-4">
          Like stars in the cosmos, our values illuminate every decision, guide every solution, and power every launch into the digital universe.
        </p>
        
        <div class="inline-flex items-center text-brand-primary font-semibold">
          <div class="w-1 h-1 bg-brand-primary rounded-full mr-2 animate-ping"></div>
          <span class="text-lg">Four Pillars. Infinite Possibilities.</span>
          <div class="w-1 h-1 bg-brand-primary rounded-full ml-2 animate-ping" style="animation-delay: 0.3s;"></div>
        </div>
      </div>
      
      <!-- Desktop: Orbital Values System -->
      <div class="orbital-system relative hidden" ref="orbitalSystemRef">
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

      <!-- Mobile: Card-based Values Layout -->
      <div class="mobile-values-grid">
        <div 
          v-for="(value, index) in valuesConstellation" 
          :key="`mobile-${value.title}`"
          class="mobile-value-card"
          :class="`card-${index + 1}`"
        >
          <!-- Card Header -->
          <div class="card-header">
            <div class="card-icon">
              <div v-html="value.icon" class="w-8 h-8 text-brand-primary"></div>
            </div>
            <div class="card-title-section">
              <h3 class="card-title">{{ value.title }}</h3>
              <div class="card-metrics">
                <span class="metric-badge">{{ value.metrics.impact }}</span>
                <span class="metric-label">{{ value.metrics.priority }}</span>
              </div>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <p class="card-description">{{ value.description }}</p>
            
            <!-- Principles -->
            <div class="card-principles">
              <h4 class="principles-title">Core Principles</h4>
              <ul class="principles-list">
                <li v-for="principle in value.principles" :key="principle" class="principle-item">
                  <div class="principle-dot"></div>
                  <span>{{ principle }}</span>
                </li>
              </ul>
            </div>

            <!-- Impact Bar -->
            <div class="card-impact">
              <div class="impact-bar">
                <div class="impact-fill" :style="`width: ${value.metrics.impactPercentage}%`"></div>
              </div>
              <span class="impact-text">{{ value.impact }}</span>
            </div>
          </div>

          <!-- Card Glow Effect -->
          <div class="card-glow"></div>
        </div>
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
  // Add scroll-triggered animations for orbital values (desktop only)
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

  // Initialize constellation line animations (desktop only)
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

  // Add scroll-triggered animations for mobile cards
  const mobileCards = document.querySelectorAll('.mobile-value-card')
  if (mobileCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('card-animate-in')
          }, index * 200)
        }
      })
    }, { threshold: 0.1 })
    
    mobileCards.forEach(card => cardObserver.observe(card))
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

/* Mobile Values Grid */
.mobile-values-grid {
  display: none; /* Hidden by default */
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
}

/* Show mobile grid only on screens smaller than 1025px */
@media (max-width: 1024px) {
  .mobile-values-grid {
    display: grid;
  }
}

/* Show orbital system only on screens 1025px and above */
@media (min-width: 1025px) {
  .orbital-system {
    display: block;
  }
}

.mobile-value-card {
  position: relative;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 24px;
  padding: 2rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(14, 165, 233, 0.1);
  opacity: 0;
  transform: translateY(30px);
}

.mobile-value-card.card-animate-in {
  opacity: 1;
  transform: translateY(0);
}

.mobile-value-card:hover {
  transform: translateY(-8px);
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 25px 35px -5px rgba(0, 0, 0, 0.4), 0 0 40px rgba(14, 165, 233, 0.2);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(139, 92, 246, 0.2));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.card-title-section {
  flex: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.card-metrics {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metric-badge {
  background: linear-gradient(135deg, #0EA5E9, #8B5CF6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.metric-label {
  color: #9CA3AF;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Card Content */
.card-content {
  color: #D1D5DB;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #E5E7EB;
}

.card-principles {
  margin-bottom: 1.5rem;
}

.principles-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
}

.principles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principle-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.principle-dot {
  width: 6px;
  height: 6px;
  background: #0EA5E9;
  border-radius: 50%;
  margin-right: 0.75rem;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.card-impact {
  border-top: 1px solid rgba(14, 165, 233, 0.2);
  padding-top: 1rem;
}

.impact-bar {
  height: 6px;
  background: rgba(14, 165, 233, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.impact-fill {
  height: 100%;
  background: linear-gradient(90deg, #0EA5E9, #8B5CF6);
  border-radius: 3px;
  transition: width 1.5s ease-out;
  animation: impact-fill 2s ease-out forwards;
}

.impact-text {
  font-size: 0.875rem;
  color: #9CA3AF;
  line-height: 1.4;
}

/* Card Glow Effect */
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.mobile-value-card:hover .card-glow {
  opacity: 1;
}

/* Card-specific animations */
.card-1 .impact-fill { animation-delay: 0.2s; }
.card-2 .impact-fill { animation-delay: 0.4s; }
.card-3 .impact-fill { animation-delay: 0.6s; }
.card-4 .impact-fill { animation-delay: 0.8s; }

@keyframes impact-fill {
  from { width: 0%; }
  to { width: var(--impact-width, 95%); }
}

/* Mobile card entrance animations */
@keyframes card-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-value-card.card-animate-in {
  animation: card-slide-up 0.6s ease-out forwards;
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
  
  .mobile-values-grid {
    gap: 1.5rem;
  }
  
  .mobile-value-card {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
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
  
  .mobile-values-grid {
    gap: 1.25rem;
  }
  
  .mobile-value-card {
    padding: 1.25rem;
  }
  
  .card-header {
    gap: 0.75rem;
  }
  
  .card-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .card-description {
    font-size: 0.875rem;
  }
}
</style>
