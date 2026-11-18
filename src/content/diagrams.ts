import type { DiagramVisual, AnglePos } from "./diagramTypes";
import type { Course, GenerateOptions, Question, Unit, Visual } from "./types";

// Geometry questions about a figure used to give the figure only in words ("Two lines cross. One angle is 80°..."). This
// reads the question's own wording and numbers and draws what it describes, so a child sees the picture a textbook
// would show. It runs on every framework's units (mergeCourses), so one change reaches every province and state. A
// question that already has a picture, or that no pattern here recognises exactly, is left as it was.
//
// Patterns are anchored on whole sentences of the question templates. A figure is only added when every number it
// shows can be read from the prompt, so a picture never disagrees with the words. Nothing here gives the answer away:
// the thing to find is labelled "?".

const NUM = String.raw`(\d+(?:\.\d+)?)`;
const DEG = String.raw`${NUM}\s?°`;
const UNIT = String.raw`(cm|mm|km|m|in|ft|yd|inches|feet|metres|meters)`;

/** Normalises minus signs and spacing so the patterns can be plain. */
const clean = (s: string) => s.replace(/[−–]/g, "-").replace(/\s+/g, " ").trim();

const n = (s: string) => Number(s);
const withUnit = (value: string, u?: string) => (u ? `${value} ${u}` : value);

// ---------- Lines that cross, and lines cut by a transversal ----------

type Relation = "adjacent" | "vertical" | "corresponding" | "alternate interior" | "alternate exterior" | "co-interior";

function relationOf(text: string): Relation | null {
  const t = text.toLowerCase();
  if (/co-?interior|same[- ]side interior|consecutive interior/.test(t)) return "co-interior";
  if (/alternate interior/.test(t)) return "alternate interior";
  if (/alternate exterior/.test(t)) return "alternate exterior";
  if (/corresponding/.test(t)) return "corresponding";
  if (/vertical|opposite|across from/.test(t)) return "vertical";
  if (/next to|adjacent|same line|linear pair|straight line/.test(t)) return "adjacent";
  return null;
}

/** Where the given angle sits and where the asked one sits, for each relation (the angle at `given` measures `degrees`). */
const PLACES: Record<Relation, { given: AnglePos; ask: AnglePos }> = {
  vertical: { given: "top-above-right", ask: "top-below-left" },
  adjacent: { given: "top-above-right", ask: "top-above-left" },
  corresponding: { given: "top-above-right", ask: "bottom-above-right" },
  "alternate interior": { given: "top-below-right", ask: "bottom-above-left" },
  "alternate exterior": { given: "top-above-right", ask: "bottom-below-left" },
  "co-interior": { given: "top-below-right", ask: "bottom-above-right" },
};

function linesDiagram(p: string): DiagramVisual | undefined {
  let m = p.match(new RegExp(String.raw`^Two lines cross\. One angle (?:is|measures) ${DEG}\.\s*(.*)$`));
  if (m) {
    const rel = relationOf(m[2]);
    if (!rel || (rel !== "vertical" && rel !== "adjacent")) return undefined;
    const d = n(m[1]);
    if (d <= 0 || d >= 180) return undefined;
    const { given, ask } = PLACES[rel];
    return { type: "lineAngles", layout: "cross", at: given, degrees: d, marks: [{ pos: given, label: `${m[1]}°` }, { pos: ask, label: "?" }] };
  }
  m = p.match(new RegExp(String.raw`^A transversal crosses two parallel lines\. One angle (?:is|measures) ${DEG}\.\s*(.*)$`));
  if (m) {
    const rel = relationOf(m[2]);
    if (!rel) return undefined;
    const d = n(m[1]);
    if (d <= 0 || d >= 180) return undefined;
    const { given, ask } = rel === "vertical" || rel === "adjacent" ? { given: "top-above-right" as AnglePos, ask: rel === "vertical" ? ("top-below-left" as AnglePos) : ("top-above-left" as AnglePos) } : PLACES[rel];
    return { type: "lineAngles", layout: "parallel", at: given, degrees: d, marks: [{ pos: given, label: `${m[1]}°` }, { pos: ask, label: "?" }] };
  }
  return undefined;
}

// ---------- Angles that add up ----------

