<template>
  <nav class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Previous Post -->
      <div v-if="previousPost" class="nav-card group">
        <router-link :to="`/blog/${previousPost.slug}`" class="block h-full">
          <div class="nav-direction">
            <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            {{ previousLabel }}
          </div>
          <h3 class="nav-title">{{ previousPost.title }}</h3>
          <p class="nav-excerpt">{{ previousPost.excerpt }}</p>
        </router-link>
      </div>

      <!-- Placeholder for alignment when no previous post -->
      <div v-else class="hidden md:block"></div>

      <!-- Next Post -->
      <div v-if="nextPost" class="nav-card group md:text-right">
        <router-link :to="`/blog/${nextPost.slug}`" class="block h-full">
          <div class="nav-direction md:justify-end">
            {{ nextLabel }}
            <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 class="nav-title">{{ nextPost.title }}</h3>
          <p class="nav-excerpt">{{ nextPost.excerpt }}</p>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface BlogPost {
  slug: string
  title: string
  excerpt: string
}

withDefaults(defineProps<{
  previousPost?: BlogPost
  nextPost?: BlogPost
  previousLabel?: string
  nextLabel?: string
}>(), {
  previousLabel: 'Previous Post',
  nextLabel: 'Next Post'
})
</script>

<style scoped>
.nav-card {
  @apply bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl p-6 border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10;
}

.nav-direction {
  @apply flex items-center text-sm text-brand-primary font-medium mb-2;
}

.nav-title {
  @apply text-lg font-semibold text-white mb-2 group-hover:text-brand-primary transition-colors line-clamp-2;
}

.nav-excerpt {
  @apply text-sm text-gray-400 line-clamp-3;
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
