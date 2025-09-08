<template>
  <div class="values-summary mt-24 text-center" ref="summaryRef">
    <div class="summary-card">
      <div class="summary-header">
        <h3 class="summary-title">The LaunchLine Promise</h3>
        <div class="summary-subtitle">Where Values Meet Innovation</div>
      </div>
      
      <div class="summary-stats">
        <div class="stat-group">
          <div class="stat-item" v-for="stat in statistics" :key="stat.label">
            <div class="stat-number-wrapper">
              <span class="stat-number" :data-target="stat.target">{{ stat.current }}</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
      
      <p class="summary-description">
        Every line of code, every design decision, every client interaction is guided by these four fundamental values.
        Together, they form the constellation that lights our path to digital excellence.
      </p>
      
      <div class="summary-cta">
        <router-link to="/contact" class="cta-button">
          <span>Experience Our Values</span>
          <div class="cta-arrow">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Statistic {
  target: string | number
  current: string | number
  suffix: string
  label: string
}

defineOptions({
  name: 'AnimatedStatistics'
})

const summaryRef = ref<HTMLElement>()

const statistics = ref<Statistic[]>([
  {
    target: 100,
    current: 0,
    suffix: '%',
    label: 'Value-Driven Decisions'
  },
  {
    target: 4,
    current: 0,
    suffix: '+',
    label: 'Core Principles'
  },
  {
    target: '∞',
    current: 0,
    suffix: '',
    label: 'Possibilities Unlocked'
  }
])

// Animate statistics numbers
const animateNumbers = () => {
  statistics.value.forEach((stat, index) => {
    const duration = 2000 // 2 seconds
    
    if (stat.target === '∞') {
      // Special animation for infinity symbol
      const symbols = ['0', '∞', '♦', '✦', '∞']
      let currentIndex = 0
      
      const infinityTimer = setInterval(() => {
        stat.current = symbols[currentIndex]
        currentIndex = (currentIndex + 1) % symbols.length
        
        if (currentIndex === 0) {
          setTimeout(() => {
            stat.current = '∞'
            clearInterval(infinityTimer)
          }, 500)
        }
      }, 200)
    } else {
      const targetNum = typeof stat.target === 'number' ? stat.target : parseInt(stat.target.toString())
      const increment = targetNum / (duration / 16) // 60fps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= targetNum) {
          current = targetNum
          clearInterval(timer)
        }
        stat.current = Math.floor(current)
      }, 16)
    }
  })
}

onMounted(() => {
  if (summaryRef.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers()
          
          // Add staggered animation to stat items
          const statItems = summaryRef.value?.querySelectorAll('.stat-item')
          statItems?.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in')
            }, index * 200)
          })
          
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    
    observer.observe(summaryRef.value)
  }
})
</script>

<script lang="ts">
export default {
  name: 'AnimatedStatistics'
}
</script>

<style scoped>
/* Values Summary */
.values-summary {
  margin-top: 6rem;
}

.summary-card {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 24px;
  padding: 48px 32px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.1);
}

.summary-header {
  margin-bottom: 32px;
}

.summary-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.summary-subtitle {
  font-size: 1.125rem;
  color: #0EA5E9;
  font-weight: 500;
}

.summary-stats {
  margin-bottom: 32px;
}

.stat-group {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.stat-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.stat-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-number-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #0EA5E9;
  line-height: 1;
}

.stat-suffix {
  font-size: 1.5rem;
  color: #8B5CF6;
  margin-left: 4px;
}

@media (min-width: 768px) {
  .stat-number {
    font-size: 3.75rem;
  }
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-top: 8px;
}

.summary-description {
  font-size: 1.125rem;
  color: #D1D5DB;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 32px;
}

.summary-cta {
  margin-top: 24px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background: linear-gradient(135deg, #0EA5E9, #8B5CF6);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -5px rgba(14, 165, 233, 0.4);
}

.cta-arrow {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-arrow {
  transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .stat-group {
    gap: 24px;
  }
  
  .summary-card {
    padding: 32px 24px;
  }
}

@media (max-width: 640px) {
  .stat-group {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
