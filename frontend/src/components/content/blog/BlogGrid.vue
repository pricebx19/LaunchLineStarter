<template>
  <div class="space-y-10">
    <!-- Featured Post -->
    <FeaturedPostCard 
      v-if="featuredPost" 
      :post="featuredPost"
    />

    <!-- Other Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogPostCard 
        v-for="post in otherPosts" 
        :key="post.id"
        :post="post"
      />
    </div>

    <!-- Pagination -->
    <Pagination 
      :pagination="pagination"
      :current-page="currentPage"
      :loading="false"
      @change-page="$emit('changePage', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BlogPage } from '../../../lib/api'
import FeaturedPostCard from './FeaturedPostCard.vue'
import BlogPostCard from './BlogPostCard.vue'
import Pagination from '../../ui/navigation/Pagination.vue'

interface PaginationData {
  next: string | null
  previous: string | null
  count: number
}

interface Props {
  blogPosts: BlogPage[]
  currentPage: number
  pagination: PaginationData | null
}

const props = defineProps<Props>()

defineEmits<{
  changePage: [page: number]
}>()

const featuredPost = computed(() => props.blogPosts[0] || null)
const otherPosts = computed(() => props.blogPosts.slice(1))

defineOptions({
  name: 'BlogGrid'
})
</script>

<style scoped>
/* Add subtle animations */
.space-y-10 > * {
  transition: all 0.3s ease;
}

.space-y-10 > *:hover {
  transform: translateY(-1px);
}

/* Improve grid layout */
.grid {
  gap: 1.5rem;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
}
</style>
