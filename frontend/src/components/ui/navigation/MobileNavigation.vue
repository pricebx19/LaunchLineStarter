<template>
  <nav class="mobile-nav fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
    <div class="max-w-6xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-brand-primary">
          LaunchLine
        </router-link>
        
        <!-- Mobile menu button -->
        <button 
          @click="toggleMenu"
          class="mobile-menu-btn p-2 text-gray-300 hover:text-white transition-colors"
          :class="{ 'active': isMenuOpen }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div 
        class="mobile-menu absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50 transition-all duration-300"
        :class="{ 'opacity-0 invisible': !isMenuOpen, 'opacity-100 visible': isMenuOpen }"
      >
        <div class="px-4 py-6 space-y-4">
          <router-link 
            v-for="item in navigationItems" 
            :key="item.href"
            :to="item.href" 
            class="block text-white hover:text-brand-primary transition-colors py-2"
            @click="closeMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { NavigationItem } from '../../../types/index'
import { navigationItems } from '../../../data/navigation'

defineOptions({
  name: 'MobileNavigation'
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.mobile-nav')) {
    closeMenu()
  }
}

// Close menu on escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.mobile-nav {
  /* Ensure proper z-index and backdrop */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.mobile-menu-btn {
  /* Touch-friendly button */
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu {
  /* Smooth transitions */
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.mobile-menu.opacity-100 {
  transform: translateY(0);
}

/* Ensure proper touch targets */
.mobile-menu a {
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
}

/* Active state for current page */
.mobile-menu a.router-link-active {
  color: #0EA5E9;
  font-weight: 600;
}
</style>
