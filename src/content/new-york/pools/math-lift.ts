import type { GradeLessons } from "../../lessons";
import type { Unit } from "../../types";

/**
 * A math unit New York teaches in another grade than its home framework does (New York moved the topic), with the lesson
 * its home grade gives it. Lessons attach by grade, so a unit borrowed from another grade brings its own.
 */
export function lifted(units: readonly Unit[], lessons: GradeLessons, id: string): Unit {
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`New York: no unit "${id}" to lift`);
  const lesson = lessons[`math/${id}`];
  return lesson && !unit.lesson ? { ...unit, lesson } : unit;
}
