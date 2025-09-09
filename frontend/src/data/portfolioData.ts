import type { CTAStat } from '../types/index'

export interface Project {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  package: string
  timeline: string
  category: string
  image?: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'featured'
  metrics?: {
    visits?: string
    conversion?: string
    performance?: string
  }
}

export interface CaseStudy {
  id: number
  title: string
  business: string
  icon: string
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  description: string
  package: string
  timeline: string
  testimonial?: string
  client?: string
}

export interface Technology {
  name: string
  icon: string
}

export interface Stat {
  value: string
  label: string
}

// Portfolio categories for filtering
export const portfolioCategories: string[] = [
  'All Projects',
  'SaaS',
  'E-Commerce',
  'Enterprise',
  'Startup',
  'Portfolio'
]

// Hero section stats
export const portfolioStats: CTAStat[] = [
  { value: '50+', label: 'Projects Launched' },
  { value: '300%', label: 'Avg Growth' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support' }
]

// Technologies showcase
export const portfolioTechnologies: Technology[] = [
  { name: 'Vue.js', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: '💙' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'MongoDB', icon: '🍃' }
]

// Portfolio projects data
export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: 'TechFlow SaaS Platform',
    description: 'A modern, subscription-based SaaS platform for project management, featuring user dashboards, real-time collaboration, and analytics.',
    icon: '🚀',
    tags: ['SaaS', 'Web App', 'Project Management'],
    package: 'Pro Package',
    timeline: '5 weeks',
    category: 'SaaS',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    status: 'featured',
    metrics: {
      visits: '500K+',
      conversion: '15%',
      performance: '98/100'
    }
  },
  {
    id: 2,
    title: 'E-Commerce Pro',
    description: 'Dynamic e-commerce platform with integrated payment systems, inventory management, and customer analytics for online retailers.',
    icon: '🛒',
    tags: ['E-Commerce', 'Payment System', 'Analytics'],
    package: 'Elite Package',
    timeline: '7 weeks',
    category: 'E-Commerce',
    technologies: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
    status: 'completed',
    metrics: {
      visits: '1M+',
      conversion: '8.5%',
      performance: '95/100'
    }
  },
  {
    id: 3,
    title: 'StartupHub',
    description: 'Professional website for a startup incubator, featuring application forms, mentor matching, and resource libraries.',
    icon: '💡',
    tags: ['Startup', 'Incubator', 'Mentorship'],
    package: 'Starter Package',
    timeline: '2 weeks',
    category: 'Startup',
    technologies: ['Vue.js', 'Firebase', 'Tailwind'],
    status: 'completed',
    metrics: {
      visits: '50K+',
      conversion: '25%',
      performance: '96/100'
    }
  },
  {
    id: 4,
    title: 'Enterprise CRM',
    description: 'High-end customer relationship management system for enterprise companies, featuring advanced reporting, automation, and integrations.',
    icon: '📊',
    tags: ['Enterprise', 'CRM', 'Automation'],
    package: 'Elite Package',
    timeline: '8 weeks',
    category: 'Enterprise',
    technologies: ['React', 'Python', 'PostgreSQL', 'Docker'],
    status: 'featured',
    metrics: {
      visits: '100K+',
      conversion: '35%',
      performance: '97/100'
    }
  },
  {
    id: 5,
    title: 'EventPro',
    description: 'Event management platform for conference organizers, featuring registration systems, speaker management, and attendee networking.',
    icon: '🎯',
    tags: ['Event Management', 'Registration', 'Networking'],
    package: 'Pro Package',
    timeline: '6 weeks',
    category: 'SaaS',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    status: 'completed',
    metrics: {
      visits: '250K+',
      conversion: '12%',
      performance: '94/100'
    }
  },
  {
    id: 6,
    title: 'DevPortfolio',
    description: 'Portfolio website for a software development agency, showcasing projects, client testimonials, and consultation booking.',
    icon: '💻',
    tags: ['Portfolio', 'Agency', 'Consultation'],
    package: 'Pro Package',
    timeline: '4 weeks',
    category: 'Portfolio',
    technologies: ['Vue.js', 'Tailwind', 'Netlify'],
    status: 'completed',
    metrics: {
      visits: '75K+',
      conversion: '18%',
      performance: '99/100'
    }
  },
  {
    id: 7,
    title: 'FinTech Dashboard',
    description: 'Sophisticated financial technology dashboard with real-time market data, portfolio analytics, and trading capabilities.',
    icon: '💰',
    tags: ['FinTech', 'Dashboard', 'Analytics'],
    package: 'Elite Package',
    timeline: '10 weeks',
    category: 'Enterprise',
    technologies: ['React', 'Python', 'AWS', 'Redis'],
    status: 'featured',
    metrics: {
      visits: '2M+',
      conversion: '6%',
      performance: '96/100'
    }
  },
  {
    id: 8,
    title: 'Healthcare Portal',
    description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine features.',
    icon: '🏥',
    tags: ['Healthcare', 'Portal', 'Telemedicine'],
    package: 'Elite Package',
    timeline: '12 weeks',
    category: 'Enterprise',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    status: 'in-progress',
    metrics: {
      visits: '150K+',
      conversion: '28%',
      performance: '98/100'
    }
  },
  {
    id: 9,
    title: 'AI Content Studio',
    description: 'Revolutionary AI-powered content creation platform with automated writing, image generation, and SEO optimization.',
    icon: '🤖',
    tags: ['AI', 'Content', 'Automation'],
    package: 'Pro Package',
    timeline: '6 weeks',
    category: 'SaaS',
    technologies: ['Vue.js', 'Python', 'OpenAI', 'MongoDB'],
    status: 'featured',
    metrics: {
      visits: '800K+',
      conversion: '22%',
      performance: '97/100'
    }
  }
]

