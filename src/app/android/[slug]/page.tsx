import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { AndroidCta } from "@/components/site/AndroidCta";
import { ANDROID_POSTS, androidPath, androidPost } from "@/components/site/android";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return ANDROID_POSTS.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/android/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = androidPost((await params).slug);
  if (!post) return {};
  return pageMeta({ title: [post.title, ...post.shortTitles], description: post.description, path: androidPath.post(post.slug), type: "article" });
}

export default async function AndroidPostPage({ params }: Props) {
  const post = androidPost((await params).slug);
  if (!post) notFound();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Android app", href: androidPath.hub() }, { label: post.title }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ headline: post.title, description: post.description, path: androidPath.post(post.slug) })]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">{post.description}</p>
      {post.sections.map((s) => (
        <section key={s.heading} className="mt-8 max-w-3xl">
          <h2 className="text-2xl font-bold">{s.heading}</h2>
          {s.paragraphs.map((t) => (
            <p key={t} className="mt-2 font-read text-lg">
              {t}
            </p>
          ))}
        </section>
      ))}
      <AndroidCta />
      <p className="mt-8 font-read text-lg">
        More: <Link href={androidPath.hub()} className="font-bold underline">the Gradelings Android app</Link>. Reports show practice, not a report-card mark.
      </p>
    </SitePage>
  );
}
