import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/site/ContactForm";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { teacherPath } from "@/components/site/teachers";
import { APP_NAME, CONTACT_EMAIL, LEGAL_NAME, MAILING_ADDRESS, REPLY_TIME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = pageMeta({
  title: "Contact us",
  description: `Questions, feedback, a school enquiry or a privacy request? Send the ${APP_NAME} team a message or email us.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <SitePage>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Contact us</h1>
        <p className="mt-3 font-read text-lg">
          Send us a message below, or email{" "}
          <a className="font-semibold text-[#2f6fd6] underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . A person reads every message and replies within {REPLY_TIME}. Many answers are already on the{" "}
          <Link className="font-semibold underline" href="/help/">
            help page
          </Link>
          .
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="card mt-6 flex flex-col gap-3 p-6 font-read text-lg">
          <p>
            <strong>Something isn’t working?</strong> Tell us the device and browser you use, and what you expected to happen.
          </p>
          <p>
            <strong>A question looks wrong?</strong> Tap the flag above the answer bar in the app. That reaches us directly with the question attached.
          </p>
          <p>
            <strong>Privacy requests:</strong> you can export or delete everything yourself in the Parent area. For anything else, write to us. See the{" "}
            <Link className="underline" href="/privacy/">
              privacy policy
            </Link>
            .
          </p>
          <p>
            <strong>Schools and teachers:</strong> see{" "}
            <Link className="underline" href={teacherPath.hub()}>
              {APP_NAME} for teachers
            </Link>
            , or pick “Schools and classes” above.
          </p>
          {MAILING_ADDRESS && (
            <p>
              <strong>By mail:</strong> {LEGAL_NAME}, {MAILING_ADDRESS}
            </p>
          )}
        </div>
      </div>
    </SitePage>
  );
}
