// Centralized application configuration

export const APP_CONFIG = {
  // Basic app info
  name: 'LaunchLine LLC',
  tagline: "We're taking off.",
  description: 'Professional web and software development that launches your business into the digital stratosphere.',
  version: '1.0.0',
  author: 'LaunchLine Team',
  
  // URLs and contact
  url: 'https://launchline.com',
  email: 'hello@launchline.com',
  phone: '+1 (555) 123-4567',
  
  // Address
  address: {
    street: '123 Launch Street',
    city: 'Tech City',
    state: 'TC',
    zip: '12345',
    country: 'USA'
  },
  
  // Social media
  social: {
    twitter: 'https://twitter.com/launchline',
    linkedin: 'https://linkedin.com/company/launchline',
    github: 'https://github.com/launchline',
    instagram: 'https://instagram.com/launchline'
  },
  
  // Feature flags
  features: {
    blog: true,
    portfolio: true,
    contact: true,
    newsletter: true,
    analytics: true,
    darkMode: true,
    animations: true
  },
  
  // Performance settings
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    codeSplitting: true,
    caching: true,
    compression: true
  },
  
  // SEO defaults
  seo: {
    defaultTitle: 'LaunchLine LLC - Professional Launch Solutions',
    defaultDescription: 'Transform your business with professional web development and launch strategies. From startups to enterprise, we deliver results that drive growth.',
    defaultImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image',
    locale: 'en_US',
    siteName: 'LaunchLine LLC'
  },
  
  // API settings
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://api.launchline.com' 
      : 'http://localhost:8000',
    timeout: 10000,
    retries: 3
  },
  
  // Form settings
  forms: {
    contactFormId: 'contact-form',
    newsletterFormId: 'newsletter-form',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  },
  
  // Animation settings
  animations: {
    enabled: true,
    reducedMotion: false,
    defaultDuration: 300,
    staggerDelay: 100
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
    showPageNumbers: true,
    showPrevNext: true
  },
  
  // Search settings
  search: {
    minQueryLength: 2,
    maxResults: 20,
    debounceDelay: 300,
    highlightMatches: true
  }
} as const

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080
} as const

export const COLORS = {
  primary: '#0EA5E9',
  secondary: '#8B5CF6',
  accent: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
} as const

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem'
} as const

export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  }
} as const

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000
} as const

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
