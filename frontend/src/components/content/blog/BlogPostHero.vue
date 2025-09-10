<template>
  <section class="py-4 bg-gradient-to-b from-gray-800 to-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back to Blog Link -->
      <div class="mb-6">
        <router-link 
          to="/blog" 
          class="inline-flex items-center text-brand-primary hover:text-blue-400 transition-colors text-sm font-medium group"
        >
          <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ backLinkText }}
        </router-link>
      </div>

      <!-- Blog Post Meta -->
      <div class="mb-6">
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
          <time :datetime="publishedDate || ''" class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ formattedDate }}
          </time>
          
          <span class="flex items-center" v-if="readingTime">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ readingTime }} min read
          </span>
          
          <div class="flex items-center gap-2" v-if="tags && tags.length">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in tags" 
                :key="tag"
                class="px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full border border-brand-primary/30"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Post Title -->
      <h1 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {{ title }}
      </h1>

      <!-- Blog Post Excerpt -->
      <p class="text-xl text-gray-300 leading-relaxed mb-8" v-if="excerpt">
        {{ excerpt }}
      </p>

      <!-- Author Info -->
      <div class="flex items-center space-x-4 py-6 border-t border-gray-700" v-if="author">
        <div class="w-12 h-12 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {{ author.initials }}
        </div>
        <div>
          <div class="text-white font-semibold">{{ author.name }}</div>
          <div class="text-gray-400 text-sm">{{ author.role }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Author {
  name: string
  role: string
  initials: string
}

const props = withDefaults(defineProps<{
  title?: string
  excerpt?: string
  publishedDate?: string
  readingTime?: number
  tags?: string[]
  author?: Author
  backLinkText?: string
}>(), {
  title: 'Blog Post Title',
  backLinkText: 'Back to Blog'
})

const formattedDate = computed(() => {
  if (!props.publishedDate) return ''
  
  try {
    return new Date(props.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return props.publishedDate
  }
})
</script>
