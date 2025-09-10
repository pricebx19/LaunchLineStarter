<template>
  <div>
    <!-- Particle Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0" v-if="showParticles">
      <div class="particle-container">
        <div 
          v-for="particle in particles" 
          :key="particle.id"
          class="particle absolute rounded-full opacity-20"
          :style="{
            left: particle.x + '%',
            top: particle.y + '%',
            width: particle.size + 'px',
            height: particle.size + 'px',
            background: particle.color,
            animation: `float-${particle.id} ${particle.duration}s infinite linear`
          }"
        ></div>
      </div>
    </div>

    <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
    :class="{
      'navbar-with-background': shouldShowBackground,
      'navbar-transparent': !shouldShowBackground
    }"
    ref="navbar"
  >
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-blue-600/10 opacity-0 transition-opacity duration-500" :class="shouldShowBackground ? 'opacity-100' : 'opacity-0'"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex justify-between items-center h-20 transition-all duration-300" :class="shouldShowBackground ? 'h-16' : 'h-20'">
        
        <!-- Logo with enhanced effects -->
        <div class="flex-shrink-0 transform transition-all duration-300 hover:scale-105">
          <router-link to="/" class="flex items-center group relative">
            <!-- Glow effect -->
            <div class="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Logo icon -->
            <div class="relative mr-3 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.76 1.16.22 2.76.22 4.5-.5C20.16 26.74 22 22.55 22 17V7l-10-5z"/>
                <path d="M12 4.5L4.5 8.25v8.5c0 4.25 2.75 7.25 7.5 8.25 4.75-1 7.5-4 7.5-8.25v-8.5L12 4.5z" fill="none" stroke="currentColor" stroke-width="1"/>
              </svg>
            </div>
            
            <!-- Logo text -->
            <div class="relative">
              <span class="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                LaunchLine
              </span>
              <span class="text-xs font-light text-gray-400 block -mt-1 group-hover:text-cyan-300 transition-colors duration-300">LLC</span>
              
              <!-- Underline animation -->
              <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation with enhanced effects -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="relative px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group rounded-lg"
              :class="$route.path === item.href ? 'text-cyan-400' : ''"
              @mouseenter="onNavItemHover()"
              @mouseleave="onNavItemLeave"
            >
              <!-- Background hover effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Border glow -->
              <div class="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/30 rounded-lg transition-all duration-300"></div>
              
              <!-- Text -->
              <span class="relative z-10">{{ item.name }}</span>
              
              <!-- Active indicator -->
              <div 
                v-if="$route.path === item.href"
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              ></div>
              
              <!-- Hover indicator -->
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-8 transition-all duration-300 rounded-full"></div>
              
              <!-- Floating particles on hover -->
              <div class="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="particle-mini absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping" style="top: 20%; left: 20%; animation-delay: 0s;"></div>
                <div class="particle-mini absolute w-1 h-1 bg-purple-400 rounded-full animate-ping" style="top: 60%; right: 30%; animation-delay: 0.5s;"></div>
                <div class="particle-mini absolute w-1 h-1 bg-blue-400 rounded-full animate-ping" style="bottom: 30%; left: 60%; animation-delay: 1s;"></div>
              </div>
            </router-link>

            <!-- CTA Button -->
            <div class="ml-8">
              <router-link
                to="/contact"
                class="px-6 py-3 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 bg-[length:200%_100%] bg-left hover:bg-right text-white font-medium rounded-lg transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </router-link>
            </div>
          </div>
        </div>

        <!-- Enhanced Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="relative inline-flex items-center justify-center p-3 rounded-lg text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 group"
            :aria-expanded="isOpen"
            aria-label="Toggle navigation menu"
          >
            <!-- Background effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Hamburger lines with smooth animation -->
            <div class="relative w-6 h-6 flex flex-col justify-center items-center">
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
                :class="isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'"
              ></span>
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
                :class="isOpen ? 'opacity-0' : 'opacity-100'"
              ></span>
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out"
                :class="isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Mobile Navigation -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div v-show="isOpen" class="md:hidden absolute top-full left-0 right-0 z-40">
        <div class="bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <!-- Mobile menu background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-cyan-500/5 to-blue-600/10"></div>
          
          <div class="relative px-4 pt-4 pb-6 space-y-2">
        <router-link
              v-for="(item, index) in navigation"
          :key="item.name"
          :to="item.href"
              class="relative block px-6 py-4 text-lg font-medium text-gray-300 hover:text-white transition-all duration-300 group rounded-lg"
              :class="$route.path === item.href ? 'text-cyan-400 bg-cyan-500/10' : ''"
              @click="closeMobileMenu"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <!-- Hover background -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Left border indicator -->
              <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-cyan-400 to-purple-400 group-hover:h-full transition-all duration-300 rounded-full"></div>
              
              <span class="relative z-10 flex items-center">
          {{ item.name }}
                <svg v-if="$route.path === item.href" class="ml-auto w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
            </router-link>
            
            <!-- Mobile CTA -->
            <div class="pt-4 mt-4 border-t border-gray-700/50">
              <router-link
                to="/contact"
                @click="closeMobileMenu"
                class="block w-full px-6 py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 bg-[length:200%_100%] bg-left hover:bg-right text-white font-medium rounded-lg text-center transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </router-link>
            </div>
    </div>
        </div>
      </div>
    </transition>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isFeatureEnabled, FEATURE_FLAGS } from '../../config/features'

