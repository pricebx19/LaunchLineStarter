<template>
  <div>
    <h2 class="text-3xl font-bold text-white mb-8">{{ title }}</h2>
    <p class="text-gray-300 text-lg leading-relaxed mb-8">
      {{ description }}
    </p>

    <!-- Contact Methods -->
    <div class="space-y-6 mb-12">
      <ContactMethod
        v-for="method in contactMethods"
        :key="method.title"
        :title="method.title"
        :content="method.content"
        :link="method.link"
        :type="method.type"
        :icon-path="method.iconPath"
      >
        <template v-if="method.customContent" #default>
          <div v-html="method.customContent"></div>
        </template>
      </ContactMethod>
    </div>

    <!-- Response Time Card -->
    <div class="card hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:border-brand-primary/50">
      <h3 class="text-white font-semibold mb-2">{{ responseTimeTitle }}</h3>
      <p class="text-gray-300 text-sm">
        {{ responseTimeDescription }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactMethod from './ContactMethod.vue'

interface ContactMethodData {
  title: string
  content?: string
  customContent?: string
  link?: string
  type: 'email' | 'phone' | 'location' | 'custom'
  iconPath?: string
}

interface Props {
  title?: string
  description?: string
  contactMethods?: ContactMethodData[]
  responseTimeTitle?: string
  responseTimeDescription?: string
}

withDefaults(defineProps<Props>(), {
  title: "Let's Start a Conversation",
  description: "We're here to help you transform your business with professional web applications and software that convert. Whether you're a startup looking to scale, a growing business needing custom solutions, or any company ready to dominate digitally, our team is ready to launch your success.",
  contactMethods: () => [
    {
      title: 'Email',
      content: 'breprice@launchlinellc.com',
      link: 'mailto:breprice@launchlinellc.com',
      type: 'email'
    },
    {
      title: 'Phone',
      content: '(570) 766-3452',
      link: 'tel:+15707663452',
      type: 'phone'
    },
    {
      title: 'Office',
      customContent: 'Bloomsburg<br>Pennsylvania<br>United States',
      type: 'location'
    }
  ],
  responseTimeTitle: 'Quick Response Guaranteed',
  responseTimeDescription: "We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly. Your success is our priority."
})

defineOptions({
  name: 'ContactInfo'
})
</script>

<style scoped>
/* Card hover effects */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
