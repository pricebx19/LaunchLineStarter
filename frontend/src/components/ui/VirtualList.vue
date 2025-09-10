<template>
  <div
    ref="containerRef"
    class="virtual-list"
    :style="{ height: containerHeight + 'px' }"
    @scroll="handleScroll"
  >
    <div
      class="virtual-list__spacer"
      :style="{ height: totalHeight + 'px' }"
    >
      <div
        class="virtual-list__items"
        :style="{
          transform: `translateY(${offsetY}px)`,
          height: visibleHeight + 'px'
        }"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="getItemKey?.(item, startIndex + index) || index"
          class="virtual-list__item"
          :style="{ height: itemHeight + 'px' }"
        >
          <slot
            :item="item"
            :index="startIndex + index"
            :is-visible="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

export interface VirtualListProps<T = any> {
  items: T[]
  itemHeight: number
  containerHeight: number
  overscan?: number
  getItemKey?: (item: T, index: number) => string | number
  threshold?: number
}

export interface VirtualListEmits {
  (e: 'scroll', event: Event): void
  (e: 'scroll-end'): void
  (e: 'visible-range-change', range: { start: number; end: number }): void
}

const props = withDefaults(defineProps<VirtualListProps>(), {
  overscan: 5,
  getItemKey: (_item: any, index: number) => index,
  threshold: 0.1
})

const emit = defineEmits<VirtualListEmits>()

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)
const containerHeight = ref(props.containerHeight)

// Computed properties
const totalHeight = computed(() => props.items.length * props.itemHeight)

const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / props.itemHeight)
  return Math.max(0, index - props.overscan)
})

const endIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight.value / props.itemHeight)
  const index = startIndex.value + visibleCount + props.overscan * 2
  return Math.min(props.items.length - 1, index)
})

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value + 1)
})

const visibleHeight = computed(() => {
  return visibleItems.value.length * props.itemHeight
})

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

// Methods
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
  
  emit('scroll', event)
  
  // Check if scrolled to bottom
  const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight
  if (scrollPercentage >= 1 - props.threshold) {
    emit('scroll-end')
  }
  
  // Emit visible range change
  emit('visible-range-change', {
    start: startIndex.value,
    end: endIndex.value
  })
}

const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
  if (!containerRef.value) return
  
  const targetScrollTop = index * props.itemHeight
  containerRef.value.scrollTo({
    top: targetScrollTop,
    behavior
  })
}

const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  scrollToIndex(0, behavior)
}

const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
  if (!containerRef.value) return
  
  containerRef.value.scrollTo({
    top: totalHeight.value,
    behavior
  })
}

const getVisibleRange = () => ({
  start: startIndex.value,
  end: endIndex.value
})

const isItemVisible = (index: number) => {
  return index >= startIndex.value && index <= endIndex.value
}

// Resize observer
let resizeObserver: ResizeObserver | null = null

const setupResizeObserver = () => {
  if (!containerRef.value) return
  
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      containerHeight.value = entry.contentRect.height
    }
  })
  
  resizeObserver.observe(containerRef.value)
}

const cleanupResizeObserver = () => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    setupResizeObserver()
  })
})

onUnmounted(() => {
  cleanupResizeObserver()
})

// Watch for container height changes
watch(() => props.containerHeight, (newHeight) => {
  containerHeight.value = newHeight
})

// Expose methods
defineExpose({
  scrollToIndex,
  scrollToTop,
  scrollToBottom,
  getVisibleRange,
  isItemVisible,
  containerRef
})
</script>

<style scoped>
.virtual-list {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.virtual-list__spacer {
  position: relative;
}

.virtual-list__items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list__item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

/* Custom scrollbar */
.virtual-list::-webkit-scrollbar {
  width: 8px;
}

.virtual-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  .virtual-list::-webkit-scrollbar-track {
    background: #2d2d2d;
  }
  
  .virtual-list::-webkit-scrollbar-thumb {
    background: #555;
  }
  
  .virtual-list::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
}
</style>
