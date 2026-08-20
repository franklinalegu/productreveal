# AI Product Reveal Ads Masterclass

A responsive landing page for the AI Product Reveal Ads Masterclass.

## Included

- Hero campaign section with YouTube reveal clip
- Live countdown to September 05, 2026 at 8:00 PM WAT
- Two session curriculum and workflow explanation
- Audience, benefits and testimonial sections
- Registration form capture for Google Sheets
- Paystack checkout CTA
- Google Calendar link and downloadable calendar file
- Mobile sticky registration CTA
- Consent checkbox and registration privacy note
- Optional Google Analytics event tracking

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Connect the registration form with Formspree

1. Create a free form at [Formspree](https://formspree.io), or use the already connected form endpoint below.
2. Add the fields used by the landing page: name, email, phone, role, consent, classStart, timezone, source and pageUrl.
3. Copy the endpoint that looks like `https://formspree.io/f/your-form-id`.
4. Add it to `.env.local`:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xnpalypp
```

5. Restart the Vite server after changing `.env.local`.

Formspree will receive the registration details and can forward them to your email or dashboard. UTM campaign fields are also included when present.

## Optional analytics

Add a Google Analytics 4 measurement ID to `.env.local`:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The page tracks registration opens, video plays, form submissions, checkout clicks, calendar clicks and registration errors when Analytics is configured.

## Payment settings

The landing page displays an early bird price of **₦6,000** and a regular price of **₦15,000**. Update the actual Paystack product settings separately so the checkout matches the page.

## Content before publishing

Replace the testimonial names and quotes with verified participant feedback and confirmed permissions. Confirm the class duration, delivery details and any recording, support or certificate promises before publishing them as included benefits.
