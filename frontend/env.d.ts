/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_ERROR_REPORTING: string
  readonly VITE_FORMSPREE_ENDPOINT: string
  readonly VITE_DEV_MODE: string
  readonly VITE_DEBUG: string
  // Feature flags
  readonly VITE_BLOG_PAGES: string
  readonly VITE_ROCKET_ANIMATION: string
  readonly VITE_WAGTAIL_NAVBAR: string
  readonly VITE_WAGTAIL_FOOTER: string
  readonly VITE_WAGTAIL_LAYOUT: string
  readonly VITE_WAGTAIL_HERO: string
  readonly VITE_WAGTAIL_FEATURES: string
  readonly VITE_WAGTAIL_TESTIMONIALS: string
  readonly VITE_WAGTAIL_CTA: string
  readonly VITE_WAGTAIL_BLOG: string
  readonly VITE_WAGTAIL_PORTFOLIO: string
  readonly VITE_WAGTAIL_SERVICES: string
  readonly VITE_WAGTAIL_CONTACT_FORM: string
  readonly VITE_WAGTAIL_NEWSLETTER: string
  readonly VITE_WAGTAIL_SEO: string
  readonly VITE_WAGTAIL_META: string
  readonly VITE_WAGTAIL_ANIMATIONS: string
  readonly VITE_WAGTAIL_PARTICLES: string
  readonly VITE_WAGTAIL_LAZY_LOADING: string
  readonly VITE_WAGTAIL_CACHING: string
  readonly VITE_WAGTAIL_AI_CONTENT: string
  readonly VITE_WAGTAIL_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}