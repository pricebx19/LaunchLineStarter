<template>
  <div class="central-core">
    <div class="core-ring core-ring-1"></div>
    <div class="core-ring core-ring-2"></div>
    <div class="core-ring core-ring-3"></div>
    <div class="core-center">
      <div class="core-logo">
        <slot name="logo">
          <svg class="w-12 h-12 text-brand-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </slot>
      </div>
      <div class="core-pulse-1"></div>
      <div class="core-pulse-2"></div>
      <div class="core-pulse-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProps } from '../../types/Common'

interface Props extends AnimationProps {
  size?: 'sm' | 'md' | 'lg'
  animationSpeed?: number
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  animationSpeed: 1
})

defineOptions({
  name: 'OrbitalCore'
})
</script>

<style scoped>
/* Central Core */
.central-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.core-ring {
  position: absolute;
  border: 1px solid;
  border-radius: 50%;
  animation: core-rotate 20s linear infinite;
}

.core-ring-1 {
  width: 80px;
  height: 80px;
  border-color: rgba(14, 165, 233, 0.3);
  top: -40px;
  left: -40px;
  animation-duration: 15s;
}

.core-ring-2 {
  width: 120px;
  height: 120px;
  border-color: rgba(139, 92, 246, 0.2);
  top: -60px;
  left: -60px;
  animation-duration: 25s;
  animation-direction: reverse;
}

.core-ring-3 {
  width: 160px;
  height: 160px;
  border-color: rgba(6, 182, 212, 0.15);
  top: -80px;
  left: -80px;
  animation-duration: 35s;
}

@keyframes core-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.core-center {
  position: relative;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.8), rgba(59, 130, 246, 0.4));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.6);
}

.core-logo {
  z-index: 2;
}

.core-pulse-1, .core-pulse-2, .core-pulse-3 {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.3);
  animation: core-pulse 2s ease-out infinite;
}

.core-pulse-1 { animation-delay: 0s; }
.core-pulse-2 { animation-delay: 0.7s; }
.core-pulse-3 { animation-delay: 1.4s; }

@keyframes core-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
