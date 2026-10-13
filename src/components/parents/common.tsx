"use client";

import { useId, type ReactNode } from "react";
import { gradeLabel } from "@/lib/gradeLabel";
import type { Profile } from "@/lib/model";
import { useProfiles } from "@/lib/store";
import { CritterSvg } from "../Critter";

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {sub && <p className="font-read text-ink-soft">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-5 ${className}`}>
      {title && <h2 className="mb-3 text-xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}

export function Switch({ label, help, value, onChange }: { label: string; help?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={value} onClick={() => onChange(!value)} className="flex w-full items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3 text-left">
      <span>
        <span className="block font-semibold">{label}</span>
        {help && <span className="block text-sm text-ink-soft">{help}</span>}
      </span>
      <span className={`switch-track relative h-8 w-14 shrink-0 rounded-full transition-colors ${value ? "bg-good" : "bg-ink/20"}`} aria-hidden="true">
        <span className={`switch-knob absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${value ? "left-7" : "left-1"}`} />
      </span>
    </button>
  );
}

export function Choice<T extends string>({ label, help, value, options, onChange }: { label: string; help?: string; value: T | null; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const id = useId();
  return (
    <div className="rounded-xl bg-paper px-4 py-3">
      <span id={id} className="block font-semibold">
        {label}
      </span>
      {help && <span className="block text-sm text-ink-soft">{help}</span>}
      <div role="radiogroup" aria-labelledby={id} className="mt-2 grid grid-cols-3 gap-2 narrow:grid-cols-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`min-h-11 rounded-lg border-2 px-2 py-1 text-sm font-semibold ${value === o.value ? "border-good-dark bg-good text-[#0f172a]" : "border-line bg-white"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Avatar({ p, size = 48 }: { p: Profile; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-2xl p-0.5" style={{ background: p.colour, width: size, height: size }}>
      <CritterSvg id={p.avatar} />
    </span>
  );
}

/** Tabs to pick which child a page is about; keeps the choice in the URL. */
export function ChildTabs({ base, current }: { base: string; current?: Profile }) {
  const profiles = useProfiles();
  if (profiles.length < 2) return null;
  return (
    <div className="mb-5 flex flex-wrap gap-2" role="tablist">
      {profiles.map((p) => (
        <a
          key={p.id}
          role="tab"
          aria-selected={p.id === current?.id}
          href={`#/${base}/${p.id}`}
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-semibold ${p.id === current?.id ? "border-[#253047] bg-[#253047] text-white" : "border-line bg-white"}`}
        >
          <Avatar p={p} size={28} /> {p.name} <span className="text-sm opacity-70">{gradeLabel(p.grade, p.framework)}</span>
        </a>
      ))}
    </div>
  );
}

export function CheckBox({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} onClick={onChange} className="flex min-h-11 w-full items-center gap-2 rounded-xl bg-paper px-3 py-2 text-left font-semibold">
      <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${checked ? "border-good-dark bg-good text-[#0f172a]" : "border-line bg-white"}`}>
        {checked ? (
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M5 12.5l4.2 4.2L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      {children}
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  help,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
  help?: string;
}) {
  const id = useId();
  const span = max - min || 1;
  const pct = Math.min(100, Math.max(0, ((value - min) / span) * 100));
  const setFromX = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const ratio = rect.width ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const next = Math.min(max, Math.max(min, Number(stepped.toFixed(4))));
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-1">
      <span id={id} className="flex justify-between font-semibold">
        {label}
        <span className="tabular-nums">
          {value} {unit}
        </span>
      </span>
      <div
        role="slider"
        tabIndex={0}
        aria-labelledby={id}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} ${unit}`}
        aria-orientation="horizontal"
        className="relative flex h-11 cursor-pointer items-center"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX, e.currentTarget);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromX(e.clientX, e.currentTarget);
        }}
        onKeyDown={(e) => {
          const dir = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
          if (!dir && e.key !== "Home" && e.key !== "End") return;
          e.preventDefault();
          if (e.key === "Home") onChange(min);
          else if (e.key === "End") onChange(max);
          else onChange(Math.min(max, Math.max(min, value + dir * step)));
        }}
      >
        <span aria-hidden="true" className="progress-track absolute inset-x-0 h-2 rounded-full bg-line" />
        <span aria-hidden="true" className="progress-fill absolute h-2 rounded-full bg-[#4f8ef7]" style={{ width: `${pct}%` }} />
        <span aria-hidden="true" className="absolute h-7 w-7 -translate-x-1/2 rounded-full border-2 border-[#2f6fd6] bg-white" style={{ left: `${pct}%` }} />
      </div>
      {help && <span className="text-sm text-ink-soft">{help}</span>}
    </div>
  );
}

export function useChild(childId?: string): Profile | undefined {
  const profiles = useProfiles();
  return profiles.find((p) => p.id === childId) ?? profiles[0];
}

export function NoChildren() {
  return (
    <Panel>
      <p className="font-read text-lg">
        No children yet. <a className="font-bold text-[#2f6fd6] underline" href="#/children">Add a child</a> to get started.
      </p>
    </Panel>
  );
}

const REPORT_TABS = [
  { path: "reports", label: "Progress" },
  { path: "placement", label: "Placement test" },
  { path: "report-cards", label: "Report card" },
];

/** The three views under Reports, keeping the chosen child. */
export function ReportTabs({ current, childId }: { current: string; childId?: string }) {
  return (
    <nav aria-label="Report views" className="mb-5 print:hidden">
      <ul className="flex flex-wrap gap-2">
        {REPORT_TABS.map((t) => (
          <li key={t.path}>
            <a
              href={`#/${t.path}${childId ? `/${childId}` : ""}`}
              aria-current={current === t.path ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-semibold ${current === t.path ? "border-[#253047] bg-[#253047] text-white" : "border-line bg-white"}`}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
