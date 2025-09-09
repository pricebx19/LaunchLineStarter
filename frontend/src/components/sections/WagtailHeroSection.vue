<template>
  <section class="wagtail-hero-section">
    <div class="hero-background" v-if="heroData.background_image">
      <img 
        :src="heroData.background_image" 
        :alt="heroData.heading"
        class="hero-bg-image"
      />
      <div class="hero-overlay"></div>
    </div>
    
    <div class="hero-content">
      <div class="container mx-auto px-4 py-16 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="hero-heading">
            {{ heroData.heading }}
          </h1>
          
          <p v-if="heroData.subheading" class="hero-subheading">
            {{ heroData.subheading }}
          </p>
          
          <div v-if="heroData.cta_text && heroData.cta_link" class="hero-cta">
            <a 
              :href="heroData.cta_link"
              class="cta-button"
            >
              {{ heroData.cta_text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroData {
  heading: string
  subheading?: string
  cta_text?: string
  cta_link?: string
  background_image?: string
}

interface Props {
  heroData: HeroData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-heading {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subheading {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 2rem;
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  margin-top: 2rem;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
}

@media (max-width: 768px) {
  .hero-heading {
    font-size: 2.5rem;
  }
  
  .hero-subheading {
    font-size: 1.125rem;
  }
  
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
