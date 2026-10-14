import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { afterAll, describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { DEFAULT_FRAMEWORK, FRAMEWORKS } from "./frameworks";
import { GUIDES } from "./guides";
import { coursesInFramework, EXTRA_DEPENDS } from "./index";
import { withSeed } from "./random";
import { GRADE_ORDER } from "./subjects";
import type { Course, FrameworkId, GradeId, Unit } from "./types";

// Curriculum lock files (src/content/locks/). Each framework's lock lists every course it shows, the units in order, and a
// short hash of each unit's text, its standard and its questions at fixed seeds. Units are shared between frameworks, so a
// change to one unit can change several frameworks at once: the lock files make that visible in the pull request. When a
// change is intended, run `npm run curriculum:lock` and commit the new locks. The same run records each grade's download
// size per framework (locks/sizes.json); a download that grows by more than SIZE_SLACK fails until the sizes are re-recorded.
// It also keeps locks/dates.json: the day each unit, course and set of guides last changed, which the sitemap and the
// public pages' structured data give search engines. A date moves only when that part's lock entry changes.

const UPDATE = process.env.UPDATE_LOCKS === "1";
const LOCKS = join(__dirname, "locks");
const SRC = resolve(__dirname, "..");
/** How much a grade's download may grow before the test asks for the sizes to be re-recorded. */
const SIZE_SLACK = 1.1;

const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value) ?? "").digest("hex").slice(0, 10);

/** Questions at three seeds and every difficulty: enough to notice any change to a generator. */
const sampleOf = (unit: Unit) => [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 7919 + difficulty, () => unit.generate({ difficulty }))));

/** Units are shared, so each generator is sampled once however many frameworks use it. */
const questionHashes = new WeakMap<Unit["generate"], string>();

function questionHash(unit: Unit): string {
  let h = questionHashes.get(unit.generate);
  if (!h) questionHashes.set(unit.generate, (h = hash(sampleOf(unit))));
  return h;
}

function lockLine(unit: Unit, framework: FrameworkId): string {
  const { title, emoji, blurb, parentNote, lesson } = unit;
  return `${unit.id} text=${hash({ title, emoji, blurb, parentNote, lesson })} std=${hash(unit.standards[framework])} q=${questionHash(unit)}`;
}

function lockOf(framework: FrameworkId): Record<string, { overview: string; units: string[] }> {
  const out: Record<string, { overview: string; units: string[] }> = {};
  const courses: Course[] = coursesInFramework(COURSES, framework);
  for (const c of [...courses].sort((a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade) || a.subject.localeCompare(b.subject))) {
    out[`${c.grade}/${c.subject}`] = { overview: hash(c.bigIdeas[framework] ?? []), units: c.units.map((u) => lockLine(u, framework)) };
  }
  return out;
}

const pretty = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

// Last-changed dates (locks/dates.json).

type Lock = Record<string, { overview: string; units: string[] }>;
interface Dates {
  /** Guide copy and report-card page, as "YYYY-MM-DD hash". */
  guides?: string;
  /** "grade/subject": the day the course's overview or unit list last changed. */
  courses: Record<string, string>;
  /** "grade/subject/unit": the day the unit's text, standard or questions last changed. */
  units: Record<string, string>;
}

const DATES_FILE = join(LOCKS, "dates.json");
const TODAY = process.env.LOCK_DATE ?? new Date().toISOString().slice(0, 10);
const recordedDates = (existsSync(DATES_FILE) ? JSON.parse(readFileSync(DATES_FILE, "utf8")) : {}) as Partial<Record<FrameworkId, Dates>>;
const newDates: Partial<Record<FrameworkId, Dates>> = {};

const guidesHash = (framework: (typeof FRAMEWORKS)[number]) => (GUIDES[framework.id] ? hash({ guides: GUIDES[framework.id], reportCard: framework.reportCard }) : undefined);

/** Dates for a framework's new lock: kept where its entry is unchanged since the recorded lock, today where it changed. */
function datesFor(framework: (typeof FRAMEWORKS)[number], lock: Lock, before: Lock | undefined): Dates {
  const old = recordedDates[framework.id];
  const out: Dates = { courses: {}, units: {} };
  const g = guidesHash(framework);
  if (g) out.guides = old?.guides?.endsWith(` ${g}`) ? old.guides : `${TODAY} ${g}`;
  for (const [course, entry] of Object.entries(lock)) {
    const was = before?.[course];
    const same = was && JSON.stringify(was) === JSON.stringify(entry);
    out.courses[course] = (same && old?.courses[course]) || TODAY;
    for (const line of entry.units) {
      const key = `${course}/${line.split(" ")[0]}`;
      out.units[key] = (was?.units.includes(line) && old?.units[key]) || TODAY;
    }
  }
  return out;
}

/** The keys a framework's dates must have, with the guide hash: checked so the dates never fall behind the locks. */
const dateShape = (framework: (typeof FRAMEWORKS)[number], lock: Lock) => ({
  guides: guidesHash(framework),
  courses: Object.keys(lock),
  units: Object.entries(lock).flatMap(([course, entry]) => entry.units.map((line) => `${course}/${line.split(" ")[0]}`)),
});

