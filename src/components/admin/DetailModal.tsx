"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { call } from "@/lib/classroom";
import type { Cell, CellKind, Detail, DetailView } from "@/lib/adminDetail";

// The window a dashboard tile opens: a few headline numbers, then the list behind the tile. Lists come from
// /api/admin/stats/detail/ (or are built in the panel, for the money breakdowns). Emails open the family in Users.

const num = (n: number) => n.toLocaleString("en-CA");
const money = (cents: number) => (cents / 100).toLocaleString("en-CA", { style: "currency", currency: "CAD" });
const date = (ms: number) =>
  new Date(ms).toLocaleDateString("en-CA", {
    dateStyle: "medium",
    timeZone: "UTC",
  });

export function formatCell(value: Cell, kind: CellKind): string {
  if (value === null || value === "") return "—";
  if (kind === "yesno") return value ? "Yes" : "No";
  if (typeof value === "number") {
    if (kind === "money") return money(value);
    if (kind === "date") return value > 0 ? date(value) : "—";
    return num(value);
  }
  return String(value);
}

const numeric = (kind: CellKind) => kind === "number" || kind === "money";

export function DetailModal({
  source,
  onClose,
  onOpenFamily,
}: {
  /** A view to load from the server, or a detail already built in the panel. */
  source: { view: DetailView } | { detail: Detail };
  onClose: () => void;
  onOpenFamily?: (id: string) => void;
}) {
  const view = "view" in source ? source.view : null;
  const [loaded, setLoaded] = useState<{
    view: DetailView;
    detail?: Detail;
    err?: string;
  } | null>(null);
  const detail = "detail" in source ? source.detail : loaded?.view === view ? loaded.detail : undefined;
  const err = loaded?.view === view ? loaded.err : undefined;
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!view) return;
    let live = true;
    call<Detail>(`/api/admin/stats/detail/?view=${view}`).then(
      (d) => live && setLoaded({ view, detail: d }),
      (e: Error) => live && setLoaded({ view, err: e.message }),
    );
    return () => {
      live = false;
    };
  }, [view]);

  // Focus moves into the window and the page behind stops scrolling; both are undone on close.
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      before?.focus?.();
    };
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panel.current) return;
    // Keep Tab inside the window.
    const items = [...panel.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")].filter((el) => !el.hasAttribute("disabled"));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const title = detail?.title ?? (err ? "Couldn't load this list" : "Loading…");

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0f172a]/50 p-2 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="detail-h" onKeyDown={onKey} className="my-auto w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 id="detail-h" className="text-xl font-bold sm:text-2xl">
            {title}
          </h2>
          <button ref={close} type="button" onClick={onClose} className="min-h-11 shrink-0 rounded-xl border border-line bg-white px-4 font-bold">
            Close
          </button>
        </div>
        {err && (
          <p role="alert" className="mt-3 text-nudge-dark">
            {err}
          </p>
        )}
        {!detail && !err && <p className="mt-3 font-read">Loading…</p>}
        {detail && (
          <>
            {detail.intro && <p className="mt-1 text-sm text-ink-soft">{detail.intro}</p>}
            {detail.summary.length > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {detail.summary.map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#f1f5f9] p-3">
                    <dt className="text-sm font-semibold text-ink-soft">{s.label}</dt>
                    <dd className="text-xl font-bold tabular-nums">{formatCell(s.value, s.kind)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {detail.tables.map((t, i) => (
              <section key={i} className="mt-5" aria-label={t.title ?? detail.title}>
                {t.title && <h3 className="text-lg font-bold">{t.title}</h3>}
                {t.rows.length === 0 ? (
                  <p className="mt-2 text-sm text-ink-soft">Nothing here yet.</p>
                ) : (
                  // The table scrolls sideways on its own on a phone, never the page.
                  <div className="mt-2 max-h-[60vh] overflow-auto rounded-xl border border-line" tabIndex={0} role="region" aria-label={`${t.title ?? detail.title} table`}>
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 bg-[#f8fafc]">
                        <tr>
                          {t.columns.map((c) => (
                            <th key={c.label} scope="col" className={`px-3 py-2 font-semibold whitespace-nowrap ${numeric(c.kind) ? "text-right" : ""}`}>
                              {c.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.rows.map((r, ri) => (
                          <tr key={ri} className="border-t border-line">
                            {r.cells.map((v, ci) => {
                              const kind = t.columns[ci]?.kind ?? "text";
                              const text = formatCell(v, kind);
                              const cls = `px-3 py-2 whitespace-nowrap ${numeric(kind) ? "text-right tabular-nums" : ""}`;
                              if (kind === "account" && r.familyId && onOpenFamily && v)
                                return (
                                  <td key={ci} className={cls}>
                                    <button type="button" className="min-h-11 text-left font-semibold text-[#2a5bd7] underline" onClick={() => onOpenFamily(r.familyId!)}>
                                      {text}
                                    </button>
                                  </td>
                                );
                              return (
                                <td key={ci} className={cls}>
                                  {text}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {t.total > t.rows.length && (
                  <p className="mt-1 text-sm text-ink-soft">
                    Showing the first {num(t.rows.length)} of {num(t.total)}. Search for an account in Users to find the rest.
                  </p>
                )}
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
