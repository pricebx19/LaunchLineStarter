<template>
  <section class="py-24 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title || 'Why Choose LaunchLine?' }}
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          {{ subtitle || 'We provide comprehensive solutions designed to accelerate your success and maximize your growth potential.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.id || feature.title"
          class="card hover:bg-gray-750 transition-all duration-300 group"
        >
          <!-- Icon -->
          <div class="mb-6">
            <div class="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300">
              <div v-html="getFeatureIcon(feature.icon)" class="w-6 h-6 text-brand-primary"></div>
            </div>
          </div>

          <!-- Content -->
          <h3 class="text-xl font-semibold text-white mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-400 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Feature } from '@/lib/api'

interface Props {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const props = withDefaults(defineProps<Props>(), {
  features: () => [
    {
      id: 1,
      title: 'Strategic Planning',
      description: 'Comprehensive launch strategies tailored to your unique business goals and market conditions.',
      icon: 'strategy'
    },
    {
      id: 2,
      title: 'Technical Excellence',
      description: 'Cutting-edge technology solutions built with modern frameworks and best practices.',
      icon: 'technology'
    },
    {
      id: 3,
      title: 'Market Analysis',
      description: 'Deep market research and competitive analysis to position your launch for maximum impact.',
      icon: 'analytics'
    },
    {
      id: 4,
      title: 'Brand Development',
      description: 'Professional brand identity and messaging that resonates with your target audience.',
      icon: 'brand'
    },
    {
      id: 5,
      title: 'Launch Support',
      description: 'Dedicated support team to ensure smooth execution and rapid problem resolution.',
      icon: 'support'
    },
    {
      id: 6,
      title: 'Growth Optimization',
      description: 'Continuous optimization strategies to maximize growth and long-term success.',
      icon: 'growth'
    }
  ]
})

// Icon mapping - in a real app, these could be from an icon library
const iconMap: Record<string, string> = {
  strategy: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  technology: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
  analytics: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>',
  brand: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/></svg>',
  support: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"/></svg>',
  growth: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg>'
}

const getFeatureIcon = (iconName: string): string => {
  return iconMap[iconName] || iconMap.strategy
}
</script>