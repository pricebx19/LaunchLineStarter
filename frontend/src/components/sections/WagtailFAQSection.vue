<template>
  <section class="wagtail-faq-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="faqData.heading" class="section-heading">
            {{ faqData.heading }}
          </h2>
          <p v-if="faqData.subheading" class="section-subheading">
            {{ faqData.subheading }}
          </p>
        </div>

        <!-- FAQ Items -->
        <div class="faq-container">
          <div 
            v-for="(faq, index) in faqData.faqs" 
            :key="index"
            class="faq-item"
            :class="{ 'open': openItems.has(index) }"
          >
            <button 
              @click="toggleItem(index)"
              class="faq-question"
            >
              <span class="question-text">{{ faq.question }}</span>
              <svg 
                class="question-icon"
                :class="{ 'rotated': openItems.has(index) }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div 
              class="faq-answer"
              :class="{ 'open': openItems.has(index) }"
            >
              <div class="answer-content">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="faq-cta">
          <div class="cta-content">
            <h3>Still have questions?</h3>
            <p>Get in touch with our team and we'll be happy to help.</p>
            <a href="/contact" class="cta-button">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FAQ {
  question: string
  answer: string
}

interface FAQData {
  heading?: string
  subheading?: string
  faqs: FAQ[]
}

interface Props {
  faqData: FAQData
}

defineProps<Props>()

const openItems = ref(new Set<number>())

const toggleItem = (index: number) => {
  if (openItems.value.has(index)) {
    openItems.value.delete(index)
  } else {
    openItems.value.add(index)
  }
}
</script>

<style scoped>
.wagtail-faq-section {
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
  max-width: 2xl;
  margin: 0 auto;
}

.faq-container {
  margin-bottom: 4rem;
}

.faq-item {
  background: white;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-item.open {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f8fafc;
}

.question-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  margin-right: 1rem;
}

.question-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #3b82f6;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.question-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.open {
  max-height: 20rem;
}

.answer-content {
  padding: 0 1.5rem 1.5rem;
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
}

.faq-cta {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.cta-content h3 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #3b82f6;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .faq-question {
    padding: 1.25rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .answer-content {
    padding: 0 1.25rem 1.25rem;
    font-size: 0.875rem;
  }
  
  .faq-cta {
    padding: 2rem 1.5rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
