import type { Metadata } from "next";
import { PrintButton } from "@/components/site/PrintButton";
import { activitiesPath } from "@/components/site/activitiesData";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Free printable reading log for kids, Pre-K to Grade 9", "Free printable reading log for kids"],
  description: `A free printable reading log: date, book, minutes read and how it felt. Works for any grade from Pre-K to Grade 9. Then read stories in ${APP_NAME}.`,
  path: activitiesPath.readingLog(),
  type: "article",
});

const ROWS = 20;

export default function ReadingLogPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Activities", href: activitiesPath.hub() }, { label: "Reading log" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: "Printable reading log", description: "A free printable reading log for any grade.", path: activitiesPath.readingLog() })]} />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold print:text-3xl">Reading log</h1>
        <PrintButton label="Print the log" />
      </div>
      <p className="mt-2 font-read text-lg text-ink-soft print:text-ink">Name: ______________________ &nbsp; Month: ______________</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left font-read text-lg">
          <caption className="sr-only">Reading log</caption>
          <thead>
            <tr className="bg-paper">
              <th scope="col" className="border border-line p-2">Date</th>
              <th scope="col" className="border border-line p-2">Book</th>
              <th scope="col" className="border border-line p-2">Minutes</th>
              <th scope="col" className="border border-line p-2">How it felt</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, i) => (
              <tr key={i}>
                <td className="h-10 w-28 border border-line" />
                <td className="border border-line" />
                <td className="w-24 border border-line" />
                <td className="w-40 border border-line text-center" aria-label="Circle one">
                  <span aria-hidden="true">🙂 😐 🙁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SitePage>
  );
}
