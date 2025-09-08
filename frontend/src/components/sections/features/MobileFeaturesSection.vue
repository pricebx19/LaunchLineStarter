<template>
  <section class="mobile-features py-16 bg-gradient-to-br from-gray-800 to-gray-900">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center text-white mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-primary">Why LaunchLine?</h2>
        <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          We don't just build websites—we build digital launchpads that accelerate your business growth and establish your brand authority.
        </p>
      </div>
      
      <!-- Mobile-optimized feature cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="feature-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🚀</span>
          </div>
          <h3 class="text-xl font-bold mb-3 text-white">Fast Launch</h3>
          <p class="text-gray-400 leading-relaxed">Get your website up and running quickly with our streamlined development process</p>
        </div>
        
        <div class="feature-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">💎</span>
          </div>
          <h3 class="text-xl font-bold mb-3 text-white">Premium Quality</h3>
          <p class="text-gray-400 leading-relaxed">Professional design that converts visitors into customers and builds brand trust</p>
        </div>
        
        <div class="feature-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">📈</span>
          </div>
          <h3 class="text-xl font-bold mb-3 text-white">Results Driven</h3>
          <p class="text-gray-400 leading-relaxed">Websites that grow your business with proven strategies and measurable results</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MobileFeaturesSection'
})

// No complex animations or heavy JavaScript for mobile performance
</script>

<style scoped>
.mobile-features {
  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
}

.feature-card {
  /* Subtle hover effects optimized for mobile */
  transform: translateY(0);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Touch-friendly interactions */
@media (max-width: 768px) {
  .feature-card {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .feature-card:active {
    transform: scale(0.98);
  }
}

/* Ensure proper spacing on mobile */
@media (max-width: 640px) {
  .mobile-features {
    padding: 3rem 1rem;
  }
  
  .mobile-features h2 {
    font-size: 2rem;
  }
  
  .mobile-features p {
    font-size: 1rem;
  }
}
</style>