const route = useRoute()
const isOpen = ref(false)
const scrolled = ref(false)

// Computed property to determine if navbar should have background
// On home page: never show background (always transparent)
// On other pages: show background when scrolled
const shouldShowBackground = computed(() => {
  if (route.path === '/') {
    return false // Always transparent on home page, regardless of scroll state
  }
  return scrolled.value // Show background when scrolled on other pages
})
const showParticles = ref(true)
const navbar = ref<HTMLElement | null>(null)

// Navigation items
const baseNavigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
]

const blogNavigation = [
  { name: 'Blog', href: '/blog' },
]

// Combine navigation based on feature flags
const navigation = computed(() => [
  ...baseNavigation,
  ...(isFeatureEnabled(FEATURE_FLAGS.BLOG_PAGES) ? blogNavigation : []),
])

// Particle system
interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
}

const particles = ref<Particle[]>([])

// Generate particles
const generateParticles = () => {
  const colors = [
    'linear-gradient(45deg, #06b6d4, #3b82f6)',
    'linear-gradient(45deg, #8b5cf6, #06b6d4)',
    'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    'radial-gradient(circle, #06b6d4, transparent)',
    'radial-gradient(circle, #8b5cf6, transparent)',
  ]
  
  particles.value = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)] || '#3b82f6',
    duration: Math.random() * 20 + 10,
  }))
}

// Scroll handler
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

// Mobile menu functions
const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value
  
  // Prevent body scroll when menu is open
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

// Navigation hover effects
const onNavItemHover = () => {
  // Add subtle animations or effects here if needed
}

const onNavItemLeave = () => {
  // Clean up hover effects
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  generateParticles()
  
  // Generate dynamic CSS for particle animations
  const style = document.createElement('style')
  style.textContent = particles.value.map(particle => `
    @keyframes float-${particle.id} {
      0% { 
        transform: translateY(100vh) rotate(0deg) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 0.2;
        transform: scale(1);
      }
      90% {
        opacity: 0.2;
      }
      100% { 
        transform: translateY(-100vh) rotate(360deg) scale(0);
        opacity: 0;
      }
    }
  `).join('')
  
  document.head.appendChild(style)
  
  // Close mobile menu on route change
  route && nextTick(() => {
    closeMobileMenu()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

// Watch route changes to close mobile menu
watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<style scoped>
/* Navbar background states */
.navbar-transparent {
  background: transparent !important;
  border-bottom: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.navbar-transparent::before { opacity: 0 !important; }

.navbar-with-background {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(24px) !important;
  border-bottom: 1px solid rgba(6, 182, 212, 0.2) !important;
  box-shadow: 0 25px 50px -12px rgba(6, 182, 212, 0.1) !important;
}

.navbar-with-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(147, 51, 234, 0.05), rgba(6, 182, 212, 0.05), rgba(37, 99, 235, 0.05));
  opacity: 1 !important;
  transition: opacity 0.5s ease;
}

/* Custom animations and effects */
.particle { pointer-events: none; filter: blur(0.5px); }
.particle-mini { animation-duration: 2s; animation-iteration-count: infinite; }
.particle-container { position: relative; width: 100%; height: 100%; }

/* Enhanced hover effects */
.nav-link { position: relative; overflow: hidden; }
.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s;
}
.nav-link:hover::before { left: 100%; }

/* Mobile menu stagger animation */
@keyframes staggerIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.mobile-nav-item { animation: staggerIn 0.3s ease-out forwards; }

/* Smooth mobile menu animations */
@media (max-width: 768px) {
  .nav-item-enter-active { transition: all 0.3s ease-out; }
  .nav-item-enter-from { opacity: 0; transform: translateX(-20px); }
  .nav-item-enter-to { opacity: 1; transform: translateX(0); }
}

/* Enhanced focus states */
.focus\:ring-cyan-400\/50:focus { box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.5); }

/* Glassmorphism backdrop */
.backdrop-blur-xl { backdrop-filter: blur(24px); }
</style>