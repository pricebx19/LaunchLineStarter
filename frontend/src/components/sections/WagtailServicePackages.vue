<template>
  <section class="wagtail-service-packages">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="packagesData.heading" class="section-heading">
            {{ packagesData.heading }}
          </h2>
          <p v-if="packagesData.subheading" class="section-subheading">
            {{ packagesData.subheading }}
          </p>
        </div>

        <!-- Service Packages Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(pkg, index) in packagesData.packages" 
            :key="index"
            class="service-package-card"
            :class="{ 'featured': index === 1 }"
          >
            <!-- Package Icon -->
            <div class="package-icon" v-html="pkg.icon"></div>
            
            <!-- Package Content -->
            <div class="package-content">
              <h3 class="package-title">{{ pkg.title }}</h3>
              <p class="package-description">{{ pkg.description }}</p>
              
              <!-- Price and Duration -->
              <div class="package-pricing">
                <span class="package-price">{{ pkg.price }}</span>
                <span class="package-duration">{{ pkg.duration }}</span>
              </div>
              
              <!-- Features List -->
              <ul class="package-features">
                <li v-for="feature in pkg.features" :key="feature" class="feature-item">
                  <svg class="feature-check" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
              
              <!-- CTA Button -->
              <button class="package-cta">
                Choose {{ pkg.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServicePackage {
  title: string
  description: string
  price: string
  duration: string
  icon: string
  features: string[]
}

interface PackagesData {
  heading?: string
  subheading?: string
  packages: ServicePackage[]
}

interface Props {
  packagesData: PackagesData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-service-packages {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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

.service-package-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.service-package-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.service-package-card.featured {
  border-color: #3b82f6;
  transform: scale(1.05);
}

.service-package-card.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: 1rem;
  right: -2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 0.25rem 3rem;
  font-size: 0.875rem;
  font-weight: 600;
  transform: rotate(45deg);
}

.package-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.package-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.package-content {
  text-align: center;
}

.package-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.package-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.package-pricing {
  margin-bottom: 2rem;
}

.package-price {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 0.25rem;
}

.package-duration {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.package-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  color: #475569;
}

.feature-check {
  width: 1.25rem;
  height: 1.25rem;
  color: #10b981;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.package-cta {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.package-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.service-package-card.featured .package-cta {
  background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%);
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .service-package-card.featured {
    transform: none;
  }
  
  .package-icon {
    width: 3rem;
    height: 3rem;
  }
}
</style>
