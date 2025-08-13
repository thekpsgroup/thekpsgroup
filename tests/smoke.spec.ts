import { test, expect } from "@playwright/test";

test("core routes load and header CTA present", async ({ page }) => {
  for (const path of ["/", "/about", "/services", "/contact"]) {
    await page.goto(path);
    await expect(page.locator("body")).toBeVisible();
    const phoneText = page.locator('text=469-458-6966').first();
    await expect(phoneText).toBeVisible();
    const phoneLink = page.locator('a[href="tel:+14694586966"]').first();
    await expect(phoneLink).toBeVisible();
  }

  await page.goto("/");
  await expect(page.locator("[data-label='header_quote']")).toBeVisible();
});
