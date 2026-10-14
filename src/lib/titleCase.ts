/** Short words left lower case inside a title (AP style: articles, short conjunctions, prepositions of three letters or fewer). */
const MINOR = new Set(["a", "an", "the", "and", "but", "or", "nor", "as", "at", "by", "for", "in", "of", "per", "to", "via", "vs"]);

/** Capitalizes the first letter of a word, leaving words with a capital already (CSV, GitHub, iOS) as they are. */
function capital(word: string, force: boolean): string {
  if (/[A-Z]/.test(word)) return word;
  const i = word.search(/[a-z]/);
  if (i < 0) return word;
  if (!force && MINOR.has(word.toLowerCase().replace(/[^a-z']/g, ""))) return word;
  return word.slice(0, i) + word[i].toUpperCase() + word.slice(i + 1);
}

/** Title Case for admin panel headings and buttons built from data: "Sign-up funnel" becomes "Sign-Up Funnel". */
export function titleCase(text: string): string {
  const parts = text.split(/(\s+)/);
  const words = parts.flatMap((p, i) => (/[A-Za-z]/.test(p) ? [i] : []));
  let afterColon = false;
  for (const [n, i] of words.entries()) {
    const force = n === 0 || n === words.length - 1 || afterColon;
    afterColon = parts[i].endsWith(":");
    parts[i] = parts[i]
      .split("-")
      .map((w, k) => capital(w, force || k > 0))
      .join("-");
  }
  return parts.join("");
}
