import { ref, nextTick } from 'vue'

export interface TableOfContentsItem {
  id: string
  text: string
}

export function useTableOfContents() {
  const tableOfContents = ref<TableOfContentsItem[]>([])
  const activeHeading = ref('')

  const generateTableOfContents = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    tableOfContents.value = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`
      heading.id = id
      return {
        id,
        text: heading.textContent || ''
      }
    })
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeHeading.value = id
    }
  }

  const updateActiveHeading = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let currentActiveHeading = ''
    
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 0) {
        currentActiveHeading = heading.id
      }
    })
    
    activeHeading.value = currentActiveHeading
  }

  const initializeTOC = () => {
    // Generate TOC after content is loaded
    nextTick(() => {
      setTimeout(() => {
        generateTableOfContents()
      }, 500)
    })
  }

  return {
    tableOfContents,
    activeHeading,
    generateTableOfContents,
    scrollToHeading,
    updateActiveHeading,
    initializeTOC
  }
}
