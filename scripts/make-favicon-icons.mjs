/* Rasterize public/icon-ze.svg to 16/32/48 PNGs and pack a multi-size .ico.
   Usage: node scripts/make-favicon-icons.mjs */
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";

const executablePath = `${homedir()}/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`;
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });

const svgPath = new URL("../public/icon-ze.svg", import.meta.url).pathname;
const pngs = [];

for (const size of [16, 32, 48]) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${svgPath}`);
  await page.screenshot({
    path: new URL(`../favicon-${size}.png`, import.meta.url).pathname,
    omitBackground: true, // keep rounded-corner transparency
    clip: { x: 0, y: 0, width: size, height: size },
  });
  pngs.push({
    size,
    data: readFileSync(new URL(`../favicon-${size}.png`, import.meta.url).pathname),
  });
  await page.close();
}
await browser.close();

// Pack PNG-in-ICO (Vista+ format): ICONDIR + ICONDIRENTRYs + blobs
let offset = 6 + 16 * pngs.length;
const entries = pngs.map(({ size, data }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); // width
  e.writeUInt8(size, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // type: icon
  e.writeUInt16LE(32, 6); // color count
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
  new URL("../public/icon-ze.ico", import.meta.url).pathname,
  Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]),
);
for (const { size } of pngs) {
  unlinkSync(new URL(`../favicon-${size}.png`, import.meta.url).pathname);
}
console.log("wrote public/icon-ze.ico with sizes", pngs.map((p) => p.size).join("/"));
