import { ref, onMounted, onUnmounted } from 'vue'

export function useReadingProgress() {
  const readingProgress = ref(0)
  const showTOC = ref(false)
  const showShareButtons = ref(false)

  const updateReadingProgress = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollTop / docHeight) * 100
    readingProgress.value = Math.min(100, Math.max(0, progress))
    
    // Show/hide TOC and share buttons based on scroll position
    showTOC.value = scrollTop > 300
    showShareButtons.value = scrollTop > 300
  }

  const handleScroll = () => {
    updateReadingProgress()
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
    readingProgress,
    showTOC,
    showShareButtons,
    updateReadingProgress
  }
}
