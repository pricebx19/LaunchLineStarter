<template>
  <section class="contact-info-block py-16 bg-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card p-8">
        <h2 class="section-title text-3xl font-bold text-white mb-6">
          {{ companyName }}
          <span class="title-accent"></span>
        </h2>
        
        <p v-if="companyDescription" class="text-gray-300 text-lg leading-relaxed mb-8">
          {{ companyDescription }}
        </p>

        <!-- Contact Methods -->
        <div class="space-y-6">
          <div v-if="phone" class="contact-method">
            <div class="contact-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div class="contact-details">
              <h3 class="contact-label">Phone</h3>
              <a :href="`tel:${phone}`" class="contact-value">{{ phone }}</a>
            </div>
          </div>

          <div v-if="email" class="contact-method">
            <div class="contact-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="contact-details">
              <h3 class="contact-label">Email</h3>
              <a :href="`mailto:${email}`" class="contact-value">{{ email }}</a>
            </div>
          </div>

          <div v-if="addressLine1 || addressLine2" class="contact-method">
            <div class="contact-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="contact-details">
              <h3 class="contact-label">Address</h3>
              <div class="contact-value">
                <div v-if="addressLine1">{{ addressLine1 }}</div>
                <div v-if="addressLine2">{{ addressLine2 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  companyName: string
  companyDescription?: string
  phone?: string
  email?: string
  addressLine1?: string
  addressLine2?: string
}

defineProps<Props>()
</script>

<style scoped>
.glass-card {
  @apply bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl;
}

.section-title {
  @apply relative;
}

.title-accent {
  @apply absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full;
}

.contact-method {
  @apply flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700;
}

.contact-icon {
  @apply flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white;
}

.contact-details {
  @apply flex-1;
}

.contact-label {
  @apply text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1;
}

.contact-value {
  @apply text-white hover:text-blue-400 transition-colors;
}

.contact-value a {
  @apply text-blue-400 hover:text-blue-300;
}
</style>
