<template>
  <div class="particles-container absolute inset-0">
    <div 
      class="particle" 
      v-for="i in count" 
      :key="`particle-${i}`" 
      :style="getParticleStyle()"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProps } from '../../types/Common'

interface Props extends AnimationProps {
  count?: number
  color?: string
  size?: number
  speed?: number
  preset?: 'default' | 'subtle' | 'intense'
}

const props = withDefaults(defineProps<Props>(), {
  count: 8,
  color: '#0EA5E9',
  size: 4,
  speed: 6,
  preset: 'default'
})

defineOptions({
  name: 'FloatingParticles'
})

// Generate particle positions
const getParticleStyle = () => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * props.speed
  const duration = 4 + Math.random() * 4
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    background: `linear-gradient(45deg, ${props.color}, #3B82F6)`
  }
}
</script>

<script lang="ts">
export default {
  name: 'FloatingParticles'
}
</script>

<style scoped>
.particles-container {
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) translateX(10px);
    opacity: 1;
  }
}
</style>
