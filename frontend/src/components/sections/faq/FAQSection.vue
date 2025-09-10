<template>
  <section class="py-10 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 relative overflow-hidden">
    <!-- Enhanced starry background with multiple layers -->
    <div class="stars-container absolute inset-0 opacity-30">
      <div class="star star-small" v-for="i in starCount" :key="`faq-${i}`" :style="getStarStyle('small')"></div>
      <div class="star star-medium" v-for="i in 8" :key="`faq-med-${i}`" :style="getStarStyle('medium')"></div>
    </div>
    
    <!-- Ambient gradient overlays -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent"></div>
    
    <!-- Floating orbs -->
    <div class="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-brand-primary/10 to-purple-600/10 rounded-full blur-3xl opacity-50 animate-float-slow"></div>
    <div class="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-brand-primary/10 rounded-full blur-3xl opacity-40 animate-float-slow-reverse"></div>
    
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Enhanced header section -->
      <div class="text-center mb-20">
        <div class="mb-6">
          <span class="inline-block px-4 py-2 bg-gradient-to-r from-brand-primary/20 to-blue-600/20 rounded-full text-brand-primary text-sm font-medium border border-brand-primary/30 backdrop-blur-sm">
            Got Questions?
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{{ subtitle }}</p>
      </div>
      
      <!-- FAQ Grid -->
      <div class="space-y-6">
        <div 
          v-for="(faq, index) in localFaqs" 
          :key="faq.question"
          class="faq-item relative group opacity-0 translate-y-8"
          :style="{ 'animation-delay': `${index * 150}ms` }"
          @click="toggleFAQ(faq)"
        >
          <!-- Animated background layers -->
          <div class="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/98 rounded-2xl transition-all duration-500"></div>
          
          <!-- Glow border effect -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/20 via-blue-500/10 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          <div class="absolute inset-[1px] bg-gradient-to-br from-gray-800 via-gray-800/98 to-gray-900 rounded-2xl transition-all duration-500"></div>
          
          <!-- Content container -->
          <div class="relative z-10 cursor-pointer">
            <!-- Question header -->
            <div 
              class="flex items-center justify-between p-8 group-hover:bg-gray-700/20 transition-colors duration-300 rounded-t-2xl"
              role="button"
              :aria-expanded="faq.isOpen"
              :aria-controls="`faq-answer-${index}`"
              tabindex="0"
              @keydown.enter="toggleFAQ(faq)"
              @keydown.space="toggleFAQ(faq)"
            >
              <div class="flex items-center space-x-4 flex-1">
                <!-- Question number badge -->
                <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span class="text-brand-primary font-bold text-sm">{{ String(index + 1).padStart(2, '0') }}</span>
                </div>
                
                <!-- Question text -->
                <h3 
                  :id="`faq-question-${index}`"
                  class="text-lg md:text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500 flex-1"
                >
                  {{ faq.question }}
                </h3>
              </div>
              
              <!-- Enhanced chevron with rotation and glow -->
              <div class="flex-shrink-0 relative">
                <div class="w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-primary/20 group-hover:to-blue-600/20 transition-all duration-300">
                  <svg 
                    class="w-6 h-6 text-brand-primary transition-all duration-500 ease-out transform"
                    :class="{ 'rotate-180 scale-110': faq.isOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
                </div>
                
                <!-- Glow ring around chevron -->
                <div class="absolute inset-0 border-2 border-transparent group-hover:border-brand-primary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
              </div>
            </div>
            
            <!-- Answer content with smooth height animation -->
            <div 
              :id="`faq-answer-${index}`"
              ref="answerContent"
              class="answer-content overflow-hidden transition-all duration-500 ease-out"
              :class="{ 'max-h-0': !faq.isOpen, 'max-h-96': faq.isOpen }"
              role="region"
              :aria-labelledby="`faq-question-${index}`"
            >
              <div class="px-8 pb-8 pt-4">
                <!-- Divider with gradient -->
                <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6 opacity-50"></div>
                
                <!-- Answer text with enhanced styling -->
                <div class="relative">
                  <p class="text-gray-300 leading-relaxed text-base md:text-lg relative z-10">
                    {{ faq.answer }}
                  </p>
                  
                  <!-- Subtle background highlight -->
                  <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-blue-600/5 rounded-lg -m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <!-- Decorative elements -->
                <div class="mt-6 flex items-center space-x-2 opacity-60">
                  <div class="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                  <div class="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
                  <div class="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Particle effects on hover -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div class="floating-particle absolute top-4 right-8 w-1 h-1 bg-brand-primary rounded-full animate-float-particle-1"></div>
            <div class="floating-particle absolute top-12 right-12 w-0.5 h-0.5 bg-blue-400 rounded-full animate-float-particle-2"></div>
            <div class="floating-particle absolute top-6 right-16 w-1 h-1 bg-purple-400 rounded-full animate-float-particle-3"></div>
          </div>
        </div>
      </div>
      
      <!-- Call-to-action section -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-2xl border border-gray-600/50 backdrop-blur-sm">
          <svg class="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
          </svg>
          <span class="text-gray-300 text-sm">Still have questions? We'd love to help!</span>
          <a href="/contact" class="text-brand-primary hover:text-blue-400 transition-colors duration-300 font-medium">Contact us →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

interface FAQ {
  question: string
  answer: string
  isOpen?: boolean
}

interface Props {
  title?: string
  subtitle?: string
  faqs: FAQ[]
  starCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions',
  subtitle: 'Common questions about our services and process.',
  starCount: 30
})

defineOptions({
  name: 'FAQSection'
})

// Create local reactive version of FAQs with isOpen property
const localFaqs = ref(
  props.faqs.map(faq => ({
    ...faq,
    isOpen: faq.isOpen ?? false
  }))
)

