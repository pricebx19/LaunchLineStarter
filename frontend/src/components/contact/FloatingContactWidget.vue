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
        <h4 class="text-white font-semibold">Quick Contact</h4>
        <p class="text-gray-300 text-sm">We typically respond in under 2 hours</p>
      </div>
      <div class="widget-methods">
        <a href="tel:+15707663452" class="widget-method">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          Call Now
        </a>
        <a href="mailto:breprice@launchlinellc.com" class="widget-method">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Email Us
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  widgetOpen: boolean
}

interface Emits {
  (e: 'toggle'): void
}

defineProps<Props>()
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
