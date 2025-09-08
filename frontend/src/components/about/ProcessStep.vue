<template>
  <div class="approach-step group relative flex flex-col h-full">
    <!-- Step Number Badge -->
    <div class="step-number-badge">
      <div class="step-number">{{ stepNumber }}</div>
      <div class="step-pulse"></div>
    </div>
    
    <!-- Step Content -->
    <div class="approach-card group-hover:scale-105 transition-all duration-500 flex-1 flex flex-col">
      <div class="step-icon-wrapper">
        <div class="step-icon">
          <slot name="icon">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </slot>
        </div>
      </div>
      
      <div class="card-content flex-1 flex flex-col">
        <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
          {{ title }}
        </h3>
        <p class="text-gray-400 leading-relaxed mb-6 flex-1">
          {{ description }}
        </p>
        
        <!-- Step Features -->
        <div class="step-features mt-auto">
          <div v-for="feature in features" :key="feature" class="flex items-center mb-2">
            <div class="feature-check">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-sm text-gray-300 ml-2">{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  stepNumber: number
  title: string
  description: string
  features: string[]
}

defineProps<Props>()

defineOptions({
  name: 'ProcessStep'
})
</script>

<script lang="ts">
export default {
  name: 'ProcessStep'
}
</script>

<style scoped>
.approach-step {
  position: relative;
  display: flex;
  flex-direction: column;
}

.approach-step .approach-card {
  min-height: fit-content;
}

.step-number-badge {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
}

.step-number {
  position: absolute;
  inset: 0;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #0EA5E9, #2563EB);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  z-index: 10;
}

.step-pulse {
  position: absolute;
  inset: 0;
  width: 4rem;
  height: 4rem;
  background-color: rgba(14, 165, 233, 0.3);
  border-radius: 50%;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.approach-card {
  background-color: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.approach-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(14, 165, 233, 0.1);
}

.step-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.2));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.5s ease;
}

.group:hover .step-icon-wrapper {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
  transform: scale(1.1);
}

.step-icon {
  color: #0EA5E9;
  transition: color 0.5s ease;
}

.group:hover .step-icon {
  color: #60A5FA;
}

.card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step-features {
  margin-top: auto;
}

.step-features > * + * {
  margin-top: 0.5rem;
}

.feature-check {
  width: 1.25rem;
  height: 1.25rem;
  background-color: rgba(14, 165, 233, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0EA5E9;
}
</style>
