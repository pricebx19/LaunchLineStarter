import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'LaunchLine - Professional Launch Solutions',
      description: 'LaunchLine provides professional launch solutions for your business needs.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: 'About - LaunchLine',
      description: 'Learn more about LaunchLine and our mission to provide professional launch solutions.'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/pages/Services.vue'),
    meta: {
      title: 'Services - LaunchLine',
      description: 'Discover our comprehensive range of professional launch services.'
    }
  },
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
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      title: 'Contact - LaunchLine',
      description: 'Get in touch with LaunchLine for your professional launch needs.'
    }
  }
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