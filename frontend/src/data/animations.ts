import type { AnimationPreset, ParticleConfig, ScrollAnimation } from '../types/Animation'

export const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  fadeIn: {
    name: 'fadeIn',
    keyframes: [
      { offset: 0, properties: { opacity: 0 } },
      { offset: 1, properties: { opacity: 1 } }
    ],
    config: {
      duration: 300,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  slideInUp: {
    name: 'slideInUp',
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateY(30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateY(0)' } }
    ],
    config: {
      duration: 500,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  slideInDown: {
    name: 'slideInDown',
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateY(-30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateY(0)' } }
    ],
    config: {
      duration: 500,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  slideInLeft: {
    name: 'slideInLeft',
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateX(-30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateX(0)' } }
    ],
    config: {
      duration: 500,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  slideInRight: {
    name: 'slideInRight',
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'translateX(30px)' } },
      { offset: 1, properties: { opacity: 1, transform: 'translateX(0)' } }
    ],
    config: {
      duration: 500,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  scaleIn: {
    name: 'scaleIn',
    keyframes: [
      { offset: 0, properties: { opacity: 0, transform: 'scale(0.8)' } },
      { offset: 1, properties: { opacity: 1, transform: 'scale(1)' } }
    ],
    config: {
      duration: 300,
      delay: 0,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  bounce: {
    name: 'bounce',
    keyframes: [
      { offset: 0, properties: { transform: 'translateY(0)' } },
      { offset: 0.2, properties: { transform: 'translateY(-10px)' } },
      { offset: 0.4, properties: { transform: 'translateY(0)' } },
      { offset: 0.6, properties: { transform: 'translateY(-5px)' } },
      { offset: 0.8, properties: { transform: 'translateY(0)' } },
      { offset: 1, properties: { transform: 'translateY(0)' } }
    ],
    config: {
      duration: 1000,
      delay: 0,
      easing: 'ease-out',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  pulse: {
    name: 'pulse',
    keyframes: [
      { offset: 0, properties: { transform: 'scale(1)' } },
      { offset: 0.5, properties: { transform: 'scale(1.05)' } },
      { offset: 1, properties: { transform: 'scale(1)' } }
    ],
    config: {
      duration: 2000,
      delay: 0,
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  spin: {
    name: 'spin',
    keyframes: [
      { offset: 0, properties: { transform: 'rotate(0deg)' } },
      { offset: 1, properties: { transform: 'rotate(360deg)' } }
    ],
    config: {
      duration: 1000,
      delay: 0,
      easing: 'linear',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  float: {
    name: 'float',
    keyframes: [
      { offset: 0, properties: { transform: 'translateY(0px)' } },
      { offset: 0.5, properties: { transform: 'translateY(-20px)' } },
      { offset: 1, properties: { transform: 'translateY(0px)' } }
    ],
    config: {
      duration: 3000,
      delay: 0,
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards'
    }
  },
  shimmer: {
    name: 'shimmer',
    keyframes: [
      { offset: 0, properties: { transform: 'translateX(-100%)' } },
      { offset: 1, properties: { transform: 'translateX(100%)' } }
    ],
    config: {
      duration: 2000,
      delay: 0,
      easing: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards'
    }
  }
}

export const PARTICLE_CONFIGS: Record<string, ParticleConfig> = {
  floating: {
    count: 15,
    size: { min: 2, max: 6 },
    speed: { min: 1, max: 3 },
    colors: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'],
    opacity: { min: 0.1, max: 0.8 },
    lifetime: 20000
  },
  stars: {
    count: 50,
    size: { min: 1, max: 3 },
    speed: { min: 0.5, max: 2 },
    colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0'],
    opacity: { min: 0.3, max: 1 },
    lifetime: 30000
  },
  tech: {
    count: 8,
    size: { min: 20, max: 40 },
    speed: { min: 0.2, max: 1 },
    colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
    opacity: { min: 0.6, max: 1 },
    lifetime: 25000
  }
}

export const SCROLL_ANIMATIONS: ScrollAnimation[] = [
  {
    trigger: 'viewport',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    animation: ANIMATION_PRESETS.slideInUp || {
      name: 'slideInUp',
      keyframes: [
        { offset: 0, properties: { transform: 'translateY(30px)', opacity: '0' } },
        { offset: 1, properties: { transform: 'translateY(0)', opacity: '1' } }
      ],
      config: {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        delay: 0,
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'both'
      }
    }
  },
  {
    trigger: 'viewport',
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    animation: ANIMATION_PRESETS.fadeIn || {
      name: 'fadeIn',
      keyframes: [
        { offset: 0, properties: { opacity: '0' } },
        { offset: 1, properties: { opacity: '1' } }
      ],
      config: {
        duration: 800,
        easing: 'ease-out',
        delay: 0,
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'both'
      }
    }
  },
  {
    trigger: 'viewport',
    threshold: 0.3,
    rootMargin: '0px 0px -150px 0px',
    animation: ANIMATION_PRESETS.scaleIn || {
      name: 'scaleIn',
      keyframes: [
        { offset: 0, properties: { transform: 'scale(0.8)', opacity: '0' } },
        { offset: 1, properties: { transform: 'scale(1)', opacity: '1' } }
      ],
      config: {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        delay: 0,
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'both'
      }
    }
  }
]

export const STAGGER_ANIMATIONS = {
  fast: { delay: 50, stagger: 50 },
  normal: { delay: 100, stagger: 100 },
  slow: { delay: 200, stagger: 200 },
  slower: { delay: 300, stagger: 300 }
}

export const PARALLAX_CONFIGS = {
  slow: { speed: 0.5, direction: 'up' as const, offset: 0, easing: 'ease-out' },
  normal: { speed: 1, direction: 'up' as const, offset: 0, easing: 'ease-out' },
  fast: { speed: 1.5, direction: 'up' as const, offset: 0, easing: 'ease-out' },
  faster: { speed: 2, direction: 'up' as const, offset: 0, easing: 'ease-out' }
}

// Additional presets for specific components
export const PARTICLE_PRESETS = {
  floating: PARTICLE_CONFIGS.floating,
  stars: PARTICLE_CONFIGS.stars,
  tech: PARTICLE_CONFIGS.tech
}

export const STARRY_BACKGROUND_PRESETS = {
  default: {
    starCount: 100,
    starSize: { min: 1, max: 3 },
    twinkleSpeed: 2,
    colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0']
  },
  dense: {
    starCount: 200,
    starSize: { min: 1, max: 4 },
    twinkleSpeed: 1.5,
    colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#CBD5E1']
  }
}