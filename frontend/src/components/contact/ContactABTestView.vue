<template>
  <div class="ab-test-container">
    <div class="ab-test-header">
      <h2 class="text-2xl font-bold text-white mb-4">A/B Testing Contact Pages</h2>
      <p class="text-gray-300 mb-6">Comparing legacy vs. Wagtail implementations</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="legacy-version">
        <h3 class="text-xl font-semibold text-white mb-4">Legacy Version</h3>
        <div class="contact-page min-h-screen relative overflow-hidden">
          <!-- Legacy content here -->
          <div class="p-8 text-center">
            <h1 class="text-4xl font-bold text-white mb-4">Legacy Contact Page</h1>
            <p class="text-gray-300">This is the current Vue.js implementation</p>
          </div>
        </div>
      </div>
      
      <div class="wagtail-version">
        <h3 class="text-xl font-semibold text-white mb-4">Wagtail Version</h3>
        <div v-if="isLoadingWagtailData" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p class="text-gray-300">Loading...</p>
        </div>
        <div v-else-if="wagtailDataError" class="p-8 text-center">
          <p class="text-red-400">Failed to load: {{ wagtailDataError }}</p>
          <button 
            @click="handleRetry" 
            class="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
        <WagtailContactPage 
          v-else
          :wagtail-data="wagtailData"
          @submit-form="handleFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { WagtailContactData } from '../../composables/useWagtailContactData'
import type { ContactFormData } from '../../composables/useContactForm'

const WagtailContactPage = defineAsyncComponent(() => import('./WagtailContactPage.vue'))

interface Props {
  isLoadingWagtailData: boolean
  wagtailDataError: string | null
  wagtailData: WagtailContactData
}

interface Emits {
  (e: 'retry'): void
  (e: 'submit-form', formData: ContactFormData): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleRetry = () => {
  emit('retry')
}

const handleFormSubmit = (formData: ContactFormData) => {
  emit('submit-form', formData)
}
</script>

<style scoped>
/* A/B Testing Styles */
.ab-test-container {
  @apply min-h-screen bg-gray-900 p-8;
}

.ab-test-header {
  @apply text-center mb-8;
}

.legacy-version, .wagtail-version {
  @apply border border-gray-600 rounded-lg overflow-hidden;
}

.legacy-version {
  @apply bg-gray-800;
}

.wagtail-version {
  @apply bg-gray-700;
}

/* Responsive Design */
@media (max-width: 768px) {
  .ab-test-container {
    @apply p-4;
  }
}
</style>
