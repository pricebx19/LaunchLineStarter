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
          Back to Blog
        </router-link>
      </div>

      <!-- Featured Image -->
      <div 
        v-if="blogPost.featuredImage"
        class="aspect-video bg-gray-700 rounded-lg overflow-hidden mb-8 shadow-xl relative group"
      >
        <img 
          :src="blogPost.featuredImage" 
          :alt="blogPost.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hero-image"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      <!-- Post Header -->
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {{ blogPost.title }}
        </h1>
        
        <div class="flex items-center justify-center space-x-6 text-gray-400 text-sm md:text-base mb-6">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{{ formatDate(blogPost.publishedDate || blogPost.date || '') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span>{{ blogPost.author }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ estimatedReadTime }} min read</span>
          </div>
        </div>

        <!-- Mobile Share Buttons -->
        <div class="flex lg:hidden justify-center space-x-4 mb-6">
          <button 
            v-for="social in socialLinks.slice(0, 3)" 
            :key="social.name"
            @click="handleShare(social.name)"
            :class="social.class"
            class="p-2 rounded-full transition-all duration-300 hover:scale-110"
            :title="`Share on ${social.name}`"
          >
            <svg class="w-4 h-4" fill="currentColor" :viewBox="social.viewBox">
              <path :d="social.path"/>
            </svg>
          </button>
        </div>
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../../types/Content'
import type { SocialLink } from '../../types/SocialSharing'
import { formatDate } from '../../utils/helpers'

interface Props {
  blogPost: BlogPost
  estimatedReadTime: number
  socialLinks: SocialLink[]
}

interface Emits {
  (e: 'share', platform: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleShare = (platform: string) => {
  emit('share', platform)
}
</script>

<style scoped>
/* Parallax effect for hero image */
.hero-image {
  will-change: transform;
}
</style>
