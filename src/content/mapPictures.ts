import type { CompassPoint, MapVisual } from "./mapVisual";
import { POINT_OF } from "./mapVisual";
import type { Course, GenerateOptions, Question, Unit } from "./types";

// Direction questions that are written as plain words ("Which direction is the opposite of north?") get a compass rose
// drawn above them, in every province and state, without each unit's author having to remember to. A picture is only
// added when it can't give the answer away: it shows the four directions (and, for a shadow, the sun where the prompt
// already puts it), never the answer to a question about which direction something is.

const WORD = "(north|south|east|west)";
const OPPOSITE = new RegExp(`\\bopposite (?:direction )?(?:(?:of|to) )?${WORD}\\b`, "i");
const BETWEEN = new RegExp(`\\bbetween ${WORD} and ${WORD}\\b|\\b(?:north|south)(?:east|west) is between\\b`, "i");
const SUN_SHADOW = new RegExp(`\\bsun is in the ${WORD}\\b`, "i");
const INTERMEDIATE = /\b(?:north|south)(?:east|west)\b/i;
const WHICH_WAY = /\bwhich (?:way|direction)\b/i;

/** The picture a direction question gets, or undefined when the question needs none or already has one. */
export function mapPictureFor(q: Pick<Question, "prompt"> & { visual?: unknown }): MapVisual | undefined {
  if (q.visual) return undefined;
  const text = q.prompt;
  const opposite = OPPOSITE.exec(text);
  if (opposite) return { type: "compass", mark: POINT_OF[opposite[1].toLowerCase()] };
  if (BETWEEN.test(text)) return { type: "compass" };
  const sun = SUN_SHADOW.exec(text);
  if (sun && /\bshadow\b/i.test(text)) {
    const at: CompassPoint = POINT_OF[sun[1].toLowerCase()];
    return { type: "compass", center: "🧍", around: [{ at, emoji: "☀️" }] };
  }
  if (INTERMEDIATE.test(text) && WHICH_WAY.test(text)) return { type: "compass" };
  return undefined;
}

const wrapped = new WeakMap<Unit["generate"], Unit["generate"]>();
const originals = new WeakMap<Unit["generate"], Unit["generate"]>();

/** The generator a unit was written with, whether or not its pictures were added yet (two copies of a unit still match). */
export const plainGenerate = (g: Unit["generate"]): Unit["generate"] => originals.get(g) ?? g;

function withPictures(unit: Unit): Unit {
  let generate = wrapped.get(unit.generate);
  if (!generate) {
    const original = unit.generate;
    generate = (opts?: GenerateOptions) =>
      original(opts).map((q) => {
        const visual = mapPictureFor(q);
        return visual ? ({ ...q, visual } as Question) : q;
      });
    wrapped.set(original, generate);
    wrapped.set(generate, generate);
    originals.set(generate, original);
  }
  return generate === unit.generate ? unit : { ...unit, generate };
}

const SUBJECTS = new Set(["social", "science"]);

/** Draws the compass rose on direction questions in social studies and science units. */
export function withMapPictures(courses: Course[]): Course[] {
  return courses.map((c) => (SUBJECTS.has(c.subject) ? { ...c, units: c.units.map(withPictures) } : c));
}
