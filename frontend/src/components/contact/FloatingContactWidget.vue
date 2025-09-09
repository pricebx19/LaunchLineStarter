<template>
  <div class="floating-contact-widget">
    <button @click="handleToggle" class="widget-toggle" :class="{ 'open': widgetOpen }">
      <svg v-if="!widgetOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
    <div class="widget-content" :class="{ 'open': widgetOpen }">
      <div class="widget-header">
        <h4 class="text-white font-semibold">{{ widgetData.title }}</h4>
        <p class="text-gray-300 text-sm">{{ widgetData.subtitle || 'Get in touch with us' }}</p>
      </div>
      <div class="widget-methods">
        <a v-for="method in (widgetData.methods || [])" :key="method.type" :href="method.href" class="widget-method">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon"/>
          </svg>
          {{ method.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FLOATING_WIDGET_DATA } from '../../data/forms'
import type { FloatingWidgetData } from '../../types/index'

interface Props {
  widgetOpen: boolean
  widgetData?: FloatingWidgetData
}

interface Emits {
  (e: 'toggle'): void
}

const props = withDefaults(defineProps<Props>(), {
  widgetData: () => FLOATING_WIDGET_DATA
})

const emit = defineEmits<Emits>()

const handleToggle = () => {
  emit('toggle')
}
</script>

<style scoped>
/* Floating Contact Widget */
.floating-contact-widget {
  @apply fixed bottom-8 right-8 z-50;
}

.widget-toggle {
  @apply w-14 h-14 bg-brand-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center;
}

.widget-toggle.open {
  @apply bg-red-500;
}

.widget-content {
  @apply absolute bottom-16 right-0 w-80 bg-gray-800 rounded-lg shadow-xl p-6 opacity-0 pointer-events-none transform translate-y-4 transition-all duration-300;
}

.widget-content.open {
  @apply opacity-100 pointer-events-auto transform translate-y-0;
}

.widget-header {
  @apply mb-4 pb-4 border-b border-gray-600;
}

.widget-methods {
  @apply space-y-3;
}

.widget-method {
  @apply flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200;
}

/* Responsive Design */
@media (max-width: 768px) {
  .floating-contact-widget {
    @apply bottom-4 right-4;
  }
  
  .widget-content {
    @apply w-72 right-0;
  }
}
</style>
