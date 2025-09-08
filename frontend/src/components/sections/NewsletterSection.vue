<template>
  <section class="py-16 bg-gradient-to-t from-gray-900 to-gray-800 relative overflow-hidden">
    <!-- Subtle starry background -->
    <div class="stars-container absolute inset-0 opacity-20">
      <div class="star star-small" v-for="i in 15" :key="`newsletter-${i}`" :style="getStarStyle(i, 'small')"></div>
    </div>
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        {{ title }}
      </h2>
      <p class="text-xl text-gray-400 mb-8">
        {{ subtitle }}
      </p>
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          v-model="email"
          type="email" 
          :placeholder="placeholder" 
          class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary hover:border-gray-500 transition-colors"
          required
        >
        <button 
          type="submit"
          class="btn-primary px-8 hover:scale-105 transition-transform duration-300"
          :disabled="loading"
        >
          {{ buttonText }}
        </button>
      </form>
      
      <!-- Success/Error Messages -->
      <div v-if="message" :class="messageClass" class="mt-4 text-sm">
        {{ message }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Stay Updated',
  subtitle: 'Get the latest insights and updates delivered straight to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe'
})

const emit = defineEmits<{
  subscribe: [email: string]
}>()

const email = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const messageClass = computed(() => {
  return isSuccess.value ? 'text-green-400' : 'text-red-400'
})

const handleSubmit = async () => {
  if (!email.value) return
  
  loading.value = true
  message.value = ''
  
  try {
    emit('subscribe', email.value)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    message.value = 'Thanks for subscribing!'
    isSuccess.value = true
    email.value = ''
  } catch (error) {
    message.value = 'Something went wrong. Please try again.'
    isSuccess.value = false
  } finally {
    loading.value = false
    // Clear message after 3 seconds
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

// Generate random star positions
const getStarStyle = (index: number, size: string) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 2
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

defineOptions({
  name: 'NewsletterSection'
})
</script>

<style scoped>
/* Starry Background Styles */
.stars-container {
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-small {
  width: 1px;
  height: 1px;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.4);
}

/* Animations */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Newsletter section improvements */
.newsletter-section {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-top: 1px solid #374151;
}

/* Button hover effects */
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-primary:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Form input hover effects */
input:hover {
  border-color: #6b7280;
}

input:focus {
  border-color: #3b82f6;
}
</style>
