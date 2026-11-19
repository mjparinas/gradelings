import type { ReactNode } from "react";
import type { SolidKind, SolidLabelKey, SolidLabels } from "@/content/types";

// Drawings of 3-D solids and their nets, with measurements on the edges. Everything is drawn from the labels the
// question hands over, so a picture never says more than its own numbers do.

const INK = "#253047";
const W = 240;
const H = 180;

const FILL = { box: ["#d9ccfb", "#b9a2f7", "#8b6de0"], blue: ["#bcd5fb", "#86b1fa", "#4f8ef7"], green: ["#c4efdb", "#7fd8b0", "#25b47e"], orange: ["#ffe0bf", "#ffc085", "#ff9636"], gold: ["#fbe7a3", "#f5cf5b", "#f5b301"] };

type Palette = (typeof FILL)[keyof typeof FILL];

const KINDS: Record<SolidKind, { name: string; palette: Palette }> = {
  box: { name: "rectangular prism", palette: FILL.box },
  cube: { name: "cube", palette: FILL.blue },
  "triangular-prism": { name: "triangular prism", palette: FILL.orange },
  cylinder: { name: "cylinder", palette: FILL.green },
  cone: { name: "cone", palette: FILL.orange },
  "square-pyramid": { name: "square pyramid", palette: FILL.gold },
  stacked: { name: "box with a cube on top", palette: FILL.box },
};

const LABEL_WORD: Record<SolidLabelKey, string> = {
  length: "length",
  width: "width",
  height: "height",
  edge: "edge",
  base: "base",
  radius: "radius",
  diameter: "diameter",
  slant: "slant height",
  circumference: "length around the circle",
};

/** The text a screen reader gets: the solid, then each measurement. */
export function solidDescription(kind: SolidKind, labels: SolidLabels | undefined, net: boolean): string {
  const parts = (Object.keys(labels ?? {}) as SolidLabelKey[]).map((k) => `${LABEL_WORD[k]} ${labels?.[k] === "?" ? "unknown" : labels?.[k]}`);
  return `${net ? "a net of a " : "a "}${KINDS[kind].name}${parts.length ? `, ${parts.join(", ")}` : ""}`;
}

function T({ x, y, anchor = "middle", children }: { x: number; y: number; anchor?: "start" | "middle" | "end"; children: ReactNode }) {
  return (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" fontFamily="var(--font-fredoka)" fontWeight="700" fontSize="14" fill={INK} stroke="#fff" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
      {children}
    </text>
  );
}

const line = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const dash = { stroke: INK, strokeWidth: 1.8, strokeDasharray: "5 4", strokeLinecap: "round" as const, fill: "none" };