// Success stories / case studies
export const portfolioCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'User Growth Explosion',
    business: 'TechFlow SaaS Platform',
    icon: '📈',
    metric1: { value: '300%', label: 'User Increase' },
    metric2: { value: '85%', label: 'Engagement Rate' },
    description: 'TechFlow needed a SaaS platform that would attract new users and keep existing ones engaged. Our Pro Package delivered a stunning, user-focused web application that increased their user base by 300% in just 6 months.',
    package: 'Pro Package',
    timeline: '5 weeks',
    testimonial: 'LaunchLine transformed our vision into reality. The platform they built exceeded all our expectations!',
    client: 'Sarah Chen, CEO TechFlow'
  },
  {
    id: 2,
    title: 'Sales Conversion Soars',
    business: 'E-Commerce Pro',
    icon: '🎯',
    metric1: { value: '400%', label: 'Online Sales' },
    metric2: { value: '60%', label: 'Time Saved' },
    description: 'E-Commerce Pro was struggling with manual order processes. Our Elite Package platform with integrated payment systems automated their entire operation, increasing online sales by 400% and saving staff 60% of their time.',
    package: 'Elite Package',
    timeline: '7 weeks',
    testimonial: 'The ROI has been incredible. Our online sales have skyrocketed since the new platform launched.',
    client: 'Mike Rodriguez, Founder E-Commerce Pro'
  },
  {
    id: 3,
    title: 'AI Revolution Success',
    business: 'AI Content Studio',
    icon: '🤖',
    metric1: { value: '800K+', label: 'Monthly Users' },
    metric2: { value: '22%', label: 'Conversion Rate' },
    description: 'AI Content Studio needed a platform to democratize AI-powered content creation. Our innovative solution attracted 800K+ monthly users and achieved a 22% conversion rate in the first quarter.',
    package: 'Pro Package',
    timeline: '6 weeks',
    testimonial: 'LaunchLine understood our AI vision perfectly and delivered a platform that users absolutely love.',
    client: 'Dr. Alex Thompson, CTO AI Content Studio'
  }
]
