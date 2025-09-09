import type { FormField, ProjectType, BudgetRange, TimelineRange } from '../types/Forms'

export const CONTACT_FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your full name',
    validation: [
      { type: 'required', message: 'Name is required' },
      { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
    ]
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address',
    validation: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ]
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: false,
    placeholder: 'Enter your phone number',
    helpText: 'Optional - we\'ll use this to contact you faster',
    validation: [
      { type: 'pattern', value: '^[\\+]?[1-9][\\d]{0,15}$', message: 'Please enter a valid phone number' }
    ]
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    required: false,
    placeholder: 'Enter your company name',
    helpText: 'Optional - helps us understand your business context'
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    required: true,
    placeholder: 'What can we help you with?',
    validation: [
      { type: 'required', message: 'Subject is required' },
      { type: 'minLength', value: 5, message: 'Subject must be at least 5 characters' }
    ]
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Tell us about your project or question...',
    helpText: 'The more details you provide, the better we can help you',
    validation: [
      { type: 'required', message: 'Message is required' },
      { type: 'minLength', value: 20, message: 'Message must be at least 20 characters' },
      { type: 'maxLength', value: 1000, message: 'Message must be less than 1000 characters' }
    ]
  },
  {
    name: 'projectType',
    label: 'Project Type',
    type: 'select',
    required: false,
    placeholder: 'Select project type',
    helpText: 'Optional - helps us understand your needs better',
    options: [
      { value: 'website', label: 'Website' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'webapp', label: 'Web Application' },
      { value: 'mobile', label: 'Mobile App' },
      { value: 'api', label: 'API Development' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    name: 'budget',
    label: 'Budget Range',
    type: 'select',
    required: false,
    placeholder: 'Select budget range',
    helpText: 'Optional - helps us provide accurate estimates',
    options: [
      { value: 'under-5k', label: 'Under $5,000' },
      { value: '5k-10k', label: '$5,000 - $10,000' },
      { value: '10k-25k', label: '$10,000 - $25,000' },
      { value: '25k-50k', label: '$25,000 - $50,000' },
      { value: 'over-50k', label: 'Over $50,000' }
    ]
  },
  {
    name: 'timeline',
    label: 'Timeline',
    type: 'select',
    required: false,
    placeholder: 'Select timeline',
    helpText: 'Optional - when do you need this completed?',
    options: [
      { value: 'asap', label: 'ASAP' },
      { value: '1month', label: 'Within 1 month' },
      { value: '2-3months', label: '2-3 months' },
      { value: '3-6months', label: '3-6 months' },
      { value: 'flexible', label: 'Flexible' }
    ]
  },
  {
    name: 'newsletter',
    label: 'Subscribe to Newsletter',
    type: 'checkbox',
    required: false,
    helpText: 'Get the latest web development tips and industry insights'
  }
]

export const PROJECT_TYPES: ProjectType[] = [
  { id: 'website', name: 'Website', description: 'Corporate or business website', icon: 'globe' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online store with shopping cart', icon: 'shopping-cart' },
  { id: 'webapp', name: 'Web Application', description: 'Custom web-based software', icon: 'application' },
  { id: 'mobile', name: 'Mobile App', description: 'iOS or Android mobile application', icon: 'mobile' },
  { id: 'api', name: 'API Development', description: 'RESTful API or GraphQL endpoint', icon: 'api' },
  { id: 'other', name: 'Other', description: 'Custom project requirements', icon: 'custom' }
]

export const BUDGET_RANGES: BudgetRange[] = [
  { id: 'under-5k', name: 'Under $5,000', min: 0, max: 5000, description: 'Small projects and MVPs' },
  { id: '5k-10k', name: '$5,000 - $10,000', min: 5000, max: 10000, description: 'Medium-sized projects' },
  { id: '10k-25k', name: '$10,000 - $25,000', min: 10000, max: 25000, description: 'Large projects' },
  { id: '25k-50k', name: '$25,000 - $50,000', min: 25000, max: 50000, description: 'Enterprise projects' },
  { id: 'over-50k', name: 'Over $50,000', min: 50000, max: 1000000, description: 'Custom enterprise solutions' }
]

export const TIMELINE_RANGES: TimelineRange[] = [
  { id: 'asap', name: 'ASAP', minWeeks: 1, maxWeeks: 2, description: 'Rush project - 1-2 weeks' },
  { id: '1month', name: 'Within 1 month', minWeeks: 2, maxWeeks: 4, description: 'Quick turnaround - 2-4 weeks' },
  { id: '2-3months', name: '2-3 months', minWeeks: 8, maxWeeks: 12, description: 'Standard timeline - 2-3 months' },
  { id: '3-6months', name: '3-6 months', minWeeks: 12, maxWeeks: 24, description: 'Large project - 3-6 months' },
  { id: 'flexible', name: 'Flexible', minWeeks: 1, maxWeeks: 52, description: 'No specific deadline' }
]

export const FORM_VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  pattern: 'Please enter a valid format',
  custom: 'Please check your input'
}

export const FORM_SUBMISSION_MESSAGES = {
  success: 'Thank you! Your message has been sent successfully.',
  error: 'Sorry, there was an error sending your message. Please try again.',
  loading: 'Sending your message...',
  validation: 'Please check the form for errors and try again.'
}

export const CONTACT_METHODS = [
  {
    id: 'email',
    name: 'Email',
    value: 'hello@launchline.com',
    icon: 'mail',
    description: 'Send us an email anytime',
    responseTime: 'Within 24 hours'
  },
  {
    id: 'phone',
    name: 'Phone',
    value: '+1 (555) 123-4567',
    icon: 'phone',
    description: 'Call us during business hours',
    responseTime: 'Immediate'
  },
  {
    id: 'calendar',
    name: 'Schedule Call',
    value: '/contact/schedule',
    icon: 'calendar',
    description: 'Book a free consultation',
    responseTime: 'Scheduled'
  }
]

// Contact form data for components
export const CONTACT_FORM_DATA = {
  title: 'Get In Touch',
  description: 'Ready to start your next project? We\'d love to hear from you.',
  namePlaceholder: 'Your full name',
  emailPlaceholder: 'your.email@example.com',
  subjectPlaceholder: 'What can we help you with?',
  subjectOptions: [
    'General Inquiry',
    'New Project',
    'Support',
    'Partnership',
    'Other'
  ],
  messagePlaceholder: 'Tell us about your project or question...',
  messageRows: 5,
  submitText: 'Send Message',
  submittingText: 'Sending...',
  successMessage: 'Thank you! Your message has been sent successfully.',
  disclaimerText: 'We\'ll get back to you within 24 hours.',
  responseTimeTitle: 'Response Time',
  responseTimeDescription: 'We typically respond within 24 hours during business days.'
}

// Contact hero data
export const CONTACT_HERO_DATA = {
  title: 'Get In Touch',
  subtitle: 'Ready to Launch Your Success?',
  description: 'We\'re here to help you transform your digital presence. Let\'s discuss your project and create something amazing together.',
  backgroundImage: '/images/contact-hero-bg.jpg',
  primaryCta: 'Start Your Project',
  secondaryCta: 'Learn More',
  metrics: [
    { label: 'Projects Completed', value: '150+', description: 'Successfully delivered projects' },
    { label: 'Client Satisfaction', value: '98%', description: 'Happy clients rate our service' },
    { label: 'Response Time', value: '24h', description: 'Average response to inquiries' },
    { label: 'Average Rating', value: '5★', description: 'Client feedback rating' }
  ]
}

// Floating widget data
export const FLOATING_WIDGET_DATA = {
  title: 'Need Help?',
  description: 'Have questions about our services?',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
  subtitle: 'Get in touch with our team',
  methods: [
    { 
      type: 'email', 
      href: 'mailto:hello@launchline.com',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      label: 'Email Us'
    },
    { 
      type: 'phone', 
      href: 'tel:+1234567890',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      label: 'Call Us'
    },
    { 
      type: 'chat', 
      href: '/contact',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      label: 'Live Chat'
    }
  ]
}