/** A parsed measurement, used only to keep a box's proportions about right. */
function amount(label: string | undefined): number | undefined {
  const n = label === undefined ? NaN : parseFloat(label);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Box proportions (length, width, height) kept between 0.45 and 1 of the longest edge. */
function boxProportions(l?: SolidLabels): [number, number, number] {
  const raw = [amount(l?.length), amount(l?.width), amount(l?.height)];
  if (raw.some((v) => v === undefined)) return [1, 0.6, 0.65];
  const top = Math.max(...(raw as number[]));
  return (raw as number[]).map((v) => Math.min(1, Math.max(0.45, v / top))) as [number, number, number];
}

function BoxSolid({ labels, cube }: { labels?: SolidLabels; cube?: boolean }) {
  const p = KINDS[cube ? "cube" : "box"].palette;
  const [pl, pw, ph] = cube ? [1, 1, 1] : boxProportions(labels);
  const fw = cube ? 82 : 66 + 52 * pl;
  const fh = cube ? 82 : 40 + 42 * ph;
  const dx = cube ? 38 : 26 + 32 * pw;
  const dy = -dx * 0.7;
  const x0 = 56;
  const y0 = 150 - fh - 6 + (cube ? 0 : 0);
  const x1 = x0 + fw;
  const y1 = y0 + fh;
  return (
    <g>
      <polygon points={`${x0},${y0} ${x0 + dx},${y0 + dy} ${x1 + dx},${y0 + dy} ${x1},${y0}`} fill={p[0]} {...line} />
      <polygon points={`${x1},${y0} ${x1 + dx},${y0 + dy} ${x1 + dx},${y1 + dy} ${x1},${y1}`} fill={p[2]} {...line} />
      <rect x={x0} y={y0} width={fw} height={fh} fill={p[1]} {...line} />
      {cube ? (
        labels?.edge && <T x={x0 + fw / 2} y={y1 + 16}>{labels.edge}</T>
      ) : (
        <>
          {labels?.length && <T x={x0 + fw / 2} y={y1 + 16}>{labels.length}</T>}
          {labels?.height && <T x={x0 - 6} y={y0 + fh / 2} anchor="end">{labels.height}</T>}
          {labels?.width && <T x={x1 + dx / 2 + 4} y={y1 + dy / 2 + 18} anchor="start">{labels.width}</T>}
        </>
      )}
    </g>
  );
}

function StackedSolid({ labels }: { labels?: SolidLabels }) {
  const p = KINDS.stacked.palette;
  const c = FILL.blue;
  const [pl, pw, ph] = boxProportions(labels);
  const fw = 80 + 40 * pl;
  const fh = 30 + 24 * ph;
  const dx = 24 + 24 * pw;
  const dy = -dx * 0.7;
  const x0 = 46;
  const y0 = 150 - fh;
  const x1 = x0 + fw;
  const y1 = y0 + fh;
  // The small cube stands on the top face, back from the front edge.
  const s = 34;
  const ex = 0.32;
  const cx = x0 + fw * 0.32 + dx * ex;
  const cy = y0 + dy * ex;
  const cdx = s * 0.45;
  const cdy = -cdx * 0.7;
  return (
    <g>
      <polygon points={`${x0},${y0} ${x0 + dx},${y0 + dy} ${x1 + dx},${y0 + dy} ${x1},${y0}`} fill={p[0]} {...line} />
      <polygon points={`${x1},${y0} ${x1 + dx},${y0 + dy} ${x1 + dx},${y1 + dy} ${x1},${y1}`} fill={p[2]} {...line} />
      <rect x={x0} y={y0} width={fw} height={fh} fill={p[1]} {...line} />
      <polygon points={`${cx},${cy - s} ${cx + cdx},${cy - s + cdy} ${cx + s + cdx},${cy - s + cdy} ${cx + s},${cy - s}`} fill={c[0]} {...line} />
      <polygon points={`${cx + s},${cy - s} ${cx + s + cdx},${cy - s + cdy} ${cx + s + cdx},${cy + cdy} ${cx + s},${cy}`} fill={c[2]} {...line} />
      <rect x={cx} y={cy - s} width={s} height={s} fill={c[1]} {...line} />
      {labels?.edge && <T x={cx + s / 2} y={cy - s / 2}>{labels.edge}</T>}
      {labels?.length && <T x={x0 + fw / 2} y={y1 + 16}>{labels.length}</T>}
      {labels?.height && <T x={x0 - 6} y={y0 + fh / 2} anchor="end">{labels.height}</T>}
      {labels?.width && <T x={x1 + dx / 2 + 4} y={y1 + dy / 2 + 18} anchor="start">{labels.width}</T>}
    </g>
  );
}

function TriangularPrismSolid({ labels }: { labels?: SolidLabels }) {
  const p = KINDS["triangular-prism"].palette;
  const A: [number, number] = [34, 142];
  const B: [number, number] = [124, 142];
  const C: [number, number] = [79, 66];
  const d: [number, number] = [58, -34];
  const sh = (q: [number, number]): [number, number] => [q[0] + d[0], q[1] + d[1]];
  const [A2, B2, C2] = [sh(A), sh(B), sh(C)];
  const pt = (q: [number, number]) => q.join(",");
  return (
    <g>
      <path d={`M${pt(A)} L${pt(A2)} L${pt(B2)} M${pt(A2)} L${pt(C2)}`} {...dash} />
      <polygon points={`${pt(B)} ${pt(B2)} ${pt(C2)} ${pt(C)}`} fill={p[2]} {...line} />
      <polygon points={`${pt(A)} ${pt(B)} ${pt(C)}`} fill={p[1]} {...line} />
      <path d={`M${C[0]},${C[1]} L${C[0]},${A[1]}`} {...dash} />
      {labels?.base && <T x={(A[0] + B[0]) / 2} y={A[1] + 16}>{labels.base}</T>}
      {labels?.height && <T x={C[0] - 5} y={(C[1] + A[1]) / 2 - 8} anchor="end">{labels.height}</T>}
      {labels?.length && <T x={(B[0] + B2[0]) / 2 + 6} y={(B[1] + B2[1]) / 2 + 14} anchor="start">{labels.length}</T>}
    </g>
  );
}

function CylinderSolid({ labels }: { labels?: SolidLabels }) {
  const p = KINDS.cylinder.palette;
  const cx = 96;
  const rx = 52;
  const ry = 15;
  const top = 38;
  const bottom = 138;
  return (
    <g>
      <path d={`M${cx - rx},${top} V${bottom} A${rx},${ry} 0 0 0 ${cx + rx},${bottom} V${top}`} fill={p[1]} {...line} />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={p[0]} {...line} />
      <path d={`M${cx - rx},${bottom} A${rx},${ry} 0 0 1 ${cx + rx},${bottom}`} {...dash} />
      <line x1={cx} y1={top} x2={cx + rx} y2={top} {...line} strokeWidth="2" />
      <circle cx={cx} cy={top} r="3" fill={INK} />
      {labels?.radius && <T x={cx + rx / 2} y={top + 10}>{labels.radius}</T>}
      {labels?.diameter && (
        <g>
          <line x1={cx - rx} y1={top} x2={cx + rx} y2={top} {...line} strokeWidth="2" />
          <T x={cx} y={top + 10}>{labels.diameter}</T>
        </g>
      )}
      <path d={`M${cx + rx + 14},${top} V${bottom}`} {...dash} />
      {labels?.height && <T x={cx + rx + 22} y={(top + bottom) / 2} anchor="start">{labels.height}</T>}
    </g>
  );
}

function ConeSolid({ labels }: { labels?: SolidLabels }) {
  const p = KINDS.cone.palette;
  const cx = 92;
  const rx = 54;
  const ry = 15;
  const base = 138;
  const apex = 22;
  return (
    <g>
      <path d={`M${cx},${apex} L${cx + rx},${base} A${rx},${ry} 0 0 1 ${cx - rx},${base} Z`} fill={p[1]} {...line} />
      <path d={`M${cx - rx},${base} A${rx},${ry} 0 0 1 ${cx + rx},${base}`} fill={p[0]} {...line} />
      <path d={`M${cx},${apex} V${base}`} {...dash} />
      <line x1={cx} y1={base} x2={cx + rx} y2={base} {...line} strokeWidth="2" />
      <circle cx={cx} cy={base} r="3" fill={INK} />
      {labels?.height && <T x={cx - 6} y={(apex + base) / 2 - 8} anchor="end">{labels.height}</T>}
      {labels?.radius && <T x={cx + rx / 2} y={base + 28}>{labels.radius}</T>}
      {labels?.diameter && (
        <g>
          <line x1={cx - rx} y1={base} x2={cx + rx} y2={base} {...line} strokeWidth="2" />
          <T x={cx} y={base + 28}>{labels.diameter}</T>
        </g>
      )}
      {labels?.slant && <T x={cx + rx / 2 + 8} y={(apex + base) / 2 - 8} anchor="start">{labels.slant}</T>}
    </g>
  );
}

function PyramidSolid({ labels }: { labels?: SolidLabels }) {
  const p = KINDS["square-pyramid"].palette;
  const a: [number, number] = [34, 144];
  const b: [number, number] = [132, 144];
  const c: [number, number] = [186, 112];
  const d: [number, number] = [88, 112];
  const apex: [number, number] = [110, 26];
  const mid: [number, number] = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
  const front: [number, number] = [(a[0] + b[0]) / 2, a[1]];
  const pt = (q: [number, number]) => q.join(",");
  return (
    <g>
      <path d={`M${pt(a)} L${pt(d)} L${pt(c)} M${pt(d)} L${pt(apex)}`} {...dash} />
      <polygon points={`${pt(b)} ${pt(c)} ${pt(apex)}`} fill={p[2]} {...line} />
      <polygon points={`${pt(a)} ${pt(b)} ${pt(apex)}`} fill={p[1]} {...line} />
      <path d={`M${apex[0]},${apex[1]} L${mid[0]},${mid[1]}`} {...dash} />
      <path d={`M${apex[0]},${apex[1]} L${front[0]},${front[1]}`} {...dash} />
      <circle cx={mid[0]} cy={mid[1]} r="3" fill={INK} />
      {labels?.base && <T x={front[0]} y={a[1] + 16}>{labels.base}</T>}
      {labels?.height && <T x={mid[0] + 6} y={(apex[1] + mid[1]) / 2 - 6} anchor="start">{labels.height}</T>}
      {labels?.slant && <T x={(apex[0] + front[0]) / 2 - 8} y={(apex[1] + front[1]) / 2 + 12} anchor="end">{labels.slant}</T>}
    </g>
  );
}

// ---------- Nets ----------

/** Scale a net drawn in its own units to fit the picture, centred, with its measurements on its edges. */
function Net({ width, height, children }: { width: number; height: number; children: (s: number) => ReactNode }) {
  const s = Math.min(212 / width, 150 / height);
  return <g transform={`translate(${(W - width * s) / 2} ${(H - height * s) / 2})`}>{children(s)}</g>;
}

const netLine = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const };

