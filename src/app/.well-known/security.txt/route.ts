import { CONTACT_EMAIL } from "@/lib/brand";
import { securityTxt } from "@/lib/securityTxt";

// RFC 9116: where to report a security problem. Built once per deploy; `Expires` is a year after the build, so it
// stays valid as long as the site is deployed at least once a year.
export const dynamic = "force-static";

export function GET() {
  return new Response(securityTxt(CONTACT_EMAIL, new Date()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
