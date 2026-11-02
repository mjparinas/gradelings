// Draws the Google Play icon (512×512, full bleed, Play rounds it) and feature graphic (1024×500) into store-assets/android/ from public/icon.svg. Run: node scripts/android-graphics.mjs
import fs from "node:fs";
import { chromium } from "playwright";
const root = new URL("..", import.meta.url).pathname;
const out = `${root}/store-assets/android`;
const svg = fs.readFileSync(`${root}/public/icon.svg`, "utf8");
// Full-bleed square: Play rounds the corners itself.
const square = svg.replace(' rx="116"', "");
const fredoka = fs.readFileSync(`${root}/assets/fonts/fredoka-700.woff`).toString("base64");
const andika = fs.readFileSync(`${root}/assets/fonts/andika-400.woff`).toString("base64");
const bear = svg.match(/<g>[\s\S]*?<\/g>/)[0];
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const p = await b.newPage({ viewport: { width: 512, height: 512 } });
await p.setContent(`<body style="margin:0">${square.replace("<svg ", '<svg width="512" height="512" ')}</body>`);
await p.screenshot({ path: `${out}/icon-512.png` });

const p2 = await b.newPage({ viewport: { width: 1024, height: 500 } });
const dots = ["#4f8ef7","#e9559a","#25b47e","#ff9636"].map(c=>`<i style="background:${c}"></i>`).join("");
await p2.setContent(`<style>
@font-face{font-family:F;src:url(data:font/woff;base64,${fredoka})}
@font-face{font-family:A;src:url(data:font/woff;base64,${andika})}
body{margin:0;width:1024px;height:500px;overflow:hidden;background:linear-gradient(135deg,#79b5ff,#3978e8);position:relative;font-family:F}
.c{position:absolute;right:70px;top:50px;width:400px;height:400px}
.t{position:absolute;left:70px;top:120px;width:500px;color:#fff}
h1{margin:0;font-size:84px;line-height:1}
p{margin:18px 0 0;font:400 30px/1.3 A;color:#fff}
.d{position:absolute;left:70px;top:380px;display:flex;gap:14px}
.d i{width:34px;height:34px;border-radius:50%;border:4px solid #fff7e8}
</style>
<svg class="c" viewBox="0 0 512 512"><circle cx="256" cy="258" r="250" fill="#fff7e8" opacity=".95"/>${bear}</svg>
<div class="t"><h1>Gradelings</h1><p>Practice and games for Kindergarten to Grade 9</p></div>
<div class="d">${dots}</div>`);
await p2.screenshot({ path: `${out}/feature-graphic-1024x500.png` });
await b.close();
