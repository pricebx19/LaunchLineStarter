# Contact Page Migration to Wagtail

This document describes the migration of the contact page from a hardcoded Vue.js implementation to a Wagtail CMS-managed system using feature flags.

## 🎯 What Was Implemented

### 1. **Wagtail ContactPage Model** (`backend/src/pages/models.py`)

-   **Hero Section**: Configurable heading, subheading, CTA text, and background image
-   **Company Information**: Editable company name and description
-   **Contact Details**: Phone, email, and address fields
-   **Social Media**: JSON field for social media links
-   **Metrics**: JSON field for hero section statistics
-   **SEO Integration**: Inherits from SEOMixin for meta tags

### 2. **Wagtail Contact Components** (`frontend/src/components/contact/`)

-   **WagtailContactPage.vue**: Main contact page component using Wagtail data
-   **WagtailContactSection.vue**: Contact form and information sections

### 3. **Feature Flag Integration** (`frontend/src/pages/Contact.vue`)

-   **Conditional Rendering**: Shows legacy, Wagtail, or both versions based on feature flags
-   **A/B Testing**: Side-by-side comparison during transition
-   **Development Tools**: Status indicator showing migration progress

## 🚀 How to Use

### 1. **Enable the Feature Flag**

1. Go to Wagtail admin: `http://localhost:8000/cms/`
2. Navigate to Settings → Feature Flags
3. Find `WAGTAIL_CONTACT_FORM` and enable it
4. Optionally set rollout percentage for gradual migration

### 2. **Create Contact Page Content**

1. In Wagtail admin, go to Pages
2. Create a new "Contact Page"
3. Fill in the hero section, company info, and contact details
4. Publish the page

### 3. **Test the Migration**

-   **Legacy Mode**: Feature flag disabled → Shows current Vue.js implementation
-   **Wagtail Mode**: Feature flag enabled → Shows CMS-managed content
-   **A/B Testing**: During transition → Shows both versions side by side

## 🔧 Feature Flag States

### `shouldShowLegacy`

-   **When**: `WAGTAIL_CONTACT_FORM` is disabled
-   **Shows**: Current Vue.js contact page
-   **Use Case**: Fallback during development or if issues arise

### `shouldShowWagtail`

-   **When**: `WAGTAIL_CONTACT_FORM` is enabled
-   **Shows**: New Wagtail-managed contact page
-   **Use Case**: Production use after testing

### `shouldShowBoth`

-   **When**: Feature flag is enabled but in transition mode
-   **Shows**: Side-by-side comparison
-   **Use Case**: A/B testing and validation

## 📊 Migration Benefits

### **Content Management**

-   ✅ Edit hero text without code changes
-   ✅ Update contact information through admin
-   ✅ Manage social media links dynamically
-   ✅ Customize metrics and statistics

### **Development Workflow**

-   ✅ Feature flag controlled rollout
-   ✅ Easy rollback if issues arise
-   ✅ A/B testing capabilities
-   ✅ Gradual user adoption

### **SEO & Performance**

-   ✅ Wagtail SEO management
-   ✅ Meta tag optimization
-   ✅ Structured content
-   ✅ Better content organization

## 🛠️ Technical Implementation

### **Backend (Django/Wagtail)**

```python
class ContactPage(SEOMixin, Page):
    hero_heading = models.CharField(max_length=255)
    hero_subheading = models.TextField(max_length=500)
    company_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    # ... more fields
```

### **Frontend (Vue.js)**

```vue
<template>
    <div>
        <!-- Legacy Contact Page -->
        <div v-if="shouldShowLegacy">
            <!-- Current Vue.js implementation -->
        </div>

        <!-- Wagtail Contact Page -->
        <WagtailContactPage
            v-else-if="shouldShowWagtail"
            :wagtail-data="wagtailData"
        />

        <!-- A/B Testing -->
        <div v-else-if="shouldShowBoth">
            <!-- Side-by-side comparison -->
        </div>
    </div>
</template>
```

### **Feature Flag Logic**

```typescript
const contactFlags = useComponentFlags("CONTACT");
const { shouldShowLegacy, shouldShowWagtail, shouldShowBoth, migrationStatus } =
    contactFlags;
```

## 📋 Next Steps

### **Immediate Actions**

1. ✅ Create ContactPage model
2. ✅ Implement Vue components
3. ✅ Add feature flag integration
4. ✅ Test conditional rendering

### **Content Setup**

1. Create contact page in Wagtail admin
2. Fill in company information
3. Upload hero background image
4. Configure social media links

### **Testing & Validation**

1. Test legacy mode (flag disabled)
2. Test Wagtail mode (flag enabled)
3. Test A/B testing mode
4. Validate form submission

### **Production Deployment**

1. Enable feature flag for small user group
2. Monitor performance and user feedback
3. Gradually increase rollout percentage
4. Full migration when confident

## 🔍 Troubleshooting

### **Common Issues**

#### **Feature Flag Not Working**

-   Check if `WAGTAIL_CONTACT_FORM` is enabled in admin
-   Verify API connectivity for feature flags
-   Check browser console for errors

#### **Wagtail Content Not Loading**

-   Ensure ContactPage is created and published
-   Check if page is accessible via Wagtail API
-   Verify data structure matches component expectations

#### **Form Submission Issues**

-   Check if form validation is working
-   Verify API endpoint for lead submission
-   Check network tab for request/response

### **Debug Tools**

-   Development status indicator (top-right corner)
-   Browser console logging
-   Feature flag API endpoints
-   Wagtail admin interface

## 📚 Related Documentation

-   [Feature Flag System](../docs/feature_flag_system.md)
-   [Wagtail Models](../backend/src/pages/models.py)
-   [Vue Composables](../frontend/src/composables/useFeatureFlags.ts)
-   [API Endpoints](../backend/src/core/api.py)

## 🎉 Success Metrics

-   ✅ **Content Management**: Non-technical users can update contact info
-   ✅ **Feature Control**: Easy enable/disable of new implementation
-   ✅ **User Experience**: Seamless transition with no downtime
-   ✅ **Development Velocity**: Faster content updates and iterations
-   ✅ **SEO Improvement**: Better meta tag management and structure

The contact page migration demonstrates the power of the feature flag system for gradual, controlled transitions to Wagtail CMS management!
