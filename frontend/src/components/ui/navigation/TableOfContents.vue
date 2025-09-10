<template>
  <transition name="slide-in">
    <div 
      v-if="visible && headings && headings.length > 0"
      class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div class="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 max-w-xs">
        <h3 class="text-sm font-semibold text-white mb-3">{{ title }}</h3>
        <nav class="space-y-2">
          <a 
            v-for="(heading, index) in headings" 
            :key="index"
            :href="`#${heading.id}`"
            @click.prevent="scrollToHeading(heading.id)"
            class="block text-xs text-gray-400 hover:text-brand-primary transition-colors py-1 border-l-2 border-transparent hover:border-brand-primary pl-3"
            :class="{ 'text-brand-primary border-brand-primary': activeHeading === heading.id }"
          >
            {{ heading.text }}
          </a>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

const props = withDefaults(defineProps<{
  visible?: boolean
  title?: string
  headings?: Heading[]
}>(), {
  visible: true,
  title: 'Table of Contents'
})

const activeHeading = ref('')

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const updateActiveHeading = () => {
  const headings = props.headings
  if (!headings || !headings.length) return

  // Find the current heading based on scroll position
  for (let i = headings.length - 1; i >= 0; i--) {
    const element = document.getElementById(headings[i]?.id || '')
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100) { // 100px offset for better UX
        activeHeading.value = headings[i]?.id || ''
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
  updateActiveHeading() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-100%) translateY(-50%);
}
</style>
