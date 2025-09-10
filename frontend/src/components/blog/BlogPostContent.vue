<template>
  <section class="pb-4 bg-gray-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <article class="prose prose-lg prose-invert max-w-none">
        <!-- Content Blocks -->
        <div v-if="blogPost.content && Array.isArray(blogPost.content) && blogPost.content.length > 0" class="space-y-6">
          <div 
            v-for="(block, index) in blogPost.content" 
            :key="block.id || index"
            class="content-block"
          >
            <!-- Text Block -->
            <div v-if="block.type === 'text'" v-html="(block.value as any)?.content"></div>
            
            <!-- Image Block -->
            <div v-else-if="block.type === 'image'" class="my-8">
              <img 
                :src="(block.value as any)?.image" 
                :alt="(block.value as any)?.caption || 'Blog image'"
                class="w-full rounded-lg shadow-lg"
              >
              <p v-if="(block.value as any)?.caption" class="text-center text-gray-400 mt-3 text-sm">
                {{ (block.value as any)?.caption }}
              </p>
            </div>
            
            <!-- CTA Block -->
            <div v-else-if="block.type === 'cta'" class="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg text-center my-8 border border-gray-600 shadow-lg">
              <h3 class="text-xl font-bold text-white mb-3">{{ (block.value as any)?.heading }}</h3>
              <p class="text-gray-300 mb-4">{{ (block.value as any)?.text }}</p>
              <a 
                :href="(block.value as any)?.button_link" 
                class="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ (block.value as any)?.button_text }}
              </a>
            </div>
          </div>
        </div>

        <!-- Fallback Content - Show intro when no content -->
        <div v-else-if="blogPost.intro" class="text-gray-300 text-lg leading-relaxed">
          <p class="mb-4">{{ blogPost.intro }}</p>
          <p class="text-gray-400 italic text-base">This blog post is currently being prepared. Check back soon for the full content!</p>
        </div>

        <!-- No content at all -->
        <div v-else class="text-gray-300 text-lg leading-relaxed">
          <p>This blog post content is being prepared. Check back soon!</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../../types/Content'

interface Props {
  blogPost: BlogPost
}

defineProps<Props>()
</script>

<style scoped>
.prose {
  color: #e5e7eb;
  max-width: none;
}

.prose h1, .prose h2, .prose h3 {
  color: #ffffff;
  margin: 1.5rem 0 1rem;
}

.prose h1 { font-size: 2rem; font-weight: 700; }
.prose h2 { font-size: 1.5rem; font-weight: 600; }
.prose h3 { font-size: 1.25rem; font-weight: 600; }

.prose p {
  color: #d1d5db;
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose a {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.prose a:hover {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

.prose ul, .prose ol {
  color: #d1d5db;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.prose blockquote {
  color: #9ca3af;
  border-left: 4px solid #4b5563;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.prose img {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.content-block :deep(h2) {
  @apply text-2xl font-bold text-white mb-4 mt-6;
  border-bottom: 2px solid #374151;
  padding-bottom: 0.5rem;
}

.content-block :deep(h3) {
  @apply text-xl font-semibold text-white mb-3 mt-5;
}

.content-block :deep(p) {
  @apply text-gray-300 leading-relaxed mb-4;
  font-size: 1.1rem;
  line-height: 1.75;
}

.content-block :deep(ul) {
  @apply list-disc list-inside text-gray-300 mb-4;
  padding-left: 1.25rem;
}

.content-block :deep(li) {
  @apply mb-2;
  line-height: 1.6;
}

.content-block :deep(strong) {
  @apply font-semibold text-white;
}

.content-block :deep(em) {
  @apply italic text-gray-200;
}

.content-block :deep(code) {
  @apply bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono;
}

.content-block :deep(pre) {
  @apply bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4;
}

.content-block :deep(pre code) {
  @apply bg-transparent p-0 text-gray-200;
}

.content-block {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-block:not(:last-child) {
  border-bottom: 1px solid #1f2937;
  padding-bottom: 1.5rem;
}

.content-block:hover {
  transform: translateX(8px);
  background: rgba(31, 41, 55, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 0 -1rem;
}

@media (max-width: 768px) {
  .prose h1 { font-size: 1.75rem; }
  .prose h2 { font-size: 1.5rem; }
  .prose h3 { font-size: 1.25rem; }
  .content-block :deep(p) { font-size: 1rem; }
  .content-block:hover {
    transform: none;
    margin: 0;
    padding: 0;
    background: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-block { transition: none !important; }
}
</style>
