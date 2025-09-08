<template>
  <div class="hero-entrance">
    <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
      {{ title }}
      <span class="text-gradient bg-gradient-to-r from-brand-primary via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
        {{ highlightedText }}
      </span>
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
      {{ description }}
      <span class="text-brand-primary font-semibold">{{ highlightedDescription }}</span>. 
      {{ descriptionSuffix }}
      <span class="text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{{ highlightedSuffix }}</span>.
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  highlightedText?: string
  description?: string
  highlightedDescription?: string
  descriptionSuffix?: string
  highlightedSuffix?: string
}>(), {
  title: 'Our',
  highlightedText: 'Portfolio',
  description: 'See how we\'ve launched businesses into the',
  highlightedDescription: 'digital stratosphere',
  descriptionSuffix: 'From innovative startups to enterprise solutions, discover the web applications that drive',
  highlightedSuffix: 'real results'
})
</script>

<style scoped>
/* Gradient Animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

/* Hero Entrance Animation */
.hero-entrance {
  opacity: 0;
  transform: translateY(50px);
  animation: heroEntrance 1.5s ease-out forwards;
}

@keyframes heroEntrance {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Text gradient effects */
.text-gradient {
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-x 3s ease infinite;
}
</style>
