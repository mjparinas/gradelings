import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { PlayBadge } from "@/components/site/AppBadges";
import { ANDROID_FAQS, ANDROID_POSTS, androidPath } from "@/components/site/android";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: ["Gradelings for Android: Pre-K to Grade 9 learning app", "Gradelings Android app for kids", "Gradelings for Android"],
  description: `${APP_NAME} is on Google Play: curriculum-matched practice, learning games and parent reports for Pre-K to Grade 9, on Android phones and tablets, and offline once a grade has downloaded.`,
  path: androidPath.hub(),
});

export default function AndroidHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Android app" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(ANDROID_FAQS), itemListJsonLd("Android app guides", ANDROID_POSTS.map((p) => ({ name: p.title, path: androidPath.post(p.slug) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">{APP_NAME} for Android</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        The {APP_NAME} app is on Google Play. It is the same curriculum-matched practice, games and parent reports for Pre-K to Grade 9, full screen on your Android phone or tablet.
      </p>
      <div className="mt-5">
        <PlayBadge />
      </div>
      <ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
        {[
          ["Works offline", "Once a grade has downloaded, lessons and games keep working with no signal, and progress syncs when you reconnect."],
          ["Your family account", "Sign in and your children, settings and progress are already there. No separate account for the app."],
          ["Made for kids", "Big touch targets, read-aloud, calm mode and no ads, ever."],
          ["Classes too", "Students sign in with a login code from their teacher and see the units assigned to them."],
        ].map(([t, d]) => (
          <li key={t} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-xl font-bold">{t}</h2>
            <p className="mt-1 font-read text-ink-soft">{d}</p>
          </li>
        ))}
      </ul>
      <section aria-labelledby="guides" className="mt-10 max-w-3xl">
        <h2 id="guides" className="text-2xl font-bold">
          Guides for the Android app
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {ANDROID_POSTS.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-line bg-white p-4 font-read text-lg">
              <Link href={androidPath.post(p.slug)} className="font-bold underline">
                {p.title}
              </Link>
              <p className="text-ink-soft">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="faq" className="mt-10 max-w-3xl">
        <h2 id="faq" className="text-2xl font-bold">
          Questions parents ask
        </h2>
        <dl className="mt-3 flex flex-col gap-4 font-read text-lg">
          {ANDROID_FAQS.map((f) => (
            <div key={f.q}>
              <dt className="font-bold">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </SitePage>
  );
}
