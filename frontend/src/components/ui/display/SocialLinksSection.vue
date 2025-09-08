<template>
  <div class="social-section">
    <h3 class="text-white font-semibold mb-4">{{ title }}</h3>
    <div class="flex space-x-4">
      <a 
        v-for="social in socialLinks" 
        :key="social.name" 
        :href="social.url" 
        class="social-link"
        :title="social.name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path :d="social.iconPath"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string
  url: string
  iconPath: string
}

withDefaults(defineProps<{
  title?: string
  socialLinks?: SocialLink[]
}>(), {
  title: 'Follow Our Journey'
})
</script>

<style scoped>
.social-section {
  @apply border-t border-white/10 pt-6;
}

.social-link {
  @apply w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-brand-primary hover:bg-gradient-to-br hover:from-brand-primary/20 hover:to-blue-600/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg;
}
</style>
