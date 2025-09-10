<template>
  <div 
    class="enhanced-case-study-card"
    :style="{ '--delay': `${index * 0.2}s` }"
  >
    <div class="card-container">
      <!-- Background Pattern -->
      <div class="bg-pattern"></div>
      
      <CaseStudyHeader
        :icon="caseStudy.icon"
        :title="caseStudy.title"
        :business="caseStudy.business"
      />

      <CaseStudyMetrics
        :metric1="caseStudy.metric1"
        :metric2="caseStudy.metric2"
      />

      <!-- Description -->
      <div class="description-section">
        <p class="case-description">{{ caseStudy.description }}</p>
      </div>

      <CaseStudyTestimonial
        :testimonial="caseStudy.testimonial || ''"
        :client="caseStudy.client || ''"
      />

      <CaseStudyDetails
        :project-package="caseStudy.package"
        :timeline="caseStudy.timeline"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CaseStudyHeader = defineAsyncComponent(() => import('../case-studies/CaseStudyHeader.vue'))
const CaseStudyMetrics = defineAsyncComponent(() => import('../case-studies/CaseStudyMetrics.vue'))
const CaseStudyTestimonial = defineAsyncComponent(() => import('../case-studies/CaseStudyTestimonial.vue'))
const CaseStudyDetails = defineAsyncComponent(() => import('../case-studies/CaseStudyDetails.vue'))

interface CaseStudy {
  id: number
  title: string
  business: string
  icon: string
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  description: string
  package: string
  timeline: string
  testimonial?: string
  client?: string
}

interface Props {
  caseStudy: CaseStudy
  index: number
}

defineProps<Props>()

defineOptions({
  name: 'EnhancedCaseStudyCard'
})
</script>

<style scoped>
.enhanced-case-study-card {
  animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  will-change: opacity, transform;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.card-container {
  position: relative;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 1.25rem;
  height: 100%;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  will-change: transform;
  max-width: 350px;
  margin: 0 auto;
  min-height: 580px;
}

.card-container:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Background Pattern */
.bg-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 25%);
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.card-container:hover .bg-pattern {
  opacity: 0.8;
}

/* Description Section */
.description-section {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.case-description {
  color: #e5e7eb;
  line-height: 1.5;
  font-size: 0.875rem;
  margin: 0;
  text-align: left;
  word-spacing: normal;
  letter-spacing: normal;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-container {
    padding: 1rem;
    gap: 0.5rem;
    min-height: auto;
  }
}
</style>