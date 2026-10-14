import { describe, expect, it } from "vitest";
import { securityTxt } from "./securityTxt";

describe("security.txt", () => {
  it("names a contact and expires a year after it is built (RFC 9116)", () => {
    const body = securityTxt("hello@example.com", new Date("2026-10-14T12:00:00.000Z"));
    expect(body).toContain("Contact: mailto:hello@example.com\n");
    expect(body).toMatch(/^Contact: https:\/\/.+\/contact\/$/m);
    expect(body).toContain("Expires: 2027-10-14T12:00:00Z\n");
    expect(body).toMatch(/^Canonical: https:\/\/.+\/\.well-known\/security\.txt$/m);
    expect(body.endsWith("\n")).toBe(true);
  });
});
