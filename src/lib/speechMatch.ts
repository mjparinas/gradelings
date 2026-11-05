// Deciding whether what a child said counts. The recogniser's text for a little child's single word is rough
// ("ball" comes back as "Blah", "dog" as "Jug"), so we never ask "is this exactly the word?". We ask "is it closer
// to the word we asked for than to the other words on screen?", by spelling and by a rough sound key. This can only
// ever give credit: a doubtful hearing is "let's try again", never a wrong answer.

const NUMBER_WORDS: Record<string, number> = {
  zero: 0, one: 1, won: 1, two: 2, to: 2, too: 2, three: 3, tree: 3, four: 4, for: 4, fore: 4, five: 5, six: 6, seven: 7,
  eight: 8, ate: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
};

/** Text the recogniser makes when it hears nothing, or thinks it heard something that isn't speech. */
const NOISE = /^\s*[[(*♪].*[\])*♪]\s*$/;
const FILLER = new Set(["", "you", "thank you", "thanks for watching", "bye", "the", "uh", "um", "hmm", "mm", "oh"]);

export function cleanHeard(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when the recogniser returned nothing a child could have said. */
export function heardNothing(text: string): boolean {
  return NOISE.test(text) || FILLER.has(cleanHeard(text));
}

/** A rough "how it sounds" key: vowels dropped, look-alike consonants merged. */
export function soundKey(word: string): string {
  const w = cleanHeard(word).replace(/ /g, "");
  if (!w) return "";
  const first = w[0];
  const rest = w
    .slice(1)
    .replace(/[aeiouyhw]/g, "")
    .replace(/[bfpv]/g, "1")
    .replace(/[cgjkqsxz]/g, "2")
    .replace(/[dt]/g, "3")
    .replace(/l/g, "4")
    .replace(/[mn]/g, "5")
    .replace(/r/g, "6")
    .replace(/(.)\1+/g, "$1");
  const head = "bfpv".includes(first) ? "1" : "cgjkqsxz".includes(first) ? "2" : "dt".includes(first) ? "3" : /[aeiouy]/.test(first) ? "" : first;
  return head + rest;
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const keep = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = keep;
    }
  }
  return row[b.length];
}

const closeness = (a: string, b: string) => (a || b ? 1 - distance(a, b) / Math.max(a.length, b.length) : 0);

/** 0 to 1: how much `heard` sounds like `word`. Each heard word is compared, and the best one counts. */
export function likeness(heard: string, word: string): number {
  const target = cleanHeard(word).replace(/ /g, "");
  const key = soundKey(word);
  let best = 0;
  for (const h of cleanHeard(heard).split(" ")) {
    if (!h) continue;
    const spelled = closeness(h, target);
    const sounded = key && soundKey(h) ? closeness(soundKey(h), key) * 0.9 : 0;
    best = Math.max(best, spelled, sounded);
  }
  return best;
}

/**
 * Did the child say `target`? Counts when the target (or one of its other spellings, `accept`) is at least as close to
 * what was heard as every other word shown (`others`), and close enough to be believable.
 */
export function saidWord(heard: string, target: string, others: readonly string[] = [], accept: readonly string[] = []): boolean {
  if (heardNothing(heard)) return false;
  const mine = Math.max(...[target, ...accept].map((w) => likeness(heard, w)));
  if (mine < 0.4) return false;
  return others.every((o) => mine >= likeness(heard, o));
}

/** The numbers in what was heard, in order: "1, 2 3 four" gives [1, 2, 3, 4]. */
export function heardNumbers(heard: string): number[] {
  const out: number[] = [];
  for (const t of cleanHeard(heard).split(" ")) {
    if (/^\d+$/.test(t)) out.push(Number(t));
    else if (t in NUMBER_WORDS) out.push(NUMBER_WORDS[t]);
  }
  return out;
}

/** Did the child count from 1 up to at least `n`? A skipped or repeated number doesn't spoil it. */
export function countedTo(heard: string, n: number): boolean {
  let next = 1;
  for (const x of heardNumbers(heard)) if (x === next) next++;
  return next - 1 >= n;
}
