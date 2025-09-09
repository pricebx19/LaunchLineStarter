<template>
  <div :class="['text-center', marginClass]">
    <!-- Badge -->
    <div v-if="badge" class="mb-6">
      <span :class="[
        'inline-block px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm',
        badgeVariant === 'primary' ? 'bg-gradient-to-r from-brand-primary/20 to-blue-600/20 text-brand-primary border-brand-primary/30' :
        badgeVariant === 'secondary' ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-400 border-purple-400/30' :
        'bg-gradient-to-r from-gray-600/20 to-gray-700/20 text-gray-300 border-gray-500/30'
      ]">
        {{ badge }}
      </span>
    </div>

    <!-- Title with optional highlighted text -->
    <h2 :class="[
      'font-bold text-white mb-6',
      size === 'large' ? 'text-4xl md:text-5xl' : 
      size === 'medium' ? 'text-3xl md:text-4xl' : 
      'text-2xl md:text-3xl',
      titleClass
    ]">
      {{ title }}
      <span 
        v-if="highlightedText" 
        :class="[
          highlightVariant === 'gradient' ? 'text-transparent bg-gradient-to-r from-brand-primary to-blue-400 bg-clip-text' :
          highlightVariant === 'primary' ? 'text-brand-primary' :
          'text-blue-400'
        ]"
      >
        {{ highlightedText }}
      </span>
    </h2>

    <!-- Description/Subtitle -->
    <p v-if="description" :class="[
      'leading-relaxed mx-auto',
      size === 'large' ? 'text-xl max-w-4xl' : 
      size === 'medium' ? 'text-lg max-w-3xl' : 
      'text-base max-w-2xl',
      descriptionVariant === 'light' ? 'text-gray-300' :
      descriptionVariant === 'medium' ? 'text-gray-400' :
      'text-gray-500',
      descriptionClass
    ]">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { SectionHeaderData } from '../../../types/UI'
import { SECTION_HEADER_PRESETS } from '../../../data/ui'

interface Props {
  badge?: string
  badgeVariant?: 'primary' | 'secondary' | 'neutral'
  title?: string
  highlightedText?: string
  highlightVariant?: 'gradient' | 'primary' | 'blue'
  description?: string
  size?: 'small' | 'medium' | 'large'
  descriptionVariant?: 'light' | 'medium' | 'dark'
  marginClass?: string
  titleClass?: string
  descriptionClass?: string
  headerData?: SectionHeaderData
}

withDefaults(defineProps<Props>(), {
  badgeVariant: 'primary',
  highlightVariant: 'gradient',
  size: 'medium',
  descriptionVariant: 'medium',
  marginClass: 'mb-16',
  titleClass: 'leading-tight',
  descriptionClass: '',
  headerData: () => SECTION_HEADER_PRESETS.default
})
</script>

<style scoped>
.text-transparent {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>