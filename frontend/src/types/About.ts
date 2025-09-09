// About page related interfaces

export interface AboutHeroData {
  title: string
  subtitle: string
  description: string
  tagline: string
  background: 'starry' | 'gradient' | 'particles'
}

export interface AboutSectionData {
  id: string
  title: string
  subtitle: string
  content: string
  image: string
  order: number
}

export interface MissionData {
  title: string
  subtitle: string
  description: string
  features: MissionFeature[]
}

export interface MissionFeature {
  title: string
  description: string
  icon: string
}

export interface ProcessData {
  title: string
  subtitle: string
  description: string
  steps: ProcessStep[]
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export interface TeamData {
  title: string
  subtitle: string
  description: string
  members: TeamMember[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    github?: string
    twitter?: string
    dribbble?: string
    behance?: string
  }
}

export interface ValueData {
  title: string
  subtitle: string
  description: string
  values: Value[]
}

export interface Value {
  title: string
  description: string
  icon: string
  color: string
  iconPath?: string
}

export interface AnimatedStatisticsData {
  title: string
  subtitle: string
  description: string
  ctaText: string
  statistics: Statistic[]
}

export interface Statistic {
  target: string | number
  suffix: string
  label: string
  current?: string | number
}
