<template>
  <section class="bg-gradient-to-b from-gray-900 to-gray-800 relative">
    <!-- Unified Background -->
    <StarryBackground 
      :small-count="30"
      :show-large="false"
      :show-medium="false" 
      :show-shooting="false"
      :opacity="0.3"
    />
    
    <!-- Section Header -->
    <PortfolioHeader />
    
    <!-- Filter Section -->
    <div class="pb-8 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryFilter 
          :categories="categories"
          :selected-categories="selectedCategories"
          :special-filters="specialFilters"
          :item-type="'Projects'"
          :page-key="'portfolio'"
          @categories-change="$emit('categories-change', $event)"
          @special-filters-change="$emit('special-filters-change', $event)"
        />
      </div>
    </div>

    <!-- Portfolio Projects Grid -->
    <div class="pb-10 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PortfolioProjectsGrid
          :projects="filteredProjects"
          :filter-key="`${selectedCategories.join(',')}-${JSON.stringify(specialFilters)}`"
          @select-project="openProjectModal"
          @preview-project="showProjectPreview"
        />
        
        <!-- Load More Button -->
        <LoadMoreButton
          :visible="hasMoreProjects || shouldShowLessButton"
          :loading="isLoading"
          :remaining-count="remainingProjectsCount"
          :show-all="!hasMoreProjects && shouldShowLessButton"
          :show-less-button="shouldShowLessButton"
          item-type="Project"
          show-less-text="Show Less Projects"
          @show-more="loadMoreProjects"
          @show-less="handleShowLess"
        />
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal 
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch, withDefaults } from 'vue'
import { usePortfolioFilters } from '../../../../composables/usePortfolioFilters'

const StarryBackground = defineAsyncComponent(() => import('../../../effects/StarryBackground.vue'))
const CategoryFilter = defineAsyncComponent(() => import('../../../utility/filters/CategoryFilter.vue'))
const PortfolioHeader = defineAsyncComponent(() => import('../layout/PortfolioHeader.vue'))
const PortfolioProjectsGrid = defineAsyncComponent(() => import('./PortfolioProjectsGrid.vue'))
const LoadMoreButton = defineAsyncComponent(() => import('../../../utility/LoadMoreButton.vue'))
const ProjectModal = defineAsyncComponent(() => import('../layout/ProjectModal.vue'))

interface Project {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  package: string
  timeline: string
  category: string
  image?: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'featured'
  metrics?: {
    visits?: string
    conversion?: string
    performance?: string
  }
}

const props = withDefaults(defineProps<{
  categories: string[]
  selectedCategories: string[]
  specialFilters: {
    popular: boolean
    featured: boolean
    recent: boolean
  }
  projects: Project[]
  initialVisibleCount?: number
}>(), {
  initialVisibleCount: 3
})

defineEmits<{
  'categories-change': [categories: string[]]
  'special-filters-change': [filters: { popular: boolean; featured: boolean; recent: boolean }]
  'select-project': [project: Project]
  'preview-project': [project: Project]
}>()

// Internal state for loading and modal
const isLoading = ref<boolean>(false)
const selectedProject = ref<Project | null>(null)

// Convert props to reactive refs for the composable
const projectsRef = computed(() => props.projects)
const categoriesRef = computed(() => props.categories)
const selectedCategoriesRef = computed(() => props.selectedCategories)
const specialFiltersRef = computed(() => props.specialFilters)

// Use portfolio filters composable
const {
  visibleProjects,
  filteredProjects,
  hasMoreProjects,
  remainingProjectsCount,
  shouldShowLessButton,
  loadMoreProjects: loadMore,
  showLessProjects,
  resetPagination
} = usePortfolioFilters(projectsRef, categoriesRef, selectedCategoriesRef, specialFiltersRef, props.initialVisibleCount)

// Methods
const loadMoreProjects = async () => {
  isLoading.value = true
  await loadMore()
  isLoading.value = false
}

const handleShowLess = () => {
  showLessProjects()
}

const openProjectModal = (project: Project) => {
  selectedProject.value = project
}

const closeProjectModal = () => {
  selectedProject.value = null
}

const showProjectPreview = (project: Project) => {
  // Add preview functionality here
  // TODO: Implement project preview modal or functionality
}

// Note: No automatic pagination reset on filter changes
// Pagination only resets when user explicitly chooses to collapse
</script>

<style scoped>
/* Main container styles only - component-specific styles moved to individual components */
</style>