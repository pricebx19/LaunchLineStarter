/**
 * Block Registry System for 1:1 Wagtail Block to Vue Component Mapping
 * This creates a powerful, flexible system for dynamic content rendering
 */

import { type Component } from 'vue'

// Block metadata interface
export interface BlockMetadata {
  name: string
  displayName: string
  description: string
  category: 'content' | 'layout' | 'interactive' | 'media' | 'forms' | 'navigation'
  icon: string
  component: () => Promise<Component>
  props: BlockPropMapping[]
  requiredProps: string[]
  optionalProps: string[]
  validation?: (blockData: any) => boolean
  fallbackComponent?: () => Promise<Component>
}

// Prop mapping interface for dynamic prop transformation
export interface BlockPropMapping {
  blockField: string
  componentProp: string
  transform?: (value: any) => any
  defaultValue?: any
  required?: boolean
}

// Block registry type
export type BlockRegistry = Record<string, BlockMetadata>

/**
 * Core Block Registry - 1:1 mapping of Wagtail blocks to Vue components
 */
export const BLOCK_REGISTRY: BlockRegistry = {
  // === CORE CONTENT BLOCKS ===
  hero: {
    name: 'hero',
    displayName: 'Hero Section',
    description: 'Large hero section with heading, subheading, CTA and background image',
    category: 'content',
    icon: 'image',
    component: () => import('../../components/sections/hero/Hero.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title', required: true },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'cta_text', componentProp: 'ctaText' },
      { blockField: 'cta_link', componentProp: 'ctaLink' },
      { 
        blockField: 'background_image', 
        componentProp: 'backgroundImage',
        transform: (value: any) => value?.url || value
      }
    ],
    requiredProps: ['heading'],
    optionalProps: ['subheading', 'cta_text', 'cta_link', 'background_image']
  },

  features: {
    name: 'features',
    displayName: 'Feature Grid',
    description: 'Grid of features with icons, titles and descriptions',
    category: 'content',
    icon: 'list-ul',
    component: () => import('../../components/sections/features/FeatureGrid.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'features', componentProp: 'features', required: true }
    ],
    requiredProps: ['features'],
    optionalProps: ['heading', 'subheading']
  },

  testimonial: {
    name: 'testimonial',
    displayName: 'Testimonial',
    description: 'Customer testimonial with quote, author and company',
    category: 'content',
    icon: 'openquote',
    component: () => import('../../components/ui/display/Testimonial.vue'),
    props: [
      { blockField: 'quote', componentProp: 'quote', required: true },
      { blockField: 'author_name', componentProp: 'authorName', required: true },
      { blockField: 'author_title', componentProp: 'authorTitle' },
      { blockField: 'company', componentProp: 'company' },
      { 
        blockField: 'author_image', 
        componentProp: 'authorImage',
        transform: (value: any) => value?.url || value
      }
    ],
    requiredProps: ['quote', 'author_name'],
    optionalProps: ['author_title', 'company', 'author_image']
  },

  cta: {
    name: 'cta',
    displayName: 'Call to Action',
    description: 'Call-to-action section with heading, text and button',
    category: 'interactive',
    icon: 'plus-inverse',
    component: () => import('../../components/sections/cta/components/CTA.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title', required: true },
      { blockField: 'text', componentProp: 'subtitle' },
      { blockField: 'button_text', componentProp: 'primaryCtaText', required: true },
      { blockField: 'button_link', componentProp: 'primaryCtaLink', required: true },
      { blockField: 'background_color', componentProp: 'backgroundColor', defaultValue: 'primary' }
    ],
    requiredProps: ['heading', 'button_text', 'button_link'],
    optionalProps: ['text', 'background_color']
  },

  text: {
    name: 'text',
    displayName: 'Rich Text',
    description: 'Rich text content with formatting options',
    category: 'content',
    icon: 'doc-full',
    component: () => import('../../components/blocks/TextBlock.vue'),
    props: [
      { blockField: 'content', componentProp: 'content', required: true }
    ],
    requiredProps: ['content'],
    optionalProps: []
  },

  image: {
    name: 'image',
    displayName: 'Image',
    description: 'Image with optional caption and alignment',
    category: 'media',
    icon: 'image',
    component: () => import('../../components/blocks/ImageBlock.vue'),
    props: [
      { 
        blockField: 'image', 
        componentProp: 'src', 
        required: true,
        transform: (value: any) => value?.url || value
      },
      { blockField: 'caption', componentProp: 'caption' },
      { blockField: 'alignment', componentProp: 'alignment', defaultValue: 'center' }
    ],
    requiredProps: ['image'],
    optionalProps: ['caption', 'alignment']
  },

  // === METRICS & STATISTICS ===
  statistics: {
    name: 'statistics',
    displayName: 'Statistics',
    description: 'Display key metrics and statistics',
    category: 'content',
    icon: 'chart-line',
    component: () => import('../../components/sections/WagtailStatisticsSection.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'metrics', componentProp: 'metrics', required: true }
    ],
    requiredProps: ['metrics'],
    optionalProps: ['heading']
  },

  // === SERVICE-SPECIFIC BLOCKS ===
  service_packages: {
    name: 'service_packages',
    displayName: 'Service Packages',
    description: 'Service packages with pricing and features',
    category: 'content',
    icon: 'list-ul',
    component: () => import('../../components/sections/WagtailServicePackages.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'packages', componentProp: 'packages', required: true }
    ],
    requiredProps: ['packages'],
    optionalProps: ['heading', 'subheading']
  },

  ala_carte_services: {
    name: 'ala_carte_services',
    displayName: 'A La Carte Services',
    description: 'Individual services with pricing and categories',
    category: 'content',
    icon: 'list-ul',
    component: () => import('../../components/sections/WagtailAlaCarteServices.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'services', componentProp: 'services', required: true }
    ],
    requiredProps: ['services'],
    optionalProps: ['heading', 'subheading']
  },

  faq_section: {
    name: 'faq_section',
    displayName: 'FAQ Section',
    description: 'Frequently asked questions with expandable answers',
    category: 'interactive',
    icon: 'help',
    component: () => import('../../components/sections/WagtailFAQSection.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'faqs', componentProp: 'faqs', required: true }
    ],
    requiredProps: ['faqs'],
    optionalProps: ['heading', 'subheading']
  },

  // === PORTFOLIO-SPECIFIC BLOCKS ===
  portfolio_projects: {
    name: 'portfolio_projects',
    displayName: 'Portfolio Projects',
    description: 'Showcase of portfolio projects with filters',
    category: 'content',
    icon: 'image',
    component: () => import('../../components/sections/WagtailPortfolioProjects.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'projects', componentProp: 'projects', required: true }
    ],
    requiredProps: ['projects'],
    optionalProps: ['heading', 'subheading']
  },

  case_studies: {
    name: 'case_studies',
    displayName: 'Case Studies',
    description: 'Success stories and case studies',
    category: 'content',
    icon: 'doc-full',
    component: () => import('../../components/sections/WagtailCaseStudies.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'case_studies', componentProp: 'caseStudies', required: true }
    ],
    requiredProps: ['case_studies'],
    optionalProps: ['heading', 'subheading']
  },

  technologies: {
    name: 'technologies',
    displayName: 'Technologies',
    description: 'Technology stack showcase',
    category: 'content',
    icon: 'cog',
    component: () => import('../../components/sections/WagtailTechnologies.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'technologies', componentProp: 'technologies', required: true }
    ],
    requiredProps: ['technologies'],
    optionalProps: ['heading', 'subheading']
  },

  // === CONTACT-SPECIFIC BLOCKS ===
  contact_info: {
    name: 'contact_info',
    displayName: 'Contact Information',
    description: 'Company contact details and information',
    category: 'content',
    icon: 'mail',
    component: () => import('../../components/blocks/ContactInfoBlock.vue'),
    props: [
      { blockField: 'company_name', componentProp: 'companyName', required: true },
      { blockField: 'company_description', componentProp: 'companyDescription' },
      { blockField: 'phone', componentProp: 'phone' },
      { blockField: 'email', componentProp: 'email' },
      { blockField: 'address_line_1', componentProp: 'addressLine1' },
      { blockField: 'address_line_2', componentProp: 'addressLine2' }
    ],
    requiredProps: ['company_name'],
    optionalProps: ['company_description', 'phone', 'email', 'address_line_1', 'address_line_2']
  },

  social_links: {
    name: 'social_links',
    displayName: 'Social Media Links',
    description: 'Social media links and profiles',
    category: 'navigation',
    icon: 'group',
    component: () => import('../../components/blocks/SocialLinksBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'social_links', componentProp: 'socialLinks', required: true }
    ],
    requiredProps: ['social_links'],
    optionalProps: ['heading']
  },

  // === ADVANCED BLOCKS ===
  video: {
    name: 'video',
    displayName: 'Video',
    description: 'Video embed with optional poster image',
    category: 'media',
    icon: 'media',
    component: () => import('../../components/blocks/VideoBlock.vue'),
    props: [
      { blockField: 'video_url', componentProp: 'videoUrl', required: true },
      { blockField: 'title', componentProp: 'title' },
      { blockField: 'description', componentProp: 'description' },
      { 
        blockField: 'poster_image', 
        componentProp: 'posterImage',
        transform: (value: any) => value?.url || value
      },
      { blockField: 'autoplay', componentProp: 'autoplay', defaultValue: false },
      { blockField: 'controls', componentProp: 'controls', defaultValue: true }
    ],
    requiredProps: ['video_url'],
    optionalProps: ['title', 'description', 'poster_image', 'autoplay', 'controls']
  },

  gallery: {
    name: 'gallery',
    displayName: 'Image Gallery',
    description: 'Image gallery with multiple layouts',
    category: 'media',
    icon: 'image',
    component: () => import('../../components/blocks/GalleryBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { 
        blockField: 'images', 
        componentProp: 'images', 
        required: true,
        transform: (value: any[]) => value?.map(img => img?.url || img) || []
      },
      { blockField: 'layout', componentProp: 'layout', defaultValue: 'grid' },
      { blockField: 'columns', componentProp: 'columns', defaultValue: '3' }
    ],
    requiredProps: ['images'],
    optionalProps: ['heading', 'layout', 'columns']
  },

  code: {
    name: 'code',
    displayName: 'Code Block',
    description: 'Code block with syntax highlighting',
    category: 'content',
    icon: 'code',
    component: () => import('../../components/blocks/CodeBlock.vue'),
    props: [
      { blockField: 'code', componentProp: 'code', required: true },
      { blockField: 'language', componentProp: 'language', defaultValue: 'javascript' },
      { blockField: 'show_line_numbers', componentProp: 'showLineNumbers', defaultValue: true },
      { blockField: 'copy_button', componentProp: 'copyButton', defaultValue: true }
    ],
    requiredProps: ['code'],
    optionalProps: ['language', 'show_line_numbers', 'copy_button']
  },

  accordion: {
    name: 'accordion',
    displayName: 'Accordion',
    description: 'Expandable accordion with multiple items',
    category: 'interactive',
    icon: 'list-ol',
    component: () => import('../../components/blocks/AccordionBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'items', componentProp: 'items', required: true }
    ],
    requiredProps: ['items'],
    optionalProps: ['heading']
  },

  tabs: {
    name: 'tabs',
    displayName: 'Tabs',
    description: 'Tabbed content interface',
    category: 'interactive',
    icon: 'list-ol',
    component: () => import('../../components/blocks/TabsBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'tabs', componentProp: 'tabs', required: true }
    ],
    requiredProps: ['tabs'],
    optionalProps: ['heading']
  },

  pricing_table: {
    name: 'pricing_table',
    displayName: 'Pricing Table',
    description: 'Pricing table with multiple tiers',
    category: 'content',
    icon: 'list-ul',
    component: () => import('../../components/blocks/PricingTableBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'subheading', componentProp: 'subtitle' },
      { blockField: 'plans', componentProp: 'plans', required: true }
    ],
    requiredProps: ['plans'],
    optionalProps: ['heading', 'subheading']
  },

  timeline: {
    name: 'timeline',
    displayName: 'Timeline',
    description: 'Timeline with events and milestones',
    category: 'content',
    icon: 'list-ol',
    component: () => import('../../components/blocks/TimelineBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'events', componentProp: 'events', required: true }
    ],
    requiredProps: ['events'],
    optionalProps: ['heading']
  },

  comparison_table: {
    name: 'comparison_table',
    displayName: 'Comparison Table',
    description: 'Comparison table for features or products',
    category: 'content',
    icon: 'table',
    component: () => import('../../components/blocks/ComparisonTableBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'columns', componentProp: 'columns', required: true },
      { blockField: 'rows', componentProp: 'rows', required: true }
    ],
    requiredProps: ['columns', 'rows'],
    optionalProps: ['heading']
  },

  form: {
    name: 'form',
    displayName: 'Form',
    description: 'Contact or lead generation form',
    category: 'forms',
    icon: 'form',
    component: () => import('../../components/blocks/FormBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'description', componentProp: 'description' },
      { blockField: 'fields', componentProp: 'fields', required: true },
      { blockField: 'submit_text', componentProp: 'submitText', defaultValue: 'Submit' },
      { blockField: 'success_message', componentProp: 'successMessage', defaultValue: 'Thank you for your submission!' }
    ],
    requiredProps: ['fields'],
    optionalProps: ['heading', 'description', 'submit_text', 'success_message']
  },

  map: {
    name: 'map',
    displayName: 'Map',
    description: 'Interactive map with location marker',
    category: 'interactive',
    icon: 'site',
    component: () => import('../../components/blocks/MapBlock.vue'),
    props: [
      { blockField: 'address', componentProp: 'address', required: true },
      { blockField: 'zoom', componentProp: 'zoom', defaultValue: 15 },
      { blockField: 'height', componentProp: 'height', defaultValue: 400 },
      { blockField: 'show_marker', componentProp: 'showMarker', defaultValue: true },
      { blockField: 'marker_title', componentProp: 'markerTitle' }
    ],
    requiredProps: ['address'],
    optionalProps: ['zoom', 'height', 'show_marker', 'marker_title']
  },

  progress_bars: {
    name: 'progress_bars',
    displayName: 'Progress Bars',
    description: 'Progress bars for skills or completion',
    category: 'content',
    icon: 'chart-line',
    component: () => import('../../components/blocks/ProgressBarBlock.vue'),
    props: [
      { blockField: 'heading', componentProp: 'title' },
      { blockField: 'bars', componentProp: 'bars', required: true }
    ],
    requiredProps: ['bars'],
    optionalProps: ['heading']
  }
}

