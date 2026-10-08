import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

async function recordShowcase() {
  const outputDir = path.resolve("./public/videos");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching Chromium browser for cinematic video recording...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // 1. Language Toggle showcase
  console.log("Showcasing language toggle...");
  const langBtn = page.locator(".header-lang-btn");
  if (await langBtn.isVisible()) {
    await langBtn.click();
    await page.waitForTimeout(1200);
    await langBtn.click();
    await page.waitForTimeout(1000);
  }

  // 2. Smooth Scroll to Jordan Map
  console.log("Scrolling to Interactive Cartography Map...");
  await page.locator("#atlas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // Hover on map pins
  const pins = page.locator(".waypoint-marker, .map-pin, circle");
  if ((await pins.count()) > 0) {
    await pins.first().hover();
    await page.waitForTimeout(1000);
  }

  // 3. Scroll to Places Collection
  console.log("Scrolling to Heritage Places Collection...");
  await page.locator("#places").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // 4. Scroll to 3D Relic Showcase
  console.log("Scrolling to 3D Relic Showcase...");
  const artifactsSec = page.locator("#artifacts");
  if (await artifactsSec.isVisible()) {
    await artifactsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    // Switch artifact tabs if present
    const artifactTabs = page.locator("button:has-text('Roman'), button:has-text('Byzantine')");
    if ((await artifactTabs.count()) > 0) {
      await artifactTabs.first().click();
      await page.waitForTimeout(1200);
    }
  }

  // 5. Scroll to Nabataean Script Visualizer
  console.log("Scrolling to Nabataean Script Studio...");
  const nabataeanSec = page.locator("#nabataean-studio");
  if (await nabataeanSec.isVisible()) {
    await nabataeanSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    // Click HARETAT or RAQMU preset
    const presetBtn = page.locator("button:has-text('HARETAT'), button:has-text('RAQMU')").first();
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(2000);
    }
  }

  // 6. Scroll to Heritage Passport
  console.log("Scrolling to Digital Heritage Passport...");
  const passportSec = page.locator("#heritage-passport");
  if (await passportSec.isVisible()) {
    await passportSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    // Click Claim Stamp
    const claimBtn = page.locator("button:has-text('Claim Stamp')").first();
    if (await claimBtn.isVisible()) {
      await claimBtn.click();
      await page.waitForTimeout(2500);
    }
  }

  // 7. Open Command Palette (Ctrl+K)
  console.log("Opening Command Palette (Ctrl+K)...");
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(1500);

  // Type Petra
  await page.keyboard.type("Petra", { delay: 100 });
  await page.waitForTimeout(1200);

  // Press Enter to navigate to Petra
  console.log("Navigating to Petra destination page...");
  await page.keyboard.press("Enter");
  await page.waitForURL("**/destinations/petra", { timeout: 10000 });
  await page.waitForTimeout(2000);

  // 8. On Petra: Scroll down through Scrollytelling
  console.log("Scrollytelling through Petra chapters...");
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(1500);

  // 9. Scroll to Solar Telemetry & Celestial Arc
  console.log("Viewing Solar Telemetry & Golden Hour Arc...");
  const solarCard = page.locator(".telemetry-card-solar, #telemetry");
  if (await solarCard.first().isVisible()) {
    await solarCard.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
  }

  console.log("Finalizing video capture...");
  await page.waitForTimeout(1000);

  // Get video file
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const finalPath = path.join(outputDir, "jordan_heritage_atlas_showcase.webm");
    if (fs.existsSync(videoPath)) {
      fs.copyFileSync(videoPath, finalPath);
      console.log("✅ Showcase video successfully recorded to:", finalPath);
      console.log("Size in MB:", (fs.statSync(finalPath).size / (1024 * 1024)).toFixed(2));
    }
  }
}

recordShowcase().catch((err) => {
  console.error("Error recording showcase:", err);
  process.exit(1);
});
