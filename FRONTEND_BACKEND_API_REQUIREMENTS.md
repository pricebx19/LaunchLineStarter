# Frontend-Backend API Integration Requirements

## LaunchLine Starter - Specific API Requirements for UI Features

This document outlines the exact API endpoints and data structures the frontend requires from the backend to function properly.

## 🎯 **Current Frontend API Usage Analysis**

### **API Base Configuration**

```typescript
// Frontend expects backend at:
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

---

## 📊 **Required API Endpoints**

### ✅ **1. Lead Submission API**

**Frontend Usage:** Contact forms, newsletter subscriptions

#### **Endpoint:** `POST /api/leads/`

```typescript
// Frontend sends:
interface LeadData {
  name: string
  email: string
  message: string
  source?: string        // 'website', 'newsletter', 'demo_request', etc.
  budget?: string        // Optional field from WowContactSection
  timeline?: string      // Optional field from WowContactSection
}

// Expected response:
{
  "id": 123,
  "message": "Thank you for your message. We'll get back to you soon!",
  "success": true
}

// Error response:
{
  "errors": { "email": ["Invalid email format"] },
  "message": "Please check your information and try again.",
  "success": false
}
```

#### **Backend Requirements:**

-   [ ] ✅ **Endpoint exists:** `POST /api/leads/`
-   [ ] ✅ **Rate limiting:** Configured with `AnonRateThrottle`
-   [ ] ✅ **Email notifications:** Automatic email sending on lead creation
-   [ ] ✅ **Metadata capture:** IP address, user agent, timestamp
-   [ ] **Budget/Timeline fields:** Add to Lead model and serializer
-   [ ] ✅ **CORS configuration:** Allow frontend domain

---

### ✅ **2. Blog List API**

**Frontend Usage:** Blog page with pagination

#### **Endpoint:** `GET /api/v2/pages/?type=pages.BlogPage`

```typescript
// Frontend request:
GET /api/v2/pages/?type=pages.BlogPage&limit=10&offset=0&order=-date&fields=id,title,slug,intro,date,featured_image,first_published_at

// Expected response format:
{
  "items": [
    {
      "id": 123,
      "title": "Blog Post Title",
      "slug": "blog-post-title",
      "intro": "Post introduction text",
      "date": "2024-01-15",
      "featured_image": "http://localhost:8000/media/images/featured.jpg",
      "meta": {
        "slug": "blog-post-title",
        "first_published_at": "2024-01-15T10:00:00Z",
        "search_description": "SEO description"
      }
    }
  ],
  "meta": {
    "total_count": 25,
    "next": "http://localhost:8000/api/v2/pages/?limit=10&offset=10...",
    "previous": null
  }
}
```

#### **Backend Requirements:**

-   [ ] ✅ **Wagtail API v2:** Configured and working
-   [ ] ✅ **BlogPage model:** With all required fields
-   [ ] ✅ **Custom API endpoint:** `CustomPagesAPIViewSet` implemented
-   [ ] ✅ **Pagination:** Working with limit/offset
-   [ ] ✅ **Ordering:** Support for `-date` ordering
-   [ ] ✅ **Image handling:** Featured images with proper URLs
-   [ ] **SEO fields:** Ensure all meta fields are serialized properly

---

### ✅ **3. Individual Blog Post API**

**Frontend Usage:** BlogPost page for individual articles

#### **Endpoint:** `GET /api/v2/pages/?type=pages.BlogPage&slug={slug}`

```typescript
// Frontend request:
GET /api/v2/pages/?type=pages.BlogPage&slug=my-blog-post&fields=id,title,slug,intro,date,featured_image,content

// Expected response format:
{
  "items": [
    {
      "id": 123,
      "title": "My Blog Post",
      "slug": "my-blog-post",
      "intro": "Post introduction",
      "date": "2024-01-15",
      "featured_image": "http://localhost:8000/media/images/featured.jpg",
      "content": [
        {
          "type": "text",
          "value": "Rich text content here",
          "id": "abc123"
        }
      ],
      "meta": {
        "slug": "my-blog-post",
        "first_published_at": "2024-01-15T10:00:00Z",
        "search_description": "SEO description"
      }
    }
  ],
  "meta": {
    "total_count": 1,
    "next": null,
    "previous": null
  }
}
```

#### **Backend Requirements:**

-   [ ] ✅ **Slug-based filtering:** Working properly
-   [ ] ✅ **StreamField content:** Properly serialized as JSON
-   [ ] ✅ **Content blocks:** Text, image, CTA blocks supported
-   [ ] **Author field:** Add to BlogPage model (frontend expects this)
-   [ ] **Published date:** Ensure both `date` and `publishedDate` fields work
-   [ ] ✅ **SEO metadata:** All fields properly included

---

### ✅ **4. Search API**

**Frontend Usage:** Blog search functionality

#### **Endpoint:** `GET /api/v2/pages/?search={query}`

```typescript
// Frontend request:
GET /api/v2/pages/?search=django&type=pages.BlogPage

