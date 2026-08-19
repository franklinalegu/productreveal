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

## Connect the registration form to Google Sheets

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the starter code with `google-apps-script/Code.gs`.
4. Save the project.
5. Select **Deploy → New deployment**.
6. Choose **Web app**.
7. Set **Execute as** to yourself.
8. Set **Who has access** to anyone.
9. Deploy and copy the Web app URL ending in `/exec`.
10. Add it to `.env.local`:

```bash
VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the Vite server after changing `.env.local`. New registrations will be added to a `Registrations` sheet with timestamp, contact details, role, consent, class date, timezone, source and UTM fields.

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
