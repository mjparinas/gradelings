"use client";

import { useEffect, useId, useRef, useState, type FocusEvent as ReactFocusEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";

export interface MenuOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MenuGroup {
  label: string;
  options: MenuOption[];
}

const TYPEAHEAD_MS = 500;

/**
 * A listbox styled like the parent and teacher forms: white, rounded, the site's
 * line colour, and the blue highlight. The play screen uses ProvinceMenu instead.
 */
export function SelectMenu({
  label,
  value,
  onChange,
  options,
  groups,
  hideLabel = false,
  block = true,
  size = "md",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: MenuOption[];
  groups?: MenuGroup[];
  /** The name is only for screen readers. */
  hideLabel?: boolean;
  /** Stretch to the column. Turn off for a control that sits in a row. */
  block?: boolean;
  size?: "md" | "lg";
}) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const buttonId = `${uid}-button`;
  const listId = `${uid}-list`;
  const loose = options ?? [];
  const grouped = groups ?? [];
  const items = [...loose, ...grouped.flatMap((g) => g.options)];
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typed = useRef("");
  const typedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [menuMax, setMenuMax] = useState(280);
  const [active, setActive] = useState(0);
  const current = items.find((o) => o.value === value) ?? items[0];

  useEffect(() => () => clearTimeout(typedTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const option = document.getElementById(`${listId}-${active}`);
    if (typeof option?.scrollIntoView === "function") option.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

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

  const place = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom;
    const above = rect.top;
    const up = below < 260 && above > below;
    setDropUp(up);
    const room = Math.floor((up ? above : below) - 16);
    setMenuMax(Math.min(320, Math.max(120, room)));
  };

  const indexOf = (next: string) => {
    const i = items.findIndex((o) => o.value === next);
    return i < 0 ? 0 : i;
  };

  const openAt = (index: number) => {
    setActive(firstEnabled(items, index));
    place();
    setOpen(true);
  };

  const choose = (option: MenuOption) => {
    if (option.disabled) return;
    onChange(option.value);
    typed.current = "";
    setOpen(false);
    buttonRef.current?.focus();
  };

  const move = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < items.length; i += dir) {
      if (!items[i].disabled) return i;
    }
    return from;
  };

  const typeAhead = (key: string) => {
    clearTimeout(typedTimer.current);
    const letter = key.toLowerCase();
    let query = typed.current + letter;
    const start = open ? active + 1 : 0;
    let next = findMatch(items, query, start);
    if (next < 0) {
      query = letter;
      next = findMatch(items, query, start);
    }
    typed.current = query;
    typedTimer.current = setTimeout(() => {
      typed.current = "";
    }, TYPEAHEAD_MS);
    if (next < 0) return;
    setActive(next);
    if (!open) {
      place();
      setOpen(true);
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      if (!open) openAt(indexOf(value));
      else setActive((i) => move(i, dir));
      return;
    }
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      if (!open) place();
      setOpen(true);
      setActive(e.key === "Home" ? firstEnabled(items, 0) : firstEnabled(items, items.length - 1, -1));
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      if (!open) return;
      e.preventDefault();
      if (items[active]) choose(items[active]);
      return;
    }
    if (e.key.length === 1 && /[a-z0-9]/i.test(e.key)) {
      e.preventDefault();
      typeAhead(e.key);
    }
  };

  const optionRow = (option: MenuOption) => {
    const index = items.indexOf(option);
    const selected = option.value === value;
    const currentRow = index === active;
    return (
      <div
        key={`${option.value}-${option.label}`}
        id={`${listId}-${index}`}
        role="option"
        aria-selected={selected}
        aria-disabled={option.disabled || undefined}
        className={`flex min-h-11 items-center justify-between gap-2 rounded-lg px-3 text-left font-semibold ${
          option.disabled ? "cursor-default text-ink-soft/50" : "cursor-pointer"
        } ${selected ? "bg-[#e6f0ff] text-ink" : currentRow && !option.disabled ? "bg-paper" : ""}`}
        onMouseEnter={() => {
          if (!option.disabled) setActive(index);
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          choose(option);
        }}
      >
        <span className="min-w-0 leading-tight">{option.label}</span>
        {selected && <Check />}
      </div>
    );
  };

  return (
    <div ref={rootRef} className={`flex flex-col gap-1 ${block ? "w-full" : ""}`} onBlur={(e: ReactFocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
    }}>
      <label id={labelId} htmlFor={buttonId} className={hideLabel ? "sr-only" : "font-semibold"}>
        {label}
      </label>
      <div className={`relative text-left ${block ? "w-full" : ""}`}>
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          className={`flex items-center justify-between gap-2 rounded-xl border-2 border-line bg-white px-3 text-left font-semibold ${
            size === "lg" ? "min-h-12 text-lg" : "min-h-11 text-base"
          } ${block ? "w-full" : "min-w-36"}`}
          onClick={() => (open ? setOpen(false) : openAt(indexOf(value)))}
          onKeyDown={onKeyDown}
        >
          <span className="min-w-0 leading-tight">{current?.label ?? ""}</span>
          <Chevron open={open} />
        </button>
        {open && (
          <div
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            className={`absolute z-40 overflow-y-auto overscroll-contain rounded-xl border-2 border-line bg-white p-1 shadow-[0_8px_24px_rgba(37,48,71,0.12)] ${
              block ? "w-full" : "min-w-full"
            } ${dropUp ? "bottom-full mb-1" : "top-full mt-1"}`}
            style={{ maxHeight: menuMax }}
          >
            {loose.map(optionRow)}
            {grouped.map((group) => (
              <div key={group.label} role="group" aria-label={group.label}>
                <div className="px-3 pt-2 pb-1 text-xs font-bold tracking-wide text-ink-soft" aria-hidden="true">
                  {group.label}
                </div>
                {group.options.map(optionRow)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function firstEnabled(items: MenuOption[], start: number, dir: 1 | -1 = 1): number {
  const clamped = Math.min(items.length - 1, Math.max(0, start));
  for (let i = clamped; i >= 0 && i < items.length; i += dir) {
    if (!items[i].disabled) return i;
  }
  return clamped;
}

function findMatch(items: MenuOption[], query: string, start: number): number {
  const name = (o: MenuOption) => o.label.toLowerCase();
  const enabled = (o: MenuOption) => !o.disabled;
  const fromHere = items.findIndex((o, i) => i >= start && enabled(o) && name(o).startsWith(query));
  if (fromHere >= 0) return fromHere;
  return items.findIndex((o) => enabled(o) && name(o).startsWith(query));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="shrink-0 text-[#2f6fd6]">
      <path d="M5 12.5l4.2 4.2L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
