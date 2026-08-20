export const CLASS_DETAILS = {
  startIso: '2026-09-05T20:00:00+01:00',
  display: '05 SEP / 8:00 PM WAT',
  title: 'AI Product Reveal Ads Masterclass',
  location: 'Live online · WAT',
  durationMinutes: 120,
}

export const PAYMENT_LINK = 'https://paystack.shop/pay/productreview'
export const PRICING = {
  earlyBird: '₦6,000',
  regular: '₦15,000',
}

// Add the Formspree endpoint in .env.local.
export const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
