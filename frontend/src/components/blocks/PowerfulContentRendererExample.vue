<template>
  <div class="powerful-content-renderer-example">
    <div class="example-header">
      <h1 class="text-4xl font-bold text-white mb-4">
        🚀 Powerful Wagtail StreamField System
      </h1>
      <p class="text-xl text-gray-300 mb-8">
        Complete 1:1 mapping between Wagtail blocks and Vue components
      </p>
    </div>

    <!-- Example Content -->
    <PowerfulContentRenderer
      :content="exampleContent"
      :show-dev-tools="true"
      :enable-validation="true"
      :enable-error-boundary="true"
      @block-error="handleBlockError"
      @content-error="handleContentError"
    />

    <!-- Registry Information -->
    <div class="registry-info mt-16 p-8 bg-gray-900 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-6">Block Registry Information</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in registryStats.blocksByCategory" :key="category.category" class="category-card">
          <h3 class="text-lg font-semibold text-blue-400 mb-3 capitalize">
            {{ category.category }} ({{ category.count }})
          </h3>
          <ul class="space-y-1">
            <li v-for="blockName in category.blocks" :key="blockName" class="text-sm text-gray-300">
              • {{ blockName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PowerfulContentRenderer from './PowerfulContentRenderer.vue'
import { getRegistryStats } from '../../lib/blocks/block-registry'
import type { ContentBlock } from '../../types'

// Example content demonstrating various block types
const exampleContent: ContentBlock[] = [
  {
    id: 'hero-1',
    type: 'hero',
    value: {
      heading: 'Welcome to Our Powerful CMS',
      subheading: 'Experience the ultimate flexibility with our 1:1 block-to-component mapping system',
      cta_text: 'Get Started',
      cta_link: '/contact',
      background_image: {
        url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop'
      }
    }
  },
  {
    id: 'features-1',
    type: 'features',
    value: {
      heading: 'Powerful Features',
      subheading: 'Everything you need for modern web development',
      features: [
        {
          icon: 'rocket',
          title: 'Dynamic Components',
          description: 'Automatic component loading and prop mapping'
        },
        {
          icon: 'cog',
          title: 'Flexible Blocks',
          description: '25+ pre-built blocks for any use case'
        },
        {
          icon: 'shield',
          title: 'Type Safety',
          description: 'Full TypeScript support with validation'
        }
      ]
    }
  },
  {
    id: 'code-1',
    type: 'code',
    value: {
      code: `// Example of using the powerful content renderer
import { PowerfulContentRenderer } from '@/components/blocks/PowerfulContentRenderer.vue'

<PowerfulContentRenderer
  :content="wagtailContent"
  :show-dev-tools="true"
  :enable-validation="true"
/>`,
      language: 'javascript',
      show_line_numbers: true,
      copy_button: true
    }
  },
  {
    id: 'accordion-1',
    type: 'accordion',
    value: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          title: 'How does the 1:1 mapping work?',
          content: '<p>Each Wagtail block type has a corresponding Vue component with automatic prop mapping and validation.</p>',
          open_by_default: true
        },
        {
          title: 'Can I add custom blocks?',
          content: '<p>Yes! You can easily register new blocks in the block registry system.</p>',
          open_by_default: false
        },
        {
          title: 'Is it type-safe?',
          content: '<p>Absolutely! Full TypeScript support with runtime validation.</p>',
          open_by_default: false
        }
      ]
    }
  },
  {
    id: 'pricing-1',
    type: 'pricing_table',
    value: {
      heading: 'Choose Your Plan',
      subheading: 'Flexible pricing for every need',
      plans: [
        {
          name: 'Starter',
          price: '$99/month',
          description: 'Perfect for small projects',
          features: ['5 Pages', 'Basic Blocks', 'Email Support'],
          cta_text: 'Get Started',
          cta_link: '/contact',
          popular: false
        },
        {
          name: 'Professional',
          price: '$299/month',
          description: 'Ideal for growing businesses',
          features: ['Unlimited Pages', 'All Blocks', 'Priority Support', 'Custom Components'],
          cta_text: 'Get Started',
          cta_link: '/contact',
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'For large organizations',
          features: ['Everything in Pro', 'Custom Development', 'Dedicated Support', 'SLA'],
          cta_text: 'Contact Sales',
          cta_link: '/contact',
          popular: false
        }
      ]
    }
  },
  {
    id: 'timeline-1',
    type: 'timeline',
    value: {
      heading: 'Our Journey',
      events: [
        {
          date: '2024',
          title: 'Advanced Block System',
          description: 'Implemented powerful 1:1 mapping system with 25+ block types',
          icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
        },
        {
          date: '2023',
          title: 'Wagtail Integration',
          description: 'Built comprehensive Wagtail CMS integration with StreamField support',
          icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
        },
        {
          date: '2022',
          title: 'Vue 3 Foundation',
          description: 'Established modern Vue 3 architecture with TypeScript and Composition API',
          icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
        }
      ]
    }
  },
  {
    id: 'progress-1',
    type: 'progress_bars',
    value: {
      heading: 'Our Expertise',
      bars: [
        { label: 'Vue.js Development', percentage: 95, color: 'green' },
        { label: 'Wagtail CMS', percentage: 90, color: 'blue' },
        { label: 'TypeScript', percentage: 88, color: 'purple' },
        { label: 'StreamField Blocks', percentage: 92, color: 'pink' }
      ]
    }
  },
  {
    id: 'cta-1',
    type: 'cta',
    value: {
      heading: 'Ready to Build Something Amazing?',
      text: 'Experience the power of our 1:1 block-to-component mapping system',
      button_text: 'Start Building',
      button_link: '/contact',
      background_color: 'primary'
    }
  }
]

// Registry statistics
const registryStats = computed(() => getRegistryStats())

// Error handlers
const handleBlockError = (block: ContentBlock, error: Error) => {
  console.error('Block error:', block, error)
}

const handleContentError = (error: Error) => {
  console.error('Content error:', error)
}
</script>

<style scoped>
.powerful-content-renderer-example {
  @apply min-h-screen bg-gray-900 py-16;
}

.example-header {
  @apply text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16;
}

.registry-info {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}

.category-card {
  @apply p-4 bg-gray-800 rounded-lg border border-gray-700;
}

.category-card h3 {
  @apply border-b border-gray-600 pb-2;
}
</style>
