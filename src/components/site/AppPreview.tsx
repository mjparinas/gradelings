"use client";

import { FRAMEWORKS } from "@/content/frameworks";
import { QuestionGallery } from "./QuestionGallery";

/**
 * Drawn preview of the kids' app and a parent report strip. Used on Home and About
 * so parents see kindness (hints) and report-card language before they try it.
 */
export function AppPreview({
  caption = "Kids get a gentle hint when they miss, and parents see the progress in their report.",
}: {
  caption?: string;
}) {
  const levels = FRAMEWORKS[0].scoringFor("3").levels;
  const rows = [
    { unit: "Multiplication facts", level: levels[2] },
    { unit: "Fractions", level: levels[1] },
    { unit: "Telling time", level: levels[3] },
  ];
  return (
    <figure className="relative mx-auto flex w-full max-w-md flex-col gap-3">
      <QuestionGallery />
      <div className="card p-4" aria-hidden="true">
        <p className="text-sm font-bold text-ink-soft">Parent report · Math</p>
        <ul className="mt-2 flex flex-col gap-2">
          {rows.map((r) => (
            <li key={r.unit} className="flex items-center justify-between gap-2 font-read">
              <span>{r.unit}</span>
              <span className="rounded-full bg-paper px-3 py-0.5 text-sm font-semibold">
                {r.level.icon} {r.level.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="text-center text-sm text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
