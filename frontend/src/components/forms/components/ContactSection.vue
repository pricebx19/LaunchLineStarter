<template>
  <section class="py-10 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Subtle starry background -->
    <StarryBackground 
      :small-count="20"
      :show-large="false"
      :show-medium="false" 
      :show-shooting="false"
      :opacity="0.3"
    />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Information -->
        <ContactInfo 
          :title="infoTitle"
          :description="infoDescription"
          :contact-methods="contactMethods"
          :response-time-title="responseTimeTitle"
          :response-time-description="responseTimeDescription"
        />

        <!-- Contact Form -->
        <ContactForm 
          ref="contactFormRef"
          :title="formTitle"
          :subject-options="subjectOptions"
          :success-message="successMessage"
          @submit="handleFormSubmit"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StarryBackground from '../../effects/StarryBackground.vue'
import ContactInfo from './ContactInfo.vue'
import ContactForm from '../ContactForm.vue'

interface ContactMethodData {
  title: string
  content?: string
  customContent?: string
  link?: string
  type: 'email' | 'phone' | 'location' | 'custom'
  iconPath?: string
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface Props {
  infoTitle?: string
  infoDescription?: string
  contactMethods?: ContactMethodData[]
  responseTimeTitle?: string
  responseTimeDescription?: string
  formTitle?: string
  subjectOptions?: string[]
  successMessage?: string
}

withDefaults(defineProps<Props>(), {
  infoTitle: "Let's Start a Conversation",
  infoDescription: "We're here to help you transform your business with professional web applications and software that convert. Whether you're a startup looking to scale, a growing business needing custom solutions, or any company ready to dominate digitally, our team is ready to launch your success.",
  contactMethods: () => [
    {
      title: 'Email',
      content: 'hello@launchline.com',
      link: 'mailto:hello@launchline.com',
      type: 'email'
    },
    {
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      type: 'phone'
    },
    {
      title: 'Office',
      customContent: '123 Innovation Drive<br>Tech City, TC 12345<br>United States',
      type: 'location'
    }
  ],
  responseTimeTitle: 'Quick Response Guaranteed',
  responseTimeDescription: "We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly. Your success is our priority.",
  formTitle: 'Send us a Message',
  subjectOptions: () => ['Website Design', 'Brand Development', 'SEO & Marketing', 'General Inquiry', 'Support'],
  successMessage: "Message sent successfully! We'll get back to you within 24 hours to discuss your project."
})

const emit = defineEmits<{
  submitForm: [formData: ContactFormData]
}>()

const contactFormRef = ref<InstanceType<typeof ContactForm> | null>(null)

const handleFormSubmit = (formData: ContactFormData) => {
  emit('submitForm', formData)
}

// Expose methods to control form state from parent
const setFormSubmitting = (value: boolean) => {
  contactFormRef.value?.setSubmitting(value)
}

const setFormSubmitted = (value: boolean) => {
  contactFormRef.value?.setSubmitted(value)
}

const setFormError = (value: string | null) => {
  contactFormRef.value?.setError(value)
}

defineExpose({
  setFormSubmitting,
  setFormSubmitted,
  setFormError
})

defineOptions({
  name: 'ContactSection'
})
</script>

<style scoped>
/* Section specific styles handled by child components */
</style>
