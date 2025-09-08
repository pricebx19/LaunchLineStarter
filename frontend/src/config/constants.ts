// Application constants
export const APP_CONFIG = {
  NAME: 'LaunchLine LLC',
  TAGLINE: "We're taking off",
  SUBTAGLINE: 'Your brand. Your website. Done right.',
  EMAIL: 'hello@launchline.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: {
    STREET: '123 Innovation Drive',
    CITY: 'Tech City',
    STATE: 'TC',
    ZIP: '12345',
    COUNTRY: 'United States'
  }
} as const


// Route paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  BLOG: '/blog',
  CONTACT: '/contact'
} as const

// SEO defaults
export const SEO_DEFAULTS = {
  TITLE: `${APP_CONFIG.NAME} - ${APP_CONFIG.TAGLINE} | ${APP_CONFIG.SUBTAGLINE}`,
  DESCRIPTION: 'Professional web and software development services that launch your business into the digital stratosphere. We build custom solutions that drive real results.',
} as const
