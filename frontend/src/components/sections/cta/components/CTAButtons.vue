<template>
  <div class="flex flex-col sm:flex-row gap-6 justify-center">
    <router-link 
      v-if="primaryButton"
      :to="primaryButton.link"
      class="cta-button primary"
    >
      {{ primaryButton.text }}
      <span class="ml-2">{{ primaryButton.icon }}</span>
    </router-link>
    <router-link 
      v-if="secondaryButton"
      :to="secondaryButton.link"
      class="cta-button secondary"
    >
      {{ secondaryButton.text }}
      <span class="ml-2">{{ secondaryButton.icon }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface CTAButton {
  text: string
  link: string
  icon?: string
}

withDefaults(defineProps<{
  primaryButton?: CTAButton
  secondaryButton?: CTAButton
}>(), {
  primaryButton: () => ({
    text: 'Start Your Project',
    link: '/contact',
    icon: '🚀'
  }),
  secondaryButton: () => ({
    text: 'View Services',
    link: '/services',
    icon: '⚡'
  })
})
</script>

<style scoped>
/* CTA Buttons */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-button.primary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
</style>
