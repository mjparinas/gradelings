#!/usr/bin/env bash
# Downloads New Mexico's content standards used by build_outcomes.py and the parent guides: the Public Education
# Department's copies of the Common Core State Standards, the NM STEM Ready! Science Standards' New Mexico specific
# standards and course maps, and the New Mexico Social Studies Standards (2022); the four rules in Title 6, Chapter 29
# of the New Mexico Administrative Code that adopt them; the Next Generation Science Standards; the NM-MSSA family
# guide and NM-ASR fact sheet; and the Data Breach Notification Act (2017 House Bill 15). Writes a plain-text copy of
# each PDF (pdftotext -layout) and SHA256SUMS.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# web.ped.nm.gov answers curl with a captcha page (and the old webnew.ped.state.nm.us resets the connection), so the
# Department's files are fetched by Playwright's headless Chromium, which passes the captcha by opening each file as a
# page. Run it from the repository (it uses node_modules/playwright); set CHROMIUM to a headless browser binary if
# Playwright's own isn't installed (a full Chrome opens PDFs in its viewer instead of downloading them).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$(mkdir -p "${1:-$here/source}" && cd "${1:-$here/source}" && pwd)"
repo="$(cd "$here/../../.." && pwd)"

get() {
  curl -fsSL --retry 3 -o "$out/$1" "$2"
  sleep 1
}
srca="https://www.srca.nm.gov/parts/title06"
get nmac-6.29.10-science.pdf "$srca/06.029.0010.pdf"   # NM STEM Ready! Science Standards (2018), with the six NM standards
get nmac-6.29.11-social.pdf "$srca/06.029.0011.pdf"    # Social studies (February 22, 2022)
get nmac-6.29.13-ela.pdf "$srca/06.029.0013.pdf"       # English language arts: the Common Core plus New Mexico additions
get nmac-6.29.14-math.pdf "$srca/06.029.0014.pdf"      # Mathematics: the Common Core
get science.pdf "https://www.nextgenscience.org/sites/default/files/AllDCI.pdf"   # NGSS, arranged by core idea
get mssa-family-guide.pdf "https://newmexico.onlinehelp.cognia.org/wp-content/uploads/sites/10/2026/07/NM_MSSA_2026_Family-Interp-Guide_English_ADA.pdf"
get hb15-2017-breach.pdf "https://www.nmlegis.gov/Sessions/17%20Regular/final/HB0015.pdf"   # Data Breach Notification Act

# The Department's files, as linked from https://web.ped.nm.gov/educators/instructional-resources/new-mexico-adopted-content-standards/,
# .../nm-stem-ready-science/nm-stem-ready-science-standards/ (and its recommended course maps) and /bureaus/assessment/.
cd "$repo"
OUT="$out" node --input-type=module <<'JS'
import { chromium } from "playwright";
import fs from "node:fs";

const u = "https://web.ped.nm.gov/wp-content/uploads";
const files = [
  ["math.pdf", `${u}/2024/12/Math_Standards1.pdf`],
  ["ela.pdf", `${u}/2024/12/ELA_Standards1.pdf`],
  ["social.pdf", `${u}/2025/01/NM-Standards-508.pdf`],
  ["science-nm-specific.pdf", `${u}/2025/01/NM-6-Specific-Standards-Framework.pdf`],
  ["science-k5-course-map.pdf", `${u}/2025/01/K-5-Course-Map-with-hyperlinks-2-19.pdf`],
  ["science-ms-integrated.pdf", `${u}/2025/01/Middle-School-Integrated-Course-Map.pdf`],
  ["science-hs-integrated.pdf", `${u}/2025/01/High-School-Integrated-Science-Course-Map-w-hyperlinks.pdf`],
  ["asr-fact-sheet.pdf", `${u}/2026/07/NM-ASR-Fact-Sheet-2026-27.pdf`],
];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
await page.goto("https://web.ped.nm.gov/educators/instructional-resources/new-mexico-adopted-content-standards/", { waitUntil: "load" });
for (const [name, url] of files) {
  // The first request for a file gets the captcha page; opening the file as a page passes it (and may download it).
  let body = await (await context.request.get(url)).body();
  if (body.subarray(0, 5).toString() !== "%PDF-") {
    const download = page.waitForEvent("download", { timeout: 30000 }).catch(() => null);
    await page.goto(url, { timeout: 60000 }).catch(() => {});
    const saved = await download;
    if (saved) await saved.saveAs(`${process.env.OUT}/${name}`);
    body = saved ? fs.readFileSync(`${process.env.OUT}/${name}`) : await (await context.request.get(url)).body();
  }
  if (body.subarray(0, 5).toString() !== "%PDF-") throw new Error(`${name}: not a PDF`);
  fs.writeFileSync(`${process.env.OUT}/${name}`, body);
  console.log(name, body.length);
}
await browser.close();
JS

cd "$out"
for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt" 2>/dev/null; done
sha256sum *.pdf *.txt > SHA256SUMS
echo "Saved to $out"
