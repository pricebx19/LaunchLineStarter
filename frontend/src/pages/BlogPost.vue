<template>
  <BlogPostLayout>
    <!-- Loading State -->
    <LoadingState 
      v-if="loading"
      message="Loading blog post..."
      :full-screen="true"
    />

    <!-- Error State -->
    <ErrorState 
      v-else-if="error"
      title="Failed to Load Blog Post"
      :message="error"
      :full-screen="true"
      @retry="fetchBlogPost"
    />

    <!-- Blog Post Content -->
    <div v-else-if="blogPost" class="bg-gray-900 min-h-screen relative">
      <!-- Reading Progress Bar -->
      <ReadingProgressBar :progress="readingProgress" />

      <!-- Floating Table of Contents -->
      <TableOfContents
        :show="showTOC"
        :items="tableOfContents"
        :active-heading="activeHeading"
        @heading-click="scrollToHeading"
      />

      <!-- Social Sharing Sidebar -->
      <SocialSharingSidebar
        :show="showShareButtons"
        :social-links="socialLinks"
        @share="shareOn"
        @copy-link="copyLink"
      />

      <!-- Hero Section -->
      <BlogPostHeader
        :blog-post="blogPost"
        :estimated-read-time="estimatedReadTime"
        :social-links="socialLinks"
        :format-date="formatDate"
        @share="shareOn"
      />

      <!-- Post Content -->
      <BlogPostContent :blog-post="blogPost" />
    </div>

    <!-- Not Found State -->
    <ErrorState 
      v-else
      title="Blog Post Not Found"
      message="The blog post you're looking for doesn't exist."
      :full-screen="true"
      :show-retry-button="false"
      error-type="not-found"
    >
      <template #action>
        <router-link to="/blog" class="btn-primary">
          Back to Blog
        </router-link>
      </template>
    </ErrorState>
  </BlogPostLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useSeo } from '../lib/seo'
import { useBlogPostData } from '../composables/useBlogPostData'
import { useReadingProgress } from '../composables/useReadingProgress'
import { useSocialSharing } from '../composables/useSocialSharing'
import { useTableOfContents } from '../composables/useTableOfContents'
import type { BlogPostPageProps } from '../types'

// Async component imports for better performance
const LoadingState = defineAsyncComponent(() => import('../components/ui/feedback/LoadingState.vue'))
const ErrorState = defineAsyncComponent(() => import('../components/ui/feedback/ErrorState.vue'))
const BlogPostLayout = defineAsyncComponent(() => import('../components/layout/BlogPostLayout.vue'))
const ReadingProgressBar = defineAsyncComponent(() => import('../components/blog/ReadingProgressBar.vue'))
const TableOfContents = defineAsyncComponent(() => import('../components/blog/TableOfContents.vue'))
const SocialSharingSidebar = defineAsyncComponent(() => import('../components/blog/SocialSharingSidebar.vue'))
const BlogPostHeader = defineAsyncComponent(() => import('../components/blog/BlogPostHeader.vue'))
const BlogPostContent = defineAsyncComponent(() => import('../components/blog/BlogPostContent.vue'))

// Composables
const { updateSeo } = useSeo()
const { blogPost, loading, error, fetchBlogPost, formatDate } = useBlogPostData()
const { readingProgress, showTOC, showShareButtons } = useReadingProgress()
const { socialLinks, shareOn, copyLink } = useSocialSharing(blogPost)
const { tableOfContents, activeHeading, scrollToHeading, initializeTOC } = useTableOfContents()

// Computed properties
const estimatedReadTime = computed(() => {
  if (!blogPost.value) return 0
  const wordsPerMinute = 200
  const content = blogPost.value.intro + (blogPost.value.content ? JSON.stringify(blogPost.value.content) : '')
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

// Lifecycle
onMounted(async () => {
  await fetchBlogPost()
  
  // Update SEO after blog post is loaded
  if (blogPost.value) {
    updateSeo({
      title: `${blogPost.value.title} - LaunchLine Blog`,
      description: blogPost.value.intro,
      ogTitle: blogPost.value.title,
      ogDescription: blogPost.value.intro,
      canonical: window.location.origin + `/blog/${blogPost.value.slug}`
    })
  }
  
  // Initialize table of contents
  initializeTOC()
})
</script>