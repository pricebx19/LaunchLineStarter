# Backend Deployment Requirements

## LaunchLine Starter Template - Production Deployment

This document provides a comprehensive checklist for deploying the LaunchLine Starter backend to production.

## 📋 **Pre-Deployment Checklist**

### ✅ **1. Environment Configuration**

#### **Required Environment Variables**

```bash
# Production Environment File (.env)

# Django Core Settings
DEBUG=False
SECRET_KEY=your-super-secure-secret-key-here-min-50-chars
DJANGO_SETTINGS_MODULE=config.settings.prod
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

# Database (PostgreSQL Required for Production)
DATABASE_URL=postgres://username:password@host:port/database_name

# CORS Configuration (Frontend URLs)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CORS_ALLOW_CREDENTIALS=True

# Email Configuration (Required for Lead Notifications)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@domain.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
LEAD_NOTIFICATION_EMAIL=admin@yourdomain.com

# Security Settings (HTTPS Required)
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# Cache Configuration (Redis Recommended)
CACHE_URL=redis://redis-host:6379/0

# Media Files (Cloud Storage Recommended)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
```

#### **Critical Security Requirements**

-   [ ] Generate strong SECRET_KEY (min 50 characters)
-   [ ] Set DEBUG=False
-   [ ] Configure ALLOWED_HOSTS with actual domain names
-   [ ] Set up HTTPS/SSL certificates
-   [ ] Configure CORS for frontend domains only
-   [ ] Set all secure cookie flags

---

### ✅ **2. Database Setup**

#### **PostgreSQL Production Database**

```sql
-- Create production database and user
CREATE DATABASE launchline_starter_prod;
CREATE USER launchline_prod WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE launchline_starter_prod TO launchline_prod;
ALTER USER launchline_prod CREATEDB;
```

#### **Required Database Tasks**

-   [ ] Set up PostgreSQL server (version 14+ recommended)
-   [ ] Create production database and user
-   [ ] Configure database backups
-   [ ] Set up connection pooling (pgbouncer recommended)
-   [ ] Run migrations: `python manage.py migrate`
-   [ ] Create cache table: `python manage.py createcachetable`

---

### ✅ **3. Initial Data Setup**

#### **Wagtail CMS Setup**

```bash
# Create superuser for Wagtail admin
python manage.py createsuperuser

# Optional: Load initial blog posts and content
python manage.py seed_data
```

#### **Required Admin Tasks**

-   [ ] Create superuser account for Wagtail admin
-   [ ] Access Wagtail admin at `/admin/`
-   [ ] Create initial blog posts (if using blog functionality)
-   [ ] Set up site settings and configure domain in Wagtail
-   [ ] Test lead submission functionality
-   [ ] Verify email notifications are working

---

### ✅ **4. Static Files & Media**

#### **Static Files Configuration**

```bash
# Collect static files for production
python manage.py collectstatic --noinput
```

#### **Recommended: AWS S3 Setup**

```python
# Add to production settings
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.StaticS3Boto3Storage'
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
```

#### **Static Files Checklist**

-   [ ] Configure static files collection
-   [ ] Set up media files storage (local or S3)
-   [ ] Configure Whitenoise for static files (if not using S3)
-   [ ] Test image uploads in Wagtail admin
-   [ ] Verify static files serve correctly

---

### ✅ **5. Email Configuration**

#### **Production Email Setup**

```python
# Recommended providers: SendGrid, Mailgun, AWS SES
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'  # or your provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
```

#### **Email Functionality Tests**

-   [ ] Configure SMTP settings with your provider
-   [ ] Test email sending: `python manage.py shell`
-   [ ] Submit test lead form and verify notification emails
-   [ ] Set up proper FROM email domain (SPF/DKIM records)
-   [ ] Configure email templates (optional)

---

### ✅ **6. Server Deployment Options**

#### **Option A: Docker Deployment**

