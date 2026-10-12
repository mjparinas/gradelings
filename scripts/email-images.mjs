// Draws the images every email shows (src/server/emailTemplates.ts) into public/email/.
// Email clients don't show SVG, so Ollie is rendered from the same <CritterSvg> the app uses
// and saved as a PNG at 3x for sharp screens. The PNGs are committed; run this again only
// when the mascot's drawing changes:
//
//   node scripts/email-images.mjs
import { mkdirSync } from "node:fs";
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
const { EMAIL_IMAGES } = await jiti.import("./src/lib/emailImages.ts");

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
await browser.close();
