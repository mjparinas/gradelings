import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { StatusCheck } from "@/components/site/StatusCheck";
import { APP_NAME, CONTACT_EMAIL, REPLY_TIME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: "Service status",
  description: `Is ${APP_NAME} working right now? A live check of the app, sign-in and syncing.`,
  path: "/status/",
});

export default function StatusPage() {
  return (
    <SitePage>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Status" }]} />
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Service status</h1>
        <p className="mt-2 font-read text-lg text-ink-soft">A live check of {APP_NAME}, run from your browser when this page opens.</p>
        <div className="mt-6">
          <StatusCheck />
        </div>
        <div className="mt-8 flex flex-col gap-3 font-read text-lg">
          <h2 className="text-2xl font-bold">How we watch it</h2>
          <p>We check the app and its database every 15 minutes around the clock, and a failed check alerts us straight away.</p>
          <p>
            {APP_NAME} is built to work offline. A device that has opened the app before keeps working without a connection, and practice is saved on the device and synced once we’re back, so nothing is lost during an outage.
          </p>
          <p>
            Something not working for you while this page says all is well? Tell us on the{" "}
            <Link className="underline" href="/contact/">
              contact page
            </Link>{" "}
            or at{" "}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            , with your device and browser. A person replies within {REPLY_TIME}.
          </p>
        </div>
      </div>
    </SitePage>
  );
}
