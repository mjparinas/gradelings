import type { ReactNode } from "react";
import type { Visual } from "@/content/types";

// Drawings for graphs and data (circle graphs, line plots, line graphs and plotted lines, tree diagrams). Each one is drawn
// from the question's own numbers, so the picture and the words can never disagree.

const INK = "#253047";
const SOFT = "#5b6680";
const SERIES_COLOURS = ["#2a78d6", "#e9559a", "#25b47e", "#ff9636"];
const SLICES = ["#4f8ef7", "#e9559a", "#25b47e", "#ff9636", "#8b5cf6", "#06b6d4", "#f2c74e", "#ef4444"];

type Of<T extends Visual["type"]> = Extract<Visual, { type: T }>;

const num = (n: number) => String(Math.round(n * 1000) / 1000).replace("-", "−");

/** A "nice" step so a scale has about `target` marks. */
export function niceStep(span: number, target = 6): number {
  const raw = span / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const f = raw / mag;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * mag;
}

/** A circle graph: each sector's size follows its value. A sector's `show` text (default its label) is written on it. */
export function CircleGraph({ title, sectors }: Pick<Of<"circleGraph">, "title" | "sectors">) {
  const total = sectors.reduce((a, s) => a + s.value, 0) || 1;
  const R = 70;
  const before = sectors.map((_, i) => sectors.slice(0, i).reduce((a, x) => a + x.value, 0));
  const parts = sectors.map((s, i) => {
    const a0 = (before[i] / total) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((before[i] + s.value) / total) * Math.PI * 2 - Math.PI / 2;
    const mid = (a0 + a1) / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const full = sectors.length === 1;
    const d = full
      ? `M0 ${-R} A${R} ${R} 0 1 1 -0.01 ${-R} Z`
      : `M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 ${large} 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`;
    const big = (s.value / total) * 100 >= 8;
    return { s, i, d, lx: (big ? 0.62 : 1.22) * R * Math.cos(mid), ly: (big ? 0.62 : 1.22) * R * Math.sin(mid), big };
  });
  return (
    <figure className="w-full max-w-md rounded-2xl border-[3px] border-line bg-white p-3">
      {title && <figcaption className="mb-1 text-center text-lg font-semibold">{title}</figcaption>}
      <svg viewBox="-120 -100 240 200" className="mx-auto w-full max-w-xs" role="img" aria-label={`${title ?? "Circle graph"}: ${sectors.map((s) => s.show ?? s.label).join(", ")}`}>
        {parts.map(({ s, i, d }) => (
          <path key={i} d={d} fill={SLICES[i % SLICES.length]} stroke="#fff" strokeWidth="2" />
        ))}
        {parts.map(({ s, i, lx, ly, big }) => (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={big ? 10.5 : 9.5} fontWeight="700" fill={big ? "#0f172a" : INK}>
            <tspan x={lx} dy="-0.5em">{s.label}</tspan>
            {s.show && <tspan x={lx} dy="1.2em">{s.show}</tspan>}
          </text>
        ))}
      </svg>
    </figure>
  );
}

/** A line plot: a number line with a stack of X's above each value. */
export function LinePlot({ title, labels, counts, caption }: Pick<Of<"linePlot">, "title" | "labels" | "counts" | "caption">) {
  const n = labels.length;
  const slot = Math.min(56, Math.max(34, 320 / n));
  const W = n * slot + 20;
  const maxC = Math.max(...counts, 1);
  const rowH = 17;
  const H = maxC * rowH + 10;
  return (
    <figure className="w-full max-w-xl overflow-x-auto rounded-2xl border-[3px] border-line bg-white p-3">
      {title && <figcaption className="mb-1 text-center text-lg font-semibold">{title}</figcaption>}
      <svg viewBox={`0 0 ${W} ${H + 40}`} className="mx-auto" style={{ width: Math.min(W * 1.5, 520), maxWidth: "100%" }} role="img" aria-label={`${title ?? "Line plot"}: ${labels.map((l, i) => `${counts[i]} at ${l}`).join(", ")}`}>
        <line x1="6" y1={H + 4} x2={W - 6} y2={H + 4} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        {labels.map((l, i) => {
          const cx = 10 + (i + 0.5) * slot;
          return (
            <g key={i}>
              <line x1={cx} y1={H} x2={cx} y2={H + 9} stroke={INK} strokeWidth="2" />
              <text x={cx} y={H + 24} textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>{l}</text>
              {Array.from({ length: counts[i] }, (_, k) => (
                <text key={k} x={cx} y={H - 3 - k * rowH} textAnchor="middle" fontSize="16" fontWeight="800" fill="#2a78d6">✕</text>
              ))}
            </g>
          );
        })}
      </svg>
      {caption && <p className="text-center text-sm text-ink-soft">{caption}</p>}
    </figure>
  );
}

