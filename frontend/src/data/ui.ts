// UI Components data and configurations

export const BUTTON_VARIANTS = {
  primary: {
    base: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  },
  secondary: {
    base: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  },
  outline: {
    base: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    disabled: 'border-gray-300 text-gray-500 cursor-not-allowed'
  },
  ghost: {
    base: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    disabled: 'text-gray-500 cursor-not-allowed'
  },
  danger: {
    base: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
} as const

export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
} as const

export const CARD_VARIANTS = {
  default: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border-2 border-gray-300',
  filled: 'bg-gray-50 border border-gray-200'
} as const

export const CARD_PADDING = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
} as const

export const CARD_ROUNDED = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
} as const

export const CARD_SHADOW = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
} as const

export const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  password: 'password',
  number: 'number',
  tel: 'tel',
  url: 'url',
  search: 'search'
} as const

export const MODAL_SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full'
} as const

export const TOOLTIP_POSITIONS = {
  top: 'top-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'bottom-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'left-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'right-full top-1/2 transform translate-y-1/2 ml-2'
} as const

export const BADGE_VARIANTS = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
} as const

export const BADGE_SIZES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
} as const

export const PROGRESS_VARIANTS = {
  default: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600'
} as const

export const PROGRESS_SIZES = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
} as const

export const LOADING_STATES = {
  spinner: 'animate-spin',
  dots: 'animate-pulse',
  bars: 'animate-bounce'
} as const

export const ICON_SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
} as const

export const ICON_VARIANTS = {
  solid: 'fill-current',
  outline: 'stroke-current fill-none',
  duotone: 'fill-current opacity-60'
} as const

export const ALERT_TYPES = {
  success: {
    base: 'bg-green-50 border-green-200 text-green-800',
    icon: 'text-green-400',
    title: 'text-green-800',
    message: 'text-green-700'
  },
  warning: {
    base: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: 'text-yellow-400',
    title: 'text-yellow-800',
    message: 'text-yellow-700'
  },
  error: {
    base: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-400',
    title: 'text-red-800',
    message: 'text-red-700'
  },
  info: {
    base: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'text-blue-400',
    title: 'text-blue-800',
    message: 'text-blue-700'
  }
} as const

export const DROPDOWN_POSITIONS = {
  'top-left': 'bottom-full left-0 mb-2',
  'top-right': 'bottom-full right-0 mb-2',
  'bottom-left': 'top-full left-0 mt-2',
  'bottom-right': 'top-full right-0 mt-2'
} as const

export const TAB_VARIANTS = {
  default: 'border-b-2 border-transparent hover:border-gray-300',
  active: 'border-b-2 border-blue-600 text-blue-600',
  disabled: 'text-gray-400 cursor-not-allowed'
} as const

export const ACCORDION_VARIANTS = {
  default: 'border border-gray-200 rounded-lg',
  flush: 'border-0 border-b border-gray-200 rounded-none',
  filled: 'bg-gray-50 border border-gray-200 rounded-lg'
} as const

// Testimonial data
export const TESTIMONIAL_DATA = {
  title: 'What Our Clients Say',
  description: 'Real feedback from real businesses that have transformed their digital presence with us.',
  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      content: 'LineLaunch transformed our online presence completely. The results speak for themselves - 300% increase in leads within 3 months.',
      rating: 5
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'GrowthCorp',
      content: 'Professional, responsive, and results-driven. They delivered exactly what they promised and more.',
      rating: 5
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'InnovateLab',
      content: 'The team understood our vision and brought it to life. Our new website has been a game-changer for our business.',
      rating: 5
    }
  ]
}

// Error state presets
export const ERROR_STATE_PRESETS = {
  notFound: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist.',
    actionText: 'Go Home',
    actionUrl: '/',
    icon: 'search'
  },
  serverError: {
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
    actionText: 'Retry',
    actionUrl: undefined,
    icon: 'alert-circle'
  },
  networkError: {
    title: 'Network Error',
    description: 'Please check your internet connection and try again.',
    actionText: 'Retry',
    actionUrl: undefined,
    icon: 'wifi-off'
  }
}

// Loading state presets
export const LOADING_STATE_PRESETS = {
  default: {
    title: 'Loading...',
    description: 'Please wait while we fetch your data.',
    showSpinner: true
  },
  content: {
    title: 'Loading Content',
    description: 'Fetching the latest content for you.',
    showSpinner: true
  },
  form: {
    title: 'Submitting...',
    description: 'Please wait while we process your request.',
    showSpinner: true
  }
}

// Section header presets
export const SECTION_HEADER_PRESETS = {
  default: {
    title: 'Section Title',
    alignment: 'center' as const,
    size: 'md' as const
  },
  hero: {
    title: 'Hero Section',
    alignment: 'center' as const,
    size: 'lg' as const
  },
  feature: {
    title: 'Features',
    description: 'Discover what makes us different',
    alignment: 'center' as const,
    size: 'md' as const
  }
}