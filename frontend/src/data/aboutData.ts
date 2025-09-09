export interface ApproachStep {
  title: string
  description: string
  features: string[]
}

export interface ValueConstellation {
  title: string
  description: string
  icon: string
  color: string
  principles: string[]
  metrics: {
    impact: string
    priority: string
    impactPercentage: number
  }
  impact: string
}

export interface ConstellationConnection {
  path: string
}

// About page approach/process steps
export const approachSteps: ApproachStep[] = [
  {
    title: 'Discovery & Strategy',
    description: 'We dive deep into understanding your business, target audience, and competitive landscape to develop a website strategy that drives results.',
    features: [
      'Business analysis & research',
      'Competitive landscape review',
      'Target audience profiling',
      'Conversion strategy planning'
    ]
  },
  {
    title: 'Design & Development',
    description: 'Our expert team brings your vision to life with cutting-edge technology and beautiful, conversion-focused design that matches your brand perfectly.',
    features: [
      'UX/UI design creation',
      'Responsive development',
      'Performance optimization',
      'Quality assurance testing'
    ]
  },
  {
    title: 'Launch & Optimize',
    description: 'We execute your website launch with precision and provide ongoing support to ensure your online success continues to grow.',
    features: [
      'Seamless deployment',
      'Performance monitoring',
      'Ongoing optimization',
      '24/7 support available'
    ]
  }
]

// Enhanced Values Constellation Data
export const valuesConstellation: ValueConstellation[] = [
  {
    title: 'Stellar Excellence',
    description: 'Like the brightest stars in the cosmos, we pursue excellence that illuminates the digital landscape. Every pixel, every line of code, every user interaction is crafted with precision that rivals the formation of galaxies.',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    color: '#FFD700',
    principles: [
      'Obsessive attention to detail',
      'Never settle for "good enough"',
      'Continuous improvement mindset',
      'Quality over quantity, always'
    ],
    metrics: {
      impact: '9.8/10',
      priority: 'Critical',
      impactPercentage: 98
    },
    impact: 'Excellence drives 98% of our client satisfaction and project success rates.'
  },
  {
    title: 'Quantum Innovation',
    description: 'We harness the power of cutting-edge technology like quantum particles dancing through space-time. Innovation isn\'t just what we do—it\'s the cosmic force that propels every solution beyond conventional limits.',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/></svg>',
    color: '#00BFFF',
    principles: [
      'Embrace emerging technologies',
      'Challenge conventional thinking',
      'Future-proof all solutions',
      'Inspire through creativity'
    ],
    metrics: {
      impact: '9.5/10',
      priority: 'High',
      impactPercentage: 95
    },
    impact: 'Innovation powers 95% of our breakthrough solutions and competitive advantages.'
  },
  {
    title: 'Orbital Partnership',
    description: 'Like celestial bodies in perfect synchronization, we orbit alongside our clients in a cosmic dance of collaboration. Your success becomes our gravitational pull, creating a partnership that spans digital galaxies.',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v7H5v-2.5c-.42-.22-.78-.55-1.08-.96L4 18zm0-7h3c0 1.08.25 2.1.7 3H4v-3z"/></svg>',
    color: '#32CD32',
    principles: [
      'Transparent communication',
      'Shared vision and goals',
      'Long-term relationship focus',
      'Mutual growth and success'
    ],
    metrics: {
      impact: '9.7/10',
      priority: 'Essential',
      impactPercentage: 97
    },
    impact: 'Partnership excellence results in 97% client retention and referral rates.'
  },
  {
    title: 'Cosmic Results',
    description: 'We measure success by the magnitude of impact—like supernovas that birth new stars. Every project creates ripple effects across the digital universe, generating measurable results that transform businesses into thriving cosmic entities.',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>',
    color: '#FF6347',
    principles: [
      'Data-driven decision making',
      'Measurable ROI focus',
      'Performance optimization',
      'Continuous monitoring'
    ],
    metrics: {
      impact: '9.9/10',
      priority: 'Ultimate',
      impactPercentage: 99
    },
    impact: 'Results-focused approach delivers 99% project success and client goal achievement.'
  }
]

// Constellation connection paths for SVG
export const constellationConnections: ConstellationConnection[] = [
  { path: "M200,150 Q400,100 600,150" },
  { path: "M600,150 Q650,300 600,450" },
  { path: "M600,450 Q400,500 200,450" },
  { path: "M200,450 Q150,300 200,150" },
  { path: "M200,150 Q400,300 600,450" },
  { path: "M600,150 Q400,300 200,450" }
]
