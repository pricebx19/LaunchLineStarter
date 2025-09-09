<template>
  <section class="wagtail-text-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div v-if="textData.heading" class="text-center mb-12">
          <h2 class="section-heading">
            {{ textData.heading }}
          </h2>
        </div>

        <!-- Text Content -->
        <div class="text-content">
          <div class="prose prose-lg max-w-none" v-html="formattedText"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TextData {
  heading?: string
  text: string
}

interface Props {
  textData: TextData
}

const props = defineProps<Props>()

const formattedText = computed(() => {
  // Convert line breaks to HTML paragraphs
  return props.textData.text
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('')
})
</script>

<style scoped>
.wagtail-text-section {
  background: white;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.text-content {
  color: #475569;
  line-height: 1.7;
}

:deep(.prose) {
  color: #475569;
}

:deep(.prose p) {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
}

:deep(.prose p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  :deep(.prose p) {
    font-size: 1rem;
  }
}
</style>
