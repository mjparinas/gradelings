import type { CellPart, Diagram } from "@/content/diagrams/types";

// Drawings for science questions: circuits, plant and animal cells, the Moon's orbit, the seasons, and day and night.
// Plain SVG, no scripts, so they print, scale and work offline. `ScienceDiagram` is what the question visual shows.

const INK = "#253047";
const SUN = "#ffc83d";

function Bubble({ x, y, letter }: { x: number; y: number; letter: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="12" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>
        {letter}
      </text>
    </g>
  );
}

function SunDisc({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={i} x1={x + (r + 4) * Math.cos(a)} y1={y + (r + 4) * Math.sin(a)} x2={x + (r + 12) * Math.cos(a)} y2={y + (r + 12) * Math.sin(a)} stroke={SUN} strokeWidth="4" strokeLinecap="round" />;
      })}
      <circle cx={x} cy={y} r={r} fill={SUN} stroke="#e39b00" strokeWidth="3" />
    </g>
  );
}

function Arrow({ x1, y, x2 }: { x1: number; y: number; x2: number }) {
  return (
    <g stroke="#e39b00" strokeWidth="3" strokeLinecap="round" fill="none">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <path d={`M${x2 - 7} ${y - 6} L${x2} ${y} L${x2 - 7} ${y + 6}`} />
    </g>
  );
}

// ---------- Circuits ----------

function Bulb({ x, y, out }: { x: number; y: number; out: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill={out ? "#d9dde5" : "#fff3b0"} stroke={INK} strokeWidth="3" />
      {out ? (
        <g stroke={INK} strokeWidth="2" strokeLinecap="round">
          <line x1={x - 8} y1={y - 8} x2={x - 2} y2={y - 2} />
          <line x1={x + 2} y1={y + 2} x2={x + 8} y2={y + 8} />
          <line x1={x + 8} y1={y - 8} x2={x + 2} y2={y - 2} />
          <line x1={x - 2} y1={y + 2} x2={x - 8} y2={y + 8} />
        </g>
      ) : (
        <g stroke={INK} strokeWidth="2" strokeLinecap="round">
          <line x1={x - 8} y1={y - 8} x2={x + 8} y2={y + 8} />
          <line x1={x + 8} y1={y - 8} x2={x - 8} y2={y + 8} />
        </g>
      )}
      {out && (
        <text x={x} y={y + 34} textAnchor="middle" fontSize="12" fontWeight="700" fill="#b42318" stroke="#fff" strokeWidth="4" paintOrder="stroke">
          burnt out
        </text>
      )}
    </g>
  );
}

