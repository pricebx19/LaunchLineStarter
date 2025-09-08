<template>
  <div class="services-page">
    <!-- Hero Section -->
    <HeroSection>
      <template #title>
        Our <span class="text-brand-primary">Services</span>
      </template>
      <template #subtitle>
        Professional web and software development packages designed for your business needs. 
        From quick launches to enterprise solutions, we deliver results that drive growth.
      </template>
    </HeroSection>

    <!-- Service Categories -->
    <ServicesGrid 
      title="Choose Your Perfect Package"
      subtitle="Whether you're a startup looking to make your mark or an established business ready to scale, we have the perfect solution to accelerate your growth and maximize your digital potential."
      :services="services"
      @select-service="selectedService = $event"
    />

    <!-- A La Carte Services Menu -->
    <AlaCarteMenu :services="alaCarteServices" />

    <!-- FAQ Section -->
    <FAQSection :faqs="faqs" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { 
  servicePackages, 
  alaCarteServices as alaCarteData, 
  serviceFAQs,
  type Service,
  type FAQ,
  type AlaCarteService
} from '../data/servicesData'

// Async component imports for better performance
const HeroSection = defineAsyncComponent(() => import('../components/sections/hero/HeroSection.vue'))
const ServicesGrid = defineAsyncComponent(() => import('../components/sections/ServicesGrid.vue'))
const FAQSection = defineAsyncComponent(() => import('../components/sections/faq/FAQSection.vue'))
const AlaCarteMenu = defineAsyncComponent(() => import('../components/sections/AlaCarteMenu.vue'))

const { updateSeo } = useSeo()

const selectedService = ref<Service | null>(null)

// Data from external files
const services = ref<Service[]>(servicePackages)
const alaCarteServices = ref<AlaCarteService[]>(alaCarteData)
const faqs = ref<FAQ[]>(serviceFAQs)

onMounted(() => {
  updateSeo({
    title: 'Services - LaunchLine',
    description: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    ogTitle: 'LaunchLine Services - Professional Launch Solutions',
    ogDescription: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    canonical: window.location.origin + '/services'
  })
})
</script>

