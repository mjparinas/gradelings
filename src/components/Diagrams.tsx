import type { ReactNode } from "react";
import type { AnglePos, DiagramVisual } from "@/content/diagramTypes";

// Drawings for geometry questions (see src/content/diagramTypes.ts). Everything is labelled with text, so none of
// them has to be to scale. Colours match the rest of the question pictures: ink for lines, a warm tint for the angle
// the question gives and a cool one for the angle it asks about.

const INK = "#253047";
const GIVEN = "#ffe2c4";
const ASKED = "#d6e6fd";
const FILL = "#eef1f8";
const text = { fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: 15, fill: INK, stroke: "#fff", strokeWidth: 4, paintOrder: "stroke" } as const;
const line = { stroke: INK, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
const unit = (a: Pt, b: Pt): Pt => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const n = Math.hypot(dx, dy) || 1;
  return { x: dx / n, y: dy / n };
};
const f = (n: number) => Math.round(n * 10) / 10;

/** A pie slice at `c` between two directions (unit vectors, screen coordinates). */
function slice(c: Pt, u1: Pt, u2: Pt, r: number) {
  const cross = u1.x * u2.y - u1.y * u2.x;
  return `M${f(c.x)} ${f(c.y)} L${f(c.x + r * u1.x)} ${f(c.y + r * u1.y)} A${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${f(c.x + r * u2.x)} ${f(c.y + r * u2.y)} Z`;
}

function bisector(u1: Pt, u2: Pt): Pt {
  const x = u1.x + u2.x;
  const y = u1.y + u2.y;
  const n = Math.hypot(x, y) || 1;
  return { x: x / n, y: y / n };
}

// ---------- Lines that cross ----------

const POS_ORDER: AnglePos[] = ["top-above-left", "top-above-right", "top-below-left", "top-below-right", "bottom-above-left", "bottom-above-right", "bottom-below-left", "bottom-below-right"];

