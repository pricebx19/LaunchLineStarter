<template>
  <form @submit.prevent="$emit('submit')" class="space-y-6">
    <!-- Name and Email Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="form-group">
        <label for="name" class="form-label">Full Name *</label>
        <input
          id="name"
          :value="formData.name"
          type="text"
          required
          class="form-input"
          :class="{ 'error': formErrors.name, 'valid': formData.name && !formErrors.name }"
          placeholder="Enter your full name"
          @blur="$emit('field-blur', 'name')"
          @input="handleInput('name', $event)"
        >
        <div v-if="formErrors.name" class="field-error">{{ formErrors.name }}</div>
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email Address *</label>
        <input
          id="email"
          :value="formData.email"
          type="email"
          required
          class="form-input"
          :class="{ 'error': formErrors.email, 'valid': formData.email && !formErrors.email }"
          placeholder="Enter your email address"
          @blur="$emit('field-blur', 'email')"
          @input="handleInput('email', $event)"
        >
        <div v-if="formErrors.email" class="field-error">{{ formErrors.email }}</div>
      </div>
    </div>

    <!-- Project Type -->
    <div class="form-group">
      <label for="projectType" class="form-label">Project Type</label>
      <select
        id="projectType"
        :value="formData.subject"
        class="form-input"
        @change="handleInput('subject', $event)"
      >
        <option value="">Select project type</option>
        <option v-for="option in projectTypes" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Budget and Timeline Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="form-group">
        <label for="budget" class="form-label">Project Budget</label>
        <select
          id="budget"
          :value="formData.budget"
          class="form-input"
          @change="handleInput('budget', $event)"
        >
          <option value="">Select budget range</option>
          <option v-for="range in budgetRanges" :key="range" :value="range">
            {{ range }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="timeline" class="form-label">Desired Timeline</label>
        <select
          id="timeline"
          :value="formData.timeline"
          class="form-input"
          @change="handleInput('timeline', $event)"
        >
          <option value="">Select timeline</option>
          <option v-for="time in timelines" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
    </div>

    <!-- Message -->
    <div class="form-group">
      <label for="message" class="form-label">Project Details *</label>
      <textarea
        id="message"
        :value="formData.message"
        required
        rows="6"
        class="form-input resize-none"
        :class="{ 'error': formErrors.message, 'valid': formData.message && !formErrors.message }"
        placeholder="Tell us about your project, goals, and any specific requirements..."
        @blur="$emit('field-blur', 'message')"
        @input="handleInput('message', $event)"
      ></textarea>
      <div v-if="formErrors.message" class="field-error">{{ formErrors.message }}</div>
    </div>

    <!-- Submit Button -->
    <div class="form-group">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="submit-button w-full"
        :class="{ 'submitting': isSubmitting }"
      >
        <span v-if="!isSubmitting" class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Launch Your Project
        </span>
        <span v-else class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Launching...
        </span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContactFormData, FormErrors } from '../../types'

defineProps<{
  formData: ContactFormData
  formErrors: FormErrors
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  'submit': []
  'field-change': [field: string, value: string]
  'field-blur': [field: string]
}>()

const projectTypes = computed(() => [
  'Website Design & Development',
  'Web Application',
  'E-commerce Platform',
  'Mobile App',
  'Custom Software',
  'Digital Marketing',
  'Consulting & Strategy',
  'Other'
])

const budgetRanges = computed(() => [
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
  'I need a custom quote'
])

const timelines = computed(() => [
  'ASAP (Rush Project)',
  '1-2 months',
  '2-4 months',
  '4-6 months',
  '6+ months',
  'Flexible timeline'
])

const handleInput = (field: string, event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  emit('field-change', field, target.value)
}
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-semibold text-white;
}

.form-input {
  @apply w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-brand-primary focus:bg-white/15 focus:outline-none transition-all duration-300;
}

.form-input.error {
  @apply border-red-400 bg-red-400/10;
}

.form-input.valid {
  @apply border-green-400 bg-green-400/10;
}

.field-error {
  @apply text-red-400 text-sm mt-1;
}

.submit-button {
  @apply px-8 py-4 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.submit-button.submitting {
  @apply bg-gradient-to-r from-gray-600 to-gray-700;
}

/* Select styling */
.form-input option {
  @apply bg-gray-800 text-white;
}
</style>
