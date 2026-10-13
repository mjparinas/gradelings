import { describe, expect, it } from "vitest";
import { checkContact, CONTACT_LIMITS, CONTACT_TOPICS, topicLabel } from "./contact";

const good = { name: "  Sam   Lee ", email: "sam@example.com", topic: "billing", message: "How do I change my plan?\r\n\r\nThanks" };

describe("checkContact", () => {
  it("cleans a good message", () => {
    expect(checkContact(good)).toEqual({ ok: true, value: { name: "Sam Lee", email: "sam@example.com", topic: "billing", message: "How do I change my plan?\n\nThanks" } });
  });

  it("allows no name", () => {
    expect(checkContact({ ...good, name: undefined }).ok).toBe(true);
  });

  it("strips characters that could break an email header or HTML out of the name", () => {
    const r = checkContact({ ...good, name: "Sam\r\nBcc: x@y.z <b>" });
    expect(r.ok && r.value.name).toBe("Sam Bcc: x@y.z b");
  });

  it.each([
    [{ ...good, email: "not an email" }, "email"],
    [{ ...good, email: "a@b.c\nBcc: x@y.z" }, "email"],
    [{ ...good, topic: "free text" }, "pick"],
    [{ ...good, message: "hi" }, "more"],
    [{ ...good, message: "x".repeat(CONTACT_LIMITS.message + 1) }, "under"],
    [{ ...good, name: "x".repeat(CONTACT_LIMITS.name + 1) }, "name"],
    [null, "email"],
  ])("rejects %#", (body, words) => {
    const r = checkContact(body);
    expect(r.ok).toBe(false);
    expect(!r.ok && r.error).toContain(words);
  });

  it("labels every topic", () => {
    for (const t of CONTACT_TOPICS) expect(topicLabel(t.id)).toBe(t.label);
  });
});
