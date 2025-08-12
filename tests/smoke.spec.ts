import { test, expect } from '@playwright/test';

const paths = [
  '/',
  '/services',
  '/services/bookkeeping',
  '/services/consulting',
  '/services/hr-services',
  '/services/it-support',
  '/services/payroll-services',
  '/services/peo-payroll',
  '/services/quickbooks-consulting',
  '/services/quickbooks-consulting-premium',
  '/services/technology-consulting',
  '/contact',
  '/locations/texas/austin',
];

paths.forEach((route) => {
  test(`page ${route} loads`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Book My Free Consult').first()).toBeVisible();
    let redirects = 0;
    let req = response?.request();
    while (req && req.redirectedFrom()) {
      redirects++;
      req = req.redirectedFrom();
    }
    expect(redirects).toBeLessThanOrEqual(1);
  });
});
