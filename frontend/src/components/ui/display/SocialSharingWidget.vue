<template>
  <transition name="slide-in">
    <div 
      v-if="props.visible"
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SocialSharingWidgetProps } from '../../../types/SocialSharing'
import { defaultSocialLinks } from '../../../data/socialLinks'

interface Props extends SocialSharingWidgetProps {}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  url: window.location.href,
  title: 'Check out this article',
  description: 'An interesting read from LaunchLine'
})

const emit = defineEmits<{
  'share': [platform: string, url: string]
  'copy-link': [url: string]
}>()

const socialLinks = computed(() => defaultSocialLinks)

const shareOn = (platform: string) => {
  const url = encodeURIComponent(props.url)
  const title = encodeURIComponent(props.title)

  let shareUrl = ''

  switch (platform) {
    case 'Twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
      break
    case 'Facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case 'LinkedIn':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
    emit('share', platform, props.url)
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.url)
    emit('copy-link', props.url)
    // You could show a toast notification here
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(-50%);
}
</style>
