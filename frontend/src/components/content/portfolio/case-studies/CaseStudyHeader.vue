<template>
  <div class="card-header">
    <div class="icon-wrapper">
      <div class="case-icon">{{ icon }}</div>
    </div>
    <div class="header-content">
      <h3 class="case-title">{{ title }}</h3>
      <p class="case-business">{{ business }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  business: string
}>()
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-wrapper {
  flex-shrink: 0;
}

.case-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3b82f6;
}

.header-content {
  flex: 1;
  min-width: 0;
}

.case-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.case-business {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
  line-height: 1.4;
}
</style>
