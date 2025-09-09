<template>
  <div class="absolute inset-0 overflow-hidden">
    <div 
      v-for="(shape, index) in shapes" 
      :key="index"
      :class="`floating-shape shape-${index + 1}`"
      :style="shape.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FloatingShape } from '../../types'

const props = withDefaults(defineProps<{
  count?: number
  customShapes?: FloatingShape[]
}>(), {
  count: 4
})

const shapes = computed(() => {
  if (props.customShapes) {
    return props.customShapes.map(shape => ({
      style: {
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        background: shape.gradient || shape.color,
        top: shape.position?.top,
        left: shape.position?.left,
        right: shape.position?.right,
        bottom: shape.position?.bottom,
        animationDelay: `${shape.delay || shape.animationDelay}s`
      }
    }))
  }

  // Default shapes
  const defaultShapes = [
    {
      style: {
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        top: '10%',
        left: '5%',
        animationDelay: '0s'
      }
    },
    {
      style: {
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, #ef4444, #f59e0b)',
        top: '60%',
        right: '10%',
        animationDelay: '-7s'
      }
    },
    {
      style: {
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, #10b981, #06b6d4)',
        top: '30%',
        right: '30%',
        animationDelay: '-14s'
      }
    },
    {
      style: {
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
        bottom: '20%',
        left: '20%',
        animationDelay: '-21s'
      }
    }
  ]

  return defaultShapes.slice(0, props.count)
})
</script>

<style scoped>
.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
  }
  66% {
    transform: translateY(-60px) rotate(240deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-shape {
    display: none;
  }
}
</style>
