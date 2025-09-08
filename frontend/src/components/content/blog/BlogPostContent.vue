<template>
  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="prose prose-lg prose-invert max-w-none">
      <!-- Dynamic content rendering -->
      <div v-if="content" v-html="sanitizedContent" class="blog-content"></div>
      
      <!-- Fallback for slot content -->
      <div v-else class="blog-content">
        <slot></slot>
      </div>
      
      <!-- Content widgets/embeds can be inserted here -->
      <div v-if="hasWidgets" class="content-widgets mt-8 space-y-6">
        <slot name="widgets"></slot>
      </div>
    </div>
    
    <!-- Post footer -->
    <footer class="mt-12 pt-8 border-t border-gray-700">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Tags -->
        <div v-if="tags && tags.length" class="flex flex-wrap gap-2">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="px-3 py-1 bg-brand-primary/20 text-brand-primary text-sm rounded-full border border-brand-primary/30 hover:bg-brand-primary/30 transition-colors"
          >
            #{{ tag }}
          </span>
        </div>
        
        <!-- Share prompt -->
        <div class="text-sm text-gray-400">
          {{ sharePrompt }}
        </div>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import DOMPurify from 'dompurify'

const props = withDefaults(defineProps<{
  content?: string
  tags?: string[]
  sharePrompt?: string
}>(), {
  sharePrompt: 'Found this helpful? Share it with others!'
})

const slots = useSlots()

const hasWidgets = computed(() => !!slots.widgets)

const sanitizedContent = computed(() => {
  if (!props.content) return ''
  
  // Sanitize HTML content to prevent XSS
  return DOMPurify.sanitize(props.content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 'strike',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
      'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'title',
      'class', 'id', 'data-*'
    ]
  })
})
</script>

<style scoped>
/* Enhanced typography for blog content */
:deep(.blog-content) {
  @apply text-gray-300 leading-relaxed;
}

:deep(.blog-content h1) {
  @apply text-3xl font-bold text-white mb-6 mt-8;
}

:deep(.blog-content h2) {
  @apply text-2xl font-bold text-white mb-4 mt-8 border-l-4 border-brand-primary pl-4;
}

:deep(.blog-content h3) {
  @apply text-xl font-semibold text-white mb-3 mt-6;
}

:deep(.blog-content h4) {
  @apply text-lg font-semibold text-white mb-2 mt-4;
}

:deep(.blog-content p) {
  @apply mb-4 text-gray-300;
}

:deep(.blog-content a) {
  @apply text-brand-primary hover:text-blue-400 underline transition-colors;
}

:deep(.blog-content ul) {
  @apply list-disc list-inside mb-4 space-y-2;
}

:deep(.blog-content ol) {
  @apply list-decimal list-inside mb-4 space-y-2;
}

:deep(.blog-content li) {
  @apply text-gray-300;
}

:deep(.blog-content blockquote) {
  @apply border-l-4 border-brand-primary pl-4 italic text-gray-400 my-6 bg-gray-800/50 py-4 rounded-r;
}

:deep(.blog-content code) {
  @apply bg-gray-800 text-brand-primary px-2 py-1 rounded text-sm font-mono;
}

:deep(.blog-content pre) {
  @apply bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6;
}

:deep(.blog-content pre code) {
  @apply bg-transparent p-0;
}

:deep(.blog-content img) {
  @apply rounded-lg shadow-lg mx-auto my-6 max-w-full h-auto;
}

:deep(.blog-content table) {
  @apply w-full border-collapse border border-gray-700 my-6;
}

:deep(.blog-content th) {
  @apply bg-gray-800 text-white font-semibold p-3 border border-gray-700;
}

:deep(.blog-content td) {
  @apply p-3 border border-gray-700 text-gray-300;
}

.content-widgets {
  @apply border-t border-gray-700 pt-8;
}
</style>
