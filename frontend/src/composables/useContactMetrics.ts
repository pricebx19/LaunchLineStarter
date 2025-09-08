import { ref } from 'vue'

export interface ContactMetric {
  value: string
  label: string
}

export function useContactMetrics() {
  const metrics = ref<ContactMetric[]>([
    { value: '150+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24h', label: 'Response Time' },
    { value: '5★', label: 'Average Rating' }
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
