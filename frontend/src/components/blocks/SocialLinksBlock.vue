<template>
  <section class="social-links-block py-16 bg-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="title" class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white mb-4">{{ title }}</h2>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          :title="link.name"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link group"
        >
          <div class="social-icon">
            <div v-html="link.icon"></div>
          </div>
          <span class="social-name">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string
  url: string
  icon: string
}

interface Props {
  title?: string
  socialLinks: SocialLink[]
}

defineProps<Props>()
</script>

<style scoped>
.social-link {
  @apply flex flex-col items-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300 group-hover:bg-gray-800/50;
}

.social-icon {
  @apply w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-400 transition-colors;
}

.social-icon :deep(svg) {
  @apply w-full h-full;
}

.social-name {
  @apply text-sm text-gray-300 group-hover:text-white transition-colors;
}
</style>
