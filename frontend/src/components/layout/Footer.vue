<template>
  <footer class="bg-gray-900 border-t border-gray-800">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <span class="text-2xl font-bold text-brand-primary">{{ defaultFooterData.companyName }}</span>
          </div>
          <p class="text-gray-400 text-sm max-w-md mb-2">
            {{ defaultFooterData.description }}
          </p>
          <p class="text-brand-primary text-sm font-semibold italic">{{ defaultFooterData.tagline }}</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link
                :to="link.href"
                class="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact</h3>
          <div class="space-y-2 text-sm">
            <p class="text-gray-400">{{ defaultFooterData.email }}</p>
            <p class="text-gray-400">{{ defaultFooterData.phone }}</p>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-4 mt-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              :aria-label="social.name"
            >
              <span v-html="social.icon" class="w-5 h-5 fill-current"></span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} LaunchLine LLC. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isFeatureEnabled, FEATURE_FLAGS } from '../../config/features'
import { defaultFooterData } from '../../data/footer'

const currentYear = computed(() => new Date().getFullYear())

const baseQuickLinks = defaultFooterData.quickLinks.filter(link => link.name !== 'Blog' && link.name !== 'Contact')
const blogQuickLinks = [{ name: 'Blog', href: '/blog' }]
const contactQuickLinks = [{ name: 'Contact', href: '/contact' }]

// Combine quick links based on feature flags
const quickLinks = computed(() => [
  ...baseQuickLinks,
  ...(isFeatureEnabled(FEATURE_FLAGS.BLOG_PAGES) ? blogQuickLinks : []),
  ...contactQuickLinks,
])

const socialLinks = defaultFooterData.socialLinks
</script>