function rect(x: number, y: number, w: number, h: number, fill: string, key: string) {
  return <rect key={key} x={x} y={y} width={w} height={h} fill={fill} {...netLine} />;
}

function BoxNet({ labels, cube }: { labels?: SolidLabels; cube?: boolean }) {
  const p = KINDS[cube ? "cube" : "box"].palette;
  const [pl, pw, ph] = cube ? [1, 1, 1] : boxProportions(labels);
  const l = pl;
  const w = pw;
  const h = ph;
  const tw = 2 * h + l;
  const th = 2 * h + 2 * w;
  return (
    <Net width={tw} height={th}>
      {(s) => (
        <g>
          {rect(h * s, 0, l * s, h * s, p[1], "back")}
          {rect(0, h * s, h * s, w * s, p[0], "left")}
          {rect(h * s, h * s, l * s, w * s, p[2], "base")}
          {rect((h + l) * s, h * s, h * s, w * s, p[0], "right")}
          {rect(h * s, (h + w) * s, l * s, h * s, p[1], "front")}
          {rect(h * s, (2 * h + w) * s, l * s, w * s, p[2], "lid")}
          {cube ? (
            labels?.edge && <T x={(h + l / 2) * s} y={(h + w / 2) * s}>{labels.edge}</T>
          ) : (
            <>
              {labels?.length && <T x={(h + l / 2) * s} y={(h + w / 2) * s}>{labels.length}</T>}
              {labels?.width && (
                <g transform={`rotate(-90 ${(h / 2) * s} ${(h + w / 2) * s})`}>
                  <T x={(h / 2) * s} y={(h + w / 2) * s}>{labels.width}</T>
                </g>
              )}
              {labels?.height && <T x={(h + l / 2) * s} y={(h + w + h / 2) * s}>{labels.height}</T>}
            </>
          )}
        </g>
      )}
    </Net>
  );
}

