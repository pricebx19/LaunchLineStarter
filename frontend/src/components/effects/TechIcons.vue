<template>
  <div class="tech-icons-container absolute inset-0">
    <div 
      class="tech-icon" 
      v-for="i in count" 
      :key="`tech-${i}`" 
      :style="getTechIconStyle(i)"
    >
      <slot name="icon" :index="i">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TechIconProps } from '../../types'

interface Props extends TechIconProps {}

const props = withDefaults(defineProps<Props>(), {
  count: 6,
  color: '#0EA5E9',
  speed: 4
})

defineOptions({
  name: 'TechIcons'
})

// Generate tech icon positions
const getTechIconStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * props.speed
  const duration = 3 + Math.random() * 3
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    color: props.color
  }
}
</script>

<script lang="ts">
export default {
  name: 'TechIcons'
}
</script>

<style scoped>
.tech-icons-container {
  pointer-events: none;
}

.tech-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  animation: tech-float 4s ease-in-out infinite;
  opacity: 0.4;
}

@keyframes tech-float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-15px) translateX(8px) rotate(180deg);
    opacity: 0.8;
  }
}
</style>