function splitDiagram(p: string): DiagramVisual | undefined {
  let m = p.match(new RegExp(String.raw`^Three angles sit side by side on a straight line\. Two of them are ${DEG} and ${DEG}\. What is the third\?$`));
  if (m) {
    const a = n(m[1]);
    const b = n(m[2]);
    if (a + b >= 180) return undefined;
    return { type: "angleSplit", whole: "straight", parts: [{ label: `${m[1]}°`, degrees: a }, { label: `${m[2]}°`, degrees: b }, { label: "?", degrees: 180 - a - b }] };
  }
  m = p.match(new RegExp(String.raw`^Two angles (?:form a straight line|are supplementary|are complementary)\. One (?:is|angle is) ${DEG}\. What is the other(?: angle)?\?$`));
  if (m) {
    const total = /complementary/.test(p) ? 90 : 180;
    const a = n(m[1]);
    if (a >= total) return undefined;
    return { type: "angleSplit", whole: total === 90 ? "right" : "straight", parts: [{ label: `${m[1]}°`, degrees: a }, { label: "?", degrees: total - a }] };
  }
  m = p.match(/^Two angles are (supplementary|complementary)\. One is x and the other is (\d+)x\. What is x\?$/);
  if (m) {
    const total = m[1] === "complementary" ? 90 : 180;
    const k = n(m[2]);
    return { type: "angleSplit", whole: total === 90 ? "right" : "straight", parts: [{ label: "x", degrees: total / (1 + k) }, { label: `${k}x`, degrees: (total * k) / (1 + k) }] };
  }
  m = p.match(new RegExp(String.raw`^An angle is split into two parts: ${DEG} and ${DEG}\. How big is the whole angle\?$`));
  if (m) {
    const a = n(m[1]);
    const b = n(m[2]);
    if (a + b >= 180) return undefined;
    return { type: "angleSplit", whole: "angle", parts: [{ label: `${m[1]}°`, degrees: a }, { label: `${m[2]}°`, degrees: b }], totalLabel: "?" };
  }
  m = p.match(new RegExp(String.raw`^An angle is split into two parts that don't overlap\. One part is ${DEG} and the other is ${DEG}\. What does the whole angle measure\?$`));
  if (m) {
    const a = n(m[1]);
    const b = n(m[2]);
    if (a + b >= 180) return undefined;
    return { type: "angleSplit", whole: "angle", parts: [{ label: `${m[1]}°`, degrees: a }, { label: `${m[2]}°`, degrees: b }], totalLabel: "?" };
  }
  m = p.match(new RegExp(String.raw`^Three angles sit side by side with no gaps or overlaps: ${DEG}, ${DEG} and ${DEG}\. What angle do they make together\?$`));
  if (m) {
    const parts = [m[1], m[2], m[3]];
    if (parts.reduce((t, x) => t + n(x), 0) >= 180) return undefined;
    return { type: "angleSplit", whole: "angle", parts: parts.map((x) => ({ label: `${x}°`, degrees: n(x) })), totalLabel: "?" };
  }
  return undefined;
}

// ---------- Triangles ----------

/** Angles of a triangle from its three sides (law of cosines), or undefined when no triangle has them. */
export function anglesFromSides(a: number, b: number, c: number): [number, number, number] | undefined {
  if (a + b <= c || a + c <= b || b + c <= a) return undefined;
  const deg = (x: number) => (Math.acos(Math.max(-1, Math.min(1, x))) * 180) / Math.PI;
  const A = deg((b * b + c * c - a * a) / (2 * b * c));
  const B = deg((a * a + c * c - b * b) / (2 * a * c));
  return [A, B, 180 - A - B];
}

function rightTriangle(legA: number, legB: number, sides: [string, string, string]): DiagramVisual {
  // Corner A (bottom-left) is the right angle: side AB is the bottom leg, AC the left leg, BC the hypotenuse.
  const atB = (Math.atan2(legB, legA) * 180) / Math.PI; // AB = legA is next to B, AC = legB is across from B
  return { type: "triangleFigure", angles: [90, atB, 90 - atB], sideLabels: sides };
}

