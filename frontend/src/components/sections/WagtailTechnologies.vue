<template>
  <section class="wagtail-technologies">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 v-if="technologiesData.heading" class="section-heading">
            {{ technologiesData.heading }}
          </h2>
          <p v-if="technologiesData.subheading" class="section-subheading">
            {{ technologiesData.subheading }}
          </p>
        </div>

        <!-- Technologies Grid -->
        <div class="technologies-grid">
          <div 
            v-for="technology in technologiesData.technologies" 
            :key="technology.name"
            class="technology-card"
          >
            <div class="technology-icon" v-html="technology.icon"></div>
            <h3 class="technology-name">{{ technology.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Technology {
  name: string
  icon: string
}

interface TechnologiesData {
  heading?: string
  subheading?: string
  technologies: Technology[]
}

interface Props {
  technologiesData: TechnologiesData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-technologies {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.section-subheading {
  font-size: 1.25rem;
  color: #cbd5e1;
  max-width: 3xl;
  margin: 0 auto;
}

.technologies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.technology-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.technology-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.technology-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
}

.technology-card:hover::before {
  opacity: 1;
}

.technology-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.technology-card:hover .technology-icon {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.1);
}

.technology-icon :deep(svg) {
  width: 2rem;
  height: 2rem;
}

.technology-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 2rem;
  }
  
  .technologies-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }
  
  .technology-card {
    padding: 1.5rem;
  }
  
  .technology-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .technology-icon :deep(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .technology-name {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .technologies-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .technology-card {
    padding: 1rem;
  }
}
</style>
