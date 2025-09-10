<template>
  <section class="text-block py-16 bg-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="prose prose-lg prose-invert max-w-none">
        <div v-html="content"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  content: string
}

defineProps<Props>()
</script>

<style scoped>
.prose {
  color: #e5e7eb;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #ffffff;
}

.prose p {
  color: #d1d5db;
}

.prose a {
  color: #0ea5e9;
}

.prose a:hover {
  color: #0284c7;
}
</style>
