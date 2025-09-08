<template>
  <!-- Reading Progress Bar -->
  <div class="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
    <div 
      class="h-full bg-gradient-to-r from-brand-primary to-blue-600 transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  target?: string
}>(), {
  target: 'body'
})

const progress = ref(0)

const updateProgress = () => {
  const element = document.querySelector(props.target)
  if (!element) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = element.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / scrollHeight) * 100
  
  progress.value = Math.min(Math.max(scrollPercent, 0), 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
