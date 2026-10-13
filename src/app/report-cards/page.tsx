import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { byCountry } from "@/components/site/provinces";
import { FRAMEWORKS } from "@/content/frameworks";

export const metadata: Metadata = {
  title: "Report cards explained",
  description: "Plain-language guides to elementary report cards: what each proficiency level means and how to help at home.",
  alternates: { canonical: "/report-cards/" },
};

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
    </SitePage>
  );
}
