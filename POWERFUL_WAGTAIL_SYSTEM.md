# 🚀 Powerful Wagtail StreamField System

## Overview

This system provides a **complete 1:1 mapping** between Wagtail StreamField blocks and Vue components, creating an extremely powerful and flexible content management system. Every block type in Wagtail has a corresponding Vue component with automatic prop mapping, validation, and error handling.

## 🎯 Key Features

### ✅ **Complete 1:1 Mapping**

-   Every Wagtail block type has a dedicated Vue component
-   Automatic prop transformation from block data to component props
-   Type-safe prop mapping with TypeScript support

### ✅ **25+ Block Types Available**

-   **Core Content**: Hero, Features, Testimonials, CTA, Text, Image
-   **Service Blocks**: Service Packages, A La Carte Services, FAQ
-   **Portfolio Blocks**: Projects, Case Studies, Technologies
-   **Contact Blocks**: Contact Info, Social Links
-   **Advanced Blocks**: Video, Gallery, Code, Accordion, Tabs, Pricing Table, Timeline, Comparison Table, Form, Map, Progress Bars

### ✅ **Powerful Content Renderer**

-   Dynamic component loading with caching
-   Automatic error handling and fallbacks
-   Development tools and debugging
-   Validation and type checking
-   Performance optimized with lazy loading

### ✅ **Block Registry System**

-   Centralized block metadata management
-   Automatic component discovery
-   Category-based organization
-   Easy registration of new blocks

## 🏗️ Architecture

### Backend (Wagtail)

```
backend/src/pages/blocks.py
├── Core Blocks (Hero, Features, Testimonials, etc.)
├── Service Blocks (Packages, A La Carte, FAQ)
├── Portfolio Blocks (Projects, Case Studies, Technologies)
├── Contact Blocks (Contact Info, Social Links)
└── Advanced Blocks (Video, Gallery, Code, Accordion, etc.)
```

### Frontend (Vue.js)

```
frontend/src/lib/blocks/
├── block-registry.ts          # Central registry system
└── PowerfulContentRenderer.vue # Main renderer component

frontend/src/components/blocks/
├── TextBlock.vue
├── ImageBlock.vue
├── ContactInfoBlock.vue
├── SocialLinksBlock.vue
└── [25+ more block components]
```

## 🚀 Usage Examples

### Basic Usage

```vue
<template>
    <PowerfulContentRenderer
        :content="wagtailContent"
        :show-dev-tools="true"
        :enable-validation="true"
    />
</template>

<script setup>
import PowerfulContentRenderer from "@/components/blocks/PowerfulContentRenderer.vue";
import {
    getBlockMetadata,
    transformBlockToProps,
} from "@/lib/blocks/block-registry";

// Your Wagtail content from API
const wagtailContent = [
    {
        id: "hero-1",
        type: "hero",
        value: {
            heading: "Welcome to Our Site",
            subheading: "Amazing content here",
            cta_text: "Get Started",
            cta_link: "/contact",
        },
    },
];
</script>
```

### Advanced Usage with Custom Props

```vue
<template>
    <PowerfulContentRenderer
        :content="content"
        :custom-block-classes="customClasses"
        :enable-error-boundary="true"
        @block-error="handleBlockError"
        @content-error="handleContentError"
    />
</template>

<script setup>
const customClasses = {
    hero: "custom-hero-styles",
    features: "custom-features-layout",
};

const handleBlockError = (block, error) => {
    console.error(`Error in ${block.type}:`, error);
    // Custom error handling
};
</script>
```

## 📋 Available Block Types

### Core Content Blocks

| Block Type    | Description                                | Vue Component                  |
| ------------- | ------------------------------------------ | ------------------------------ |
| `hero`        | Hero section with heading, CTA, background | `Hero.vue`                     |
| `features`    | Feature grid with icons and descriptions   | `FeatureGrid.vue`              |
| `testimonial` | Customer testimonial with author info      | `Testimonial.vue`              |
| `cta`         | Call-to-action section                     | `CTA.vue`                      |
| `text`        | Rich text content                          | `TextBlock.vue`                |
| `image`       | Image with caption and alignment           | `ImageBlock.vue`               |
| `statistics`  | Metrics and statistics display             | `WagtailStatisticsSection.vue` |

### Service Blocks

| Block Type           | Description                   | Vue Component                 |
| -------------------- | ----------------------------- | ----------------------------- |
| `service_packages`   | Service packages with pricing | `WagtailServicePackages.vue`  |
| `ala_carte_services` | Individual services menu      | `WagtailAlaCarteServices.vue` |
| `faq_section`        | FAQ with expandable answers   | `WagtailFAQSection.vue`       |

### Portfolio Blocks

| Block Type           | Description                      | Vue Component                  |
| -------------------- | -------------------------------- | ------------------------------ |
| `portfolio_projects` | Project showcase with filters    | `WagtailPortfolioProjects.vue` |
| `case_studies`       | Success stories and case studies | `WagtailCaseStudies.vue`       |
| `technologies`       | Technology stack showcase        | `WagtailTechnologies.vue`      |

### Advanced Blocks

