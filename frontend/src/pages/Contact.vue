<template>
  <div>
    <!-- Legacy Contact Page (current Vue.js implementation) -->
    <div v-if="shouldShowLegacy" class="contact-page min-h-screen relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30">
        <StarryBackground 
          :small-count="50"
          :medium-count="15"
          :large-count="8"
          :show-shooting="true"
          :opacity="0.6"
        />
        
        <!-- Floating geometric shapes -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
          <div class="floating-shape shape-3"></div>
          <div class="floating-shape shape-4"></div>
        </div>
      </div>

      <!-- Hero Section with Advanced Animations -->
      <section class="relative z-10 pt-32 pb-16 px-4 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="hero-title text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Let's Create
            <span class="text-glow block text-brand-primary">Something Amazing</span>
          </h1>
          <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into digital reality? We're here to make it happen with cutting-edge technology and innovative design.
          </p>
          
          <!-- Floating CTA buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button @click="scrollToForm" class="cta-primary">
              <span class="relative z-10">Start Your Project</span>
              <div class="button-glow"></div>
            </button>
            <button @click="scrollToInfo" class="cta-secondary">
              <span class="relative z-10">Learn More</span>
            </button>
          </div>

          <!-- Animated metrics -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div v-for="(metric, index) in metrics" :key="metric.label" 
                 class="metric-card" 
                 :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="text-3xl font-bold text-brand-primary mb-2">{{ metric.value }}</div>
              <div class="text-gray-400 text-sm">{{ metric.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced Contact Content -->
      <WowContactSection 
        ref="contactSectionRef"
        @submit-form="handleFormSubmit"
      />

      <!-- Floating Contact Widget -->
      <div class="floating-contact-widget">
        <button @click="toggleWidget" class="widget-toggle" :class="{ 'open': widgetOpen }">
          <svg v-if="!widgetOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <div class="widget-content" :class="{ 'open': widgetOpen }">
          <div class="widget-header">
            <h4 class="text-white font-semibold">Quick Contact</h4>
            <p class="text-gray-300 text-sm">We typically respond in under 2 hours</p>
          </div>
          <div class="widget-methods">
            <a href="tel:+15551234567" class="widget-method">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Now
            </a>
            <a href="mailto:hello@launchline.com" class="widget-method">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Wagtail Contact Page (new CMS-managed implementation) -->
    <div v-else-if="shouldShowWagtail">
      <!-- Loading state -->
      <div v-if="isLoadingWagtailData" class="min-h-screen flex items-center justify-center bg-gray-900">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p class="text-white">Loading contact page...</p>
        </div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="wagtailDataError" class="min-h-screen flex items-center justify-center bg-gray-900">
        <div class="text-center max-w-md mx-auto p-8">
          <div class="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-white mb-4">Failed to Load Contact Page</h2>
          <p class="text-gray-300 mb-6">{{ wagtailDataError }}</p>
          <button 
            @click="fetchWagtailContactData" 
            class="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
      
      <!-- Success state -->
      <WagtailContactPage 
        v-else
        :wagtail-data="wagtailData"
        @submit-form="handleFormSubmit"
      />
    </div>

    <!-- A/B Testing: Show both (when transitioning) -->
    <div v-else-if="shouldShowBoth" class="ab-test-container">
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
              @click="fetchWagtailContactData" 
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

    <!-- Feature Flag Status Indicator (Development Only) -->
    <div v-if="isDev" class="fixed top-4 right-4 z-50">
      <div class="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <h4 class="font-semibold mb-2">Contact Page Status</h4>
        <div class="text-sm space-y-1">
          <div>Strategy: {{ contactStrategy }}</div>
          <div>Wagtail Enabled: {{ isWagtailEnabled ? '✅' : '❌' }}</div>
          <div>Migration Status: {{ migrationStatus }}</div>
        </div>
        <button 
          @click="refreshFlags" 
          class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          Refresh Flags
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { api } from '../lib/api'
import { useSeo } from '../lib/seo'
import StarryBackground from '../components/effects/StarryBackground.vue'
import WowContactSection from '../components/forms/components/WowContactSection.vue'
import WagtailContactPage from '../components/contact/WagtailContactPage.vue'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'

// Feature flag setup for contact page
const contactFlags = useComponentFlags('CONTACT_FORM')
const {
  shouldShowLegacy,
  shouldShowWagtail,
  shouldShowBoth,
  migrationStatus,
  isWagtailEnabled
} = contactFlags

// Get the main feature flags composable for refresh functionality
const featureFlags = useFeatureFlags()

const { updateSeo } = useSeo()

const contactSectionRef = ref<InstanceType<typeof WowContactSection> | null>(null)
const widgetOpen = ref(false)

// Wagtail data - will be fetched from API (starts empty)
const wagtailData = ref({
  content: [],
  title: '',
  slug: ''
})

// Loading and error states
const isLoadingWagtailData = ref(false)
const wagtailDataError = ref<string | null>(null)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Data
const metrics = [
  { value: '150+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24h', label: 'Response Time' },
  { value: '5★', label: 'Average Rating' }
]

// Computed properties
const contactStrategy = computed(() => {
  if (shouldShowWagtail.value) return 'wagtail'
  if (shouldShowBoth.value) return 'ab-testing'
  return 'legacy'
})

const isDev = computed(() => import.meta.env.DEV)

// Methods
const scrollToForm = () => {
  const formElement = document.querySelector('.contact-form-section')
  formElement?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToInfo = () => {
  const infoElement = document.querySelector('.contact-info-section')
  infoElement?.scrollIntoView({ behavior: 'smooth' })
}

const toggleWidget = () => {
  widgetOpen.value = !widgetOpen.value
}

const handleFormSubmit = async (formData: ContactFormData) => {
  try {
    // Handle form submission for both legacy and Wagtail versions
    if (shouldShowLegacy.value && contactSectionRef.value) {
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
      if (shouldShowLegacy.value && contactSectionRef.value) {
        contactSectionRef.value.setFormSubmitted(true)
      }
      // Show success message from backend
      if (response.data?.message) {
        console.log('Backend success message:', response.data.message)
      }
    } else {
      const errorMessage = response.error || 'Failed to send message. Please try again or call us directly.'
      if (shouldShowLegacy.value && contactSectionRef.value) {
        contactSectionRef.value.setFormError(errorMessage)
      }
    }
  } catch (err) {
    const errorMessage = 'Network error occurred. Please try again later or call us at +1 (555) 123-4567.'
    if (shouldShowLegacy.value && contactSectionRef.value) {
      contactSectionRef.value.setFormError(errorMessage)
    }
    console.error('Failed to submit form:', err)
  } finally {
    if (shouldShowLegacy.value && contactSectionRef.value) {
      contactSectionRef.value.setFormSubmitting(false)
    }
  }
}

const fetchWagtailContactData = async () => {
  isLoadingWagtailData.value = true
  wagtailDataError.value = null
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    
    // First, try to find the contact page by type (ContactPage) with StreamField content
    const response = await fetch(`${apiUrl}/api/v2/pages/?type=pages.ContactPage&fields=id,title,slug,content,first_published_at`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch contact page: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      const contactPage = data.items[0]
      
      // Store the raw StreamField content directly
      wagtailData.value = {
        content: contactPage.content || [],
        title: contactPage.title || '',
        slug: contactPage.slug || ''
      }
      
      // Validate that we have content blocks
      if (!wagtailData.value.content || wagtailData.value.content.length === 0) {
        throw new Error('Contact page has no content blocks')
      }
      
      console.log('Wagtail contact data loaded successfully from StreamField:', wagtailData.value)
    } else {
      throw new Error('No contact page found in Wagtail')
    }
  } catch (error) {
    console.error('Failed to fetch Wagtail contact data:', error)
    wagtailDataError.value = error instanceof Error ? error.message : 'Failed to load contact page data'
    
    // Clear the data so error state is shown
    wagtailData.value = {
      content: [],
      title: '',
      slug: ''
    }
  } finally {
    isLoadingWagtailData.value = false
  }
}

const refreshFlags = async () => {
  try {
    console.log('Refreshing feature flags...')
    console.log('Before refresh - Contact flags status:', {
      shouldShowLegacy: shouldShowLegacy.value,
      shouldShowWagtail: shouldShowWagtail.value,
      shouldShowBoth: shouldShowBoth.value,
      migrationStatus: migrationStatus.value,
      isWagtailEnabled: isWagtailEnabled.value
    })
    
    await featureFlags.refresh()
    
    console.log('Feature flags refreshed successfully')
    console.log('After refresh - Contact flags status:', {
      shouldShowLegacy: shouldShowLegacy.value,
      shouldShowWagtail: shouldShowWagtail.value,
      shouldShowBoth: shouldShowBoth.value,
      migrationStatus: migrationStatus.value,
      isWagtailEnabled: isWagtailEnabled.value
    })
    
    // Also refresh Wagtail data if we're using the Wagtail version
    if (shouldShowWagtail.value || shouldShowBoth.value) {
      console.log('Refreshing Wagtail contact data...')
      await fetchWagtailContactData()
    }
  } catch (error) {
    console.error('Failed to refresh feature flags:', error)
  }
}

onMounted(async () => {
  // Initialize feature flags first
  await featureFlags.initialize()
  
  // Fetch Wagtail contact data if we're using the Wagtail version
  if (shouldShowWagtail.value || shouldShowBoth.value) {
    await fetchWagtailContactData()
  }
  
  updateSeo({
    title: 'Contact LaunchLine LLC - Launch Your Digital Success',
    description: 'Ready to launch your business into the digital stratosphere? Get in touch with LaunchLine for professional websites that drive real results.',
    ogTitle: 'Contact LaunchLine LLC - Launch Your Digital Success',
    ogDescription: 'Ready to launch your business into the digital stratosphere? Get in touch with LaunchLine for professional websites that drive real results.',
    canonical: window.location.origin + '/contact'
  })

  // Add scroll animations for legacy version
  if (shouldShowLegacy.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, { threshold: 0.1 })

    // Wait for DOM to be ready then observe
    nextTick(() => {
      const animatedElements = document.querySelectorAll('.contact-info-section, .contact-form-section, .metric-card')
      animatedElements.forEach(el => observer.observe(el))
    })
  }
})
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

/* Hero Animations */
.hero-title {
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-primary, .cta-secondary {
  animation: fadeInUp 1s ease-out 0.4s both;
}

.metric-card {
  animation: fadeInUp 1s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA Button Styles */
.cta-primary {
  @apply relative px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105;
}

.cta-primary .button-glow {
  @apply absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-500 rounded-lg opacity-0 transition-opacity duration-300;
}

.cta-primary:hover .button-glow {
  @apply opacity-20;
}

.cta-secondary {
  @apply px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105;
}

/* Metric Cards */
.metric-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300;
}

/* Floating Shapes */
.floating-shape {
  @apply absolute w-32 h-32 border border-white/10 rounded-full;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  @apply top-20 left-20;
  animation-delay: 0s;
}

.shape-2 {
  @apply top-40 right-20;
  animation-delay: 2s;
}

.shape-3 {
  @apply bottom-40 left-40;
  animation-delay: 4s;
}

.shape-4 {
  @apply bottom-20 right-40;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Floating Contact Widget */
.floating-contact-widget {
  @apply fixed bottom-8 right-8 z-50;
}

.widget-toggle {
  @apply w-14 h-14 bg-brand-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center;
}

.widget-toggle.open {
  @apply bg-red-500;
}

.widget-content {
  @apply absolute bottom-16 right-0 w-80 bg-gray-800 rounded-lg shadow-xl p-6 opacity-0 pointer-events-none transform translate-y-4 transition-all duration-300;
}

.widget-content.open {
  @apply opacity-100 pointer-events-auto transform translate-y-0;
}

.widget-header {
  @apply mb-4 pb-4 border-b border-gray-600;
}

.widget-methods {
  @apply space-y-3;
}

.widget-method {
  @apply flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    @apply text-4xl;
  }
  
  .hero-subtitle {
    @apply text-lg;
  }
  
  .floating-contact-widget {
    @apply bottom-4 right-4;
  }
  
  .widget-content {
    @apply w-72 right-0;
  }
  
  .ab-test-container {
    @apply p-4;
  }
}
</style>
