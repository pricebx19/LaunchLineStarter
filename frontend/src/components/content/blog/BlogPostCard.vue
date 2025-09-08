<template>
  <article class="card group relative overflow-hidden hover:bg-gray-750/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-brand-primary/50 backdrop-blur-sm border border-gray-700/30">
    <!-- Floating tags/categories -->
    <div v-if="tags.length > 0" class="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
      <span 
        v-for="tag in tags.slice(0, 2)" 
        :key="tag"
        class="px-2 py-1 bg-brand-primary/80 text-white text-xs font-medium rounded-full backdrop-blur-sm"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Featured image with overlay -->
    <div 
      v-if="post.featured_image"
      class="aspect-video bg-gray-700 rounded-lg overflow-hidden mb-6 group-hover:shadow-lg transition-all duration-500 relative"
    >
      <img 
        :src="post.featured_image" 
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      >
      <!-- Gradient overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10">
      <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-brand-primary transition-colors duration-300">
        <router-link :to="`/blog/${post.slug}`" class="block">
          {{ post.title }}
        </router-link>
      </h3>
      
      <p class="text-gray-400 mb-4 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
        {{ post.intro }}
      </p>
      
      <!-- Meta information -->
      <div class="flex items-center justify-between text-sm mb-4">
        <div class="flex items-center space-x-4 text-gray-500">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{{ formatDate(post.date) }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ readingTime }} min read</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span>{{ author }}</span>
          </div>
        </div>
      </div>

      <!-- Call-to-action -->
      <router-link 
        :to="`/blog/${post.slug}`" 
        class="inline-flex items-center text-brand-primary hover:text-blue-400 font-medium transition-all duration-300 group-hover:scale-105 group/link"
      >
        <span>{{ readText }}</span>
        <svg class="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </router-link>
    </div>

    <!-- Hover effect overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPage } from '../../../lib/api'

interface Props {
  post: BlogPage
  author?: string
  readText?: string
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  author: 'LaunchLine Team',
  readText: 'Read article',
  tags: () => []
})

// Generate reading time based on content length
const readingTime = computed(() => {
  const wordsPerMinute = 200
  const content = props.post.intro + (props.post.content ? JSON.stringify(props.post.content) : '')
  const wordCount = content.split(/\s+/).length
  const time = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, time) // Minimum 1 minute
})

// Generate tags based on content (in a real app, these would come from the API)
const tags = computed(() => {
  if (props.tags.length > 0) return props.tags
  
  // Generate tags based on content keywords
  const content = props.post.intro.toLowerCase()
  const possibleTags = []
  
  if (content.includes('web') || content.includes('frontend') || content.includes('backend')) {
    possibleTags.push('Web Dev')
  }
  if (content.includes('launch') || content.includes('startup') || content.includes('business')) {
    possibleTags.push('Launch Strategy')
  }
  if (content.includes('technology') || content.includes('tech') || content.includes('software')) {
    possibleTags.push('Technology')
  }
  if (content.includes('marketing') || content.includes('seo') || content.includes('digital')) {
    possibleTags.push('Marketing')
  }
  if (content.includes('design') || content.includes('ui') || content.includes('ux')) {
    possibleTags.push('Design')
  }
  
  return possibleTags.slice(0, 2) // Limit to 2 tags
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

defineOptions({
  name: 'BlogPostCard'
})
</script>

<style scoped>
/* Enhanced card hover effects */
.card {
  background: rgba(31, 41, 55, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  transition: all 0.5s ease;
  opacity: 0;
}

.card:hover::before {
  opacity: 1;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(59, 130, 246, 0.1),
    0 0 40px rgba(59, 130, 246, 0.1);
  background: rgba(31, 41, 55, 0.6);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Enhanced image effects */
.card img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover img {
  transform: scale(1.1);
}

/* Line clamp for text truncation */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Meta icons styling */
.card svg {
  transition: all 0.3s ease;
}

.card:hover svg {
  color: rgb(96, 165, 250);
}

/* Tag animations */
.card .absolute.top-4 span {
  transform: scale(0.95);
  transition: all 0.3s ease;
}

.card:hover .absolute.top-4 span {
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Link hover effects */
.group\/link:hover svg {
  transform: translateX(4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card:hover {
    transform: translateY(-4px) scale(1.01);
  }
  
  .card .flex.items-center {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Performance optimizations */
.card {
  will-change: transform, box-shadow;
}

/* Focus states for accessibility */
.card:focus-within {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card img,
  .card svg,
  .card span {
    transition: none !important;
    animation: none !important;
  }
  
  .card:hover {
    transform: none;
  }
}

/* Dark theme enhancements */
@media (prefers-color-scheme: dark) {
  .card {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(51, 65, 85, 0.4);
  }
  
  .card:hover {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(59, 130, 246, 0.4);
  }
}
</style>