export function LineAngles({ layout, at, degrees, marks }: Extract<DiagramVisual, { type: "lineAngles" }>) {
  // The drawn slant is kept friendly; the labels carry the numbers.
  const [v, h] = at.split("-").slice(1) as ["above" | "below", "left" | "right"];
  const raw = (v === "above") === (h === "right") ? degrees : 180 - degrees;
  const theta = Math.min(140, Math.max(40, raw));
  const dir = { x: Math.cos(rad(theta)), y: -Math.sin(rad(theta)) }; // the transversal's upward direction on screen
  const parallel = layout === "parallel";
  const W = 300;
  const H = parallel ? 200 : 190;
  const topY = parallel ? 62 : 95;
  const gap = 78;
  // Going down the transversal by `gap` moves it sideways by gap / tan(theta) to the left.
  const drop = gap / Math.tan(rad(theta));
  const T: Pt = parallel ? { x: W / 2 + drop / 2, y: topY } : { x: W / 2, y: topY };
  const B: Pt = { x: T.x - drop, y: topY + gap };
  const rays = (c: Pt, p: AnglePos) => {
    const [, vv, hh] = p.split("-") as [string, "above" | "below", "left" | "right"];
    const horizontal = { x: hh === "right" ? 1 : -1, y: 0 };
    const slant = vv === "above" ? dir : { x: -dir.x, y: -dir.y };
    return [horizontal, slant, c] as const;
  };
  const centre = (p: AnglePos) => (p.startsWith("top") ? T : B);
  const label = (m: { pos: AnglePos; label: string }, i: number) => {
    const [u1, u2, c] = rays(centre(m.pos), m.pos);
    const mid = bisector(u1, u2);
    const asked = m.label === "?" || /\?/.test(m.label) || i > 0;
    return (
      <g key={`${m.pos}-${i}`}>
        <path d={slice(c, u1, u2, 24)} fill={asked ? ASKED : GIVEN} stroke={asked ? "#2a78d6" : "#ff9636"} strokeWidth="2" />
        <text x={f(c.x + 46 * mid.x)} y={f(c.y + 46 * mid.y + 5)} textAnchor="middle" {...text}>
          {m.label}
        </text>
      </g>
    );
  };
  const ext = 130;
  void ext;
  const sorted = [...marks].sort((a, b) => POS_ORDER.indexOf(a.pos) - POS_ORDER.indexOf(b.pos));
  const aria = parallel
    ? `two parallel lines crossed by a third line. ${marks.map((m) => `${m.pos.replaceAll("-", " ")} angle: ${m.label}`).join("; ")}`
    : `two lines that cross. ${marks.map((m) => `${m.pos.replaceAll("-", " ")} angle: ${m.label}`).join("; ")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm" role="img" aria-label={aria}>
      {sorted.map(label)}
      {parallel ? (
        <>
          <line x1="20" y1={T.y} x2={W - 20} y2={T.y} {...line} />
          <line x1="20" y1={B.y} x2={W - 20} y2={B.y} {...line} />
          <line x1={f(T.x + dir.x * 48)} y1={f(T.y + dir.y * 48)} x2={f(B.x - dir.x * 48)} y2={f(B.y - dir.y * 48)} {...line} />
          {/* little arrowheads show the lines are parallel */}
          {[T.y, B.y].map((y) => (
            <path key={y} d={`M${W - 52} ${y - 5} L${W - 42} ${y} L${W - 52} ${y + 5}`} fill="none" {...line} strokeWidth={2} />
          ))}
        </>
      ) : (
        <>
          <line x1="30" y1={T.y} x2={W - 30} y2={T.y} {...line} />
          <line x1={f(T.x + dir.x * ext * 0.7)} y1={f(T.y + dir.y * ext * 0.7)} x2={f(T.x - dir.x * ext * 0.7)} y2={f(T.y - dir.y * ext * 0.7)} {...line} />
        </>
      )}
    </svg>
  );
}

// ---------- Angles that fill a line, a corner or a bigger angle ----------

const SPLIT_FILLS = [GIVEN, ASKED, "#d3f2e4"];

export function AngleSplit({ whole, parts, totalLabel }: Extract<DiagramVisual, { type: "angleSplit" }>) {
  const W = 260;
  const H = 150;
  const o: Pt = { x: W / 2, y: 126 };
  const R = 100;
  const total = parts.reduce((t, p) => t + p.degrees, 0);
  const start = whole === "angle" ? 90 - total / 2 : 0;
  const at = (deg: number): Pt => ({ x: Math.cos(rad(deg)), y: -Math.sin(rad(deg)) });
  // Each part starts where the one before it ended.
  const starts = parts.map((_, i) => start + parts.slice(0, i).reduce((t, p) => t + p.degrees, 0));
  const rayAngles = [start, ...parts.map((p, i) => starts[i] + p.degrees)];
  const baseRays = whole === "straight" ? [0, 180] : whole === "right" ? [0, 90] : [];
  const fanned = new Set(rayAngles.map((a) => Math.round(a)));
  const body: ReactNode[] = [];
  parts.forEach((p, i) => {
    const a1 = starts[i];
    const a2 = a1 + p.degrees;
    const mid = at((a1 + a2) / 2);
    const rr = p.degrees < 32 ? 80 : 40;
    body.push(
      <g key={i}>
        <path d={slice(o, at(a1), at(a2), 62)} fill={SPLIT_FILLS[i % SPLIT_FILLS.length]} stroke="none" />
        <text x={f(o.x + rr * mid.x)} y={f(o.y + rr * mid.y + 5)} textAnchor="middle" {...text} fontSize={p.degrees < 30 ? 13 : 15}>
          {p.label}
        </text>
      </g>,
    );
  });
  const midAll = at(start + total / 2);
  const aria = `${whole === "straight" ? "angles that fill a straight line" : whole === "right" ? "angles that fill a square corner" : "one angle split in parts"}: ${parts.map((p) => p.label).join(", ")}${totalLabel ? `; the whole angle: ${totalLabel}` : ""}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs" role="img" aria-label={aria}>
      {body}
      {baseRays.map((a) => {
        const u = at(a);
        return <line key={`b${a}`} x1={o.x} y1={o.y} x2={f(o.x + R * u.x)} y2={f(o.y + R * u.y)} {...line} />;
      })}
      {[...fanned].filter((a) => !baseRays.includes(a)).map((a) => {
        const u = at(a);
        return <line key={`r${a}`} x1={o.x} y1={o.y} x2={f(o.x + R * u.x)} y2={f(o.y + R * u.y)} {...line} />;
      })}
      {whole === "right" && <path d={`M${o.x + 14} ${o.y} V${o.y - 14} H${o.x}`} fill="none" stroke={INK} strokeWidth="2" />}
      {totalLabel && (
        <g>
          <path d={`M${f(o.x + 78 * at(start).x)} ${f(o.y + 78 * at(start).y)} A78 78 0 ${total > 180 ? 1 : 0} 0 ${f(o.x + 78 * at(start + total).x)} ${f(o.y + 78 * at(start + total).y)}`} fill="none" stroke="#7b8499" strokeWidth="2" strokeDasharray="4 3" />
          <text x={f(o.x + 92 * midAll.x)} y={f(o.y + 92 * midAll.y + 5)} textAnchor="middle" {...text}>
            {totalLabel}
          </text>
        </g>
      )}
      <circle cx={o.x} cy={o.y} r="4" fill={INK} />
    </svg>
  );
}

