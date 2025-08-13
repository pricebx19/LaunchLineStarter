import { ref } from 'vue'

export interface SeoData {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
}

const currentSeo = ref<SeoData>({})

export function useSeo() {
  const updateSeo = (seoData: SeoData) => {
    currentSeo.value = { ...currentSeo.value, ...seoData }
    
    // Update document title
    if (seoData.title) {
      document.title = seoData.title
    }
    
    // Update meta description
    if (seoData.description) {
      updateMetaTag('name', 'description', seoData.description)
    }
    
    // Update Open Graph tags
    if (seoData.ogTitle) {
      updateMetaTag('property', 'og:title', seoData.ogTitle)
    }
    if (seoData.ogDescription) {
      updateMetaTag('property', 'og:description', seoData.ogDescription)
    }
    if (seoData.ogImage) {
      updateMetaTag('property', 'og:image', seoData.ogImage)
    }
    
    // Update Twitter Card tags
    if (seoData.twitterTitle) {
      updateMetaTag('name', 'twitter:title', seoData.twitterTitle)
    }
    if (seoData.twitterDescription) {
      updateMetaTag('name', 'twitter:description', seoData.twitterDescription)
    }
    if (seoData.twitterImage) {
      updateMetaTag('name', 'twitter:image', seoData.twitterImage)
    }
    
    // Update canonical link
    if (seoData.canonical) {
      updateCanonicalLink(seoData.canonical)
    }
  }
  
  const updateMetaTag = (attribute: string, name: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }
  
  const updateCanonicalLink = (href: string) => {
    let element = document.querySelector('link[rel="canonical"]')
    
    if (element) {
      element.setAttribute('href', href)
    } else {
      element = document.createElement('link')
      element.setAttribute('rel', 'canonical')
      element.setAttribute('href', href)
      document.head.appendChild(element)
    }
  }
  
  return {
    currentSeo: currentSeo.value,
    updateSeo
  }
}