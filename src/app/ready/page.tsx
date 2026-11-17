import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { READY_GRADES, readyPath, gradeWord } from "@/components/site/readiness";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Is my child ready for the next grade of math? Free checks", "Free math readiness checks, Grades 2 to 9"],
  description: `Free, untimed math readiness checks for Grades 2 to 9: ten quick questions from last year's skills, a plain result and what to practise next. No sign-up. Then practice in ${APP_NAME}.`,
  path: readyPath.hub(),
});

export default function ReadyHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math readiness checks" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Math readiness checks", READY_GRADES.map((g) => ({ name: `Ready for ${gradeWord(g)} math?`, path: readyPath.grade(g) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Is my child ready for the next grade of math?</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Ten quick questions from the end of last year, no timer and no sign-up. You get a plain result and the skills worth a little more practice. It is a quick look at practice, not a report-card mark.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {READY_GRADES.map((g) => (
          <li key={g} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-2xl font-bold">
              <Link href={readyPath.grade(g)} className="underline-offset-4 hover:underline">
                Ready for {gradeWord(g)} math?
              </Link>
            </h2>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
