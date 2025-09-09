<template>
  <div class="wagtail-about-section">
    <!-- Hero Section -->
    <WagtailHeroSection 
      v-if="hasHero && aboutData?.hero" 
      :hero-data="aboutData.hero" 
    />

    <!-- Features Section -->
    <WagtailFeaturesSection 
      v-if="hasFeatures && aboutData?.features"
      :features-data="aboutData.features"
    />

    <!-- Testimonial Section -->
    <WagtailTestimonialSection 
      v-if="hasTestimonial && aboutData?.testimonial"
      :testimonial-data="aboutData.testimonial"
    />

    <!-- CTA Section -->
    <WagtailCTASection 
      v-if="hasCTA && aboutData?.cta"
      :cta-data="aboutData.cta"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading about page...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      <div class="error-message">
        <h3>Unable to load about page</h3>
        <p>{{ error }}</p>
        <button @click="refresh" class="retry-button">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useWagtailAboutData, type WagtailAboutData } from '../../composables/useWagtailAboutData'

// Async component imports for better performance
const WagtailHeroSection = defineAsyncComponent(() => import('./WagtailHeroSection.vue'))
const WagtailFeaturesSection = defineAsyncComponent(() => import('./WagtailFeaturesSection.vue'))
const WagtailTestimonialSection = defineAsyncComponent(() => import('./WagtailTestimonialSection.vue'))
const WagtailCTASection = defineAsyncComponent(() => import('./WagtailCTASection.vue'))

interface Props {
  aboutData?: WagtailAboutData | null
}

const props = withDefaults(defineProps<Props>(), {
  aboutData: null
})

const {
  isLoading,
  error,
  data: fetchedData,
  hasData,
  hasHero,
  hasFeatures,
  hasTestimonial,
  hasCTA,
  refresh
} = useWagtailAboutData()

// Use provided data or fetched data
const aboutData = computed(() => props.aboutData || fetchedData.value)
</script>

<style scoped>
.wagtail-about-section {
  min-height: 100vh;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-message {
  max-width: 32rem;
}

.error-message h3 {
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-message p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.retry-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #2563eb;
}
</style>
