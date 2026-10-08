import { test, expect } from "@playwright/test";
test("map to Petra, scrub the chapters, discover a stay, and return", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const pin = page.getByRole("button", { name: "Explore Petra" });
  await expect(pin).toBeVisible();
  for (const target of await page.locator(".map-pin").all()) {
    const box = await target.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await pin.click();
  await expect(page).toHaveURL(/\/destinations\/petra$/);
  await expect(
    page.getByRole("heading", { name: "Petra", exact: true }),
  ).toBeVisible();
  const stage = page.locator(".cinema-stage");
  await expect(stage).toHaveClass(/is-cinematic/);
  const stageTop = await stage.evaluate(
    (el) => el.getBoundingClientRect().top + window.scrollY,
  );
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    stageTop + 10,
  );
  await expect(
    page.getByRole("heading", { name: "A city hidden in the stone." }),
  ).toBeVisible();
  const distance = await page.evaluate(() => window.innerHeight * 2.4);
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    stageTop + distance,
  );
  await expect(
    page.getByRole("heading", { name: "Water made the desert bloom." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "A city hidden in the stone." }),
  ).not.toBeVisible();
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    stageTop + 10,
  );
  await expect(
    page.getByRole("heading", { name: "A city hidden in the stone." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Find a stay" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const link = page.getByRole("link", { name: "Explore providers" });
  await expect(link).toHaveAttribute("href", /google.com\/maps\/search/);
  const popupEvent = page.waitForEvent("popup");
  await link.click();
  const popup = await popupEvent;
  await popup.close();
  await page.getByRole("button", { name: "Close booking options" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("link", { name: "The atlas", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(pin).toBeVisible();
  expect(errors).toEqual([]);
  expect(await page.locator(".pin-spacer").count()).toBe(0);
});
test("reduced motion leaves all acts readable and unpinned", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/destinations/petra");
  await expect(page.locator(".cinema-stage")).toHaveClass(/is-reading/);
  for (const name of [
    "A city hidden in the stone.",
    "Water made the desert bloom.",
    "Take the longer way home.",
  ]) {
    const heading = page.getByRole("heading", { name });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }
  expect(await page.locator(".pin-spacer").count()).toBe(0);
});
test("mobile atlas has no horizontal overflow and all pins can be tapped", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () =>
        Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth,
        ) <= window.innerWidth,
    ),
  ).toBe(true);
  for (const name of [
    "Umm Qais",
    "Ajloun",
    "Jerash",
    "Amman Citadel",
    "Dead Sea",
    "Petra",
    "Wadi Rum",
  ]) {
    await page.getByRole("button", { name: `Explore ${name}` }).click();
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await page.goto("/");
  }
});
