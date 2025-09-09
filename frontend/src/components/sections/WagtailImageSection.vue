<template>
  <section class="wagtail-image-section">
    <div class="container mx-auto px-4 py-16 lg:py-24">
      <div class="max-w-6xl mx-auto">
        <!-- Image -->
        <div class="image-container">
          <img 
            :src="imageData.image" 
            :alt="imageData.caption || 'Image'"
            class="image"
          />
          
          <!-- Caption -->
          <div v-if="imageData.caption" class="image-caption">
            {{ imageData.caption }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ImageData {
  image: string
  caption?: string
}

interface Props {
  imageData: ImageData
}

defineProps<Props>()
</script>

<style scoped>
.wagtail-image-section {
  background: #f8fafc;
}

.image-container {
  text-align: center;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.02);
}

.image-caption {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .image {
    border-radius: 0.75rem;
  }
  
  .image-caption {
    font-size: 0.75rem;
  }
}
</style>
