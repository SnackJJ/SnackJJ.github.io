/* DOM/style assertion harness — verifies the design system actually applied. */
import { chromium } from "playwright-core";
import { homedir } from "node:os";

const executablePath = `${homedir()}/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`;
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });

let failures = 0;
function check(name, cond, extra = "") {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond ? "" : `  [${extra}]`}`);
  if (!cond) failures++;
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });

const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("body is Flexoki paper #FFFCF0", bg === "rgb(255, 252, 240)", bg);

const h1Font = await page.evaluate(() => getComputedStyle(document.querySelector("h1")).fontFamily);
check("h1 uses Inter", /Inter/i.test(h1Font), h1Font);

const eyebrowFont = await page.evaluate(
  () => getComputedStyle(document.querySelector(".font-pixel")).fontFamily,
);
check("eyebrow uses Silkscreen", /Silkscreen/i.test(eyebrowFont), eyebrowFont);

const btnShadow = await page.evaluate(() =>
  getComputedStyle(document.querySelector(".btn-pixel.btn-primary")).boxShadow,
);
check("primary pixel button has hard offset shadow (Line)", btnShadow.includes("rgb(218, 216, 206)"), btnShadow);

const gridOpacity = await page.evaluate(() => {
  const hero = document.querySelector("#top");
  return getComputedStyle(hero, "::before").opacity;
});
check("hero pixel-grid texture opacity <= 4%", parseFloat(gridOpacity) <= 0.04, gridOpacity);

const avatarShadowLen = await page.evaluate(() => {
  const el = document.querySelector('[aria-label="Pixel-art robot avatar"] div div');
  return el ? el.style.boxShadow.length : 0;
});
check("pixel robot avatar rendered via box-shadow sprite", avatarShadowLen > 1000, String(avatarShadowLen));

const starColor = await page.evaluate(() => {
  const els = [...document.querySelectorAll('[aria-label="Pixel-art robot avatar"] div')];
  const s = els.map((e) => e.style.boxShadow).find((v) => v && v.includes("173, 131, 1"));
  return Boolean(s);
});
check("Yellow sparkle badge (#AD8301) present on avatar", starColor);

const chips = await page.evaluate(() => document.querySelectorAll(".chip").length);
check("tech chips rendered (>20)", chips > 20, String(chips));

for (const id of ["#about", "#experience", "#projects", "#contact"]) {
  const ok = await page.evaluate((sel) => Boolean(document.querySelector(sel)), id);
  check(`section anchor ${id} exists`, ok);
}

const emailText = await page.textContent("a.highlighter");
check("big email link with highlighter sweep", emailText.trim() === "zeqing.jiang@tum.de", emailText);

// scroll-reveal actually fires via IntersectionObserver (fresh page, no forcing)
const p2 = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await p2.goto("http://localhost:5173/", { waitUntil: "networkidle" });
const beforeVisible = await p2.evaluate(() => document.querySelectorAll(".reveal.is-visible").length);
await p2.evaluate(() => document.querySelector("#experience").scrollIntoView());
await p2.waitForTimeout(800);
const afterVisible = await p2.evaluate(() => document.querySelectorAll(".reveal.is-visible").length);
check("IntersectionObserver reveals fire on scroll", beforeVisible < afterVisible, `${beforeVisible} -> ${afterVisible}`);

const navbarBorder = await p2.evaluate(() => getComputedStyle(document.querySelector("header")).borderBottomColor);
check("navbar gains Line border after scroll", navbarBorder === "rgb(218, 216, 206)", navbarBorder);

// mobile hamburger
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:5173/", { waitUntil: "networkidle" });
const burgerVisible = await m.isVisible('button[aria-controls="mobile-menu"]');
check("mobile hamburger visible at 390px", burgerVisible);
await m.click('button[aria-controls="mobile-menu"]');
const panelLinks = await m.locator('#mobile-menu a').count();
check("mobile menu opens with 4 links", panelLinks === 4, String(panelLinks));
await m.click('#mobile-menu a[href="#projects"]');
await m.waitForTimeout(600);
const menuClosed = await m.isVisible('#mobile-menu');
check("mobile menu closes after link tap", !menuClosed);

// horizontal overflow guard (both viewports)
for (const [label, pg] of [["desktop", page], ["mobile", m]]) {
  const overflow = await pg.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`${label}: no horizontal overflow`, overflow <= 0, `${overflow}px`);
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
