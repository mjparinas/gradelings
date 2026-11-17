// The province or state (and grade) of the last region page this device read, so a parent who signs up after
// reading, say, Ontario's Grade 4 pages starts with Ontario and Grade 4 picked on the first-child step. It only
// pre-fills a form: nothing is sent anywhere, nothing says who the visitor is, and a parent can change it.
// Kept tiny on purpose, because public pages load it.

const KEY = "gradelings.region";

export interface RegionHint {
  framework: string;
  grade?: string;
}

/** Remembers the region a "Try it free" link (`playHref`) names; links with none leave the last one alone. */
export function rememberRegionFromPlayLink(href: string | undefined): void {
  if (!href) return;
  const q = href.split("?")[1];
  if (!q) return;
  const params = new URLSearchParams(q);
  const framework = params.get("framework");
  if (!framework || !/^[a-z0-9-]{1,40}$/.test(framework)) return;
  const grade = params.get("grade");
  try {
    localStorage.setItem(KEY, JSON.stringify({ framework, ...(grade && /^[a-z0-9]{1,3}$/.test(grade) ? { grade } : {}) }));
  } catch {
    // Storage blocked (private window): the hint just isn't kept.
  }
}

export function readRegionHint(): RegionHint | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "null") as RegionHint | null;
    return v && typeof v.framework === "string" ? v : null;
  } catch {
    return null;
  }
}
