import { mapAlt, type CompassPoint, type MapVisual } from "@/content/mapVisual";

const INK = "#253047";

// Where each letter sits on a 100 × 100 rose, and where a picture "at" that direction goes (just inside the letter).
const LETTER: Record<CompassPoint, [number, number]> = { N: [50, 13], E: [88, 55], S: [50, 96], W: [12, 55] };
const SPOT: Record<CompassPoint, [number, number]> = { N: [50, 33], E: [70, 56], S: [50, 78], W: [30, 56] };

/** A compass rose: a four-pointed star with N, E, S and W around it. North is at the top, as on every map. */
export function CompassRose({
  size = 150,
  mark,
  center,
  around = [],
  label,
}: {
  size?: number;
  mark?: CompassPoint;
  center?: string;
  around?: { at: CompassPoint; emoji: string }[];
  /** Hide the rose from screen readers (inside a map, whose own label already says north is at the top). */
  label?: string;
}) {
  const body = (
    <>
      <circle cx="50" cy="55" r="40" fill="#fff" stroke="#c9d3e6" strokeWidth="2.5" />
      <polygon points="50,22 56,49 50,55 44,49" fill="#e9559a" />
      <polygon points="50,88 44,61 50,55 56,61" fill="#c9d3e6" />
      <polygon points="78,55 61,49 55,55 61,61" fill="#c9d3e6" />
      <polygon points="22,55 39,49 45,55 39,61" fill="#c9d3e6" />
      {mark && <circle cx={LETTER[mark][0]} cy={LETTER[mark][1] - 4} r="9.5" fill="none" stroke="#ff9636" strokeWidth="3" />}
      {(Object.keys(LETTER) as CompassPoint[]).map((p) => (
        <text key={p} x={LETTER[p][0]} y={LETTER[p][1]} textAnchor="middle" fontSize="13" fontWeight="800" fill={INK} fontFamily="inherit">
          {p}
        </text>
      ))}
      {around.map((a) => (
        <text key={a.at} x={SPOT[a.at][0]} y={SPOT[a.at][1] + 6} textAnchor="middle" fontSize="17">
          {a.emoji}
        </text>
      ))}
      {center && (
        <text x="50" y="62" textAnchor="middle" fontSize="20">
          {center}
        </text>
      )}
    </>
  );
  const common = { width: size, height: size, viewBox: "0 0 100 100", className: "shrink-0" };
  return label ? (
    <svg {...common} role="img" aria-label={label}>
      {body}
    </svg>
  ) : (
    <svg {...common} aria-hidden="true">
      {body}
    </svg>
  );
}

/** A town map drawn as tiles, with north at the top and a compass rose beside it. */
export function TownMap({ visual }: { visual: Extract<MapVisual, { type: "map" }> }) {
  const cols = Math.max(...visual.rows.map((r) => r.length));
  const named = Boolean(visual.cols || visual.rowLabels);
  const labelClass = "flex items-center justify-center font-display text-sm font-bold text-ink-soft";
  return (
    <figure role="img" aria-label={mapAlt(visual)} className="flex w-full max-w-md flex-col items-center gap-2">
      {visual.title && <figcaption className="font-display text-base font-bold text-ink-soft">{visual.title}</figcaption>}
      <div className="flex w-full items-start justify-center gap-2" aria-hidden="true">
        <div
          className="grid min-w-0 flex-1 gap-1 rounded-2xl border-[3px] border-[#bcd9b0] bg-[#eaf6e4] p-1.5"
          style={{ gridTemplateColumns: `${named ? "1.5rem " : ""}repeat(${cols}, minmax(0, 1fr))` }}
        >
          {visual.cols && (
            <>
              {named && <span />}
              {visual.cols.map((c) => (
                <span key={c} className={labelClass}>
                  {c}
                </span>
              ))}
            </>
          )}
          {visual.rows.map((row, r) => (
            <div key={r} className="contents">
              {named && <span className={labelClass}>{visual.rowLabels?.[r] ?? ""}</span>}
              {row.map((cell, c) => (
                <div
                  key={c}
                  className={`flex min-h-[3.75rem] flex-col items-center justify-center rounded-xl px-0.5 py-1 text-center ${cell ? "border-2 border-[#d3e6c8] bg-white" : ""}`}
                >
                  {cell && (
                    <>
                      <span className="text-3xl leading-none">{cell.emoji}</span>
                      {cell.label && <span className="mt-0.5 font-read text-[0.7rem] leading-tight text-ink-soft sm:text-xs">{cell.label}</span>}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {visual.compass !== false && <CompassRose size={76} />}
      </div>
    </figure>
  );
}

export function MapPicture({ visual }: { visual: MapVisual }) {
  if (visual.type === "compass") return <CompassRose size={170} mark={visual.mark} center={visual.center} around={visual.around} label={mapAlt(visual)} />;
  return <TownMap visual={visual} />;
}
