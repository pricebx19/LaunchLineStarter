<template>
  <section class="py-8 bg-gradient-to-b from-gray-900 via-black to-gray-800 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 opacity-20">
      <div class="stats-bg-pattern"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">📊 {{ badgeText }}</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {{ description }}
        </p>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="stat-card group"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <div class="stat-content">
            <!-- Animated Counter -->
            <div class="stat-number" :data-target="stat.value">
              {{ animatedValue(stat.value) }}
            </div>
            <div class="stat-suffix">{{ stat.suffix }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
          
          <!-- Background glow -->
          <div class="stat-glow"></div>
        </div>
      </div>
      
      <!-- Bottom text -->
      <div class="text-center mt-16">
        <p class="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {{ bottomText }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CompanyStatsData } from '../../../types'
import { defaultCompanyStats } from '../../../data/companyStats'

const props = withDefaults(defineProps<{
  badgeText?: string
  title?: string
  description?: string
  bottomText?: string
  statsData?: CompanyStatsData['stats']
}>(), {
  badgeText: defaultCompanyStats.badgeText,
  title: defaultCompanyStats.title,
  description: defaultCompanyStats.description,
  bottomText: defaultCompanyStats.bottomText
})

const animatedValues = ref<number[]>([])

const stats = computed(() => props.statsData || defaultCompanyStats.stats)

const animatedValue = (index: number) => {
  return animatedValues.value[index] || 0
}

const animateNumber = (target: number, index: number, duration = 2000) => {
  const start = Date.now()
  const startValue = 0
  
  const animate = () => {
    const now = Date.now()
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart)
    
    if (!animatedValues.value[index]) {
      animatedValues.value[index] = currentValue
    } else {
      animatedValues.value[index] = currentValue
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  animate()
}

onMounted(() => {
  // Initialize animated values
  animatedValues.value = new Array(stats.value.length).fill(0)
  
  // Start animations with delays
  stats.value.forEach((stat: any, index: number) => {
    setTimeout(() => {
      animateNumber(stat.value, index)
    }, index * 200 + 500) // 500ms initial delay
  })
})
</script>

<style scoped>
.stats-bg-pattern {
  background-image: radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%);
  background-size: 400px 400px;
  animation: drift 20s ease-in-out infinite;
}

.stat-card {
  @apply relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-500 overflow-hidden;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.stat-content { @apply relative z-10; }
.stat-number {
  @apply text-4xl md:text-5xl font-bold text-white mb-1;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-suffix { @apply text-2xl md:text-3xl font-bold text-brand-primary inline; }
.stat-label { @apply text-lg font-semibold text-white mb-2; }
.stat-description { @apply text-sm text-gray-400 leading-relaxed; }
.stat-glow { @apply absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl; }

@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes drift { 0%, 100% { transform: translateX(-10px) translateY(-10px); } 50% { transform: translateX(10px) translateY(10px); } }
</style>