// ---------- Triangles ----------

/** Corner points of a triangle with these angles, scaled to fit a box and centred. A is bottom-left, B bottom-right. */
export function trianglePoints(angles: [number, number, number], boxW: number, boxH: number, ox = 0, oy = 0): [Pt, Pt, Pt] {
  const [a, b, c] = angles;
  const side = 1; // AB
  const bLen = (Math.sin(rad(b)) / Math.sin(rad(c))) * side; // AC
  const A = { x: 0, y: 0 };
  const B = { x: side, y: 0 };
  const C = { x: bLen * Math.cos(rad(a)), y: bLen * Math.sin(rad(a)) };
  const minX = Math.min(A.x, B.x, C.x);
  const maxX = Math.max(A.x, B.x, C.x);
  const w = maxX - minX;
  const h = C.y;
  const s = Math.min(boxW / w, boxH / h);
  const px = (p: Pt): Pt => ({ x: ox + (boxW - w * s) / 2 + (p.x - minX) * s, y: oy + (boxH + h * s) / 2 - p.y * s });
  return [px(A), px(B), px(C)];
}

function RightMark({ at, along1, along2, size = 13 }: { at: Pt; along1: Pt; along2: Pt; size?: number }) {
  const u1 = unit(at, along1);
  const u2 = unit(at, along2);
  const p1 = { x: at.x + u1.x * size, y: at.y + u1.y * size };
  const p2 = { x: at.x + u2.x * size, y: at.y + u2.y * size };
  const p3 = { x: p1.x + u2.x * size, y: p1.y + u2.y * size };
  return <path d={`M${f(p1.x)} ${f(p1.y)} L${f(p3.x)} ${f(p3.y)} L${f(p2.x)} ${f(p2.y)}`} fill="none" stroke={INK} strokeWidth="2" />;
}

