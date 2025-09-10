<template>
  <div class="card hover:shadow-2xl hover:border-brand-primary/50 transition-all duration-300">
    <h2 class="text-2xl font-bold text-white mb-6">{{ title }}</h2>
    
    <form 
      action="https://formspree.io/f/mrbagvqo" 
      method="POST"
      @submit.prevent="handleSubmit" 
      class="space-y-6"
    >
      <!-- Success Message -->
      <FormMessage 
        v-if="submitted && !error"
        type="success"
        :message="successMessage"
      />

      <!-- Error Message -->
      <FormMessage 
        v-if="error"
        type="error"
        :message="error"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            v-model="formData.name"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent hover:border-gray-500 transition-colors"
            :placeholder="namePlaceholder ?? 'Enter your full name'"
          >
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent hover:border-gray-500 transition-colors"
            :placeholder="emailPlaceholder ?? 'Enter your email address'"
          >
        </div>
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          v-model="formData.subject"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent hover:border-gray-500 transition-colors"
        >
          <option value="">{{ subjectPlaceholder }}</option>
          <option v-for="option in subjectOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          v-model="formData.message"
          required
          :rows="messageRows || 4"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none hover:border-gray-500 transition-colors"
          :placeholder="messagePlaceholder ?? 'Tell us about your project...'"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          :disabled="submitting"
          class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
        >
          <span v-if="submitting" class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submittingText }}
          </span>
          <span v-else>{{ submitText }}</span>
        </button>
      </div>

      <p class="text-sm text-gray-400 text-center">
        {{ disclaimerText }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FormMessage from '../ui/FormMessage.vue'
import type { ContactFormData, ContactFormProps } from '../../types'

interface Props extends ContactFormProps {}

withDefaults(defineProps<Props>(), {
  title: 'Send us a Message',
  subjectOptions: () => ['Website Design', 'Brand Development', 'SEO & Marketing', 'General Inquiry', 'Support'],
  successMessage: "Message sent successfully! We'll get back to you within 24 hours to discuss your project.",
  namePlaceholder: 'Enter your full name',
  emailPlaceholder: 'Enter your email address',
  subjectPlaceholder: 'Select a subject',
  messagePlaceholder: 'Tell us about your project, business goals, and how we can help launch your digital success...',
  submitText: 'Send Message',
  submittingText: 'Sending Message...',
  disclaimerText: 'By submitting this form, you agree to our privacy policy and terms of service.',
  messageRows: 6
})

const emit = defineEmits<{
  submit: [formData: ContactFormData]
}>()

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.message) {
    error.value = 'Please fill in all required fields.'
    return
  }

  try {
    submitting.value = true
    error.value = null
    
    emit('submit', { ...formData })
    
    // Wait for parent to handle submission
    // Reset form on success (parent should emit success)
    
  } catch (err) {
    error.value = 'Failed to send message. Please try again.'
    console.error('Form submission error:', err)
  } finally {
    submitting.value = false
  }
}

// Expose methods for parent to control state
const setSubmitting = (value: boolean) => {
  submitting.value = value
}

const setSubmitted = (value: boolean) => {
  submitted.value = value
  if (value) {
    // Reset form on successful submission
    Object.assign(formData, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }
}

const setError = (value: string | null) => {
  error.value = value
}

defineExpose({
  setSubmitting,
  setSubmitted,
  setError
})

defineOptions({
  name: 'ContactForm'
})
</script>

<style scoped>
/* Card hover effects */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Form input hover effects */
input:hover, select:hover, textarea:hover {
  border-color: #6b7280;
}

/* Button hover effects */
.btn-primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.4);
}
</style>
