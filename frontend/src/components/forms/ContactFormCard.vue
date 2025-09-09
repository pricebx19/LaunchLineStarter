<template>
  <div class="glass-card p-8">
    <h2 class="section-title text-3xl font-bold text-white mb-6">
      {{ title }}
      <span class="title-accent"></span>
    </h2>
    
    <!-- Form Success State -->
    <ContactFormSuccess 
      v-if="formSubmitted" 
      @reset="resetForm"
    />

    <!-- Contact Form -->
    <ContactFormFields
      v-else
      :form-data="formData"
      :form-errors="formErrors"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @field-change="handleFieldChange"
      @field-blur="handleFieldBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue'
import type { ContactFormData, FormErrors } from '../../types'

const ContactFormSuccess = defineAsyncComponent(() => import('./ContactFormSuccess.vue'))
const ContactFormFields = defineAsyncComponent(() => import('./ContactFormFields.vue'))

const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Start Your Project'
})

const emit = defineEmits<{
  'form-submit': [data: ContactFormData]
}>()

const formSubmitted = ref(false)
const isSubmitting = ref(false)

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  budget: '',
  timeline: '',
  message: ''
})

const formErrors = reactive<FormErrors>({})

const validateField = (field: string): boolean => {
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        formErrors.name = 'Name is required'
        return false
      }
      if (formData.name.length < 2) {
        formErrors.name = 'Name must be at least 2 characters'
        return false
      }
      delete formErrors.name
      return true

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        formErrors.email = 'Email is required'
        return false
      }
      if (!emailRegex.test(formData.email)) {
        formErrors.email = 'Please enter a valid email address'
        return false
      }
      delete formErrors.email
      return true

    case 'message':
      if (!formData.message.trim()) {
        formErrors.message = 'Message is required'
        return false
      }
      if (formData.message.length < 10) {
        formErrors.message = 'Message must be at least 10 characters'
        return false
      }
      delete formErrors.message
      return true

    default:
      return true
  }
}

const validateForm = (): boolean => {
  const fields = ['name', 'email', 'message']
  return fields.every(field => validateField(field))
}

const handleFieldChange = (field: string, value: string) => {
  ;(formData as any)[field] = value
  // Clear error when user starts typing
  if (formErrors[field]) {
    delete formErrors[field]
  }
}

const handleFieldBlur = (field: string) => {
  validateField(field)
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  
  try {
    // Emit the form data to parent component
    emit('form-submit', { ...formData })
    formSubmitted.value = true
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formSubmitted.value = false
  Object.keys(formData).forEach(key => {
    ;(formData as any)[key] = ''
  })
  Object.keys(formErrors).forEach(key => {
    delete formErrors[key]
  })
}
</script>

<style scoped>
.glass-card {
  @apply bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl;
}

.section-title {
  @apply relative;
}

.title-accent {
  @apply absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full;
}
</style>
