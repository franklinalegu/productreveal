# AI Product Reveal Landing Page Audit

Audit date: 20 August 2026

## Summary

The landing page was reviewed for build health, responsive layout, title wrapping, registration flow, external integrations and client side security. The page builds successfully and the registration flow is now a guided two step process that captures details with Formspree before handing the visitor to Paystack.

## Checks completed

### Build and dependencies

- `npm run build` passes successfully.
- `npm audit --omit=dev` reports zero vulnerabilities.
- No runtime code uses `eval`, `new Function`, `innerHTML` or `dangerouslySetInnerHTML`.
- No localhost or loopback URLs are used by browser facing code.
- Generated dependencies and local environment files are ignored by Git.

### Registration and payment

- Registration is split into an overview screen, personal details step and place confirmation step.
- Draft fields are stored in `sessionStorage` for 30 minutes rather than persistent local storage.
- The form requires consent before submission.
- Formspree receives the registration payload over HTTPS.
- Formspree success is followed by a clear Paystack payment handoff.
- Payment still uses a hosted Paystack link, so no Paystack secret key is exposed in the browser.
- The user can add the class to Google Calendar or download an `.ics` file.
- The page does not claim that payment is complete until the visitor proceeds to Paystack.

### Security

- Added Vercel security headers in `vercel.json`:
  - Content Security Policy
  - Referrer Policy
  - Permissions Policy
  - X Content Type Options
  - Same origin frame policy
- External links opened in a new tab use `rel="noreferrer"`.
- The Formspree endpoint is public by design and contains no private credential.
- Optional Google Analytics loads only when a measurement ID is configured.
- A GitHub token was previously shared in chat. It should be revoked and replaced immediately. No token is stored in the repository or remote URL.

### Responsive layout

- Hero layout stacks before tablet widths so titles do not overlap the video panel.
- Main titles use intentional line breaks and no longer overflow their containers.
- Session and testimonial cards collapse from four columns to two and then one column.
- Metadata labels wrap safely on small screens.
- Registration modal fields and calendar actions stack on narrow screens.
- Mobile navigation and the sticky registration CTA are available below tablet width.
- `prefers-reduced-motion` is respected for session card animations.

### Visual system

- Major titles use one colour and consistent typography.
- Session, testimonial and offer surfaces use a calmer neutral family.
- High saturation contrast was removed from the session cards and supporting UI.
- Decorative elements are kept behind content and do not create horizontal overflow.
- The supplied reveal video remains available through an explicit play action.

## Remaining publishing checks

1. Submit one real test registration through Formspree and confirm delivery in the Formspree dashboard.
2. Verify the Paystack checkout displays the current early bird price of ₦6,000 and regular price of ₦15,000.
3. Replace the current testimonial names and quotes with verified participant feedback and permission before public launch.
4. Confirm the exact class duration and update `CLASS_DETAILS.durationMinutes` and `class-calendar.ics` if the session length differs from two hours.
5. Add `VITE_GA_MEASUREMENT_ID` only if analytics consent and the required privacy notice are in place.
6. Revoke the exposed GitHub token and create a fresh fine scoped token.
