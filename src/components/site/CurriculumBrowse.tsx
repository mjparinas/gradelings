"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "@/components/PublicLink";
import { readRegionHint } from "@/lib/regionHint";
import { regionWord } from "@/components/site/provinces";

/** Region hint is local-only and does not emit change events; one read on the client is enough. */
const subscribeHint = () => () => {};
const readHintId = () => readRegionHint()?.framework ?? null;
const hintIdOnServer = () => null;

export interface CurriculumBrowseItem {
  id: string;
  slug: string;
  curriculumName: string;
  name: string;
  region: string;
  country: "CA" | "US";
  span: string;
  units: number;
  href: string;
}

function matches(item: CurriculumBrowseItem, q: string): boolean {
  const hay = `${item.curriculumName} ${item.name} ${item.region} ${item.slug}`.toLowerCase();
  return q.split(/\s+/).every((part) => hay.includes(part));
}

function FrameworkLink({ item }: { item: CurriculumBrowseItem }) {
  return (
    <Link href={item.href} className="flex min-h-12 flex-col justify-center rounded-2xl px-3 py-2 hover:bg-[#e6f0ff] focus-visible:bg-[#e6f0ff]">
      <span className="font-semibold text-ink">{item.curriculumName}</span>
      <span className="font-read text-sm text-ink-soft">
        {item.span} · {item.units.toLocaleString("en-CA")} units
      </span>
    </Link>
  );
}

/**
 * Find-your-region browse for /curriculum/: search, a hint from the last region page this device
 * read, Canada listed, and US states behind a closed group until someone opens it or searches.
 */
export function CurriculumBrowse({ items }: { items: CurriculumBrowseItem[] }) {
  const [query, setQuery] = useState("");
  const hintId = useSyncExternalStore(subscribeHint, readHintId, hintIdOnServer);
  const suggested = hintId ? (items.find((item) => item.id === hintId) ?? null) : null;

  const word = regionWord(items);
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const filtered = useMemo(() => (searching ? items.filter((item) => matches(item, q)) : items), [items, q, searching]);
  const canada = filtered.filter((item) => item.country === "CA");
  const us = filtered.filter((item) => item.country === "US");

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div>
        <label htmlFor="curriculum-search" className="block text-lg font-bold">
          Find your {word}
        </label>
        <input
          id="curriculum-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a province or state"
          autoComplete="off"
          className="mt-2 min-h-12 w-full max-w-xl rounded-xl border-2 border-line bg-white px-3 py-2 font-read text-lg"
        />
      </div>

      {suggested && !searching && (
        <section aria-labelledby="suggested-region" className="rounded-3xl border-2 border-line bg-white p-5">
          <h2 id="suggested-region" className="text-xl font-bold">
            Continue where you left off
          </h2>
          <p className="mt-1 font-read text-ink-soft">You were reading {suggested.region} pages on this device.</p>
          <Link href={suggested.href} className="btn btn-good mt-4 inline-flex min-h-12 px-5 text-lg">
            Browse {suggested.curriculumName}
          </Link>
        </section>
      )}

      {searching ? (
        <section aria-labelledby="search-results">
          <h2 id="search-results" className="text-2xl font-bold">
            {filtered.length === 0 ? "No matching curricula" : `${filtered.length} matching ${filtered.length === 1 ? "curriculum" : "curricula"}`}
          </h2>
          {filtered.length === 0 ? (
            <p className="mt-2 font-read text-ink-soft">Try another spelling, or clear the search to browse by country.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line rounded-3xl border-2 border-line bg-white">
              {filtered.map((item) => (
                <li key={item.id}>
                  <FrameworkLink item={item} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <>
          <section aria-labelledby="canada-heading">
            <h2 id="canada-heading" className="text-2xl font-bold">
              Canada
            </h2>
            <ul className="mt-3 divide-y divide-line rounded-3xl border-2 border-line bg-white md:grid md:grid-cols-2 md:divide-y-0">
              {canada.map((item) => (
                <li key={item.id} className="md:border-b md:border-line">
                  <FrameworkLink item={item} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="us-heading">
            <details className="group rounded-3xl border-2 border-line bg-white open:pb-2">
              <summary className="cursor-pointer list-none px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                <h2 id="us-heading" className="flex flex-wrap items-center justify-between gap-2 text-2xl font-bold">
                  <span>United States</span>
                  <span className="text-base font-semibold text-ink-soft group-open:hidden">{us.length} curricula · show list</span>
                  <span className="hidden text-base font-semibold text-ink-soft group-open:inline">Hide list</span>
                </h2>
              </summary>
              <ul className="divide-y divide-line border-t border-line md:grid md:grid-cols-2 md:divide-y-0">
                {us.map((item) => (
                  <li key={item.id} className="md:border-b md:border-line">
                    <FrameworkLink item={item} />
                  </li>
                ))}
              </ul>
            </details>
          </section>
        </>
      )}
    </div>
  );
}
