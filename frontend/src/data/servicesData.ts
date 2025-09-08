export interface Service {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  icon: string
}

export interface FAQ {
  question: string
  answer: string
  isOpen: boolean
}

export interface AlaCarteService {
  title: string
  description: string
  price: string
  icon: string
  category: string
  features: string[]
  popular?: boolean
}

// Main service packages
export const servicePackages: Service[] = [
  {
    title: 'Starter Package',
    description: 'Affordable, professional websites for small businesses and startups. Perfect for local businesses and startups ready to establish their online presence.',
    price: 'From $2,500',
    duration: '2 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO optimization',
      'Contact forms',
      '2-week turnaround'
    ]
  },
  {
    title: 'Pro Package',
    description: 'Fully custom web applications and software with advanced features. Ideal for growing businesses that need a powerful digital platform to scale their operations.',
    price: 'From $8,500',
    duration: '4-6 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',
    features: [
      'Custom web applications',
      'Advanced features',
      'SEO optimization',
      'Animations & effects',
      '4-6 week turnaround'
    ]
  },
  {
    title: 'Elite Package',
    description: 'High-end web applications and enterprise software with advanced features, custom branding, and ongoing support. For businesses serious about dominating their market digitally.',
    price: 'From $15,000',
    duration: '6-8 weeks',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg>',
    features: [
      'Custom backend systems',
      'API integrations',
      'Software architecture',
      'Premium features',
      'SEO + marketing'
    ]
  }
]

// A la carte services
export const alaCarteServices: AlaCarteService[] = [
  // Design Services
  {
    title: 'Logo Design',
    description: 'Professional logo design with multiple concepts and revisions.',
    price: '$350',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/></svg>',
    category: 'Design',
    features: ['3 initial concepts', '3 rounds of revisions', 'Vector files included', 'Brand guidelines']
  },
  {
    title: 'Landing Page',
    description: 'Single high-converting landing page for campaigns or products.',
    price: '$850',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/></svg>',
    category: 'Development',
    features: ['Mobile responsive', 'Contact form', 'Analytics setup', '1-week delivery'],
    popular: true
  },
  {
    title: 'SEO Audit',
    description: 'Comprehensive SEO analysis and optimization recommendations.',
    price: '$450',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg>',
    category: 'Marketing',
    features: ['Technical SEO audit', 'Keyword research', 'Competition analysis', 'Action plan included']
  },
  {
    title: 'E-commerce Setup',
    description: 'Complete online store setup with payment processing.',
    price: '$1,250',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9.5A1.5 1.5 0 117.5 8 1.5 1.5 0 016 9.5zm2.5 2.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm5-2.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/></svg>',
    category: 'Development',
    features: ['Product catalog', 'Payment gateway', 'Inventory management', 'Order tracking']
  },
  {
    title: 'API Integration',
    description: 'Connect your application with third-party services.',
    price: '$650',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',
    category: 'Development',
    features: ['API documentation', 'Error handling', 'Data validation', 'Testing included']
  },
  {
    title: 'Social Media Kit',
    description: 'Complete social media branding package.',
    price: '$425',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>',
    category: 'Design',
    features: ['Cover images', 'Post templates', 'Story highlights', 'Brand consistency']
  },
  {
    title: 'Database Design',
    description: 'Custom database schema and optimization.',
    price: '$750',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/></svg>',
    category: 'Development',
    features: ['Schema design', 'Performance optimization', 'Data migration', 'Documentation']
  },
  {
    title: 'Content Strategy',
    description: 'Strategic content planning and creation roadmap.',
    price: '$525',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/></svg>',
    category: 'Marketing',
    features: ['Content calendar', 'Audience research', 'Topic planning', 'Performance metrics']
  },
  {
    title: 'Performance Audit',
    description: 'Website speed and performance optimization.',
    price: '$375',
    icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>',
    category: 'Development',
    features: ['Speed analysis', 'Core Web Vitals', 'Image optimization', 'Caching setup'],
    popular: true
  }
]

// Frequently asked questions
export const serviceFAQs: FAQ[] = [
  {
    question: 'How long does it take to build my website?',
    answer: 'Our Starter Package delivers in just 2 weeks, Pro Package takes 4-6 weeks, and Elite Package takes 6-8 weeks. We pride ourselves on fast, quality delivery.',
    isOpen: false
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes! We offer hosting, maintenance, and support packages to keep your website running smoothly. We\'re here for the long haul to ensure your online success.',
    isOpen: false
  },
  {
    question: 'Can you work with my existing brand materials?',
    answer: 'Absolutely! We can work with your existing logos, colors, and brand guidelines, or help you develop a complete brand identity as part of your project.',
    isOpen: false
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have particular expertise in startups, SaaS companies, e-commerce, and small-to-medium businesses, but we work with clients across all industries. Every business deserves professional digital solutions.',
    isOpen: false
  }
]
