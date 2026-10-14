import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { byCountry } from "@/components/site/provinces";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { FaqSection } from "@/components/site/FaqSection";
import { curriculumIndexFaqs } from "@/components/site/pageFaqs";

export const metadata: Metadata = pageMeta({
  title: "Curriculum: what kids practise in each grade",
  description: `Browse every unit ${APP_NAME} covers from Kindergarten to Grade 9, by curriculum, grade and subject, with sample questions and the learning standards each one matches.`,
  path: curriculumPath.index(),
});

export default function CurriculumIndex() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum" }]} />
      <h1 className="text-4xl font-bold">Curriculum</h1>
      <p className="mt-2 max-w-2xl font-read text-lg text-ink-soft">
        {APP_NAME} follows {FRAMEWORKS.length} curricula from Kindergarten to Grade 9, with{" "}
        {FRAMEWORKS.reduce((n, f) => n + gradesWithContent(f).reduce((m, g) => m + coursesFor(f, g).reduce((k, c) => k + c.units.length, 0), 0), 0).toLocaleString("en-CA")} units
        between them. Pick a curriculum to see the units for each grade and subject, with sample questions and the learning standard each one practises.
      </p>
      {byCountry(FRAMEWORKS).map((group, i, groups) => (
        <section key={group.country} aria-label={groups.length > 1 ? group.heading : undefined} className={i > 0 ? "mt-10" : ""}>
          {groups.length > 1 && <h2 className="mt-6 text-3xl font-bold">{group.heading}</h2>}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {group.frameworks.map((f) => (
              <section key={f.id} className="card p-6">
                {/* An h3 under a country heading, an h2 when there is only one country. */}
                {groups.length > 1 ? (
                  <h3 className="text-2xl font-bold">
                    <Link href={curriculumPath.framework(f)} className="hover:underline">
                      {f.curriculumName}
                    </Link>
                  </h3>
                ) : (
                  <h2 className="text-2xl font-bold">
                    <Link href={curriculumPath.framework(f)} className="hover:underline">
                      {f.curriculumName}
                    </Link>
                  </h2>
                )}
                <p className="font-read text-ink-soft">{f.name}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {gradesWithContent(f).map((g) => (
                    <li key={g}>
                      <Link href={curriculumPath.grade(f, g)} className="inline-flex rounded-full bg-paper px-3 py-1.5 font-semibold hover:bg-[#e6f0ff]">
                        {gradeLabel(f, g)} <span className="ml-1 text-ink-soft">({coursesFor(f, g).reduce((n, c) => n + c.units.length, 0)})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      ))}
      <section className="mt-6 rounded-3xl border-2 border-dashed border-line p-6">
        <h2 className="text-2xl font-bold">More coming</h2>
        <p className="font-read text-ink-soft">Other provinces and US states are on the way. The same lessons, matched to your local curriculum and report card.</p>
      </section>
      <FaqSection faqs={curriculumIndexFaqs(FRAMEWORKS)} />
    </SitePage>
  );
}
