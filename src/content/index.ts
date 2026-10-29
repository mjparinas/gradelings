import { DEFAULT_FRAMEWORK, getFramework } from "./frameworks";
import { localeOf, localizeUnit } from "./locale";
import { GRADE_ORDER } from "./subjects";
import { withLessons, type GradeLessons } from "./lessons";
import type { GradeModule } from "./manifest";
import { manifestOf, REGISTRY } from "./registry";
import type { Course, FrameworkId, GradeId, SubjectId, Unit } from "./types";

// The content store for the apps. Each grade's content is its own download,
// loaded on demand with `loadGrade`, so a Grade 2 child never downloads Grade 7.
// A grade's shared lessons (BC) are one download, and each other framework adds
// its own download on top, so a BC child never downloads Ontario lessons.
// Lookups only see grades that have loaded; the apps wait for the grades they need
// (see src/lib/useGradeContent.ts). Server pages and tests use ./all instead.

// A grade module may also export its lessons ("subject/unit-id"). They are applied to every framework's
// units with that id, so a unit only one province teaches still gets its lesson.
type Loader = () => Promise<GradeModule>;

/** The shared grade files (British Columbia's), loaded for every child. They hold every grade, Pre-K too (registry.test.ts checks). */
const LOADERS = manifestOf(DEFAULT_FRAMEWORK).grades as Record<GradeId, Loader>;

/** Each other framework's own grade files. Each is its own download per grade, on top of the shared one. */
const EXTRA_LOADERS: Partial<Record<FrameworkId, Partial<Record<GradeId, Loader>>>> = Object.fromEntries(
  REGISTRY.filter((m) => m.id !== DEFAULT_FRAMEWORK).map((m) => [m.id, m.grades]),
);

/**
 * Frameworks whose grade files another framework reuses (`depends` in its manifest). Alberta lists some Ontario-written
 * units under `shares`, so an Alberta child downloads Ontario's file for the grade too (those units stay hidden unless
 * they carry Alberta standards).
 */
export const EXTRA_DEPENDS: Partial<Record<FrameworkId, FrameworkId[]>> = Object.fromEntries(REGISTRY.flatMap((m) => ("depends" in m && m.depends ? [[m.id, m.depends]] : [])));

const withDepends = (framework: FrameworkId): FrameworkId[] => [framework, ...(EXTRA_DEPENDS[framework] ?? [])];

/** What a child needs downloaded: a grade in a framework. */
export interface ContentTarget {
  grade: GradeId;
  framework: FrameworkId;
}

/** Grades that have content. Every grade has a loader; tests check each one has units. */
export const AVAILABLE_GRADES: GradeId[] = GRADE_ORDER.filter((g) => g in LOADERS);

/** Progress is keyed by "grade/subject/unit", e.g. "2/math/tens-and-ones". */
export function unitKey(grade: GradeId, subject: SubjectId, unitId: string): string {
  return `${grade}/${subject}/${unitId}`;
}

/** Reads a unit key without needing its grade loaded, so scoring never depends on downloads. */
export function parseUnitKey(key: string): { grade: GradeId; subject: SubjectId; unitId: string } | undefined {
  const [grade, subject, unitId] = key.split("/");
  if (!unitId || !GRADE_ORDER.includes(grade as GradeId)) return undefined;
  return { grade: grade as GradeId, subject: subject as SubjectId, unitId };
}

export interface UnitRef {
  key: string;
  course: Course;
  unit: Unit;
}

/** Joins two share maps. A unit shared by several frameworks keeps the standards from each. */
function mergeShares(a: Course["shares"], b: Course["shares"]): Course["shares"] {
  const out = { ...a };
  for (const [id, share] of Object.entries(b ?? {})) out[id] = { standards: { ...out[id]?.standards, ...share.standards } };
  return out;
}

/** Joins courses of the same subject, so a framework's own units sit beside the shared ones. */
export function mergeCourses(lists: Course[][]): Course[] {
  const out: Course[] = [];
  for (const course of lists.flat()) {
    const i = out.findIndex((c) => c.grade === course.grade && c.subject === course.subject);
    if (i < 0) {
      out.push(course);
      continue;
    }
    const base = out[i];
    out[i] = {
      ...base,
      bigIdeas: { ...base.bigIdeas, ...course.bigIdeas },
      units: mergeUnits(base.units, course.units),
      shares: mergeShares(base.shares, course.shares),
      order: { ...base.order, ...course.order },
    };
  }
  return out.map(applyShares);
}

