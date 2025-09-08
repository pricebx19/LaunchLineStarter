# Azure Static Web Apps Deployment Guide

This guide will help you deploy your LaunchLine frontend to Azure Static Web Apps.

## 🚀 Quick Setup

### 1. Create Azure Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"

### 2. Configure the Static Web App

**Basic Settings:**

-   **Subscription**: Your Azure subscription
-   **Resource Group**: Create new or use existing
-   **Name**: `launchline-frontend` (or your preferred name)
-   **Plan type**: Free (for development) or Standard (for production)
-   **Region**: Choose closest to your users

**Source:**

-   **Source**: GitHub
-   **Organization**: Your GitHub username/organization
-   **Repository**: Your repository name
-   **Branch**: `main` or `master`

**Build Details:**

-   **Build Presets**: Custom
-   **App location**: `/frontend`
-   **API location**: Leave empty (no API in this app)
-   **Output location**: `dist`

### 3. GitHub Secrets Configuration

After creating the Static Web App, you'll get an API token. Add these secrets to your GitHub repository:

**Required Secrets:**

```
AZURE_STATIC_WEB_APPS_API_TOKEN=<your-api-token>
```

**Environment Variables (Optional - for feature flags):**

```
VITE_API_URL=https://your-backend-domain.com
VITE_APP_TITLE=LaunchLine - Professional Launch Solutions
VITE_APP_DESCRIPTION=Professional launch solutions designed to accelerate your business growth
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mrbagvqo
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true

# Feature flags (set to 'true' to enable)
VITE_BLOG_PAGES=true
VITE_ROCKET_ANIMATION=true
VITE_WAGTAIL_CONTACT_FORM=true
VITE_WAGTAIL_BLOG=true
# ... other flags as needed
```

## 🔧 Configuration Files

The following files are already configured for Azure Static Web Apps:

### `staticwebapp.config.json`

-   **Routes**: SPA routing configuration
-   **Caching**: Optimized asset caching
-   **Security**: Security headers
-   **MIME types**: Proper content type handling

### `.github/workflows/azure-static-web-apps.yml`

-   **Build process**: Node.js setup and build
-   **Environment variables**: Secure secret management
-   **Deployment**: Automatic deployment on push/PR

## 📋 Deployment Process

### Automatic Deployment

1. **Push to main branch** → Triggers production deployment
2. **Create Pull Request** → Creates preview deployment
3. **Merge PR** → Updates production deployment

### Manual Deployment

```bash
# Install Azure CLI
az login
az staticwebapp create \
  --name launchline-frontend \
  --resource-group myResourceGroup \
  --source https://github.com/yourusername/yourrepo \
  --location "Central US" \
  --branch main \
  --app-location "/frontend" \
  --output-location "dist"
```

## 🌐 Custom Domain Setup

1. **In Azure Portal:**

    - Go to your Static Web App
    - Click "Custom domains"
    - Add your domain

2. **DNS Configuration:**

    - Add CNAME record pointing to your Static Web App URL
    - Or use A records with the provided IP addresses

3. **SSL Certificate:**
    - Azure automatically provides free SSL certificates
    - Certificate is automatically renewed

## 🔒 Security Features

### Built-in Security

-   **HTTPS**: Automatic SSL/TLS encryption
-   **Security Headers**: XSS protection, content type options
-   **CORS**: Configurable cross-origin policies

### Authentication (Optional)

Azure Static Web Apps supports built-in authentication:

-   **GitHub**: OAuth integration
-   **Azure AD**: Enterprise authentication
-   **Twitter, Google, Facebook**: Social logins

## 📊 Monitoring & Analytics

### Built-in Analytics

-   **Usage metrics**: Page views, unique visitors
-   **Performance**: Load times, error rates
-   **Geographic data**: User locations

### Custom Analytics

-   **Google Analytics**: Add tracking code
-   **Application Insights**: Azure monitoring
-   **Custom metrics**: Track feature usage

## 💰 Pricing

### Free Tier

-   **100 GB bandwidth/month**
-   **0.5 GB storage**
-   **Custom domains**: 2
-   **Staging environments**: 2

### Standard Tier

-   **1 TB bandwidth/month**
-   **100 GB storage**
-   **Custom domains**: Unlimited
-   **Staging environments**: Unlimited
-   **Advanced features**: Authentication, API integration

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**

-   Check Node.js version compatibility
-   Verify all dependencies are in package.json
-   Check environment variable configuration

**Routing Issues:**

-   Ensure `staticwebapp.config.json` is in the root
-   Verify SPA routing configuration
-   Check for conflicting routes

**Environment Variables:**

-   Verify secrets are set in GitHub
-   Check variable names match exactly
-   Ensure no typos in secret names

### Debug Commands

```bash
# Check build locally
cd frontend
npm run build

# Test production build
npm run preview

# Check Azure CLI
az staticwebapp list
az staticwebapp show --name your-app-name
```

## 📈 Performance Optimization

### Built-in Optimizations

-   **Global CDN**: Content delivered from edge locations
-   **Asset compression**: Automatic gzip compression
-   **Caching**: Optimized cache headers
-   **HTTP/2**: Modern protocol support

### Additional Optimizations

-   **Image optimization**: Use WebP format
-   **Code splitting**: Already configured in Vite
-   **Lazy loading**: Implement for heavy components
-   **Service workers**: Add for offline functionality

## 🔄 CI/CD Best Practices

### Branch Strategy

-   **main/master**: Production deployments
-   **develop**: Staging deployments
-   **feature branches**: Preview deployments

### Environment Management

-   **Development**: Local development
-   **Staging**: Preview deployments from PRs
-   **Production**: Main branch deployments

### Monitoring

-   **Build status**: GitHub Actions status
-   **Deployment logs**: Azure portal logs
-   **Performance**: Built-in analytics

## 📞 Support

### Azure Support

-   **Documentation**: [Azure Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
-   **Community**: [Azure Community Forums](https://docs.microsoft.com/en-us/answers/topics/azure-static-web-apps.html)
-   **Support**: Azure support plans

### GitHub Actions

-   **Documentation**: [GitHub Actions Docs](https://docs.github.com/en/actions)
-   **Marketplace**: [Azure Static Web Apps Action](https://github.com/marketplace/actions/azure-static-web-apps)

---

Your LaunchLine frontend is now ready for Azure Static Web Apps deployment! 🎉
