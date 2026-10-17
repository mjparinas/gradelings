import { liveDesks, livePercents, type DeskState } from "@/lib/live";

// A desk for every student in the class: white until they answer, then green (right) or red (wrong).
// Colour is never the only sign: each desk also carries a mark and a word for screen readers.

const LOOK: Record<DeskState, { top: string; edge: string; mark: string; word: string }> = {
  waiting: { top: "#ffffff", edge: "#94a3b8", mark: "", word: "not answered yet" },
  right: { top: "#86efac", edge: "#15803d", mark: "✓", word: "answered right" },
  wrong: { top: "#fca5a5", edge: "#b91c1c", mark: "✗", word: "answered wrong" },
};

function Desk({ state }: { state: DeskState }) {
  const l = LOOK[state];
  return (
    <svg viewBox="0 0 100 70" className="h-auto w-full" aria-hidden="true" focusable="false">
      <rect x="14" y="48" width="6" height="20" rx="2" fill={l.edge} />
      <rect x="80" y="48" width="6" height="20" rx="2" fill={l.edge} />
      <path d="M10 14h80l6 34H4z" fill={l.top} stroke={l.edge} strokeWidth="3" strokeLinejoin="round" />
      <rect x="4" y="46" width="92" height="6" rx="2" fill={l.edge} />
    </svg>
  );
}

export function LiveDesks({ students, answers, hideNames }: { students: { profileId: string; name: string }[]; answers: { profileId: string; correct: boolean }[]; hideNames: boolean }) {
  const desks = liveDesks(students, answers);
  const pct = livePercents(desks);
  const rightN = desks.filter((d) => d.state === "right").length;
  const wrongN = desks.filter((d) => d.state === "wrong").length;
  return (
    <div className="mt-4" aria-label="Classroom desks">
      <p className="font-read font-bold" role="status">
        <span className="mr-4">✓ {pct.right}% got it right ({rightN})</span>
        <span>✗ {pct.wrong}% got it wrong ({wrongN})</span>
      </p>
      <ul className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3">
        {desks.map((d, i) => (
          <li key={d.profileId} className="relative text-center" aria-label={`${hideNames ? `Desk ${i + 1}` : d.name}: ${LOOK[d.state].word}`}>
            <Desk state={d.state} />
            {LOOK[d.state].mark && <b className="absolute right-1 top-0 text-lg text-[#0f172a]" aria-hidden="true">{LOOK[d.state].mark}</b>}
            <span className="block truncate text-sm font-bold" aria-hidden="true">{hideNames ? i + 1 : d.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
