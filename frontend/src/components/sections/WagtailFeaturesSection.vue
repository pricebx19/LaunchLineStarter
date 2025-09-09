<template>
  <section class="wagtail-features-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="featuresData.heading" class="section-heading">
            {{ featuresData.heading }}
          </h2>
          <p v-if="featuresData.subheading" class="section-subheading">
            {{ featuresData.subheading }}
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in featuresData.features" 
            :key="index"
            class="feature-card"
          >
            <!-- Feature Icon -->
            <div class="feature-icon" v-html="feature.icon"></div>
            
            <!-- Feature Content -->
            <div class="feature-content">
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesData {
  heading?: string
  subheading?: string
  features: Feature[]
}

interface Props {
  featuresData: FeaturesData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-features-section {
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

.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.feature-content {
  text-align: center;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .feature-icon {
    width: 3rem;
    height: 3rem;
  }
}
</style>
