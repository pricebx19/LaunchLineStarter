<template>
  <section class="wagtail-ala-carte-services">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="servicesData.heading" class="section-heading">
            {{ servicesData.heading }}
          </h2>
          <p v-if="servicesData.subheading" class="section-subheading">
            {{ servicesData.subheading }}
          </p>
        </div>

        <!-- Category Filter -->
        <div class="filter-container mb-12">
          <div class="filter-buttons">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectedCategory = category"
              class="filter-button"
              :class="{ 'active': selectedCategory === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="service in filteredServices" 
            :key="service.title"
            class="service-card"
            :class="{ 'popular': service.popular }"
          >
            <!-- Popular Badge -->
            <div v-if="service.popular" class="popular-badge">
              Popular
            </div>
            
            <!-- Service Icon -->
            <div class="service-icon" v-html="service.icon"></div>
            
            <!-- Service Content -->
            <div class="service-content">
              <div class="service-header">
                <h3 class="service-title">{{ service.title }}</h3>
                <span class="service-category">{{ service.category }}</span>
              </div>
              
              <p class="service-description">{{ service.description }}</p>
              
              <!-- Price -->
              <div class="service-price">{{ service.price }}</div>
              
              <!-- Features -->
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature" class="feature-item">
                  <svg class="feature-dot" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              
              <!-- CTA Button -->
              <button class="service-cta">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredServices.length === 0" class="no-results">
          <div class="no-results-content">
            <svg class="no-results-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <h3>No services found</h3>
            <p>Try selecting a different category</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface AlaCarteService {
  title: string
  description: string
  price: string
  icon: string
  category: string
  features: string[]
  popular?: boolean
}

interface ServicesData {
  heading?: string
  subheading?: string
  services: AlaCarteService[]
}

interface Props {
  servicesData: ServicesData
}

const props = defineProps<Props>()

const selectedCategory = ref('All')

// Get unique categories
const categories = computed(() => {
  const cats = ['All', ...new Set(props.servicesData.services.map(s => s.category))]
  return cats
})

// Filter services by category
const filteredServices = computed(() => {
  if (selectedCategory.value === 'All') {
    return props.servicesData.services
  }
  return props.servicesData.services.filter(service => service.category === selectedCategory.value)
})
</script>

<style scoped>
.wagtail-ala-carte-services {
  background: white;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-subheading {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 3xl;
  margin: 0 auto;
}

.filter-container {
  display: flex;
  justify-content: center;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  color: #3b82f6;
  background: white;
}

.filter-button.active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-card.popular {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.popular-badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.service-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.service-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-header {
  margin-bottom: 0.75rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.service-category {
  font-size: 0.875rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  display: inline-block;
}

.service-description {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.service-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  color: #475569;
  font-size: 0.875rem;
}

.feature-dot {
  width: 0.5rem;
  height: 0.5rem;
  color: #10b981;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.service-cta {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.service-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
}

.service-card.popular .service-cta {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-content {
  max-width: 20rem;
  margin: 0 auto;
}

.no-results-icon {
  width: 4rem;
  height: 4rem;
  color: #cbd5e1;
  margin: 0 auto 1rem;
}

.no-results h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .filter-buttons {
    gap: 0.25rem;
  }
  
  .filter-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .service-card {
    padding: 1.25rem;
  }
}
</style>
