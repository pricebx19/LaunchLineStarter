<template>
  <div v-if="visible" class="flex justify-center mt-12">
    <button
      v-if="!showAll"
      @click="$emit('show-more')"
      :disabled="loading"
      :class="[
        'group relative inline-flex items-center font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' ? 'px-8 py-4 bg-gradient-to-r from-brand-primary to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-brand-primary shadow-lg hover:shadow-xl' :
        variant === 'secondary' ? 'px-8 py-4 bg-gradient-to-r from-brand-primary/10 to-blue-600/10 border border-brand-primary/30 text-brand-primary rounded-xl hover:from-brand-primary/20 hover:to-blue-600/20 hover:border-brand-primary/50 hover:shadow-brand-primary/20 backdrop-blur-sm' :
        'px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700'
      ]"
    >
      <span v-if="!loading" :class="{ 'mr-2': showIcon }">
        {{ showAllText || `Show ${remainingCount} More ${itemType}${remainingCount !== 1 ? 's' : ''}` }}
      </span>
      <span v-else>{{ loadingText }}</span>
      
      <svg 
        v-if="showIcon && !loading" 
        class="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </button>
    
    <button
      v-else-if="showLessButton"
      @click="$emit('show-less')"
      :class="[
        'group relative inline-flex items-center font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        variant === 'primary' ? 'px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full hover:from-gray-700 hover:to-gray-600' :
        variant === 'secondary' ? 'px-8 py-4 bg-gradient-to-r from-gray-600/10 to-gray-700/10 border border-gray-500/30 text-gray-300 rounded-xl hover:from-gray-600/20 hover:to-gray-700/20 hover:border-gray-400/50 backdrop-blur-sm' :
        'px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700'
      ]"
    >
      <span class="mr-2">{{ showLessText }}</span>
      <svg 
        v-if="showIcon" 
        class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean
  loading?: boolean
  showAll?: boolean
  remainingCount?: number
  itemType?: string
  showAllText?: string
  showLessText?: string
  loadingText?: string
  variant?: 'primary' | 'secondary' | 'minimal'
  showIcon?: boolean
  showLessButton?: boolean
}

withDefaults(defineProps<Props>(), {
  visible: true,
  loading: false,
  showAll: false,
  remainingCount: 0,
  itemType: 'Item',
  showLessText: 'Show Less',
  loadingText: 'Loading...',
  variant: 'primary',
  showIcon: true,
  showLessButton: true
})

defineEmits<{
  'show-more': []
  'show-less': []
  'click': [] // For backward compatibility
}>()
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Enhanced hover effects */
.transform {
  transition: transform 0.3s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>