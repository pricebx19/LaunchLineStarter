<template>
  <div class="testimonial-section" v-if="testimonial">
    <div class="testimonial-content">
      <div class="quote-icon">💬</div>
      <blockquote class="testimonial-text">
        "{{ testimonial }}"
      </blockquote>
      <div class="testimonial-author" v-if="client">
        — {{ client }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  testimonial?: string
  client?: string
}>()
</script>

<style scoped>
.testimonial-section {
  margin-bottom: 1.5rem;
}

.testimonial-content {
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 0.75rem;
  padding: 1rem;
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  background: rgba(17, 24, 39, 0.9);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.testimonial-text {
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0.5rem 0 0.75rem 0;
  font-style: italic;
}

.testimonial-author {
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 500;
  text-align: right;
}
</style>
