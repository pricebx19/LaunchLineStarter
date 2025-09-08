<template>
  <!-- Hero Section with Advanced Animations -->
  <section class="relative z-10 pt-32 pb-16 px-4 text-center">
    <div class="max-w-4xl mx-auto">
      <h1 class="hero-title text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
        Let's Create
        <span class="text-glow block text-brand-primary">Something Amazing</span>
      </h1>
      <p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Ready to transform your vision into digital reality? We're here to make it happen with cutting-edge technology and innovative design.
      </p>
      
      <!-- Floating CTA buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button @click="handleStartProject" class="cta-primary">
          <span class="relative z-10">Start Your Project</span>
          <div class="button-glow"></div>
        </button>
        <button @click="handleLearnMore" class="cta-secondary">
          <span class="relative z-10">Learn More</span>
        </button>
      </div>

      <!-- Animated metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div v-for="(metric, index) in metrics" :key="metric.label" 
             class="metric-card" 
             :style="{ animationDelay: `${index * 0.2}s` }">
          <div class="text-3xl font-bold text-brand-primary mb-2">{{ metric.value }}</div>
          <div class="text-gray-400 text-sm">{{ metric.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ContactMetric } from '../../composables/useContactMetrics'

interface Props {
  metrics: ContactMetric[]
}

interface Emits {
  (e: 'start-project'): void
  (e: 'learn-more'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleStartProject = () => {
  emit('start-project')
}

const handleLearnMore = () => {
  emit('learn-more')
}
</script>

<style scoped>
/* Hero Animations */
.hero-title {
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-primary, .cta-secondary {
  animation: fadeInUp 1s ease-out 0.4s both;
}

.metric-card {
  animation: fadeInUp 1s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA Button Styles */
.cta-primary {
  @apply relative px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105;
}

.cta-primary .button-glow {
  @apply absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-500 rounded-lg opacity-0 transition-opacity duration-300;
}

.cta-primary:hover .button-glow {
  @apply opacity-20;
}

.cta-secondary {
  @apply px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105;
}

/* Metric Cards */
.metric-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    @apply text-4xl;
  }
  
  .hero-subtitle {
    @apply text-lg;
  }
}
</style>