/** A triangle with its labels, drawn into the given box. */
function Triangle({ pts, angles, angleLabels, sideLabels, ticks, height, askedAngle }: { pts: [Pt, Pt, Pt]; angles: [number, number, number]; angleLabels?: string[]; sideLabels?: string[]; ticks?: number[]; height?: string; askedAngle?: boolean }) {
  const [A, B, C] = pts;
  const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const out: ReactNode[] = [];
  const sides: [Pt, Pt][] = [
    [B, C], // opposite A
    [C, A], // opposite B
    [A, B], // opposite C
  ];
  pts.forEach((p, i) => {
    const others = pts.filter((_, j) => j !== i);
    const bis = bisector(unit(p, others[0]), unit(p, others[1]));
    if (angles[i] === 90) out.push(<RightMark key={`r${i}`} at={p} along1={others[0]} along2={others[1]} />);
    const l = angleLabels?.[i];
    const dist = Math.min(62, Math.max(26, 15 / Math.sin(rad(angles[i] / 2))));
    if (l) {
      const asked = askedAngle && /\?/.test(l);
      out.push(
        <text key={`a${i}`} x={f(p.x + bis.x * dist)} y={f(p.y + bis.y * dist + 5)} textAnchor="middle" {...text} fontSize={13} fill={asked ? "#2a78d6" : INK}>
          {l}
        </text>,
      );
    }
  });
  sides.forEach(([p, q], i) => {
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const outward = unit(centroid, mid);
    const l = sideLabels?.[i];
    if (l) {
      out.push(
        <text key={`s${i}`} x={f(mid.x + outward.x * 12)} y={f(mid.y + outward.y * 16 + 5)} textAnchor={outward.x > 0.45 ? "start" : outward.x < -0.45 ? "end" : "middle"} {...text} fontSize={14}>
          {l}
        </text>,
      );
    }
    if (ticks?.includes(i)) {
      const d = unit(p, q);
      const n = { x: -d.y, y: d.x };
      out.push(<line key={`t${i}`} x1={f(mid.x + n.x * 6)} y1={f(mid.y + n.y * 6)} x2={f(mid.x - n.x * 6)} y2={f(mid.y - n.y * 6)} stroke={INK} strokeWidth="2.5" />);
    }
  });
  const foot = { x: C.x, y: A.y };
  return (
    <>
      <path d={`M${f(A.x)} ${f(A.y)} L${f(B.x)} ${f(B.y)} L${f(C.x)} ${f(C.y)} Z`} fill={FILL} {...line} />
      {height && (
        <g>
          <line x1={f(C.x)} y1={f(C.y)} x2={f(foot.x)} y2={f(foot.y)} stroke="#7b8499" strokeWidth="2" strokeDasharray="5 4" />
          <RightMark at={foot} along1={C} along2={B} size={9} />
          <text x={f(C.x - 7)} y={f((C.y + foot.y) / 2 + 12)} textAnchor="end" {...text} fontSize={14}>
            {height}
          </text>
        </g>
      )}
      {out}
    </>
  );
}

