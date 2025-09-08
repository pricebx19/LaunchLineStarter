# Wagtail Transition Feature Flag System

This document describes the comprehensive feature flag system designed to facilitate a gradual transition from the current Vue.js frontend to a fully Wagtail-managed UI.

## Overview

The feature flag system allows you to:

-   Gradually migrate UI components from Vue.js to Wagtail
-   A/B test different implementations
-   Roll back quickly if issues arise
-   Monitor transition progress
-   Manage dependencies between features
-   Control rollout to specific user percentages

## Architecture

### Backend Components

#### 1. FeatureFlag Model (`backend/src/core/models.py`)

The core model that stores feature flag configuration:

```python
class FeatureFlag(models.Model):
    name = models.CharField(max_length=100, choices=FEATURE_CHOICES, unique=True)
    display_name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_enabled = models.BooleanField(default=False)
    environment = models.CharField(max_length=20, choices=ENVIRONMENT_CHOICES)
    rollout_percentage = models.IntegerField(default=100)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    dependencies = models.ManyToManyField('self', blank=True)
    is_deprecated = models.BooleanField(default=False)
```

**Categories:**

-   `NAVIGATION` - Navigation & Layout components
-   `CONTENT` - Content Management components
-   `FORMS` - Forms & Interactions
-   `ANIMATIONS` - Animations & Effects
-   `SEO` - SEO & Meta management
-   `PERFORMANCE` - Performance & Optimization
-   `EXPERIMENTAL` - Experimental Features

#### 2. Admin Interface (`backend/src/core/admin.py`)

Wagtail admin interface for managing feature flags with:

-   Filtering by category, environment, and status
-   Tabbed interface for organization
-   Bulk operations
-   Dashboard with statistics

#### 3. API Endpoints (`backend/src/core/api.py`)

RESTful API for feature flag access:

-   `GET /api/feature-flags/` - Get all active flags
-   `GET /api/feature-flags/{name}/` - Get specific flag details
-   `GET /api/feature-flags/category/{category}/` - Get flags by category
-   `POST /api/feature-flags/{name}/toggle/` - Toggle flag (admin only)
-   `GET /api/wagtail-transition/` - Get transition status overview

### Frontend Components

#### 1. Feature Configuration (`frontend/src/config/features.ts`)

Central configuration for all feature flags:

```typescript
export const FEATURE_FLAGS = {
    // Navigation & Layout
    WAGTAIL_NAVBAR: "WAGTAIL_NAVBAR",
    WAGTAIL_FOOTER: "WAGTAIL_FOOTER",
    WAGTAIL_LAYOUT: "WAGTAIL_LAYOUT",

    // Content Management
    WAGTAIL_HERO: "WAGTAIL_HERO",
    WAGTAIL_FEATURES: "WAGTAIL_FEATURES",
    // ... more flags
} as const;
```

#### 2. Vue Composables (`frontend/src/composables/useFeatureFlags.ts`)

React composables for feature flag usage:

```typescript
// Basic usage
const { isEnabled, useWagtail } = useFeatureFlags();

// Component-specific
const { shouldShowWagtail, shouldShowLegacy } = useComponentFlags("HERO");

// Navigation-specific
const { navigationStrategy } = useNavigationFlags();

// Content-specific
const { contentStrategy } = useContentFlags();
```

## Migration Strategies

### 1. Component-by-Component Migration

Migrate individual components using the `useComponentFlags` composable:

```vue
<template>
    <div>
        <!-- Legacy component -->
        <LegacyHero v-if="shouldShowLegacy" />

        <!-- Wagtail component -->
        <WagtailHero v-if="shouldShowWagtail" />

        <!-- Both for A/B testing -->
        <div v-if="shouldShowBoth">
            <LegacyHero />
            <WagtailHero />
        </div>
    </div>
</template>

<script setup>
import { useComponentFlags } from "@/composables/useFeatureFlags";

const { shouldShowLegacy, shouldShowWagtail, shouldShowBoth } =
    useComponentFlags("HERO");
</script>
```

