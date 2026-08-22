/* Screenshot harness for visual QA (dev server must be running on :5173). */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";

const executablePath = `${homedir()}/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`;
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--force-color-profile=srgb"],
});

// Desktop — full page
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await desktop.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await desktop.evaluate(() => {
  // force all reveals visible for the static screenshot
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
});
await desktop.waitForTimeout(700);
await desktop.screenshot({ path: "shots/desktop-full.png", fullPage: true });

// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await mobile.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
});
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: "shots/mobile-top.png", fullPage: false });

// Console errors check
const errpage = await browser.newPage();
const errors = [];
errpage.on("console", (m) => m.type() === "error" && errors.push(m.text()));
errpage.on("pageerror", (e) => errors.push(String(e)));
await errpage.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await errpage.waitForTimeout(500);
console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join("\n")}` : "NO CONSOLE ERRORS");

await browser.close();
console.log("screenshots written to shots/");
