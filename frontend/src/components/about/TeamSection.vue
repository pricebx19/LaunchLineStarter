<template>
  <section class="py-8 bg-gradient-to-b from-gray-800 via-gray-900 to-black relative overflow-hidden">
    <!-- Background effects -->
    <div class="absolute inset-0 opacity-10">
      <div class="team-bg-grid"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
          <span class="text-brand-primary text-sm font-semibold">👥 {{ teamData?.title?.toUpperCase() }}</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {{ teamData?.subtitle }}
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {{ teamData?.description }}
        </p>
      </div>
      
      <!-- Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="member.name"
          class="team-member-card group"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <!-- Member Avatar -->
          <div class="member-avatar-wrapper">
            <div class="member-avatar">
              <div class="avatar-placeholder">
                {{ member.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div class="avatar-glow"></div>
            </div>
          </div>
          
          <!-- Member Info -->
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <div class="member-role">{{ member.role }}</div>
            <p class="member-description">{{ member.bio }}</p>
            
            <!-- Social Links -->
            <div class="member-skills">
              <a 
                v-for="(url, platform) in member.social" 
                :key="platform"
                :href="url || '#'"
                class="skill-tag"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ platform }}
              </a>
            </div>
          </div>
          
          <!-- Hover overlay -->
          <div class="member-overlay"></div>
        </div>
      </div>
      
      <!-- Team CTA -->
      <div class="text-center mt-16">
        <div class="team-cta-card">
          <h3 class="text-2xl font-bold text-white mb-4">{{ ctaTitle }}</h3>
          <p class="text-gray-300 mb-6">{{ ctaDescription }}</p>
          <router-link to="/contact" class="cta-button">
            {{ ctaText }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TEAM_DATA } from '../../data/about'
import type { TeamData } from '../../types/About'

interface Props {
  teamData?: TeamData
  ctaTitle?: string
  ctaDescription?: string
  ctaText?: string
}

const props = withDefaults(defineProps<Props>(), {
  teamData: () => TEAM_DATA,
  ctaTitle: 'Ready to Work with Us?',
  ctaDescription: 'Join the growing list of successful businesses that have launched into the digital stratosphere with our help.',
  ctaText: 'Start Your Project'
})

const teamMembers = computed(() => props.teamData.members)
</script>

<style scoped>
.team-bg-grid {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 30s ease-in-out infinite;
}

.team-member-card {
  @apply relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 hover:border-brand-primary/30 transition-all duration-500 overflow-hidden;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.member-avatar-wrapper {
  @apply flex justify-center mb-6;
}

.member-avatar {
  @apply relative;
}

.avatar-placeholder {
  @apply w-20 h-20 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10;
}

.avatar-glow {
  @apply absolute inset-0 bg-gradient-to-br from-brand-primary/40 to-blue-600/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500;
}

.member-info {
  @apply text-center relative z-10;
}

.member-name {
  @apply text-xl font-bold text-white mb-1 group-hover:text-brand-primary transition-colors;
}

.member-role {
  @apply text-brand-primary font-semibold text-sm mb-3;
}

.member-description {
  @apply text-gray-400 text-sm leading-relaxed mb-4;
}

.member-skills {
  @apply flex flex-wrap justify-center gap-2;
}

.skill-tag {
  @apply px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full border border-brand-primary/30;
}

.member-overlay {
  @apply absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500;
}

.team-cta-card {
  @apply bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto;
}

.cta-button {
  @apply inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-blue-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-brand-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gridMove {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, 10px); }
}
</style>
