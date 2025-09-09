import type { FooterLink, NavigationItem } from '../types'

export const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'About', href: '/about', icon: 'info' },
  { name: 'Services', href: '/services', icon: 'services' },
  { name: 'Portfolio', href: '/portfolio', icon: 'portfolio' },
  { name: 'Blog', href: '/blog', icon: 'blog' },
  { name: 'Contact', href: '/contact', icon: 'contact' }
]

export const NAVIGATION_ITEMS = navigationItems

export const FOOTER_LINKS: FooterLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' }
]

export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/launchline',
    icon: 'twitter',
    color: '#1DA1F2'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/launchline',
    icon: 'linkedin',
    color: '#0077B5'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/launchline',
    icon: 'github',
    color: '#333333'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/launchline',
    icon: 'instagram',
    color: '#E4405F'
  }
] as const

export const QUICK_ACTIONS = [
  {
    name: 'Get Quote',
    href: '/contact',
    icon: 'quote',
    description: 'Get a free project quote'
  },
  {
    name: 'View Portfolio',
    href: '/portfolio',
    icon: 'portfolio',
    description: 'See our latest work'
  },
  {
    name: 'Read Blog',
    href: '/blog',
    icon: 'blog',
    description: 'Latest insights and tips'
  }
] as const
