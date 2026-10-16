/* DOM/style assertion harness (server must be running on :5173). */
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
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });

const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("light body is Flexoki paper #FFFCF0", bg === "rgb(255, 252, 240)", bg);

const h1Font = await page.evaluate(() => getComputedStyle(document.querySelector("h1")).fontFamily);
check("h1 uses Newsreader", /Newsreader/i.test(h1Font), h1Font);

for (const id of ["#top", "#work", "#experience", "#background", "#contact"]) {
  check(`section ${id} exists`, await page.evaluate((s) => Boolean(document.querySelector(s)), id));
}

const figs = await page.evaluate(() => document.querySelectorAll("figure.fig").length);
check("5 figures rendered", figs === 5, String(figs));

const svgs = await page.evaluate(() =>
  [...document.querySelectorAll("figure.fig svg")].every((s) => s.getBoundingClientRect().width > 200),
);
check("every figure SVG has a real width", svgs);

const unlabeled = await page.evaluate(
  () => [...document.querySelectorAll("figure.fig svg[role=img]")].filter((s) => !s.getAttribute("aria-label") && !s.getAttribute("aria-labelledby")).length,
);
check("figure SVGs are labelled", unlabeled === 0, String(unlabeled));

const mail = await page.getAttribute("#contact a.highlighter", "href");
check("contact email link", mail === "mailto:zeqing.jiang@tum.de", String(mail));

check("no page errors", errors.length === 0, errors.join(" | "));

const dark = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "dark" });
await dark.goto("http://localhost:5173/", { waitUntil: "networkidle" });
const darkBg = await dark.evaluate(() => getComputedStyle(document.body).backgroundColor);
check("dark body is Flexoki #100F0F", darkBg === "rgb(16, 15, 15)", darkBg);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:5173/", { waitUntil: "networkidle" });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
check("no horizontal scroll at 390px", overflow <= 0, `${overflow}px`);

await browser.close();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
