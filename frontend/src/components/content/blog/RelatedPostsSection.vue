<template>
  <section class="py-8 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700" v-if="posts.length">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">{{ title }}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">{{ description }}</p>
      </div>

      <!-- Related Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="(post, index) in posts" 
          :key="post.slug"
          class="related-post-card group"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <router-link :to="`/blog/${post.slug}`" class="block h-full">
            <!-- Post Image -->
            <div class="post-image-wrapper">
              <img 
                v-if="post.image" 
                :src="post.image" 
                :alt="post.title"
                class="post-image"
              >
              <div v-else class="post-placeholder">
                <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"/>
                </svg>
              </div>
              
              <!-- Read overlay -->
              <div class="post-overlay">
                <span class="read-more">{{ readMoreText }}</span>
              </div>
            </div>

            <!-- Post Content -->
            <div class="post-content">
              <!-- Meta info -->
              <div class="post-meta">
                <time :datetime="post.publishedDate" class="post-date">
                  {{ formatDate(post.publishedDate) }}
                </time>
                <span v-if="post.readingTime" class="post-reading-time">
                  {{ post.readingTime }} min read
                </span>
              </div>

              <!-- Title -->
              <h3 class="post-title">{{ post.title }}</h3>

              <!-- Excerpt -->
              <p class="post-excerpt">{{ post.excerpt }}</p>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length" class="post-tags">
                <span 
                  v-for="tag in post.tags.slice(0, 3)" 
                  :key="tag"
                  class="post-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </router-link>
        </article>
      </div>

      <!-- View All Link -->
      <div class="text-center mt-12" v-if="showViewAll">
        <router-link 
          to="/blog" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          {{ viewAllText }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  image?: string
  publishedDate: string
  readingTime?: number
  tags?: string[]
}

const props = withDefaults(defineProps<{
  posts?: RelatedPost[]
  title?: string
  description?: string
  readMoreText?: string
  viewAllText?: string
  showViewAll?: boolean
}>(), {
  posts: () => [],
  title: 'Related Articles',
  description: 'Continue exploring our insights and expertise with these related articles',
  readMoreText: 'Read More',
  viewAllText: 'View All Articles',
  showViewAll: true
})

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
</script>

<style scoped>
.related-post-card {
  @apply bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-brand-primary/10;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.post-image-wrapper {
  @apply relative overflow-hidden h-48;
}

.post-image {
  @apply w-full h-full object-cover group-hover:scale-110 transition-transform duration-500;
}

.post-placeholder {
  @apply w-full h-full bg-gray-800 flex items-center justify-center;
}

.post-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300;
}

.read-more {
  @apply bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300;
}

.post-content {
  @apply p-6;
}

.post-meta {
  @apply flex items-center gap-3 text-xs text-gray-400 mb-3;
}

.post-date {
  @apply flex items-center;
}

.post-reading-time {
  @apply flex items-center;
}

.post-title {
  @apply text-lg font-semibold text-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2;
}

.post-excerpt {
  @apply text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3;
}

.post-tags {
  @apply flex flex-wrap gap-2;
}

.post-tag {
  @apply px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full border border-brand-primary/30;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
