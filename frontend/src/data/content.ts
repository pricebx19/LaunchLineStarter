import type { HomePageData } from '../types'

export const HOME_PAGE_DATA: HomePageData = {
  title: 'Launch Your Digital Success',
  subtitle: 'Transform Your Business with Cutting-Edge Web Solutions',
  description: 'We create stunning, high-performance websites and web applications that drive results. From concept to launch, we\'re your partners in digital transformation.',
  heroImage: '/images/hero-bg.jpg',
  features: [
    {
      id: '1',
      title: 'Modern Design',
      description: 'Beautiful, responsive designs that work on all devices',
      icon: 'design'
    },
    {
      id: '2',
      title: 'Fast Performance',
      description: 'Lightning-fast loading times and optimized user experience',
      icon: 'performance'
    },
    {
      id: '3',
      title: 'SEO Optimized',
      description: 'Built for search engines to maximize your online visibility',
      icon: 'seo'
    },
    {
      id: '4',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
      icon: 'security'
    }
  ],
  stats: [
    {
      value: 150,
      label: 'Projects Completed',
      suffix: '+',
      description: 'Successful launches'
    },
    {
      value: 95,
      label: 'Client Satisfaction',
      suffix: '%',
      description: 'Happy customers'
    },
    {
      value: 250,
      label: 'Traffic Increase',
      suffix: '%',
      description: 'Average growth'
    },
    {
      value: 48,
      label: 'Response Time',
      suffix: 'hrs',
      description: 'Quick turnaround'
    }
  ]
}