function TriangularPrismNet({ labels }: { labels?: SolidLabels }) {
  const p = KINDS["triangular-prism"].palette;
  // Three rectangles side by side with a triangle above and below the middle one.
  const b = 1.1;
  const s = 0.95;
  const t = 0.8;
  const len = 1.5;
  const tw = 2 * s + b;
  const th = len + 2 * t;
  return (
    <Net width={tw} height={th}>
      {(k) => (
        <g>
          {rect(0, t * k, s * k, len * k, p[0], "r1")}
          {rect(s * k, t * k, b * k, len * k, p[1], "r2")}
          {rect((s + b) * k, t * k, s * k, len * k, p[0], "r3")}
          <polygon points={`${s * k},${t * k} ${(s + b) * k},${t * k} ${(s + b / 2) * k},0`} fill={p[2]} {...netLine} />
          <polygon points={`${s * k},${(t + len) * k} ${(s + b) * k},${(t + len) * k} ${(s + b / 2) * k},${th * k}`} fill={p[2]} {...netLine} />
          {labels?.base && <T x={(s + b / 2) * k} y={(t + len / 2) * k}>{labels.base}</T>}
          {labels?.length && <T x={(s + b) * k + 6} y={(t + len / 2) * k - 14} anchor="start">{labels.length}</T>}
          {labels?.height && <T x={(s + b / 2) * k} y={t * 0.55 * k}>{labels.height}</T>}
        </g>
      )}
    </Net>
  );
}

function PyramidNet({ labels }: { labels?: SolidLabels }) {
  const p = KINDS["square-pyramid"].palette;
  const b = 1;
  const t = 0.95;
  const tot = b + 2 * t;
  return (
    <Net width={tot} height={tot}>
      {(k) => (
        <g>
          <polygon points={`${t * k},${t * k} ${(t + b) * k},${t * k} ${(t + b / 2) * k},0`} fill={p[1]} {...netLine} />
          <polygon points={`${t * k},${(t + b) * k} ${(t + b) * k},${(t + b) * k} ${(t + b / 2) * k},${tot * k}`} fill={p[1]} {...netLine} />
          <polygon points={`${t * k},${t * k} ${t * k},${(t + b) * k} 0,${(t + b / 2) * k}`} fill={p[1]} {...netLine} />
          <polygon points={`${(t + b) * k},${t * k} ${(t + b) * k},${(t + b) * k} ${tot * k},${(t + b / 2) * k}`} fill={p[1]} {...netLine} />
          {rect(t * k, t * k, b * k, b * k, p[2], "base")}
          {labels?.base && <T x={(t + b / 2) * k} y={(t + b / 2) * k}>{labels.base}</T>}
          {labels?.slant && <T x={(t + b / 2) * k} y={(t * 0.55) * k}>{labels.slant}</T>}
        </g>
      )}
    </Net>
  );
}

