<template>
  <div 
    :class="`orbital-value orbital-value-${index + 1}`"
    class="orbital-value"
  >
    <!-- Orbit Path -->
    <div :class="`orbit-path orbit-${index + 1}`"></div>
    
    <!-- Value Planet -->
    <div 
      class="value-planet"
      @mouseenter="$emit('highlight', index)"
      @mouseleave="$emit('unhighlight', index)"
    >
      <div class="planet-atmosphere"></div>
      <div class="planet-surface">
        <div class="planet-icon">
          <div v-html="value.icon" class="w-8 h-8 text-white"></div>
        </div>
      </div>
      <div class="planet-glow"></div>
      
      <!-- Orbiting Moons -->
      <div class="moon moon-1"></div>
      <div class="moon moon-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ValueConstellation } from '../../data/aboutData'

interface Props {
  value: ValueConstellation
  index: number
}

defineProps<Props>()

defineEmits<{
  highlight: [index: number]
  unhighlight: [index: number]
}>()

defineOptions({
  name: 'ValuePlanet'
})
</script>

<script lang="ts">
export default {
  name: 'ValuePlanet'
}
</script>

<style scoped>
.orbital-value {
  position: absolute;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 200;
}

.orbital-value .value-planet {
  pointer-events: auto;
  position: relative;
  z-index: 50;
}

.orbital-value.orbit-animate-in {
  opacity: 1;
  transform: scale(1);
}

/* Orbit Paths */
.orbit-path {
  position: absolute;
  border: 1px dashed;
  border-radius: 50%;
  opacity: 0.2;
  animation: orbit-rotation 30s linear infinite;
}

.orbit-1 {
  width: 300px;
  height: 300px;
  border-color: #0EA5E9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 20s;
}

.orbit-2 {
  width: 450px;
  height: 450px;
  border-color: #8B5CF6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 30s;
  animation-direction: reverse;
}

.orbit-3 {
  width: 600px;
  height: 600px;
  border-color: #06B6D4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 40s;
}

.orbit-4 {
  width: 750px;
  height: 750px;
  border-color: #3B82F6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 50s;
  animation-direction: reverse;
}

@keyframes orbit-rotation {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Orbital Value Positioning */
.orbital-value-1 {
  top: 25%;
  right: 30%;
  animation: orbital-movement-1 20s ease-in-out infinite;
}

.orbital-value-2 {
  top: 20%;
  left: 30%;
  animation: orbital-movement-2 30s ease-in-out infinite reverse;
}

.orbital-value-3 {
  top: 80%;
  left: 30%;
  animation: orbital-movement-3 40s ease-in-out infinite;
}

.orbital-value-4 {
  top: 75%;
  right: 30%;
  animation: orbital-movement-4 50s ease-in-out infinite reverse;
}

@keyframes orbital-movement-1 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-20px, 30px); }
  50% { transform: translate(-40px, 0); }
  75% { transform: translate(-20px, -30px); }
}

@keyframes orbital-movement-2 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, 20px); }
  50% { transform: translate(0, 40px); }
  75% { transform: translate(-30px, 20px); }
}

@keyframes orbital-movement-3 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(40px, -20px); }
  50% { transform: translate(0, -40px); }
  75% { transform: translate(-40px, -20px); }
}

@keyframes orbital-movement-4 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(25px, 35px); }
  50% { transform: translate(50px, 0); }
  75% { transform: translate(25px, -35px); }
}

/* Value Planets */
.value-planet {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: all 0.5s ease;
}

.value-planet:hover {
  transform: scale(1.2);
}

.planet-atmosphere {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(14, 165, 233, 0.6));
  animation: planet-rotate 15s linear infinite;
}

.planet-surface {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1f2937, #374151);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

.planet-icon {
  z-index: 2;
}

.planet-glow {
  position: absolute;
  width: 100px;
  height: 100px;
  top: -10px;
  left: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, transparent 60%, rgba(14, 165, 233, 0.3));
  animation: planet-glow 3s ease-in-out infinite;
}

@keyframes planet-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes planet-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* Planet Moons */
.moon {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #9CA3AF;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(156, 163, 175, 0.5);
}

.moon-1 {
  top: 10px;
  right: -5px;
  animation: moon-orbit-1 8s linear infinite;
}

.moon-2 {
  bottom: 10px;
  left: -5px;
  animation: moon-orbit-2 12s linear infinite reverse;
}

@keyframes moon-orbit-1 {
  from { transform: rotate(0deg) translateX(45px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
}

@keyframes moon-orbit-2 {
  from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
}

/* Highlighted orbital values */
.orbital-value.orbit-highlighted .value-planet {
  transform: scale(1.2);
}

.orbital-value.orbit-highlighted .planet-glow {
  opacity: 1;
  transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .orbit-1 { width: 250px; height: 250px; }
  .orbit-2 { width: 350px; height: 350px; }
  .orbit-3 { width: 450px; height: 450px; }
  .orbit-4 { width: 550px; height: 550px; }
}

@media (max-width: 768px) {
  .orbit-1 { width: 200px; height: 200px; }
  .orbit-2 { width: 280px; height: 280px; }
  .orbit-3 { width: 360px; height: 360px; }
  .orbit-4 { width: 440px; height: 440px; }
  
  .value-planet {
    width: 60px;
    height: 60px;
  }
  
  .planet-atmosphere {
    width: 60px;
    height: 60px;
  }
  
  .planet-surface {
    width: 45px;
    height: 45px;
    top: 7.5px;
    left: 7.5px;
  }
}

@media (max-width: 640px) {
  .orbital-value {
    position: relative;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .orbital-value-1,
  .orbital-value-2, 
  .orbital-value-3,
  .orbital-value-4 {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    animation: none;
  }
}
</style>
