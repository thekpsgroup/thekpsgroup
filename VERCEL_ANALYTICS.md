# Vercel Analytics Integration

This document explains the Vercel Analytics integration implemented in The KPS Group website.

## Overview

Vercel Analytics has been integrated to provide comprehensive tracking of user interactions, page views, and performance metrics. The integration includes both automatic page view tracking and custom event tracking for business-critical actions.

## Components

### VercelAnalytics.astro
Located at `src/components/VercelAnalytics.astro`

This component handles:
- **Automatic Page View Tracking**: Tracks all page visits automatically
- **Contact Form Submissions**: Tracks when users submit contact forms
- **Phone Number Clicks**: Tracks when users click phone number links
- **Email Clicks**: Tracks when users click email links
- **CTA Button Clicks**: Tracks clicks on call-to-action buttons
- **Scroll Depth**: Tracks how far users scroll (25%, 50%, 75%, 100%)
- **Page Navigation**: Tracks SPA-like navigation events

### Integration Points

The VercelAnalytics component is included in the BaseLayout.astro file and loads on every page.

## Tracked Events

### Automatic Events
- Page views (automatic)
- Performance metrics (automatic)

### Custom Events
1. **Contact Form Submit** - Triggered when any form with `data-form="contact"` is submitted
2. **Phone Call** - Triggered when `tel:` links are clicked
3. **Email Click** - Triggered when `mailto:` links are clicked
4. **CTA Click** - Triggered when elements with `data-cta` or `.btn-primary`/`.btn-secondary` classes are clicked
5. **Scroll Depth** - Triggered at 25%, 50%, 75%, and 100% scroll positions
6. **Page Navigation** - Triggered on client-side navigation events

## Implementation Details

### Data Attributes for Tracking

To ensure proper tracking, the following data attributes have been added:

- **Contact Forms**: `data-form="contact"`
- **CTA Buttons**: `data-cta`
- **Phone Links**: Standard `tel:` href format (automatically detected)
- **Email Links**: Standard `mailto:` href format (automatically detected)

### Files Modified

1. **BaseLayout.astro** - Added VercelAnalytics import and component
2. **EnhancedContactForm.astro** - Added `data-form="contact"` attribute
3. **Hero.astro** - Added `data-cta` to CTA buttons
4. **Header.astro** - Added `data-cta` to Contact Sales buttons

## Viewing Analytics

Analytics data can be viewed in the Vercel dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Navigate to the "Analytics" tab

## Custom Event Data

Custom events include contextual data:
- **Phone Call**: Includes the phone number
- **Email Click**: Includes the email address
- **CTA Click**: Includes the button text/label
- **Scroll Depth**: Includes the percentage scrolled
- **Page Navigation**: Includes the new URL

## Performance Impact

The Vercel Analytics integration is lightweight and optimized:
- Uses the official `@vercel/analytics` package
- Minimal impact on page load times
- Events are tracked asynchronously
- No blocking operations

## Future Enhancements

Potential future tracking additions:
- Form field interactions
- Time spent on page
- Download tracking
- Video engagement
- Search interactions

## Troubleshooting

If analytics aren't appearing:
1. Ensure the site is deployed to Vercel
2. Check that the `@vercel/analytics` package is installed
3. Verify the VercelAnalytics component is included in BaseLayout
4. Check browser console for any JavaScript errors
5. Confirm tracking attributes are properly added to elements

## Privacy Compliance

Vercel Analytics is GDPR compliant and doesn't use cookies. It respects user privacy while providing valuable insights into site performance and user behavior.
