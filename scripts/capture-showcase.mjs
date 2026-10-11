import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

async function run() {
  await mkdir("public/screenshots", { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina resolution for crystal clear screenshots
  });

  const page = await context.newPage();

  console.log("1. Capturing Hero & Interactive Atlas...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "public/screenshots/01-hero-atlas.png",
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  console.log("2. Capturing 3D Artifact Showcase...");
  const relicSection = page.locator("#artifacts, .artifact-section").first();
  if (await relicSection.count() > 0) {
    await relicSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    const box = await relicSection.boundingBox();
    if (box) {
      await page.screenshot({
        path: "public/screenshots/02-artifact-showcase-3d.png",
        clip: { x: 0, y: Math.max(0, box.y) - 10, width: 1440, height: 860 },
      });
    }
  }

  console.log("3. Capturing Road Trip Itinerary Planner...");
  const itinerarySection = page.locator("#itinerary, .itinerary-workbench-container, .itinerary-planner-section").first();
  if (await itinerarySection.count() > 0) {
    await itinerarySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const box = await itinerarySection.boundingBox();
    if (box) {
      await page.screenshot({
        path: "public/screenshots/04-itinerary-planner.png",
        clip: { x: 0, y: Math.max(0, box.y) - 30, width: 1440, height: Math.min(900, box.height + 60) },
      });
    }
  }

  console.log("4. Capturing Heritage Passport...");
  const passportSection = page.locator("#heritage-passport, .heritage-passport-section").first();
  if (await passportSection.count() > 0) {
    await passportSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const box = await passportSection.boundingBox();
    if (box) {
      await page.screenshot({
        path: "public/screenshots/05-heritage-passport.png",
        clip: { x: 0, y: Math.max(0, box.y) - 20, width: 1440, height: Math.min(900, box.height + 40) },
      });
    }
  }

  console.log("5. Capturing Command Palette...");
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "public/screenshots/06-command-palette.png",
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");

  console.log("6. Capturing Cinematic Scrollytelling (Petra)...");
  await page.goto("http://localhost:3000/destinations/petra", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Scroll down to chapters
  const chapters = page.locator("#chapters").first();
  if (await chapters.count() > 0) {
    await chapters.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: "public/screenshots/03-scrollytelling-cinematic.png",
      clip: { x: 0, y: (await chapters.boundingBox())?.y || 0, width: 1440, height: 900 },
    });
  }

  await browser.close();
  console.log("✅ All screenshots captured into public/screenshots/ successfully!");
}

run().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
