<template>
  <div class="stars-container absolute inset-0" :style="{ opacity }">
    <!-- Large stars -->
    <template v-if="showLarge">
      <div 
        class="star star-large" 
        v-for="i in largeCount" 
        :key="`large-${i}`" 
        :style="getStarStyle(i, 'large')"
      ></div>
    </template>
    
    <!-- Medium stars -->
    <template v-if="showMedium">
      <div 
        class="star star-medium" 
        v-for="i in mediumCount" 
        :key="`medium-${i}`" 
        :style="getStarStyle(i, 'medium')"
      ></div>
    </template>
    
    <!-- Small stars -->
    <template v-if="showSmall">
      <div 
        class="star star-small" 
        v-for="i in smallCount" 
        :key="`small-${i}`" 
        :style="getStarStyle(i, 'small')"
      ></div>
    </template>
    
    <!-- Shooting stars -->
    <template v-if="showShooting">
      <div 
        class="shooting-star" 
        v-for="i in shootingCount" 
        :key="`shooting-${i}`" 
        :style="getShootingStarStyle(i)"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProps } from '../../types/Common'
import { STARRY_BACKGROUND_PRESETS } from '../../data/animations'

interface StarryBackgroundProps extends AnimationProps {
  largeCount?: number
  mediumCount?: number
  smallCount?: number
  shootingCount?: number
  showLarge?: boolean
  showMedium?: boolean
  showSmall?: boolean
  showShooting?: boolean
  opacity?: number
  preset?: 'subtle' | 'default' | 'intense'
}

const props = withDefaults(defineProps<StarryBackgroundProps>(), {
  largeCount: 15,
  mediumCount: 30,
  smallCount: 45,
  shootingCount: 2,
  showLarge: true,
  showMedium: true,
  showSmall: true,
  showShooting: true,
  opacity: 1,
  preset: 'default'
})

defineOptions({
  name: 'StarryBackground'
})

// Generate random star positions
const getStarStyle = (index: number, size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Generate shooting star positions
const getShootingStarStyle = (index: number) => {
  const startX = Math.random() * 100
  const startY = Math.random() * 50
  const delay = Math.random() * 8
  
  return {
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
/* Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-large {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
}

.star-medium {
  width: 2px;
  height: 2px;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.6);
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Shooting Star */
.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, white, transparent);
  border-radius: 50%;
  animation: shooting-star 8s linear infinite;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, white, transparent);
  transform: translateX(-100px);
}

/* Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes shooting-star {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
    transform: translateX(100px) translateY(100px) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translateX(200px) translateY(200px) rotate(45deg);
  }
}
</style>
