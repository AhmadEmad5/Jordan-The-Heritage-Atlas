import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://127.0.0.1:3100/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `artifacts/atlas-${name}.png`,
    fullPage: true,
  });
  console.log(
    name,
    await page
      .locator(".map-pin")
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          name: node.getAttribute("aria-label"),
          box: {
            x: node.getBoundingClientRect().x,
            y: node.getBoundingClientRect().y,
          },
          centerReceivesClick:
            document
              .elementFromPoint(
                node.getBoundingClientRect().x + 22,
                node.getBoundingClientRect().y + 22,
              )
              ?.closest("button") === node,
        })),
      ),
  );
  await page.close();
}
await browser.close();
