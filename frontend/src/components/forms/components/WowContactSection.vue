<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      
      <!-- Enhanced Contact Information -->
      <div class="contact-info-section">
        <div class="glass-card p-8 mb-8">
          <h2 class="section-title text-3xl font-bold text-white mb-6">
            Get In Touch
            <span class="title-accent"></span>
          </h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-8">
            We're passionate about creating digital experiences that drive results. 
            Whether you're a startup with a bold vision or an established business 
            ready to innovate, let's collaborate to bring your ideas to life.
          </p>

          <!-- Interactive Contact Methods -->
          <div class="space-y-6 mb-8">
            <div v-for="method in contactMethods" :key="method.title" 
                 class="contact-method-enhanced" 
                 @click="handleContactClick(method)">
              <div class="method-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.iconPath"/>
                </svg>
              </div>
              <div class="method-content">
                <h3 class="method-title">{{ method.title }}</h3>
                <p class="method-value">{{ method.value }}</p>
                <span class="method-action">{{ method.action }}</span>
              </div>
              <div class="method-arrow">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="social-section">
            <h3 class="text-white font-semibold mb-4">Follow Our Journey</h3>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name" 
                 :href="social.url" 
                 class="social-link"
                 :title="social.name">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.iconPath"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Interactive Map Card -->
        <div class="glass-card p-6">
          <h3 class="text-white font-semibold mb-4">Our Location</h3>
          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-pin">
                <svg class="w-8 h-8 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div class="map-info">
                <p class="text-white font-semibold">LaunchLine HQ</p>
                <p class="text-gray-300 text-sm">Bloomsburg</p>
                <p class="text-gray-300 text-sm">Pennsylvania</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Contact Form -->
      <div class="contact-form-section">
        <div class="glass-card p-8">
          <h2 class="section-title text-3xl font-bold text-white mb-6">
            Start Your Project
            <span class="title-accent"></span>
          </h2>
          
          <!-- Form Success State -->
          <div v-if="formSubmitted" class="success-state">
            <div class="success-icon">
              <svg class="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
            <p class="text-gray-300 mb-6">
              Thank you for reaching out! We'll get back to you within 24 hours to discuss your project in detail.
            </p>
            <button @click="resetForm" class="btn-primary">
              Send Another Message
            </button>
          </div>

          <!-- Contact Form -->
          <form 
            v-else 
            action="https://formspree.io/f/mrbagvqo" 
            method="POST"
            @submit.prevent="handleSubmit" 
            class="space-y-6"
          >
            <!-- Name and Email Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="form-group">
                <label for="name" class="form-label">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="form-input"
                  :class="{ 'error': formErrors.name, 'valid': formData.name && !formErrors.name }"
                  placeholder="Enter your full name"
                  @blur="validateField('name')"
                  @input="clearFieldError('name')"
                >
                <div v-if="formErrors.name" class="field-error">{{ formErrors.name }}</div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="form-input"
                  :class="{ 'error': formErrors.email, 'valid': formData.email && !formErrors.email }"
                  placeholder="Enter your email address"
                  @blur="validateField('email')"
                  @input="clearFieldError('email')"
                >
                <div v-if="formErrors.email" class="field-error">{{ formErrors.email }}</div>
              </div>
            </div>

            <!-- Project Type -->
            <div class="form-group">
              <label for="projectType" class="form-label">Project Type</label>
              <select
                id="projectType"
                name="subject"
                v-model="formData.subject"
                class="form-input"
              >
                <option value="">Select project type</option>
                <option value="Website Design & Development">Website Design & Development</option>
                <option value="Web Application">Web Application</option>
                <option value="E-commerce Platform">E-commerce Platform</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Brand Identity & Design">Brand Identity & Design</option>
                <option value="Digital Strategy Consulting">Digital Strategy Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- Budget Range -->
            <div class="form-group">
              <label for="budget" class="form-label">Project Budget</label>
              <select
                id="budget"
                name="budget"
                v-model="formData.budget"
                class="form-input"
              >
                <option value="">Select budget range</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
                <option value="Let's discuss">Let's discuss</option>
              </select>
            </div>

            <!-- Timeline -->
            <div class="form-group">
              <label for="timeline" class="form-label">Desired Timeline</label>
              <select
                id="timeline"
                name="timeline"
                v-model="formData.timeline"
                class="form-input"
              >
                <option value="">Select timeline</option>
                <option value="ASAP (Rush project)">ASAP (Rush project)</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="message" class="form-label">Project Details *</label>
              <textarea
                id="message"
                name="message"
                v-model="formData.message"
                required
                rows="6"
                class="form-input resize-none"
                :class="{ 'error': formErrors.message, 'valid': formData.message && !formErrors.message }"
                placeholder="Tell us about your project, goals, target audience, and any specific requirements..."
                @blur="validateField('message')"
                @input="clearFieldError('message')"
              ></textarea>
              <div v-if="formErrors.message" class="field-error">{{ formErrors.message }}</div>
              <div class="character-count">{{ formData.message.length }}/1000</div>
            </div>

            <!-- Error Message -->
            <div v-if="formError" class="form-error">
              {{ formError }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting || !isFormValid"
              class="submit-button"
              :class="{ 'submitting': isSubmitting }"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </span>
              <span v-else class="flex items-center justify-center">
                Send Message
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </span>
              <div class="button-glow"></div>
            </button>

            <p class="form-disclaimer">
              By submitting this form, you agree to our 
              <a href="#" class="text-brand-primary hover:text-blue-400 transition-colors">privacy policy</a> 
              and 
              <a href="#" class="text-brand-primary hover:text-blue-400 transition-colors">terms of service</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  budget?: string
  timeline?: string
}

