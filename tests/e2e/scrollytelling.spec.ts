import { test, expect } from "@playwright/test";

test("cinematic choice survives reload and nearby navigation, with real wheel scrolling", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/destinations/petra");
  await page.getByRole("button", { name: "Enable cinematic story" }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".cinema-stage")).toHaveClass(/is-cinematic/);
  await page.getByRole("button", { name: "Enter the story" }).click();
  const stage = page.locator(".cinema-stage");
  await expect.poll(() => stage.evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(3);
  const height = await page.evaluate(() => innerHeight);
  const photo = page.locator(".scene-1 .scene-photo");
  const before = await photo.evaluate(el => getComputedStyle(el).transform);
  await page.mouse.wheel(0, height * 0.6);
  await expect.poll(() => photo.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  await page.mouse.wheel(0, height * 1.6);
  await expect(stage).toHaveAttribute("data-active-scene", "2");
  await expect(page.getByRole("heading", { name: "Water made the desert bloom." })).toBeVisible();
  await expect.poll(() => stage.evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(3);
  await page.screenshot({ path: `artifacts/verified-scroll-${testInfo.project.name}.png` });
  await page.mouse.wheel(0, height * 1.6);
  await expect(stage).toHaveAttribute("data-active-scene", "3");
  await page.mouse.wheel(0, height * 2);
  await expect(page.getByRole("button", { name: "Find a stay" })).toBeInViewport();
  await page.getByRole("button", { name: "Find a stay" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close booking options" }).click();
  await page.getByRole("link", { name: "Nearby region: Wadi Rum" }).click();
  await expect(page).toHaveURL(/destinations\/wadi-rum/);
  await expect(page.locator(".cinema-stage")).toHaveClass(/is-cinematic/);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.getByRole("button", { name: "Read at your pace" }).click();
  await page.reload();
  await expect(page.locator(".cinema-stage")).toHaveClass(/is-reading/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("reduced-motion visitors can explicitly opt into the full scroll story", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/destinations/petra");
  await expect(
    page.getByText(/Reading mode follows your device/),
  ).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.getByRole("button", { name: "Enable cinematic story" }).click();
  const stage = page.locator(".cinema-stage");
  await expect(stage).toHaveClass(/is-cinematic/);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const start = await page
    .locator(".pin-spacer")
    .evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  const vh = await page.evaluate(() => window.innerHeight);
  const titles = [
    "A city hidden in the stone.",
    "Water made the desert bloom.",
    "Take the longer way home.",
  ];
  for (let i = 0; i < 3; i++) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      start + vh * (i * 1.6 + 0.95),
    );
    await expect(page.getByRole("heading", { name: titles[i] })).toBeVisible();
    await expect(
      page.locator(".story-chapter-tabs button").nth(i),
    ).toHaveAttribute("aria-current", "step");
    for (let other = 0; other < 3; other++)
      if (other !== i)
        await expect(
          page.getByRole("heading", { name: titles[other] }),
        ).not.toBeVisible();
    // Scroll pinning must hold the viewport while the image transform changes.
    await expect
      .poll(() =>
        stage.evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
      )
      .toBeLessThan(3);
    if (i === 1) {
      await expect
        .poll(() =>
          page
            .locator(".diagram-line")
            .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
        )
        .toBeGreaterThan(0.85);
      await page.screenshot({
        path: `artifacts/scrollytelling-${testInfo.project.name}.png`,
      });
    }
  }
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    start + vh * 0.5,
  );
  await expect(page.getByRole("heading", { name: titles[0] })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: titles[2] }),
  ).not.toBeVisible();
  await page.getByRole("button", { name: "Switch to reading mode" }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(stage).toHaveClass(/is-reading/);
  for (const title of titles)
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  expect(errors).toEqual([]);
});

test("a live motion preference change cleans up the pinned timeline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/destinations/wadi-rum");
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".cinema-stage")).toHaveClass(/is-reading/);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
});