/**
 * Get block metadata by name
 */
export function getBlockMetadata(blockName: string): BlockMetadata | null {
  return BLOCK_REGISTRY[blockName] || null
}

/**
 * Get all blocks by category
 */
export function getBlocksByCategory(category: BlockMetadata['category']): BlockMetadata[] {
  return Object.values(BLOCK_REGISTRY).filter(block => block.category === category)
}

/**
 * Get all available block names
 */
export function getAllBlockNames(): string[] {
  return Object.keys(BLOCK_REGISTRY)
}

/**
 * Validate block data against metadata
 */
export function validateBlockData(blockName: string, blockData: any): boolean {
  const metadata = getBlockMetadata(blockName)
  if (!metadata) return false

  // Check required props
  for (const requiredProp of metadata.requiredProps) {
    const propMapping = metadata.props.find(p => p.blockField === requiredProp)
    if (!propMapping) continue

    const value = blockData[requiredProp]
    if (value === undefined || value === null || value === '') {
      return false
    }
  }

  // Run custom validation if provided
  if (metadata.validation) {
    return metadata.validation(blockData)
  }

  return true
}

/**
 * Transform block data to component props
 */
export function transformBlockToProps(blockName: string, blockData: any): Record<string, any> {
  const metadata = getBlockMetadata(blockName)
  if (!metadata) return {}

  const props: Record<string, any> = {}

  for (const propMapping of metadata.props) {
    const blockValue = blockData[propMapping.blockField]
    
    if (blockValue !== undefined) {
      // Apply transformation if provided
      const transformedValue = propMapping.transform 
        ? propMapping.transform(blockValue)
        : blockValue

      // Use default value if transformed value is empty and default is provided
      const finalValue = (transformedValue === undefined || transformedValue === null || transformedValue === '') 
        ? propMapping.defaultValue 
        : transformedValue

      if (finalValue !== undefined) {
        props[propMapping.componentProp] = finalValue
      }
    } else if (propMapping.defaultValue !== undefined) {
      props[propMapping.componentProp] = propMapping.defaultValue
    }
  }

  return props
}