### 2. Page-Level Migration

Use navigation strategy for entire page transitions:

```vue
<template>
    <div>
        <div v-if="navigationStrategy === 'legacy'">
            <!-- Full legacy page -->
        </div>

        <div v-else-if="navigationStrategy === 'full-wagtail'">
            <!-- Full Wagtail page -->
        </div>

        <div v-else>
            <!-- Mixed approach -->
        </div>
    </div>
</template>
```

### 3. Feature Category Migration

Migrate entire feature categories:

```vue
<script setup>
import { useContentFlags } from "@/composables/useFeatureFlags";

const { contentStrategy } = useContentFlags();

// contentStrategy can be:
// - 'legacy' - All legacy components
// - 'transitioning' - Mixed components
// - 'mostly-wagtail' - 50%+ Wagtail
// - 'full-wagtail' - All Wagtail
</script>
```

## Recommended Migration Path

### Phase 1: Infrastructure Setup

1. ✅ Set up feature flag models and admin
2. ✅ Create API endpoints
3. ✅ Implement frontend composables
4. Set up basic monitoring

### Phase 2: Content Migration

1. **Start with Hero sections** (`WAGTAIL_HERO`)
    - Low risk, high visibility
    - Easy to revert
2. **Feature grids** (`WAGTAIL_FEATURES`)

    - Reusable across pages
    - Good for testing data flow

3. **CTA sections** (`WAGTAIL_CTA`)
    - Simple structure
    - Important for conversions

### Phase 3: Navigation Migration

1. **Footer first** (`WAGTAIL_FOOTER`)

    - Less critical than navbar
    - Good for testing navigation data

2. **Navbar** (`WAGTAIL_NAVBAR`)

    - High impact, test thoroughly
    - Consider gradual rollout

3. **Full layout** (`WAGTAIL_LAYOUT`)
    - Complete layout control

### Phase 4: Advanced Features

1. **Blog system** (`WAGTAIL_BLOG`)
2. **Portfolio** (`WAGTAIL_PORTFOLIO`)
3. **Services pages** (`WAGTAIL_SERVICES`)
4. **Forms** (`WAGTAIL_CONTACT_FORM`, `WAGTAIL_NEWSLETTER`)

### Phase 5: Optimization

1. **SEO management** (`WAGTAIL_SEO`, `WAGTAIL_META`)
2. **Performance features** (`WAGTAIL_LAZY_LOADING`, `WAGTAIL_CACHING`)
3. **Animations** (`WAGTAIL_ANIMATIONS`, `WAGTAIL_PARTICLES`)

## Usage Examples

### Basic Feature Flag Check

```typescript
import { isFeatureEnabled, FEATURE_FLAGS } from "@/config/features";

if (isFeatureEnabled(FEATURE_FLAGS.WAGTAIL_HERO)) {
    // Use Wagtail hero
} else {
    // Use legacy hero
}
```

### Component Migration

```vue
<template>
    <div>
        <div v-if="migrationStatus === 'legacy'">
            <LegacyComponent />
        </div>

        <div v-else-if="migrationStatus === 'wagtail'">
            <WagtailComponent />
        </div>

        <div v-else-if="migrationStatus === 'transitioning'">
            <WagtailComponent v-if="isWagtailEnabled" />
            <LegacyComponent v-else />
        </div>

        <div v-else-if="migrationStatus === 'deprecated'">
            <!-- Component has been deprecated -->
            <DeprecationNotice />
        </div>
    </div>
</template>

<script setup>
import { useComponentFlags } from "@/composables/useFeatureFlags";

const { migrationStatus, isWagtailEnabled, componentStatus } =
    useComponentFlags("HERO");
</script>
```

### App Initialization

```typescript
// main.ts
import { useFeatureFlagsApp } from "@/composables/useFeatureFlags";

const app = createApp(App);

// Initialize with polling enabled for development
const featureFlags = useFeatureFlagsApp({
    enablePolling: import.meta.env.DEV,
    pollingInterval: 30000,
    autoStart: true,
});

app.mount("#app");
```

