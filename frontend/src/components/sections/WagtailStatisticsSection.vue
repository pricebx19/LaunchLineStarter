<template>
  <section class="wagtail-statistics-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="statisticsData.heading" class="section-heading">
            {{ statisticsData.heading }}
          </h2>
        </div>

        <!-- Statistics Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="(metric, index) in statisticsData.metrics" 
            :key="index"
            class="statistic-card"
          >
            <div class="statistic-value">{{ metric.value }}</div>
            <div class="statistic-label">{{ metric.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Metric {
  value: string
  label: string
}

interface StatisticsData {
  heading?: string
  metrics: Metric[]
}

interface Props {
  statisticsData: StatisticsData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-statistics-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.statistic-card {
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.statistic-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
}

.statistic-value {
  font-size: 3rem;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.statistic-label {
  font-size: 1rem;
  color: #e2e8f0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .statistic-card {
    padding: 1.5rem 0.75rem;
  }
  
  .statistic-value {
    font-size: 2.5rem;
  }
  
  .statistic-label {
    font-size: 0.875rem;
  }
}
</style>
