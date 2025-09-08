import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileDetection() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const screenWidth = ref(0)

  const updateScreenInfo = () => {
    screenWidth.value = window.innerWidth
    
    // Mobile: < 768px
    // Tablet: 768px - 1024px  
    // Desktop: > 1024px
    isMobile.value = screenWidth.value < 768
    isTablet.value = screenWidth.value >= 768 && screenWidth.value < 1024
    isDesktop.value = screenWidth.value >= 1024
  }

  const isTouchDevice = ref(false)

  const detectTouchDevice = () => {
    isTouchDevice.value = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         // @ts-ignore
                         navigator.msMaxTouchPoints > 0
  }

  onMounted(() => {
    updateScreenInfo()
    detectTouchDevice()
    
    window.addEventListener('resize', updateScreenInfo)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenInfo)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    screenWidth
  }
}
