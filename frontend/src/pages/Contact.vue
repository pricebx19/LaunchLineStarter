<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Get In <span class="text-brand-primary">Touch</span>
        </h1>
        <p class="text-xl text-gray-300 leading-relaxed">
          Ready to launch your next big idea? Let's discuss how we can help you achieve your goals.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-white mb-8">Let's Start a Conversation</h2>
            <p class="text-gray-300 text-lg leading-relaxed mb-8">
              We're here to help you turn your vision into reality. Whether you're looking to launch 
              a new product, scale your existing business, or need strategic guidance, our team of 
              experts is ready to support you every step of the way.
            </p>

            <!-- Contact Methods -->
            <div class="space-y-6 mb-12">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Email</h3>
                  <a href="mailto:hello@launchline.com" class="text-brand-primary hover:text-blue-400 transition-colors">
                    hello@launchline.com
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Phone</h3>
                  <a href="tel:+15551234567" class="text-brand-primary hover:text-blue-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-1">Office</h3>
                  <p class="text-gray-300">
                    123 Innovation Drive<br>
                    Tech City, TC 12345<br>
                    United States
                  </p>
                </div>
              </div>
            </div>

            <!-- Response Time -->
            <div class="card">
              <h3 class="text-white font-semibold mb-2">Quick Response Guaranteed</h3>
              <p class="text-gray-300 text-sm">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please call us directly.
              </p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="card">
            <h2 class="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Success Message -->
              <div v-if="submitted && !error" class="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-red-400 font-medium">{{ error }}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  >
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your email address"
                  >
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="Launch Strategy">Launch Strategy</option>
                  <option value="Technical Development">Technical Development</option>
                  <option value="Marketing & Growth">Marketing & Growth</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                  placeholder="Tell us about your project and how we can help..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="submitting" class="flex items-center justify-center">
                    <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                  <span v-else>Send Message</span>
                </button>
              </div>

              <p class="text-sm text-gray-400 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/lib/api'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    error.value = 'Please fill in all required fields.'
    return
  }

  try {
    submitting.value = true
    error.value = null

    const leadData = {
      name: form.value.name,
      email: form.value.email,
      message: `Subject: ${form.value.subject || 'General Inquiry'}\n\n${form.value.message}`,
      source: 'contact-form'
    }

    const response = await api.submitLead(leadData)

    if (response.success) {
      submitted.value = true
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    } else {
      error.value = response.error || 'Failed to send message. Please try again.'
    }
  } catch (err) {
    error.value = 'Network error occurred. Please try again later.'
    console.error('Failed to submit form:', err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  updateSeo({
    title: 'Contact - LaunchLine',
    description: 'Get in touch with LaunchLine for your professional launch needs. We\'re here to help turn your vision into reality.',
    ogTitle: 'Contact LaunchLine - Professional Launch Solutions',
    ogDescription: 'Get in touch with LaunchLine for your professional launch needs. We\'re here to help turn your vision into reality.',
    canonical: window.location.origin + '/contact'
  })
})
</script>