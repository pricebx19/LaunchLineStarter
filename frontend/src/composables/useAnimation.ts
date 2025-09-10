// Animation composables

import { ref, onMounted, onUnmounted, nextTick, computed, type Ref } from 'vue'
import { ANIMATION_PRESETS, PARTICLE_CONFIGS } from '../data/animations'

/**
 * Animation control composable
 */
export function useAnimation(
  animationName: keyof typeof ANIMATION_PRESETS,
  options: {
    delay?: number
    duration?: number
    easing?: string
    iterationCount?: number | 'infinite'
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  } = {}
) {
  const element = ref<HTMLElement | null>(null)
  const isAnimating = ref(false)
  const animationEnded = ref(false)

  const {
    delay = 0,
    duration,
    easing,
    iterationCount = 1,
    direction = 'normal',
    fillMode = 'forwards'
  } = options

  const animation = computed(() => {
    const preset = ANIMATION_PRESETS[animationName]
    if (!preset) {
      return {
        name: animationName,
        config: {
          duration: duration || 600,
          easing: easing || 'ease-out',
          delay: delay,
          iterationCount,
          direction,
          fillMode
        }
      }
    }
    return {
      ...preset,
      config: {
        ...preset.config,
        delay: delay,
        duration: duration || preset.config.duration,
        easing: easing || preset.config.easing,
        iterationCount,
        direction,
        fillMode
      }
    }
  })

  const play = async () => {
    if (!element.value) return

    isAnimating.value = true
    animationEnded.value = false

    await nextTick()

    const { config } = animation.value
    const style = element.value.style

    // Apply animation properties
    style.animationName = animationName
    style.animationDuration = `${config.duration}ms`
    style.animationDelay = `${config.delay}ms`
    style.animationTimingFunction = config.easing
    style.animationIterationCount = config.iterationCount.toString()
    style.animationDirection = config.direction
    style.animationFillMode = config.fillMode

    // Listen for animation end
    const handleAnimationEnd = () => {
      isAnimating.value = false
      animationEnded.value = true
      element.value?.removeEventListener('animationend', handleAnimationEnd)
    }

    element.value.addEventListener('animationend', handleAnimationEnd)
  }

  const pause = () => {
    if (element.value) {
      element.value.style.animationPlayState = 'paused'
    }
  }

  const resume = () => {
    if (element.value) {
      element.value.style.animationPlayState = 'running'
    }
  }

  const stop = () => {
    if (element.value) {
      element.value.style.animation = 'none'
      isAnimating.value = false
      animationEnded.value = false
    }
  }

  const reset = () => {
    if (element.value) {
      element.value.style.animation = 'none'
      isAnimating.value = false
      animationEnded.value = false
    }
  }

  return {
    element,
    isAnimating,
    animationEnded,
    animation,
    play,
    pause,
    resume,
    stop,
    reset
  }
}

/**
 * Scroll-triggered animation composable
 */
export function useScrollAnimation(
  animationName: keyof typeof ANIMATION_PRESETS,
  options: {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  } = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const element = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const hasAnimated = ref(false)

  const { play, stop, reset } = useAnimation(animationName)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (!hasAnimated.value) {
            play()
            hasAnimated.value = triggerOnce
          }
        } else if (!triggerOnce) {
          isVisible.value = false
          reset()
        }
      })
    },
    {
      threshold,
      rootMargin
    }
  )

  onMounted(() => {
    if (element.value) {
      observer.observe(element.value)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    element,
    isVisible,
    hasAnimated,
    play,
    stop,
    reset
  }
}

/**
 * Staggered animation composable
 */
export function useStaggeredAnimation(
  animationName: keyof typeof ANIMATION_PRESETS,
  options: {
    staggerDelay?: number
    totalItems?: number
  } = {}
) {
  const { staggerDelay = 100 } = options

  const elements = ref<HTMLElement[]>([])
  const isAnimating = ref(false)
  const currentIndex = ref(0)

  const playAll = async () => {
    isAnimating.value = true
    currentIndex.value = 0

    for (let i = 0; i < elements.value.length; i++) {
      const element = elements.value[i]
      if (element) {
        const { play } = useAnimation(animationName, { delay: i * staggerDelay })
        await play()
        currentIndex.value = i
      }
    }

    isAnimating.value = false
  }

  const playNext = async () => {
    if (currentIndex.value < elements.value.length) {
      const element = elements.value[currentIndex.value]
      if (element) {
        const { play } = useAnimation(animationName)
        await play()
        currentIndex.value++
      }
    }
  }

  const reset = () => {
    elements.value.forEach(element => {
      element.style.animation = 'none'
    })
    currentIndex.value = 0
    isAnimating.value = false
  }

  return {
    elements,
    isAnimating,
    currentIndex,
    playAll,
    playNext,
    reset
  }
}

/**
 * Particle system composable
 */
export function useParticles(
  configName: keyof typeof PARTICLE_CONFIGS,
  container: Ref<HTMLElement | null>
) {
  const particles = ref<any[]>([])
  const isActive = ref(false)
  const animationId = ref<number | null>(null)

  const config = computed(() => PARTICLE_CONFIGS[configName])

  const createParticle = () => {
    const particleConfig = config.value
    if (!particleConfig) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2,
        speed: 1,
        color: '#ffffff',
        opacity: 0.5,
        lifetime: 1000,
        age: 0
      }
    }
    const { size, speed, colors, opacity, lifetime } = particleConfig
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (size.max - size.min) + size.min,
      speed: Math.random() * (speed.max - speed.min) + speed.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
      lifetime: lifetime,
      age: 0
    }
  }

  const generateParticles = () => {
    const particleConfig = config.value
    const count = particleConfig?.count || 50
    particles.value = Array.from({ length: count }, createParticle)
  }

  const animateParticles = () => {
    if (!isActive.value) return

    particles.value = particles.value.map(particle => {
      const newParticle = { ...particle }
      newParticle.age += 16 // Assuming 60fps
      newParticle.y -= newParticle.speed

      // Reset particle if it goes off screen or expires
      if (newParticle.y < -10 || newParticle.age > newParticle.lifetime) {
        return createParticle()
      }

      return newParticle
    })

    animationId.value = requestAnimationFrame(animateParticles)
  }

  const start = () => {
    isActive.value = true
    generateParticles()
    animateParticles()
  }

  const stop = () => {
    isActive.value = false
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
      animationId.value = null
    }
  }

  const reset = () => {
    stop()
    particles.value = []
  }

  onMounted(() => {
    if (container.value) {
      start()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    particles,
    isActive,
    start,
    stop,
    reset
  }
}

/**
 * Parallax scroll composable
 */
export function useParallax(
  speed: number = 0.5,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) {
  const element = ref<HTMLElement | null>(null)
  const offset = ref(0)

  const handleScroll = () => {
    if (!element.value) return

    const scrolled = window.pageYOffset
    const rate = scrolled * -speed

    switch (direction) {
      case 'up':
        offset.value = rate
        break
      case 'down':
        offset.value = -rate
        break
      case 'left':
        offset.value = rate
        break
      case 'right':
        offset.value = -rate
        break
    }

    element.value.style.transform = `translate3d(0, ${offset.value}px, 0)`
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    element,
    offset
  }
}
