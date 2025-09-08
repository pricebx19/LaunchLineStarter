<template>
  <div class="blog-post-page">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed - this is a layout wrapper
</script>

<style scoped>
/* Improve the overall page layout */
.blog-post-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}
</style>
