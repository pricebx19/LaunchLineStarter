/**
 * Scroll utility functions that account for the fixed navbar height
 */

const NAVBAR_HEIGHT = 64 // h-16 = 64px

/**
 * Smoothly scroll to an element with navbar offset
 * @param elementId - The ID of the element to scroll to
 * @param additionalOffset - Additional offset in pixels (default: 0)
 */
export const scrollToElement = (elementId: string, additionalOffset: number = 0): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementTop = element.offsetTop
    const offsetPosition = elementTop - NAVBAR_HEIGHT - additionalOffset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Smoothly scroll to the next section with navbar offset
 * @param nextSectionId - The ID of the next section to scroll to
 */
export const scrollToNextSection = (nextSectionId: string): void => {
  scrollToElement(nextSectionId)
}

/**
 * Navigate to a section on the home page (for when scrolling is disabled)
 * @param sectionId - The ID of the section to navigate to
 */
export const navigateToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    // For home page, we'll use scrollIntoView since the page is fixed
    // but we'll offset it to account for the navbar
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    // Manually adjust the scroll position to account for navbar
    setTimeout(() => {
      window.scrollTo({
        top: window.scrollY - NAVBAR_HEIGHT,
        behavior: 'auto'
      })
    }, 100)
  }
}