/** Joins two unit lists. A unit with the same id is the same unit, with the standards of every framework that uses it. */
function mergeUnits(a: Unit[], b: Unit[]): Unit[] {
  const out = [...a];
  for (const unit of b) {
    const i = out.findIndex((u) => u.id === unit.id);
    if (i < 0) {
      out.push(unit);
      continue;
    }
    if (out[i].generate !== unit.generate) throw new Error(`Two different units share the id "${unit.id}"`);
    out[i] = { ...out[i], standards: { ...out[i].standards, ...unit.standards } };
  }
  return out;
}

function applyShares(course: Course): Course {
  if (!course.shares) return course;
  const shares = course.shares;
  return {
    ...course,
    units: course.units.map((u) => (shares[u.id] ? { ...u, standards: { ...u.standards, ...shares[u.id].standards } } : u)),
  };
}

/** A framework's view of courses: only the units it has standards for, in the framework's spelling. */
export function coursesInFramework(list: Course[], framework: FrameworkId): Course[] {
  const locale = localeOf(getFramework(framework));
  return list
    .map((c) => {
      let units = c.units.every((u) => u.standards[framework]) ? c.units : c.units.filter((u) => u.standards[framework]);
      if (locale !== "en-CA") units = units.map((u) => localizeUnit(u, locale));
      const order = c.order?.[framework];
      if (order) {
        const rank = (u: Unit) => (order.includes(u.id) ? order.indexOf(u.id) : order.length);
        units = [...units].sort((a, b) => rank(a) - rank(b));
      }
      return units === c.units ? c : { ...c, units };
    })
    .filter((c) => c.units.length > 0);
}

const base = new Map<GradeId, Course[]>();
const baseLessons = new Map<GradeId, GradeLessons>();
const extras = new Map<string, Course[]>();
const merged = new Map<GradeId, Course[]>();
const views = new Map<string, Course[]>();
const refs = new Map<string, UnitRef>();
const pending = new Map<string, Promise<void>>();
const failed = new Set<string>();
const listeners = new Set<() => void>();

const targetId = (grade: GradeId, framework: FrameworkId) => `${framework}:${grade}`;

function rebuild(grade: GradeId) {
  const list = withLessons(
    mergeCourses([
      base.get(grade) ?? [],
      ...[...extras.entries()].filter(([k]) => k.endsWith(`:${grade}`)).map(([, v]) => v),
    ]),
    baseLessons.get(grade) ?? {},
  ).filter((c) => c.units.length > 0);
  merged.set(grade, list);
  for (const key of [...views.keys()]) if (key.endsWith(`:${grade}`)) views.delete(key);
  for (const course of list) {
    for (const unit of course.units) {
      const key = unitKey(course.grade, course.subject, unit.id);
      refs.set(key, { key, course, unit });
    }
  }
}

function notify() {
  for (const l of listeners) l();
}

function loadPart(id: string, grade: GradeId, loader: Loader, store: () => void, register: (m: GradeModule) => void): Promise<void> {
  let p = pending.get(id);
  if (!p) {
    failed.delete(id);
    p = loader()
      .then((m) => {
        register(m);
        store();
      })
      .catch((err: unknown) => {
        // Usually offline before this grade was ever downloaded. Allow a retry.
        failed.add(id);
        throw err;
      })
      .finally(() => {
        pending.delete(id);
        notify();
      });
    pending.set(id, p);
    notify();
  }
  return p;
}

const moreLoaders = new Map<GradeId, () => Promise<GradeLessons>>();
const moreLessons = new Map<GradeId, Promise<void>>();

/**
 * Fetches the lessons for a grade's other subjects (math's ship with the grade). Nothing waits for them: a lesson that
 * hasn't arrived is skipped, as for a unit with none. A failed download (usually offline) is tried again next time.
 */
function loadMoreLessons(grade: GradeId): Promise<void> {
  const loader = moreLoaders.get(grade);
  if (!loader) return Promise.resolve();
  let p = moreLessons.get(grade);
  if (!p) {
    p = loader()
      .then((more) => {
        baseLessons.set(grade, { ...more, ...baseLessons.get(grade) });
        rebuild(grade);
        notify();
      })
      .catch(() => {
        moreLessons.delete(grade);
      });
    moreLessons.set(grade, p);
  }
  return p;
}

/** Resolves once every grade loaded so far has its lessons for every subject (or failed to get them). */
export function lessonsSettled(): Promise<void> {
  return Promise.all(moreLessons.values()).then(() => undefined);
}

