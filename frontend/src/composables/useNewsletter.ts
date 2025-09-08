import { api } from '../lib/api'

export function useNewsletter() {
  const handleNewsletterSubscribe = async (email: string) => {
    try {
      console.log('Newsletter subscription for:', email)
      
      // Submit as a lead with newsletter source
      const leadData = {
        name: 'Newsletter Subscriber', // Default name for newsletter subscriptions
        email: email,
        message: 'Newsletter subscription request',
        source: 'newsletter'
      }
      
      const response = await api.submitLead(leadData)
      
      if (response.success) {
        console.log('Newsletter subscription successful')
        return { success: true, message: 'Successfully subscribed to newsletter!' }
      } else {
        console.error('Newsletter subscription failed:', response.error)
        return { success: false, message: response.error || 'Failed to subscribe to newsletter' }
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      return { success: false, message: 'Network error occurred. Please try again.' }
    }
  }

  return {
    handleNewsletterSubscribe
  }
}
