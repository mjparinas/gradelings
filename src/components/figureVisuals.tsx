import type { ReactNode } from "react";
import type { MoveFigure, PlainFigure, Visual } from "@/content/types";

// Drawings for measuring tools (protractor, thermometer) and for moves of shapes (slide, flip, turn, compass, outlines).
// They live apart from `visuals.tsx`, which only picks the right one in its switch.

const INK = "#253047";
const BLUE = "#4f8ef7";
const BLUE_FILL = "#dbe7ff";
const ORANGE = "#ff9636";
const ORANGE_FILL = "#ffe2c4";

type Point = [number, number];

// ---------- Protractor ----------

const CX = 160;
const CY = 150;

/** A point at `deg` degrees (counter-clockwise from the right-hand end of the baseline) and distance `r` from the centre. */
function onDial(deg: number, r: number): Point {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)];
}

export function Protractor({ from, to, twoScales }: { from: number; to: number; twoScales?: boolean }) {
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  const edge = 132;
  const wedgeStart = onDial(lo, 40);
  const wedgeEnd = onDial(hi, 40);
  const ticks = Array.from({ length: 37 }, (_, i) => i * 5);
  return (
    <svg viewBox="0 0 320 172" className="w-full max-w-sm" role="img" aria-label="a protractor with an angle drawn on it">
      <path d={`M${CX - edge - 8} ${CY} A${edge + 8} ${edge + 8} 0 0 1 ${CX + edge + 8} ${CY} Z`} fill="#eef6ff" stroke="#8fb5e8" strokeWidth="2" />
      <path d={`M${CX - 30} ${CY} A30 30 0 0 1 ${CX + 30} ${CY} Z`} fill="#fff" stroke="#8fb5e8" strokeWidth="1.5" />
      {ticks.map((t) => {
        const big = t % 10 === 0;
        const [x1, y1] = onDial(t, edge);
        const [x2, y2] = onDial(t, edge - (big ? 13 : 7));
        return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={big ? 1.6 : 1} />;
      })}
      {ticks
        .filter((t) => t % 10 === 0)
        .map((t) => {
          // The numbers at either end of the baseline sit a little above it, so the line doesn't cross them.
          const lift = t === 0 || t === 180 ? -7 : 0;
          const [ix, iy] = onDial(t, twoScales ? 86 : 100);
          const [ox, oy] = onDial(t, 104);
          return (
            <g key={t} fontSize="9.5" fill={INK} textAnchor="middle" dominantBaseline="middle">
              <text x={ix} y={iy + lift}>
                {t}
              </text>
              {twoScales && (
                <text x={ox} y={oy + lift} fill="#8a3d00">
                  {180 - t}
                </text>
              )}
            </g>
          );
        })}
      <path d={`M${CX} ${CY} L${wedgeStart[0]} ${wedgeStart[1]} A40 40 0 0 0 ${wedgeEnd[0]} ${wedgeEnd[1]} Z`} fill={ORANGE_FILL} stroke={ORANGE} strokeWidth="2" opacity="0.9" />
      {[from, to].map((deg, i) => {
        const [x, y] = onDial(deg, edge + 10);
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />;
      })}
      <line x1={CX - edge - 8} y1={CY} x2={CX + edge + 8} y2={CY} stroke={INK} strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r="4.5" fill={INK} />
    </svg>
  );
}

// ---------- Thermometer ----------

const TOP = 14;
const BOTTOM = 156;

const signed = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));

