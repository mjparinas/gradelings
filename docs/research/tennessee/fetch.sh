#!/usr/bin/env bash
# Downloads the Tennessee Academic Standards and the student privacy law used by build_outcomes.py, with a plain-text
# copy of each PDF (pdftotext -layout).
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)   then   python3 -I build_outcomes.py [out-dir]
#
# www.tn.gov and publications.tnsosfiles.com answer plain curl with 403, so this opens a real (headed) Chromium with
# Playwright, loads each site's home page, then fetches each file from inside that page. Run it from the repository (it
# uses node_modules/playwright). On a machine without a display, wrap it in xvfb-run: `xvfb-run -a ./fetch.sh`. Set
# CHROMIUM to a browser binary if Playwright's own isn't installed.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
repo="$(cd "$here/../../.." && pwd)"
mkdir -p "$out"

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
cat > "$list" <<'LIST'
math-2021.pdf https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2020-sbe-meetings/november-6%2c-2020-sbe-meeting/11-6-20%20II%20I%20TN%20Academic%20Standards%20for%20Mathematics%20Attachment.pdf
math-2021-cover.pdf https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2021-sbe-meetings/february-5%2c-2021-sbe-meeting/2-5-21%20III%20P%20TN%20Academic%20Standards%20for%20Mathematics%20Cover%20Sheet.pdf
math-practices.pdf https://www.tn.gov/content/dam/tn/education/standards/math/std_math_standards_mathematical_practice.pdf
ela-2019.pdf https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2019-sbe-meetings/february-8,-2019-sbe-meeting/2-8-19%20IV%20C%20English%20Language%20Arts%20Standards%20Attachment%20Clean%20Copy.pdf
science-2022.pdf https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/standards/science/New%2010-28-22%20Science%20Standards.pdf
social-2024.pdf https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/standards/social-studies-2022-2023/TN%20Academic%20Social%20Studies%20Standards_25.pdf
personal-finance-2021.pdf https://www.tn.gov/content/dam/tn/education/ccte/fin/cte_std_personal_finance_21.pdf
pc0757-2016.pdf https://publications.tnsosfiles.com/acts/109/pub/pc0757.pdf
LIST

cd "$repo"
OUT="$out" LIST="$list" node --input-type=module <<'JS'
import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const list = fs.readFileSync(process.env.LIST, "utf8").trim().split("\n").map((line) => line.split(" "));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "tn-"));
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launchPersistentContext(profile, {
  headless: false,
  executablePath: process.env.CHROMIUM || undefined,
  ignoreDefaultArgs: ["--enable-automation"],
  args: ["--disable-blink-features=AutomationControlled"],
  proxy,
});
const page = browser.pages()[0] ?? (await browser.newPage());
let origin = "";
let failed = 0;
for (const [name, url] of list) {
  const o = new URL(url).origin;
  if (o !== origin) {
    // Opening the PDF's folder starts a download, so start from the site's home page instead.
    await page.goto(`${o}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    origin = o;
  }
  const r = await page.evaluate(async (u) => {
    const res = await fetch(u, { credentials: "include" });
    const buf = new Uint8Array(await res.arrayBuffer());
    let s = "";
    for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return { status: res.status, b64: btoa(s) };
  }, url);
  const data = Buffer.from(r.b64, "base64");
  const ok = r.status === 200 && data.subarray(0, 4).toString() === "%PDF";
  console.log(ok ? "ok  " : "FAIL", name, r.status, data.length);
  if (ok) fs.writeFileSync(path.join(process.env.OUT, name), data);
  else failed++;
}
await browser.close();
process.exit(failed ? 1 : 0);
JS
(cd "$out" && for f in *.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done && sha256sum *.pdf *.txt > SHA256SUMS)
echo "Saved to $out. Rebuild with: python3 -I build_outcomes.py \"$out\""