function triangleDiagram(p: string): DiagramVisual | undefined {
  let m = p.match(new RegExp(String.raw`^In a right triangle, one acute angle is ${DEG}\. What is the other acute angle\?$`));
  if (m) {
    const a = n(m[1]);
    if (a <= 0 || a >= 90) return undefined;
    return { type: "triangleFigure", angles: [90, a, 90 - a], angleLabels: ["", `${m[1]}°`, "?"] };
  }
  m = p.match(new RegExp(String.raw`^An isosceles triangle has (?:a top angle|an apex angle) of ${DEG}\. What is each base angle\?$|^An isosceles triangle has (?:a top angle|an apex angle) of ${DEG}\. How big is each of the two equal base angles\?$`));
  if (m) {
    const top = n(m[1] ?? m[2]);
    if (top <= 0 || top >= 180) return undefined;
    const base = (180 - top) / 2;
    return { type: "triangleFigure", angles: [base, base, top], angleLabels: ["?", "?", `${m[1] ?? m[2]}°`], ticks: [0, 1] };
  }
  m = p.match(new RegExp(String.raw`^In a triangle, two interior angles are ${DEG} and ${DEG}\. What is the third interior angle\?$`));
  if (m) {
    const a = n(m[1]);
    const b = n(m[2]);
    if (a + b >= 180) return undefined;
    return { type: "triangleFigure", angles: [a, b, 180 - a - b], angleLabels: [`${m[1]}°`, `${m[2]}°`, "?"] };
  }
  m = p.match(new RegExp(String.raw`^Two angles of a triangle are ${DEG} and ${DEG}\. What is the third angle\?$`));
  if (m) {
    const a = n(m[1]);
    const b = n(m[2]);
    if (a + b >= 180) return undefined;
    return { type: "triangleFigure", angles: [a, b, 180 - a - b], angleLabels: [`${m[1]}°`, `${m[2]}°`, "?"] };
  }
  m = p.match(new RegExp(String.raw`^The legs of a right triangle are ${NUM} ?${UNIT}? and ${NUM} ?${UNIT}?\. What is the hypotenuse`));
  if (m) {
    const u = m[2] ?? m[4];
    return rightTriangle(n(m[1]), n(m[3]), ["?", withUnit(m[3], u), withUnit(m[1], u)]);
  }
  m = p.match(new RegExp(String.raw`^A rectangular field is ${NUM} ?${UNIT} by ${NUM} ?${UNIT}\. How long is the diagonal`));
  if (m) {
    const u = m[2];
    return rightTriangle(n(m[1]), n(m[3]), ["?", withUnit(m[3], u), withUnit(m[1], u)]);
  }
  m = p.match(new RegExp(String.raw`^A triangle has a base of ${NUM} ?${UNIT} and a height of ${NUM} ?${UNIT}\. What is its area`));
  if (m) {
    const base = n(m[1]);
    const h = n(m[3]);
    // Drawn as a friendly triangle with the base and the height labelled; the label names the numbers.
    if (base <= 0 || h <= 0) return undefined;
    return { type: "triangleFigure", angles: [70, 60, 50], sideLabels: ["", "", withUnit(m[1], m[2])], height: withUnit(m[3], m[4]) };
  }
  m = p.match(new RegExp(String.raw`^The end of a roof is an isosceles triangle with a base of ${NUM} ?${UNIT} and two equal sloping sides of ${NUM} ?${UNIT}\. How tall is it`));
  if (m) {
    const base = n(m[1]);
    const side = n(m[3]);
    if (side * 2 <= base) return undefined;
    const apex = (2 * Math.asin(base / 2 / side) * 180) / Math.PI;
    const baseAngle = (180 - apex) / 2;
    return { type: "triangleFigure", angles: [baseAngle, baseAngle, apex], sideLabels: [withUnit(m[3], m[4]), withUnit(m[3], m[4]), withUnit(m[1], m[2])], ticks: [0, 1], height: "?" };
  }
  return undefined;
}

// ---------- Similar figures ----------

function similarDiagram(p: string): DiagramVisual | undefined {
  let m = p.match(new RegExp(String.raw`^Triangle B is an enlargement of triangle A\. A side of ${NUM} ?${UNIT} on triangle A matches a side of ${NUM} ?${UNIT} on triangle B\. What is the scale factor\?$`));
  if (m) {
    const ratio = n(m[3]) / n(m[1]);
    if (!(ratio > 1)) return undefined;
    return { type: "figurePair", shape: "triangle", a: [withUnit(m[1], m[2]), "", ""], b: [withUnit(m[3], m[4]), "", ""], ratio, caption: "A (small) and B (big)" };
  }
  m = p.match(new RegExp(String.raw`^Triangle B is similar to triangle A, made by a rotation and a dilation by a scale factor of ${NUM}\. A side of A is ${NUM} ?${UNIT}\. How long is the matching side of B\?$`));
  if (m) {
    const k = n(m[1]);
    if (!(k > 1)) return undefined;
    return { type: "figurePair", shape: "triangle", a: [withUnit(m[2], m[3]), "", ""], b: ["?", "", ""], ratio: k, caption: `scale factor ${m[1]}` };
  }
  m = p.match(new RegExp(String.raw`^Two similar triangles have a scale factor of ${NUM}\. A side of ${NUM} ?${UNIT}? in the small one matches what side in the big one\?$`));
  if (m) {
    const k = n(m[1]);
    if (!(k > 1)) return undefined;
    return { type: "figurePair", shape: "triangle", a: [withUnit(m[2], m[3]), "", ""], b: ["?", "", ""], ratio: k, caption: `scale factor ${m[1]}` };
  }
  m = p.match(new RegExp(String.raw`^Two similar triangles: sides ${NUM} and ${NUM} match\. Another side in the small triangle is ${NUM}\. What is the matching side\?$`));
  if (m) {
    const ratio = n(m[2]) / n(m[1]);
    if (!(ratio > 1)) return undefined;
    return { type: "figurePair", shape: "triangle", a: [m[1], m[3], ""], b: [m[2], "?", ""], ratio };
  }
  m = p.match(new RegExp(String.raw`^Two rectangles are similar\. The small one is ${NUM} ?${UNIT} by ${NUM} ?${UNIT}\. The large one is ${NUM} ?${UNIT} long\. How wide is the large rectangle\?$`));
  if (m) {
    const ratio = n(m[5]) / n(m[1]);
    if (!(ratio > 1)) return undefined;
    return { type: "figurePair", shape: "rectangle", a: [withUnit(m[1], m[2]), withUnit(m[3], m[4])], b: [withUnit(m[5], m[6]), "?"], ratio };
  }
  return undefined;
}

