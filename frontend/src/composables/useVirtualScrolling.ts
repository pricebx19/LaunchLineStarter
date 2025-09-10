/**
 * Composable for virtual scrolling functionality
 */

import { ref, computed, onMounted, onUnmounted, watch, type Ref } from 'vue'

export interface VirtualScrollingOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
  threshold?: number
}

export interface VirtualScrollingState {
  scrollTop: number
  startIndex: number
  endIndex: number
  visibleItems: any[]
  totalHeight: number
  offsetY: number
}

export function useVirtualScrolling<T = any>(
  items: Ref<T[]>,
  options: VirtualScrollingOptions
) {
  const {
    itemHeight,
    containerHeight,
    overscan = 5,
    threshold = 0.1
  } = options

  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement>()

  // Computed properties
  const totalHeight = computed(() => items.value.length * itemHeight)

  const startIndex = computed(() => {
    const index = Math.floor(scrollTop.value / itemHeight)
    return Math.max(0, index - overscan)
  })

  const endIndex = computed(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const index = startIndex.value + visibleCount + overscan * 2
    return Math.min(items.value.length - 1, index)
  })

  const visibleItems = computed(() => {
    return items.value.slice(startIndex.value, endIndex.value + 1)
  })

  const visibleHeight = computed(() => {
    return visibleItems.value.length * itemHeight
  })

  const offsetY = computed(() => {
    return startIndex.value * itemHeight
  })

  const isScrolledToBottom = computed(() => {
    if (!containerRef.value) return false
    const scrollPercentage = (scrollTop.value + containerHeight) / totalHeight.value
    return scrollPercentage >= 1 - threshold
  })

  const isScrolledToTop = computed(() => {
    return scrollTop.value <= 0
  })

  // Methods
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.value) return
    
    const targetScrollTop = index * itemHeight
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

  const getItemPosition = (index: number) => {
    return {
      top: index * itemHeight,
      height: itemHeight
    }
  }

  // Resize observer
  let resizeObserver: ResizeObserver | null = null
  const currentContainerHeight = ref(containerHeight)

  const setupResizeObserver = () => {
    if (!containerRef.value) return
    
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        currentContainerHeight.value = entry.contentRect.height
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
    setupResizeObserver()
  })

  onUnmounted(() => {
    cleanupResizeObserver()
  })

  // Watch for container height changes
  watch(() => containerHeight, (newHeight) => {
    currentContainerHeight.value = newHeight
  })

  // State object
  const state = computed<VirtualScrollingState>(() => ({
    scrollTop: scrollTop.value,
    startIndex: startIndex.value,
    endIndex: endIndex.value,
    visibleItems: visibleItems.value,
    totalHeight: totalHeight.value,
    offsetY: offsetY.value
  }))

  return {
    // Refs
    containerRef,
    scrollTop,
    
    // Computed
    totalHeight,
    startIndex,
    endIndex,
    visibleItems,
    visibleHeight,
    offsetY,
    isScrolledToBottom,
    isScrolledToTop,
    state,
    
    // Methods
    handleScroll,
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
    getVisibleRange,
    isItemVisible,
    getItemPosition,
    
    // Lifecycle
    setupResizeObserver,
    cleanupResizeObserver
  }
}

// Utility function for creating virtual scrolling with dynamic item heights
export function useDynamicVirtualScrolling<T = any>(
  items: Ref<T[]>,
  options: Omit<VirtualScrollingOptions, 'itemHeight'> & {
    getItemHeight: (item: T, index: number) => number
    estimatedItemHeight?: number
  }
) {
  const {
    containerHeight,
    overscan = 5,
    threshold: _threshold = 0.1,
    getItemHeight,
    estimatedItemHeight: _estimatedItemHeight = 50
  } = options

  const scrollTop = ref(0)
  const containerRef = ref<HTMLElement>()
  const itemHeights = ref<number[]>([])
  const itemPositions = ref<number[]>([])

  // Initialize item heights and positions
  const initializeHeights = () => {
    const heights: number[] = []
    const positions: number[] = []
    let currentPosition = 0

    items.value.forEach((item, index) => {
      const height = getItemHeight(item, index)
      heights[index] = height
      positions[index] = currentPosition
      currentPosition += height
    })

    itemHeights.value = heights
    itemPositions.value = positions
  }

  // Computed properties
  const totalHeight = computed(() => {
    if (itemPositions.value.length === 0) return 0
    const lastIndex = itemPositions.value.length - 1
    return itemPositions.value[lastIndex]! + (itemHeights.value[lastIndex] || 0)
  })

  const startIndex = computed(() => {
    if (itemPositions.value.length === 0) return 0
    
    // Binary search for start index
    let left = 0
    let right = itemPositions.value.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const position = itemPositions.value[mid]
      
      if (position! <= scrollTop.value) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    
    return Math.max(0, right - overscan)
  })

  const endIndex = computed(() => {
    if (itemPositions.value.length === 0) return 0
    
    const visibleHeight = containerHeight
    const startPos = itemPositions.value[startIndex.value] || 0
    const targetPos = startPos + visibleHeight
    
    // Find end index
    let left = startIndex.value
    let right = itemPositions.value.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const position = itemPositions.value[mid]
      
      if (position! <= targetPos) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    
    return Math.min(items.value.length - 1, right + overscan)
  })

  const visibleItems = computed(() => {
    return items.value.slice(startIndex.value, endIndex.value + 1)
  })

  const offsetY = computed(() => {
    return itemPositions.value[startIndex.value] || 0
  })

  // Methods
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.value || !itemPositions.value[index]) return
    
    const targetScrollTop = itemPositions.value[index]
    containerRef.value.scrollTo({
      top: targetScrollTop || 0,
      behavior
    })
  }

  const updateItemHeight = (index: number, height: number) => {
    if (itemHeights.value[index] !== height) {
      itemHeights.value[index] = height
      initializeHeights() // Recalculate positions
    }
  }

  // Initialize on mount and when items change
  onMounted(() => {
    initializeHeights()
  })

  watch(items, () => {
    initializeHeights()
  }, { deep: true })

  return {
    // Refs
    containerRef,
    scrollTop,
    itemHeights,
    itemPositions,
    
    // Computed
    totalHeight,
    startIndex,
    endIndex,
    visibleItems,
    offsetY,
    
    // Methods
    handleScroll,
    scrollToIndex,
    updateItemHeight,
    initializeHeights
  }
}
