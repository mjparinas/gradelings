import { APP_NAME, CONTACT_EMAIL, SOCIAL_PROFILES } from "./brand";

/** The public site address, for canonical links, the sitemap and structured data. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gradelings.com").replace(/\/$/, "");

export function absolute(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The site's organization, as other structured data refers to it. */
export const ORG_ID = `${SITE_URL}/#org`;

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: APP_NAME,
  url: SITE_URL,
  logo: absolute("/icon-512.png"),
  email: CONTACT_EMAIL,
  ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
};

/** A reference to the organization, with its name so each block still reads on its own. */
export const ORG_REF = { "@type": "Organization", "@id": ORG_ID, name: APP_NAME, url: SITE_URL };

export function JsonLd({ data }: { data: unknown }) {
  // JSON-LD for search engines. `<` is escaped so content can't close the tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
