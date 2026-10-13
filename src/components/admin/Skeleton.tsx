import type { ReactNode } from "react";

// Placeholders the admin panel shows where something is still loading: grey bars in the shape of what's coming,
// so every tile is on screen at once and fills in when its answer arrives. The pulse only runs when motion is
// welcome, and a screen reader hears "Loading…" once instead of the bars.

const bar = "rounded bg-[#eef2f7]";
const card = "rounded-2xl border border-line bg-white p-4";

/** Grey bars, one per width, for use inside a card that is already drawn. */
export function Bars({ widths = ["w-3/4", "w-full", "w-5/6"], className = "" }: { widths?: string[]; className?: string }) {
  return (
    <span aria-hidden="true" className={`flex flex-col gap-2 motion-safe:animate-pulse ${className}`}>
      {widths.map((w, i) => (
        <span key={i} className={`block h-3 ${w} ${bar}`} />
      ))}
    </span>
  );
}

/** A region still loading: says so to screen readers and hides the placeholder shapes from them. */
export function Loading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div aria-busy="true" className={className}>
      <p className="sr-only">Loading…</p>
      <div aria-hidden="true" className="motion-safe:animate-pulse">
        {children}
      </div>
    </div>
  );
}

/** A tile: a label, a big number and a line under it. */
export function TileShape({ label }: { label?: string }) {
  return (
    <div className={`${card} flex flex-col gap-2`}>
      {label ? <span className="block text-sm font-semibold text-ink-soft">{label}</span> : <span className={`block h-3 w-2/3 ${bar}`} />}
      <span className={`block h-7 w-1/2 ${bar}`} />
      <span className={`block h-3 w-3/4 ${bar}`} />
    </div>
  );
}

/** A chart: a title and a block. */
export function ChartShape() {
  return (
    <div className={`${card} flex flex-col gap-2`}>
      <span className={`block h-4 w-1/2 ${bar}`} />
      <span className={`block h-40 w-full ${bar}`} />
    </div>
  );
}

/** Rows of a list or table. */
export function RowsShape({ rows = 5, boxed = true }: { rows?: number; boxed?: boolean }) {
  return (
    <div className={`${boxed ? card : ""} flex flex-col divide-y divide-line`}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
          <span className={`block h-4 w-2/3 ${bar}`} />
          <span className={`block h-3 w-1/2 ${bar}`} />
        </div>
      ))}
    </div>
  );
}

/** Cards in a list: a heading line and a few lines of text each. */
export function CardsShape({ count = 3, className = "flex flex-col gap-3" }: { count?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`${card} flex flex-col gap-2`}>
          <span className={`block h-5 w-1/3 ${bar}`} />
          <span className={`block h-3 w-full ${bar}`} />
          <span className={`block h-3 w-5/6 ${bar}`} />
        </div>
      ))}
    </div>
  );
}

/** A loading list of rows, as one call. */
export const LoadingRows = ({ rows = 5, className = "mt-3" }: { rows?: number; className?: string }) => (
  <Loading className={className}>
    <RowsShape rows={rows} />
  </Loading>
);

/** A loading list of cards, as one call. */
export const LoadingCards = ({ count = 3, className = "mt-3" }: { count?: number; className?: string }) => (
  <Loading className={className}>
    <CardsShape count={count} />
  </Loading>
);

/** Table rows of grey bars, for a table whose header is already drawn. */
export function TableRowsShape({ cols, rows = 4 }: { cols: number; rows?: number }) {
  return (
    <>
      <tr className="sr-only">
        <td colSpan={cols}>Loading…</td>
      </tr>
      {Array.from({ length: rows }, (_, r) => (
        <tr key={r} aria-hidden="true" className="border-b border-line last:border-0">
          {Array.from({ length: cols }, (_, c) => (
            <td key={c} className="p-3">
              <span className={`block h-3 ${c === 0 ? "w-3/4" : "w-1/2"} rounded bg-[#eef2f7] motion-safe:animate-pulse`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