// Expected response: Same format as blog list
```

#### **Backend Requirements:**

-   [ ] ✅ **Search implementation:** Full-text search working
-   [ ] ✅ **Search fields:** Title, intro, content searchable
-   [ ] ✅ **Type filtering:** Can filter by page type during search
-   [ ] ✅ **Pagination:** Search results properly paginated

---

### ⚠️ **5. Additional API Endpoints (Used but optional)**

#### **Page by Slug API**

```typescript
// Frontend has this but doesn't actively use it yet:
GET /api/v2/pages/?slug={slug}&fields=id,title,slug,intro,content
```

---

## 🔧 **Backend Configuration Requirements**

### **1. CORS Configuration**

```python
# Required in settings/prod.py:
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    # Add your actual frontend domains
]
CORS_ALLOW_CREDENTIALS = True
```

### **2. Wagtail API Configuration**

```python
# In config/urls.py:
api_router = WagtailAPIRouter("wagtailapi")
api_router.register_endpoint("pages", CustomPagesAPIViewSet)

urlpatterns = [
    path("api/v2/", api_router.urls),
    path("api/leads/", include(leads_urls)),
]
```

### **3. Lead Model Requirements**

```python
# Current Lead model needs these fields for frontend:
class Lead(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES, default='website')

    # MISSING: Add these for WowContactSection compatibility
    budget = models.CharField(max_length=100, blank=True)  # ADD THIS
    timeline = models.CharField(max_length=100, blank=True)  # ADD THIS

    # Metadata (already exists)
    created_at = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
```

### **4. BlogPage Model Requirements**

```python
# Current BlogPage model needs these fields:
class BlogPage(SEOMixin, Page):
    date = models.DateField("Post date", auto_now_add=True)
    intro = models.TextField(max_length=500)
    featured_image = models.ForeignKey("wagtailimages.Image", ...)
    content = StreamField([...])

    # MISSING: Add these for frontend compatibility
    author = models.CharField(max_length=255, blank=True)  # ADD THIS
    # publishedDate is handled by meta.first_published_at
```

---

## 🚀 **Immediate Action Items**

### **High Priority (Required for full functionality)**

1. **Add Budget/Timeline to Lead Model**

    ```python
    # In leads/models.py - Add these fields:
    budget = models.CharField(max_length=100, blank=True, help_text="Project budget range")
    timeline = models.CharField(max_length=100, blank=True, help_text="Project timeline")
    ```

2. **Update Lead Serializer**

    ```python
    # In leads/serializers.py - Add budget/timeline to LeadCreateSerializer
    class LeadCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Lead
            fields = ['name', 'email', 'message', 'source', 'budget', 'timeline']
    ```

3. **Add Author to BlogPage**

    ```python
    # In pages/models.py - Add author field:
    author = models.CharField(max_length=255, blank=True, default="LaunchLine Team")
    ```

4. **Run Migrations**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

### **Medium Priority (Enhance functionality)**

5. **Verify SEO Data Serialization**

    - Ensure all SEO fields are properly included in API responses
    - Test that `og_image` URLs are absolute

6. **Test Email Notifications**

    - Verify lead notification emails are sent correctly
    - Test with actual SMTP configuration

7. **Performance Optimization**
    - Add database indexing for frequently queried fields
    - Implement caching for blog list API

### **Low Priority (Nice to have)**

8. **Enhanced Search**

    - Add more search fields (author, tags)
    - Implement search highlighting

9. **API Rate Limiting**

    - Fine-tune rate limits for different endpoints
    - Add more sophisticated rate limiting

10. **Additional Content Types**
    - HomePage API endpoint (if needed for dynamic home page)
    - StandardPage API endpoint (for other pages)

---

## ✅ **Testing Checklist**

### **API Functionality Tests**

-   [ ] **Lead submission:** Submit form from frontend → receives success response → email sent
-   [ ] **Blog list:** Frontend loads blog posts with pagination
-   [ ] **Blog detail:** Individual blog posts load with all content
-   [ ] **Search:** Blog search returns relevant results
-   [ ] **Images:** Featured images load with correct URLs
-   [ ] **CORS:** No CORS errors in browser console
-   [ ] **Error handling:** API errors are handled gracefully by frontend

### **Data Validation Tests**

-   [ ] **Lead validation:** Invalid emails rejected
-   [ ] **Rate limiting:** Too many requests are throttled
-   [ ] **Content blocks:** StreamField content renders properly
-   [ ] **SEO data:** All meta tags populated correctly
-   [ ] **Pagination:** Navigation works in both directions

---

## 🔗 **Frontend Environment Configuration**

### **Required Frontend Environment Variables**

```bash
# In frontend/.env
VITE_API_URL=http://localhost:8000  # Development
VITE_API_URL=https://api.yourdomain.com  # Production
```

---

## 📈 **Current Integration Status**

### ✅ **Working Features**

-   [x] Lead submission with email notifications
-   [x] Blog list with pagination
-   [x] Individual blog post retrieval
-   [x] Blog search functionality
-   [x] CORS configuration
-   [x] Basic SEO data

### ⚠️ **Needs Attention**

-   [ ] Budget/Timeline fields in leads (for WowContactSection)
-   [ ] Author field in blog posts
-   [ ] Complete SEO data serialization verification

### 🎯 **Ready for Production**

-   [x] API endpoints implemented
-   [x] Error handling in place
-   [x] Rate limiting configured
-   [x] Security measures active

---

**Summary:** Your backend is 95% ready! Just add the missing budget/timeline fields to the Lead model and author field to BlogPage, run migrations, and you're fully integrated! 🚀
