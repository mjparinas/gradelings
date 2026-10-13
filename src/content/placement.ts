import type { Course, FrameworkId, GradeId, SubjectId, Unit } from "./types";

// How a framework places units in its courses. Every framework does the same three things with a unit that already exists:
//
// - share: a unit BC already has in this grade and subject. The course lists its id under `shares` with this framework's
//   standards, and `mergeCourses` adds them to the BC unit. Nothing is copied.
// - adopt: a unit from another framework (or another grade, a "lift"). It is copied with this framework's standards only,
//   so it never shows up for another framework by accident. The copy keeps the original's id and questions, so progress
//   carries over, and a family with both frameworks loaded sees one unit carrying both sets of standards.
// - own: a unit written for this framework.
//
// The per-framework kits used to repeat this code with only the framework id and the citation style changed. They now
// call these helpers, so a fix here reaches every framework and the curriculum locks (src/content/locks/) show what moved.

/** Standards text for one framework: the citation (codes, strand, guide), then a short plain description. */
export type Cite = (citation: string, text: string) => Unit["standards"];

/** A `Cite` for a framework: `"<citation> · <text>"`, the format every framework uses. */
export function citeFor(framework: FrameworkId): Cite {
  return (citation, text) => ({ [framework]: `${citation} · ${text}` });
}

/** A citation and a short plain description of what the unit practises. */
export type Std = readonly [citation: string, text: string];

/** One plan entry: a unit id, how the framework uses it, the citation and what it says. "lift" adopts from another grade. */
export type PlanEntry = readonly [id: string, kind: "share" | "adopt" | "lift", citation: string, text: string];

/** A framework's plan: entries per `"grade/subject"`. */
export type Plan = Record<string, readonly PlanEntry[]>;

/** Units written for a framework, with the order they sit in. */
export interface OwnUnits {
  units: Unit[];
  /** The whole course order. Defaults to the planned units then the own ones (or the reverse with `first`). */
  order?: string[];
  /** Put the own units before the planned ones. */
  first?: boolean;
}

/** The units one subject's courses hold across several lists of courses (for example a grade's Ontario and Manitoba courses). */
export function poolOf(subject: SubjectId, ...lists: Course[][]): Unit[] {
  return lists.flatMap((courses) => courses.filter((c) => c.subject === subject).flatMap((c) => c.units));
}

/** The units one subject's course holds in a list of courses. */
export function unitsOf(courses: Course[], subject: SubjectId): Unit[] {
  return courses.find((c) => c.subject === subject)?.units ?? [];
}

/**
 * Copies units from `pool` with `cite`'s standards only, in the order of `plan`. Throws when a unit is missing, so a rename
 * elsewhere can't drop a unit silently. `rename` gives a copy a new id when the same id is already a different unit in this
 * grade (for example a Grade 4 unit borrowed by Grade 5).
 */
export function adoptUnits(name: string, cite: Cite, pool: Unit[], plan: Record<string, Std>, rename: Record<string, string> = {}): Unit[] {
  return Object.entries(plan).map(([id, [citation, text]]) => {
    const unit = pool.find((u) => u.id === id);
    if (!unit) throw new Error(`${name}: no unit "${id}" to adopt`);
    return { ...unit, id: rename[id] ?? id, standards: cite(citation, text) };
  });
}

/** What one course holds, for `courseOf`. */
export interface CourseSpec {
  /** Units BC already has in this grade and subject, with this framework's citation. */
  share?: Record<string, Std>;
  /** Units written elsewhere (another grade, or another framework), as this framework's copies. */
  adopted?: Unit[];
  /** Units written for this framework. */
  own?: Unit[];
  /** Unit order. Defaults to shared units, then adopted, then own. */
  order?: string[];
}

/** One course built by hand: shared, adopted and own units, with the learning focus given. */
export function courseOf(framework: FrameworkId, cite: Cite, grade: GradeId, subject: SubjectId, focus: string[], spec: CourseSpec): Course {
  const shares = Object.fromEntries(Object.entries(spec.share ?? {}).map(([id, [citation, text]]) => [id, { standards: cite(citation, text) }]));
  const units = [...(spec.adopted ?? []), ...(spec.own ?? [])];
  return {
    grade,
    subject,
    bigIdeas: { [framework]: focus },
    units,
    shares,
    order: { [framework]: spec.order ?? [...Object.keys(shares), ...units.map((u) => u.id)] },
  };
}

