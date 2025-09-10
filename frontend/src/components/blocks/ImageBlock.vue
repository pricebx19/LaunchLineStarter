<template>
  <section class="image-block py-16 bg-gray-800">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="imageContainerClasses">
        <img
          :src="src"
          :alt="caption || 'Content image'"
          class="max-w-full h-auto rounded-lg shadow-lg"
          loading="lazy"
        />
        <p v-if="caption" class="image-caption text-center text-gray-400 mt-3 text-sm">
          {{ caption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  caption?: string
  alignment?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  alignment: 'center'
})

const imageContainerClasses = computed(() => {
  const baseClasses = ['image-container']
  
  switch (props.alignment) {
    case 'left':
      baseClasses.push('flex justify-start')
      break
    case 'right':
      baseClasses.push('flex justify-end')
      break
    case 'center':
    default:
      baseClasses.push('flex justify-center')
      break
  }
  
  return baseClasses.join(' ')
})
</script>

<style scoped>
.image-container {
  @apply w-full;
}

.image-caption {
  @apply italic;
}
</style>
