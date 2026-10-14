#!/usr/bin/env bash
# Downloads the Arizona Department of Education's standards documents used by build_outcomes.py.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)
#
# azed.gov sits behind a Cloudflare browser check that answers plain curl with a challenge page, so this opens a real
# (headed) Chromium with Playwright, waits for the check to pass on a standards page, then fetches each file from inside
# that page. Run it from the repository (it uses node_modules/playwright). On a machine without a display, wrap it in
# xvfb-run: `xvfb-run -a ./fetch.sh`. Set CHROMIUM to a browser binary if Playwright's own isn't installed.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
repo="$(cd "$here/../../.." && pwd)"
mkdir -p "$out"

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
cat > "$list" <<'LIST'
math-k.pdf https://www.azed.gov/sites/default/files/2016/12/Math%20Final%2000Kindergarten%20Standards%204_2_2018.pdf
math-1.pdf https://www.azed.gov/sites/default/files/2026-07/Math%20Final%2001First%20Grade%20Standards%204_2_2018.pdf
math-2.pdf https://www.azed.gov/sites/default/files/2016/12/Math%20Final%2002Second%20%20Standards%204_2_2017.pdf
math-3.pdf https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%203%20Final%202025.pdf
math-4.pdf https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%204%20Final%202025.pdf
math-5.pdf https://www.azed.gov/sites/default/files/2025/04/Math%20Grade%205%20Final%202025.pdf
math-6.pdf https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%206%20Final%202025.pdf
math-7.pdf https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%207%20Final%202025.pdf
math-8.pdf https://www.azed.gov/sites/default/files/2025/03/Math%20Grade%208%20Final%202025.pdf
math-algebra-1.pdf https://www.azed.gov/sites/default/files/2018/05/Math%20FInal%20Algebra%201%20Standards%204_2_2018.pdf
ela-k.pdf https://www.azed.gov/sites/default/files/2016/12/Kindergarten%202016%20ELA%20Standards.pdf
ela-1.pdf https://www.azed.gov/sites/default/files/2016/12/1st%20Grade%20ELA%202016%20Standards.pdf
ela-2.pdf https://www.azed.gov/sites/default/files/2016/12/ELA%202016%20Final%202nd%20Grade.pdf
ela-3.pdf https://www.azed.gov/sites/default/files/2025/03/ELA%20Grade%203%20Final%202025.pdf
ela-4.pdf https://www.azed.gov/sites/default/files/2025/03/4th%20Grade%20ELA%20CE.pdf
ela-5.pdf https://www.azed.gov/sites/default/files/2025/03/5th%20Grade%20ELA%20CE.pdf
ela-6.pdf https://www.azed.gov/sites/default/files/2025/03/6th%20Grade%20ELA%20CE.pdf
ela-7.pdf https://www.azed.gov/sites/default/files/2025/03/7th%20Grade%20ELA%20CE.pdf
ela-8.pdf https://www.azed.gov/sites/default/files/2025/03/8th%20Grade%20ELA%20CE.pdf
ela-9-10.pdf https://www.azed.gov/sites/default/files/2016/12/9-10th%20Grades%20ELA%202016%20Final.pdf
science.pdf https://www.azed.gov/sites/default/files/2022/03/Complete%20Set%20of%20Standards%20Doc%203_29_22.pdf
social.pdf https://www.azed.gov/sites/default/files/2026/04/2018%20History%20and%20Social%20Science%20Standards%20_Update8.23.19.pdf
assessments-overview.pdf https://www.azed.gov/sites/default/files/2026/04/Assessments%20Overview%202026-2027.pdf
LIST

cd "$repo"
OUT="$out" LIST="$list" node --input-type=module <<'JS'
import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const list = fs.readFileSync(process.env.LIST, "utf8").trim().split("\n").map((line) => line.split(" "));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "azed-"));
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launchPersistentContext(profile, {
  headless: false,
  executablePath: process.env.CHROMIUM || undefined,
  ignoreDefaultArgs: ["--enable-automation"],
  args: ["--disable-blink-features=AutomationControlled"],
  proxy,
});
const page = browser.pages()[0] ?? (await browser.newPage());
await page.goto("https://www.azed.gov/standards-practices/k-12standards/mathematics-standards", { waitUntil: "domcontentloaded" });
for (let i = 0; i < 10 && /moment/i.test(await page.title()); i++) await page.waitForTimeout(3000);
let failed = 0;
for (const [name, url] of list) {
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
echo "Saved to $out. Check against source/SHA256SUMS, then rebuild with: python3 -I build_outcomes.py --text \"$out\""
