<template>
  <div class="flex items-start space-x-4 group hover:scale-105 transition-transform duration-300">
    <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:scale-110">
      <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
      </svg>
    </div>
    <div>
      <h3 class="text-white font-semibold mb-1 group-hover:text-brand-primary transition-colors">{{ title }}</h3>
      <component 
        :is="isLink ? 'a' : 'div'" 
        :href="isLink ? link : undefined"
        :class="linkClass"
      >
        <slot>
          {{ content }}
        </slot>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  content?: string
  link?: string
  type: 'email' | 'phone' | 'location' | 'custom'
  iconPath?: string
}

const props = defineProps<Props>()

const isLink = computed(() => Boolean(props.link))

const linkClass = computed(() => {
  if (isLink.value) {
    return 'text-brand-primary hover:text-blue-400 transition-colors'
  }
  return 'text-gray-300'
})

const iconPath = computed(() => {
  if (props.iconPath) return props.iconPath
  
  switch (props.type) {
    case 'email':
      return 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    case 'phone':
      return 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    case 'location':
      return 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
})

defineOptions({
  name: 'ContactMethod'
})
</script>

<style scoped>
/* Component-specific styles handled by parent styling */
</style>
