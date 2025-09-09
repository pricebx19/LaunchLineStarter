<template>
  <section class="wagtail-testimonial-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Testimonial Quote -->
        <div class="testimonial-quote">
          <svg class="quote-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <blockquote class="quote-text">
            {{ testimonialData.quote }}
          </blockquote>
        </div>

        <!-- Author Information -->
        <div class="testimonial-author">
          <div v-if="testimonialData.author_image" class="author-image">
            <img 
              :src="testimonialData.author_image" 
              :alt="testimonialData.author_name"
              class="author-photo"
            />
          </div>
          <div class="author-details">
            <div class="author-name">{{ testimonialData.author_name }}</div>
            <div v-if="testimonialData.author_title" class="author-title">
              {{ testimonialData.author_title }}
            </div>
            <div v-if="testimonialData.company" class="author-company">
              {{ testimonialData.company }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TestimonialData {
  quote: string
  author_name: string
  author_title?: string
  company?: string
  author_image?: string
}

interface Props {
  testimonialData: TestimonialData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-testimonial-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.testimonial-quote {
  margin-bottom: 3rem;
}

.quote-icon {
  width: 4rem;
  height: 4rem;
  color: #3b82f6;
  margin: 0 auto 2rem;
  opacity: 0.3;
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.6;
  color: #1e293b;
  font-style: italic;
  margin: 0;
  max-width: 3xl;
  margin: 0 auto;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.author-image {
  flex-shrink: 0;
}

.author-photo {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3b82f6;
}

.author-details {
  text-align: left;
}

.author-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.author-title {
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.author-company {
  font-size: 0.875rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 1.25rem;
  }
  
  .testimonial-author {
    flex-direction: column;
    text-align: center;
  }
  
  .author-details {
    text-align: center;
  }
  
  .author-photo {
    width: 3rem;
    height: 3rem;
  }
}
</style>
