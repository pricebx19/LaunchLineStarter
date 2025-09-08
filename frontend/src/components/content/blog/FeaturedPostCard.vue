<template>
  <div class="featured-card relative overflow-hidden group">
    <!-- Background gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <!-- Glowing border effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>
    
    <div class="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 lg:flex lg:items-center lg:space-x-12 hover:border-brand-primary/30 transition-all duration-500 group-hover:bg-gray-800/60">
      <!-- Featured badge -->
      <div class="absolute top-4 left-4 lg:top-6 lg:left-6">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          <span class="text-xs text-brand-primary uppercase tracking-wider font-semibold">{{ badge }}</span>
        </div>
      </div>

      <!-- Image Section -->
      <div class="lg:w-1/2 mt-6 lg:mt-0">
        <div 
          v-if="post.featured_image"
          class="aspect-video bg-gray-700 rounded-xl overflow-hidden mb-6 lg:mb-0 shadow-2xl group-hover:shadow-brand-primary/10 transition-all duration-500 relative"
        >
          <img 
            :src="post.featured_image" 
            :alt="post.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          >
          <!-- Gradient overlay for better text contrast -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500"></div>
          
          <!-- Reading time overlay -->
          <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
            {{ readingTime }} min read
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="lg:w-1/2 space-y-6">
        <div>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors duration-300 leading-tight">
            <router-link :to="`/blog/${post.slug}`" class="hover:text-brand-primary transition-colors">
              {{ post.title }}
            </router-link>
          </h2>
          
          <p class="text-gray-300 mb-6 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
            {{ post.intro }}
          </p>
        </div>

        <!-- Meta information -->
        <div class="flex items-center space-x-6 text-sm text-gray-400 mb-6">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{{ formatDate(post.date) }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span>{{ author }}</span>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="tags.length > 0" class="flex flex-wrap gap-2 mb-6">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full border border-gray-600/50 hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Call to action -->
        <div class="flex items-center justify-between">
          <router-link 
            :to="`/blog/${post.slug}`" 
            class="inline-flex items-center bg-brand-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/25 group/btn"
          >
            <span>{{ readMoreText }}</span>
            <svg class="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>

          <!-- Share button -->
          <button 
            @click="sharePost"
            class="p-3 text-gray-400 hover:text-brand-primary transition-colors duration-300 hover:scale-110"
            title="Share this post"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPage } from '../../../lib/api'

interface Props {
  post: BlogPage
  badge?: string
  author?: string
  readMoreText?: string
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  badge: 'Featured Post',
  author: 'LaunchLine Team',
  readMoreText: 'Read Full Article',
  tags: () => []
})

// Generate reading time based on content
const readingTime = computed(() => {
  const wordsPerMinute = 200
  const content = props.post.intro + (props.post.content ? JSON.stringify(props.post.content) : '')
  const wordCount = content.split(/\s+/).length
  const time = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, time)
})

// Generate tags based on content (in a real app, these would come from the API)
const tags = computed(() => {
  if (props.tags.length > 0) return props.tags
  
  // Generate tags based on content keywords
  const content = props.post.intro.toLowerCase()
  const possibleTags = []
  
  if (content.includes('web') || content.includes('frontend') || content.includes('backend')) {
    possibleTags.push('Web Development')
  }
  if (content.includes('launch') || content.includes('startup') || content.includes('business')) {
    possibleTags.push('Launch Strategy')
  }
  if (content.includes('technology') || content.includes('tech') || content.includes('software')) {
    possibleTags.push('Technology')
  }
  if (content.includes('marketing') || content.includes('seo') || content.includes('digital')) {
    possibleTags.push('Digital Marketing')
  }
  if (content.includes('design') || content.includes('ui') || content.includes('ux')) {
    possibleTags.push('Design')
  }
  
  return possibleTags.slice(0, 3) // Limit to 3 tags for featured posts
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: props.post.title,
      text: props.post.intro,
      url: window.location.origin + `/blog/${props.post.slug}`
    })
  } else {
    // Fallback to copying to clipboard
    const url = window.location.origin + `/blog/${props.post.slug}`
    navigator.clipboard.writeText(url).then(() => {
      console.log('Link copied to clipboard!')
    })
  }
}

defineOptions({
  name: 'FeaturedPostCard'
})
</script>

<style scoped>
/* Featured card animations and effects */
.featured-card {
  will-change: transform;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover {
  transform: translateY(-8px) scale(1.01);
}

/* Glowing border animation */
@keyframes glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.featured-card:hover .absolute.inset-0.bg-gradient-to-r {
  animation: glow 2s ease-in-out infinite;
}

/* Enhanced image effects */
.featured-card img {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  filter: contrast(1.1) saturate(1.1);
}

.featured-card:hover img {
  transform: scale(1.15);
  filter: contrast(1.2) saturate(1.2);
}

/* Text animations */
.featured-card h2 {
  transition: all 0.4s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.featured-card:hover h2 {
  text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

/* Tag hover effects */
.featured-card .flex.flex-wrap span {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.featured-card .flex.flex-wrap span::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.featured-card .flex.flex-wrap span:hover::before {
  transform: translateX(100%);
}

/* Button animations */
.featured-card .bg-brand-primary {
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card .bg-brand-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.featured-card .bg-brand-primary:hover::before {
  transform: translateX(100%);
}

.featured-card .bg-brand-primary:hover {
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

/* Share button effects */
.featured-card button[title="Share this post"] {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.featured-card button[title="Share this post"]:hover {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
}

/* Badge animation */
.featured-card .animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Backdrop blur enhancements */
.featured-card .backdrop-blur-sm {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .featured-card {
    flex-direction: column;
    gap: 2rem;
  }
  
  .featured-card:hover {
    transform: translateY(-4px) scale(1.005);
  }
}

@media (max-width: 768px) {
  .featured-card h2 {
    font-size: 1.5rem;
  }
  
  .featured-card p {
    font-size: 1rem;
  }
  
  .featured-card .flex.items-center {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

/* Accessibility improvements */
.featured-card:focus-within {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 4px;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .featured-card,
  .featured-card img,
  .featured-card h2,
  .featured-card span,
  .featured-card button {
    transition: none !important;
    animation: none !important;
  }
  
  .featured-card:hover {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .featured-card {
    border: 2px solid white;
    background: black;
  }
  
  .featured-card .text-gray-300,
  .featured-card .text-gray-400 {
    color: white !important;
  }
}

/* Print styles */
@media print {
  .featured-card {
    background: white !important;
    color: black !important;
    border: 1px solid black;
  }
  
  .featured-card .text-white,
  .featured-card .text-gray-300,
  .featured-card .text-gray-400 {
    color: black !important;
  }
  
  .featured-card .bg-brand-primary {
    background: black !important;
    color: white !important;
  }
}
</style>
