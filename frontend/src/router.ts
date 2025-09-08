import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { isFeatureEnabled, FEATURE_FLAGS } from './config/features'

// Base routes that are always available
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'LaunchLine LLC - We\'re Taking Off | Your Brand. Your Website. Done Right.',
      description: 'Professional websites that launch your business into the digital stratosphere. From car clubs to show promoters, we build the online presence that drives real results.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: 'About - LaunchLine LLC',
      description: 'Learn more about LaunchLine and our mission to provide professional websites that launch your brand into the digital stratosphere.'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/pages/Services.vue'),
    meta: {
      title: 'Services - LaunchLine LLC',
      description: 'Discover our professional website packages including Starter, Pro, and Elite options designed for your business needs.'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/pages/Portfolio.vue'),
    meta: {
      title: 'Portfolio - LaunchLine LLC',
      description: 'See how LaunchLine has launched businesses into the digital stratosphere.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      title: 'Contact - LaunchLine LLC',
      description: 'Ready to launch your business into the digital stratosphere? Get in touch with LaunchLine for professional websites that drive real results.'
    }
  }
]

// Blog routes (conditionally added based on feature flag)
const blogRoutes: RouteRecordRaw[] = [
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/pages/Blog.vue'),
    meta: {
      title: 'Blog - LaunchLine',
      description: 'Read our latest insights and updates on launch strategies and business solutions.'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/pages/BlogPost.vue'),
    meta: {
      title: 'Blog Post - LaunchLine',
      description: 'Read our latest blog post.'
    }
  }
]

// Combine routes based on feature flags
const routes: RouteRecordRaw[] = [
  ...baseRoutes,
  ...(isFeatureEnabled(FEATURE_FLAGS.BLOG_PAGES) ? blogRoutes : [])
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router