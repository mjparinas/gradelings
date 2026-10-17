"use client";

import { useEffect, useId, useMemo, useRef, useState, type FocusEvent as ReactFocusEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { FRAMEWORKS, getFramework, type Framework } from "@/content/frameworks";
import { frameworkGroups } from "@/lib/frameworkGroups";
import type { FrameworkId } from "@/content/types";
import { sounds } from "@/lib/sound";

const TYPEAHEAD_MS = 500;
/** Open upward when the list would run off the bottom of a phone screen. */
const MENU_ROOM = 300;
/** Gap, card border, card padding and drop shadow. Kept out of the list so it stays on screen. */
const MENU_CHROME = 12 + 6 + 16 + 6 + 4;

/**
 * Province (or state) picker for the new-child screen. A native select can't match the
 * chunky buttons around it, so this is a listbox in the same style.
 */
export function ProvinceMenu({ value, onChange, frameworks = FRAMEWORKS }: { value: FrameworkId; onChange: (id: FrameworkId) => void; frameworks?: readonly Framework[] }) {
  // Provinces and territories, then states once a US state is offered; keys move through them in this order.
  const GROUPS = useMemo(() => frameworkGroups(frameworks), [frameworks]);
  const LIST: Framework[] = useMemo(() => GROUPS.flatMap((g) => g.frameworks), [GROUPS]);
  const uid = useId();
  const labelId = `${uid}-label`;
  const buttonId = `${uid}-button`;
  const listId = `${uid}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typed = useRef("");
  const typedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [menuMax, setMenuMax] = useState(360);
  const [active, setActive] = useState(() => Math.max(0, LIST.findIndex((f) => f.id === value)));
  const chosen = getFramework(value);

  useEffect(() => () => clearTimeout(typedTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const option = document.getElementById(`${listId}-${LIST[active]?.id}`);
    if (typeof option?.scrollIntoView === "function") option.scrollIntoView({ block: "nearest" });
  }, [open, active, listId, LIST]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const placeMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom;
    const above = rect.top;
    const up = below < MENU_ROOM && above > below;
    setDropUp(up);
    const room = Math.floor((up ? above : below) - MENU_CHROME);
    setMenuMax(Math.min(640, Math.max(72, room)));
  };

  const openAtSelection = () => {
    setActive(Math.max(0, LIST.findIndex((f) => f.id === value)));
    placeMenu();
    setOpen(true);
  };

  const choose = (id: FrameworkId) => {
    sounds.tap();
    onChange(id);
    typed.current = "";
    setOpen(false);
    buttonRef.current?.focus();
  };

  const findMatch = (query: string, start: number) => {
    const names = LIST.map((f) => f.name.toLowerCase());
    const fromHere = names.findIndex((name, i) => i >= start && name.startsWith(query));
    if (fromHere >= 0) return fromHere;
    return names.findIndex((name) => name.startsWith(query));
  };

  const typeAhead = (key: string) => {
    clearTimeout(typedTimer.current);
    const letter = key.toLowerCase();
    let query = typed.current + letter;
    const start = open ? active + 1 : 0;
    let next = findMatch(query, start);
    if (next < 0) {
      query = letter;
      next = findMatch(query, start);
    }
    typed.current = query;
    typedTimer.current = setTimeout(() => {
      typed.current = "";
    }, TYPEAHEAD_MS);
    if (next < 0) return;
    setActive(next);
    if (!open) {
      placeMenu();
      setOpen(true);
    }
  };

  const onBlur = (e: ReactFocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openAtSelection();
      else setActive((i) => Math.min(LIST.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openAtSelection();
      else setActive((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      if (!open) placeMenu();
      setOpen(true);
      setActive(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      if (!open) placeMenu();
      setOpen(true);
      setActive(LIST.length - 1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      if (!open) return;
      e.preventDefault();
      choose(LIST[active].id);
      return;
    }
    if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
      e.preventDefault();
      typeAhead(e.key);
    }
  };

  const option = (f: Framework) => {
    const i = LIST.indexOf(f);
    const selected = f.id === value;
    const current = i === active;
    return (
      <li
        key={f.id}
        id={`${listId}-${f.id}`}
        role="option"
        aria-selected={selected}
        className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl border-[3px] px-4 text-left text-lg font-semibold select-none ${
          selected ? "border-good-dark bg-good text-[#0f172a]" : current ? "border-help bg-help-soft text-ink" : "border-line bg-white text-ink"
        }`}
        onMouseEnter={() => setActive(i)}
        // Pick on click, not pointerdown: on a touch screen pointerdown fires when a finger lands to scroll the list.
        // Keeping the mouse-down default prevented stops the button losing focus, which would close the list.
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.stopPropagation();
          choose(f.id);
        }}
      >
        <span className="min-w-0 leading-tight">{f.name}</span>
        {selected && <Check />}
      </li>
    );
  };

  return (
    <div ref={rootRef} className="mt-3 flex w-full flex-col items-center gap-2" onBlur={onBlur}>
      <label id={labelId} htmlFor={buttonId} className="text-lg font-semibold">
        Where do you live?
      </label>
      <div className="relative w-full max-w-sm text-left">
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          className="btn min-h-16 w-full px-4 text-xl font-bold"
          onClick={() => (open ? setOpen(false) : openAtSelection())}
          onKeyDown={onKeyDown}
        >
          <span className="flex w-full items-center justify-between gap-3">
            <span className="min-w-0 text-left leading-tight">{chosen.name}</span>
            <Chevron open={open} />
          </span>
        </button>
        {open && (
          <div className={`card absolute z-30 w-full p-2 ${dropUp ? "bottom-full mb-3" : "top-full mt-3"}`}>
            <ul id={listId} role="listbox" aria-labelledby={labelId} className="flex flex-col gap-1.5 overflow-y-auto overscroll-contain" style={{ maxHeight: menuMax }}>
              {GROUPS.length > 1
                ? GROUPS.map((g) => (
                    <li key={g.country} role="group" aria-label={g.label} className="flex flex-col gap-1.5">
                      <span aria-hidden="true" className="px-2 pt-1 text-sm font-bold tracking-wide text-ink-soft">
                        {g.label}
                      </span>
                      <ul role="none" className="flex flex-col gap-1.5">
                        {g.frameworks.map(option)}
                      </ul>
                    </li>
                  ))
                : LIST.map(option)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" className="shrink-0">
      <path d="M5 12.5l4.2 4.2L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
