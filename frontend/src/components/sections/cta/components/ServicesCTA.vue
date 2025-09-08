<template>
  <div class="mt-10 text-center">
    <div class="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-3xl border border-gray-600/50 backdrop-blur-sm max-w-2xl">
      <div class="flex items-center space-x-3">
        <svg class="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
        </svg>
        <h3 class="text-xl font-bold text-white">{{ title }}</h3>
      </div>
      <p class="text-gray-300 text-center">{{ description }}</p>
      <router-link 
        :to="ctaLink" 
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        {{ ctaText }}
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}>(), {
  title: 'Need Multiple Services?',
  description: 'Combine 3+ services and save 15% with our custom package deals. Let\'s build something amazing together.',
  ctaText: 'Get Custom Quote',
  ctaLink: '/contact'
})
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