// Watch for changes in props.faqs to update local version
watch(() => props.faqs, (newFaqs) => {
  localFaqs.value = newFaqs.map(faq => ({
    ...faq,
    isOpen: faq.isOpen ?? false
  }))
}, { deep: true })

// Enhanced FAQ toggle with animation
const toggleFAQ = async (faq: FAQ) => {
  // Close other FAQs for accordion behavior (optional)
  // localFaqs.value.forEach(item => {
  //   if (item !== faq) item.isOpen = false
  // })
  
  faq.isOpen = !faq.isOpen
  
  // Add small delay for smooth animation
  await nextTick()
}

// Generate random star positions with enhanced distribution
const getStarStyle = (size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 4
  const duration = size === 'medium' ? 3 + Math.random() * 2 : 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Intersection Observer for staggered animations
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Create intersection observer for FAQ items
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  )

  // Observe all FAQ items
  const faqItems = document.querySelectorAll('.faq-item')
  faqItems.forEach((item) => {
    observer?.observe(item)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* Enhanced Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

.star-medium {
  width: 2px;
  height: 2px;
  box-shadow: 0 0 4px 2px rgba(14, 165, 233, 0.6);
}

/* Enhanced Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Floating orbs animations */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.5;
  }
  33% {
    transform: translateY(-20px) translateX(10px) scale(1.1);
    opacity: 0.7;
  }
  66% {
    transform: translateY(10px) translateX(-15px) scale(0.9);
    opacity: 0.6;
  }
}

@keyframes float-slow-reverse {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  33% {
    transform: translateY(15px) translateX(-10px) scale(0.8);
    opacity: 0.6;
  }
  66% {
    transform: translateY(-25px) translateX(20px) scale(1.2);
    opacity: 0.5;
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slow-reverse {
  animation: float-slow-reverse 10s ease-in-out infinite;
}

/* FAQ Item Staggered Animation */
.faq-item {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* FAQ Card Advanced Styling */
.faq-item:hover {
  transform: translateY(-8px) scale(1.02);
  filter: brightness(1.05);
}

.faq-item:hover .absolute.inset-0.bg-gradient-to-br {
  background: linear-gradient(
    135deg,
    rgba(31, 41, 55, 0.95),
    rgba(55, 65, 81, 0.98),
    rgba(17, 24, 39, 0.99)
  );
}

/* Enhanced Answer Content Animation */
.answer-content {
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease-in-out 0.1s;
}

.answer-content.max-h-0 {
  opacity: 0;
}

.answer-content.max-h-96 {
  opacity: 1;
}

/* Floating Particles Animations */
@keyframes float-particle-1 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-25px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes float-particle-2 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.5;
  }
  33% {
    transform: translateY(-15px) rotate(120deg) scale(1.3);
    opacity: 0.8;
  }
  66% {
    transform: translateY(-30px) rotate(240deg) scale(0.7);
    opacity: 1;
  }
}

@keyframes float-particle-3 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-12px) rotate(90deg);
    opacity: 0.9;
  }
  75% {
    transform: translateY(-35px) rotate(270deg);
    opacity: 1;
  }
}

.animate-float-particle-1 {
  animation: float-particle-1 4s ease-in-out infinite;
}

.animate-float-particle-2 {
  animation: float-particle-2 6s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-particle-3 {
  animation: float-particle-3 5s ease-in-out infinite;
  animation-delay: 2s;
}

/* Enhanced Chevron Glow Animation */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Question Number Badge Enhanced Effects */
.faq-item:hover .w-10.h-10.bg-gradient-to-br {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
  box-shadow: 
    0 4px 15px rgba(14, 165, 233, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

/* Chevron Button Enhanced Effects */
.faq-item:hover .w-12.h-12.bg-gradient-to-br {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
  box-shadow: 
    0 6px 20px rgba(14, 165, 233, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

/* Decorative Elements Enhanced Animation */
.faq-item .animate-pulse {
  animation: decorative-pulse 2s ease-in-out infinite;
}

@keyframes decorative-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Custom Gray-850 fallback */
.bg-gradient-to-b {
  background: linear-gradient(
    to bottom,
    rgb(17, 24, 39),
    rgb(15, 23, 42),
    rgb(17, 24, 39)
  );
}

/* Call-to-action section hover effects */
.inline-flex:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .faq-item {
    animation-delay: 0ms !important;
  }
  
  .faq-item:hover {
    transform: translateY(-4px) scale(1.01);
  }
  
  .floating-particle {
    display: none;
  }
  
  .animate-float-slow,
  .animate-float-slow-reverse {
    animation: none;
    opacity: 0.2 !important;
  }
  
  .text-lg.md\:text-xl {
    font-size: 1rem;
  }
  
  .text-base.md\:text-lg {
    font-size: 0.875rem;
  }
}

/* Tablet responsiveness */
@media (min-width: 768px) and (max-width: 1023px) {
  .max-w-5xl {
    max-width: 4rem;
  }
  
  .py-20 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .faq-item,
  .floating-particle,
  .animate-float-slow,
  .animate-float-slow-reverse,
  .animate-pulse-glow,
  .star {
    animation: none !important;
    transition: none !important;
  }
  
  .faq-item {
    opacity: 1 !important;
    transform: none !important;
  }
  
  .faq-item:hover {
    transform: none;
  }
  
  .answer-content {
    transition: max-height 0.2s ease;
  }
}

/* Focus states for accessibility */
.faq-item:focus-within {
  outline: 2px solid #0EA5E9;
  outline-offset: 2px;
}

.faq-item [role="button"]:focus {
  outline: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .text-gray-300 {
    color: #e5e7eb;
  }
  
  .border-gray-600\/50 {
    border-color: #9ca3af;
  }
}
</style>