const emit = defineEmits<{
  submitForm: [formData: ContactFormData]
}>()

// Form state
const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  budget: '',
  timeline: '',
  message: ''
})

const formErrors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const formSubmitted = ref(false)
const formError = ref<string | null>(null)

// Data
const contactMethods = [
  {
    title: 'Email',
    value: 'breprice@launchlinellc.com',
    action: 'Send us an email',
    iconPath: 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    link: 'mailto:breprice@launchlinellc.com'
  },
  {
    title: 'Phone',
    value: '(570) 766-3452',
    action: 'Call us directly',
    iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    link: 'tel:+15707663452'
  },
  {
    title: 'Office',
    value: 'Bloomsburg, Pennsylvania',
    action: 'Visit our office',
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    link: '#'
  }
]

const socialLinks = [
  { 
    name: 'Twitter', 
    url: 'https://twitter.com/launchline', 
    iconPath: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com/company/launchline', 
    iconPath: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z'
  },
  { 
    name: 'Instagram', 
    url: 'https://instagram.com/launchline', 
    iconPath: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm10.5 2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z'
  },
  { 
    name: 'GitHub', 
    url: 'https://github.com/launchline', 
    iconPath: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
  }
]

// Computed
const isFormValid = computed(() => {
  return formData.name && 
         formData.email && 
         formData.message && 
         !formErrors.name && 
         !formErrors.email && 
         !formErrors.message
})

// Methods
const validateField = (field: string) => {
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        formErrors.name = 'Name is required'
      } else if (formData.name.trim().length < 2) {
        formErrors.name = 'Name must be at least 2 characters'
      }
      break
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email.trim()) {
        formErrors.email = 'Email is required'
      } else if (!emailRegex.test(formData.email)) {
        formErrors.email = 'Please enter a valid email address'
      }
      break
    case 'message':
      if (!formData.message.trim()) {
        formErrors.message = 'Message is required'
      } else if (formData.message.trim().length < 10) {
        formErrors.message = 'Message must be at least 10 characters'
      } else if (formData.message.length > 1000) {
        formErrors.message = 'Message must be less than 1000 characters'
      }
      break
  }
}

const clearFieldError = (field: string) => {
  formErrors[field as keyof typeof formErrors] = ''
}

const handleSubmit = async () => {
  // Validate all fields
  Object.keys(formErrors).forEach(field => validateField(field))
  
  if (!isFormValid.value) return

  // Emit to parent with enhanced form data
  const enhancedFormData: ContactFormData = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject || 'General Inquiry',
    message: `Project Type: ${formData.subject || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message}`
  }

  emit('submitForm', enhancedFormData)
}

const resetForm = () => {
  formSubmitted.value = false
  Object.assign(formData, {
    name: '',
    email: '',
    subject: '',
    budget: '',
    timeline: '',
    message: ''
  })
  Object.assign(formErrors, {
    name: '',
    email: '',
    message: ''
  })
  formError.value = null
}

