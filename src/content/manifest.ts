import type { FrameworkGuides } from "./guides";
import type { Framework } from "./frameworks";
import type { GradeLessons } from "./lessons";
import { GRADE_ORDER } from "./subjects";
import type { Course, GradeId } from "./types";

// A framework's manifest: everything the rest of the app needs to know about one province or state, kept in that
// framework's own folder (`<folder>/manifest.ts`). The registry (./registry) lists the manifests; FrameworkId, the
// framework list, the apps' grade loaders, the full content set (./all), and the guide pages are all read from
// it, so adding a framework is its folder plus one line in the registry.

/** One grade's content download: its courses, and (for the shared BC grades) the grade's lessons. */
export interface GradeModule {
  courses: Course[];
  lessons?: GradeLessons;
}

/** Each grade's download, as a dynamic import so the apps only fetch the grades a child needs. */
export type GradeLoaders = Record<GradeId, () => Promise<GradeModule>>;

export interface FrameworkManifest {
  /** The framework's id ("ca-on"). The registry derives FrameworkId from these. */
  id: string;
  framework: Framework;
  grades: GradeLoaders;
  /** Parent guide copy for the public guide pages. Loaded on the server only; the apps never call it. */
  guides: () => Promise<FrameworkGuides>;
  /**
   * The grades this framework offers each French subject in, from its French as a second language programs.
   * Empty when the subject isn't built. The content tests check the courses match.
   */
  french: { immersion: GradeId[]; "core-french": GradeId[] };
  /** Other frameworks whose grade files this one's units come from, downloaded with it. */
  depends?: readonly string[];
  /** Being built: it has content and tests but no public pages or place in the pickers yet (see UPCOMING_FRAMEWORKS). */
  upcoming?: boolean;
}

/** Declares a manifest, keeping its id as a literal type so the registry can derive FrameworkId. */
export function defineFramework<const Id extends string>(manifest: FrameworkManifest & { id: Id }): FrameworkManifest & { id: Id } {
  return manifest;
}

/** Grades from one to another, inclusive: gradeRange("4", "9"). */
export function gradeRange(from: GradeId, to: GradeId): GradeId[] {
  return GRADE_ORDER.slice(GRADE_ORDER.indexOf(from), GRADE_ORDER.indexOf(to) + 1);
}
