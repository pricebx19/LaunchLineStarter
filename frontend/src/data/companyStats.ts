import type { CompanyStatsData } from '../types/CompanyStats'

export const defaultCompanyStats: CompanyStatsData = {
  badgeText: 'BY THE NUMBERS',
  title: 'Launching Success Stories',
  description: 'Real metrics from real businesses that trusted us to transform their digital presence.',
  bottomText: 'Every project is a new mission, every launch a new success story waiting to be written.',
  stats: [
    {
      value: 150,
      suffix: '+',
      label: 'Websites Launched',
      description: 'Digital experiences that drive results'
    },
    {
      value: 95,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding expectations'
    },
    {
      value: 250,
      suffix: '%',
      label: 'Avg. Traffic Increase',
      description: 'Measurable growth in 6 months'
    },
    {
      value: 48,
      suffix: 'hrs',
      label: 'Avg. Response Time',
      description: 'Swift communication guaranteed'
    }
  ]
}