| Block Type         | Description                         | Vue Component              |
| ------------------ | ----------------------------------- | -------------------------- |
| `video`            | Video embed with poster image       | `VideoBlock.vue`           |
| `gallery`          | Image gallery with layouts          | `GalleryBlock.vue`         |
| `code`             | Code block with syntax highlighting | `CodeBlock.vue`            |
| `accordion`        | Expandable accordion                | `AccordionBlock.vue`       |
| `tabs`             | Tabbed content interface            | `TabsBlock.vue`            |
| `pricing_table`    | Pricing table with tiers            | `PricingTableBlock.vue`    |
| `timeline`         | Timeline with events                | `TimelineBlock.vue`        |
| `comparison_table` | Feature comparison table            | `ComparisonTableBlock.vue` |
| `form`             | Contact/lead generation form        | `FormBlock.vue`            |
| `map`              | Interactive map                     | `MapBlock.vue`             |
| `progress_bars`    | Progress bars for skills            | `ProgressBarBlock.vue`     |

## 🔧 Block Registry System

### Adding New Blocks

```typescript
import { registerBlock } from "@/lib/blocks/block-registry";

registerBlock("my_custom_block", {
    name: "my_custom_block",
    displayName: "My Custom Block",
    description: "A custom block for special content",
    category: "content",
    icon: "star",
    component: () => import("@/components/blocks/MyCustomBlock.vue"),
    props: [
        { blockField: "title", componentProp: "title", required: true },
        { blockField: "content", componentProp: "content" },
    ],
    requiredProps: ["title"],
    optionalProps: ["content"],
});
```

### Block Metadata

```typescript
interface BlockMetadata {
    name: string;
    displayName: string;
    description: string;
    category:
        | "content"
        | "layout"
        | "interactive"
        | "media"
        | "forms"
        | "navigation";
    icon: string;
    component: () => Promise<Component>;
    props: BlockPropMapping[];
    requiredProps: string[];
    optionalProps: string[];
    validation?: (blockData: any) => boolean;
    fallbackComponent?: () => Promise<Component>;
}
```

## 🎨 Prop Mapping System

### Automatic Prop Transformation

```typescript
// Wagtail block data
{
  type: 'hero',
  value: {
    heading: 'Welcome',
    background_image: { url: '/path/to/image.jpg' }
  }
}

// Automatically transformed to component props
{
  title: 'Welcome',
  backgroundImage: '/path/to/image.jpg'
}
```

### Custom Transformations

```typescript
{
  blockField: 'background_image',
  componentProp: 'backgroundImage',
  transform: (value: any) => value?.url || value
}
```

## 🛠️ Development Tools

### Debug Mode

```vue
<PowerfulContentRenderer
    :content="content"
    :show-dev-tools="true"
    :show-debug-info="true"
/>
```

### Registry Statistics

```typescript
import { getRegistryStats } from "@/lib/blocks/block-registry";

const stats = getRegistryStats();
console.log(stats);
// {
//   totalBlocks: 25,
//   categories: { content: 10, interactive: 5, media: 3, ... },
//   blocksByCategory: [...]
// }
```

## 🚀 Performance Features

### Lazy Loading

-   Components are loaded on-demand
-   Automatic code splitting
-   Caching for frequently used components

### Error Boundaries

-   Graceful fallbacks for missing components
-   Error reporting and recovery
-   Development-friendly error messages

### Validation

-   Runtime prop validation
-   Type checking with TypeScript
-   Required field validation

## 📱 Responsive Design

All block components are built with responsive design in mind:

-   Mobile-first approach
-   Flexible layouts
-   Touch-friendly interactions
-   Optimized for all screen sizes

## 🔒 Type Safety

### Full TypeScript Support

```typescript
interface ContentBlock {
    id: string;
    type: string;
    value: Record<string, any>;
}

interface BlockPropMapping {
    blockField: string;
    componentProp: string;
    transform?: (value: any) => any;
    defaultValue?: any;
    required?: boolean;
}
```

## 🎯 Best Practices

### 1. Block Design

-   Keep blocks focused and single-purpose
-   Use consistent naming conventions
-   Provide clear descriptions and help text

### 2. Component Development

-   Follow Vue 3 Composition API patterns
-   Use TypeScript for type safety
-   Implement proper error handling

### 3. Performance

-   Use lazy loading for components
-   Optimize images and media
-   Implement proper caching strategies

### 4. Testing

-   Test all block types
-   Validate prop transformations
-   Test error scenarios

## 🚀 Getting Started

1. **Enable Feature Flags**

    ```typescript
    // Enable Wagtail content rendering
    WAGTAIL_HOME: true;
    WAGTAIL_ABOUT: true;
    WAGTAIL_SERVICES: true;
    ```

2. **Create Content in Wagtail Admin**

    - Go to `http://localhost:8000/cms/`
    - Create pages using the available block types
    - Build your content structure

3. **Use the Content Renderer**

    ```vue
    <PowerfulContentRenderer :content="pageContent" />
    ```

4. **Customize as Needed**
    - Add custom block classes
    - Implement custom error handling
    - Extend the block registry

## 🎉 Result

You now have an **extremely powerful** Wagtail backend that can:

-   ✅ Render any content structure dynamically
-   ✅ Provide 25+ pre-built block types
-   ✅ Support custom block development
-   ✅ Maintain type safety throughout
-   ✅ Handle errors gracefully
-   ✅ Scale to any content complexity
-   ✅ Provide excellent developer experience

This system gives you the flexibility of a headless CMS with the power of a full-stack framework, all while maintaining clean separation of concerns and excellent performance.
