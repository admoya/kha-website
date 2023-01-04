import { expect, test } from "@playwright/test";

test.describe("screenshots", () => {
  test("home page screenshot", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("about page screenshot", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("member info page screenshot", async ({ page }) => {
    await page.goto("/member-info");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("events page screenshot", async ({ page }) => {
    await page.goto("/events");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("pay dues page screenshot", async ({ page }) => {
    await page.goto("/pay-dues");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("stay connected page screenshot", async ({ page }) => {
    await page.route("/stay-connected/instagramData", async (route) => {
      await route.fulfill({ json: [] });
    });
    await page.goto("/stay-connected");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
