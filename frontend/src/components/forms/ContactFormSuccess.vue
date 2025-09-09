<template>
  <div class="success-state">
    <div class="success-icon">
      <svg class="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h3 class="text-2xl font-bold text-white mb-4">{{ title }}</h3>
    <p class="text-gray-300 mb-6">{{ message }}</p>
    <button @click="$emit('reset')" class="btn-primary">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ContactFormSuccessProps } from '../../types'

interface Props extends ContactFormSuccessProps {}

withDefaults(defineProps<Props>(), {
  title: 'Message Sent Successfully!',
  message: 'Thank you for reaching out! We\'ll get back to you within 24 hours to discuss your project in detail.',
  buttonText: 'Send Another Message'
})

defineEmits<{
  'reset': []
}>()
</script>

<style scoped>
.success-state {
  @apply text-center py-8;
}

.success-icon {
  @apply w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6;
}

.btn-primary {
  @apply inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg;
}
</style>
