<template>
  <section class="wagtail-cta-section" :class="ctaClasses">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="cta-heading">{{ ctaData.heading }}</h2>
        
        <p v-if="ctaData.text" class="cta-text">
          {{ ctaData.text }}
        </p>
        
        <div class="cta-button-container">
          <a 
            :href="ctaData.button_link"
            class="cta-button"
            :class="buttonClasses"
          >
            {{ ctaData.button_text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CTAData {
  heading: string
  text?: string
  button_text: string
  button_link: string
  background_color: string
}

interface Props {
  ctaData: CTAData
}

const props = defineProps<Props>()

const ctaClasses = computed(() => {
  const baseClasses = 'wagtail-cta-section'
  const colorClass = `cta-${props.ctaData.background_color}`
  return `${baseClasses} ${colorClass}`
})

const buttonClasses = computed(() => {
  const baseClasses = 'cta-button'
  const colorClass = `button-${props.ctaData.background_color}`
  return `${baseClasses} ${colorClass}`
})
</script>

<style scoped>
.wagtail-cta-section {
  position: relative;
  overflow: hidden;
}

.wagtail-cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.cta-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
}

.cta-primary::before {
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}

.cta-secondary {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: white;
}

.cta-secondary::before {
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}

.cta-dark {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
}

.cta-dark::before {
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}

.cta-light {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
}

.cta-light::before {
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}

.cta-heading {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.cta-text {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  opacity: 0.9;
}

.cta-button-container {
  position: relative;
  z-index: 2;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.button-primary {
  background: white;
  color: #3b82f6;
  border-color: white;
}

.button-primary:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.button-secondary {
  background: white;
  color: #64748b;
  border-color: white;
}

.button-secondary:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.button-dark {
  background: white;
  color: #1e293b;
  border-color: white;
}

.button-dark:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.button-light {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.button-light:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .cta-heading {
    font-size: 2rem;
  }
  
  .cta-text {
    font-size: 1.125rem;
  }
  
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
