import { expect, test } from "@playwright/test";

test.describe("screenshots", () => {
  test("home page screenshot", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("about page screenshot", async ({ page }) => {
    await page.goto("/about", { waitUntil: "networkidle" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("member info page screenshot", async ({ page }) => {
    await page.goto("/member-info", { waitUntil: "networkidle" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  // Not testing events for right now because it changes too often. We need to mock the data and then re-add this.
  // test("events page screenshot", async ({ page }) => {
  //   await page.goto("/events", { waitUntil: "networkidle" });
  //   await expect(page).toHaveScreenshot({ fullPage: true });
  // });
  test("pay dues page screenshot", async ({ page }) => {
    await page.goto("/pay-dues", { waitUntil: "networkidle" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test("stay connected page screenshot", async ({ page }) => {
    await page.route("/stay-connected/instagramData", async (route) => {
      await route.fulfill({ json: [{ username: "test" }] });
    });
    await page.goto("/stay-connected", { waitUntil: "networkidle" });
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
