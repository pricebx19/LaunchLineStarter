<template>
  <div class="home-page">
    <!-- Hero Section -->
    <Hero
      title="Launch Your Vision"
      subtitle="With Confidence"
      description="Professional launch solutions designed to accelerate your business growth and maximize your success from day one."
      cta-text="Get Started Today"
      cta-link="/contact"
    />

    <!-- Features Section -->
    <FeatureGrid 
      title="Why Choose LaunchLine?"
      subtitle="We provide comprehensive solutions designed to accelerate your success and maximize your growth potential."
    />

    <!-- Testimonials Section -->
    <Testimonial 
      title="What Our Clients Say"
      subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their LaunchLine experience."
    />

    <!-- Call to Action Section -->
    <CTA 
      title="Ready to Launch Your Success?"
      subtitle="Join hundreds of successful companies who have accelerated their growth with LaunchLine. Let's turn your vision into reality."
      primary-cta-text="Start Your Launch"
      primary-cta-link="/contact"
      secondary-cta-text="View Services"
      secondary-cta-link="/services"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Hero from '@/components/Hero.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'
import Testimonial from '@/components/Testimonial.vue'
import CTA from '@/components/CTA.vue'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

onMounted(() => {
  updateSeo({
    title: 'LaunchLine - Professional Launch Solutions',
    description: 'Professional launch solutions designed to accelerate your business growth and maximize your success from day one.',
    ogTitle: 'LaunchLine - Professional Launch Solutions',
    ogDescription: 'Professional launch solutions designed to accelerate your business growth and maximize your success from day one.',
    canonical: window.location.origin + '/'
  })
})
</script>