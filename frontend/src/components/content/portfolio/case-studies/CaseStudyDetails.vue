<template>
  <div class="details-section">
    <div class="detail-item">
      <span class="detail-label">Package:</span>
      <span class="detail-value package-value">{{ projectPackage }}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Timeline:</span>
      <span class="detail-value timeline-value">{{ timeline }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  projectPackage: string
  timeline: string
}>()
</script>

<style scoped>
.details-section {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
}

.package-value {
  color: #10b981;
}

.timeline-value {
  color: #f59e0b;
}
</style>
