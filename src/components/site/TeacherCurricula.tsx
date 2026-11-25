"use client";

import { useMemo, useState } from "react";
import Link from "@/components/PublicLink";
import { COUNTRIES, COUNTRY_ORDER } from "@/lib/country";
import { teacherPath } from "./teachers";

/** Serializable region row for the teacher hub finder (avoids shipping full Framework objects to the client). */
export interface TeacherRegion {
  slug: string;
  region: string;
  country: "CA" | "US";
}

function matches(query: string, region: TeacherRegion): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return region.region.toLowerCase().includes(q) || region.slug.replace(/-/g, " ").includes(q);
}

function RegionGrid({ regions }: { regions: TeacherRegion[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {regions.map((r) => (
        <li key={r.slug} className="flex">
          <Link href={teacherPath.framework(r)} className="card flex min-h-12 w-full items-center p-4 text-lg font-bold hover:border-[#4f8ef7]">
            {r.region}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Conversion-first curriculum finder: featured regions, a search field, and the full list behind “Browse all”.
 * Every region stays linked for SEO; the wall of equal-weight tiles is no longer the default view.
 */
export function TeacherCurricula({
  featured,
  regions,
  regionWord,
}: {
  featured: TeacherRegion[];
  regions: TeacherRegion[];
  /** "province" or "province or state" for the helper line. */
  regionWord: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => regions.filter((r) => matches(query, r)), [query, regions]);
  const searching = query.trim().length > 0;

  const groups = useMemo(
    () =>
      COUNTRY_ORDER.map((country) => ({
        country,
        heading: COUNTRIES[country].name,
        frameworks: regions.filter((r) => r.country === country),
      })).filter((g) => g.frameworks.length > 0),
    [regions],
  );

  return (
    <div className="flex flex-col gap-5">
      <label className="flex max-w-xl flex-col gap-1.5">
        <span className="text-sm font-semibold text-ink-soft">Search for your {regionWord}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Ontario, Texas…"
          autoComplete="off"
          className="min-h-12 rounded-xl border-2 border-line bg-white px-4 text-lg font-read outline-none focus:border-[#4f8ef7]"
        />
      </label>

      {searching ? (
        filtered.length ? (
          <RegionGrid regions={filtered} />
        ) : (
          <p className="font-read text-ink-soft">No curriculum matches “{query.trim()}”. Try another spelling, or browse all below.</p>
        )
      ) : (
        <>
          <div>
            <h3 className="mb-2 text-xl font-bold">Popular picks</h3>
            <RegionGrid regions={featured} />
          </div>
          <details className="group rounded-2xl border border-line bg-white open:pb-4">
            <summary className="cursor-pointer list-none px-4 py-3 text-lg font-bold marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                Browse all provinces and states
                <span className="text-ink-soft transition group-open:rotate-180" aria-hidden="true">
                  ▾
                </span>
              </span>
            </summary>
            <div className="border-t border-line px-4 pt-4">
              {groups.map((group, i) => (
                <div key={group.country} className={i > 0 ? "mt-5" : ""}>
                  {groups.length > 1 && <h3 className="mb-2 text-xl font-bold">{group.heading}</h3>}
                  <RegionGrid regions={group.frameworks} />
                </div>
              ))}
            </div>
          </details>
        </>
      )}
    </div>
  );
}
