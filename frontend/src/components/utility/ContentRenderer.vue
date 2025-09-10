<template>
  <div class="content-renderer">
    <template v-for="block in contentBlocks">
      <!-- Hero Block -->
      <Hero
        v-if="block.type === 'hero'"
        :key="`hero-${block.id}`"
        :is-active="true"
        :title="getBlockValue(block, 'title') || getBlockValue(block, 'heading')"
        :subtitle="getBlockValue(block, 'subtitle') || getBlockValue(block, 'subheading')"
        :description="getBlockValue(block, 'description') || getBlockValue(block, 'text')"
        :cta-text="getBlockValue(block, 'cta_text') || getBlockValue(block, 'ctaText')"
        :cta-link="getBlockValue(block, 'cta_link') || getBlockValue(block, 'ctaLink')"
        :background-image="getBlockValue(block, 'background_image') || getBlockValue(block, 'backgroundImage')"
      />

      <!-- Feature Grid Block -->
      <FeatureGrid
        v-else-if="block.type === 'features'"
        :key="`features-${block.id}`"
        :title="getBlockValue(block, 'title') || getBlockValue(block, 'heading')"
        :subtitle="getBlockValue(block, 'subtitle') || getBlockValue(block, 'subheading')"
        :features="(getBlockValue(block, 'features') || getBlockValue(block, 'items')) as any"
      />

      <!-- Testimonial Block -->
      <Testimonial
        v-else-if="block.type === 'testimonial'"
        :key="`testimonial-${block.id}`"
        :title="getBlockValue(block, 'title') || getBlockValue(block, 'heading')"
        :subtitle="getBlockValue(block, 'subtitle') || getBlockValue(block, 'subheading')"
        :testimonials="(getBlockValue(block, 'testimonials') || getBlockValue(block, 'items')) as any"
      />

      <!-- CTA Block -->
      <CTA
        v-else-if="block.type === 'cta'"
        :key="`cta-${block.id}`"
        :title="getBlockValue(block, 'title') || getBlockValue(block, 'heading')"
        :subtitle="getBlockValue(block, 'subtitle') || getBlockValue(block, 'subheading')"
        :primary-cta-text="getBlockValue(block, 'primary_cta_text') || getBlockValue(block, 'ctaText')"
        :primary-cta-link="getBlockValue(block, 'primary_cta_link') || getBlockValue(block, 'ctaLink')"
        :secondary-cta-text="getBlockValue(block, 'secondary_cta_text')"
        :secondary-cta-link="getBlockValue(block, 'secondary_cta_link')"
      />

      <!-- Text Block -->
      <section
        v-else-if="block.type === 'text'"
        :key="`text-${block.id}`"
        class="py-16 bg-gray-800"
      >
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div v-if="getBlockValue(block, 'title')" class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              {{ getBlockValue(block, 'title') }}
            </h2>
            <div v-if="getBlockValue(block, 'subtitle')" class="text-xl text-gray-300">
              {{ getBlockValue(block, 'subtitle') }}
            </div>
          </div>
          <div class="prose prose-lg prose-invert max-w-none">
            <div v-html="getBlockValue(block, 'content') || getBlockValue(block, 'text')"></div>
          </div>
        </div>
      </section>

      <!-- Image Block -->
      <section
        v-else-if="block.type === 'image'"
        :key="`image-${block.id}`"
        class="py-16 bg-gray-800"
      >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div v-if="getBlockValue(block, 'caption')" class="text-center mb-8">
            <h3 class="text-2xl font-semibold text-white mb-2">
              {{ getBlockValue(block, 'caption') }}
            </h3>
            <div v-if="getBlockValue(block, 'description')" class="text-gray-300">
              {{ getBlockValue(block, 'description') }}
            </div>
          </div>
          <div class="flex justify-center">
            <img
              v-if="getBlockValue(block, 'image')"
              :src="getBlockValue(block, 'image')"
              :alt="getBlockValue(block, 'alt_text') || getBlockValue(block, 'caption') || 'Content image'"
              class="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <!-- Fallback for unknown block types -->
      <div
        v-else
        :key="`unknown-${block.id}`"
        class="py-8 bg-gray-800"
      >
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <p class="text-gray-400">
              Unknown content block type: {{ block.type }}
            </p>
            <pre class="text-xs text-gray-500 mt-2 text-left overflow-auto">
              {{ JSON.stringify(block.value, null, 2) }}
            </pre>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ContentBlock } from '../../types'

const Hero = defineAsyncComponent(() => import('../sections/hero/Hero.vue'))
const FeatureGrid = defineAsyncComponent(() => import('../sections/features/FeatureGrid.vue'))
const Testimonial = defineAsyncComponent(() => import('../ui/display/Testimonial.vue'))
const CTA = defineAsyncComponent(() => import('../sections/cta/components/CTA.vue'))

interface Props {
  content: ContentBlock[]
}

const props = defineProps<Props>()

const contentBlocks = computed(() => {
  if (!props.content || !Array.isArray(props.content)) {
    return []
  }
  
  // Filter out null/undefined blocks and ensure proper structure
  return props.content.filter(block => 
    block && 
    block.type && 
    block.value && 
    block.id
  )
})

// Type guard for block value
const getBlockValue = (block: ContentBlock, key: string): string => {
  if (typeof block.value === 'object' && block.value !== null) {
    const value = (block.value as Record<string, unknown>)[key]
    return typeof value === 'string' ? value : ''
  }
  return ''
}
</script>

<style scoped>
/* Content renderer styles */

.prose {
  color: #e5e7eb;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #ffffff;
}

.prose p {
  color: #d1d5db;
}

.prose a {
  color: #0ea5e9;
}

.prose a:hover {
  color: #0284c7;
}
</style>
