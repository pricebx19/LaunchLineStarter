<template>
  <div class="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
    <div 
      class="h-full bg-gradient-to-r from-brand-primary to-blue-600 transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
}

defineProps<Props>()
</script>

<style scoped>
/* Reading progress bar */
.reading-progress {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
  background-size: 200% 100%;
  animation: progressGradient 3s ease infinite;
}

@keyframes progressGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