function compare(file: string, actual: unknown, hint: string) {
  const path = join(LOCKS, file);
  if (UPDATE) {
    mkdirSync(LOCKS, { recursive: true });
    writeFileSync(path, pretty(actual));
    return;
  }
  expect(existsSync(path), `${file} is missing: run \`npm run curriculum:lock\``).toBe(true);
  expect(actual, hint).toEqual(JSON.parse(readFileSync(path, "utf8")));
}

// Download sizes. The apps load a grade as the shared grade file plus each framework's own file for that grade (and the files
// it depends on; see loadGrade in ./index). These are measured here as the gzipped size of every source file each entry
// reaches through static imports: not the exact bytes Next.js ships, but it moves the same way.

/** The grade files the apps load, read from the dynamic imports in each framework's manifest (see ./registry). */
function entries(): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  for (const dir of readdirSync(__dirname)) {
    const file = join(__dirname, dir, "manifest.ts");
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    const id = /\bid: "([a-z]{2}-[a-z]{2})"/.exec(text)?.[1];
    if (id) out[id] = Object.fromEntries([...text.matchAll(/"?(\w)"?: \(\) => import\("\.\/([^"]+)"\)/g)].map((m) => [m[1], `${dir}/${m[2]}`]));
  }
  return out;
}

function resolveImport(from: string, spec: string): string | undefined {
  const target = spec.startsWith("@/") ? join(SRC, spec.slice(2)) : spec.startsWith(".") ? resolve(dirname(from), spec) : undefined;
  if (!target) return undefined;
  for (const candidate of [target, `${target}.ts`, `${target}.tsx`, join(target, "index.ts")]) if (existsSync(candidate) && candidate.match(/\.tsx?$/)) return candidate;
  return undefined;
}

/** Every source file reachable from `entry` through value imports (type-only imports ship nothing). */
function reach(entry: string, seen = new Set<string>()): Set<string> {
  if (seen.has(entry)) return seen;
  seen.add(entry);
  const text = readFileSync(entry, "utf8");
  for (const m of text.matchAll(/^\s*(?:import|export)\s+(?!type\b)(?:[^;]*?\sfrom\s+)?"([^"]+)"/gm)) {
    const file = resolveImport(entry, m[1]);
    if (file) reach(file, seen);
  }
  return seen;
}

function sizes(): Record<string, Record<string, number>> {
  const files = entries();
  for (const f of FRAMEWORKS) if (!files[f.id]) throw new Error(`No grade files found in ${f.id}'s manifest`);
  const out: Record<string, Record<string, number>> = {};
  for (const f of FRAMEWORKS) {
    out[f.id] = {};
    for (const grade of GRADE_ORDER as GradeId[]) {
      const seen = new Set<string>();
      const parts = [...new Set([DEFAULT_FRAMEWORK, f.id, ...(EXTRA_DEPENDS[f.id] ?? [])])].map((id) => files[id]?.[grade]).filter(Boolean) as string[];
      for (const p of parts) reach(resolveImport(join(__dirname, "index.ts"), `./${p}`)!, seen);
      const source = [...seen].sort().map((file) => readFileSync(file, "utf8")).join("\n");
      out[f.id][grade] = Math.round(gzipSync(source).length / 1024);
    }
  }
  return out;
}

describe("curriculum locks", () => {
  afterAll(() => {
    if (UPDATE && Object.keys(newDates).length === FRAMEWORKS.length) writeFileSync(DATES_FILE, pretty(Object.fromEntries(FRAMEWORKS.map((f) => [f.id, newDates[f.id]]))));
  });

  for (const f of FRAMEWORKS) {
    it(`${f.name} matches locks/${f.id}.json`, () => {
      const lock = lockOf(f.id);
      if (UPDATE) {
        const path = join(LOCKS, `${f.id}.json`);
        newDates[f.id] = datesFor(f, lock, existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Lock) : undefined);
      } else {
        const d = recordedDates[f.id];
        expect(d && { guides: d.guides?.split(" ")[1], courses: Object.keys(d.courses), units: Object.keys(d.units) }, `locks/dates.json is out of date for ${f.name}: run \`npm run curriculum:lock\``).toEqual(dateShape(f, lock));
      }
      compare(`${f.id}.json`, lock, `${f.name}'s courses changed. If that was intended, run \`npm run curriculum:lock\` and commit the lock files; the diff shows every framework the change reached.`);
    });
  }

  it("records each grade's download size, and no download has grown unnoticed", () => {
    const actual = sizes();
    if (UPDATE) return compare("sizes.json", actual, "");
    const recorded = JSON.parse(readFileSync(join(LOCKS, "sizes.json"), "utf8")) as Record<string, Record<string, number>>;
    const grown = Object.entries(actual).flatMap(([f, grades]) =>
      Object.entries(grades)
        .filter(([g, kb]) => kb > Math.ceil((recorded[f]?.[g] ?? 0) * SIZE_SLACK) + 1)
        .map(([g, kb]) => `${f} grade ${g}: ${recorded[f]?.[g] ?? 0} KB recorded, ${kb} KB now`),
    );
    expect(grown, "These downloads grew. Check nothing extra is imported, then run `npm run curriculum:lock` to record the new sizes.").toEqual([]);
  });

  it("samples the same questions twice (generators are repeatable)", () => {
    const units = COURSES.flatMap((c) => c.units).filter((_, i) => i % 25 === 0);
    for (const u of units) expect(hash(sampleOf(u)), u.id).toBe(hash(sampleOf(u)));
  });
});
