<template>
  <section class="wagtail-case-studies">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="caseStudiesData.heading" class="section-heading">
            {{ caseStudiesData.heading }}
          </h2>
          <p v-if="caseStudiesData.subheading" class="section-subheading">
            {{ caseStudiesData.subheading }}
          </p>
        </div>

        <!-- Case Studies Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div 
            v-for="caseStudy in caseStudiesData.case_studies" 
            :key="caseStudy.title"
            class="case-study-card"
          >
            <!-- Case Study Header -->
            <div class="case-study-header">
              <div class="case-study-icon" v-html="caseStudy.icon"></div>
              <div class="case-study-info">
                <h3 class="case-study-title">{{ caseStudy.title }}</h3>
                <p class="case-study-business">{{ caseStudy.business }}</p>
              </div>
            </div>

            <!-- Metrics -->
            <div class="case-study-metrics">
              <div class="metric">
                <span class="metric-value">{{ caseStudy.metric1_value }}</span>
                <span class="metric-label">{{ caseStudy.metric1_label }}</span>
              </div>
              <div class="metric">
                <span class="metric-value">{{ caseStudy.metric2_value }}</span>
                <span class="metric-label">{{ caseStudy.metric2_label }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="case-study-description">{{ caseStudy.description }}</p>

            <!-- Project Details -->
            <div class="case-study-details">
              <div class="detail">
                <span class="detail-label">Package:</span>
                <span class="detail-value">{{ caseStudy.package }}</span>
              </div>
              <div class="detail">
                <span class="detail-label">Timeline:</span>
                <span class="detail-value">{{ caseStudy.timeline }}</span>
              </div>
            </div>

            <!-- Testimonial -->
            <div v-if="caseStudy.testimonial" class="case-study-testimonial">
              <div class="testimonial-quote">
                <svg class="quote-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <blockquote class="testimonial-text">
                  {{ caseStudy.testimonial }}
                </blockquote>
                <div v-if="caseStudy.client" class="testimonial-author">
                  — {{ caseStudy.client }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CaseStudy {
  title: string
  business: string
  icon: string
  metric1_value: string
  metric1_label: string
  metric2_value: string
  metric2_label: string
  description: string
  package: string
  timeline: string
  testimonial?: string
  client?: string
}

interface CaseStudiesData {
  heading?: string
  subheading?: string
  case_studies: CaseStudy[]
}

interface Props {
  caseStudiesData: CaseStudiesData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-case-studies {
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

.case-study-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid #f1f5f9;
  transition: all 0.3s ease;
}

.case-study-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.case-study-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.case-study-icon {
  width: 3rem;
  height: 3rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.case-study-icon :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
}

.case-study-info {
  flex: 1;
}

.case-study-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.case-study-business {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.case-study-metrics {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.metric {
  text-align: center;
  flex: 1;
}

.metric-value {
  display: block;
  font-size: 1.875rem;
  font-weight: 800;
  color: #3b82f6;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.case-study-description {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.case-study-details {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.detail-value {
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 600;
}

.case-study-testimonial {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.testimonial-quote {
  position: relative;
}

.quote-icon {
  width: 2rem;
  height: 2rem;
  color: #3b82f6;
  opacity: 0.3;
  margin-bottom: 0.75rem;
}

.testimonial-text {
  font-style: italic;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.testimonial-author {
  color: #64748b;
  font-weight: 600;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .case-study-card {
    padding: 1.5rem;
  }
  
  .case-study-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .case-study-metrics {
    flex-direction: column;
    gap: 1rem;
  }
  
  .case-study-details {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
