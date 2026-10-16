/* Render scripts/favicon.html to public/favicon.ico (16/32/48) and
   public/apple-touch-icon.png (180, full-bleed; iOS rounds it).
   Usage: node scripts/make-favicon-icons.mjs */
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
import { homedir } from "node:os";

const executablePath = `${homedir()}/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`;
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--allow-file-access-from-files"],
});
const src = new URL("./favicon.html", import.meta.url).href;

async function render(size, bleed = false) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.goto(`${src}?s=${size}${bleed ? "&bleed=1" : ""}`);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({
    omitBackground: true, // keep rounded-corner transparency
    clip: { x: 0, y: 0, width: size, height: size },
  });
  await page.close();
  return png;
}

const pngs = [];
for (const size of [16, 32, 48]) pngs.push({ size, data: await render(size) });
writeFileSync(new URL("../public/apple-touch-icon.png", import.meta.url), await render(180, true));
await browser.close();

// Pack PNG-in-ICO (Vista+ format): ICONDIR + ICONDIRENTRYs + blobs
let offset = 6 + 16 * pngs.length;
const entries = pngs.map(({ size, data }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); // width
  e.writeUInt8(size, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(data.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += data.length;
  return e;
});
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);

writeFileSync(
  new URL("../public/favicon.ico", import.meta.url),
  Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]),
);
console.log("wrote public/favicon.ico (16/32/48) and public/apple-touch-icon.png (180)");
