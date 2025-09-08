<template>
  <section class="mobile-hero relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Simplified animated background -->
    <div class="mobile-stars-container absolute inset-0 pointer-events-none">
      <!-- Reduced number of stars for performance -->
      <div class="mobile-star" v-for="i in 15" :key="`mobile-star-${i}`" :style="getStarStyle(i)"></div>
    </div>

    <!-- Content -->
    <div class="text-center text-white relative z-10 px-6 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg leading-tight">
        <span class="text-brand-primary">{{ subtitle || 'Your brand. Your website. Done right.' }}</span>
      </h1>
      <p class="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
        {{ description || 'Professional websites that launch your business into the digital stratosphere.' }}
      </p>
      
      <!-- Mobile-optimized CTA buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <router-link 
          :to="ctaLink || '/contact'" 
          class="bg-brand-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
        >
          {{ ctaText || 'Get Started Today' }}
        </router-link>
        <router-link 
          to="/about" 
          class="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
        >
          Learn More
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MobileHero'
})

interface Props {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

defineProps<Props>()

// Generate simplified star positions for mobile
const getStarStyle = (index: number) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.mobile-hero {
  /* Ensure proper mobile viewport handling */
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
}

/* Simplified starry background for mobile */
.mobile-stars-container {
  pointer-events: none;
}

.mobile-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  width: 2px;
  height: 2px;
  animation: mobile-twinkle 3s ease-in-out infinite;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.6);
}

/* Simplified animation for better mobile performance */
@keyframes mobile-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}


/* Responsive text sizing */
@media (max-width: 640px) {
  .mobile-hero h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .mobile-hero p {
    font-size: 1rem;
  }
}

/* Touch-friendly button sizing */
@media (max-width: 640px) {
  .mobile-hero a {
    min-height: 48px; /* Minimum touch target size */
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
