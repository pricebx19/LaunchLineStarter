# Feature Flags

This document explains how to use the feature flags system in LaunchLine LLC.

## Blog Pages Feature Flag

The blog pages can be enabled or disabled using a feature flag. By default, blog pages are **disabled**.

### Enable/Disable via Environment Variable

Create a `.env` file in the frontend directory and add:

```bash
# Enable blog pages
VITE_BLOG_PAGES=true

# Disable blog pages (default)
VITE_BLOG_PAGES=false
```

When disabled, the blog routes will not be registered and blog navigation links will be hidden from the navbar and footer.

## Rocket Animation Feature Flag

The rocket animation in the hero section can be controlled using a feature flag.

### Enable/Disable via Environment Variable

Create a `.env` file in the frontend directory and add:

```bash
# Enable rocket animation
VITE_ROCKET_ANIMATION=true

# Disable rocket animation
VITE_ROCKET_ANIMATION=false
```

### Enable/Disable via Component Prop

You can also control the rocket animation per component instance:

```vue
<!-- Enable rocket animation -->
<Hero :show-rocket="true" />

<!-- Disable rocket animation -->
<Hero :show-rocket="false" />
```

### Default Behavior

-   If no environment variable is set, the rocket animation is **enabled by default**
-   The component prop `showRocket` defaults to `true`
-   Both conditions must be true for the rocket to display

## Adding New Feature Flags

To add a new feature flag:

1. Add it to `src/config/features.ts`:

```typescript
export const FEATURES = {
    ROCKET_ANIMATION: import.meta.env.VITE_ROCKET_ANIMATION === "true" || true,
    NEW_FEATURE: import.meta.env.VITE_NEW_FEATURE === "true" || false,
} as const;
```

2. Use it in your component:

```typescript
import { isFeatureEnabled } from "../config/features";

const isNewFeatureEnabled = computed(() => isFeatureEnabled("NEW_FEATURE"));
```

3. Add the environment variable to your `.env` file:

```bash
VITE_NEW_FEATURE=true
```

## Environment Variables

All feature flag environment variables must be prefixed with `VITE_` to be accessible in the frontend code.
