# LaunchLine Starter Template

A production-ready starter template for modern web applications, featuring Django + Wagtail backend and Vue 3 frontend.

## 🚀 Features

- **Backend**: Django 5 + Wagtail 6 (headless CMS)
- **Frontend**: Vue 3 + Vite + Tailwind CSS + TypeScript
- **Database**: PostgreSQL 16
- **API**: Wagtail API v2 + Django REST Framework
- **Development**: Docker Compose + Poetry + pnpm
- **Code Quality**: Pre-commit hooks, Black, Ruff, isort, mypy
- **SEO**: Built-in SEO utilities, sitemaps, structured data
- **Leads**: Contact form API with admin interface

## 📋 Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js 20+
- Poetry
- pnpm (recommended) or npm

## 🛠 Quick Start

### Option 1: Docker Development (Recommended)

```bash
# Clone the repository
git clone <your-repo-url> my-project
cd my-project

# Initial setup
make setup

# Start all services
make up

# Run migrations and seed data
make migrate
make seed

# Create admin user
make createsuperuser
```

Access your application:
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api/
- **Django Admin**: http://localhost/admin/
- **Wagtail CMS**: http://localhost/cms/
- **Mailhog** (email testing): http://localhost:8025

### Option 2: Local Development

```bash
# Backend setup
cd backend
poetry install
poetry run python manage.py migrate
poetry run python manage.py seed_data
poetry run python manage.py createsuperuser
poetry run python manage.py runserver

# Frontend setup (in another terminal)
cd frontend
pnpm install
pnpm dev
```

## 🏗 Project Structure

```
launchline-starter/
├── backend/                 # Django + Wagtail backend
│   ├── src/
│   │   ├── config/         # Django configuration
│   │   ├── core/           # Core utilities (SEO, management commands)
│   │   ├── pages/          # Wagtail pages and blocks
│   │   └── leads/          # Lead capture API
│   ├── tests/              # Backend tests
│   ├── Dockerfile
│   └── pyproject.toml      # Poetry configuration
├── frontend/               # Vue 3 + Vite frontend (handled by another agent)
├── ops/                    # Docker and deployment configuration
│   ├── docker-compose.dev.yml
│   └── nginx/
├── .env.example           # Environment variables template
└── Makefile              # Development commands
```

## 🔧 Development Commands

```bash
# Setup and cleanup
make setup          # Initial project setup
make clean          # Clean containers and cache

# Development
make up            # Start all services
make down          # Stop all services
make logs          # View service logs
make be            # Shell into backend container

# Database
make migrate       # Run Django migrations
make seed          # Seed database with sample content
make createsuperuser # Create Django admin user

# Code Quality
make fmt           # Format code (Black, isort)
make lint          # Run linters (Ruff, mypy)
make test          # Run tests
make test-cov      # Run tests with coverage

# View all commands
make help
```

## 🗄 Backend Architecture

### Page Models

- **HomePage**: Hero section with features, testimonials, and CTA
- **StandardPage**: Flexible content pages with StreamField
- **BlogIndexPage**: Blog listing page
- **BlogPage**: Individual blog posts

### StreamField Blocks

- **HeroBlock**: Hero sections with background images
- **FeatureGridBlock**: Feature grids with icons
- **TestimonialBlock**: Customer testimonials
- **CTABlock**: Call-to-action sections
- **TextBlock**: Rich text content
- **ImageBlock**: Images with captions

### API Endpoints

```
GET  /api/v2/pages/           # List all pages
GET  /api/v2/pages/{id}/      # Page detail
GET  /api/v2/blog/            # List blog posts
POST /api/leads/              # Create lead
GET  /admin/                  # Django admin
GET  /cms/                    # Wagtail CMS
```

## 🎨 Brand Customization

### Colors (Tailwind CSS)

Update `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#0EA5E9',    // Sky blue
        accent: '#94A3B8',     // Slate gray
      }
    }
  }
}
```

### Site Configuration

Update in Django admin or Wagtail CMS:
1. Go to `/admin/` or `/cms/`
2. Update site name and domain
3. Customize page content through Wagtail

## 📧 Email Configuration

### Development
Uses Mailhog for email testing:
- SMTP: localhost:1025
- Web UI: http://localhost:8025

### Production
Configure in `.env`:
```bash
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@domain.com
EMAIL_HOST_PASSWORD=your-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

## 🔒 Security

### Environment Variables
- Copy `.env.example` to `.env` and update values
- Never commit sensitive data to version control
- Use strong `SECRET_KEY` in production

### Production Settings
- Set `DEBUG=False`
- Configure `ALLOWED_HOSTS`
- Enable HTTPS redirects
- Set secure cookie flags

## 🚀 Deployment

### Railway (Recommended)

1. Connect GitHub repository
2. Set environment variables from `.env.example`
3. Deploy backend service
4. Deploy frontend service (static site)

### Docker Production

```bash
# Build production image
make build-prod

# Run with production settings
docker run -p 8000:8000 \
  -e DJANGO_SETTINGS_MODULE=config.settings.prod \
  launchline-starter-backend:latest
```

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
make test

# Run with coverage
make test-cov

# Run specific test
cd backend && poetry run python manage.py test leads.tests.test_api
```

### API Testing
```bash
# Test lead creation
curl -X POST http://localhost/api/leads/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message","source":"website"}'

# Test pages API
curl http://localhost/api/v2/pages/
```

## 📝 Content Management

### Wagtail CMS
1. Access at `/cms/`
2. Create and edit pages
3. Manage images and documents
4. Preview changes before publishing

### Lead Management
1. Access at `/admin/leads/lead/`
2. View submitted leads
3. Mark as processed
4. Export data

## 🔄 Updates and Maintenance

### Dependency Updates
```bash
# Backend dependencies
cd backend && poetry update

# Frontend dependencies
cd frontend && pnpm update

# Security updates
poetry run safety check
```

### Database Migrations
```bash
# Create migrations
cd backend && poetry run python manage.py makemigrations

# Apply migrations
make migrate
```

## 🐛 Troubleshooting

### Common Issues

**Port conflicts**: Ensure ports 80, 5432, 6379, 8025 are available

**Docker issues**: 
```bash
make clean
make up
```

**Database issues**:
```bash
make down
docker volume rm launchline_starter_postgres_data
make up
make migrate
make seed
```

**Permission issues**:
```bash
sudo chown -R $USER:$USER .
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

- Documentation: [Your docs URL]
- Issues: [GitHub Issues URL]
- Email: support@launchline.io

---

Built with ❤️ by LaunchLine