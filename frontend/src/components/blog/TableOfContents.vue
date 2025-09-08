<template>
  <transition name="slide-in">
    <div 
      v-if="show && items.length > 0"
      class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div class="toc-container">
        <h3 class="text-sm font-semibold text-white mb-3">Table of Contents</h3>
        <nav class="space-y-2">
          <a 
            v-for="(heading, index) in items" 
            :key="index"
            :href="`#${heading.id}`"
            @click.prevent="handleHeadingClick(heading.id)"
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
import type { TableOfContentsItem } from '../../composables/useTableOfContents'

interface Props {
  show: boolean
  items: TableOfContentsItem[]
  activeHeading: string
}

interface Emits {
  (e: 'heading-click', id: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleHeadingClick = (id: string) => {
  emit('heading-click', id)
}
</script>

<style scoped>
/* Table of Contents styling */
.toc-container {
  backdrop-filter: blur(12px);
  background: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(75, 85, 99, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 20rem;
}

.toc-container nav a {
  transition: all 0.3s ease;
  position: relative;
}

.toc-container nav a::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #3b82f6, transparent);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.toc-container nav a:hover::before,
.toc-container nav a.active::before {
  transform: scaleY(1);
}

/* Enhanced slide-in animations */
.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(-20px) translateY(-50%);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-20px) translateY(-50%);
}

/* Mobile optimizations */
@media (max-width: 1024px) {
  .toc-container {
    display: none !important;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .toc-container {
    border: 2px solid white;
    background: black;
  }
}
</style>
