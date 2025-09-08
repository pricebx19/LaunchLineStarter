<template>
  <section class="mobile-cta py-16 bg-gradient-to-br from-brand-primary to-blue-600">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <div class="text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Business?</h2>
        <p class="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
          Don't let your competitors get ahead. Get your professional website today and start growing your business online.
        </p>
        
        <!-- Mobile-optimized CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <router-link 
            to="/contact" 
            class="bg-white text-brand-primary px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center hover:bg-gray-100"
          >
            Get Started Today
          </router-link>
          <router-link 
            to="/portfolio" 
            class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
          >
            View Our Work
          </router-link>
        </div>
        
        <!-- Trust indicators -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">Free Consultation</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">24/7 Support</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MobileCTASection'
})

// No complex animations for mobile performance
</script>

<style scoped>
.mobile-cta {
  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .mobile-cta {
    padding: 3rem 1rem;
  }
  
  .mobile-cta h2 {
    font-size: 2rem;
  }
  
  .mobile-cta p {
    font-size: 1rem;
  }
  
  /* Touch-friendly button sizing */
  .mobile-cta a {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Touch interactions */
@media (max-width: 768px) {
  .mobile-cta a:active {
    transform: scale(0.98);
  }
}
</style>
