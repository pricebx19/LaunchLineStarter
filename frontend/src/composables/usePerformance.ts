/**
 * Performance monitoring composable
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface PerformanceMetrics {
  renderTime: number
  memoryUsage: number
  bundleSize: number
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
}

export function usePerformance() {
  const metrics = ref<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  })

  const isMonitoring = ref(false)
  const performanceObserver = ref<PerformanceObserver | null>(null)
  let memoryInterval: NodeJS.Timeout | null = null

  // Computed properties
  const performanceScore = computed(() => {
    const { renderTime, memoryUsage, loadTime } = metrics.value
    let score = 100

    // Deduct points for poor performance
    if (renderTime > 16) score -= 20 // 60fps threshold
    if (memoryUsage > 100) score -= 15 // 100MB threshold
    if (loadTime > 3000) score -= 25 // 3s threshold

    return Math.max(0, score)
  })

  const performanceGrade = computed(() => {
    const score = performanceScore.value
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  })

  // Methods
  const startMonitoring = () => {
    if (isMonitoring.value) return

    isMonitoring.value = true

    // Monitor performance entries
    if ('PerformanceObserver' in window) {
      performanceObserver.value = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              metrics.value.firstContentfulPaint = entry.startTime
            }
          } else if (entry.entryType === 'largest-contentful-paint') {
            metrics.value.largestContentfulPaint = entry.startTime
          } else if (entry.entryType === 'layout-shift') {
            metrics.value.cumulativeLayoutShift += (entry as any).value
          }
        })
      })

      performanceObserver.value.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] 
      })
    }

    // Monitor memory usage
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        const memory = (performance as any).memory
        metrics.value.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
      }

      updateMemoryUsage()
      memoryInterval = setInterval(updateMemoryUsage, 5000)
    }
  }

  const stopMonitoring = () => {
    isMonitoring.value = false
    
    if (performanceObserver.value) {
      performanceObserver.value.disconnect()
      performanceObserver.value = null
    }
    
    if (memoryInterval) {
      clearInterval(memoryInterval)
      memoryInterval = null
    }
  }

  const updatePerformanceMetrics = () => {
    // Measure render time
    const start = performance.now()
    requestAnimationFrame(() => {
      const end = performance.now()
      metrics.value.renderTime = end - start
    })

    // Get load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      metrics.value.loadTime = loadTime
    }

    // Estimate bundle size (this is a rough estimate)
    const scripts = document.querySelectorAll('script[src]')
    let totalSize = 0
    scripts.forEach(script => {
      const src = script.getAttribute('src')
      if (src && !src.includes('node_modules')) {
        // Rough estimate based on common bundle sizes
        totalSize += 50 // KB
      }
    })
    metrics.value.bundleSize = totalSize
  }

  const getPerformanceReport = () => {
    return {
      metrics: metrics.value,
      score: performanceScore.value,
      grade: performanceGrade.value,
      recommendations: getPerformanceRecommendations()
    }
  }

  const getPerformanceRecommendations = () => {
    const recommendations: string[] = []
    const { renderTime, memoryUsage, loadTime, bundleSize } = metrics.value

    if (renderTime > 16) {
      recommendations.push('Consider optimizing component rendering performance')
    }
    if (memoryUsage > 100) {
      recommendations.push('Memory usage is high, check for memory leaks')
    }
    if (loadTime > 3000) {
      recommendations.push('Page load time is slow, consider code splitting')
    }
    if (bundleSize > 500) {
      recommendations.push('Bundle size is large, consider tree shaking and lazy loading')
    }

    return recommendations
  }

  // Auto-start monitoring in development
  onMounted(() => {
    if (import.meta.env.DEV) {
      startMonitoring()
      updatePerformanceMetrics()
    }
  })

  onUnmounted(() => {
    stopMonitoring()
  })

  return {
    // State
    metrics,
    isMonitoring,
    
    // Computed
    performanceScore,
    performanceGrade,
    
    // Methods
    startMonitoring,
    stopMonitoring,
    updatePerformanceMetrics,
    getPerformanceReport,
    getPerformanceRecommendations
  }
}