import type { Metadata } from "next";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { TrustCentre } from "@/components/site/TrustCentre";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: "Trust centre",
  description: `The security and privacy controls that protect families, children and classes on ${APP_NAME}, in plain words.`,
  path: "/trust/",
});

export default function TrustPage() {
  return (
    <SitePage cta>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Trust centre" }]} />
      <TrustCentre />
    </SitePage>
  );
}
