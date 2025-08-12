import { test, expect } from '@playwright/test';

const routes = ['/', '/services', '/about', '/contact', '/privacy-policy', '/terms-of-service'];

for (const route of routes) {
  test(`${route} page loads`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  });
}

test('/404 returns 404', async ({ page }) => {
  const response = await page.goto('/404');
  expect(response?.status()).toBe(404);
});

test('mobile nav keyboard toggle works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const toggle = page.locator('#menuToggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mobileMenu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobileMenu')).toBeHidden();
});
