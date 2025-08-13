<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          About <span class="text-brand-primary">LaunchLine</span>
        </h1>
        <p class="text-xl text-gray-300 leading-relaxed">
          We're dedicated to transforming innovative ideas into successful launches. 
          Our mission is to provide the expertise, tools, and support needed to accelerate your business growth.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p class="text-gray-300 text-lg leading-relaxed mb-6">
              At LaunchLine, we believe every great idea deserves a successful launch. We're committed to 
              providing comprehensive launch solutions that combine strategic planning, technical excellence, 
              and market insights to maximize your success potential.
            </p>
            <p class="text-gray-300 text-lg leading-relaxed">
              Our team of experts works closely with each client to understand their unique challenges and 
              develop customized strategies that deliver measurable results.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="card text-center">
              <div class="text-3xl font-bold text-brand-primary mb-2">500+</div>
              <div class="text-gray-400">Successful Launches</div>
            </div>
            <div class="card text-center">
              <div class="text-3xl font-bold text-brand-primary mb-2">98%</div>
              <div class="text-gray-400">Client Satisfaction</div>
            </div>
            <div class="card text-center">
              <div class="text-3xl font-bold text-brand-primary mb-2">30</div>
              <div class="text-gray-400">Days Avg Launch</div>
            </div>
            <div class="card text-center">
              <div class="text-3xl font-bold text-brand-primary mb-2">24/7</div>
              <div class="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Approach -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            We follow a proven methodology that ensures every project is delivered on time, 
            within budget, and exceeds expectations.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(step, index) in approachSteps" 
            :key="step.title"
            class="text-center"
          >
            <div class="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-brand-primary">{{ index + 1 }}</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">{{ step.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            These core principles guide every decision we make and every solution we deliver.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="value in values" 
            :key="value.title"
            class="card text-center"
          >
            <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div v-html="value.icon" class="w-6 h-6 text-brand-primary"></div>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ value.title }}</h3>
            <p class="text-gray-400 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTA 
      title="Ready to Work Together?"
      subtitle="Let's discuss how LaunchLine can help accelerate your next big launch."
      primary-cta-text="Get Started"
      primary-cta-link="/contact"
      secondary-cta-text="View Services"
      secondary-cta-link="/services"
      :show-stats="false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CTA from '@/components/CTA.vue'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

const approachSteps = [
  {
    title: 'Discovery & Strategy',
    description: 'We dive deep into understanding your goals, target market, and competitive landscape to develop a comprehensive launch strategy.'
  },
  {
    title: 'Development & Design',
    description: 'Our expert team brings your vision to life with cutting-edge technology and beautiful, user-focused design.'
  },
  {
    title: 'Launch & Optimize',
    description: 'We execute your launch plan with precision and continuously optimize based on real-world performance data.'
  }
]

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
  },
  {
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and creative solutions to solve complex challenges.',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  },
  {
    title: 'Partnership',
    description: 'We work as true partners, invested in your success and committed to long-term relationships.',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>'
  },
  {
    title: 'Results',
    description: 'We focus on measurable outcomes that drive real business value and growth.',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>'
  }
]

onMounted(() => {
  updateSeo({
    title: 'About - LaunchLine',
    description: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    ogTitle: 'About LaunchLine - Professional Launch Solutions',
    ogDescription: 'Learn more about LaunchLine and our mission to provide professional launch solutions that accelerate business growth.',
    canonical: window.location.origin + '/about'
  })
})
</script>