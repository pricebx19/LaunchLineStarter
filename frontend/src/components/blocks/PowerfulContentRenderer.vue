<template>
  <div class="powerful-content-renderer">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading content...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-message">
        <h3>Content Loading Error</h3>
        <p>{{ error }}</p>
        <button @click="retry" class="retry-button">Retry</button>
      </div>
    </div>

    <!-- Content Blocks -->
    <template v-else>
      <template v-for="(block, index) in processedBlocks" :key="`${block.type}-${block.id || index}`">
        <!-- Dynamic Component Rendering -->
        <component
          :is="getBlockComponent(block.type)"
          v-if="hasValidComponent(block.type)"
          v-bind="getBlockProps(block)"
          :class="getBlockClasses(block)"
          @error="handleBlockError(block, $event)"
        />

        <!-- Fallback for Unknown Blocks -->
        <div
          v-else
          :class="getFallbackClasses(block)"
        >
          <div class="fallback-content">
            <div class="fallback-header">
              <h4 class="fallback-title">
                Unknown Block Type: {{ block.type }}
              </h4>
              <p class="fallback-description">
                No component found for this block type. 
                <button 
                  v-if="showDebugInfo" 
                  @click="toggleBlockDebug(block.id)"
                  class="debug-toggle"
                >
                  {{ isDebugOpen(block.id) ? 'Hide' : 'Show' }} Debug Info
                </button>
              </p>
            </div>
            
            <!-- Debug Information -->
            <div v-if="showDebugInfo && isDebugOpen(block.id)" class="debug-info">
              <div class="debug-section">
                <h5>Block Data:</h5>
                <pre class="debug-json">{{ JSON.stringify(block, null, 2) }}</pre>
              </div>
              
              <div class="debug-section">
                <h5>Available Components:</h5>
                <ul class="debug-list">
                  <li v-for="blockName in availableBlockNames" :key="blockName">
                    {{ blockName }}
                  </li>
                </ul>
              </div>
              
              <div class="debug-section">
                <h5>Registry Stats:</h5>
                <pre class="debug-json">{{ JSON.stringify(registryStats, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>

    <!-- Development Tools -->
    <div v-if="showDevTools" class="dev-tools">
      <div class="dev-tools-header">
        <h4>Content Renderer Debug</h4>
        <button @click="showDebugInfo = !showDebugInfo" class="debug-toggle">
          {{ showDebugInfo ? 'Hide' : 'Show' }} Debug
        </button>
      </div>
      
      <div v-if="showDebugInfo" class="dev-tools-content">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Blocks:</span>
            <span class="stat-value">{{ processedBlocks.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Valid Components:</span>
            <span class="stat-value">{{ validComponentCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Unknown Blocks:</span>
            <span class="stat-value">{{ unknownBlockCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Registry Size:</span>
            <span class="stat-value">{{ registryStats.totalBlocks }}</span>
          </div>
        </div>
        
        <div class="block-breakdown">
          <h5>Block Types:</h5>
          <ul class="block-list">
            <li v-for="block in processedBlocks" :key="block.id" class="block-item">
              <span class="block-type">{{ block.type }}</span>
              <span :class="['block-status', hasValidComponent(block.type) ? 'valid' : 'invalid']">
                {{ hasValidComponent(block.type) ? '✓' : '✗' }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { 
  getBlockMetadata, 
  transformBlockToProps, 
  validateBlockData,
  getBlockComponent,
  getAllBlockNames,
  getRegistryStats,
  type BlockMetadata
} from '../../lib/blocks/block-registry'
import type { ContentBlock } from '../../types'

interface Props {
  content: ContentBlock[]
  showDevTools?: boolean
  enableValidation?: boolean
  enableErrorBoundary?: boolean
  fallbackComponent?: string
  customBlockClasses?: Record<string, string>
  onBlockError?: (block: ContentBlock, error: Error) => void
  onContentError?: (error: Error) => void
}

const props = withDefaults(defineProps<Props>(), {
  showDevTools: false,
  enableValidation: true,
  enableErrorBoundary: true,
  fallbackComponent: 'div',
  customBlockClasses: () => ({}),
  onBlockError: () => {},
  onContentError: () => {}
})

// Reactive state
const isLoading = ref(false)
const error = ref<string | null>(null)
const showDebugInfo = ref(false)
const debugOpenBlocks = ref<Set<string>>(new Set())
const componentCache = ref<Map<string, any>>(new Map())

// Computed properties
const processedBlocks = computed(() => {
  if (!props.content || !Array.isArray(props.content)) {
    return []
  }
  
  return props.content.filter(block => 
    block && 
    block.type && 
    block.value && 
    block.id
  )
})

const availableBlockNames = computed(() => getAllBlockNames())

const registryStats = computed(() => getRegistryStats())

const validComponentCount = computed(() => 
  processedBlocks.value.filter(block => hasValidComponent(block.type)).length
)

const unknownBlockCount = computed(() => 
  processedBlocks.value.filter(block => !hasValidComponent(block.type)).length
)

// Methods
const hasValidComponent = (blockType: string): boolean => {
  return getBlockMetadata(blockType) !== null
}

const getBlockComponent = (blockType: string) => {
  const metadata = getBlockMetadata(blockType)
  if (!metadata) return null

  // Check cache first
  if (componentCache.value.has(blockType)) {
    return componentCache.value.get(blockType)
  }

  // Load component asynchronously
  const component = defineAsyncComponent({
    loader: metadata.component,
    errorComponent: props.fallbackComponent,
    delay: 200,
    timeout: 3000,
    onError(error, retry, fail, attempts) {
      console.error(`Failed to load component for block "${blockType}" (attempt ${attempts}):`, error)
      if (attempts <= 3) {
        retry()
      } else {
        fail()
      }
    }
  })

  // Cache the component
  componentCache.value.set(blockType, component)
  return component
}

const getBlockProps = (block: ContentBlock): Record<string, any> => {
  if (props.enableValidation && !validateBlockData(block.type, block.value)) {
    console.warn(`Block validation failed for "${block.type}":`, block.value)
  }

  return transformBlockToProps(block.type, block.value)
}

const getBlockClasses = (block: ContentBlock): string => {
  const baseClasses = ['content-block', `block-${block.type}`]
  
  // Add custom classes if provided
  if (props.customBlockClasses[block.type]) {
    baseClasses.push(props.customBlockClasses[block.type])
  }

  // Add validation status class
  if (props.enableValidation) {
    const isValid = validateBlockData(block.type, block.value)
    baseClasses.push(isValid ? 'block-valid' : 'block-invalid')
  }

  return baseClasses.join(' ')
}

const getFallbackClasses = (block: ContentBlock): string => {
  return [
    'fallback-block',
    `fallback-${block.type}`,
    'py-8',
    'bg-gray-800',
    'border',
    'border-dashed',
    'border-gray-600',
    'rounded-lg'
  ].join(' ')
}

const handleBlockError = (block: ContentBlock, error: Error) => {
  console.error(`Error in block "${block.type}":`, error)
  props.onBlockError(block, error)
}

const retry = () => {
  error.value = null
  isLoading.value = false
}

const toggleBlockDebug = (blockId: string) => {
  if (debugOpenBlocks.value.has(blockId)) {
    debugOpenBlocks.value.delete(blockId)
  } else {
    debugOpenBlocks.value.add(blockId)
  }
}

const isDebugOpen = (blockId: string): boolean => {
  return debugOpenBlocks.value.has(blockId)
}

// Error boundary
const handleError = (error: Error) => {
  console.error('Content renderer error:', error)
  error.value = error.message
  props.onContentError(error)
}

// Watch for content changes
watch(() => props.content, (newContent) => {
  if (newContent && Array.isArray(newContent)) {
    error.value = null
    isLoading.value = false
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  // Preload common components
  const commonBlocks = ['hero', 'features', 'cta', 'text', 'image']
  commonBlocks.forEach(blockType => {
    if (hasValidComponent(blockType)) {
      getBlockComponent(blockType)
    }
  })
})
</script>

<style scoped>
.powerful-content-renderer {
  width: 100%;
}

/* Loading States */
.loading-container {
  @apply flex flex-col items-center justify-center py-16;
}

.loading-spinner {
  @apply w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4;
}

/* Error States */
.error-container {
  @apply flex items-center justify-center py-16;
}

.error-message {
  @apply text-center max-w-md mx-auto p-6 bg-red-900/20 border border-red-500/30 rounded-lg;
}

.error-message h3 {
  @apply text-xl font-semibold text-red-400 mb-2;
}

.error-message p {
  @apply text-gray-300 mb-4;
}

.retry-button {
  @apply px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors;
}

/* Fallback Styles */
.fallback-content {
  @apply max-w-4xl mx-auto px-4 sm:px-6 lg:px-8;
}

.fallback-header {
  @apply text-center mb-6;
}

.fallback-title {
  @apply text-xl font-semibold text-yellow-400 mb-2;
}

.fallback-description {
  @apply text-gray-300;
}

.debug-toggle {
  @apply ml-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors;
}

/* Debug Information */
.debug-info {
  @apply mt-6 p-4 bg-gray-900 border border-gray-600 rounded-lg;
}

.debug-section {
  @apply mb-4;
}

.debug-section h5 {
  @apply text-sm font-semibold text-blue-400 mb-2;
}

.debug-json {
  @apply text-xs text-gray-400 bg-gray-800 p-3 rounded overflow-auto max-h-40;
}

.debug-list {
  @apply text-sm text-gray-300 space-y-1;
}

/* Development Tools */
.dev-tools {
  @apply fixed bottom-4 right-4 w-80 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-50;
}

.dev-tools-header {
  @apply flex items-center justify-between p-3 border-b border-gray-600;
}

.dev-tools-header h4 {
  @apply text-sm font-semibold text-white;
}

.dev-tools-content {
  @apply p-3 max-h-96 overflow-auto;
}

.stats-grid {
  @apply grid grid-cols-2 gap-2 mb-4;
}

.stat-item {
  @apply flex justify-between text-xs;
}

.stat-label {
  @apply text-gray-400;
}

.stat-value {
  @apply text-white font-semibold;
}

.block-breakdown h5 {
  @apply text-sm font-semibold text-blue-400 mb-2;
}

.block-list {
  @apply space-y-1;
}

.block-item {
  @apply flex items-center justify-between text-xs;
}

.block-type {
  @apply text-gray-300;
}

.block-status {
  @apply font-semibold;
}

.block-status.valid {
  @apply text-green-400;
}

.block-status.invalid {
  @apply text-red-400;
}

/* Content Block Styles */
.content-block {
  @apply w-full;
}

.block-valid {
  @apply border-l-2 border-green-500;
}

.block-invalid {
  @apply border-l-2 border-red-500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dev-tools {
    @apply w-full bottom-0 right-0 rounded-none;
  }
}
</style>