// ---------- Regular polygons ----------

const POLYGONS: Record<string, number> = { triangle: 3, quadrilateral: 4, pentagon: 5, hexagon: 6, heptagon: 7, octagon: 8, nonagon: 9, decagon: 10, undecagon: 11, dodecagon: 12 };

function polygonDiagram(p: string): DiagramVisual | undefined {
  let m = p.match(/^What is the measure of each (interior|exterior) angle of a regular polygon with (\d+) sides\?$/);
  if (m) {
    const sides = n(m[2]);
    if (sides < 3 || sides > 12) return undefined;
    return { type: "polygon", sides, label: "?" };
  }
  m = p.match(/^What is the measure of each interior angle of a regular (\w+)\?$/);
  if (m && POLYGONS[m[1]]) return { type: "polygon", sides: POLYGONS[m[1]], label: "?" };
  m = p.match(/^What is the sum of the interior angles of an? (\w+)\?$/);
  if (m && POLYGONS[m[1]]) return { type: "polygon", sides: POLYGONS[m[1]] };
  m = p.match(/^What is the sum of the interior angles of a polygon with (\d+) sides\?$/);
  if (m && n(m[1]) >= 3 && n(m[1]) <= 12) return { type: "polygon", sides: n(m[1]) };
  return undefined;
}

// ---------- Points on the coordinate plane ----------

function gridFor(points: { x: number; y: number; label?: string }[]): Visual {
  const reach = Math.max(...points.flatMap((q) => [Math.abs(q.x), Math.abs(q.y)]));
  const size = Math.max(5, Math.ceil(reach) + 1);
  return { type: "grid", size, min: -size, points };
}

function gridDiagram(p: string): Visual | undefined {
  let m = p.match(/^Reflect \((-?\d+), (-?\d+)\) across the (x|y)-axis\. Where is the image\?$/);
  if (m) {
    const x = n(m[1]);
    const y = n(m[2]);
    if (Math.max(Math.abs(x), Math.abs(y)) > 11) return undefined;
    return gridFor([{ x, y, label: `(${x}, ${y})` }]);
  }
  m = p.match(/^To find the distance from \((-?\d+), (-?\d+)\) to \((-?\d+), (-?\d+)\), you draw a right triangle\./);
  if (m) {
    const pts = [
      { x: n(m[1]), y: n(m[2]), label: `(${m[1]}, ${m[2]})` },
      { x: n(m[3]), y: n(m[4]), label: `(${m[3]}, ${m[4]})` },
    ];
    if (Math.max(...pts.flatMap((q) => [Math.abs(q.x), Math.abs(q.y)])) > 11) return undefined;
    return gridFor(pts);
  }
  return undefined;
}

const MAKERS: ((p: string) => Visual | undefined)[] = [linesDiagram, splitDiagram, triangleDiagram, similarDiagram, polygonDiagram, gridDiagram];

/** The picture a geometry question's wording describes, or undefined when it has no figure to draw. */
export function diagramFor(prompt: string): Visual | undefined {
  const p = clean(prompt);
  for (const make of MAKERS) {
    const v = make(p);
    if (v) return v;
  }
  return undefined;
}

const drawn = new WeakSet<Unit["generate"]>();

/** Adds a drawing to every question of a Grade 3 to 9 math unit that describes a figure and has no picture yet. */
export function withDiagrams(courses: Course[]): Course[] {
  return courses.map((c) => {
    if (c.subject !== "math" || !["3", "4", "5", "6", "7", "8", "9"].includes(c.grade)) return c;
    return {
      ...c,
      units: c.units.map((u) => {
        if (drawn.has(u.generate)) return u;
        const generate = (opts?: GenerateOptions): Question[] =>
          u.generate(opts).map((q) => {
            if (q.visual) return q;
            const visual = diagramFor(q.prompt);
            return visual ? { ...q, visual } : q;
          });
        drawn.add(generate);
        return { ...u, generate };
      }),
    };
  });
}
