export interface FooterLink {
  name: string
  href: string
}

export interface FooterSocialLink {
  name: string
  href: string
  icon: string
}

export interface FooterData {
  companyName: string
  description: string
  tagline: string
  email: string
  phone: string
  quickLinks: FooterLink[]
  socialLinks: FooterSocialLink[]
}
