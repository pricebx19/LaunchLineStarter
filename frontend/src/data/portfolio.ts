import type { Project, ProjectCategory, Technology, Client, CaseStudy } from '../types/Portfolio'

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: 'web-development', name: 'Web Development', slug: 'web-development', description: 'Custom websites and web applications', icon: 'globe', color: '#3B82F6' },
  { id: 'ecommerce', name: 'E-commerce', slug: 'ecommerce', description: 'Online stores and shopping platforms', icon: 'shopping-cart', color: '#10B981' },
  { id: 'mobile', name: 'Mobile Apps', slug: 'mobile', description: 'iOS and Android applications', icon: 'mobile', color: '#8B5CF6' },
  { id: 'saas', name: 'SaaS Platforms', slug: 'saas', description: 'Software as a Service solutions', icon: 'cloud', color: '#F59E0B' },
  { id: 'api', name: 'API Development', slug: 'api', description: 'RESTful APIs and microservices', icon: 'api', color: '#EF4444' }
]

export const TECHNOLOGIES: Technology[] = [
  // Frontend
  { id: 'vue', name: 'Vue.js', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#4FC08D' }, icon: 'vue', color: '#4FC08D' },
  { id: 'react', name: 'React', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#61DAFB' }, icon: 'react', color: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#3178C6' }, icon: 'typescript', color: '#3178C6' },
  { id: 'javascript', name: 'JavaScript', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#F7DF1E' }, icon: 'javascript', color: '#F7DF1E' },
  { id: 'tailwind', name: 'Tailwind CSS', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#06B6D4' }, icon: 'tailwind', color: '#06B6D4' },
  { id: 'css', name: 'CSS3', category: { id: 'frontend', name: 'Frontend', icon: 'code', color: '#1572B6' }, icon: 'css', color: '#1572B6' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: { id: 'backend', name: 'Backend', icon: 'server', color: '#339933' }, icon: 'nodejs', color: '#339933' },
  { id: 'python', name: 'Python', category: { id: 'backend', name: 'Backend', icon: 'server', color: '#3776AB' }, icon: 'python', color: '#3776AB' },
  { id: 'django', name: 'Django', category: { id: 'backend', name: 'Backend', icon: 'server', color: '#092E20' }, icon: 'django', color: '#092E20' },
  { id: 'express', name: 'Express.js', category: { id: 'backend', name: 'Backend', icon: 'server', color: '#000000' }, icon: 'express', color: '#000000' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: { id: 'database', name: 'Database', icon: 'database', color: '#336791' }, icon: 'postgresql', color: '#336791' },
  { id: 'mongodb', name: 'MongoDB', category: { id: 'database', name: 'Database', icon: 'database', color: '#47A248' }, icon: 'mongodb', color: '#47A248' },
  { id: 'redis', name: 'Redis', category: { id: 'database', name: 'Database', icon: 'database', color: '#DC382D' }, icon: 'redis', color: '#DC382D' },
  
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', category: { id: 'cloud', name: 'Cloud', icon: 'cloud', color: '#FF9900' }, icon: 'aws', color: '#FF9900' },
  { id: 'docker', name: 'Docker', category: { id: 'devops', name: 'DevOps', icon: 'container', color: '#2496ED' }, icon: 'docker', color: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', category: { id: 'devops', name: 'DevOps', icon: 'container', color: '#326CE5' }, icon: 'kubernetes', color: '#326CE5' }
]

export const CLIENTS: Client[] = [
  {
    id: 'techcorp',
    name: 'TechCorp Solutions',
    logo: '/images/clients/techcorp-logo.png',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '500-1000 employees',
    location: 'San Francisco, CA'
  },
  {
    id: 'retailmax',
    name: 'RetailMax',
    logo: '/images/clients/retailmax-logo.png',
    website: 'https://retailmax.com',
    industry: 'Retail',
    size: '100-500 employees',
    location: 'New York, NY'
  },
  {
    id: 'healthplus',
    name: 'HealthPlus',
    logo: '/images/clients/healthplus-logo.png',
    website: 'https://healthplus.com',
    industry: 'Healthcare',
    size: '1000+ employees',
    location: 'Boston, MA'
  }
]

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A comprehensive e-commerce solution with advanced features and seamless user experience.',
    longDescription: 'Built a full-featured e-commerce platform from scratch using modern technologies. The platform includes product catalog, shopping cart, payment processing, order management, and admin dashboard.',
    image: '/images/portfolio/ecommerce-platform.jpg',
    images: [
      '/images/portfolio/ecommerce-platform-1.jpg',
      '/images/portfolio/ecommerce-platform-2.jpg',
      '/images/portfolio/ecommerce-platform-3.jpg'
    ],
    technologies: [TECHNOLOGIES[0], TECHNOLOGIES[2], TECHNOLOGIES[4], TECHNOLOGIES[6], TECHNOLOGIES[10]],
    category: PROJECT_CATEGORIES[1],
    status: { id: 'completed', name: 'Completed', color: '#10B981', description: 'Project successfully delivered' },
    client: CLIENTS[1],
    startDate: '2023-06-01',
    endDate: '2023-09-15',
    duration: '3.5 months',
    budget: '$45,000',
    teamSize: 4,
    features: [
      'Product catalog with advanced filtering',
      'Secure payment processing',
      'Order management system',
      'Inventory tracking',
      'Admin dashboard',
      'Mobile-responsive design'
    ],
    challenges: [
      'Integrating multiple payment gateways',
      'Handling high traffic during peak sales',
      'Ensuring data security and compliance'
    ],
    solutions: [
      'Implemented robust payment gateway abstraction layer',
      'Used Redis for caching and session management',
      'Applied OWASP security guidelines and PCI compliance'
    ],
    results: {
      metrics: [
        { label: 'Conversion Rate', value: '+35%', description: 'Increase in conversion rate', improvement: '35%' },
        { label: 'Page Load Speed', value: '1.2s', description: 'Average page load time', improvement: '60% faster' },
        { label: 'Mobile Traffic', value: '65%', description: 'Percentage of mobile users', improvement: '+20%' }
      ],
      testimonials: [],
      awards: []
    },
    liveUrl: 'https://retailmax.com',
    githubUrl: 'https://github.com/launchline/ecommerce-platform',
    featured: true,
    seoTitle: 'E-commerce Platform Development | LaunchLine',
    seoDescription: 'Custom e-commerce platform development with modern technologies and advanced features.'
  },
  {
    id: 'healthcare-portal',
    title: 'Healthcare Patient Portal',
    slug: 'healthcare-patient-portal',
    description: 'A secure patient portal for healthcare providers with appointment scheduling and medical records access.',
    longDescription: 'Developed a HIPAA-compliant patient portal that allows patients to schedule appointments, view medical records, communicate with healthcare providers, and manage their health information securely.',
    image: '/images/portfolio/healthcare-portal.jpg',
    images: [
      '/images/portfolio/healthcare-portal-1.jpg',
      '/images/portfolio/healthcare-portal-2.jpg',
      '/images/portfolio/healthcare-portal-3.jpg'
    ],
    technologies: [TECHNOLOGIES[1], TECHNOLOGIES[2], TECHNOLOGIES[5], TECHNOLOGIES[7], TECHNOLOGIES[9]],
    category: PROJECT_CATEGORIES[0],
    status: { id: 'completed', name: 'Completed', color: '#10B981', description: 'Project successfully delivered' },
    client: CLIENTS[2],
    startDate: '2023-03-01',
    endDate: '2023-08-30',
    duration: '6 months',
    budget: '$75,000',
    teamSize: 6,
    features: [
      'Patient registration and authentication',
      'Appointment scheduling system',
      'Medical records access',
      'Secure messaging',
      'Prescription management',
      'Insurance verification'
    ],
    challenges: [
      'Ensuring HIPAA compliance',
      'Integrating with existing EHR systems',
      'Handling sensitive medical data securely'
    ],
    solutions: [
      'Implemented end-to-end encryption',
      'Created secure API integrations',
      'Applied strict access controls and audit logging'
    ],
    results: {
      metrics: [
        { label: 'Patient Adoption', value: '85%', description: 'Patient adoption rate', improvement: '+40%' },
        { label: 'Appointment Efficiency', value: '+50%', description: 'Reduction in scheduling time', improvement: '50%' },
        { label: 'Security Score', value: 'A+', description: 'Security audit rating', improvement: 'Perfect score' }
      ],
      testimonials: [],
      awards: []
    },
    liveUrl: 'https://healthplus.com/portal',
    featured: true,
    seoTitle: 'Healthcare Patient Portal Development | LaunchLine',
    seoDescription: 'HIPAA-compliant patient portal with appointment scheduling and medical records management.'
  }
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ecommerce-transformation',
    title: 'E-commerce Platform Transformation',
    slug: 'ecommerce-transformation',
    project: FEATURED_PROJECTS[0],
    challenge: 'RetailMax needed to modernize their outdated e-commerce platform to handle increased traffic and provide better user experience. The existing system was slow, not mobile-friendly, and lacked modern features.',
    solution: 'We completely rebuilt the platform using Vue.js, TypeScript, and Node.js with a focus on performance, scalability, and user experience. Implemented advanced caching, optimized database queries, and created a mobile-first responsive design.',
    process: [
      {
        id: '1',
        title: 'Discovery & Planning',
        description: 'Analyzed existing system, identified pain points, and created detailed project roadmap.',
        image: '/images/case-studies/discovery.jpg',
        order: 1
      },
      {
        id: '2',
        title: 'Design & Prototyping',
        description: 'Created wireframes and prototypes focusing on user experience and conversion optimization.',
        image: '/images/case-studies/design.jpg',
        order: 2
      },
      {
        id: '3',
        title: 'Development & Testing',
        description: 'Built the platform using modern technologies with comprehensive testing and quality assurance.',
        image: '/images/case-studies/development.jpg',
        order: 3
      },
      {
        id: '4',
        title: 'Launch & Optimization',
        description: 'Deployed the platform and continuously optimized based on user feedback and analytics.',
        image: '/images/case-studies/launch.jpg',
        order: 4
      }
    ],
    results: {
      metrics: [
        { label: 'Conversion Rate', value: '+35%', description: 'Increase in conversion rate' },
        { label: 'Page Load Speed', value: '1.2s', description: 'Average page load time' },
        { label: 'Mobile Traffic', value: '65%', description: 'Percentage of mobile users' }
      ],
      testimonials: [],
      awards: []
    },
    lessons: [
      'Performance optimization is crucial for e-commerce success',
      'Mobile-first design significantly impacts conversion rates',
      'User experience directly correlates with business metrics'
    ],
    featured: true
  }
]
