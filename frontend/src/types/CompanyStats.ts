export interface CompanyStat {
  value: number
  suffix: string
  label: string
  description: string
}

export interface CompanyStatsData {
  badgeText: string
  title: string
  description: string
  bottomText: string
  stats: CompanyStat[]
}
