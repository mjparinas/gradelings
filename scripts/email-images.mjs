// Draws the images every email shows (src/server/emailTemplates.ts) into public/email/.
// Email clients don't show SVG, so Ollie is rendered from the same <CritterSvg> the app uses
// and saved as a PNG at 3x for sharp screens. The wordmark is drawn in Fredoka, the site's
// logo font, because Gmail and Outlook for Windows ignore web fonts and would show the name
// in Arial. The PNGs are committed; run this again only when a drawing changes:
//
//   node scripts/email-images.mjs
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import { chromium } from "playwright";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(`${root}/`, { jsx: true, alias: { "@": `${root}/src` } });
globalThis.React = React; // the classic JSX transform jiti uses expects it
const { CritterSvg } = await jiti.import("./src/components/Critter.tsx");
const { EMAIL_FONTS, EMAIL_IMAGES, EMAIL_WORDMARK } = await jiti.import("./src/lib/emailImages.ts");
const { APP_NAME, WORDMARK_COLOURS } = await jiti.import("./src/lib/brand.ts");

const outDir = path.join(root, "public", "email");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 3 });
for (const img of Object.values(EMAIL_IMAGES)) {
  const svg = renderToStaticMarkup(React.createElement(CritterSvg, { id: img.critter, mood: img.mood }));
  // Some padding: arms and tails reach outside the 200×200 box (overflow="visible").
  await page.setContent(`<body style="margin:0"><div id="c" style="width:${img.size}px;height:${img.size}px;padding:${img.size * 0.06}px;box-sizing:border-box">${svg}</div></body>`);
  await page.locator("#c").screenshot({ path: path.join(root, "public", img.path), omitBackground: true });
  console.log(`wrote public${img.path}`);
}

// The wordmark as on the site's header: Fredoka bold, tight tracking, one colour per letter.
const w = EMAIL_WORDMARK;
const fredoka = EMAIL_FONTS.wordmark.files.find((f) => f.weight === 700);
const font = readFileSync(path.join(root, "public", `${fredoka.path}.woff2`)).toString("base64");
const letters = [...APP_NAME].map((ch, i) => `<span style="color:${WORDMARK_COLOURS[i % WORDMARK_COLOURS.length]}">${ch}</span>`).join("");
await page.setContent(`<style>@font-face{font-family:Wordmark;font-weight:700;src:url(data:font/woff2;base64,${font}) format("woff2")}</style>
<body style="margin:0"><div id="c" style="width:${w.width}px;height:${w.height}px;display:flex;align-items:center;font-family:Wordmark;font-weight:700;font-size:${w.fontSize}px;letter-spacing:-0.025em;line-height:1;white-space:nowrap">${letters}</div></body>`);
await page.evaluate(() => document.fonts.ready);
const { scrollWidth, scrollHeight } = await page.locator("#c").evaluate((el) => ({ scrollWidth: el.scrollWidth, scrollHeight: el.scrollHeight }));
if (scrollWidth > w.width || scrollHeight > w.height) throw new Error(`the wordmark needs ${scrollWidth}×${scrollHeight}; make EMAIL_WORDMARK bigger`);
if (!(await page.evaluate(() => document.fonts.check('700 30px Wordmark')))) throw new Error("Fredoka didn't load");
await page.locator("#c").screenshot({ path: path.join(root, "public", w.path), omitBackground: true });
console.log(`wrote public${w.path}`);
await browser.close();
