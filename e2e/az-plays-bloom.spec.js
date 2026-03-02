const { test, expect } = require("@playwright/test");

test.describe("Az plays Bloom", () => {
  test("Az plays, finds all hearts, and signs the leaderboard", async ({
    page,
  }) => {
    await page.goto("/games/bloom.html");

    // Clear leaderboard so Az always qualifies
    await page.evaluate(() => localStorage.removeItem("bloom-leaderboard"));

    // Start the game
    await page.getByRole("button", { name: "Play" }).click();
    await expect(page.locator("#titleScreen")).toBeHidden();

    // ~4 seconds of real gameplay: Az explores the clearing
    // Segment 1: walk right
    await page.keyboard.down("ArrowRight");
    await page.waitForTimeout(800);
    await page.keyboard.up("ArrowRight");

    // Segment 2: walk up
    await page.keyboard.down("ArrowUp");
    await page.waitForTimeout(800);
    await page.keyboard.up("ArrowUp");

    // Segment 3: sprint left (Shift + Arrow)
    await page.keyboard.down("ShiftLeft");
    await page.keyboard.down("ArrowLeft");
    await page.waitForTimeout(700);
    await page.keyboard.up("ArrowLeft");
    await page.keyboard.up("ShiftLeft");

    // Segment 4: walk down
    await page.keyboard.down("ArrowDown");
    await page.waitForTimeout(800);
    await page.keyboard.up("ArrowDown");

    // Segment 5: sprint right
    await page.keyboard.down("ShiftLeft");
    await page.keyboard.down("ArrowRight");
    await page.waitForTimeout(900);
    await page.keyboard.up("ArrowRight");
    await page.keyboard.up("ShiftLeft");

    // Collect all 5 hearts, unlock store, and teleport to counter
    await page.evaluate(() => {
      hearts.clearing = true;
      hearts.forest = true;
      hearts.peaks = true;
      hearts.lake = true;
      hearts.caves = true;
      heartCount = 5;
      areaConnections.lake.south = "store";
      currentArea = "store";
      player.x = 350;
      player.y = 415;
    });

    // Wait one animation frame for drawStore to detect counter position
    await page.waitForTimeout(100);

    // End screen should appear
    await expect(page.locator("#endScreen")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#nameEntrySection")).toBeVisible();

    // Az signs the leaderboard
    await page.fill("#nameInput", "AZ");
    await page.getByRole("button", { name: "Save" }).click();

    // Verify leaderboard shows Az's entry
    await expect(page.locator("#leaderboardSection")).toContainText("AZ");

    // Verify localStorage has the entry
    const lb = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("bloom-leaderboard"))
    );
    expect(lb).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "AZ" }),
      ])
    );
  });
});
