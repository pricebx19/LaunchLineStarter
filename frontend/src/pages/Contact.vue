<template>
  <div>
    <!-- Legacy Contact Page (current Vue.js implementation) -->
    <ContactPageLayout v-if="shouldShowLegacy">
      <!-- Hero Section with Advanced Animations -->
      <ContactHeroSection
        :metrics="metrics"
        @start-project="scrollToForm"
        @learn-more="scrollToInfo"
      />

      <!-- Enhanced Contact Content -->
      <WowContactSection 
        ref="contactSectionRef"
        @submit-form="handleFormSubmit"
      />

      <!-- Floating Contact Widget -->
      <FloatingContactWidget
        :widget-open="widgetOpen"
        @toggle="toggleWidget"
      />
    </ContactPageLayout>

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
    <ContactABTestView
      v-else-if="shouldShowBoth"
      :is-loading-wagtail-data="isLoadingWagtailData"
      :wagtail-data-error="wagtailDataError"
      :wagtail-data="wagtailData"
      @retry="fetchWagtailContactData"
      @submit-form="handleFormSubmit"
    />

    <!-- Feature Flag Status Indicator (Development Only) -->
    <ContactFeatureFlagIndicator
      :is-dev="isDev"
      :contact-strategy="contactStrategy"
      :is-wagtail-enabled="isWagtailEnabled"
      :migration-status="migrationStatus"
      @refresh="refreshFlags"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useContactForm } from '../composables/useContactForm'
import { useWagtailContactData } from '../composables/useWagtailContactData'
import { useFloatingWidget } from '../composables/useFloatingWidget'
import { useContactMetrics } from '../composables/useContactMetrics'
import { useComponentFlags, useFeatureFlags } from '../composables/useFeatureFlags'
// import type { ContactPageProps } from '../types'

// Async component imports for better performance
const ContactPageLayout = defineAsyncComponent(() => import('../components/layout/ContactPageLayout.vue'))
const ContactHeroSection = defineAsyncComponent(() => import('../components/contact/ContactHeroSection.vue'))
const WowContactSection = defineAsyncComponent(() => import('../components/forms/components/WowContactSection.vue'))
const FloatingContactWidget = defineAsyncComponent(() => import('../components/contact/FloatingContactWidget.vue'))
const WagtailContactPage = defineAsyncComponent(() => import('../components/contact/WagtailContactPage.vue'))
const ContactABTestView = defineAsyncComponent(() => import('../components/contact/ContactABTestView.vue'))
const ContactFeatureFlagIndicator = defineAsyncComponent(() => import('../components/contact/ContactFeatureFlagIndicator.vue'))

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

// Composables
const { updateSeo } = useSeo()
const contactSectionRef = ref<any>(null)
const { handleFormSubmit } = useContactForm(contactSectionRef)
const { wagtailData, isLoading: isLoadingWagtailData, error: wagtailDataError, fetchWagtailContactData } = useWagtailContactData()
const { widgetOpen, toggleWidget } = useFloatingWidget()
const { metrics } = useContactMetrics()

// Computed properties
const contactStrategy = computed(() => {
  if (shouldShowWagtail.value) return 'wagtail'
  if (shouldShowBoth.value) return 'ab-testing'
  return 'legacy'
})

const isDev = computed(() => {
  // Check if we're in development mode
  return typeof window !== 'undefined' && window.location.hostname === 'localhost'
})

// Methods
const scrollToForm = () => {
  const formElement = document.querySelector('.contact-form-section')
  formElement?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToInfo = () => {
  const infoElement = document.querySelector('.contact-info-section')
  infoElement?.scrollIntoView({ behavior: 'smooth' })
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

