<template>
  <div class="glass-card p-8 mb-8">
    <h2 class="section-title text-3xl font-bold text-white mb-6">
      {{ title }}
      <span class="title-accent"></span>
    </h2>
    <p class="text-gray-300 text-lg leading-relaxed mb-8">
      {{ description }}
    </p>

    <!-- Interactive Contact Methods -->
    <div class="space-y-6 mb-8">
      <div 
        v-for="method in contactMethods" 
        :key="method.title" 
        class="contact-method-enhanced" 
        @click="handleContactClick(method)"
      >
        <div class="method-icon">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.iconPath"/>
          </svg>
        </div>
        <div class="method-content">
          <h3 class="method-title">{{ method.title }}</h3>
          <p class="method-value">{{ method.value }}</p>
          <span class="method-action">{{ method.action }}</span>
        </div>
        <div class="method-arrow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Social Media Links -->
    <SocialLinksSection :social-links="socialLinks" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const SocialLinksSection = defineAsyncComponent(() => import('./SocialLinksSection.vue'))

interface ContactMethod {
  title: string
  value: string
  action: string
  iconPath: string
  type: 'email' | 'phone' | 'location'
}

interface SocialLink {
  name: string
  url: string
  iconPath: string
}

withDefaults(defineProps<{
  title?: string
  description?: string
  contactMethods?: ContactMethod[]
  socialLinks?: SocialLink[]
}>(), {
  title: 'Get In Touch',
  description: 'We\'re passionate about creating digital experiences that drive results. Whether you\'re a startup with a bold vision or an established business ready to innovate, let\'s collaborate to bring your ideas to life.'
})

const emit = defineEmits<{
  'contact-click': [method: ContactMethod]
}>()

const handleContactClick = (method: ContactMethod) => {
  emit('contact-click', method)
  
  // Handle different contact types
  switch (method.type) {
    case 'email':
      window.location.href = `mailto:${method.value}`
      break
    case 'phone':
      window.location.href = `tel:${method.value}`
      break
    case 'location':
      // Could open maps or location modal
      break
  }
}
</script>

<style scoped>
.glass-card {
  @apply bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl;
}

.section-title {
  @apply relative;
}

.title-accent {
  @apply absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full;
}

.contact-method-enhanced {
  @apply flex items-center p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-brand-primary/50 hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-blue-600/10 transition-all duration-300 cursor-pointer group;
}

.method-icon {
  @apply w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-primary mr-4 group-hover:scale-110 transition-transform;
}

.method-content {
  @apply flex-1;
}

.method-title {
  @apply text-white font-semibold text-lg mb-1;
}

.method-value {
  @apply text-gray-300 text-sm mb-1;
}

.method-action {
  @apply text-brand-primary text-xs font-medium uppercase tracking-wide;
}

.method-arrow {
  @apply text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all;
}
</style>