function CylinderNet({ labels }: { labels?: SolidLabels }) {
  const p = KINDS.cylinder.palette;
  const r = 0.55;
  const wide = 2 * Math.PI * r;
  const high = 1.15;
  const tw = wide;
  const th = high + 4 * r;
  return (
    <Net width={tw} height={th}>
      {(k) => (
        <g>
          {rect(0, 2 * r * k, wide * k, high * k, p[1], "side")}
          <circle cx={wide * 0.28 * k} cy={r * k} r={r * k} fill={p[2]} {...netLine} />
          <circle cx={wide * 0.72 * k} cy={(2 * r + high + r) * k} r={r * k} fill={p[2]} {...netLine} />
          {labels?.radius && (
            <g>
              <line x1={wide * 0.28 * k} y1={r * k} x2={(wide * 0.28 + r) * k} y2={r * k} {...line} strokeWidth="2" />
              <T x={(wide * 0.28 + r / 2) * k} y={r * k - 12}>{labels.radius}</T>
            </g>
          )}
          {labels?.circumference && <T x={wide * 0.5 * k} y={(2 * r + 0.25) * k}>{labels.circumference}</T>}
          {labels?.height && <T x={(wide - 0.05) * k} y={(2 * r + high / 2) * k} anchor="end">{labels.height}</T>}
        </g>
      )}
    </Net>
  );
}

function ConeNet({ labels }: { labels?: SolidLabels }) {
  const p = KINDS.cone.palette;
  const r = 0.5;
  const sl = 1.25;
  const half = (62 * Math.PI) / 180;
  const sectorW = 2 * sl * Math.sin(half);
  const tw = 2 * r + 0.15 + sectorW;
  const th = sl;
  return (
    <Net width={tw} height={th}>
      {(k) => {
        const ax = (2 * r + 0.15 + sectorW / 2) * k;
        const ay = th * k;
        const ex = sl * Math.sin(half) * k;
        const ey = sl * Math.cos(half) * k;
        return (
          <g>
            <circle cx={r * k} cy={(th - r) * k} r={r * k} fill={p[2]} {...netLine} />
            <path d={`M${ax},${ay} L${ax - ex},${ay - ey} A${sl * k},${sl * k} 0 0 1 ${ax + ex},${ay - ey} Z`} fill={p[1]} {...netLine} />
            {labels?.radius && (
              <g>
                <line x1={r * k} y1={(th - r) * k} x2={2 * r * k} y2={(th - r) * k} {...line} strokeWidth="2" />
                <T x={1.5 * r * k} y={(th - r) * k - 12}>{labels.radius}</T>
              </g>
            )}
            {labels?.slant && <T x={ax + ex * 0.5} y={ay - ey * 0.3}>{labels.slant}</T>}
          </g>
        );
      }}
    </Net>
  );
}

/** A solid or its net, drawn with the measurements the question gives. */
export function SolidPicture({ kind, labels, net = false }: { kind: SolidKind; labels?: SolidLabels; net?: boolean }) {
  let body: ReactNode;
  switch (kind) {
    case "box":
      body = net ? <BoxNet labels={labels} /> : <BoxSolid labels={labels} />;
      break;
    case "cube":
      body = net ? <BoxNet labels={labels} cube /> : <BoxSolid labels={labels} cube />;
      break;
    case "triangular-prism":
      body = net ? <TriangularPrismNet labels={labels} /> : <TriangularPrismSolid labels={labels} />;
      break;
    case "cylinder":
      body = net ? <CylinderNet labels={labels} /> : <CylinderSolid labels={labels} />;
      break;
    case "cone":
      body = net ? <ConeNet labels={labels} /> : <ConeSolid labels={labels} />;
      break;
    case "square-pyramid":
      body = net ? <PyramidNet labels={labels} /> : <PyramidSolid labels={labels} />;
      break;
    case "stacked":
      body = <StackedSolid labels={labels} />;
      break;
  }
  return (
    <svg width="288" height="216" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={solidDescription(kind, labels, net)} className="max-w-full">
      {body}
    </svg>
  );
}
