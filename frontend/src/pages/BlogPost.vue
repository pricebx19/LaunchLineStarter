<template>
  <div class="blog-post-page">
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
      <div class="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          class="h-full bg-gradient-to-r from-brand-primary to-blue-600 transition-all duration-300 ease-out"
          :style="{ width: `${readingProgress}%` }"
        ></div>
      </div>

      <!-- Floating Table of Contents -->
      <transition name="slide-in">
        <div 
          v-if="showTOC && tableOfContents.length > 0"
          class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        >
          <div class="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 max-w-xs">
            <h3 class="text-sm font-semibold text-white mb-3">Table of Contents</h3>
            <nav class="space-y-2">
              <a 
                v-for="(heading, index) in tableOfContents" 
                :key="index"
                :href="`#${heading.id}`"
                @click.prevent="scrollToHeading(heading.id)"
                class="block text-xs text-gray-400 hover:text-brand-primary transition-colors py-1 border-l-2 border-transparent hover:border-brand-primary pl-3"
                :class="{ 'text-brand-primary border-brand-primary': activeHeading === heading.id }"
              >
                {{ heading.text }}
              </a>
            </nav>
          </div>
        </div>
      </transition>

      <!-- Social Sharing Sidebar -->
      <transition name="slide-in">
        <div 
          v-if="showShareButtons"
          class="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-3"
        >
          <button 
            v-for="social in socialLinks" 
            :key="social.name"
            @click="shareOn(social.name)"
            :class="social.class"
            class="p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            :title="`Share on ${social.name}`"
          >
            <svg class="w-5 h-5" fill="currentColor" :viewBox="social.viewBox">
              <path :d="social.path"/>
            </svg>
          </button>
          
          <!-- Copy Link Button -->
          <button 
            @click="copyLink"
            class="p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
            title="Copy link"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </transition>

      <!-- Hero Section -->
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
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                <span>{{ formatDate(blogPost.publishedDate || blogPost.date) }}</span>
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
                @click="shareOn(social.name)"
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

      <!-- Post Content -->
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
                <div v-if="block.type === 'text'" v-html="block.value.content"></div>
                
                <!-- Image Block -->
                <div v-else-if="block.type === 'image'" class="my-8">
                  <img 
                    :src="block.value.image" 
                    :alt="block.value.caption || 'Blog image'"
                    class="w-full rounded-lg shadow-lg"
                  >
                  <p v-if="block.value.caption" class="text-center text-gray-400 mt-3 text-sm">
                    {{ block.value.caption }}
                  </p>
                </div>
                
                <!-- CTA Block -->
                <div v-else-if="block.type === 'cta'" class="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg text-center my-8 border border-gray-600 shadow-lg">
                  <h3 class="text-xl font-bold text-white mb-3">{{ block.value.heading }}</h3>
                  <p class="text-gray-300 mb-4">{{ block.value.text }}</p>
                  <a 
                    :href="block.value.button_link" 
                    class="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ block.value.button_text }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { api, type BlogPage } from '../lib/api'
import { useSeo } from '../lib/seo'
import LoadingState from '../components/ui/feedback/LoadingState.vue'
import ErrorState from '../components/ui/feedback/ErrorState.vue'

const route = useRoute()
const { updateSeo } = useSeo()

const blogPost = ref<BlogPage | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Reading progress and interactive features
const readingProgress = ref(0)
const showTOC = ref(false)
const showShareButtons = ref(false)
const tableOfContents = ref<{id: string, text: string}[]>([])
const activeHeading = ref('')

// Social sharing configuration
const socialLinks = ref([
  {
    name: 'Twitter',
    class: 'bg-blue-500 text-white hover:bg-blue-600',
    viewBox: '0 0 24 24',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  },
  {
    name: 'LinkedIn',
    class: 'bg-blue-700 text-white hover:bg-blue-800',
    viewBox: '0 0 24 24',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'Facebook',
    class: 'bg-blue-600 text-white hover:bg-blue-700',
    viewBox: '0 0 24 24',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  }
])

