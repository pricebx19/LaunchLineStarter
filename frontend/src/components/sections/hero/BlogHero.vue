<template>
  <section class="hero-section relative py-16 bg-gradient-to-br from-gray-900 via-black to-black overflow-hidden">
    <!-- Animated Starry Background -->
    <div class="stars-container absolute inset-0">
      <!-- Large stars -->
      <div class="star star-large" v-for="i in 12" :key="`large-${i}`" :style="getStarStyle(i, 'large')"></div>
      <!-- Medium stars -->
      <div class="star star-medium" v-for="i in 25" :key="`medium-${i}`" :style="getStarStyle(i, 'medium')"></div>
      <!-- Small stars -->
      <div class="star star-small" v-for="i in 35" :key="`small-${i}`" :style="getStarStyle(i, 'small')"></div>
      <!-- Shooting stars -->
      <div class="shooting-star" v-for="i in 2" :key="`shooting-${i}`" :style="getShootingStarStyle(i)"></div>
    </div>

    <div class="text-center text-white max-w-4xl mx-auto px-6 relative z-10">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>
      <p class="text-xl text-gray-300 leading-relaxed mb-4">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </p>
      <p class="text-lg text-brand-primary font-semibold italic">
        <slot name="tagline">
          {{ tagline }}
        </slot>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  tagline?: string
}

withDefaults(defineProps<Props>(), {
  title: 'LaunchLine LLC Blog',
  subtitle: 'Web development insights, software engineering strategies, and tips for businesses. Learn how to launch your brand into the digital stratosphere.',
  tagline: 'We\'re taking off.'
})

// Generate random star positions
const getStarStyle = (index: number, size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Generate shooting star positions
const getShootingStarStyle = (index: number) => {
  const startX = Math.random() * 100
  const startY = Math.random() * 50
  const delay = Math.random() * 8
  
  return {
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`
  }
}

defineOptions({
  name: 'BlogHero'
})
</script>

<style scoped>
/* Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-large {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
}

.star-medium {
  width: 2px;
  height: 2px;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.6);
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Shooting Star */
.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, white, transparent);
  border-radius: 50%;
  animation: shooting-star 8s linear infinite;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, white, transparent);
  transform: translateX(-100px);
}

/* Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes shooting-star {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
    transform: translateX(100px) translateY(100px) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translateX(200px) translateY(200px) rotate(45deg);
  }
}

/* Text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Hero section specific styles */
.hero-section {
  position: relative;
  overflow: hidden;
}
</style>
