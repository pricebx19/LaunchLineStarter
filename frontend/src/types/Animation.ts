// Animation-related interfaces

export interface AnimationConfig {
  duration: number
  delay: number
  easing: string
  iterationCount: number | 'infinite'
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode: 'none' | 'forwards' | 'backwards' | 'both'
}

export interface Keyframe {
  offset: number
  properties: Record<string, string | number>
}

export interface AnimationPreset {
  name: string
  keyframes: Keyframe[]
  config: AnimationConfig
}

export interface ParticleConfig {
  count: number
  size: {
    min: number
    max: number
  }
  speed: {
    min: number
    max: number
  }
  colors: string[]
  opacity: {
    min: number
    max: number
  }
  lifetime: number
}

export interface ScrollAnimation {
  trigger: 'viewport' | 'scroll' | 'hover' | 'click'
  threshold: number
  rootMargin: string
  animation: AnimationPreset
}

export interface StaggerAnimation {
  delay: number
  stagger: number
  animation: AnimationPreset
}

export interface ParallaxConfig {
  speed: number
  direction: 'up' | 'down' | 'left' | 'right'
  offset: number
  easing: string
}
