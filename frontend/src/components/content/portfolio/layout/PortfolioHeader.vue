<template>
  <div class="pt-16 pb-12 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-6">
        <span class="inline-block px-4 py-2 bg-gradient-to-r from-brand-primary/20 to-purple-600/20 rounded-full text-brand-primary text-sm font-medium border border-brand-primary/30 backdrop-blur-sm">
          {{ badge }}
        </span>
      </div>
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {{ title }} <span class="text-transparent bg-gradient-to-r from-brand-primary to-purple-400 bg-clip-text">{{ highlightedText }}</span>
      </h2>
      <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        {{ description }}
        <span class="text-brand-primary font-semibold">{{ highlightedDescription }}</span> 
        {{ descriptionSuffix }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  badge?: string
  title?: string
  highlightedText?: string
  description?: string
  highlightedDescription?: string
  descriptionSuffix?: string
}>(), {
  badge: 'Our Work',
  title: 'Explore Our',
  highlightedText: 'Portfolio',
  description: 'Discover the websites and applications we\'ve crafted for businesses like yours. Each project represents our commitment to delivering',
  highlightedDescription: 'exceptional digital experiences',
  descriptionSuffix: 'that drive growth and engagement.'
})
</script>

<style scoped>
/* Text gradient effects */
.text-transparent {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Glassmorphism Effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
