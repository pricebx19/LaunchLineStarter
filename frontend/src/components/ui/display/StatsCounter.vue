<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
    <div class="stat-counter" v-for="stat in stats" :key="stat.label">
      <div class="text-3xl md:text-4xl font-bold text-brand-primary mb-2">{{ stat.value }}</div>
      <div class="text-gray-400 text-sm uppercase tracking-wider">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

defineProps<{
  stats: Stat[]
}>()
</script>

<style scoped>
/* Stats Counter Animation */
.stat-counter {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stat-counter.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