/**
 * Get component for block type with fallback support
 */
export async function getBlockComponent(blockName: string): Promise<Component | null> {
  const metadata = getBlockMetadata(blockName)
  if (!metadata) return null

  try {
    return await metadata.component()
  } catch (error) {
    console.warn(`Failed to load component for block "${blockName}":`, error)
    
    // Try fallback component if available
    if (metadata.fallbackComponent) {
      try {
        return await metadata.fallbackComponent()
      } catch (fallbackError) {
        console.error(`Fallback component also failed for block "${blockName}":`, fallbackError)
      }
    }
    
    return null
  }
}

/**
 * Register a new block type dynamically
 */
export function registerBlock(blockName: string, metadata: BlockMetadata): void {
  BLOCK_REGISTRY[blockName] = metadata
}

/**
 * Unregister a block type
 */
export function unregisterBlock(blockName: string): void {
  delete BLOCK_REGISTRY[blockName]
}

/**
 * Get block registry statistics
 */
export function getRegistryStats() {
  const blocks = Object.values(BLOCK_REGISTRY)
  const categories = blocks.reduce((acc, block) => {
    acc[block.category] = (acc[block.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalBlocks: blocks.length,
    categories,
    blocksByCategory: Object.entries(categories).map(([category, count]) => ({
      category,
      count,
      blocks: blocks.filter(b => b.category === category).map(b => b.name)
    }))
  }
}
