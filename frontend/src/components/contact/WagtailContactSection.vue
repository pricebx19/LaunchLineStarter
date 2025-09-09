<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <!-- Render StreamField blocks directly -->
    <template v-for="(block, index) in wagtailData.content" :key="`${block.type}-${index}`">
      
      <!-- Contact Info Block -->
      <div v-if="block.type === 'contact_info'" class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div class="contact-info-section">
          <div class="glass-card p-8 mb-8">
            <h2 class="section-title text-3xl font-bold text-white mb-6">
              Get In Touch
              <span class="title-accent"></span>
            </h2>
            <p class="text-gray-300 text-lg leading-relaxed mb-8">
              {{ block.value.company_description }}
            </p>

            <!-- Interactive Contact Methods -->
            <div class="space-y-6 mb-8">
              <div class="contact-method-enhanced" @click="handleContactClick('phone', block.value)">
                <div class="method-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <h3 class="method-title">Call Us</h3>
                  <p class="method-value">{{ block.value.phone }}</p>
                  <span class="method-action">Click to call</span>
                </div>
                <div class="method-arrow">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div class="contact-method-enhanced" @click="handleContactClick('email', block.value)">
                <div class="method-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <h3 class="method-title">Email Us</h3>
                  <p class="method-value">{{ block.value.email }}</p>
                  <span class="method-action">Click to email</span>
                </div>
                <div class="method-arrow">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div class="contact-method-enhanced" @click="handleContactClick('address', block.value)">
                <div class="method-icon">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div class="method-content">
                  <h3 class="method-title">Visit Us</h3>
                  <p class="method-value">{{ block.value.address_line_1 }}</p>
                  <p class="method-value">{{ block.value.address_line_2 }}</p>
                  <span class="method-action">Click to view map</span>
                </div>
                <div class="method-arrow">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Links Block -->
      <div v-if="block.type === 'social_links'" class="social-section">
        <div class="glass-card p-8 mb-8">
          <h3 class="text-white font-semibold mb-4">{{ block.value.heading || 'Follow Our Journey' }}</h3>
          <div class="flex space-x-4">
            <a v-for="social in block.value.social_links" :key="social.name" 
               :href="social.url" 
               class="social-link"
               :title="social.name"
               target="_blank"
               rel="noopener noreferrer">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path :d="getSocialIcon(social.icon)"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </template>

    <!-- Contact Form Section -->
    <div class="contact-form-section">
      <div class="glass-card p-8">
        <h2 class="section-title text-3xl font-bold text-white mb-6">
          Send Us a Message
          <span class="title-accent"></span>
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="form-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="form-input"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <input
              id="subject"
              v-model="formData.subject"
              type="text"
              class="form-input"
              placeholder="What's this about?"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="6"
              class="form-input"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>
          
          <div class="flex items-center justify-between">
            <div v-if="formError" class="text-red-400 text-sm">
              {{ formError }}
            </div>
            <div v-else-if="formSubmitted" class="text-green-400 text-sm">
              Message sent successfully! We'll get back to you soon.
            </div>
            <div v-else class="text-gray-400 text-sm">
              We typically respond within 24 hours
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="cta-primary"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { WagtailContactData, ContactFormData, StreamFieldBlock } from '../../types'

const props = defineProps<{
  wagtailData: WagtailContactData
}>()

const emit = defineEmits<{
  'submit-form': [formData: ContactFormData]
}>()

// Form state
const formData = ref<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const formSubmitted = ref(false)
const formError = ref<string | null>(null)

// Methods
const handleSubmit = () => {
  emit('submit-form', formData.value)
}

const handleContactClick = (type: 'phone' | 'email' | 'address', contactInfo: any) => {
  switch (type) {
    case 'phone':
      if (contactInfo.phone) {
        window.open(`tel:${contactInfo.phone}`)
      }
      break
    case 'email':
      if (contactInfo.email) {
        window.open(`mailto:${contactInfo.email}`)
      }
      break
    case 'address':
      const address = `${contactInfo.address_line_1}, ${contactInfo.address_line_2}`
      window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`)
      break
  }
}

const getSocialIcon = (icon: string) => {
  const icons: Record<string, string> = {
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
  }
  return icons[icon] || icons.github
}

// Expose methods for parent component
defineExpose({
  setFormSubmitting: (value: boolean) => {
    isSubmitting.value = value
  },
  setFormError: (error: string | null) => {
    formError.value = error
  },
  setFormSubmitted: (value: boolean) => {
    formSubmitted.value = value
  }
})
</script>

<style scoped>
/* Glass card effect */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Section title with accent */
.section-title {
  position: relative;
  display: inline-block;
}

.title-accent {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

/* Contact method cards */
.contact-method-enhanced {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 16px;
}

.contact-method-enhanced:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.method-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.method-content {
  flex: 1;
}

.method-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.method-value {
  font-size: 16px;
  color: #d1d5db;
  margin-bottom: 4px;
}

.method-action {
  font-size: 14px;
  color: #3b82f6;
  font-weight: 500;
}

.method-arrow {
  color: #6b7280;
  transition: color 0.3s ease;
}

.contact-method-enhanced:hover .method-arrow {
  color: #3b82f6;
}

/* Social links */
.social-section {
  margin-top: 24px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  transform: translateY(-2px);
}

/* Form styles */
.form-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.08);
}

.form-input::placeholder {
  color: #9ca3af;
}

/* CTA button */
.cta-primary {
  position: relative;
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.cta-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>