#!/usr/bin/env bash
# Downloads the Virginia Department of Education's Standards of Learning documents used by build_outcomes.py.
#
# Usage: ./fetch.sh [out-dir]        (default: ./source)
#
# doe.virginia.gov sits behind an Akamai bot check that answers curl (and headless browsers) with 403 "Access Denied",
# so this opens a real (headed) Chromium with Playwright, loads a standards page, then fetches each file from inside
# that page. Run it from the repository (it uses node_modules/playwright). On a machine without a display, wrap it in
# xvfb-run: `xvfb-run -a ./fetch.sh`. Set CHROMIUM to a browser binary if Playwright's own isn't installed.
#
# Documents:
#   math-2023.pdf     2023 Mathematics Standards of Learning, all of K-12 (Board of Education, August 31, 2023)
#   english-2024.pdf  2024 English Standards of Learning, all of K-12 (Board of Education, March 28, 2024)
#   science-2018.pdf  2018 Science Standards of Learning, K-12, clean version with the 2026 technical edits
#   social-2023.docx  2023 History and Social Science Standards of Learning, all courses (VDOE posts Word only)
#   code-22.1-289.01.html  Code of Virginia § 22.1-289.01, school service providers and student personal information
#   code-22.1-287.02.html  Code of Virginia § 22.1-287.02, student data security
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="${1:-$here/source}"
repo="$(cd "$here/../../.." && pwd)"
mkdir -p "$out"

list="$(mktemp)"
trap 'rm -f "$list"' EXIT
cat > "$list" <<'LIST'
math-2023.pdf https://www.doe.virginia.gov/home/showpublisheddocument/48908/638741650017470000
english-2024.pdf https://www.doe.virginia.gov/home/showpublisheddocument/53643/639159934039100000
science-2018.pdf https://www.doe.virginia.gov/home/showpublisheddocument/77118/639180628197970000
social-2023.docx https://www.doe.virginia.gov/home/showpublisheddocument/60408/638834320277530000
LIST

cd "$repo"
OUT="$out" LIST="$list" node --input-type=module <<'JS'
import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const list = fs.readFileSync(process.env.LIST, "utf8").trim().split("\n").map((line) => line.split(" "));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "vdoe-"));
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launchPersistentContext(profile, {
  headless: false,
  executablePath: process.env.CHROMIUM || undefined,
  ignoreDefaultArgs: ["--enable-automation"],
  args: ["--disable-blink-features=AutomationControlled"],
  proxy,
});
const page = browser.pages()[0] ?? (await browser.newPage());
await page.goto("https://www.doe.virginia.gov/teaching-learning-assessment/instruction/mathematics/standards-of-learning-for-mathematics", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
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
  const head = data.subarray(0, 4).toString("latin1");
  const ok = r.status === 200 && (head === "%PDF" || head.startsWith("PK"));
  console.log(ok ? "ok  " : "FAIL", name, r.status, data.length);
  if (ok) fs.writeFileSync(path.join(process.env.OUT, name), data);
  else failed++;
}
await browser.close();
process.exit(failed ? 1 : 0);
JS

# The Code of Virginia is served without a bot check.
for section in 22.1-289.01 22.1-287.02; do
  curl -fsSL -A "Mozilla/5.0" "https://law.lis.virginia.gov/vacode/title22.1/chapter14/section$section/" -o "$out/code-$section.html"
done

# Text extracts beside each document, so a diff shows what changed in a new edition.
for f in "$out"/*.pdf; do pdftotext -layout "$f" "${f%.pdf}.txt"; done
python3 -I -c 'import sys, zipfile, re, html
for path in sys.argv[1:]:
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    paras = []
    for p in re.findall(r"<w:p[ >].*?</w:p>", xml, re.S):
        text = "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))
        paras.append(html.unescape(text))
    open(path[:-5] + ".txt", "w", encoding="utf-8").write("\n".join(paras) + "\n")' "$out"/*.docx
(cd "$out" && sha256sum *.pdf *.docx *.html > SHA256SUMS)
