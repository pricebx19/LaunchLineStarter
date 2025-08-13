<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          LaunchLine <span class="text-brand-primary">Blog</span>
        </h1>
        <p class="text-xl text-gray-300 leading-relaxed">
          Insights, strategies, and the latest updates on launch success. 
          Learn from our experts and stay ahead of the curve.
        </p>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="py-24 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center">
            <svg class="animate-spin h-8 w-8 text-brand-primary mr-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-400">Loading blog posts...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="card max-w-md mx-auto">
            <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h3 class="text-lg font-semibold text-white mb-2">Failed to Load Blog Posts</h3>
            <p class="text-gray-400 mb-4">{{ error }}</p>
            <button @click="fetchBlogPosts" class="btn-primary">
              Try Again
            </button>
          </div>
        </div>

        <!-- Blog Posts Grid -->
        <div v-else-if="blogPosts.length > 0" class="space-y-12">
          <!-- Featured Post -->
          <div v-if="featuredPost" class="card lg:flex lg:items-center lg:space-x-8">
            <div class="lg:w-1/2">
              <div 
                v-if="featuredPost.featuredImage"
                class="aspect-video bg-gray-700 rounded-lg overflow-hidden mb-6 lg:mb-0"
              >
                <img 
                  :src="featuredPost.featuredImage" 
                  :alt="featuredPost.title"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>
            <div class="lg:w-1/2">
              <div class="text-sm text-brand-primary uppercase tracking-wider mb-2">Featured Post</div>
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
                <router-link :to="`/blog/${featuredPost.slug}`" class="hover:text-brand-primary transition-colors">
                  {{ featuredPost.title }}
                </router-link>
              </h2>
              <p class="text-gray-300 mb-6 leading-relaxed">{{ featuredPost.intro }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-400">
                  <span>{{ formatDate(featuredPost.publishedDate) }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ featuredPost.author }}</span>
                </div>
                <router-link 
                  :to="`/blog/${featuredPost.slug}`" 
                  class="text-brand-primary hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Read More →
                </router-link>
              </div>
            </div>
          </div>

          <!-- Other Posts Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article 
              v-for="post in otherPosts" 
              :key="post.id"
              class="card group hover:bg-gray-750 transition-all duration-300"
            >
              <div 
                v-if="post.featuredImage"
                class="aspect-video bg-gray-700 rounded-lg overflow-hidden mb-6"
              >
                <img 
                  :src="post.featuredImage" 
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              
              <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-brand-primary transition-colors">
                <router-link :to="`/blog/${post.slug}`">
                  {{ post.title }}
                </router-link>
              </h3>
              
              <p class="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                {{ post.intro }}
              </p>
              
              <div class="flex items-center justify-between text-sm">
                <div class="text-gray-500">
                  <span>{{ formatDate(post.publishedDate) }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ post.author }}</span>
                </div>
                <router-link 
                  :to="`/blog/${post.slug}`" 
                  class="text-brand-primary hover:text-blue-400 font-medium transition-colors"
                >
                  Read →
                </router-link>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <div v-if="pagination && (pagination.previous || pagination.next)" class="flex justify-center items-center space-x-4 pt-8">
            <button 
              v-if="pagination.previous"
              @click="loadPage(currentPage - 1)"
              class="btn-secondary"
              :disabled="loading"
            >
              ← Previous
            </button>
            
            <span class="text-gray-400">
              Page {{ currentPage }}
            </span>
            
            <button 
              v-if="pagination.next"
              @click="loadPage(currentPage + 1)"
              class="btn-secondary"
              :disabled="loading"
            >
              Next →
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="card max-w-md mx-auto">
            <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
            <h3 class="text-lg font-semibold text-white mb-2">No Blog Posts Yet</h3>
            <p class="text-gray-400">Check back soon for our latest insights and updates!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p class="text-xl text-gray-400 mb-8">
          Get the latest insights and updates delivered straight to your inbox.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
          <button class="btn-primary px-8">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api, type BlogPage } from '@/lib/api'
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

const blogPosts = ref<BlogPage[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pagination = ref<{
  next: string | null
  previous: string | null
  count: number
} | null>(null)

const featuredPost = computed(() => blogPosts.value[0] || null)
const otherPosts = computed(() => blogPosts.value.slice(1))

const fetchBlogPosts = async (page: number = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const response = await api.getBlogList(page)
    
    if (response.success && response.data) {
      blogPosts.value = response.data.results
      pagination.value = {
        next: response.data.next,
        previous: response.data.previous,
        count: response.data.count
      }
      currentPage.value = page
    } else {
      error.value = response.error || 'Failed to load blog posts'
      // Fallback to mock data for demo purposes
      blogPosts.value = getMockBlogPosts()
    }
  } catch (err) {
    error.value = 'Network error occurred'
    console.error('Failed to fetch blog posts:', err)
    // Fallback to mock data for demo purposes
    blogPosts.value = getMockBlogPosts()
  } finally {
    loading.value = false
  }
}

const loadPage = (page: number) => {
  fetchBlogPosts(page)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getMockBlogPosts = (): BlogPage[] => [
  {
    id: 1,
    title: 'The Ultimate Guide to Product Launch Success',
    slug: 'ultimate-guide-product-launch-success',
    intro: 'Learn the essential strategies and tactics that separate successful launches from failed ones. This comprehensive guide covers everything from market research to post-launch optimization.',
    body: '',
    publishedDate: '2024-01-15',
    author: 'Sarah Johnson',
    seo: {
      seoTitle: 'The Ultimate Guide to Product Launch Success',
      searchDescription: 'Learn essential strategies for successful product launches.'
    }
  },
  {
    id: 2,
    title: 'Building a Scalable Tech Stack for Modern Startups',
    slug: 'scalable-tech-stack-modern-startups',
    intro: 'Discover the technologies and architectural decisions that will set your startup up for long-term success and rapid scaling.',
    body: '',
    publishedDate: '2024-01-12',
    author: 'Michael Chen',
    seo: {
      seoTitle: 'Building a Scalable Tech Stack for Startups',
      searchDescription: 'Learn about scalable technology choices for startups.'
    }
  },
  {
    id: 3,
    title: 'Marketing Automation: From Setup to Success',
    slug: 'marketing-automation-setup-success',
    intro: 'Automate your marketing efforts effectively with proven strategies and tools that drive engagement and conversions.',
    body: '',
    publishedDate: '2024-01-08',
    author: 'Emily Rodriguez',
    seo: {
      seoTitle: 'Marketing Automation Guide',
      searchDescription: 'Learn marketing automation strategies that work.'
    }
  },
  {
    id: 4,
    title: 'User Experience Design Principles That Convert',
    slug: 'ux-design-principles-convert',
    intro: 'Transform your user interface into a conversion machine with these proven UX design principles and best practices.',
    body: '',
    publishedDate: '2024-01-05',
    author: 'David Kim',
    seo: {
      seoTitle: 'UX Design Principles for Conversion',
      searchDescription: 'Learn UX design principles that increase conversions.'
    }
  }
]

onMounted(() => {
  fetchBlogPosts()
  
  updateSeo({
    title: 'Blog - LaunchLine',
    description: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    ogTitle: 'LaunchLine Blog - Launch Strategy Insights',
    ogDescription: 'Read our latest insights and updates on launch strategies, technology, and business growth.',
    canonical: window.location.origin + '/blog'
  })
})
</script>