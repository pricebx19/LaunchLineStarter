# Frontend-Backend Integration Setup Guide

This guide ensures your LaunchLine Starter frontend and backend are fully integrated and working together.

## 🚀 Quick Start

1. **Copy environment files:**

    ```bash
    cp env.local .env
    cp backend/env.example backend/.env
    cp frontend/env.local.example frontend/.env.local
    ```

2. **Start the development environment:**

    ```bash
    make up
    ```

3. **Test the integration:**
    ```bash
    python test_integration.py
    ```

## 🔧 Configuration Files

### Root Environment (.env)

-   `VITE_API_URL`: Frontend API endpoint (http://localhost:8000)
-   `CORS_ALLOWED_ORIGINS`: Backend CORS configuration
-   `DJANGO_SETTINGS_MODULE`: Django settings module

### Backend Environment (backend/.env)

-   Database configuration
-   CORS settings
-   Email configuration
-   Secret keys

### Frontend Environment (frontend/.env.local)

-   API base URL
-   Development mode settings

## 🌐 API Endpoints

### Backend API Structure

-   **Base URL**: `http://localhost:8000/api/v2/`
-   **Pages**: `/api/v2/pages/` - All page types including blog posts
-   **Blog Posts**: `/api/v2/pages/?type=pages.BlogPage` - Filtered blog pages
-   **Leads**: `/api/leads/` - Contact form submissions

### Frontend API Calls

-   **Blog List**: `api.getBlogList(page)` → `/api/v2/pages/?type=pages.BlogPage`
-   **Blog Post**: `api.getBlogPost(slug)` → `/api/v2/pages/?type=pages.BlogPage&slug={slug}`
-   **Lead Submission**: `api.submitLead(data)` → `/api/leads/`

## 🔒 CORS Configuration

The backend is configured to allow requests from:

-   `http://localhost:5173` (Vite dev server)
-   `http://127.0.0.1:5173`
-   `http://localhost:3000` (Alternative frontend port)
-   `http://127.0.0.1:3000`
-   `http://localhost` (Nginx proxy)
-   `http://127.0.0.1`

## 📊 Data Flow

### Blog Posts

1. Frontend calls `api.getBlogList()`
2. Backend filters pages by type `pages.BlogPage`
3. Response includes `items` array and `meta` pagination
4. Frontend transforms data to match `BlogPage` interface

### Lead Submissions

1. Frontend form submits to `api.submitLead()`
2. Backend validates and stores lead data
3. Email notification sent (in development: console output)
4. Success/error response returned to frontend

## 🧪 Testing Integration

### Manual Testing

1. **Backend Health**: Visit `http://localhost:8000/admin/login/`
2. **API Endpoints**: Visit `http://localhost:8000/api/v2/pages/`
3. **Frontend**: Visit `http://localhost:5173` (or `http://localhost` via Nginx)

### Automated Testing

```bash
# Run integration tests
python test_integration.py

# Run backend tests
make test

# Run frontend tests (if configured)
cd frontend && npm test
```

## 🐛 Troubleshooting

### Common Issues

#### CORS Errors

-   Check `CORS_ALLOWED_ORIGINS` in backend settings
-   Ensure frontend URL is in the allowed origins list
-   Verify CORS middleware is enabled

#### API 404 Errors

-   Check backend is running on port 8000
-   Verify API endpoints are registered in `urls.py`
-   Check Django settings module

#### Frontend Can't Connect

-   Verify `VITE_API_URL` is set correctly
-   Check backend is accessible at the API URL
-   Ensure no firewall blocking localhost connections

### Debug Commands

```bash
# Check backend logs
make logs-backend

# Check all service logs
make logs

# Restart services
make down && make up

# Check service health
make health
```

## 🔄 Development Workflow

1. **Start services**: `make up`
2. **Make changes** to frontend or backend code
3. **Test changes** with `python test_integration.py`
4. **View logs** if issues arise: `make logs`
5. **Restart services** if needed: `make down && make up`

## 📝 Environment Variables Reference

| Variable               | Description           | Default                 |
| ---------------------- | --------------------- | ----------------------- |
| `VITE_API_URL`         | Frontend API base URL | `http://localhost:8000` |
| `CORS_ALLOWED_ORIGINS` | Backend CORS origins  | Localhost URLs          |
| `DEBUG`                | Django debug mode     | `True`                  |
| `SECRET_KEY`           | Django secret key     | Dev key                 |
| `DATABASE_URL`         | Database connection   | SQLite/PostgreSQL       |

## 🎯 Next Steps

After successful integration:

1. **Add authentication** if needed
2. **Implement caching** for better performance
3. **Add monitoring** and logging
4. **Set up CI/CD** pipeline
5. **Configure production** environment

## 📚 Additional Resources

-   [Django REST Framework Documentation](https://www.django-rest-framework.org/)
-   [Wagtail API Documentation](https://docs.wagtail.org/en/stable/advanced_topics/api/v2/configuration.html)
-   [Vue.js API Integration](https://vuejs.org/guide/essentials/application.html)
-   [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
