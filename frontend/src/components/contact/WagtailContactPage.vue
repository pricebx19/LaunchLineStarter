<template>
  <div class="contact-page min-h-screen relative overflow-hidden">
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

    <!-- StreamField Content Blocks -->
    <div class="relative z-10">
      <template v-for="(block, index) in wagtailData.content" :key="`${block.type}-${index}`">
        <!-- Hero Block -->
        <section v-if="block.type === 'hero'" class="pt-32 pb-16 px-4 text-center">
          <div class="max-w-4xl mx-auto">
            <h1 class="hero-title text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              {{ block.value.heading }}
            </h1>
            <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {{ block.value.subheading }}
            </p>
            
            <!-- Floating CTA buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button @click="scrollToForm" class="cta-primary">
                <span class="relative z-10">{{ block.value.cta_text }}</span>
                <div class="button-glow"></div>
              </button>
              <button @click="scrollToInfo" class="cta-secondary">
                <span class="relative z-10">Learn More</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Metrics Block -->
        <section v-if="block.type === 'metrics'" class="py-16 px-4">
          <div class="max-w-6xl mx-auto">
            <h2 v-if="block.value.heading" class="text-3xl font-bold text-center text-white mb-12">
              {{ block.value.heading }}
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div v-for="(metric, metricIndex) in block.value.metrics" :key="metric.label" 
                   class="metric-card" 
                   :style="{ animationDelay: `${metricIndex * 0.2}s` }">
                <div class="text-3xl font-bold text-brand-primary mb-2">{{ metric.value }}</div>
                <div class="text-gray-400 text-sm">{{ metric.label }}</div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>

    <!-- Enhanced Contact Content -->
    <WagtailContactSection 
      ref="contactSectionRef"
      :wagtail-data="wagtailData"
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
          <a :href="`tel:${wagtailData.phone}`" class="widget-method">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Call Now
          </a>
          <a :href="`mailto:${wagtailData.email}`" class="widget-method">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Email Us
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { api } from '../../lib/api'
import { useSeo } from '../../lib/seo'
import StarryBackground from '../effects/StarryBackground.vue'
import WagtailContactSection from './WagtailContactSection.vue'
import type { WagtailPage } from '../../types'
import type { ContactFormData } from '../../types/Forms'

const props = defineProps<{
  wagtailData: WagtailPage
}>()

const { updateSeo } = useSeo()

const contactSectionRef = ref<InstanceType<typeof WagtailContactSection> | null>(null)
const widgetOpen = ref(false)

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
    contactSectionRef.value?.setFormSubmitting(true)
    contactSectionRef.value?.setFormError(null)

    const leadData = {
      name: formData.name,
      email: formData.email,
      message: `Subject: ${formData.subject || 'General Inquiry'}\n\n${formData.message}`,
      source: 'website'
    }

    const response = await api.submitLead(leadData)

    if (response.success) {
      contactSectionRef.value?.setFormSubmitted(true)
      // Show success message from backend
      if (response.data?.message) {
        console.log('Backend success message:', response.data.message)
      }
    } else {
      contactSectionRef.value?.setFormError(response.error || 'Failed to send message. Please try again or call us directly.')
    }
  } catch (err) {
    contactSectionRef.value?.setFormError('Network error occurred. Please try again later or call us at +1 (555) 123-4567.')
    console.error('Failed to submit form:', err)
  } finally {
    contactSectionRef.value?.setFormSubmitting(false)
  }
}

onMounted(() => {
  updateSeo({
    title: 'Contact LaunchLine LLC - Launch Your Digital Success',
    description: 'Ready to launch your business into the digital stratosphere? Get in touch with LaunchLine for professional websites that drive real results.',
    ogTitle: 'Contact LaunchLine LLC - Launch Your Digital Success',
    ogDescription: 'Ready to launch your business into the digital stratosphere? Get in touch with LaunchLine for professional websites that drive real results.',
    canonical: window.location.origin + '/contact'
  })

  // Add scroll animations
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
})
</script>

<style scoped>
.hero-title { animation: fadeInUp 1s ease-out; }
.hero-subtitle { animation: fadeInUp 1s ease-out 0.2s both; }
.cta-primary, .cta-secondary { animation: fadeInUp 1s ease-out 0.4s both; }
.metric-card { animation: fadeInUp 1s ease-out both; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.cta-primary {
  @apply relative px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105;
}

.cta-primary .button-glow {
  @apply absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-500 rounded-lg opacity-0 transition-opacity duration-300;
}

.cta-primary:hover .button-glow { @apply opacity-20; }

.cta-secondary {
  @apply px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105;
}

.metric-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300;
}

.floating-shape {
  @apply absolute w-32 h-32 border border-white/10 rounded-full;
  animation: float 6s ease-in-out infinite;
}

.shape-1 { @apply top-20 left-20; animation-delay: 0s; }
.shape-2 { @apply top-40 right-20; animation-delay: 2s; }
.shape-3 { @apply bottom-40 left-40; animation-delay: 4s; }
.shape-4 { @apply bottom-20 right-40; animation-delay: 1s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.floating-contact-widget { @apply fixed bottom-8 right-8 z-50; }
.widget-toggle {
  @apply w-14 h-14 bg-brand-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center;
}
.widget-toggle.open { @apply bg-red-500; }
.widget-content {
  @apply absolute bottom-16 right-0 w-80 bg-gray-800 rounded-lg shadow-xl p-6 opacity-0 pointer-events-none transform translate-y-4 transition-all duration-300;
}
.widget-content.open { @apply opacity-100 pointer-events-auto transform translate-y-0; }
.widget-header { @apply mb-4 pb-4 border-b border-gray-600; }
.widget-methods { @apply space-y-3; }
.widget-method { @apply flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200; }

@media (max-width: 768px) {
  .hero-title { @apply text-4xl; }
  .hero-subtitle { @apply text-lg; }
  .floating-contact-widget { @apply bottom-4 right-4; }
  .widget-content { @apply w-72 right-0; }
}
</style>
