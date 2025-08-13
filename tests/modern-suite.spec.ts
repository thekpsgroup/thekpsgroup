import { test, expect } from "@playwright/test";

test("modern suite links render", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("text=Part of The Modern Suite");
  await expect(section).toBeVisible();
  const link = page.locator("a[href='https://modernpayroll.co?utm_source=kps&utm_medium=referral']");
  await expect(link).toBeVisible();
});
