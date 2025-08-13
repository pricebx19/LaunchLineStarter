<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Our <span class="text-brand-primary">Services</span>
        </h1>
        <p class="text-xl text-gray-300 leading-relaxed">
          Comprehensive launch solutions tailored to your unique needs. 
          From strategy to execution, we provide everything you need for a successful launch.
        </p>
      </div>
    </section>

    <!-- Service Categories -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            v-for="service in services" 
            :key="service.title"
            class="card hover:bg-gray-750 transition-all duration-300 group cursor-pointer"
            @click="selectedService = service"
          >
            <div class="mb-6">
              <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300">
                <div v-html="service.icon" class="w-6 h-6 text-brand-primary"></div>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">{{ service.title }}</h3>
            <p class="text-gray-400 mb-6 leading-relaxed">{{ service.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-primary font-semibold">{{ service.price }}</span>
              <span class="text-sm text-gray-500">{{ service.duration }}</span>
            </div>
            <ul class="mt-6 space-y-2">
              <li 
                v-for="feature in service.features.slice(0, 3)" 
                :key="feature"
                class="text-sm text-gray-400 flex items-center"
              >
                <svg class="w-4 h-4 text-brand-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <button class="btn-primary w-full mt-6">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Our Process</h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(step, index) in processSteps" 
            :key="step.title"
            class="text-center relative"
          >
            <!-- Connector Line -->
            <div 
              v-if="index < processSteps.length - 1"
              class="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand-primary to-transparent transform translate-x-4"
            ></div>
            
            <div class="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
              <span class="text-2xl font-bold text-brand-primary">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ step.title }}</h3>
            <p class="text-gray-400 text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-400">
            Common questions about our services and process.
          </p>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="faq in faqs" 
            :key="faq.question"
            class="card"
          >
            <button 
              @click="faq.isOpen = !faq.isOpen"
              class="w-full text-left flex items-center justify-between"
            >
              <h3 class="text-lg font-semibold text-white pr-4">{{ faq.question }}</h3>
              <svg 
                class="w-5 h-5 text-brand-primary transition-transform duration-200"
                :class="{ 'transform rotate-180': faq.isOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div 
              v-show="faq.isOpen"
              class="mt-4 pt-4 border-t border-gray-700"
            >
              <p class="text-gray-400 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTA 
      title="Ready to Get Started?"
      subtitle="Choose the service that fits your needs and let's launch your success together."
      primary-cta-text="Contact Us"
      primary-cta-link="/contact"
      secondary-cta-text="View Portfolio"
      secondary-cta-link="#"
      :show-stats="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CTA from '@/components/CTA.vue'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

interface Service {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  icon: string
}

interface FAQ {
  question: string
  answer: string
  isOpen: boolean
}

const selectedService = ref<Service | null>(null)

const services: Service[] = [
  {
    title: 'Launch Strategy',
    description: 'Comprehensive market analysis, competitive research, and strategic planning to position your launch for maximum impact.',
    price: 'From $5,000',
    duration: '2-3 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    features: [
      'Market Research & Analysis',
      'Competitive Intelligence',
      'Go-to-Market Strategy',
      'Brand Positioning',
      'Launch Timeline & Roadmap'
    ]
  },
  {
    title: 'Technical Development',
    description: 'Full-stack development services using modern frameworks and best practices to build scalable, performant applications.',
    price: 'From $15,000',
    duration: '6-12 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',
    features: [
      'Modern Web Applications',
      'Mobile-First Design',
      'API Development',
      'Database Architecture',
      'Performance Optimization'
    ]
  },
  {
    title: 'Marketing & Growth',
    description: 'Integrated marketing campaigns, content creation, and growth hacking strategies to drive user acquisition and engagement.',
    price: 'From $8,000',
    duration: '4-8 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg>',
    features: [
      'Digital Marketing Strategy',
      'Content Marketing',
      'Social Media Management',
      'SEO & SEM',
      'Analytics & Reporting'
    ]
  }
]

const processSteps = [
  {
    title: 'Discovery',
    description: 'Understanding your goals, requirements, and constraints'
  },
  {
    title: 'Strategy',
    description: 'Developing a comprehensive launch plan and roadmap'
  },
  {
    title: 'Execution',
    description: 'Building and implementing your solution with precision'
  },
  {
    title: 'Launch',
    description: 'Going live with continuous monitoring and optimization'
  }
]

const faqs = ref<FAQ[]>([
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. Most projects range from 4-12 weeks, with strategic planning typically taking 2-3 weeks and full development projects taking 6-12 weeks.',
    isOpen: false
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes, we offer comprehensive post-launch support including maintenance, updates, monitoring, and optimization services. We can discuss ongoing support packages that fit your needs.',
    isOpen: false
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely! We often collaborate with internal teams and can integrate seamlessly with your existing processes, tools, and team members.',
    isOpen: false
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have experience across various industries including SaaS, e-commerce, fintech, healthtech, and more. Our methodology is adaptable to any industry vertical.',
    isOpen: false
  }
])

onMounted(() => {
  updateSeo({
    title: 'Services - LaunchLine',
    description: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    ogTitle: 'LaunchLine Services - Professional Launch Solutions',
    ogDescription: 'Discover our comprehensive range of professional launch services including strategy, development, and marketing solutions.',
    canonical: window.location.origin + '/services'
  })
})
</script>