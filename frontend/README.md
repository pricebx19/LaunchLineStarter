# LaunchLine Frontend

A modern, responsive frontend built with Vue 3, TypeScript, and Tailwind CSS for the LaunchLine starter template.

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official Vue.js routing library
- **pnpm** - Fast, disk space efficient package manager

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CTA.vue          # Call-to-action section
│   │   ├── FeatureGrid.vue  # Feature showcase grid
│   │   ├── Footer.vue       # Site footer
│   │   ├── Hero.vue         # Hero section
│   │   ├── Navbar.vue       # Navigation bar
│   │   └── Testimonial.vue  # Customer testimonials
│   ├── pages/               # Page-level components
│   │   ├── About.vue        # About page
│   │   ├── Blog.vue         # Blog listing page
│   │   ├── Contact.vue      # Contact form page
│   │   ├── Home.vue         # Homepage
│   │   └── Services.vue     # Services page
│   ├── lib/                 # Utility libraries
│   │   ├── api.ts          # API client with TypeScript types
│   │   └── seo.ts          # SEO composable
│   ├── App.vue             # Main app component
│   ├── main.ts             # Application entry point
│   ├── router.ts           # Vue Router configuration
│   └── app.css             # Global styles with Tailwind
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.cjs      # PostCSS configuration
└── .eslintrc.cjs           # ESLint configuration
```

## 🎨 Design System

### Colors
- **Primary**: `#0EA5E9` (Sky Blue)
- **Accent**: `#94A3B8` (Slate Gray)
- **Dark Theme**: Gray-900 background with carefully crafted contrast

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Tailwind's default type scale
- **Weight**: 300, 400, 500, 600, 700

### Components
- Accessible form controls with focus states
- Dark theme optimized design
- Responsive grid layouts
- Subtle animations with `prefers-reduced-motion` support

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- pnpm 8+

### Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm type-check

# Lint code
pnpm lint
```

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# App Configuration
VITE_APP_TITLE=LaunchLine - Professional Launch Solutions
VITE_APP_DESCRIPTION=Professional launch solutions designed to accelerate your business growth

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
```

## 📡 API Integration

The frontend connects to a Django/Wagtail backend via REST API:

### Endpoints
- `GET /api/pages/home/` - Homepage content
- `GET /api/blog/` - Blog post listing (paginated)
- `GET /api/blog/:slug/` - Individual blog post
- `POST /api/leads/` - Lead form submissions

### API Client
The `src/lib/api.ts` file provides:
- TypeScript interfaces for all API responses
- Error handling with graceful fallbacks
- Centralized configuration
- Type-safe API calls

Example usage:
```typescript
import { api } from '@/lib/api'

// Get homepage data
const { data, success, error } = await api.getHomePage()

// Submit a lead
const response = await api.submitLead({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in your services',
  source: 'contact-form'
})
```

## 🔍 SEO

The SEO composable (`src/lib/seo.ts`) provides:
- Dynamic meta tag management
- Open Graph support
- Twitter Card support
- Canonical URLs
- Per-page customization

Example usage:
```typescript
import { useSeo } from '@/lib/seo'

const { updateSeo } = useSeo()

updateSeo({
  title: 'About - LaunchLine',
  description: 'Learn more about LaunchLine...',
  ogTitle: 'About LaunchLine',
  ogDescription: 'Learn more about LaunchLine...',
  canonical: window.location.origin + '/about'
})
```

## 📱 Responsive Design

- **Mobile-first**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Tailwind's default breakpoints (sm, md, lg, xl, 2xl)
- **Navigation**: Collapsible mobile menu
- **Forms**: Touch-friendly form controls
- **Images**: Responsive images with proper aspect ratios

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Motion**: Respects `prefers-reduced-motion`

## 🔧 Customization

### Brand Colors
Update `tailwind.config.cjs`:
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#YOUR_PRIMARY_COLOR',
        accent: '#YOUR_ACCENT_COLOR',
      }
    }
  }
}
```

### Fonts
Update the Google Fonts import in `index.html` and the font family in `tailwind.config.cjs`.

### Components
Components are designed to be easily customizable via props and slots. Check individual component files for available customization options.

## 📦 Build & Deployment

### Production Build
```bash
pnpm build
```
Outputs to `dist/` directory.

### Environment-Specific Builds
Create environment-specific `.env` files:
- `.env.local` - Local development overrides
- `.env.production` - Production environment variables

### Deployment Targets
The build output is compatible with:
- Static hosting (Netlify, Vercel, GitHub Pages)
- CDN deployment
- Docker containers
- Traditional web servers (Apache, Nginx)

## 🚨 Error Handling

- **API Errors**: Graceful degradation with fallback content
- **Network Issues**: Retry mechanisms and offline indicators
- **Form Validation**: Client-side validation with server-side backup
- **404 Errors**: Custom error pages with helpful navigation

## 🎯 Performance

### Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images load on demand
- **Bundle Analysis**: Use `pnpm build --analyze` to analyze bundle size
- **Caching**: Proper cache headers for static assets

### Lighthouse Targets
- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥90

## 🧪 Testing

### Setup Testing (Future Enhancement)
```bash
# Install testing dependencies
pnpm add -D @vue/test-utils vitest jsdom

# Add test scripts to package.json
"test": "vitest",
"test:ui": "vitest --ui"
```

## 🔄 State Management

Currently uses Vue 3's Composition API for local state management. For larger applications, consider adding:
- **Pinia** - Vue's official state management library
- **VueUse** - Collection of essential Vue composition utilities

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new code
3. Write semantic, accessible HTML
4. Test responsive designs across breakpoints
5. Update documentation for significant changes

## 📄 License

This project is part of the LaunchLine starter template. See the main project LICENSE file for details.