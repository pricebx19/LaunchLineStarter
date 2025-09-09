<template>
  <div class="content-renderer">
    <template v-for="block in contentBlocks">
      <!-- Hero Block -->
      <Hero
        v-if="block.type === 'hero'"
        :key="`hero-${block.id}`"
        :is-active="true"
        :title="block.value.title || block.value.heading"
        :subtitle="block.value.subtitle || block.value.subheading"
        :description="block.value.description || block.value.text"
        :cta-text="block.value.cta_text || block.value.ctaText"
        :cta-link="block.value.cta_link || block.value.ctaLink"
        :background-image="block.value.background_image || block.value.backgroundImage"
      />

      <!-- Feature Grid Block -->
      <FeatureGrid
        v-else-if="block.type === 'features'"
        :key="`features-${block.id}`"
        :title="block.value.title || block.value.heading"
        :subtitle="block.value.subtitle || block.value.subheading"
        :features="block.value.features || block.value.items"
      />

      <!-- Testimonial Block -->
      <Testimonial
        v-else-if="block.type === 'testimonial'"
        :key="`testimonial-${block.id}`"
        :title="block.value.title || block.value.heading"
        :subtitle="block.value.subtitle || block.value.subheading"
        :testimonials="block.value.testimonials || block.value.items"
      />

      <!-- CTA Block -->
      <CTA
        v-else-if="block.type === 'cta'"
        :key="`cta-${block.id}`"
        :title="block.value.title || block.value.heading"
        :subtitle="block.value.subtitle || block.value.subheading"
        :primary-cta-text="block.value.primary_cta_text || block.value.ctaText"
        :primary-cta-link="block.value.primary_cta_link || block.value.ctaLink"
        :secondary-cta-text="block.value.secondary_cta_text"
        :secondary-cta-link="block.value.secondary_cta_link"
      />

      <!-- Text Block -->
      <section
        v-else-if="block.type === 'text'"
        :key="`text-${block.id}`"
        class="py-16 bg-gray-800"
      >
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div v-if="block.value.title" class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              {{ block.value.title }}
            </h2>
            <div v-if="block.value.subtitle" class="text-xl text-gray-300">
              {{ block.value.subtitle }}
            </div>
          </div>
          <div class="prose prose-lg prose-invert max-w-none">
            <div v-html="block.value.content || block.value.text"></div>
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
          <div v-if="block.value.caption" class="text-center mb-8">
            <h3 class="text-2xl font-semibold text-white mb-2">
              {{ block.value.caption }}
            </h3>
            <div v-if="block.value.description" class="text-gray-300">
              {{ block.value.description }}
            </div>
          </div>
          <div class="flex justify-center">
            <img
              v-if="block.value.image"
              :src="block.value.image"
              :alt="block.value.alt_text || block.value.caption || 'Content image'"
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
