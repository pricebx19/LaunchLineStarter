<template>
  <div class="wagtail-portfolio-section">
    <!-- Hero Section -->
    <WagtailHeroSection 
      v-if="hasHero && portfolioData?.hero" 
      :hero-data="portfolioData.hero" 
    />

    <!-- Statistics Section -->
    <WagtailStatisticsSection 
      v-if="hasStatistics && portfolioData?.statistics"
      :statistics-data="portfolioData.statistics"
    />

    <!-- Portfolio Projects Section -->
    <WagtailPortfolioProjects 
      v-if="hasProjects && portfolioData?.portfolio_projects"
      :projects-data="mappedProjectsData"
    />

    <!-- Case Studies Section -->
    <WagtailCaseStudies 
      v-if="hasCaseStudies && portfolioData?.case_studies"
      :case-studies-data="portfolioData.case_studies"
    />

    <!-- Technologies Section -->
    <WagtailTechnologies 
      v-if="hasTechnologies && portfolioData?.technologies"
      :technologies-data="portfolioData.technologies"
    />

    <!-- CTA Section -->
    <WagtailCTASection 
      v-if="hasCTA && portfolioData?.cta"
      :cta-data="portfolioData.cta"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading portfolio...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      <div class="error-message">
        <h3>Unable to load portfolio</h3>
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
import { useWagtailPortfolioData, type WagtailPortfolioData } from '../../composables/useWagtailPortfolioData'
import type { Project } from '../../data/portfolioData'

// Async component imports for better performance
const WagtailHeroSection = defineAsyncComponent(() => import('./WagtailHeroSection.vue'))
const WagtailStatisticsSection = defineAsyncComponent(() => import('./WagtailStatisticsSection.vue'))
const WagtailPortfolioProjects = defineAsyncComponent(() => import('./WagtailPortfolioProjects.vue'))
const WagtailCaseStudies = defineAsyncComponent(() => import('./WagtailCaseStudies.vue'))
const WagtailTechnologies = defineAsyncComponent(() => import('./WagtailTechnologies.vue'))
const WagtailCTASection = defineAsyncComponent(() => import('./WagtailCTASection.vue'))

interface Props {
  portfolioData?: WagtailPortfolioData | null
}

const props = withDefaults(defineProps<Props>(), {
  portfolioData: null
})

const {
  isLoading,
  error,
  data: fetchedData,
  hasData,
  hasHero,
  hasStatistics,
  hasProjects,
  hasCaseStudies,
  hasTechnologies,
  hasCTA,
  refresh
} = useWagtailPortfolioData()

// Use provided data or fetched data
const portfolioData = computed(() => props.portfolioData || fetchedData.value)

// Map WagtailProject to Project for compatibility
const mappedProjectsData = computed((): { heading?: string; subheading?: string; projects: Project[] } => {
  if (!portfolioData.value?.portfolio_projects?.projects) return { projects: [] }
  
  return {
    heading: portfolioData.value.hero?.heading,
    subheading: portfolioData.value.hero?.subheading,
    projects: (portfolioData.value.portfolio_projects.projects || []).map((wagtailProject: any) => ({
      id: parseInt(wagtailProject.id) || 0,
      title: wagtailProject.title,
      description: wagtailProject.description,
      icon: wagtailProject.icon || '🚀',
      tags: wagtailProject.tags || [],
      package: wagtailProject.package || 'Standard',
      timeline: wagtailProject.timeline || '2-4 weeks',
      category: wagtailProject.category || 'Web Development',
      image: wagtailProject.image || '',
      technologies: wagtailProject.technologies || [],
      status: wagtailProject.status || 'completed',
      metrics: {
        visits: wagtailProject.visits || '0',
        conversion: wagtailProject.conversion || '0%',
        performance: wagtailProject.performance || '0%'
      }
    }))
  }
})
</script>

<style scoped>
.wagtail-portfolio-section {
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
