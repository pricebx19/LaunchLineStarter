// Team Members
export interface TeamMember {
  name: string
  role: string
  description: string
  skills: string[]
  initials: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Alex Rodriguez',
    role: 'Lead Developer & Founder',
    description: 'Full-stack wizard with 8+ years of experience crafting digital solutions that scale.',
    skills: ['Vue.js', 'React', 'Node.js', 'Python'],
    initials: 'AR'
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    description: 'Design strategist who transforms complex ideas into intuitive, beautiful user experiences.',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    initials: 'SC'
  },
  {
    name: 'Marcus Johnson',
    role: 'DevOps Engineer',
    description: 'Infrastructure expert ensuring your applications run smoothly at any scale.',
    skills: ['AWS', 'Docker', 'CI/CD', 'Monitoring'],
    initials: 'MJ'
  },
  {
    name: 'Emma Williams',
    role: 'Project Manager',
    description: 'Coordination master who keeps projects on track and clients informed every step of the way.',
    skills: ['Agile', 'Communication', 'Strategy', 'Quality Assurance'],
    initials: 'EW'
  },
  {
    name: 'David Park',
    role: 'Backend Specialist',
    description: 'Database and API expert who ensures your applications run fast and secure.',
    skills: ['Python', 'PostgreSQL', 'API Design', 'Security'],
    initials: 'DP'
  }
]

// Testimonials
export interface TestimonialWithRating {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

export const testimonials: TestimonialWithRating[] = [
  {
    id: 1,
    name: 'Mike Rodriguez',
    role: 'Owner',
    company: 'RPM Car Club',
    content: 'LaunchLine transformed our car club\'s online presence completely. Our website now looks as professional as our cars, and we\'re getting more members than ever. The 2-week turnaround was incredible!',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Event Director',
    company: 'Velocity Show Promotions',
    content: 'LaunchLine built us a website that perfectly captures the energy of our car shows. The booking system integration has streamlined our entire operation. They truly understand our industry.',
    rating: 5
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'Founder',
    company: 'Gearhead Garage',
    content: 'As a small garage owner, I needed a website that would compete with the big chains. LaunchLine delivered exactly that - professional, fast, and built to convert visitors into customers.',
    rating: 5
  }
]

// Features
export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export const features: Feature[] = [
  {
    id: '1',
    title: 'Strategic Website Design',
    description: 'Custom websites built with your business goals in mind. We focus on conversion, user experience, and results that matter.',
    icon: 'strategy'
  },
  {
    id: '2',
    title: 'Industry Expertise',
    description: 'Deep understanding of car clubs, show promoters, and small-to-medium businesses. We speak your language and know your market.',
    icon: 'technology'
  },
  {
    id: '3',
    title: 'Rapid Turnaround',
    description: 'Get your professional website in as little as 2 weeks with our Starter Package. Fast, efficient, and built to last.',
    icon: 'analytics'
  },
  {
    id: '4',
    title: 'Premium Branding',
    description: 'Luxury aesthetic with modern design principles. Your brand deserves to look as professional as it performs.',
    icon: 'brand'
  },
  {
    id: '5',
    title: 'Ongoing Support',
    description: '24/7 support and maintenance packages available. We\'re here for the long haul, not just the launch.',
    icon: 'support'
  },
  {
    id: '6',
    title: 'SEO & Growth',
    description: 'Built-in search optimization and marketing tools to help your business grow online from day one.',
    icon: 'growth'
  }
]

// Statistics
export interface Stat {
  id: number
  value: number
  suffix: string
  label: string
  icon: string
}

export const statistics: Stat[] = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Websites Launched',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>'
  },
  {
    id: 2,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>'
  },
  {
    id: 3,
    value: 2,
    suffix: 'weeks',
    label: 'Average Delivery',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>'
  },
  {
    id: 4,
    value: 24,
    suffix: '/7',
    label: 'Support Available',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-1.588-1.588A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.539-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"/></svg>'
  }
]

// CTA Components Data  
export interface CTAFeature {
  id: string
  icon: string
  title: string
  description: string
}

export interface CTAStat {
  value: string
  label: string
}

export const ctaFeatures: CTAFeature[] = [
  { id: '1', icon: '⚡', title: 'Fast Delivery', description: 'Launch in 2-3 weeks' },
  { id: '2', icon: '🛡️', title: 'Secure & Reliable', description: 'Enterprise-grade hosting' },
  { id: '3', icon: '🎯', title: 'Results Focused', description: 'Proven conversion rates' }
]

export const ctaStats: CTAStat[] = [
  { value: '50+', label: 'Websites Launched' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2-8', label: 'Weeks Delivery' }
]

// Timeline Data
export interface TimelineMilestone {
  year: string
  badge: string
  title: string
  description: string
  achievements: string[]
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: '2019',
    badge: 'The Beginning',
    title: 'Foundation & First Launch',
    description: 'Started with a simple mission: create websites that don\'t just look good, but actually drive business results.',
    achievements: [
      'Launched first client website',
      'Established core development process',
      'Built initial team of 3 developers'
    ]
  },
  {
    year: '2020',
    badge: 'Growth Phase',
    title: 'Scaling & Specialization',
    description: 'Expanded our capabilities and refined our process, focusing on performance-driven development.',
    achievements: [
      'Completed 50+ projects',
      'Developed signature LaunchLine methodology',
      'Added UX/UI design services',
      'Achieved 98% client satisfaction rate'
    ]
  },
  {
    year: '2021',
    badge: 'Innovation Era',
    title: 'Tech Stack Evolution',
    description: 'Embraced cutting-edge technologies and modern development practices to deliver superior results.',
    achievements: [
      'Adopted Vue.js and React frameworks',
      'Implemented DevOps practices',
      'Launched performance optimization service',
      'Expanded to serve enterprise clients'
    ]
  },
  {
    year: '2022',
    badge: 'Expansion',
    title: 'Team & Service Growth',
    description: 'Grew our team with specialists and expanded our service offerings to provide comprehensive digital solutions.',
    achievements: [
      'Team grew to 15+ professionals',
      'Added digital strategy consultation',
      'Launched SEO and analytics services',
      'Completed 200+ successful projects'
    ]
  },
  {
    year: '2023',
    badge: 'Excellence',
    title: 'Industry Recognition',
    description: 'Achieved industry recognition for our innovative approach and consistent delivery of exceptional results.',
    achievements: [
      'Won Best Web Development Agency award',
      'Achieved 99.5% uptime across all projects',
      'Expanded to international clients',
      'Launched mentorship program'
    ]
  }
]
