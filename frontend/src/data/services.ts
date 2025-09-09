import type { Service, AlaCarteService, ProjectType, BudgetRange, TimelineRange } from '../types/Service'
import type { Forms } from '../types/Forms'

export const SERVICE_PACKAGES: Service[] = [
  {
    title: 'Starter Package',
    description: 'Perfect for small businesses and startups looking to establish their online presence.',
    price: '$2,999',
    duration: '2-3 weeks',
    features: [
      'Responsive website design',
      'Up to 5 pages',
      'Basic SEO optimization',
      'Contact form integration',
      'Mobile optimization',
      '1 month free support'
    ],
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.76 1.16.22 2.76.22 4.5-.5C20.16 26.74 22 22.55 22 17V7l-10-5z"/></svg>'
  },
  {
    title: 'Professional Package',
    description: 'Comprehensive solution for growing businesses with advanced features and functionality.',
    price: '$7,999',
    duration: '4-6 weeks',
    features: [
      'Custom website design',
      'Up to 15 pages',
      'Advanced SEO optimization',
      'E-commerce integration',
      'CMS integration',
      'Analytics setup',
      '3 months free support'
    ],
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.76 1.16.22 2.76.22 4.5-.5C20.16 26.74 22 22.55 22 17V7l-10-5z"/></svg>'
  },
  {
    title: 'Enterprise Package',
    description: 'Full-scale digital transformation for large organizations with complex requirements.',
    price: '$19,999',
    duration: '8-12 weeks',
    features: [
      'Custom web application',
      'Unlimited pages',
      'Advanced integrations',
      'User management system',
      'API development',
      'Performance optimization',
      '6 months free support'
    ],
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.76 1.16.22 2.76.22 4.5-.5C20.16 26.74 22 22.55 22 17V7l-10-5z"/></svg>'
  }
]

export const ALA_CARTE_SERVICES: AlaCarteService[] = [
  {
    title: 'Website Design',
    description: 'Custom website design tailored to your brand and business goals.',
    price: '$1,500',
    icon: '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.76 1.16.22 2.76.22 4.5-.5C20.16 26.74 22 22.55 22 17V7l-10-5z"/></svg>',
    category: 'Design',
    features: [
      'Custom UI/UX design',
      'Brand integration',
      'Responsive layouts',
      'Design system creation'
    ],
    popular: true
  },
  {
    title: 'E-commerce Setup',
    description: 'Complete e-commerce solution with payment processing and inventory management.',
    price: '$3,500',
    icon: '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/></svg>',
    category: 'Development',
    features: [
      'Product catalog setup',
      'Payment gateway integration',
      'Order management',
      'Inventory tracking'
    ],
    popular: false
  },
  {
    title: 'SEO Optimization',
    description: 'Comprehensive SEO strategy to improve your website\'s search engine rankings.',
    price: '$2,000',
    icon: '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/></svg>',
    category: 'Marketing',
    features: [
      'Keyword research',
      'On-page optimization',
      'Technical SEO audit',
      'Content strategy'
    ],
    popular: true
  },
  {
    title: 'Mobile App Development',
    description: 'Native or cross-platform mobile applications for iOS and Android.',
    price: '$8,000',
    icon: '<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1 17 1M17 19H7V5H17V19Z"/></svg>',
    category: 'Development',
    features: [
      'Cross-platform development',
      'Native performance',
      'App store optimization',
      'Push notifications'
    ],
    popular: false
  }
]

export const SERVICE_PROJECT_TYPES: ProjectType[] = [
  { id: 'website', name: 'Website', description: 'Corporate or business website', icon: 'globe' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online store with shopping cart', icon: 'shopping-cart' },
  { id: 'webapp', name: 'Web Application', description: 'Custom web-based software', icon: 'application' },
  { id: 'mobile', name: 'Mobile App', description: 'iOS or Android mobile application', icon: 'mobile' },
  { id: 'api', name: 'API Development', description: 'RESTful API or GraphQL endpoint', icon: 'api' },
  { id: 'other', name: 'Other', description: 'Custom project requirements', icon: 'custom' }
]

// Budget and timeline ranges are exported from forms.ts to avoid duplication
