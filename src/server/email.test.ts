import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { emailConfigured, outbox, sendEmail } from "./email";

const mail = { to: "parent@example.com", subject: "Your week", html: "<p>Hi</p>", text: "Hi" };
const fetchMock = vi.fn<(url: string, init: RequestInit) => Promise<Response>>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("without Resend keys", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_FROM", "");
  });

  it("keeps mail in the outbox in development and tests", async () => {
    const before = outbox().length;
    expect(emailConfigured()).toBe(false);
    expect(await sendEmail(mail)).toEqual({ ok: true, skipped: true });
    expect(outbox().slice(before)).toEqual([expect.objectContaining({ to: "parent@example.com", subject: "Your week" })]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps a subject to one line", async () => {
    const before = outbox().length;
    await sendEmail({ ...mail, subject: "Join\r\nBcc: someone@example.com\tnow " });
    expect(outbox().slice(before)[0].subject).toBe("Join Bcc: someone@example.com now");
  });

  it("skips it in production, so nothing pretends to have been sent", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const before = outbox().length;
    expect(await sendEmail(mail)).toEqual({ ok: false, skipped: true });
    expect(outbox().length).toBe(before);
  });
});

describe("with Resend", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("EMAIL_FROM", "Gradelings <hello@example.com>");
    vi.stubEnv("RESEND_API_URL", undefined);
  });

  it("posts the message with the key, and adds one-click unsubscribe to bulk mail", async () => {
    vi.stubEnv("RESEND_API_URL", "https://resend.test/emails");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    expect(await sendEmail({ ...mail, unsubscribeUrl: "https://app.test/unsubscribe/?t=abc" })).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://resend.test/emails");
    expect(init.headers).toMatchObject({ authorization: "Bearer re_test" });
    expect(JSON.parse(String(init.body))).toEqual({
      from: "Gradelings <hello@example.com>",
      to: ["parent@example.com"],
      subject: "Your week",
      html: "<p>Hi</p>",
      text: "Hi",
      headers: { "List-Unsubscribe": "<https://app.test/unsubscribe/?t=abc>", "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    });
  });

  it("sends one-off mail without unsubscribe headers to Resend's default address", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    await sendEmail(mail);
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body)).headers).toBeUndefined();
  });

  it("reports a refusal or an unreachable service without throwing", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 422 }));
    expect(await sendEmail(mail)).toEqual({ ok: false });
    expect(console.error).toHaveBeenCalledWith("[email] Resend answered 422");
    fetchMock.mockRejectedValueOnce(new Error("ECONNRESET"));
    expect(await sendEmail(mail)).toEqual({ ok: false });
    expect(console.error).toHaveBeenCalledWith("[email] could not reach Resend", "ECONNRESET");
  });
});
