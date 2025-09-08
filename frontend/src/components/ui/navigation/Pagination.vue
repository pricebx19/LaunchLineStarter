<template>
  <div v-if="pagination && (pagination.previous || pagination.next)" class="flex justify-center items-center space-x-4 pt-8">
    <button 
      v-if="pagination.previous"
      @click="$emit('changePage', currentPage - 1)"
      class="btn-secondary hover:scale-105 transition-transform duration-300"
      :disabled="loading"
    >
      {{ previousText }}
    </button>
    
    <span class="text-gray-400">
      {{ pageText }} {{ currentPage }}
    </span>
    
    <button 
      v-if="pagination.next"
      @click="$emit('changePage', currentPage + 1)"
      class="btn-secondary hover:scale-105 transition-transform duration-300"
      :disabled="loading"
    >
      {{ nextText }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Pagination {
  next: string | null
  previous: string | null
  count: number
}

interface Props {
  pagination: Pagination | null
  currentPage: number
  loading?: boolean
  previousText?: string
  nextText?: string
  pageText?: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  previousText: '← Previous',
  nextText: 'Next →',
  pageText: 'Page'
})

defineEmits<{
  changePage: [page: number]
}>()

defineOptions({
  name: 'Pagination'
})
</script>

<style scoped>
/* Button hover effects */
.btn-secondary:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.3);
}

/* Disabled state */
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary:disabled:hover {
  transform: none;
  box-shadow: none;
}
</style>
