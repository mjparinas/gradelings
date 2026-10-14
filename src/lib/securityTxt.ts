import { absolute } from "./site";

const YEAR_MS = 365 * 24 * 3_600_000;

/** The body of /.well-known/security.txt (RFC 9116), valid for a year from `now`. */
export function securityTxt(email: string, now: Date): string {
  return [
    `Contact: mailto:${email}`,
    `Contact: ${absolute("/contact/")}`,
    `Expires: ${new Date(now.getTime() + YEAR_MS).toISOString().replace(/\.\d{3}Z$/, "Z")}`,
    "Preferred-Languages: en",
    `Canonical: ${absolute("/.well-known/security.txt")}`,
    "",
  ].join("\n");
}
