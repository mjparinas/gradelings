// Puts a caption above each Play screenshot from store-assets/android/raw/ (made by
// android-screenshots.mjs) and writes them to store-assets/android/<size>/. The raw shots are
// the real app; these are the same shots on the brand blue with one line of words.
//   node scripts/android-captions.mjs
import fs from "node:fs";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url).pathname;
const dir = `${root}store-assets/android`;
const font = (f) => fs.readFileSync(`${root}assets/fonts/${f}`).toString("base64");
const CAPTIONS = {
  "1-question": "Gentle hints and another try",
  "2-home": "Adventure picks what to practise next",
  "3-trophies": "Trophies and coins earned by learning",
  "5-stickers": "A sticker for every lesson that grows",
  "6-parent-reports": "Clear reports for parents",
};
const SIZES = { phone: [1080, 1920], "tablet-7": [1200, 1920], "tablet-10": [1600, 2560] };

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [name, [w, h]] of Object.entries(SIZES)) {
  fs.mkdirSync(`${dir}/${name}`, { recursive: true });
  const p = await b.newPage({ viewport: { width: w, height: h } });
  let n = 0;
  for (const [key, text] of Object.entries(CAPTIONS)) {
    const img = fs.readFileSync(`${dir}/raw/${name}-${key}.png`).toString("base64");
    const pad = Math.round(w * 0.1);
    await p.setContent(`<style>
@font-face{font-family:F;src:url(data:font/woff;base64,${font("fredoka-700.woff")})}
body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:linear-gradient(160deg,#79b5ff,#3978e8);font-family:F}
h1{margin:0;position:absolute;left:${pad}px;right:${pad}px;top:${Math.round(h * 0.05)}px;text-align:center;color:#fff;font-size:${Math.round(w * 0.075)}px;line-height:1.15}
img{position:absolute;left:${pad}px;width:${w - 2 * pad}px;top:${Math.round(h * 0.21)}px;border-radius:${Math.round(w * 0.04)}px;box-shadow:0 20px 60px rgba(10,30,80,.35)}
</style><h1>${text}</h1><img src="data:image/png;base64,${img}">`);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${dir}/${name}/${name}-${++n}.png` });
  }
  await p.close();
}
await b.close();