/** How `planGrade` builds one framework's grades. */
export interface PlanOptions {
  framework: FrameworkId;
  /** The framework's name, for error messages. */
  name: string;
  cite: Cite;
  plan: Plan;
  /** The learning focus (Big Ideas) of one course. */
  focus: (grade: GradeId, subject: SubjectId) => string[];
  /** The subjects every grade has. Without it, a grade has the subjects its plan or own units name. */
  subjects?: SubjectId[];
  /** Own units go before the planned ones unless a subject's `OwnUnits` says otherwise. */
  ownFirst?: boolean;
}

/**
 * One grade of a framework that is built from a plan. `pool` is the courses whose units it may adopt, in the order to
 * search them; `lift` is courses from other grades, for "lift" entries.
 */
export function planGrade(opts: PlanOptions, grade: GradeId, pool: Course[][], own: Partial<Record<SubjectId, OwnUnits>> = {}, lift: Course[][] = []): Course[] {
  const { framework, name, cite, plan } = opts;
  const subjects =
    opts.subjects ??
    [...new Set<string>([...Object.keys(plan).filter((k) => k.startsWith(`${grade}/`)).map((k) => k.split("/")[1]), ...Object.keys(own)])].map((s) => s as SubjectId);
  return subjects.map((subject) => {
    const entries = plan[`${grade}/${subject}`] ?? [];
    const available = poolOf(subject, ...pool);
    const lifted = poolOf(subject, ...lift);
    const shares: NonNullable<Course["shares"]> = {};
    const units: Unit[] = [];
    for (const [id, kind, citation, text] of entries) {
      if (kind === "share") {
        shares[id] = { standards: cite(citation, text) };
        continue;
      }
      const unit = (kind === "lift" ? lifted : available).find((u) => u.id === id);
      if (!unit) throw new Error(`${name}: no unit "${id}" to ${kind} in ${grade}/${subject}`);
      units.push({ ...unit, standards: cite(citation, text) });
    }
    const mine = own[subject];
    const ownUnits = mine?.units ?? [];
    units.push(...ownUnits);
    const planned = entries.map((e) => e[0]);
    const ownIds = ownUnits.map((u) => u.id);
    const first = mine?.first ?? opts.ownFirst ?? false;
    return {
      grade,
      subject,
      bigIdeas: { [framework]: opts.focus(grade, subject) },
      units,
      shares,
      order: { [framework]: mine?.order ?? (first ? [...ownIds, ...planned] : [...planned, ...ownIds]) },
    };
  });
}

/**
 * A course of a framework that follows BC's curriculum (Yukon, the NWT): every BC unit is shared with BC's standards
 * text under this framework's id, plus any units written for it. Nothing is copied.
 */
export function followBcCourse(framework: FrameworkId, bc: Course, own: Unit[] = [], ownIds?: string[]): Course {
  const bcUnits = bc.units.filter((u) => u.standards["ca-bc"]);
  const shares = Object.fromEntries(bcUnits.map((u) => [u.id, { standards: { [framework]: u.standards["ca-bc"] } }]));
  const order = bc.order?.["ca-bc"] ?? bcUnits.map((u) => u.id);
  return {
    grade: bc.grade,
    subject: bc.subject,
    bigIdeas: { [framework]: bc.bigIdeas["ca-bc"] ?? [] },
    units: own,
    shares,
    order: { [framework]: ownIds ?? [...order, ...own.map((u) => u.id)] },
  };
}

/** A grade of a framework that follows BC's curriculum: every BC course, with own units added to their subject. */
export function followBcGrade(framework: FrameworkId, bc: Course[], own: Record<string, Unit[]> = {}): Course[] {
  return bc.map((c) => followBcCourse(framework, c, own[c.subject]));
}
