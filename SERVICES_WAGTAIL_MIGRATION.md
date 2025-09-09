# Services Page Wagtail Migration Guide

This document outlines the migration of the Services page from hardcoded Vue components to Wagtail stream fields with feature flag support.

## Overview

The Services page has been migrated to use Wagtail CMS for content management while maintaining backward compatibility through feature flags. This allows for a gradual transition and easy rollback if needed.

## Feature Flag

-   **Flag Name**: `WAGTAIL_SERVICES`
-   **Purpose**: Controls whether to use Wagtail-managed content or legacy hardcoded content
-   **Default**: Disabled (uses legacy content)
-   **Category**: Content Management

## Backend Changes

### 1. New Wagtail Models

#### ServicesPage Model

-   **Location**: `backend/src/pages/models.py`
-   **Features**: 100% StreamField-based content management
-   **API Fields**: Full API support for frontend consumption

#### Service-Specific Blocks

-   **ServicePackageBlock**: Individual service packages with pricing and features
-   **AlaCarteServiceBlock**: A la carte services with categories
-   **FAQBlock**: FAQ items with questions and answers
-   **ServicePackagesBlock**: Container for service packages section
-   **AlaCarteServicesBlock**: Container for a la carte services section
-   **FAQSectionBlock**: Container for FAQ section

### 2. Feature Flag Integration

The `WAGTAIL_SERVICES` feature flag is already included in the backend setup command and can be managed through:

-   Django admin interface
-   API endpoints (`/api/feature-flags/`)
-   Management command (`python manage.py setup_feature_flags`)

## Frontend Changes

### 1. New Components

#### WagtailServicesSection

-   **Location**: `frontend/src/components/sections/WagtailServicesSection.vue`
-   **Purpose**: Main container for Wagtail-managed services content
-   **Features**: Conditional rendering, loading states, error handling

#### Individual Section Components

-   **WagtailHeroSection**: Hero section with background image support
-   **WagtailServicePackages**: Service packages grid with pricing
-   **WagtailAlaCarteServices**: A la carte services with category filtering
-   **WagtailFAQSection**: FAQ section with expandable items
-   **WagtailCTASection**: Call-to-action section with theme support

### 2. Data Management

#### useWagtailServicesData Composable

-   **Location**: `frontend/src/composables/useWagtailServicesData.ts`
-   **Features**:
    -   Automatic data fetching from Wagtail API
    -   Type-safe data processing
    -   Error handling and loading states
    -   Caching and refresh capabilities

### 3. Feature Flag Integration

#### Updated Services.vue

-   **Conditional Rendering**: Shows Wagtail or legacy content based on feature flag
-   **Feature Flag Indicator**: Development tool for monitoring flag status
-   **Backward Compatibility**: Maintains all existing functionality when flag is disabled

## Migration Steps

### 1. Backend Setup

```bash
# Create and run migrations
cd backend
python manage.py makemigrations pages
python manage.py migrate

# Set up feature flags (if not already done)
python manage.py setup_feature_flags

# Create a Services page in Wagtail admin
# Navigate to /cms/ and create a new ServicesPage
```

### 2. Frontend Setup

```bash
# Install dependencies (if needed)
cd frontend
npm install

# Start development server
npm run dev
```

### 3. Testing the Migration

#### Enable Feature Flag

```bash
# Via API
curl -X POST http://localhost:8000/api/feature-flags/WAGTAIL_SERVICES/toggle/

# Via Django admin
# Navigate to /admin/core/featureflag/ and enable WAGTAIL_SERVICES
```

#### Verify Functionality

1. Visit `/services` page
2. Verify Wagtail content is displayed when flag is enabled
3. Verify legacy content is displayed when flag is disabled
4. Test all interactive elements (FAQ expansion, service filtering, etc.)

## Content Migration

### 1. Service Packages

Migrate existing service packages from `frontend/src/data/servicesData.ts` to Wagtail:

1. Navigate to Wagtail admin
2. Edit the Services page
3. Add a "Service Packages" block
4. Configure heading, subheading, and packages
5. Copy pricing, features, and descriptions from legacy data

### 2. A La Carte Services

Migrate a la carte services with categories:

1. Add an "A La Carte Services" block
2. Configure services with categories
3. Mark popular services appropriately
4. Set up category filtering

### 3. FAQ Section

Migrate FAQ content:

1. Add an "FAQ Section" block
2. Copy questions and answers from legacy data
3. Configure section heading and subheading

### 4. Hero Section

Configure the hero section:

1. Add a "Hero" block
2. Set heading, subheading, and CTA
3. Upload background image if desired

## Rollback Plan

If issues arise, the migration can be easily rolled back:

1. **Disable Feature Flag**: Set `WAGTAIL_SERVICES` to `false`
2. **Legacy Content**: The page will automatically revert to hardcoded content
3. **No Data Loss**: All legacy functionality remains intact

## Development Tools

### Feature Flag Indicator

-   **Location**: `frontend/src/components/utility/FeatureFlagIndicator.vue`
-   **Purpose**: Visual indicator of feature flag status during development
-   **Usage**: Automatically shown in development mode

### Debug Information

-   **API Endpoint**: `/api/feature-flags/` - View all feature flags
-   **Migration Status**: Check component migration status via composables
-   **Console Logging**: Feature flag changes are logged to console

## Performance Considerations

### 1. Lazy Loading

-   All Wagtail components use `defineAsyncComponent` for code splitting
-   Components are only loaded when feature flag is enabled

### 2. Caching

-   Wagtail data is cached in the composable
-   Refresh functionality available for real-time updates

### 3. Error Handling

-   Graceful fallback to legacy content on API errors
-   Loading states for better user experience

## Future Enhancements

### 1. Content Management

-   Easy content updates through Wagtail admin
-   A/B testing capabilities
-   Multi-language support

### 2. Performance

-   Image optimization through Wagtail
-   CDN integration
-   Advanced caching strategies

### 3. Analytics

-   Content performance tracking
-   User interaction analytics
-   Conversion rate monitoring

## Troubleshooting

### Common Issues

1. **Feature Flag Not Working**

    - Check if flag is enabled in admin
    - Verify API connectivity
    - Check browser console for errors

2. **Content Not Loading**

    - Verify Services page exists in Wagtail
    - Check API endpoint accessibility
    - Review network requests in browser dev tools

3. **Styling Issues**
    - Ensure all CSS classes are properly scoped
    - Check for conflicting styles
    - Verify responsive design

### Debug Commands

```bash
# Check feature flag status
curl http://localhost:8000/api/feature-flags/

# Test Wagtail API
curl http://localhost:8000/api/v2/pages/?type=pages.ServicesPage

# Check frontend build
npm run build
```

## Conclusion

The Services page migration provides a robust, scalable solution for content management while maintaining full backward compatibility. The feature flag approach allows for safe deployment and easy rollback, making it ideal for production environments.