/** Downloads a grade's content once; later calls return the same promise. */
export function loadGrade(grade: GradeId, framework: FrameworkId = DEFAULT_FRAMEWORK): Promise<void> {
  const parts: Promise<void>[] = [];
  if (!base.has(grade)) {
    parts.push(
      loadPart(`base:${grade}`, grade, LOADERS[grade], () => rebuild(grade), (m) => {
          base.set(grade, m.courses);
          if (m.lessons) baseLessons.set(grade, m.lessons);
          if (m.moreLessons) moreLoaders.set(grade, m.moreLessons);
        }).then(() => {
          void loadMoreLessons(grade);
        }),
    );
  } else void loadMoreLessons(grade);
  for (const f of withDepends(framework)) {
    const extra = EXTRA_LOADERS[f]?.[grade];
    const id = targetId(grade, f);
    if (extra && !extras.has(id)) {
      parts.push(loadPart(id, grade, extra, () => rebuild(grade), (m) => extras.set(id, m.courses)));
    }
  }
  return Promise.all(parts).then(() => undefined);
}

export function loadGrades(targets: Iterable<ContentTarget>): Promise<void> {
  const unique = new Map<string, ContentTarget>();
  for (const t of targets) unique.set(targetId(t.grade, t.framework), t);
  return Promise.all([...unique.values()].map((t) => loadGrade(t.grade, t.framework))).then(() => undefined);
}

export function isGradeLoaded(grade: GradeId, framework: FrameworkId = DEFAULT_FRAMEWORK): boolean {
  if (!base.has(grade)) return false;
  return withDepends(framework).every((f) => !EXTRA_LOADERS[f]?.[grade] || extras.has(targetId(grade, f)));
}

export function gradeLoadFailed(grade: GradeId, framework: FrameworkId = DEFAULT_FRAMEWORK): boolean {
  return failed.has(`base:${grade}`) || withDepends(framework).some((f) => failed.has(targetId(grade, f)));
}

/** For useSyncExternalStore: called whenever a grade starts, finishes or fails loading. */
export function subscribeToContent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** A grade's courses in a framework (only its units), or [] if that grade hasn't loaded yet. */
export function coursesForGrade(grade: GradeId, framework: FrameworkId): Course[] {
  const id = targetId(grade, framework);
  let view = views.get(id);
  if (!view) {
    view = coursesInFramework(merged.get(grade) ?? [], framework);
    views.set(id, view);
  }
  return view;
}

export function getCourse(grade: GradeId, subject: SubjectId | string, framework: FrameworkId): Course | undefined {
  return coursesForGrade(grade, framework).find((c) => c.subject === subject);
}

/** A unit by key. Pass the child's framework to get it in that framework's spelling (US English for a state). */
export function getUnitRef(key: string, framework?: FrameworkId): UnitRef | undefined {
  const ref = refs.get(key);
  if (!ref || !framework) return ref;
  const locale = localeOf(getFramework(framework));
  return locale === "en-CA" ? ref : { ...ref, unit: localizeUnit(ref.unit, locale) };
}

export function allUnitRefs(grade: GradeId, framework: FrameworkId): UnitRef[] {
  return coursesForGrade(grade, framework).flatMap((course) =>
    course.units.map((unit) => {
      const ref = refs.get(unitKey(course.grade, course.subject, unit.id))!;
      return ref.unit === unit ? ref : { ...ref, unit };
    }),
  );
}

/** Grades a child practises some subjects at instead of their own grade (see src/lib/subjectGrades.ts). */
export type SubjectGrades = Partial<Record<SubjectId, GradeId>>;

/**
 * The courses a child practises: each subject from the grade set for it, the rest from their own grade. A subject whose
 * other grade hasn't loaded yet stays on the child's grade, so nothing goes missing while a download finishes.
 */
export function practiceCourses(grade: GradeId, framework: FrameworkId, bySubject: SubjectGrades = {}): Course[] {
  return coursesForGrade(grade, framework).map((course) => {
    const other = bySubject[course.subject];
    if (!other || other === grade) return course;
    return getCourse(other, course.subject, framework) ?? course;
  });
}

/** `allUnitRefs` for the courses a child practises (`practiceCourses`). */
export function practiceUnitRefs(grade: GradeId, framework: FrameworkId, bySubject: SubjectGrades = {}): UnitRef[] {
  return practiceCourses(grade, framework, bySubject).flatMap((course) => allUnitRefs(course.grade, framework).filter((r) => r.course.subject === course.subject));
}
