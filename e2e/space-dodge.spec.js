const { test, expect } = require("@playwright/test");

test.describe("Space Dodge", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/games/space-dodge.html");
  });

  test("title screen loads", async ({ page }) => {
    await expect(page.locator("#startScreen")).toBeVisible();
    await expect(page.getByText("Charlie & Cooper's Space Dodge!")).toBeVisible();
    await expect(page.getByRole("button", { name: "1 PLAYER" })).toBeVisible();
    await expect(page.getByRole("button", { name: "2 PLAYER - BLAST OFF!" })).toBeVisible();
  });

  test("clicking start begins the game", async ({ page }) => {
    await page.getByRole("button", { name: "1 PLAYER" }).click();
    await expect(page.locator("#startScreen")).toBeHidden();
    await expect(page.locator("canvas#game")).toBeVisible();
  });

  test("escape key opens quit dialog", async ({ page }) => {
    await page.getByRole("button", { name: "1 PLAYER" }).click();
    await expect(page.locator("#startScreen")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(page.locator("#quitConfirm")).toBeVisible();
    await expect(page.getByText("QUIT GAME?")).toBeVisible();
    await expect(page.getByRole("button", { name: "YES, QUIT" })).toBeVisible();
    await expect(page.getByRole("button", { name: "KEEP PLAYING" })).toBeVisible();
  });

  test("keep playing resumes the game", async ({ page }) => {
    await page.getByRole("button", { name: "1 PLAYER" }).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#quitConfirm")).toBeVisible();
    await page.getByRole("button", { name: "KEEP PLAYING" }).click();
    await expect(page.locator("#quitConfirm")).toBeHidden();
    await expect(page.locator("canvas#game")).toBeVisible();
  });

  test("quit goes back to store", async ({ page }) => {
    await page.getByRole("button", { name: "1 PLAYER" }).click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "YES, QUIT" }).click();
    await expect(page).toHaveURL("/");
  });
});
