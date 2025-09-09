<template>
  <div v-if="searchQuery && suggestions.length" class="search-suggestions">
    <div class="suggestions-header">
      <span class="suggestions-title">Quick suggestions:</span>
    </div>
    <div class="suggestions-list">
      <button 
        v-for="suggestion in suggestions" 
        :key="suggestion"
        @click="handleSuggestionClick(suggestion)"
        class="suggestion-item"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchProps } from '../../types/Common'

interface Props extends SearchProps {
  searchQuery: string
  suggestions: string[]
}

interface Emits {
  (e: 'suggestion-click', suggestion: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSuggestionClick = (suggestion: string) => {
  emit('suggestion-click', suggestion)
}
</script>

<style scoped>
/* Search Suggestions */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(31, 41, 55, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-top: none;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  z-index: 10;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestions-header {
  margin-bottom: 0.75rem;
}

.suggestions-title {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggestion-item {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .suggestions-list {
    gap: 0.375rem;
  }
  
  .suggestion-item {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .slideDown {
    animation: none !important;
  }
  
  .suggestion-item:hover {
    transform: none !important;
  }
}

/* Focus indicators */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
