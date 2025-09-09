<template>
  <div class="section-background">
    <div class="bg-gradient"></div>
    <div class="floating-elements">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProps } from '../../types/Common'

interface Props extends AnimationProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: 'blue' | 'purple' | 'mixed'
}

withDefaults(defineProps<Props>(), {
  intensity: 'medium',
  color: 'mixed'
})

defineOptions({
  name: 'BlogBackgroundEffects'
})
</script>

<style scoped>
/* Section Background */
.section-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at bottom, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
}

.floating-elements {
  position: absolute;
  inset: 0;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  animation: floatOrb 8s ease-in-out infinite;
  filter: blur(1px);
}

.orb-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 15%;
  animation-delay: -3s;
}

.orb-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 70%;
  animation-delay: -6s;
}

@keyframes floatOrb {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  33% {
    transform: translateY(-20px) translateX(10px) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(10px) translateX(-10px) scale(0.9);
    opacity: 0.5;
  }
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .orb-3 {
    display: none;
  }
}

@media (max-width: 768px) {
  .orb-1, .orb-2 {
    display: none;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .floating-orb {
    animation: none !important;
  }
}
</style>
