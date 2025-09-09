import { ref } from 'vue'
import type { ContactMetric } from '../types'

export function useContactMetrics() {
  const metrics = ref<ContactMetric[]>([
    { value: '150+', label: 'Projects Completed', description: 'Successfully delivered projects' },
    { value: '98%', label: 'Client Satisfaction', description: 'Happy clients rate our service' },
    { value: '24h', label: 'Response Time', description: 'Average response to inquiries' },
    { value: '5★', label: 'Average Rating', description: 'Client feedback rating' }
  ])

  const addMetric = (metric: ContactMetric) => {
    metrics.value.push(metric)
  }

  const removeMetric = (index: number) => {
    metrics.value.splice(index, 1)
  }

  const updateMetric = (index: number, metric: ContactMetric) => {
    metrics.value[index] = metric
  }

  return {
    metrics,
    addMetric,
    removeMetric,
    updateMetric
  }
}