export function TriangleFigure({ angles, angleLabels, sideLabels, ticks, height }: Extract<DiagramVisual, { type: "triangleFigure" }>) {
  const W = 300;
  const H = 190;
  const pts = trianglePoints(angles, 190, 110, 55, 30);
  const aria = `a triangle with angles ${angleLabels?.filter(Boolean).join(", ") || "not shown"}${sideLabels?.some(Boolean) ? `, and sides ${sideLabels.filter(Boolean).join(", ")}` : ""}${angles.includes(90) ? ", with a right angle" : ""}${height ? `, and a height of ${height}` : ""}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm" role="img" aria-label={aria}>
      <Triangle pts={pts} angles={angles} angleLabels={angleLabels} sideLabels={sideLabels} ticks={ticks} height={height} askedAngle />
    </svg>
  );
}

// ---------- A pair of same-shaped figures ----------

const SHAPE_ANGLES: [number, number, number] = [62, 58, 60];

export function FigurePair({ shape, a, b, ratio, caption }: Extract<DiagramVisual, { type: "figurePair" }>) {
  const W = 340;
  const H = caption ? 176 : 156;
  const r = Math.min(3, Math.max(1.3, ratio));
  const label = (s: string, x: number, y: number, anchor: "middle" | "start" | "end" = "middle") =>
    s ? (
      <text key={`${s}${x}${y}`} x={f(x)} y={f(y)} textAnchor={anchor} {...text} fontSize={14}>
        {s}
      </text>
    ) : null;
  const body: ReactNode[] = [];
  const baseY = 128;
  if (shape === "triangle") {
    const bigW = 130;
    const smallW = Math.max(46, bigW / r);
    const mk = (w: number, x0: number, sides: string[], tag: string) => {
      const pts = trianglePoints(SHAPE_ANGLES, w, w * 0.9, x0, baseY - w * 0.9);
      const [A, B, C] = pts;
      body.push(<path key={tag} d={`M${f(A.x)} ${f(A.y)} L${f(B.x)} ${f(B.y)} L${f(C.x)} ${f(C.y)} Z`} fill={FILL} {...line} />);
      const cen = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
      const spots: [Pt, Pt][] = [[A, B], [C, A], [B, C]]; // bottom, left, right
      spots.forEach(([p, q], i) => {
        const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
        const o = unit(cen, m);
        body.push(label(sides[i] ?? "", m.x + o.x * 12, m.y + o.y * 16 + 5, o.x > 0.45 ? "start" : o.x < -0.45 ? "end" : "middle"));
      });
    };
    mk(smallW, 24, a, "a");
    mk(bigW, W - 24 - bigW, b, "b");
  } else {
    const aw = 66;
    const ah = 46;
    const bh = Math.min(104, ah * r);
    const bw = (bh / ah) * aw;
    const x1 = 56;
    const y1 = baseY - ah;
    const x2 = W - 56 - bw;
    const y2 = baseY - bh;
    body.push(<rect key="ra" x={x1} y={y1} width={aw} height={ah} fill={FILL} {...line} />);
    body.push(<rect key="rb" x={x2} y={y2} width={bw} height={bh} fill={FILL} {...line} />);
    body.push(label(a[0] ?? "", x1 + aw / 2, baseY + 20), label(a[1] ?? "", x1 - 6, y1 + ah / 2 + 5, "end"));
    body.push(label(b[0] ?? "", x2 + bw / 2, baseY + 20), label(b[1] ?? "", x2 + bw + 6, y2 + bh / 2 + 5, "start"));
  }
  const aria = `two ${shape === "triangle" ? "similar triangles" : "similar rectangles"}. The small one: ${a.filter(Boolean).join(", ")}. The big one: ${b.filter(Boolean).join(", ")}${caption ? `. ${caption}` : ""}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm" role="img" aria-label={aria}>
      {body}
      {caption && label(caption, W / 2, H - 6)}
    </svg>
  );
}

// ---------- Regular polygons ----------

export function RegularPolygon({ sides, label }: Extract<DiagramVisual, { type: "polygon" }>) {
  const W = 200;
  const H = 170;
  const c: Pt = { x: W / 2, y: H / 2 + 2 };
  const R = 70;
  const start = sides % 2 === 1 ? -90 : -90 + 180 / sides;
  const pts = Array.from({ length: sides }, (_, i): Pt => ({ x: c.x + R * Math.cos(rad(start + (360 / sides) * i)), y: c.y + R * Math.sin(rad(start + (360 / sides) * i)) }));
  const first = pts[0];
  const towardCentre = unit(first, c);
  const u1 = unit(first, pts[1]);
  const u2 = unit(first, pts[sides - 1]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[14rem]" role="img" aria-label={`a regular polygon with ${sides} equal sides${label ? `, with one angle labelled ${label}` : ""}`}>
      <path d={`${pts.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(p.y)}`).join(" ")} Z`} fill={FILL} {...line} />
      {label && (
        <g>
          <path d={slice(first, u1, u2, 20)} fill={ASKED} stroke="#2a78d6" strokeWidth="2" />
          <text x={f(first.x + towardCentre.x * 38)} y={f(first.y + towardCentre.y * 38 + 5)} textAnchor="middle" {...text} fill="#2a78d6">
            {label}
          </text>
        </g>
      )}
    </svg>
  );
}
