"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SelectMenu } from "@/components/SelectMenu";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_ORDER } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { call } from "@/lib/classroom";
import { frameworkGroups, frameworkMenu } from "@/lib/frameworkGroups";
import { gradeLabel } from "@/lib/gradeLabel";
import { ROSTER_ERRORS, importSummary, isRosterError, rosterProviderLabel, rosterStartUrl, type ImportResult, type RosterProviderId } from "@/lib/rostering";

// Bringing in classes from Google Classroom, Clever or ClassLink: the buttons on the class list, and the review
// page the teacher lands on after signing in with the provider (#/import/{id}). Students become ordinary class
// student accounts with login codes, so nothing about signing in changes for them.

const btn = "min-h-11 rounded-xl px-4 font-bold";
const REGION_LABEL = frameworkGroups(FRAMEWORKS).length > 1 ? "Province or state" : "Province";

interface Status {
  access: "ok" | "plan" | "off";
  providers: { id: RosterProviderId; label: string }[];
  plan: { features: string[]; price: string | null } | null;
}

/** On the class list: one button per provider the server has keys for, or a note about the school plan. Nothing at all while the feature is off. */
export function RosterConnect() {
  const [status, setStatus] = useState<Status | null>(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    // The provider sends the browser back with the result in the address.
    const code = new URLSearchParams(window.location.search).get("roster_error");
    const failure = isRosterError(code) ? ROSTER_ERRORS[code] : "";
    if (failure) {
      const url = new URL(window.location.href);
      url.searchParams.delete("roster_error");
      window.history.replaceState(null, "", url);
    }
    call<Status>("/api/roster/")
      .then((s) => setStatus(s && s.access && s.access !== "off" ? s : null))
      .catch(() => setStatus(null))
      .finally(() => setProblem(failure));
  }, []);

  if (!status && !problem) return null;
  return (
    <section className="mt-6 rounded-2xl border border-line bg-white p-4" aria-labelledby="roster-h">
      <h2 id="roster-h" className="text-xl font-bold">Bring in a class</h2>
      {problem && (
        <p role="alert" className="mt-2 text-nudge-dark">
          {problem}
        </p>
      )}
      {status?.access === "ok" && status.providers.length > 0 && (
        <>
          <p className="mt-1 font-read text-ink-soft">Sign in with your school’s service and pick the classes to bring over. Each student gets their own login code. We read first names only.</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {status.providers.map((p) => (
              <li key={p.id}>
                {/* A full page load: the provider's sign-in leaves this page and comes back. */}
                <a href={rosterStartUrl(p.id)} className={`${btn} inline-flex items-center border border-line bg-white`}>
                  Import from {p.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {status?.access === "ok" && status.providers.length === 0 && <p className="mt-1 font-read text-ink-soft">Importing isn’t set up for any service yet.</p>}
      {status?.access === "plan" && status.plan && (
        <>
          <p className="mt-1 font-read text-ink-soft">Importing classes is part of the school plan{status.plan.price ? ` (${status.plan.price})` : ""}.</p>
          <ul className="mt-2 list-disc pl-5 font-read text-ink-soft">
            {status.plan.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="mt-3">
            <Link href="/contact/" className={`${btn} inline-flex items-center bg-[#25b47e] text-[#0f172a]`}>
              Ask about the school plan
            </Link>
          </p>
        </>
      )}
    </section>
  );
}

interface ReviewSection {
  id: string;
  name: string;
  grade: GradeId | null;
  students: number;
  newStudents: number;
  existing: { id: string; name: string } | null;
  names: string[];
}

interface Choice {
  picked: boolean;
  name: string;
  grade: GradeId | "";
  framework: string;
}

/** The review page: tick the classes, fix each one's name, grade and province or state, and bring them over. */
export function RosterReview({ id, onOpenClass, onBack }: { id: string; onOpenClass: (classId: string) => void; onBack: () => void }) {
  const [label, setLabel] = useState("");
  const [sections, setSections] = useState<ReviewSection[] | null>(null);
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<ImportResult[] | null>(null);

  useEffect(() => {
    call<{ provider: RosterProviderId; label?: string; sections: ReviewSection[] }>(`/api/roster/?import=${encodeURIComponent(id)}`)
      .then((r) => {
        setLabel(r.label ?? rosterProviderLabel(r.provider));
        setSections(r.sections);
        setChoices(Object.fromEntries(r.sections.map((s) => [s.id, { picked: !s.existing || s.newStudents > 0, name: s.existing?.name ?? s.name, grade: s.grade ?? "", framework: FRAMEWORKS[0].id }])));
      })
      .catch((e: Error) => setErr(e.message));
  }, [id]);

  const set = (sectionId: string, change: Partial<Choice>) => setChoices((c) => ({ ...c, [sectionId]: { ...c[sectionId], ...change } }));
  const chosen = (sections ?? []).filter((s) => choices[s.id]?.picked);
  const ready = chosen.length > 0 && chosen.every((s) => s.existing || choices[s.id].grade);

  const submit = async () => {
    setBusy(true);
    setErr("");
    try {
      const r = await call<{ results: ImportResult[] }>("/api/roster/", "POST", {
        import: id,
        classes: chosen.map((s) => ({ sectionId: s.id, name: choices[s.id].name, grade: choices[s.id].grade || "3", framework: choices[s.id].framework })),
      });
      setResults(r.results);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const discard = () => {
    call(`/api/roster/?import=${encodeURIComponent(id)}`, "DELETE").catch(() => undefined);
    onBack();
  };

  if (results) {
    return (
      <>
        <h1 className="text-3xl font-bold">Classes brought in</h1>
        <ul className="mt-4 flex flex-col gap-3">
          {results.map((r) => (
            <li key={r.classId} className="rounded-2xl border border-line bg-white p-4">
              <p className="font-read">{importSummary(r)}</p>
              <button type="button" className={`${btn} mt-2 bg-[#25b47e] text-[#0f172a]`} onClick={() => onOpenClass(r.classId)}>
                Open {r.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-read text-ink-soft">Print each student’s login card from the class’s Students tab.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Bring in classes{label ? ` from ${label}` : ""}</h1>
      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
      {sections === null && !err && <p className="mt-3 font-read text-ink-soft">Loading your classes…</p>}
      {sections && (
        <>
          <p className="mt-2 font-read text-ink-soft">Tick the classes to bring over. We keep each student’s first name only, and nothing from {label || "the service"} stays on our servers except the ID that stops the same student being added twice.</p>
          <ul className="mt-4 flex flex-col gap-3">
            {sections.map((s) => {
              const c = choices[s.id];
              if (!c) return null;
              return (
                <li key={s.id} className="rounded-2xl border border-line bg-white p-4">
                  <label className="flex min-h-11 items-center gap-3 font-bold">
                    <input type="checkbox" className="h-5 w-5" checked={c.picked} onChange={(e) => set(s.id, { picked: e.target.checked })} />
                    <span>
                      {s.name} <span className="font-read font-normal text-ink-soft">· {s.students} {s.students === 1 ? "student" : "students"}</span>
                    </span>
                  </label>
                  {s.existing ? (
                    <p className="mt-1 font-read text-sm text-ink-soft">Already brought in as {s.existing.name}. {s.newStudents} new {s.newStudents === 1 ? "student" : "students"} would be added.</p>
                  ) : (
                    c.picked && (
                      <div className="mt-2 flex flex-wrap items-end gap-3">
                        <label className="flex flex-col text-sm font-semibold">
                          Class name
                          <input className="mt-1 min-h-11 rounded-xl border border-line px-3" value={c.name} maxLength={60} onChange={(e) => set(s.id, { name: e.target.value })} />
                        </label>
                        <SelectMenu
                          label="Grade"
                          block={false}
                          value={c.grade}
                          onChange={(g) => set(s.id, { grade: g as GradeId })}
                          options={[{ value: "", label: "Choose…" }, ...GRADE_ORDER.filter((g) => getFramework(c.framework).grades.includes(g)).map((g) => ({ value: g, label: gradeLabel(g, c.framework) }))]}
                        />
                        <SelectMenu label={REGION_LABEL} block={false} value={c.framework} onChange={(f) => set(s.id, { framework: f })} {...frameworkMenu((f) => f.region)} />
                      </div>
                    )
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" disabled={!ready || busy} className={`${btn} bg-[#25b47e] text-[#0f172a] disabled:opacity-50`} onClick={() => void submit()}>
              {busy ? "Bringing in…" : `Bring in ${chosen.length} ${chosen.length === 1 ? "class" : "classes"}`}
            </button>
            <button type="button" className={`${btn} border border-line`} onClick={discard}>
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
}
