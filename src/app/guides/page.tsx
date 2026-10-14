import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { guidePath } from "@/components/site/guides";
import { byCountry } from "@/components/site/provinces";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: "Parent guides",
  description: "Free plain-language guides for parents: what each grade learns, how to help at home, report cards, provincial and state tests, and printable practice sheets.",
  path: "/guides/",
});

/** Every region's guide hub in one place, so the site footer can link here instead of listing every region. */
export default function GuidesIndex() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Parent guides" }]} />
      <h1 className="text-4xl font-bold">Parent guides</h1>
      <p className="mt-2 max-w-2xl font-read text-lg text-ink-soft">
        What each grade learns, how to help at home, and free printable practice sheets. Pick your province or state.
      </p>
      {byCountry(GUIDE_FRAMEWORKS).map((group, i, groups) => (
        <section key={group.country} aria-label={groups.length > 1 ? group.heading : undefined} className={i > 0 ? "mt-10" : ""}>
          {groups.length > 1 && <h2 className="mt-6 text-3xl font-bold">{group.heading}</h2>}
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {group.frameworks.map((f) => (
              <li key={f.id}>
                <Link href={guidePath.hub(f)} className="card flex flex-col gap-2 p-6 hover:border-[#4f8ef7]">
                  <span className="text-2xl font-bold">{f.name}</span>
                  <span className="font-read text-ink-soft">
                    Grade by grade, {guidesFor(f.id).competencies.label} and the {guidesFor(f.id).assessment.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </SitePage>
  );
}
