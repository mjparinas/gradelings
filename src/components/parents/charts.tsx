"use client";

import { useState, type ReactNode } from "react";

// Small, accessible SVG charts for parent reports. Single-series charts use
// one blue; the proficiency chart uses a light-to-dark blue ramp (an ordered
// scale). Every chart has hover tooltips and a table view.

const BLUE = "#2a78d6";
const GRID = "#e6e6e3";
const TEXT_2 = "#52514e";
export const LEVEL_RAMP = ["#b7d3f6", "#6da7ec", "#2a78d6", "#104281"];
export const NOT_STARTED = "#e3e2de";

export function niceMax(v: number): number {
  if (v <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function ChartFrame({ title, subtitle, table, children }: { title: string; subtitle?: string; table: ReactNode; children: ReactNode }) {
  const [showTable, setShowTable] = useState(false);
  return (
    <figure className="rounded-2xl border border-line bg-[#fcfcfb] p-4">
      <figcaption className="mb-3 flex items-start justify-between gap-3">
        <span>
          <span className="block text-lg font-bold text-[#0b0b0b]">{title}</span>
          {subtitle && <span className="block text-sm text-[#52514e]">{subtitle}</span>}
        </span>
        <button type="button" className="shrink-0 rounded-lg border border-line px-2.5 py-1 text-sm font-semibold text-[#52514e] hover:bg-black/5" onClick={() => setShowTable((s) => !s)}>
          {showTable ? "Chart" : "Table"}
        </button>
      </figcaption>
      {showTable ? <div className="max-h-72 overflow-auto">{table}</div> : children}
    </figure>
  );
}

function Tooltip({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-[#1d2233] px-2.5 py-1.5 text-sm whitespace-nowrap text-white shadow-lg"
      style={{ left: `${x}%`, top: `${y}%` }}
      role="tooltip"
    >
      {children}
    </div>
  );
}

function SimpleTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="border-b border-line py-1 pr-3 font-semibold text-[#52514e]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="border-b border-line/60 py-1 pr-3 tabular-nums">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Vertical columns, one series (e.g. minutes per day). */
export function ColumnChart({
  title,
  subtitle,
  data,
  format = (v) => String(Math.round(v)),
  unit,
  xLabel = "Day",
  floor = 1,
}: {
  title: string;
  subtitle?: string;
  data: { label: string; value: number; detail?: string }[];
  format?: (v: number) => string;
  unit: string;
  /** Heading of the first column in the table view. */
  xLabel?: string;
  /** The scale reaches at least this high, so a chart of small or zero values still has a sensible axis. */
  floor?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 200;
  const bottom = 26;
  // Values below zero (a month that lost money) hang from a zero line instead of the bottom.
  const lowest = Math.min(...data.map((d) => d.value), 0);
  const highest = Math.max(...data.map((d) => d.value), lowest < 0 ? 0 : floor);
  const max = highest > 0 ? niceMax(highest) : 0;
  const min = lowest < 0 ? -niceMax(-lowest) : 0;
  const ticks = min < 0 ? [min, 0, ...(max > 0 ? [max] : [])] : Number.isInteger(max / 2) ? [0, max / 2, max] : [0, max];
  const left = Math.max(34, 7 * Math.max(...ticks.map((t) => format(t).length)) + 10);
  const band = (W - left) / data.length;
  const bw = Math.min(24, band * 0.6);
  const y = (v: number) => H - bottom - ((v - min) / (max - min)) * (H - bottom - 8);
  const base = y(0);
  const labelEvery = Math.ceil(data.length / 7);

  return (
    <ChartFrame title={title} subtitle={subtitle} table={<SimpleTable headers={[xLabel, unit]} rows={data.map((d) => [d.label, format(d.value)])} />}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={title} onMouseLeave={() => setHover(null)}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={left} x2={W} y1={y(t)} y2={y(t)} stroke={t === 0 && min < 0 ? "#b9b8b3" : GRID} strokeWidth="1" />
              <text x={left - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill={TEXT_2}>
                {format(t)}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const cx = left + band * i + band / 2;
            const top = y(d.value);
            const h = base - top;
            const r = Math.min(4, h);
            const opacity = hover === null || hover === i ? 1 : 0.55;
            return (
              <g key={i}>
                {d.value > 0 && (
                  <path
                    d={`M${cx - bw / 2} ${base} V${top + r} Q${cx - bw / 2} ${top} ${cx - bw / 2 + r} ${top} H${cx + bw / 2 - r} Q${cx + bw / 2} ${top} ${cx + bw / 2} ${top + r} V${base} Z`}
                    fill={BLUE}
                    opacity={opacity}
                  />
                )}
                {d.value < 0 && <rect x={cx - bw / 2} y={base} width={bw} height={top - base} fill={BLUE} opacity={opacity} />}
                {i % labelEvery === 0 && (
                  <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill={TEXT_2}>
                    {d.label}
                  </text>
                )}
                <rect x={left + band * i} y="0" width={band} height={H - bottom} fill="transparent" onMouseEnter={() => setHover(i)} onClick={() => setHover(i)} />
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <Tooltip x={((left + band * hover + band / 2) / W) * 100} y={(Math.min(y(data[hover].value), base) / H) * 100}>
            <b>{data[hover].label}</b> · {format(data[hover].value)} {unit}
            {data[hover].detail && <span className="block text-white/75">{data[hover].detail}</span>}
          </Tooltip>
        )}
      </div>
    </ChartFrame>
  );
}

/** A line over time with a crosshair (e.g. weekly accuracy). Gaps where there's no data. */
export function LineChart({
  title,
  subtitle,
  data,
  format,
  max = 1,
  xLabel = "Week of",
}: {
  title: string;
  subtitle?: string;
  data: { label: string; value: number | null; detail?: string }[];
  format: (v: number) => string;
  max?: number;
  /** Heading of the first column in the table view, and the tooltip's lead-in when it is "Week of". */
  xLabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 200;
  const left = 40;
  const bottom = 26;
  const x = (i: number) => left + (i / Math.max(1, data.length - 1)) * (W - left - 12);
  const y = (v: number) => H - bottom - (v / max) * (H - bottom - 10);
  const segments: string[] = [];
  let current = "";
  data.forEach((d, i) => {
    if (d.value === null) {
      if (current) segments.push(current);
      current = "";
    } else current += `${current ? "L" : "M"}${x(i)} ${y(d.value)} `;
  });
  if (current) segments.push(current);
  const lastIdx = data.map((d) => d.value !== null).lastIndexOf(true);

  return (
    <ChartFrame title={title} subtitle={subtitle} table={<SimpleTable headers={[xLabel, "Value"]} rows={data.map((d) => [d.label, d.value === null ? "–" : format(d.value)])} />}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label={title}
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * W;
            const i = Math.round(((px - left) / (W - left - 12)) * (data.length - 1));
            setHover(Math.max(0, Math.min(data.length - 1, i)));
          }}
        >
          {[0, 0.5, 1].map((t) => (
            <g key={t}>
              <line x1={left} x2={W} y1={y(t * max)} y2={y(t * max)} stroke={GRID} strokeWidth="1" />
              <text x={left - 6} y={y(t * max) + 4} textAnchor="end" fontSize="11" fill={TEXT_2}>
                {format(t * max)}
              </text>
            </g>
          ))}
          {data.map((d, i) =>
            i % 2 === 0 ? (
              <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={TEXT_2}>
                {d.label}
              </text>
            ) : null,
          )}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1="6" y2={H - bottom} stroke="#b9b8b3" strokeWidth="1" />}
          {segments.map((s, i) => (
            <path key={i} d={s} fill="none" stroke={BLUE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {data.map((d, i) =>
            d.value !== null && (i === lastIdx || i === hover) ? <circle key={i} cx={x(i)} cy={y(d.value)} r="5" fill={BLUE} stroke="#fcfcfb" strokeWidth="2" /> : null,
          )}
          {lastIdx >= 0 && data[lastIdx].value !== null && (
            <text x={x(lastIdx) - 8} y={y(data[lastIdx].value!) - 10} textAnchor="end" fontSize="12" fontWeight="700" fill="#0b0b0b">
              {format(data[lastIdx].value!)}
            </text>
          )}
        </svg>
        {hover !== null && data[hover].value !== null && (
          <Tooltip x={(x(hover) / W) * 100} y={(y(data[hover].value!) / H) * 100 - 4}>
            <b>{xLabel === "Week of" ? `Week of ${data[hover].label}` : data[hover].label}</b> · {format(data[hover].value!)}
            {data[hover].detail && <span className="block text-white/75">{data[hover].detail}</span>}
          </Tooltip>
        )}
      </div>
    </ChartFrame>
  );
}

/** Horizontal bars with row labels (e.g. questions per subject). */
export function RowBars({
  title,
  subtitle,
  rows,
  headers = ["Subject", "Questions", "Detail"],
  empty = "No practice in this period yet.",
}: {
  title: string;
  subtitle?: string;
  rows: { label: string; value: number; note: string }[];
  /** Table view headings: the row label, the value and the note. */
  headers?: [string, string, string];
  empty?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <ChartFrame title={title} subtitle={subtitle} table={<SimpleTable headers={headers} rows={rows.map((r) => [r.label, r.value, r.note])} />}>
      {rows.length === 0 ? (
        <p className="text-sm text-[#52514e]">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((r, i) => (
            <li key={r.label} className="grid grid-cols-[7rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <span className="truncate text-sm font-semibold text-[#0b0b0b]">{r.label}</span>
              <span className="flex items-center gap-2">
                <span className="h-5 rounded-r-[4px]" style={{ width: `${Math.max(2, (r.value / max) * 80)}%`, background: BLUE, opacity: hover === null || hover === i ? 1 : 0.55 }} />
                <span className="text-sm whitespace-nowrap text-[#52514e] tabular-nums">
                  {r.value} · {r.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </ChartFrame>
  );
}

/** How many units sit at each proficiency level, per subject. */
export function LevelStacks({
  title,
  subtitle,
  levels,
  rows,
}: {
  title: string;
  subtitle?: string;
  levels: string[];
  rows: { label: string; counts: number[]; notStarted: number }[];
}) {
  const [hover, setHover] = useState<{ row: number; seg: number } | null>(null);
  const names = [...levels, "Not started"];
  const colours = [...LEVEL_RAMP, NOT_STARTED];
  return (
    <ChartFrame
      title={title}
      subtitle={subtitle}
      table={<SimpleTable headers={["Subject", ...names]} rows={rows.map((r) => [r.label, ...r.counts, r.notStarted])} />}
    >
      <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#52514e]" aria-label="Legend">
        {names.map((n, i) => (
          <li key={n} className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: colours[i] }} />
            {n}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-3">
        {rows.map((r, ri) => {
          const segs = [...r.counts, r.notStarted];
          const total = segs.reduce((a, b) => a + b, 0) || 1;
          return (
            <li key={r.label} className="grid grid-cols-[7rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]">
              <span className="truncate text-sm font-semibold text-[#0b0b0b]">{r.label}</span>
              <span className="relative flex h-6 gap-[2px]">
                {segs.map((n, si) =>
                  n > 0 ? (
                    <span
                      key={si}
                      className="relative h-full first:rounded-l-[4px] last:rounded-r-[4px]"
                      style={{ width: `${(n / total) * 100}%`, background: colours[si] }}
                      onMouseEnter={() => setHover({ row: ri, seg: si })}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setHover({ row: ri, seg: si })}
                    >
                      {hover?.row === ri && hover.seg === si && (
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-lg bg-[#1d2233] px-2 py-1 text-xs whitespace-nowrap text-white">
                          {names[si]}: {n} unit{n === 1 ? "" : "s"}
                        </span>
                      )}
                    </span>
                  ) : null,
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </ChartFrame>
  );
}

export function StatTile({ label, value, sub, delta }: { label: string; value: string; sub?: string; delta?: { text: string; good: boolean } }) {
  return (
    <div className="rounded-2xl border border-line bg-[#fcfcfb] p-4">
      <p className="text-sm font-semibold text-[#52514e]">{label}</p>
      <p className="mt-1 text-3xl font-bold text-[#0b0b0b] tabular-nums">{value}</p>
      {sub && <p className="text-sm text-[#52514e]">{sub}</p>}
      {delta && (
        <p className="mt-1 text-sm font-semibold text-[#52514e]">
          <span aria-hidden="true">{delta.good ? "▲" : "▼"}</span> {delta.text}
        </p>
      )}
    </div>
  );
}
