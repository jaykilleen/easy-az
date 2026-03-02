const { test, expect } = require("@playwright/test");

const GAMES = [
  { name: "Space Dodge", path: "/games/space-dodge.html", format: "pts" },
  { name: "Bloom", path: "/games/bloom.html", format: "time" },
  { name: "Cat vs Mouse", path: "/games/cat-vs-mouse.html", format: "pts" },
];

for (const game of GAMES) {
  test.describe(`${game.name} title leaderboard`, () => {
    test("shows leaderboard container with empty state and placeholders", async ({
      page,
    }) => {
      await page.route("**/api/scores*", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ scores: [] }),
        })
      );
      await page.goto(game.path);
      const lb = page.locator(".title-leaderboard");
      await expect(lb).toBeVisible();
      await expect(lb.locator(".lb-title")).toHaveText("LEADERBOARD");
      await expect(lb.locator(".lb-empty")).toHaveText(
        "No scores yet. Be the first!"
      );
      // All 10 rows are placeholders
      await expect(lb.locator(".lb-row")).toHaveCount(10);
      await expect(lb.locator(".lb-row.placeholder")).toHaveCount(10);
    });

    test("renders scored rows with placeholders to fill 10", async ({
      page,
    }) => {
      await page.route("**/api/scores*", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            scores: [
              { name: "ACE", value: game.format === "time" ? 45000 : 500 },
              { name: "BEE", value: game.format === "time" ? 60000 : 300 },
              { name: "CAT", value: game.format === "time" ? 90000 : 100 },
            ],
          }),
        })
      );
      await page.goto(game.path);
      const lb = page.locator(".title-leaderboard");
      await expect(lb).toBeVisible();
      await expect(lb.locator(".lb-title")).toHaveText("LEADERBOARD");
      // 3 real + 7 placeholders = 10 total
      await expect(lb.locator(".lb-row")).toHaveCount(10);
      await expect(lb.locator(".lb-row:not(.placeholder)")).toHaveCount(3);
      await expect(lb.locator(".lb-row.placeholder")).toHaveCount(7);
      await expect(lb.locator(".lb-empty")).toHaveCount(0);

      // Verify first row has rank and name
      const firstRow = lb.locator(".lb-row").first();
      await expect(firstRow).toContainText("1. ACE");
    });

    test("does not show name entry input on title screen", async ({
      page,
    }) => {
      await page.route("**/api/scores*", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ scores: [] }),
        })
      );
      await page.goto(game.path);
      const lb = page.locator(".title-leaderboard");
      await expect(lb.locator("input")).toHaveCount(0);
    });
  });
}