## Environment Configuration

### Backend Environment Variables

```env
# Feature flag defaults (optional)
FEATURE_FLAG_CACHE_TTL=300
FEATURE_FLAG_ENVIRONMENT=development
```

### Frontend Environment Variables

Add to `frontend/.env.local`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Feature Flag Overrides (optional)
VITE_WAGTAIL_HERO=true
VITE_WAGTAIL_NAVBAR=false

# Development Settings
VITE_FEATURE_FLAG_POLLING=true
VITE_FEATURE_FLAG_DEBUG=true
```

## Monitoring and Analytics

### Admin Dashboard

The Wagtail admin provides:

-   Feature flag status overview
-   Usage statistics
-   Migration progress tracking
-   Quick toggle controls

### API Monitoring

Use the transition status endpoint:

```typescript
const response = await fetch("/api/wagtail-transition/");
const data = await response.json();

console.log("Migration Progress:", data.overall_progress.progress_percentage);
console.log("Next Steps:", data.next_steps);
```

### Development Tools

```typescript
import { useFeatureFlagsDev } from "@/composables/useFeatureFlags";

const { debugInfo, logAllFlags } = useFeatureFlagsDev();

// Log all feature flags to console
logAllFlags();

// Get debug information
console.log("Feature Flag Stats:", debugInfo.value);
```

## Best Practices

### 1. Feature Flag Naming

-   Use consistent prefixes (`WAGTAIL_*`)
-   Be descriptive (`WAGTAIL_HERO` not `HERO_V2`)
-   Group by category

### 2. Migration Strategy

-   Start with low-risk components
-   Test thoroughly before enabling
-   Use gradual rollouts for high-impact features
-   Monitor user feedback

### 3. Dependency Management

-   Set up dependencies in admin
-   Test dependency chains
-   Document component relationships

### 4. Cleanup

-   Mark old flags as deprecated
-   Remove unused flags after full migration
-   Clean up legacy code

### 5. Testing

-   Test both enabled and disabled states
-   Verify dependency handling
-   Test rollback scenarios

## Troubleshooting

### Common Issues

1. **Feature flag not updating**

    - Check cache TTL settings
    - Verify API connectivity
    - Clear frontend cache

2. **Dependencies not working**

    - Check dependency chain in admin
    - Verify all dependencies are enabled
    - Look for circular dependencies

3. **Performance issues**
    - Reduce polling frequency
    - Check cache configuration
    - Minimize API calls

### Debug Commands

```typescript
// List all feature flags
import { listAllFeatures } from "@/config/features";
console.log(listAllFeatures());

// Check specific flag details
import { getFeatureMetadata } from "@/config/features";
console.log(getFeatureMetadata("WAGTAIL_HERO"));

// Refresh flags manually
import { useFeatureFlags } from "@/composables/useFeatureFlags";
const { refresh } = useFeatureFlags();
await refresh();
```

## Migration Checklist

### Before Migration

-   [ ] Set up feature flag system
-   [ ] Create Wagtail page models
-   [ ] Implement API endpoints
-   [ ] Add admin interface
-   [ ] Write migration tests

### During Migration

-   [ ] Enable feature flags gradually
-   [ ] Monitor performance metrics
-   [ ] Collect user feedback
-   [ ] Test rollback procedures
-   [ ] Update documentation

### After Migration

-   [ ] Mark legacy features as deprecated
-   [ ] Clean up unused code
-   [ ] Update deployment scripts
-   [ ] Archive old feature flags
-   [ ] Document lessons learned

## Future Enhancements

-   User-specific feature flag targeting
-   A/B testing integration
-   Performance monitoring integration
-   Automated rollback on errors
-   Feature flag scheduling
-   Multi-environment flag synchronization

This feature flag system provides a robust foundation for migrating your entire UI to Wagtail management while maintaining stability and allowing for iterative improvements.
