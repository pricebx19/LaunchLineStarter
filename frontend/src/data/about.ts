import type { AboutHeroData, AboutSectionData, MissionData, ProcessData, TeamData, ValueData, AnimatedStatisticsData } from '../types/About'

export const ABOUT_HERO_DATA: AboutHeroData = {
  title: 'About LaunchLine',
  subtitle: "We're dedicated to transforming businesses into digital powerhouses through cutting-edge web and software development.",
  description: "Our mission is to provide professional solutions that launch your brand into the digital stratosphere.",
  tagline: "We're taking off.",
  background: 'starry'
}

export const ABOUT_SECTIONS: AboutSectionData[] = [
  {
    id: 'mission',
    title: 'Our Mission',
    subtitle: 'Transforming businesses through technology',
    content: 'We believe every business deserves access to world-class digital solutions that drive real results.',
    image: '/images/about/mission.jpg',
    order: 1
  },
  {
    id: 'vision',
    title: 'Our Vision',
    subtitle: 'A digital-first future for all',
    content: 'To be the leading force in democratizing advanced web technologies for businesses of all sizes.',
    image: '/images/about/vision.jpg',
    order: 2
  },
  {
    id: 'values',
    title: 'Our Values',
    subtitle: 'What drives us forward',
    content: 'Innovation, integrity, and impact guide everything we do in our quest to launch your success.',
    image: '/images/about/values.jpg',
    order: 3
  }
]

export const MISSION_DATA: MissionData = {
  title: 'Our Mission',
  subtitle: 'Transforming businesses through technology',
  description: 'We believe every business deserves access to world-class digital solutions that drive real results.',
  features: [
    {
      title: 'Innovation',
      description: 'Cutting-edge technologies and creative solutions',
      icon: 'lightbulb'
    },
    {
      title: 'Excellence',
      description: 'Uncompromising quality in every project',
      icon: 'star'
    },
    {
      title: 'Partnership',
      description: 'Collaborative approach to your success',
      icon: 'handshake'
    }
  ]
}

export const PROCESS_DATA: ProcessData = {
  title: 'Our Process',
  subtitle: 'How we launch your success',
  description: 'A proven methodology that ensures your project delivers exceptional results.',
  steps: [
    {
      id: 'discover',
      title: 'Discover',
      description: 'We dive deep into your business goals and requirements',
      icon: 'search',
      order: 1
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Creating user-centered designs that convert',
      icon: 'palette',
      order: 2
    },
    {
      id: 'develop',
      title: 'Develop',
      description: 'Building robust, scalable solutions',
      icon: 'code',
      order: 3
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Launching your project to success',
      icon: 'rocket',
      order: 4
    }
  ]
}

export const TEAM_DATA: TeamData = {
  title: 'Meet Our Team',
  subtitle: 'The experts behind your success',
  description: 'Our diverse team of developers, designers, and strategists work together to bring your vision to life.',
  members: [
    {
      id: 'john-doe',
      name: 'John Doe',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 8+ years of experience',
      image: '/images/team/john-doe.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
      }
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      role: 'UX Designer',
      bio: 'Creative designer focused on user experience',
      image: '/images/team/jane-smith.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/janesmith',
        dribbble: 'https://dribbble.com/janesmith',
        behance: 'https://behance.net/janesmith'
      }
    }
  ]
}

export const VALUES_DATA: ValueData = {
  title: 'Our Values',
  subtitle: 'What drives us forward',
  description: 'These core values guide every decision we make and every project we undertake.',
  values: [
    {
      title: 'Innovation',
      description: 'We embrace new technologies and creative approaches',
      icon: 'lightbulb',
      color: '#3B82F6'
    },
    {
      title: 'Integrity',
      description: 'Honest, transparent communication in everything we do',
      icon: 'shield',
      color: '#10B981'
    },
    {
      title: 'Impact',
      description: 'Delivering solutions that make a real difference',
      icon: 'target',
      color: '#F59E0B'
    }
  ]
}

export const ANIMATED_STATISTICS_DATA: AnimatedStatisticsData = {
  title: 'The LaunchLine Promise',
  subtitle: 'Where Values Meet Innovation',
  description: 'Every line of code, every design decision, every client interaction is guided by these four fundamental values. Together, they form the constellation that lights our path to digital excellence.',
  ctaText: 'Experience Our Values',
  statistics: [
    {
      target: 100,
      suffix: '%',
      label: 'Value-Driven Decisions'
    },
    {
      target: 4,
      suffix: '+',
      label: 'Core Principles'
    },
    {
      target: '∞',
      suffix: '',
      label: 'Possibilities Unlocked'
    }
  ]
}
