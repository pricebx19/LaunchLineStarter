<template>
  <div class="mission-card group">
    <div class="mission-icon-wrapper">
      <div class="mission-icon">
        <slot name="icon">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </slot>
      </div>
    </div>
    <h3 class="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
      {{ title }}
    </h3>
    <p class="text-gray-400 text-sm leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { MissionFeature } from '../../types/About'

interface Props {
  title: string
  description: string
  icon?: string
}

defineProps<Props>()

defineOptions({
  name: 'MissionCard'
})
</script>

<style scoped>
.mission-card {
  background-color: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.5s ease;
}

.mission-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(14, 165, 233, 0.1);
}

.mission-icon-wrapper {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.2));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
}

.group:hover .mission-icon-wrapper {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
  transform: scale(1.1);
}

.mission-icon {
  color: #0EA5E9;
  transition: color 0.5s ease;
}

.group:hover .mission-icon {
  color: #60A5FA;
}
</style>