```dockerfile
# Use provided multi-stage Dockerfile
FROM python:3.11-slim
# ... (see backend/Dockerfile for complete setup)
```

**Docker Deployment Checklist:**

-   [ ] Build production image: `docker build -t launchline-backend .`
-   [ ] Set up docker-compose for production
-   [ ] Configure environment variables in compose file
-   [ ] Set up reverse proxy (Nginx)
-   [ ] Configure SSL certificates
-   [ ] Set up log aggregation
-   [ ] Configure health checks

#### **Option B: Traditional VPS/Server**

```bash
# Server setup requirements
sudo apt update
sudo apt install python3.11 python3-pip nginx postgresql redis-server
pip install poetry
```

**VPS Deployment Checklist:**

-   [ ] Install Python 3.11+, PostgreSQL, Redis
-   [ ] Install and configure Nginx
-   [ ] Set up systemd service for Django
-   [ ] Configure Gunicorn with multiple workers
-   [ ] Set up SSL certificates (Let's Encrypt)
-   [ ] Configure firewall (UFW)
-   [ ] Set up log rotation

#### **Option C: Platform-as-a-Service (Recommended for Beginners)**

**Heroku Deployment:**

-   [ ] Install Heroku CLI
-   [ ] Add Procfile: `web: gunicorn config.wsgi:application`
-   [ ] Configure Heroku Postgres addon
-   [ ] Configure Heroku Redis addon
-   [ ] Set environment variables in Heroku dashboard
-   [ ] Enable automatic deployments from Git

**Railway/Render/DigitalOcean App Platform:**

-   [ ] Connect GitHub repository
-   [ ] Configure build settings (Python 3.11)
-   [ ] Add PostgreSQL database service
-   [ ] Configure environment variables
-   [ ] Set up custom domain
-   [ ] Configure automatic deployments

---

### ✅ **7. Performance & Monitoring**

#### **Production Performance Setup**

```python
# Add to production settings
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/error.log',
        },
    },
    'root': {
        'handlers': ['file'],
    },
}
```

#### **Monitoring Checklist**

-   [ ] Set up application monitoring (Sentry recommended)
-   [ ] Configure log collection and rotation
-   [ ] Set up database monitoring
-   [ ] Configure uptime monitoring
-   [ ] Set up performance monitoring
-   [ ] Configure backup automation
-   [ ] Set up SSL certificate monitoring

---

### ✅ **8. Security Hardening**

#### **Security Configuration**

```python
# Production security settings (already in settings/prod.py)
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
```

#### **Security Checklist**

-   [ ] Run security scan: `python manage.py check --deploy`
-   [ ] Configure rate limiting for lead submissions
-   [ ] Set up WAF (Web Application Firewall)
-   [ ] Configure DDoS protection
-   [ ] Regular security updates schedule
-   [ ] Set up intrusion detection
-   [ ] Configure backup encryption

---

### ✅ **9. Testing & Validation**

#### **Pre-Launch Testing**

```bash
# Run test suite
python manage.py test

# Check deployment configuration
python manage.py check --deploy

# Test critical functionality
python manage.py shell
# >>> from leads.models import Lead
# >>> Lead.objects.create(name="Test", email="test@example.com", message="Test")
```

#### **Functional Testing Checklist**

-   [ ] Run full test suite: `python manage.py test`
-   [ ] Test Wagtail admin access and functionality
-   [ ] Test API endpoints: `/api/v2/pages/`, `/api/v1/leads/`
-   [ ] Submit test lead form from frontend
-   [ ] Verify email notifications
-   [ ] Test blog post creation and API
-   [ ] Test image uploads and serving
-   [ ] Load testing with expected traffic
-   [ ] Test SSL certificate and HTTPS redirects

---

## 🚀 **Deployment Commands**

### **Final Deployment Steps**

```bash
# 1. Install dependencies
poetry install --no-dev

# 2. Run migrations
python manage.py migrate

# 3. Collect static files
python manage.py collectstatic --noinput

# 4. Create superuser
python manage.py createsuperuser

# 5. Load initial data (optional)
python manage.py seed_data

# 6. Test deployment
python manage.py check --deploy

# 7. Start production server
gunicorn --bind 0.0.0.0:8000 --workers 3 config.wsgi:application
```

---

## 📊 **Architecture Overview**

### **Production Stack Components**

```
Frontend (Vue.js) → CDN → Load Balancer
                                ↓
Reverse Proxy (Nginx) → Django App Server (Gunicorn)
                                ↓
PostgreSQL Database ← → Redis Cache
                                ↓
SMTP Email Service ← → File Storage (S3/Local)
```

### **Required Services**

1. **Web Server**: Nginx (reverse proxy, static files)
2. **Application Server**: Gunicorn with 3+ workers
3. **Database**: PostgreSQL 14+
4. **Cache**: Redis (optional but recommended)
5. **Email**: SMTP service (SendGrid, Mailgun, AWS SES)
6. **Storage**: Local filesystem or AWS S3
7. **Monitoring**: Application and infrastructure monitoring

---

## 🔧 **Infrastructure Requirements**

### **Minimum Server Specifications**

-   **CPU**: 2 cores
-   **RAM**: 2GB (4GB recommended)
-   **Storage**: 20GB SSD
-   **Network**: 1Gbps
-   **OS**: Ubuntu 22.04 LTS (recommended)

### **Recommended Production Environment**

-   **CPU**: 4+ cores
-   **RAM**: 8GB+
-   **Storage**: 50GB+ SSD
-   **Database**: Separate PostgreSQL server or managed service
-   **CDN**: CloudFlare or AWS CloudFront
-   **Load Balancer**: If multiple servers

---

## 📝 **Post-Deployment Tasks**

### **Immediate Actions**

-   [ ] Verify all services are running
-   [ ] Test critical user flows
-   [ ] Set up monitoring dashboards
-   [ ] Configure backup schedules
-   [ ] Test email notifications
-   [ ] Verify SSL certificates
-   [ ] Check performance metrics

### **Ongoing Maintenance**

-   [ ] Regular security updates
-   [ ] Database maintenance and optimization
-   [ ] Log monitoring and cleanup
-   [ ] Performance monitoring
-   [ ] Backup verification
-   [ ] SSL certificate renewal
-   [ ] Dependency updates

---

## 🆘 **Troubleshooting Common Issues**

### **Database Connection Issues**

```bash
# Test database connection
python manage.py dbshell

# Check migrations
python manage.py showmigrations
```

### **Static Files Not Loading**

```bash
# Collect static files
python manage.py collectstatic --noinput

# Check STATIC_URL and STATIC_ROOT settings
```

### **Email Not Sending**

```bash
# Test email in Django shell
python manage.py shell
>>> from django.core.mail import send_mail
>>> send_mail('Test', 'Test message', 'from@example.com', ['to@example.com'])
```

### **CORS Issues**

```python
# Check CORS settings in production
CORS_ALLOWED_ORIGINS = ['https://yourdomain.com']
CORS_ALLOW_CREDENTIALS = True
```

---

## ✅ **Final Production Checklist**

-   [ ] All environment variables configured
-   [ ] PostgreSQL database set up and migrated
-   [ ] Superuser account created
-   [ ] Email notifications working
-   [ ] Static files serving correctly
-   [ ] SSL certificates installed and working
-   [ ] Domain name configured
-   [ ] Monitoring and logging set up
-   [ ] Backups configured and tested
-   [ ] Security hardening complete
-   [ ] Load testing completed
-   [ ] Documentation updated
-   [ ] Team access configured

---

**🎉 Your LaunchLine Starter backend is now ready for production!**

For additional support or questions, refer to the Django, Wagtail, and deployment platform documentation.
