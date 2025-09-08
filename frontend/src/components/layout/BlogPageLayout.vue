<template>
  <div class="blog-page">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed - this is a layout wrapper
</script>

<style scoped>
/* Blog page specific styles */
.blog-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
}

/* Enhanced animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  }
}

/* Apply animations */
.blog-page > * {
  animation: slideInUp 0.6s ease-out forwards;
}

.blog-page > *:nth-child(2) {
  animation-delay: 0.1s;
}

.blog-page > *:nth-child(3) {
  animation-delay: 0.2s;
}

.blog-page > *:nth-child(4) {
  animation-delay: 0.3s;
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .blog-page {
    background: linear-gradient(135deg, #0c0a1a 0%, #1a1625 50%, #2d1b3d 100%);
  }
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #60a5fa, #2563eb);
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, 
    rgba(55, 65, 81, 0.1) 25%, 
    rgba(75, 85, 99, 0.2) 50%, 
    rgba(55, 65, 81, 0.1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}
</style>
