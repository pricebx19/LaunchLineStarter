import type { BlogPost, Author, Category, Tag } from '../types/Content'

export const BLOG_CATEGORIES: Category[] = [
  { id: 'web-development', name: 'Web Development', slug: 'web-development', description: 'Latest trends and techniques in web development', color: '#3B82F6', postCount: 15 },
  { id: 'design', name: 'Design', slug: 'design', description: 'UI/UX design principles and best practices', color: '#8B5CF6', postCount: 12 },
  { id: 'business', name: 'Business', slug: 'business', description: 'Business insights and growth strategies', color: '#10B981', postCount: 8 },
  { id: 'technology', name: 'Technology', slug: 'technology', description: 'Emerging technologies and innovations', color: '#F59E0B', postCount: 20 },
  { id: 'tutorials', name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and tutorials', color: '#EF4444', postCount: 25 }
]

export const BLOG_TAGS: Tag[] = [
  { id: 'vue', name: 'Vue.js', slug: 'vue', postCount: 8 },
  { id: 'react', name: 'React', slug: 'react', postCount: 12 },
  { id: 'typescript', name: 'TypeScript', slug: 'typescript', postCount: 15 },
  { id: 'javascript', name: 'JavaScript', slug: 'javascript', postCount: 20 },
  { id: 'css', name: 'CSS', slug: 'css', postCount: 18 },
  { id: 'html', name: 'HTML', slug: 'html', postCount: 10 },
  { id: 'nodejs', name: 'Node.js', slug: 'nodejs', postCount: 6 },
  { id: 'python', name: 'Python', slug: 'python', postCount: 4 },
  { id: 'seo', name: 'SEO', slug: 'seo', postCount: 9 },
  { id: 'performance', name: 'Performance', slug: 'performance', postCount: 7 },
  { id: 'accessibility', name: 'Accessibility', slug: 'accessibility', postCount: 5 },
  { id: 'mobile', name: 'Mobile', slug: 'mobile', postCount: 11 }
]

export const BLOG_AUTHORS: Author[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    email: 'john@launchline.com',
    avatar: '/images/authors/john-doe.jpg',
    bio: 'Senior Full-Stack Developer with 8+ years of experience in web development and digital transformation.',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/johndoe', icon: 'twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
      { platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' }
    ]
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    email: 'jane@launchline.com',
    avatar: '/images/authors/jane-smith.jpg',
    bio: 'UX/UI Designer passionate about creating intuitive and beautiful user experiences.',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/janesmith', icon: 'twitter' },
      { platform: 'Dribbble', url: 'https://dribbble.com/janesmith', icon: 'dribbble' },
      { platform: 'Behance', url: 'https://behance.net/janesmith', icon: 'behance' }
    ]
  },
  {
    id: 'mike-wilson',
    name: 'Mike Wilson',
    email: 'mike@launchline.com',
    avatar: '/images/authors/mike-wilson.jpg',
    bio: 'Digital Marketing Specialist focused on SEO, content strategy, and growth hacking.',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/mikewilson', icon: 'twitter' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/mikewilson', icon: 'linkedin' }
    ]
  }
]

export const FEATURED_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-trends-2024',
    intro: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    content: [],
    author: BLOG_AUTHORS[0] || 'Anonymous',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    tags: [
      BLOG_TAGS[0]?.name || 'Technology',
      BLOG_TAGS[2]?.name || 'Web Development',
      BLOG_TAGS[3]?.name || 'Trends'
    ],
    category: BLOG_CATEGORIES[0]?.name || 'General',
    featured: true,
    image: '/images/blog/future-web-development.jpg',
    seoTitle: 'Future of Web Development: 2024 Trends | LaunchLine',
    seoDescription: 'Discover the latest web development trends for 2024 including AI, new frameworks, and emerging technologies.'
  },
  {
    id: '2',
    title: 'Building Accessible Web Applications: A Complete Guide',
    slug: 'building-accessible-web-applications-guide',
    intro: 'Learn how to create web applications that are accessible to all users, including those with disabilities.',
    content: [],
    author: BLOG_AUTHORS[1] || 'Anonymous',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readTime: 12,
    tags: [
      BLOG_TAGS[4]?.name || 'Accessibility',
      BLOG_TAGS[10]?.name || 'Best Practices',
      BLOG_TAGS[3]?.name || 'Development'
    ],
    category: BLOG_CATEGORIES[1]?.name || 'Tutorial',
    featured: true,
    image: '/images/blog/accessible-web-applications.jpg',
    seoTitle: 'Building Accessible Web Applications Guide | LaunchLine',
    seoDescription: 'Complete guide to building accessible web applications with best practices and WCAG compliance.'
  }
]

export const BLOG_SEARCH_SUGGESTIONS = [
  'Vue.js best practices',
  'TypeScript tips',
  'CSS Grid layouts',
  'JavaScript performance',
  'React hooks',
  'Web accessibility',
  'SEO optimization',
  'Mobile-first design',
  'API development',
  'Database design'
]

export const BLOG_FILTER_OPTIONS = {
  categories: BLOG_CATEGORIES,
  tags: BLOG_TAGS,
  authors: BLOG_AUTHORS,
  dateRanges: [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last year', value: '1y' },
    { label: 'All time', value: 'all' }
  ],
  sortOptions: [
    { label: 'Newest first', value: 'newest' },
    { label: 'Oldest first', value: 'oldest' },
    { label: 'Most popular', value: 'popular' },
    { label: 'Most read', value: 'read' },
    { label: 'Alphabetical', value: 'alphabetical' }
  ]
}
