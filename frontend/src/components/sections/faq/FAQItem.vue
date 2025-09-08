<template>
  <div 
    class="faq-item relative group opacity-0 translate-y-8"
    :style="{ 'animation-delay': `${index * 150}ms` }"
    @click="toggleFAQ"
  >
    <!-- Animated background layers -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/98 rounded-2xl transition-all duration-500"></div>
    
    <!-- Glow border effect -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/20 via-blue-500/10 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    <div class="absolute inset-[1px] bg-gradient-to-br from-gray-800 via-gray-800/98 to-gray-900 rounded-2xl transition-all duration-500"></div>
    
    <!-- Content container -->
    <div class="relative z-10 cursor-pointer">
      <!-- Question header -->
      <div 
        class="flex items-center justify-between p-8 group-hover:bg-gray-700/20 transition-colors duration-300 rounded-t-2xl"
        role="button"
        :aria-expanded="faq.isOpen"
        :aria-controls="`faq-answer-${index}`"
        tabindex="0"
        @keydown.enter="toggleFAQ"
        @keydown.space="toggleFAQ"
      >
        <div class="flex items-center space-x-4 flex-1">
          <!-- Question number badge -->
          <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-primary/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-brand-primary font-bold text-sm">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          
          <!-- Question text -->
          <h3 
            :id="`faq-question-${index}`"
            class="text-lg md:text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500 flex-1"
          >
            {{ faq.question }}
          </h3>
        </div>
        
        <!-- Enhanced chevron with rotation and glow -->
        <div class="flex-shrink-0 relative">
          <div class="w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-primary/20 group-hover:to-blue-600/20 transition-all duration-300">
            <svg 
              class="w-6 h-6 text-brand-primary transition-all duration-500 ease-out transform"
              :class="{ 'rotate-180 scale-110': faq.isOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          
          <!-- Glow ring around chevron -->
          <div class="absolute inset-0 border-2 border-transparent group-hover:border-brand-primary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
        </div>
      </div>
      
      <!-- Answer content with smooth height animation -->
      <div 
        :id="`faq-answer-${index}`"
        class="answer-content overflow-hidden transition-all duration-500 ease-out"
        :class="{ 'max-h-0': !faq.isOpen, 'max-h-96': faq.isOpen }"
        role="region"
        :aria-labelledby="`faq-question-${index}`"
      >
        <div class="px-8 pb-8">
          <div class="prose prose-sm prose-invert max-w-none">
            <p class="text-gray-300 leading-relaxed mb-0">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FAQ {
  question: string
  answer: string
  isOpen: boolean
}

const props = defineProps<{
  faq: FAQ
  index: number
}>()

const emit = defineEmits<{
  'toggle': [faq: FAQ]
}>()

const toggleFAQ = () => {
  emit('toggle', props.faq)
}
</script>

<style scoped>
.faq-item {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes animate-pulse-glow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-glow {
  animation: animate-pulse-glow 2s ease-in-out infinite;
}

.group-hover\:bg-clip-text:hover {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
