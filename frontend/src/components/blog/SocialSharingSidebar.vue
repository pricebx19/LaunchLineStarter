<template>
  <transition name="slide-in">
    <div 
      v-if="show"
      class="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-3"
    >
      <button 
        v-for="social in socialLinks" 
        :key="social.name"
        @click="handleShare(social.name)"
        :class="social.class"
        class="p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg social-share-button"
        :title="`Share on ${social.name}`"
      >
        <svg class="w-5 h-5" fill="currentColor" :viewBox="social.viewBox">
          <path :d="social.path"/>
        </svg>
      </button>
      
      <!-- Copy Link Button -->
      <button 
        @click="handleCopyLink"
        class="p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg social-share-button"
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
import type { SocialLink } from '../../composables/useSocialSharing'

interface Props {
  show: boolean
  socialLinks: SocialLink[]
}

interface Emits {
  (e: 'share', platform: string): void
  (e: 'copy-link'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleShare = (platform: string) => {
  emit('share', platform)
}

const handleCopyLink = () => {
  emit('copy-link')
}
</script>

<style scoped>
/* Social sharing buttons */
.social-share-button {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.social-share-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.social-share-button:hover::before {
  transform: translateX(100%);
}

/* Enhanced slide-in animations */
.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(20px) translateY(-50%);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateX(20px) translateY(-50%);
}

/* Mobile optimizations */
@media (max-width: 1024px) {
  .social-share {
    display: none !important;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .slide-in-enter-active,
  .slide-in-leave-active,
  .social-share-button {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .social-share-button {
    border: 2px solid white;
    background: black;
  }
}
</style>