function Wire({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />;
}

function Battery({ y }: { y: number }) {
  return (
    <g>
      <rect x="14" y={y - 14} width="32" height="30" fill="#f5f7fb" />
      <line x1="14" y1={y - 8} x2="46" y2={y - 8} stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1={y + 8} x2="38" y2={y + 8} stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <text x="56" y={y - 3} fontSize="14" fontWeight="700" fill={INK}>
        +
      </text>
      <text x="56" y={y + 15} fontSize="16" fontWeight="700" fill={INK}>
        −
      </text>
    </g>
  );
}

function Switch({ x1, x2, y, state }: { x1: number; x2: number; y: number; state: "open" | "closed" }) {
  const tipY = state === "open" ? y - 24 : y;
  return (
    <g>
      <circle cx={x1} cy={y} r="4.5" fill={INK} />
      <circle cx={x2} cy={y} r="4.5" fill={INK} />
      <line x1={x1} y1={y} x2={state === "open" ? x2 - 8 : x2} y2={tipY} stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Circuit({ d }: { d: Extract<Diagram, { kind: "circuit" }> }) {
  const top = 34;
  const bottom = 144;
  const mid = (top + bottom) / 2;
  const sw = d.switch !== "none";
  const gapA = 62;
  const gapB = 82;
  // The top wire from the battery, with room for the switch and, if asked, a break.
  const swX1 = d.parallel ? 100 : 105;
  const swX2 = swX1 + 56;
  const bulbsX = d.parallel
    ? ({ 1: [200], 2: [170, 250], 3: [150, 210, 270] } as Record<number, number[]>)[d.bulbs]
    : ({ 1: [165], 2: [120, 210], 3: [95, 165, 235] } as Record<number, number[]>)[d.bulbs];
  const right = d.parallel ? bulbsX[bulbsX.length - 1] : 270;
  const topPieces: [number, number][] = [];
  let start = 30;
  if (d.gap) {
    topPieces.push([start, gapA]);
    start = gapB;
  }
  if (sw) {
    topPieces.push([start, swX1]);
    start = swX2;
  }
  topPieces.push([start, right]);
  return (
    <>
      <Wire d={`M30 ${top} L30 ${mid - 14}`} />
      <Wire d={`M30 ${mid + 16} L30 ${bottom}`} />
      {topPieces.map(([a, b], i) => (
        <Wire key={i} d={`M${a} ${top} L${b} ${top}`} />
      ))}
      {d.gap && (
        <g fill={INK}>
          <circle cx={gapA} cy={top} r="4.5" />
          <circle cx={gapB} cy={top} r="4.5" />
        </g>
      )}
      {sw && <Switch x1={swX1} x2={swX2} y={top} state={d.switch as "open" | "closed"} />}
      <Battery y={mid} />
      {d.parallel ? (
        <>
          <Wire d={`M30 ${bottom} L${right} ${bottom}`} />
          {bulbsX.map((x, i) => (
            <g key={i}>
              <Wire d={`M${x} ${top} L${x} ${bottom}`} />
              <Bulb x={x} y={mid} out={d.out === i} />
            </g>
          ))}
        </>
      ) : (
        <>
          <Wire d={`M270 ${top} L270 ${bottom} L30 ${bottom}`} />
          {bulbsX.map((x, i) => (
            <Bulb key={i} x={x} y={bottom} out={d.out === i} />
          ))}
        </>
      )}
    </>
  );
}

// ---------- Cells ----------

type Spot = { x: number; y: number; label: [number, number] };

const ANIMAL: Record<string, Spot> = {
  nucleus: { x: 150, y: 108, label: [150, 14] },
  mitochondria: { x: 84, y: 92, label: [-10, 40] },
  membrane: { x: 150 + 120 * Math.cos(0.5), y: 115 + 90 * Math.sin(0.5), label: [312, 190] },
};

const PLANT: Record<string, Spot> = {
  wall: { x: 25, y: 150, label: [-10, 190] },
  membrane: { x: 267, y: 112, label: [312, 112] },
  nucleus: { x: 70, y: 85, label: [-10, 60] },
  mitochondria: { x: 150, y: 52, label: [150, 12] },
  chloroplast: { x: 225, y: 62, label: [312, 40] },
  vacuole: { x: 150, y: 135, label: [150, 222] },
};

function Mitochondrion({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="17" ry="9" fill="#ffb36b" stroke="#c4691a" strokeWidth="2.5" />
      <path d={`M${x - 11} ${y} q4 -6 7 0 t7 0 t7 0`} fill="none" stroke="#c4691a" strokeWidth="2" />
    </g>
  );
}

function Chloroplast({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="18" ry="10" fill="#4cc36b" stroke="#1f8f45" strokeWidth="2.5" />
      <line x1={x - 8} y1={y - 5} x2={x - 8} y2={y + 5} stroke="#1f8f45" strokeWidth="2" />
      <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#1f8f45" strokeWidth="2" />
      <line x1={x + 8} y1={y - 5} x2={x + 8} y2={y + 5} stroke="#1f8f45" strokeWidth="2" />
    </g>
  );
}

function Cell({ d }: { d: Extract<Diagram, { kind: "cell" }> }) {
  const plant = d.cell === "plant";
  const spots = plant ? PLANT : ANIMAL;
  return (
    <>
      {plant ? (
        <>
          <rect x="25" y="25" width="250" height="180" rx="22" fill="#eaf7e2" stroke="#3f8f3a" strokeWidth="9" />
          <rect x="33" y="33" width="234" height="164" rx="16" fill="none" stroke="#8ccf7a" strokeWidth="3" />
          <ellipse cx="150" cy="125" rx="70" ry="48" fill="#cfe8ff" stroke="#5aa0e6" strokeWidth="3" />
          <circle cx="70" cy="85" r="22" fill="#cdbdf7" stroke="#7c4fe0" strokeWidth="3" />
          <circle cx="70" cy="85" r="8" fill="#7c4fe0" />
          <Mitochondrion x={150} y={52} />
          <Chloroplast x={225} y={62} rot={-15} />
          <Chloroplast x={240} y={165} rot={20} />
          <Chloroplast x={60} y={165} rot={-20} />
        </>
      ) : (
        <>
          <ellipse cx="150" cy="115" rx="120" ry="90" fill="#ffe9f0" stroke="#e9559a" strokeWidth="5" />
          <circle cx="150" cy="108" r="30" fill="#cdbdf7" stroke="#7c4fe0" strokeWidth="3" />
          <circle cx="150" cy="108" r="10" fill="#7c4fe0" />
          <Mitochondrion x={84} y={92} rot={-25} />
          <Mitochondrion x={208} y={152} rot={20} />
          <Mitochondrion x={95} y={162} rot={10} />
          {[[205, 75], [120, 160], [215, 110], [70, 130]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#b0508a" />
          ))}
        </>
      )}
      {(d.marks ?? []).map((m) => {
        const spot = spots[m.part as string];
        if (!spot) return null;
        return (
          <g key={m.letter}>
            <line x1={spot.x} y1={spot.y} x2={spot.label[0]} y2={spot.label[1]} stroke={INK} strokeWidth="2.5" />
            <circle cx={spot.x} cy={spot.y} r="4" fill={INK} />
            <Bubble x={spot.label[0]} y={spot.label[1]} letter={m.letter} />
          </g>
        );
      })}
    </>
  );
}

/** The cell parts a given kind of cell has. */
export const CELL_PARTS: Record<"plant" | "animal", CellPart[]> = {
  plant: ["wall", "membrane", "nucleus", "mitochondria", "chloroplast", "vacuole"],
  animal: ["membrane", "nucleus", "mitochondria"],
};

// ---------- The Moon, the seasons, day and night ----------

/** A moon with its sunlit half turned to the left (towards the Sun). */
function Moon({ x, y, r, big }: { x: number; y: number; r: number; big?: boolean }) {
  return (
    <g>
      {big && <circle cx={x} cy={y} r={r + 5} fill="none" stroke="#e9559a" strokeWidth="2.5" strokeDasharray="4 3" />}
      <circle cx={x} cy={y} r={r} fill="#59657d" stroke={INK} strokeWidth="2" />
      <path d={`M${x} ${y - r} A${r} ${r} 0 0 0 ${x} ${y + r} Z`} fill="#fff2a8" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="2" />
    </g>
  );
}

function Orbit({ d }: { d: Extract<Diagram, { kind: "orbit" }> }) {
  const ex = 195;
  const ey = 120;
  const R = 78;
  const at = (i: number): [number, number] => {
    const t = (i * Math.PI) / 4;
    return [ex - R * Math.cos(t), ey + R * Math.sin(t)];
  };
  return (
    <>
      <SunDisc x={46} y={ey} r={28} />
      <text x="46" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
        Sun
      </text>
      <Arrow x1={80} y={52} x2={122} />
      <Arrow x1={80} y={188} x2={122} />
      <circle cx={ex} cy={ey} r={R} fill="none" stroke="#9aa6bd" strokeWidth="2" strokeDasharray="6 5" />
      <circle cx={ex} cy={ey} r="20" fill="#4f8ef7" stroke={INK} strokeWidth="2.5" />
      <path d="M190 112 q6 -8 12 0 q-2 8 -8 8 z M203 128 q6 -2 8 4 q-4 6 -8 0 z" fill="#3fae6b" />
      <text x={ex} y={ey + 38} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
        Earth
      </text>
      {d.spots.map((s) => {
        const [x, y] = at(s.index);
        const out = Math.hypot(x - ex, y - ey);
        const lx = ex + ((x - ex) / out) * (R + 24);
        const ly = ey + ((y - ey) / out) * (R + 24);
        return (
          <g key={s.index}>
            <Moon x={x} y={y} r={11} />
            {s.letter && <Bubble x={lx} y={ly} letter={s.letter} />}
          </g>
        );
      })}
      {d.moonAt !== undefined &&
        (() => {
          const [x, y] = at(d.moonAt);
          return <Moon x={x} y={y} r={13} big />;
        })()}
    </>
  );
}

function Earth({ x, y, r, tilt, sunX, sunY }: { x: number; y: number; r: number; tilt: boolean; sunX: number; sunY: number }) {
  const toSun = (Math.atan2(sunY - y, sunX - x) * 180) / Math.PI;
  const u = [Math.sin((23.5 * Math.PI) / 180), -Math.cos((23.5 * Math.PI) / 180)];
  return (
    <g>
      {tilt && <line x1={x - u[0] * (r + 11)} y1={y - u[1] * (r + 11)} x2={x + u[0] * (r + 11)} y2={y + u[1] * (r + 11)} stroke={INK} strokeWidth="2.5" strokeDasharray="3 2" />}
      <circle cx={x} cy={y} r={r} fill="#2c3a5c" stroke={INK} strokeWidth="2" />
      <g transform={`rotate(${toSun - 180} ${x} ${y})`}>
        <path d={`M${x} ${y - r} A${r} ${r} 0 0 0 ${x} ${y + r} Z`} fill="#4f8ef7" />
      </g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="2.5" />
      {tilt && (
        <text x={x + u[0] * (r + 21)} y={y + u[1] * (r + 21) + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>
          N
        </text>
      )}
    </g>
  );
}

function Seasons({ d }: { d: Extract<Diagram, { kind: "seasons" }> }) {
  const sx = 160;
  const sy = 125;
  const R = 92;
  const places: [number, number][] = [
    [sx - R, sy],
    [sx, sy - R],
    [sx + R, sy],
    [sx, sy + R],
  ];
  const bubbles: [number, number][] = [
    [places[0][0] - 36, places[0][1]],
    [places[1][0] - 38, places[1][1]],
    [places[2][0] + 36, places[2][1]],
    [places[3][0] - 38, places[3][1]],
  ];
  return (
    <>
      <circle cx={sx} cy={sy} r={R} fill="none" stroke="#9aa6bd" strokeWidth="2" strokeDasharray="6 5" />
      <SunDisc x={sx} y={sy} r={24} />
      <text x={sx} y={sy + 50} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
        Sun
      </text>
      {places.map(([x, y], i) => (
        <g key={i}>
          <Earth x={x} y={y} r={16} tilt sunX={sx} sunY={sy} />
          <Bubble x={bubbles[i][0]} y={bubbles[i][1]} letter={d.letters[i]} />
        </g>
      ))}
    </>
  );
}

function DayNight({ d }: { d: Extract<Diagram, { kind: "daynight" }> }) {
  const ex = 215;
  const ey = 110;
  const r = 74;
  return (
    <>
      <SunDisc x={36} y={ey} r={26} />
      <Arrow x1={76} y={ey - 52} x2={100} />
      <Arrow x1={76} y={ey} x2={100} />
      <Arrow x1={76} y={ey + 52} x2={100} />
      <circle cx={ex} cy={ey} r={r} fill="#4f8ef7" stroke={INK} strokeWidth="3" />
      <path d="M180 80 q14 -14 26 -2 q4 14 -10 20 q-14 -2 -16 -18 z M175 130 q10 -8 22 2 q0 14 -12 16 q-12 -4 -10 -18 z" fill="#3fae6b" />
      <path d={`M${ex} ${ey - r} A${r} ${r} 0 0 1 ${ex} ${ey + r} Z`} fill="#141c33" opacity="0.82" />
      <circle cx={ex} cy={ey} r={r} fill="none" stroke={INK} strokeWidth="3" />
      {d.dots.map((p) => {
        const a = (p.angle * Math.PI) / 180;
        const rim: [number, number] = [ex + r * Math.cos(a), ey - r * Math.sin(a)];
        const out: [number, number] = [ex + (r + 24) * Math.cos(a), ey - (r + 24) * Math.sin(a)];
        return (
          <g key={p.letter}>
            <line x1={rim[0]} y1={rim[1]} x2={out[0]} y2={out[1]} stroke={INK} strokeWidth="2.5" />
            <circle cx={rim[0]} cy={rim[1]} r="4.5" fill="#fff" stroke={INK} strokeWidth="2" />
            <Bubble x={out[0]} y={out[1]} letter={p.letter} />
          </g>
        );
      })}
    </>
  );
}

const BOX: Record<Diagram["kind"], string> = {
  circuit: "0 0 300 192",
  cell: "-30 0 360 232",
  orbit: "0 -8 320 262",
  seasons: "0 -12 320 268",
  daynight: "0 0 330 220",
};

export function ScienceDiagram({ diagram, label }: { diagram: Diagram; label: string }) {
  return (
    <svg viewBox={BOX[diagram.kind]} className="w-full max-w-sm" role="img" aria-label={label}>
      {diagram.kind === "circuit" && <Circuit d={diagram} />}
      {diagram.kind === "cell" && <Cell d={diagram} />}
      {diagram.kind === "orbit" && <Orbit d={diagram} />}
      {diagram.kind === "seasons" && <Seasons d={diagram} />}
      {diagram.kind === "daynight" && <DayNight d={diagram} />}
    </svg>
  );
}
