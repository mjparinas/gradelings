import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { activitiesPath } from "@/components/site/activitiesData";
import { HELP_GRADES, gradeName, helpAtHomePath } from "@/components/site/helpAtHome";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["How to help your child at home: tips for Pre-K to Grade 9", "Help your child at home, Pre-K to Grade 9"],
  description: `Short, free ideas for helping your child at home in math, reading and writing, science and social studies, grade by grade from Pre-K to Grade 9. No supplies needed. Then practice in ${APP_NAME}.`,
  path: helpAtHomePath.hub(),
});

export default function HelpAtHomeHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Help at home" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Help at home", HELP_GRADES.map((g) => ({ name: gradeName(g), path: helpAtHomePath.grade(g) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Help your child at home</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        You don&apos;t need to be a teacher. Pick your child&apos;s grade for what they are usually working on and three quick things to try in each subject, using nothing but what is already in your home. {APP_NAME} then gives them practice that fits.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {HELP_GRADES.map((g) => (
          <li key={g} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-2xl font-bold">
              <Link href={helpAtHomePath.grade(g)} className="underline-offset-4 hover:underline">
                {gradeName(g)}
              </Link>
            </h2>
            <p className="mt-1 font-read text-ink-soft">Math, reading and writing, science and social studies.</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-read text-lg">
        Want something to print? Try the <Link href={activitiesPath.hub()} className="font-bold underline">free printable activities</Link>: practice calendars, math games, a reading log and conversation cards.
      </p>
    </SitePage>
  );
}