export function Thermometers({ values, min, max }: { values: number[]; min: number; max: number }) {
  const span = max - min;
  const step = span <= 60 ? 5 : 10;
  const y = (v: number) => TOP + (1 - (v - min) / span) * (BOTTOM - TOP);
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
  const width = 56 + values.length * 74;
  return (
    <svg viewBox={`0 0 ${width} 214`} className="w-full" style={{ maxWidth: width * 1.15 }} role="img" aria-label={values.length > 1 ? "thermometers" : "a thermometer"}>
      {ticks.map((v) => {
        const labelled = (v / step) % 2 === 0;
        return (
          <g key={v}>
            <line x1={labelled ? 36 : 40} y1={y(v)} x2="48" y2={y(v)} stroke={INK} strokeWidth={v === 0 ? 2 : 1.2} />
            {labelled && (
              <text x="32" y={y(v) + 3.5} fontSize="10" textAnchor="end" fill={INK}>
                {signed(v)}
              </text>
            )}
          </g>
        );
      })}
      {values.map((value, i) => {
        const x = 62 + i * 74;
        return (
          <g key={i}>
            <rect x={x} y={TOP - 4} width="16" height={BOTTOM - TOP + 22} rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle cx={x + 8} cy={BOTTOM + 22} r="14" fill="#e5484d" stroke={INK} strokeWidth="2" />
            <rect x={x + 4.5} y={y(value)} width="7" height={BOTTOM + 20 - y(value)} fill="#e5484d" />
            <text x={x + 8} y="206" fontSize="12" fontWeight="700" textAnchor="middle" fill={INK}>
              {signed(value)} °C
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Slide, flip and turn ----------

// Figures are drawn in cells, y pointing down. "boot" is lopsided, so a flip or a turn always shows.
const FIGURES: Record<MoveFigure, Point[]> = {
  boot: [[0, 0], [1, 0], [1, 2], [2, 2], [2, 3], [0, 3]],
  triangle: [[0, 0], [3, 3], [0, 3]],
  square: [[0, 0], [2, 0], [2, 2], [0, 2]],
  hexagon: [[1, 0], [3, 0], [4, 1.5], [3, 3], [1, 3], [0, 1.5]],
};

const centroid = (pts: Point[]): Point => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];

const turnBy = (p: Point, deg: number): Point => {
  const a = (deg * Math.PI) / 180;
  return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
};

/** The corners of the figure before and after the move, in cells, plus the guide to draw (arrow, mirror line or pivot). */
export function movePoints(v: Extract<Visual, { type: "move" }>) {
  const base = FIGURES[v.figure ?? "boot"];
  const width = Math.max(...base.map((p) => p[0]));
  const height = Math.max(...base.map((p) => p[1]));
  if (v.move === "turn") {
    // The figure sits a little away from the point it turns around, so the turn is easy to see.
    const before = base.map((p): Point => [p[0] + 1.5, p[1] + 0.5]);
    const after = before.map((p) => turnBy(p, v.degrees ?? 90));
    return { before, after, pivot: [0, 0] as Point };
  }
  if (v.move === "flip") {
    if (v.axis === "horizontal") {
      const line = height + 1;
      return { before: base, after: base.map((p): Point => [p[0], 2 * line - p[1]]), mirror: { horizontal: true, at: line } };
    }
    const line = width + 1;
    return { before: base, after: base.map((p): Point => [2 * line - p[0], p[1]]), mirror: { horizontal: false, at: line } };
  }
  const dx = v.dx ?? (v.dy ? 0 : width + 2);
  const dy = v.dy ?? 0;
  return { before: base, after: base.map((p): Point => [p[0] + dx, p[1] + dy]), slide: { dx, dy } };
}

const arrowHead = (tip: Point, angle: number, s = 7): string => {
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  return `${tip[0]},${tip[1]} ${tip[0] + s * Math.cos(a1)},${tip[1] + s * Math.sin(a1)} ${tip[0] + s * Math.cos(a2)},${tip[1] + s * Math.sin(a2)}`;
};

export function MoveDrawing({ visual }: { visual: Extract<Visual, { type: "move" }> }) {
  const g = movePoints(visual);
  const all: Point[] = [...g.before, ...g.after, ...(g.pivot ? [g.pivot] : [])];
  const mirror = g.mirror;
  if (mirror) all.push(mirror.horizontal ? [0, mirror.at] : [mirror.at, 0]);
  const minX = Math.min(...all.map((p) => p[0])) - 0.6;
  const maxX = Math.max(...all.map((p) => p[0])) + 0.6;
  const minY = Math.min(...all.map((p) => p[1])) - 0.6;
  const maxY = Math.max(...all.map((p) => p[1])) + 0.6;
  const cell = Math.min(40, 300 / (maxX - minX), 170 / (maxY - minY));
  const W = (maxX - minX) * cell;
  const H = (maxY - minY) * cell;
  const px = (p: Point): Point => [(p[0] - minX) * cell, (p[1] - minY) * cell];
  const path = (pts: Point[]) => pts.map((p) => px(p).map((n) => n.toFixed(1)).join(",")).join(" ");
  const label = visual.move === "slide" ? "a shape before and after a slide" : visual.move === "flip" ? "a shape before and after a flip" : "a shape before and after a turn";

  let guide: ReactNode = null;
  const c0 = centroid(g.before);
  const c1 = centroid(g.after);
  if (g.slide) {
    // An arrow from the edge of the first shape to the edge of the second: right then down when it moves both ways.
    const edge = 0.3;
    const right = Math.max(...g.before.map((p) => p[0])) + edge;
    const bent = g.slide.dx !== 0 && g.slide.dy !== 0;
    const route: Point[] = bent
      ? [[right, c0[1]], [c1[0], c0[1]], [c1[0], Math.min(...g.after.map((p) => p[1])) - edge]]
      : [[right, c0[1]], [Math.min(...g.after.map((p) => p[0])) - edge, c1[1]]];
    const last = px(route[route.length - 1]);
    const prev = px(route[route.length - 2]);
    guide = (
      <g>
        <polyline points={path(route)} fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polygon points={arrowHead(last, Math.atan2(last[1] - prev[1], last[0] - prev[0]), 9)} fill={INK} />
      </g>
    );
  } else if (mirror) {
    const [ax, ay] = px(mirror.horizontal ? [minX, mirror.at] : [mirror.at, minY]);
    const [bx, by] = px(mirror.horizontal ? [maxX, mirror.at] : [mirror.at, maxY]);
    guide = <line x1={ax} y1={ay} x2={bx} y2={by} stroke={INK} strokeWidth="2.5" strokeDasharray="7 6" />;
  } else if (g.pivot) {
    const [pxx, pyy] = px(g.pivot);
    const [sx, sy] = px(c0);
    const r = Math.hypot(sx - pxx, sy - pyy);
    const a0 = Math.atan2(sy - pyy, sx - pxx);
    const turn = visual.degrees ?? 90;
    const full = turn % 360 === 0;
    const sweep = (turn * Math.PI) / 180;
    // The arc follows the turn clockwise, a little way off the figure's middle so it stays clear of it.
    const end = (full ? Math.PI * 1.9 : sweep) + a0;
    const arcEnd: Point = [pxx + r * Math.cos(end), pyy + r * Math.sin(end)];
    const large = (full ? Math.PI * 1.9 : sweep) > Math.PI ? 1 : 0;
    guide = (
      <g>
        <path d={`M${sx} ${sy} A${r} ${r} 0 ${large} 1 ${arcEnd[0]} ${arcEnd[1]}`} fill="none" stroke={INK} strokeWidth="2.2" strokeDasharray="2 5" strokeLinecap="round" />
        <polygon points={arrowHead(arcEnd, end + Math.PI / 2)} fill={INK} />
        <circle cx={pxx} cy={pyy} r="5.5" fill={INK} />
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: W, maxWidth: "100%" }} role="img" aria-label={label}>
      <polygon points={path(g.before)} fill={BLUE_FILL} stroke={BLUE} strokeWidth="2.5" strokeDasharray="6 4" strokeLinejoin="round" />
      <polygon points={path(g.after)} fill={ORANGE_FILL} stroke={ORANGE} strokeWidth="3" strokeLinejoin="round" />
      {guide}
    </svg>
  );
}

// ---------- Compass ----------

const FACING: Record<"north" | "east" | "south" | "west", number> = { north: -90, east: 0, south: 90, west: 180 };

export function Compass({ facing }: { facing: "north" | "east" | "south" | "west" }) {
  const a = (FACING[facing] * Math.PI) / 180;
  const tip: Point = [80 + 46 * Math.cos(a), 80 + 46 * Math.sin(a)];
  const tail: Point = [80 - 20 * Math.cos(a), 80 - 20 * Math.sin(a)];
  return (
    <svg viewBox="0 0 160 160" className="w-44" role="img" aria-label={`a compass with someone facing ${facing}`}>
      <circle cx="80" cy="80" r="64" fill="#fff" stroke="#c9d3e6" strokeWidth="3" />
      {(
        [
          ["N", 80, 22],
          ["E", 138, 85],
          ["S", 80, 148],
          ["W", 22, 85],
        ] as const
      ).map(([t, x, y]) => (
        <text key={t} x={x} y={y} fontSize="18" fontWeight="700" textAnchor="middle" fill={INK}>
          {t}
        </text>
      ))}
      <line x1={tail[0]} y1={tail[1]} x2={tip[0]} y2={tip[1]} stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />
      <polygon points={arrowHead(tip, a, 16)} fill={ORANGE} stroke={ORANGE} strokeWidth="6" strokeLinejoin="round" />
      <circle cx="80" cy="80" r="8" fill={INK} />
    </svg>
  );
}

// ---------- Plain outlines for symmetry questions ----------

const OUTLINES: Record<PlainFigure, ReactNode> = {
  equilateral: <polygon points="80,18 140,122 20,122" />,
  isosceles: <polygon points="80,10 112,126 48,126" />,
  scalene: <polygon points="22,122 132,122 50,30" />,
  square: <rect x="28" y="28" width="96" height="96" />,
  rectangle: <rect x="14" y="42" width="132" height="76" />,
  rhombus: <polygon points="80,12 138,76 80,140 22,76" />,
  parallelogram: <polygon points="44,38 148,38 116,120 12,120" />,
  circle: <circle cx="80" cy="76" r="58" />,
  oval: <ellipse cx="80" cy="76" rx="68" ry="40" />,
  plus: <polygon points="60,12 100,12 100,52 140,52 140,92 100,92 100,132 60,132 60,92 20,92 20,52 60,52" />,
};

const NAMES: Record<PlainFigure, string> = {
  equilateral: "a triangle with three equal sides",
  isosceles: "a triangle with two equal sides",
  scalene: "a triangle with three different sides",
  square: "a square",
  rectangle: "a rectangle",
  rhombus: "a rhombus",
  parallelogram: "a leaning parallelogram",
  circle: "a circle",
  oval: "an oval",
  plus: "a plus sign",
};

export function PlainFigureDrawing({ figure }: { figure: PlainFigure }) {
  return (
    <svg viewBox="0 0 160 150" className="w-44" role="img" aria-label={NAMES[figure]}>
      <g fill={ORANGE_FILL} stroke={ORANGE} strokeWidth="4" strokeLinejoin="round">
        {OUTLINES[figure]}
      </g>
    </svg>
  );
}
