import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll(threshold: number = 300) {
  const showBackToTop = ref(false)

  const handleScroll = () => {
    showBackToTop.value = window.pageYOffset > threshold
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const setupScrollListener = () => {
    window.addEventListener('scroll', handleScroll)
  }

  const removeScrollListener = () => {
    window.removeEventListener('scroll', handleScroll)
  }

  onMounted(() => {
    setupScrollListener()
  })

  onUnmounted(() => {
    removeScrollListener()
  })

  return {
    showBackToTop,
    scrollToTop,
    setupScrollListener,
    removeScrollListener
  }
}
