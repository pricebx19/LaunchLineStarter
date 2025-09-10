<template>
  <div class="wagtail-home-section">
    <!-- Hero Section -->
    <WagtailHeroSection 
      v-if="hasHero && homeData?.hero" 
      :hero-data="homeData.hero" 
    />

    <!-- Features Section -->
    <WagtailFeaturesSection 
      v-if="hasFeatures && homeData?.features"
      :features-data="homeData.features"
    />

    <!-- Statistics Section -->
    <WagtailStatisticsSection 
      v-if="hasStatistics && homeData?.statistics"
      :statistics-data="homeData.statistics"
    />

    <!-- Testimonial Section -->
    <WagtailTestimonialSection 
      v-if="hasTestimonial && homeData?.testimonial"
      :testimonial-data="homeData.testimonial"
    />

    <!-- CTA Section -->
    <WagtailCTASection 
      v-if="hasCTA && homeData?.cta"
      :cta-data="homeData.cta"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading home page...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      <div class="error-message">
        <h3>Unable to load home page</h3>
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
import { useWagtailHomeData, type WagtailHomeData } from '../../composables/useWagtailHomeData'

// Async component imports for better performance
const WagtailHeroSection = defineAsyncComponent(() => import('./WagtailHeroSection.vue'))
const WagtailFeaturesSection = defineAsyncComponent(() => import('./WagtailFeaturesSection.vue'))
const WagtailStatisticsSection = defineAsyncComponent(() => import('./WagtailStatisticsSection.vue'))
const WagtailTestimonialSection = defineAsyncComponent(() => import('./WagtailTestimonialSection.vue'))
const WagtailCTASection = defineAsyncComponent(() => import('./WagtailCTASection.vue'))

interface Props {
  homeData?: WagtailHomeData | null
}

const props = withDefaults(defineProps<Props>(), {
  homeData: null
})

const {
  isLoading,
  error,
  data: fetchedData,
  hasHero,
  hasFeatures,
  hasStatistics,
  hasTestimonial,
  hasCTA,
  refresh
} = useWagtailHomeData()

// Use provided data or fetched data
const homeData = computed(() => props.homeData || fetchedData.value)
</script>

<style scoped>
.wagtail-home-section {
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
