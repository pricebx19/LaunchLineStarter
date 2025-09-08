<template>
  <section class="mobile-testimonials py-16 bg-gradient-to-br from-gray-800 to-gray-900">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center text-white mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-primary">What Our Clients Say</h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about working with LaunchLine.
        </p>
      </div>
      
      <!-- Mobile-optimized testimonials -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="testimonial-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mr-4">
              <span class="text-xl">⭐</span>
            </div>
            <div>
              <h4 class="font-bold text-white">Sarah Johnson</h4>
              <p class="text-sm text-gray-400">Car Club Owner</p>
            </div>
          </div>
          <p class="text-gray-300 leading-relaxed">
            "LaunchLine transformed our online presence. Our website now perfectly represents our brand and has brought in so many new members!"
          </p>
        </div>
        
        <div class="testimonial-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mr-4">
              <span class="text-xl">⭐</span>
            </div>
            <div>
              <h4 class="font-bold text-white">Mike Chen</h4>
              <p class="text-sm text-gray-400">Event Promoter</p>
            </div>
          </div>
          <p class="text-gray-300 leading-relaxed">
            "Professional, fast, and results-driven. Our event website has seen a 300% increase in ticket sales since the redesign."
          </p>
        </div>
        
        <div class="testimonial-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 md:col-span-2 lg:col-span-1">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mr-4">
              <span class="text-xl">⭐</span>
            </div>
            <div>
              <h4 class="font-bold text-white">Emily Rodriguez</h4>
              <p class="text-sm text-gray-400">Small Business Owner</p>
            </div>
          </div>
          <p class="text-gray-300 leading-relaxed">
            "The team at LaunchLine understood our vision and brought it to life. Our new website has been a game-changer for our business."
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MobileTestimonialsSection'
})

// No complex animations for mobile performance
</script>

<style scoped>
.mobile-testimonials {
  /* Smooth scrolling behavior */
  scroll-behavior: smooth;
}

.testimonial-card {
  /* Subtle hover effects */
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .mobile-testimonials {
    padding: 3rem 1rem;
  }
  
  .mobile-testimonials h2 {
    font-size: 2rem;
  }
  
  .mobile-testimonials p {
    font-size: 1rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
}

/* Touch interactions */
@media (max-width: 768px) {
  .testimonial-card:active {
    transform: scale(0.98);
  }
}
</style>
