<template>
  <section class="wagtail-blog-posts">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="section-heading">Latest Blog Posts</h2>
          <p class="section-subheading">
            Discover insights, strategies, and updates from our team
          </p>
        </div>

        <!-- Blog Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.id"
            class="blog-post-card"
          >
            <!-- Featured Image -->
            <div v-if="post.featured_image" class="post-image">
              <img 
                :src="post.featured_image" 
                :alt="post.title"
                class="post-img"
              />
            </div>
            
            <!-- Post Content -->
            <div class="post-content">
              <!-- Post Meta -->
              <div class="post-meta">
                <time class="post-date">{{ formatDate(post.date) }}</time>
              </div>
              
              <!-- Post Title -->
              <h3 class="post-title">
                <a :href="post.url" class="post-link">
                  {{ post.title }}
                </a>
              </h3>
              
              <!-- Post Intro -->
              <p class="post-intro">{{ post.intro }}</p>
              
              <!-- Read More Link -->
              <div class="post-actions">
                <a :href="post.url" class="read-more-link">
                  Read More
                  <svg class="read-more-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- No Posts Message -->
        <div v-if="blogPosts.length === 0" class="no-posts">
          <div class="no-posts-content">
            <svg class="no-posts-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
            <h3>No blog posts yet</h3>
            <p>Check back soon for new content!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

interface BlogPost {
  id: number
  title: string
  slug: string
  intro: string
  date: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  url: string
}

interface Props {
  blogPosts: BlogPost[]
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.wagtail-blog-posts {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-subheading {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 3xl;
  margin: 0 auto;
}

.blog-post-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.blog-post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.post-image {
  width: 100%;
  height: 12rem;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-post-card:hover .post-img {
  transform: scale(1.05);
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  margin-bottom: 1rem;
}

.post-date {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.post-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-link:hover {
  color: #3b82f6;
}

.post-intro {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-actions {
  margin-top: auto;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.read-more-link:hover {
  color: #2563eb;
  transform: translateX(2px);
}

.read-more-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.read-more-link:hover .read-more-icon {
  transform: translateX(2px);
}

.no-posts {
  text-align: center;
  padding: 4rem 2rem;
}

.no-posts-content {
  max-width: 20rem;
  margin: 0 auto;
}

.no-posts-icon {
  width: 4rem;
  height: 4rem;
  color: #cbd5e1;
  margin: 0 auto 1rem;
}

.no-posts h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.no-posts p {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .blog-post-card {
    margin-bottom: 1rem;
  }
  
  .post-content {
    padding: 1.25rem;
  }
  
  .post-title {
    font-size: 1.125rem;
  }
}
</style>
