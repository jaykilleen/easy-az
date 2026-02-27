const { test, expect } = require("@playwright/test");

test.describe("Bloom", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/games/bloom.html");
  });

  test("title screen loads", async ({ page }) => {
    await expect(page.locator("#titleScreen")).toBeVisible();
    await expect(page.getByRole("heading", { name: "BLOOM" })).toBeVisible();
    await expect(page.locator("#titleScreen .byline")).toBeVisible();
    await expect(page.getByRole("button", { name: "Play" })).toBeVisible();
  });

  test("clicking Play starts the game", async ({ page }) => {
    await page.getByRole("button", { name: "Play" }).click();
    await expect(page.locator("#titleScreen")).toBeHidden();
    await expect(page.locator("canvas#game")).toBeVisible();
  });

  test("escape key opens quit dialog with time displayed", async ({ page }) => {
    await page.getByRole("button", { name: "Play" }).click();
    await expect(page.locator("#titleScreen")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(page.locator("#quitDialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Paused" })).toBeVisible();
    await expect(page.locator("#pauseTimeDisplay")).toBeVisible();
    await expect(page.getByRole("button", { name: "Resume" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Quit" })).toBeVisible();
  });

  test("resume returns to game", async ({ page }) => {
    await page.getByRole("button", { name: "Play" }).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#quitDialog")).toBeVisible();
    await page.getByRole("button", { name: "Resume" }).click();
    await expect(page.locator("#quitDialog")).toBeHidden();
    await expect(page.locator("canvas#game")).toBeVisible();
  });

  test("quit returns to title screen", async ({ page }) => {
    await page.getByRole("button", { name: "Play" }).click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Quit" }).click();
    await expect(page.locator("#titleScreen")).toBeVisible();
  });
});
