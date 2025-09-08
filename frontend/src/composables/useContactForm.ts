import { ref, type Ref } from 'vue'
import { api } from '../lib/api'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function useContactForm(contactSectionRef?: Ref<any>) {
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const error = ref<string | null>(null)

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      isSubmitting.value = true
      error.value = null

      // Handle form submission for both legacy and Wagtail versions
      if (contactSectionRef?.value) {
        contactSectionRef.value.setFormSubmitting(true)
        contactSectionRef.value.setFormError(null)
      }

      const leadData = {
        name: formData.name,
        email: formData.email,
        message: `Subject: ${formData.subject || 'General Inquiry'}\n\n${formData.message}`,
        source: 'website'
      }

      const response = await api.submitLead(leadData)

      if (response.success) {
        isSubmitted.value = true
        if (contactSectionRef?.value) {
          contactSectionRef.value.setFormSubmitted(true)
        }
        // Show success message from backend
        if (response.data?.message) {
          console.log('Backend success message:', response.data.message)
        }
        return { success: true, message: response.data?.message || 'Message sent successfully!' }
      } else {
        const errorMessage = response.error || 'Failed to send message. Please try again or call us directly.'
        error.value = errorMessage
        if (contactSectionRef?.value) {
          contactSectionRef.value.setFormError(errorMessage)
        }
        return { success: false, message: errorMessage }
      }
    } catch (err) {
      const errorMessage = 'Network error occurred. Please try again later or call us at +1 (555) 123-4567.'
      error.value = errorMessage
      if (contactSectionRef?.value) {
        contactSectionRef.value.setFormError(errorMessage)
      }
      console.error('Failed to submit form:', err)
      return { success: false, message: errorMessage }
    } finally {
      isSubmitting.value = false
      if (contactSectionRef?.value) {
        contactSectionRef.value.setFormSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    isSubmitting.value = false
    isSubmitted.value = false
    error.value = null
  }

  return {
    isSubmitting,
    isSubmitted,
    error,
    handleFormSubmit,
    resetForm
  }
}
