<template>
  <div class="feature-flag-example">
    <!-- Example 1: Simple feature flag check -->
    <div class="hero-section">
      <!-- Legacy Hero (current Vue.js implementation) -->
      <div v-if="shouldShowLegacyHero" class="legacy-hero">
        <h1>Legacy Hero Section</h1>
        <p>This is the current Vue.js implementation</p>
        <div class="migration-badge">
          Status: {{ heroStatus.message }}
        </div>
      </div>
      
      <!-- Wagtail Hero (new CMS-managed implementation) -->
      <div v-if="shouldShowWagtailHero" class="wagtail-hero">
        <h1>Wagtail Hero Section</h1>
        <p>This content is managed through Wagtail CMS</p>
        <div class="migration-badge wagtail">
          Status: {{ heroStatus.message }}
        </div>
      </div>
      
      <!-- A/B Testing: Show both (when transitioning) -->
      <div v-if="shouldShowBothHero" class="ab-test-section">
        <div class="side-by-side">
          <div class="legacy-version">
            <h2>Legacy Version</h2>
            <p>Current implementation</p>
          </div>
          <div class="wagtail-version">
            <h2>Wagtail Version</h2>
            <p>New CMS implementation</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Example 2: Navigation strategy -->
    <div class="navigation-example">
      <h3>Navigation Strategy: {{ navigationStrategy }}</h3>
      <div class="nav-status">
        <span :class="{ enabled: useWagtailNavbar }">
          📍 Navbar: {{ useWagtailNavbar ? 'Wagtail' : 'Legacy' }}
        </span>
        <span :class="{ enabled: useWagtailFooter }">
          🦶 Footer: {{ useWagtailFooter ? 'Wagtail' : 'Legacy' }}
        </span>
      </div>
    </div>

    <!-- Example 3: Content strategy overview -->
    <div class="content-strategy">
      <h3>Content Migration Strategy: {{ contentStrategy }}</h3>
      <div class="content-flags">
        <div v-for="flag in contentFlags" :key="flag.name" class="flag-item">
          <span :class="{ enabled: flag.enabled }">
            {{ flag.enabled ? '✅' : '❌' }} {{ flag.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Development tools (only in dev mode) -->
    <div v-if="isDev" class="dev-tools">
      <h3>🛠️ Development Tools</h3>
      <div class="dev-actions">
        <button @click="refreshFlags" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Refresh Flags' }}
        </button>
        <button @click="logAllFlags">Log All Flags</button>
        <button @click="toggleHeroFlag" v-if="canToggleHero">
          Toggle Hero ({{ useWagtailHero ? 'Disable' : 'Enable' }} Wagtail)
        </button>
      </div>
      
      <div class="debug-info">
        <h4>Debug Info:</h4>
        <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  useFeatureFlags, 
  useComponentFlags, 
  useNavigationFlags, 
  useContentFlags,
  useFeatureFlagsDev
} from '../../composables/useFeatureFlags'

// Basic feature flags setup
const featureFlags = useFeatureFlags()
const { isLoading, refresh } = featureFlags

// Component-specific flags for hero section
const heroFlags = useComponentFlags('HERO')
const {
  shouldShowLegacy: shouldShowLegacyHero,
  shouldShowWagtail: shouldShowWagtailHero,
  shouldShowBoth: shouldShowBothHero,
  componentStatus: heroStatus
} = heroFlags

// Navigation strategy
const { 
  useWagtailNavbar, 
  useWagtailFooter, 
  navigationStrategy 
} = useNavigationFlags()

// Content strategy
const { 
  useWagtailHero,
  useWagtailFeatures,
  useWagtailTestimonials,
  useWagtailCTA,
  contentStrategy 
} = useContentFlags()

// Development tools
const { debugInfo, logAllFlags } = useFeatureFlagsDev()

// Environment check
const isDev = computed(() => import.meta.env.DEV)

// Can toggle flags (for development)
const canToggleHero = computed(() => 
  heroStatus.value.canToggle && import.meta.env.DEV
)

// Content flags for display
const contentFlags = computed(() => [
  { name: 'hero', label: 'Hero Sections', enabled: useWagtailHero.value },
  { name: 'features', label: 'Feature Grids', enabled: useWagtailFeatures.value },
  { name: 'testimonials', label: 'Testimonials', enabled: useWagtailTestimonials.value },
  { name: 'cta', label: 'CTA Sections', enabled: useWagtailCTA.value },
])

// Methods
const refreshFlags = async () => {
  await refresh()
}

const toggleHeroFlag = () => {
  // In a real implementation, you'd call the API to toggle the flag
  console.log('Toggle hero flag - would call API in real implementation')
}
</script>

<style scoped>
.feature-flag-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.hero-section {
  margin-bottom: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.legacy-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.wagtail-hero {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.ab-test-section {
  padding: 1rem;
  background: #f7fafc;
}

.side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.legacy-version, .wagtail-version {
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.legacy-version {
  background: #e2e8f0;
}

.wagtail-version {
  background: #c6f6d5;
}

.migration-badge {
  display: inline-block;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.migration-badge.wagtail {
  background: rgba(255, 255, 255, 0.2);
}

.navigation-example, .content-strategy {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.nav-status {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.nav-status span {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: #fee2e2;
  color: #991b1b;
}

.nav-status span.enabled {
  background: #dcfce7;
  color: #166534;
}

.content-flags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.flag-item span {
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  background: #fee2e2;
  color: #991b1b;
}

.flag-item span.enabled {
  background: #dcfce7;
  color: #166534;
}

.dev-tools {
  margin-top: 2rem;
  padding: 1rem;
  background: #1f2937;
  color: white;
  border-radius: 8px;
}

.dev-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.dev-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
}

.dev-actions button:hover {
  background: #2563eb;
}

.dev-actions button:disabled {
  background: #6b7280;
  cursor: not-allowed;
}

.debug-info {
  margin-top: 1rem;
}

.debug-info pre {
  background: #374151;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
}
</style>
