// Animation constants and presets

export const EASING_FUNCTIONS = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  cubicBezier: {
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  }
} as const

export const ANIMATION_PRESETS = {
  fadeIn: {
    keyframes: [
      { offset: 0, properties: { opacity: 0 } },
      { offset: 1, properties: { opacity: 1 } }
    ],
    duration: 300,
    easing: 'ease-out'
  },
  fadeOut: {
    keyframes: [
      { offset: 0, properties: { opacity: 1 } },
      { offset: 1, properties: { opacity: 0 } }
    ],
    duration: 300,
    easing: 'ease-in'
  },
  slideInUp: {
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateY(30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateY(0)' } }
    ],
    duration: 500,
    easing: 'ease-out'
  },
  slideInDown: {
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateY(-30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateY(0)' } }
    ],
    duration: 500,
    easing: 'ease-out'
  },
  slideInLeft: {
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateX(-30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateX(0)' } }
    ],
    duration: 500,
    easing: 'ease-out'
  },
  slideInRight: {
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateX(30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateX(0)' } }
    ],
    duration: 500,
    easing: 'ease-out'
  },
  scaleIn: {
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'scale(0.8)' } },
      { offset: 1, properties: { opacity: 1, transform: 'scale(1)' } }
    ],
    duration: 300,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  bounce: {
    keyframes: [
      { offset: 0, properties: { transform: 'translateY(0)' } },
      { offset: 0.2, properties: { transform: 'translateY(-10px)' } },
      { offset: 0.4, properties: { transform: 'translateY(0)' } },
      { offset: 0.6, properties: { transform: 'translateY(-5px)' } },
      { offset: 0.8, properties: { transform: 'translateY(0)' } },
      { offset: 1, properties: { transform: 'translateY(0)' } }
    ],
    duration: 1000,
    easing: 'ease-out'
  },
  pulse: {
    keyframes: [
      { offset: 0, properties: { transform: 'scale(1)' } },
      { offset: 0.5, properties: { transform: 'scale(1.05)' } },
      { offset: 1, properties: { transform: 'scale(1)' } }
    ],
    duration: 2000,
    easing: 'ease-in-out',
    iterationCount: 'infinite'
  },
  spin: {
    keyframes: [
      { offset: 0, properties: { transform: 'rotate(0deg)' } },
      { offset: 1, properties: { transform: 'rotate(360deg)' } }
    ],
    duration: 1000,
    easing: 'linear',
    iterationCount: 'infinite'
  },
  float: {
    keyframes: [
      { offset: 0, properties: { transform: 'translateY(0px)' } },
      { offset: 0.5, properties: { transform: 'translateY(-20px)' } },
      { offset: 1, properties: { transform: 'translateY(0px)' } }
    ],
    duration: 3000,
    easing: 'ease-in-out',
    iterationCount: 'infinite'
  },
  shimmer: {
    keyframes: [
      { offset: 0, properties: { transform: 'translateX(-100%)' } },
      { offset: 1, properties: { transform: 'translateX(100%)' } }
    ],
    duration: 2000,
    easing: 'ease-in-out',
    iterationCount: 'infinite'
  }
} as const

export const STAGGER_DELAYS = {
  fast: 50,
  normal: 100,
  slow: 200,
  slower: 300
} as const

export const PARALLAX_SPEEDS = {
  slow: 0.5,
  normal: 1,
  fast: 1.5,
  faster: 2
} as const