const handleContactClick = (method: any) => {
  if (method.link && method.link !== '#') {
    window.open(method.link, '_self')
  }
}

// Expose methods for parent to control state
const setFormSubmitting = (value: boolean) => {
  isSubmitting.value = value
}

const setFormSubmitted = (value: boolean) => {
  formSubmitted.value = value
}

const setFormError = (value: string | null) => {
  formError.value = value
}

defineExpose({
  setFormSubmitting,
  setFormSubmitted,
  setFormError
})

defineOptions({
  name: 'WowContactSection'
})
</script>

<style scoped>
/* Glass Cards */
.glass-card {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
}

/* Section Titles */
.section-title {
  position: relative;
  display: inline-block;
}

.title-accent {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

/* Enhanced Contact Methods */
.contact-method-enhanced {
  @apply flex items-center p-4 rounded-xl border border-gray-700 bg-gray-800/50 cursor-pointer transition-all duration-300 hover:border-brand-primary hover:bg-gray-700/50 hover:scale-105;
}

.method-icon {
  @apply w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-4 text-brand-primary transition-all duration-300;
}

.contact-method-enhanced:hover .method-icon {
  @apply bg-brand-primary/20 scale-110;
}

.method-content {
  @apply flex-1;
}

.method-title {
  @apply text-white font-semibold text-lg;
}

.method-value {
  @apply text-gray-300 text-base;
}

.method-action {
  @apply text-brand-primary text-sm opacity-0 transition-opacity duration-300;
}

.contact-method-enhanced:hover .method-action {
  @apply opacity-100;
}

.method-arrow {
  @apply text-gray-400 transition-all duration-300;
}

.contact-method-enhanced:hover .method-arrow {
  @apply text-brand-primary transform translate-x-1;
}

/* Social Links */
.social-link {
  @apply w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-brand-primary hover:text-white hover:scale-110;
}

/* Map */
.map-container {
  @apply h-48 bg-gray-700 rounded-lg overflow-hidden relative;
}

.map-placeholder {
  @apply h-full flex items-center justify-center relative;
  background: linear-gradient(45deg, #374151, #4b5563);
}

.map-pin {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  animation: bounce 2s infinite;
}

.map-info {
  @apply absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3;
}

/* Form Styles */
.form-group {
  @apply relative;
}

.form-label {
  @apply block text-sm font-medium text-gray-300 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent hover:border-gray-500 backdrop-blur-sm;
}

.form-input.valid {
  @apply border-green-500;
}

.form-input.error {
  @apply border-red-500;
}

.field-error {
  @apply text-red-400 text-sm mt-1;
}

.character-count {
  @apply text-gray-400 text-xs mt-1 text-right;
}

.form-error {
  @apply bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400;
}

.form-disclaimer {
  @apply text-gray-400 text-sm text-center;
}

/* Submit Button */
.submit-button {
  @apply w-full relative px-6 py-4 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden;
}

.submit-button:not(:disabled):hover .button-glow {
  transform: translateX(100%);
}

.submit-button.submitting {
  @apply cursor-not-allowed;
}

.button-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

/* Success State */
.success-state {
  @apply text-center py-12;
}

.success-icon {
  @apply mx-auto mb-6;
  animation: successPulse 2s ease-out;
}

/* Scroll Animations */
.contact-info-section,
.contact-form-section {
  @apply opacity-0 transform translate-y-8 transition-all duration-700 ease-out;
}

.contact-info-section.animate-in,
.contact-form-section.animate-in {
  @apply opacity-100 translate-y-0;
}

/* Mobile: Show content immediately to prevent blank space */
@media (max-width: 768px) {
  .contact-info-section,
  .contact-form-section {
    @apply opacity-100 translate-y-0;
  }
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

@keyframes successPulse {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass-card {
    @apply p-4;
  }
  
  .section-title {
    @apply text-2xl;
  }
  
  .contact-method-enhanced {
    @apply p-3;
  }
  
  .method-icon {
    @apply w-10 h-10 mr-3;
  }
  
  .method-title {
    @apply text-base;
  }
  
  .method-value {
    @apply text-sm;
  }
  
  .form-input {
    @apply py-2;
  }
  
  .submit-button {
    @apply py-3;
  }
}
</style>