// Computed properties
const estimatedReadTime = computed(() => {
  if (!blogPost.value) return 0
  const wordsPerMinute = 200
  const content = blogPost.value.intro + (blogPost.value.content ? JSON.stringify(blogPost.value.content) : '')
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

const fetchBlogPost = async () => {
  try {
    loading.value = true
    error.value = null
    
    const slug = route.params.slug as string
    console.log('Fetching blog post with slug:', slug)
    
    const response = await api.getBlogPost(slug)
    console.log('API response:', response)
    
    if (response.success && response.data) {
      console.log('Response data structure:', response.data)
      
      // Handle Wagtail API v2 response structure
      const items = response.data.items || []
      console.log('Items found:', items.length)
      
      if (items.length > 0) {
        const item = items[0]
        console.log('Blog post item:', item)
        
        // Transform Wagtail response to match our BlogPage interface
        blogPost.value = {
          id: item.id,
          title: item.title,
          slug: item.meta?.slug || item.slug,
          intro: item.intro || item.title,
          date: item.meta?.first_published_at || item.date || new Date().toISOString(),
          body: item.body || '',
          publishedDate: item.meta?.first_published_at || item.date || new Date().toISOString(),
          author: item.author || 'Anonymous',
          featuredImage: item.featured_image || item.featuredImage,
          content: Array.isArray(item.content) ? item.content : [], // This is now an array from the API
          seo: {
            title: item.title,
            description: item.meta?.search_description || item.search_description || ''
          }
        }
        
        console.log('Transformed blog post:', blogPost.value)
        
        // Update SEO
        if (blogPost.value) {
          updateSeo({
            title: `${blogPost.value.title} - LaunchLine Blog`,
            description: blogPost.value.intro,
            ogTitle: blogPost.value.title,
            ogDescription: blogPost.value.intro,
            canonical: window.location.origin + `/blog/${blogPost.value.slug}`
          })
        }
      } else {
        console.error('No items found in response')
        error.value = 'Blog post not found'
      }
    } else {
      console.error('API response not successful:', response)
      error.value = response.error || 'Failed to load blog post'
    }
  } catch (err) {
    console.error('Error in fetchBlogPost:', err)
    error.value = 'Network error occurred'
  } finally {
    loading.value = false
    console.log('Loading finished, blogPost:', blogPost.value)
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Interactive features
const updateReadingProgress = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / docHeight) * 100
  readingProgress.value = Math.min(100, Math.max(0, progress))
  
  // Show/hide TOC and share buttons based on scroll position
  showTOC.value = scrollTop > 300
  showShareButtons.value = scrollTop > 300
}

const generateTableOfContents = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  tableOfContents.value = Array.from(headings).map((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    return {
      id,
      text: heading.textContent || ''
    }
  })
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeHeading.value = id
  }
}

const updateActiveHeading = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let currentActiveHeading = ''
  
  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 0) {
      currentActiveHeading = heading.id
    }
  })
  
  activeHeading.value = currentActiveHeading
}

// Social sharing functions
const shareOn = (platform: string) => {
  const url = window.location.href
  const title = blogPost.value?.title || 'Check out this blog post'
  const text = blogPost.value?.intro || ''
  
  let shareUrl = ''
  
  switch (platform) {
    case 'Twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
      break
    case 'LinkedIn':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      break
    case 'Facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // You could show a toast notification here
    console.log('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

// Scroll event handler
const handleScroll = () => {
  updateReadingProgress()
  updateActiveHeading()
}

onMounted(() => {
  fetchBlogPost()
  window.addEventListener('scroll', handleScroll)
  
  // Generate TOC after content is loaded
  nextTick(() => {
    setTimeout(() => {
      generateTableOfContents()
    }, 500)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.prose {
  color: #e5e7eb;
  max-width: none;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #ffffff;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.prose h1 {
  font-size: 2rem;
  font-weight: 700;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

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
  color: #e5e7eb;
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

/* Add some visual interest to the content */
.content-block {
  position: relative;
}

.content-block:not(:last-child) {
  border-bottom: 1px solid #1f2937;
  padding-bottom: 1.5rem;
}

/* Improve the overall page layout */
.blog-post-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

/* Enhanced slide-in animations */
.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Reading progress bar */
.reading-progress {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
  background-size: 200% 100%;
  animation: progressGradient 3s ease infinite;
}

@keyframes progressGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Table of Contents styling */
.toc-container {
  backdrop-filter: blur(12px);
  background: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(75, 85, 99, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.toc-container nav a {
  transition: all 0.3s ease;
  position: relative;
}

.toc-container nav a::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #3b82f6, transparent);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.toc-container nav a:hover::before,
.toc-container nav a.active::before {
  transform: scaleY(1);
}

/* Social sharing buttons */
.social-share button {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.social-share button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.social-share button:hover::before {
  transform: translateX(100%);
}

/* Enhanced content animations */
.content-block {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.content-block::before {
  content: '';
  position: absolute;
  left: -2px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #3b82f6, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.content-block:hover::before {
  opacity: 1;
}

.content-block:hover {
  transform: translateX(8px);
  background: rgba(31, 41, 55, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 0 -1rem;
}

/* Parallax effect for hero image */
.hero-image {
  will-change: transform;
}

/* Enhanced typography */
.prose h1, .prose h2, .prose h3 {
  position: relative;
}

.prose h2::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #7c3aed);
  border-radius: 1px;
}

/* Mobile optimizations */
@media (max-width: 1024px) {
  .toc-container,
  .social-share {
    display: none !important;
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .prose h1 {
    font-size: 1.75rem;
  }
  
  .prose h2 {
    font-size: 1.5rem;
  }
  
  .prose h3 {
    font-size: 1.25rem;
  }
  
  .content-block :deep(p) {
    font-size: 1rem;
  }
  
  .content-block:hover {
    transform: none;
    margin: 0;
    padding: 0;
    background: transparent;
  }
}

/* Print styles */
@media print {
  .reading-progress,
  .toc-container,
  .social-share,
  .back-to-top {
    display: none !important;
  }
  
  .prose {
    color: black !important;
  }
  
  .prose h1, .prose h2, .prose h3 {
    color: black !important;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .slide-in-enter-active,
  .slide-in-leave-active,
  .content-block,
  .social-share button,
  .reading-progress {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .toc-container,
  .social-share button {
    border: 2px solid white;
    background: black;
  }
  
  .prose {
    color: white;
  }
}
</style>
