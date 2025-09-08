<template>
  <div class="portfolio-page overflow-hidden">
    <!-- Portfolio Hero Section -->
    <PortfolioHero :stats="stats" />

    <!-- Portfolio Grid with Filters -->
    <PortfolioGrid
      :categories="categories"
      :selected-categories="selectedCategories"
      :special-filters="specialFilters"
      :projects="projects"
      @categories-change="handleCategoriesChange"
      @special-filters-change="handleSpecialFiltersChange"
    />

    <!-- Success Stories Section -->
    <SuccessStoriesSection :case-studies="caseStudies" />

    <!-- Technologies Showcase -->
    <TechnologiesShowcase :technologies="technologies" />

    <!-- Portfolio CTA Section -->
    <PortfolioCTASection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { 
  portfolioCategories, 
  portfolioStats, 
  portfolioTechnologies, 
  portfolioProjects, 
  portfolioCaseStudies,
  type Project,
  type CaseStudy,
  type Technology,
  type Stat
} from '../data/portfolioData'

const { updateSeo } = useSeo()

// Async components for better performance
const PortfolioHero = defineAsyncComponent(() => import('../components/sections/hero/PortfolioHero.vue'))
const PortfolioGrid = defineAsyncComponent(() => import('../components/content/portfolio/grids/PortfolioGrid.vue'))
const SuccessStoriesSection = defineAsyncComponent(() => import('../components/sections/SuccessStoriesSection.vue'))
const TechnologiesShowcase = defineAsyncComponent(() => import('../components/sections/features/TechnologiesShowcase.vue'))
const PortfolioCTASection = defineAsyncComponent(() => import('../components/sections/PortfolioCTASection.vue'))

// Reactive state
const selectedCategories = ref<string[]>(['All Projects'])
const specialFilters = ref({
  popular: false,
  featured: false,
  recent: false
})
// Data from external files
const categories = ref<string[]>(portfolioCategories)
const stats = ref<Stat[]>(portfolioStats)
const technologies = ref<Technology[]>(portfolioTechnologies)
const projects = ref<Project[]>(portfolioProjects)
const caseStudies = ref<CaseStudy[]>(portfolioCaseStudies)

// Methods (none needed - all handled by child components)

// Handle filter changes
const handleCategoriesChange = (categories: string[]) => {
  selectedCategories.value = categories
}

const handleSpecialFiltersChange = (filters: { popular: boolean; featured: boolean; recent: boolean }) => {
  specialFilters.value = filters
}

onMounted(() => {
  // Reset filter state to defaults when component mounts
  selectedCategories.value = ['All Projects']
  specialFilters.value = {
    popular: false,
    featured: false,
    recent: false
  }
  
  updateSeo({
    title: 'Portfolio - LaunchLine LLC | Our Work & Success Stories',
    description: 'See how LaunchLine has launched businesses into the digital stratosphere. View our stunning portfolio of SaaS platforms, e-commerce sites, and enterprise solutions.',
    ogTitle: 'Portfolio - LaunchLine LLC | Our Work & Success Stories',
    ogDescription: 'See how LaunchLine has launched businesses into the digital stratosphere. View our stunning portfolio of SaaS platforms, e-commerce sites, and enterprise solutions.',
    canonical: window.location.origin + '/portfolio'
  })
})
</script>


