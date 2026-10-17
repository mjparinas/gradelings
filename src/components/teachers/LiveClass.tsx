"use client";

import { useCallback, useEffect, useState } from "react";
import { SelectMenu, type MenuGroup } from "@/components/SelectMenu";
import { QuestionVisual } from "@/components/visuals";
import { call } from "@/lib/classroom";
import { APP_NAME } from "@/lib/brand";
import { LIVE_POLL_TEACHER_MS, liveCounts, liveRecapItem, liveRecapText, type LiveForTeacher } from "@/lib/live";
import { LiveDesks } from "./LiveDesks";
import type { ClassDetail } from "./TeacherApp";

// Live questions: the teacher asks the class one multiple-choice question from a unit and watches
// the answers come in. Students see it on their home screen while their device is online. It sits
// beside homework, never instead of it, and the answers don't change anyone's practice levels.

const btn = "min-h-11 rounded-xl px-4 font-bold";

export function LiveClass({ data, label, unitGroups }: { data: ClassDetail; label: (key: string) => string; unitGroups: MenuGroup[] }) {
  const classId = data.class.id;
  const [live, setLive] = useState<LiveForTeacher | null>(null);
  const [pick, setPick] = useState(data.assignments[0] ?? "");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  // Read-aloud on students' devices: chosen before asking, and changeable while a question is open.
  const [readAloudNext, setReadAloudNext] = useState(true);
  // Projector view: bigger text, and no student names on screen.
  const [present, setPresent] = useState(false);
  // The last refresh failed (offline, signed out, server trouble), so the tally on screen may be out of date.
  const [stale, setStale] = useState(false);

  const refresh = useCallback(
    () =>
      call<{ live: LiveForTeacher | null }>(`/api/classes/live/?classId=${encodeURIComponent(classId)}`)
        .then((r) => {
          setLive(r.live);
          setStale(false);
        })
        .catch(() => setStale(true)),
    [classId],
  );
  useEffect(() => {
    void refresh();
  }, [refresh]);
  // While a question takes answers, refresh the tally every few seconds.
  const open = Boolean(live && !live.revealed);
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, LIVE_POLL_TEACHER_MS);
    return () => clearInterval(t);
  }, [open, refresh]);

  const act = async (method: string, body?: unknown, url = "/api/classes/live/") => {
    setErr("");
    setBusy(true);
    try {
      setLive((await call<{ live: LiveForTeacher | null }>(url, method, body)).live);
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };
  const readAloud = live ? live.question.readAloud !== false : readAloudNext;
  const ask = (unitKey: string) => act("POST", { classId, unitKey, readAloud });
  const setReadAloud = (on: boolean) => (live ? act("PATCH", { classId, action: "read-aloud", on }) : setReadAloudNext(on));

  const [recap, setRecap] = useState<LiveForTeacher[] | null>(null);
  const [copied, setCopied] = useState(false);
  const showRecap = async () => {
    setErr("");
    try {
      setRecap((await call<{ recap: LiveForTeacher[] }>(`/api/classes/live/?classId=${encodeURIComponent(classId)}&recap=1`)).recap);
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  const names = new Map(data.students.map((s) => [s.profileId, s.name]));
  const answered = new Set(live?.answers.map((a) => a.profileId));
  const waiting = data.students.filter((s) => !answered.has(s.profileId)).map((s) => s.name);
  const counts = live ? liveCounts(live.question, live.answers) : [];
  const most = Math.max(1, ...counts.map((c) => c.count));

  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5" aria-label="Live questions">
      <h2 className="text-xl font-bold">Live questions</h2>
      <p className="mt-1 font-read text-ink-soft">
        Ask the class one question at a time and watch the answers come in. Students see it on their home screen while their device is online. Live answers don’t change anyone’s practice levels, and they are deleted after a day.
      </p>
      {stale && (
        <p role="status" className="mt-3 rounded-xl bg-nudge/30 px-3 py-2 font-read font-semibold">
          Lost the connection. Trying again. The answers below may be out of date.
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-x-6">
        <label className="flex min-h-11 items-center gap-2 font-semibold">
          <input type="checkbox" className="h-5 w-5" checked={readAloud} onChange={(e) => void setReadAloud(e.target.checked)} />
          Let students hear the question read aloud
        </label>
        <label className="flex min-h-11 items-center gap-2 font-semibold">
          <input type="checkbox" className="h-5 w-5" checked={present} onChange={(e) => setPresent(e.target.checked)} />
          Projector view (bigger text, no names)
        </label>
      </div>
      {!live ? (
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <SelectMenu label="Ask from" value={pick} onChange={setPick} options={[{ value: "", label: "Choose a unit…" }]} groups={unitGroups} />
          <button type="button" disabled={!pick || busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`} onClick={() => void ask(pick)}>
            Ask a live question
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-sm font-semibold text-ink-soft">{label(live.unitKey)}</p>
          <p lang={live.question.lang} className={`mt-1 font-read font-bold ${present ? "text-4xl" : "text-2xl"}`}>
            {live.question.prompt}
          </p>
          {live.question.visual && (
            <div lang={live.question.visualLang ?? live.question.lang} className="mt-2 max-w-md">
              <QuestionVisual visual={live.question.visual} />
            </div>
          )}
          <ul className="mt-3 flex flex-col gap-2" aria-label="Answers so far">
            {live.question.choices.map((c, i) => {
              const n = counts[i]?.count ?? 0;
              const right = c.id === live.question.answer;
              return (
                <li key={c.id} className={`font-read ${present ? "text-3xl" : ""}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span lang={live.question.choicesLang ?? live.question.lang}>
                      {c.emoji} {c.label}
                      {right && <b className="text-sm"> ✓ answer</b>}
                    </span>
                    <b>{n}</b>
                  </span>
                  <span className="progress-track mt-1 block h-3 overflow-hidden rounded-full bg-black/10">
                    <span className="progress-fill block h-full rounded-full bg-[#2a78d6]" style={{ width: `${(n / most) * 100}%` }} />
                  </span>
                </li>
              );
            })}
          </ul>
          <p className={`mt-3 font-read ${present ? "text-2xl" : ""}`} role="status">
            <b>
              {live.answers.length} of {data.students.length}
            </b>{" "}
            answered{live.revealed ? " · answer shown to the class" : ""}
          </p>
          <LiveDesks students={data.students} answers={live.answers} hideNames={present} />
          {!present && live.answers.length > 0 && (
            <p className="font-read text-sm text-ink-soft">
              Answered: {live.answers.map((a) => `${names.get(a.profileId) ?? "Student"}${live.revealed ? (a.correct ? " ✓" : "") : ""}`).join(", ")}
            </p>
          )}
          {!present && waiting.length > 0 && !live.revealed && <p className="font-read text-sm text-ink-soft">Waiting for: {waiting.join(", ")}</p>}
          {!present && live.next && (
            <div className="mt-4 rounded-xl border border-dashed border-line p-3" aria-label="Next question preview">
              <p className="text-sm font-semibold text-ink-soft">Up next · only you can see this</p>
              <p lang={live.next.lang} className="mt-1 font-read font-bold">
                {live.next.prompt}
              </p>
              {live.next.visual && (
                <div lang={live.next.visualLang ?? live.next.lang} className="mt-2 max-w-sm">
                  <QuestionVisual visual={live.next.visual} />
                </div>
              )}
              <p lang={live.next.choicesLang ?? live.next.lang} className="mt-1 font-read text-sm">
                {live.next.choices.map((c) => `${c.emoji ? `${c.emoji} ` : ""}${c.label}${c.id === live.next?.answer ? " ✓" : ""}`).join(" · ")}
              </p>
              <button type="button" disabled={busy} className={`${btn} mt-2 border border-line`} onClick={() => void act("PATCH", { classId, action: "swap-next" })}>
                Choose a different question
              </button>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            {!live.revealed && (
              <button type="button" disabled={busy} className={`${btn} bg-[#25b47e] text-[#0f172a] disabled:opacity-50`} onClick={() => void act("PATCH", { classId, action: "reveal" })}>
                Show the answer
              </button>
            )}
            <button type="button" disabled={busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`} onClick={() => void ask(live.unitKey)}>
              Next question
            </button>
            <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => void act("DELETE", undefined, `/api/classes/live/?classId=${encodeURIComponent(classId)}`)}>
              End
            </button>
          </div>
        </div>
      )}
      <div className="mt-4 border-t border-line pt-3">
        <button type="button" className={`${btn} border border-line`} onClick={() => void showRecap()}>
          {recap ? "Refresh the recap" : "Look back at today’s questions"}
        </button>
        {recap && (
          <div className="mt-3" aria-label="Recap of today’s questions">
            {recap.length === 0 ? (
              <p className="font-read text-ink-soft">No live questions in the last day.</p>
            ) : (
              <>
                <ol className="flex flex-col gap-3">
                  {recap.map((q) => {
                    const r = liveRecapItem(q, names);
                    return (
                      <li key={q.id} className="font-read">
                        <span className="block text-sm font-semibold text-ink-soft">{label(q.unitKey)}</span>
                        <span lang={q.question.lang} className="block font-bold">{q.question.prompt}</span>
                        <span className="block">
                          {r.right} of {r.answered} answered right{r.missed.length > 0 && <> · To check in with: {r.missed.join(", ")}</>}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <button
                  type="button"
                  className={`${btn} mt-3 border border-line`}
                  onClick={() => {
                    void navigator.clipboard?.writeText(liveRecapText(recap, names, label, data.class.name, APP_NAME)).then(() => setCopied(true));
                  }}
                >
                  {copied ? "Copied" : "Copy the recap"}
                </button>
                <p className="mt-2 text-sm text-ink-soft">Questions and answers are deleted a day after they are asked, so copy what you want to keep.</p>
              </>
            )}
          </div>
        )}
      </div>
      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
      <p className="mt-3 text-sm text-ink-soft">This reflects practice, not a report-card mark.</p>
    </section>
  );
}
