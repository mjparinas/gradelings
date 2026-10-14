import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { byCountry, regionWord } from "@/components/site/provinces";
import { FRAMEWORKS } from "@/content/frameworks";
import { pageMeta } from "@/lib/pageMeta";
import { FaqSection } from "@/components/site/FaqSection";
import { bandLine, reportCardIndexFaqs, reportingBands } from "@/components/site/pageFaqs";

export const metadata: Metadata = pageMeta({
  title: "Report cards explained",
  description: "Plain-language guides to elementary report cards: what each proficiency level means and how to help at home.",
  path: "/report-cards/",
});

export default function ReportCardsIndex() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Report cards" }]} />
      <h1 className="text-4xl font-bold">Report cards explained</h1>
      <p className="mt-2 max-w-2xl font-read text-lg text-ink-soft">Every province and state reports learning a little differently. Pick yours for a plain-language guide.</p>
      {byCountry(FRAMEWORKS).map((group, i, groups) => (
        <section key={group.country} aria-label={groups.length > 1 ? group.heading : undefined} className={i > 0 ? "mt-10" : ""}>
          {groups.length > 1 && <h2 className="mt-6 text-3xl font-bold">{group.heading}</h2>}
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {group.frameworks.map((f) => (
              <li key={f.id}>
                <Link href={`/report-cards/${f.slug}/`} className="card flex flex-col gap-2 p-6 hover:border-[#4f8ef7]">
                  <span className="text-2xl font-bold">{f.reportCard.title}</span>
                  <span className="text-xl" aria-hidden="true">
                    {f.scoringFor("3").levels.map((l) => l.icon).join(" ")}
                  </span>
                  <span className="font-read text-ink-soft">{f.scoringFor("3").levels.map((l) => l.label).join(" · ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section aria-labelledby="compare" className="mt-12">
        <h2 id="compare" className="text-3xl font-bold">
          How each {regionWord(FRAMEWORKS)} reports, grade by grade
        </h2>
        <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">The words on the report card often change as children move up, for example from levels to letter grades or percentages.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {FRAMEWORKS.map((f) => (
            <section key={f.id} aria-labelledby={`compare-${f.slug}`} className="rounded-2xl border border-line bg-white p-5">
              <h3 id={`compare-${f.slug}`} className="text-xl font-bold">
                <Link href={`/report-cards/${f.slug}/`} className="hover:underline">
                  {f.name}
                </Link>
              </h3>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 font-read">
                {reportingBands(f).map((b) => (
                  <li key={b.from}>{bandLine(f, b)}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <FaqSection faqs={reportCardIndexFaqs(FRAMEWORKS)} />
    </SitePage>
  );
}
