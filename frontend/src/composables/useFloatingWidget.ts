import { ref } from 'vue'

export function useFloatingWidget() {
  const widgetOpen = ref(false)

  const toggleWidget = () => {
    widgetOpen.value = !widgetOpen.value
  }

  const openWidget = () => {
    widgetOpen.value = true
  }

  const closeWidget = () => {
    widgetOpen.value = false
  }

  return {
    widgetOpen,
    toggleWidget,
    openWidget,
    closeWidget
  }
}
