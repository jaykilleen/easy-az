const { test, expect } = require("@playwright/test");

test.describe("Az plays Space Dodge", () => {
  test("Az plays, scores, and signs the leaderboard", async ({ page }) => {
    await page.goto("/games/space-dodge.html");

    // Clear leaderboard so Az always qualifies
    await page.evaluate(() => localStorage.removeItem("charlieLeaderboard"));

    // Start 1 player game
    await page.getByRole("button", { name: "1 PLAYER" }).click();
    await expect(page.locator("#startScreen")).toBeHidden();

    // ~5 seconds of real gameplay: Az zig-zags and shoots
    // Segment 1: fly right while shooting
    await page.keyboard.down("ArrowRight");
    await page.keyboard.down("ShiftRight");
    await page.waitForTimeout(1200);
    await page.keyboard.up("ArrowRight");
    await page.keyboard.up("ShiftRight");

    // Segment 2: fly up-left while shooting
    await page.keyboard.down("ArrowLeft");
    await page.keyboard.down("ArrowUp");
    await page.keyboard.down("ShiftRight");
    await page.waitForTimeout(1200);
    await page.keyboard.up("ArrowLeft");
    await page.keyboard.up("ArrowUp");
    await page.keyboard.up("ShiftRight");

    // Segment 3: fly down-right while shooting
    await page.keyboard.down("ArrowRight");
    await page.keyboard.down("ArrowDown");
    await page.keyboard.down("ShiftRight");
    await page.waitForTimeout(1200);
    await page.keyboard.up("ArrowRight");
    await page.keyboard.up("ArrowDown");
    await page.keyboard.up("ShiftRight");

    // Segment 4: fly left while shooting
    await page.keyboard.down("ArrowLeft");
    await page.keyboard.down("ShiftRight");
    await page.waitForTimeout(1400);
    await page.keyboard.up("ArrowLeft");
    await page.keyboard.up("ShiftRight");

    // Set score and kill the player to trigger end state
    // Score is set then player killed in same tick so pendingScore captures it
    await page.evaluate(() => {
      score = 1337;
      pendingScore = 1337;
      for (const p of players) {
        if (p.alive) killPlayer(p);
      }
    });

    // Wait for name entry (1s setTimeout in game code)
    await expect(page.locator("#nameEntry")).toBeVisible({ timeout: 5000 });

    // Az signs the leaderboard
    await page.fill("#nameInput", "AZ");
    await page.keyboard.press("Enter");

    // Verify game over screen shows with Az's score
    await expect(page.locator("#gameOver")).toBeVisible();
    await expect(page.locator("#leaderboardEnd")).toContainText("AZ");
    await expect(page.locator("#leaderboardEnd")).toContainText("1337");

    // Verify localStorage has the entry
    const lb = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("charlieLeaderboard"))
    );
    expect(lb).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "AZ", score: 1337 }),
      ])
    );
  });
});
