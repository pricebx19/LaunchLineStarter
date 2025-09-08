<template>
  <section class="mobile-statistics py-16 bg-gradient-to-br from-gray-900 to-black">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center text-white mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-primary">LaunchLine by the Numbers</h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Real results that speak for themselves. See how we've launched businesses into digital success.
        </p>
      </div>
      
      <!-- Mobile-optimized statistics grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="stat-card text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-brand-primary">50+</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-white">Websites Launched</h3>
          <p class="text-sm text-gray-400">Successfully deployed</p>
        </div>
        
        <div class="stat-card text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-brand-primary">98%</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-white">Client Satisfaction</h3>
          <p class="text-sm text-gray-400">Happy customers</p>
        </div>
        
        <div class="stat-card text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-brand-primary">24/7</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-white">Support Available</h3>
          <p class="text-sm text-gray-400">Always here for you</p>
        </div>
        
        <div class="stat-card text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <div class="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-brand-primary">2x</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-white">Traffic Growth</h3>
          <p class="text-sm text-gray-400">Average increase</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MobileStatisticsSection'
})

// No complex animations for mobile performance
</script>

<style scoped>
.mobile-statistics {
  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
}

.stat-card {
  /* Subtle hover effects */
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  background-color: rgba(31, 41, 55, 0.4);
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .mobile-statistics {
    padding: 3rem 1rem;
  }
  
  .mobile-statistics h2 {
    font-size: 2rem;
  }
  
  .mobile-statistics p {
    font-size: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-card h3 {
    font-size: 1rem;
  }
  
  .stat-card p {
    font-size: 0.875rem;
  }
}

/* Touch interactions */
@media (max-width: 768px) {
  .stat-card:active {
    transform: scale(0.98);
  }
}
</style>