/**
 * Lines and points on a labelled grid: line graphs, a plotted line with its slope, a curve such as y = 3|x| or a
 * parabola, two lines that cross. Each series is joined with straight pieces unless `line` is false.
 */
export function PlotGraph(v: Omit<Of<"plot">, "type">) {
  const { title, xLabel, yLabel, xMin, xMax, yMin, yMax, series } = v;
  const L = 38, T = 12, W = 280, H = 200;
  const px = (x: number) => L + ((x - xMin) / (xMax - xMin)) * W;
  const py = (y: number) => T + H - ((y - yMin) / (yMax - yMin)) * H;
  const xs = v.xStep ?? niceStep(xMax - xMin, 8);
  const ys = v.yStep ?? niceStep(yMax - yMin, 6);
  const ticks = (a: number, b: number, s: number) => {
    const out: number[] = [];
    for (let t = Math.ceil(a / s - 1e-9) * s; t <= b + 1e-9; t += s) out.push(Math.round(t * 1e6) / 1e6);
    return out;
  };
  const xt = v.xLabels ? v.xLabels.map((_, i) => i + 1) : ticks(xMin, xMax, xs);
  const yt = ticks(yMin, yMax, ys);
  const axisX = yMin <= 0 && yMax >= 0 ? py(0) : T + H;
  const axisY = xMin <= 0 && xMax >= 0 ? px(0) : L;
  const clipId = `plot-${Math.abs([title, xMin, xMax, yMin, yMax].join("|").split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7))}`;
  return (
    <figure className="w-full max-w-md rounded-2xl border-[3px] border-line bg-white p-3">
      {title && <figcaption className="mb-1 text-center text-lg font-semibold">{title}</figcaption>}
      <svg viewBox={`0 0 ${L + W + 22} ${T + H + 46}`} className="w-full" role="img" aria-label={title ?? "a graph"}>
        <defs>
          <clipPath id={clipId}>
            <rect x={L} y={T} width={W} height={H} />
          </clipPath>
        </defs>
        {xt.map((t) => (
          <g key={`x${t}`}>
            <line x1={px(t)} y1={T} x2={px(t)} y2={T + H} stroke="#e1e5ee" strokeWidth="1" />
            <text x={px(t)} y={T + H + 15} textAnchor="middle" fontSize="11" fill={SOFT}>{v.xLabels ? v.xLabels[t - 1] : num(t)}</text>
          </g>
        ))}
        {yt.map((t) => (
          <g key={`y${t}`}>
            <line x1={L} y1={py(t)} x2={L + W} y2={py(t)} stroke="#e1e5ee" strokeWidth="1" />
            <text x={L - 6} y={py(t) + 4} textAnchor="end" fontSize="11" fill={SOFT}>{num(t)}</text>
          </g>
        ))}
        <line x1={L} y1={axisX} x2={L + W} y2={axisX} stroke={INK} strokeWidth="2" />
        <line x1={axisY} y1={T} x2={axisY} y2={T + H} stroke={INK} strokeWidth="2" />
        {xLabel && <text x={L + W / 2} y={T + H + 36} textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>{xLabel}</text>}
        {yLabel && <text transform={`translate(10 ${T + H / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>{yLabel}</text>}
        {series.map((s, i) => {
          const col = SERIES_COLOURS[i % SERIES_COLOURS.length];
          return (
            <g key={i} clipPath={`url(#${clipId})`}>
              {s.line !== false && s.points.length > 1 && (
                <polyline points={s.points.map((p) => `${px(p.x)},${py(p.y)}`).join(" ")} fill="none" stroke={col} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              )}
              {s.dots !== false && s.points.map((p, k) => <circle key={k} cx={px(p.x)} cy={py(p.y)} r="4.5" fill={col} stroke="#fff" strokeWidth="1.5" />)}
            </g>
          );
        })}
        {series.map((s, i) => {
          if (!s.label) return null;
          const p = s.points[s.points.length - 1];
          return (
            <text key={`l${i}`} x={Math.min(px(p.x) + 4, L + W - 4)} y={Math.max(py(p.y) - 6, T + 10)} textAnchor="end" fontSize="12" fontWeight="700" fill={SERIES_COLOURS[i % SERIES_COLOURS.length]}>
              {s.label}
            </text>
          );
        })}
        {(v.marks ?? []).map((m, i) => (
          <g key={`m${i}`}>
            <circle cx={px(m.x)} cy={py(m.y)} r="5.5" fill="#fff" stroke={INK} strokeWidth="2.5" />
            {m.label && <text x={px(m.x) + 8} y={py(m.y) - 8} fontSize="12" fontWeight="700" fill={INK}>{m.label}</text>}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** A tree diagram: every outcome of one stage branches to every outcome of the next. */
export function TreeDiagram({ title, stages }: Pick<Of<"tree">, "title" | "stages">) {
  const ends = stages.reduce((n, st) => n * st.length, 1);
  const rowH = ends > 12 ? 16 : 22;
  const H = ends * rowH + 8;
  const colW = 84;
  const W = 36 + stages.length * colW + 10;
  type Node = { label: string; y: number; depth: number; kids: Node[] };
  /** Builds the subtree whose first leaf is row `first`; each node sits at the middle of its leaves. */
  const build = (depth: number, first: number): Node[] => {
    const below = stages.slice(depth + 1).reduce((k, st) => k * st.length, 1);
    return stages[depth].map((label, i) => {
      const kids = depth + 1 < stages.length ? build(depth + 1, first + i * below) : [];
      const y = kids.length ? (kids[0].y + kids[kids.length - 1].y) / 2 : 4 + (first + i + 0.5) * rowH;
      return { label, y, depth, kids };
    });
  };
  const roots = build(0, 0);
  const rootY = (roots[0].y + roots[roots.length - 1].y) / 2;
  const x = (depth: number) => 36 + depth * colW;
  const lines: ReactNode[] = [];
  const labels: ReactNode[] = [];
  const walk = (n: Node, px: number, py: number, key: string) => {
    const nx = x(n.depth);
    lines.push(<line key={`l${key}`} x1={px} y1={py} x2={nx - 3} y2={n.y} stroke={INK} strokeWidth="1.4" />);
    labels.push(
      <text key={`t${key}`} x={nx} y={n.y + 4} fontSize={ends > 12 ? 11 : 12} fontWeight="700" fill={n.depth === 0 ? "#2a78d6" : INK}>
        {n.label}
      </text>,
    );
    n.kids.forEach((k, i) => walk(k, nx + 4 + n.label.length * 6.2, n.y, `${key}.${i}`));
  };
  roots.forEach((r, i) => walk(r, 8, rootY, String(i)));
  return (
    <figure className="w-full max-w-md rounded-2xl border-[3px] border-line bg-white p-3">
      {title && <figcaption className="mb-1 text-center text-lg font-semibold">{title}</figcaption>}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full" style={{ maxWidth: 380 }} role="img" aria-label={`${title ?? "Tree diagram"}: ${stages.map((st) => st.join(", ")).join(", then ")}`}>
        {lines}
        {labels}
        <circle cx="8" cy={rootY} r="3.5" fill={INK} />
      </svg>
    </figure>
  );
}
