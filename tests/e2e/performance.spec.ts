import { test, expect } from "@playwright/test";
test("atlas stays within a JavaScript budget and loads without failed local resources", async ({
  page,
}, testInfo) => {
  const failures: string[] = [];
  page.on("response", (response) => {
    if (
      response.url().startsWith("http://127.0.0.1:3100") &&
      response.status() >= 400
    )
      failures.push(response.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "Explore Petra" }).hover();
  const bytes = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((entry) => entry.name.endsWith(".js"))
      .reduce(
        (sum, entry) =>
          sum + (entry as PerformanceResourceTiming).decodedBodySize,
        0,
      ),
  );
  expect(bytes).toBeGreaterThan(0);
  expect(bytes).toBeLessThan(1_000_000);
  await expect(page.getByRole("status")).toContainText("Petra");
  for (const image of await page.locator(".destination-photo img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  expect(failures).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  testInfo.annotations.push({
    type: "decoded JavaScript bytes",
    description: String(bytes),
  });
  await page.screenshot({
    path: `artifacts/atlas-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
test("repeated client navigation leaves no stale pinned DOM or duplicate story stage", async ({
  page,
}) => {
  await page.goto("/");
  for (let i = 0; i < 3; i++) {
    await page.getByRole("button", { name: "Explore Petra" }).click();
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await expect(page.locator(".cinema-stage")).toHaveCount(1);
    await page.getByRole("link", { name: "The atlas", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Explore Petra" }),
    ).toBeVisible();
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".cinema-stage")).toHaveCount(0);
  }
});
