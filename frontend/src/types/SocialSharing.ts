export interface SocialLink {
  name: string
  class: string
  viewBox: string
  path: string
}

export interface SocialSharingProps {
  visible?: boolean
  url?: string
  title?: string
  description?: string
}

export interface SocialSharingWidgetProps {
  visible?: boolean
  url?: string
  title?: string
  description?: string
}