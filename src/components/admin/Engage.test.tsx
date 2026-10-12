// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { APP_NAME } from "@/lib/brand";
import { Composer, Emails, FamilyEmail, Inbox, Queue } from "./Engage";

type Handler = (url: string, method: string, body?: unknown) => unknown;
const respond = (h: Handler) =>
  mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
    const r = h(url, method, body);
    return r instanceof Error ? Promise.reject(r) : Promise.resolve(r ?? { ok: true });
  });
const sent = (url: string, method = "POST") => mocks.call.mock.calls.findLast(([u, m]) => u === url && m === method)?.[2];

beforeEach(() => {
  mocks.call.mockReset();
});

describe("Composer", () => {
  it("previews the email with a stand-in for names, and sends to one family", async () => {
    respond(() => undefined);
    const user = userEvent.setup();
    const onSent = vi.fn();
    render(<Composer familyId="fam-1" onSent={onSent} />);
    const preview = screen.getByLabelText("Preview");
    expect(within(preview).getByText("Ollie misses [child's first name]!")).toBeInTheDocument();
    expect(within(preview).getByText("Play now")).toBeInTheDocument();
    await user.clear(screen.getByLabelText("Subject"));
    await user.type(screen.getByLabelText("Subject"), "Hello from {{app}");
    expect(within(preview).getByText(`Hello from ${APP_NAME}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send email" }));
    expect(sent("/api/admin/email/")).toMatchObject({ action: "send", familyId: "fam-1", message: { subject: "Hello from {app}", button: { path: "/play/" } } });
    expect(await screen.findByText("Email sent.")).toBeInTheDocument();
    expect(onSent).toHaveBeenCalled();
  });

  it("can drop the button", async () => {
    respond(() => undefined);
    const user = userEvent.setup();
    render(<Composer familyId="fam-1" />);
    await user.click(screen.getByLabelText("Add a button"));
    expect(screen.queryByLabelText("Button text")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send email" }));
    expect(sent("/api/admin/email/")).toMatchObject({ message: { button: null } });
  });

  it("shows who a group send reaches and only sends once the count is typed", async () => {
    respond((url) =>
      url.startsWith("/api/admin/email/?segment=")
        ? { ready: 140, batch: 100, total: 150, skipped: { unconfirmed: 4, unsubscribed: 3, bounced: 1, recent: 2 }, sample: [{ email: "a@example.com" }] }
        : url === "/api/admin/email/"
          ? { sent: 100, failed: 0, remaining: 40 }
          : undefined,
    );
    const user = userEvent.setup();
    render(<Composer segment="quiet-7" />);
    expect(await screen.findByText(/This send reaches 100 families \(140 in all; up to 100 at a time\)/)).toBeInTheDocument();
    expect(screen.getByText(/4 unconfirmed, 3 unsubscribed, 1 bouncing/)).toBeInTheDocument();
    const send = screen.getByRole("button", { name: "Send to the group" });
    expect(send).toBeDisabled();
    await user.type(screen.getByLabelText("Type SEND 100 to confirm"), "SEND 10");
    expect(send).toBeDisabled();
    await user.type(screen.getByLabelText("Type SEND 100 to confirm"), "0");
    await user.click(send);
    expect(sent("/api/admin/email/")).toMatchObject({ action: "send-segment", segment: "quiet-7", confirm: "SEND 100" });
    expect(await screen.findByText("Sent 100. 40 more in this group: send again to continue.")).toBeInTheDocument();
  });

  it("says when nobody in a group can be emailed", async () => {
    respond(() => ({ ready: 0, batch: 0, total: 3, skipped: { unconfirmed: 3, unsubscribed: 0, bounced: 0, recent: 0 }, sample: [] }));
    render(<Composer segment="cancelled" />);
    expect(await screen.findByText(/Nobody in this group can be emailed right now/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/to confirm/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send to the group" })).toBeDisabled();
  });
});

describe("Emails", () => {
  it("shows the 30-day counts, the setup note and the log, and opens a family", async () => {
    respond((url) =>
      url.startsWith("/api/admin/email/?segment=")
        ? { ready: 0, batch: 0, total: 0, skipped: {}, sample: [] }
        : { emails: [{ id: "1", familyId: "fam-1", email: "pat@example.com", kind: "admin", label: "Ollie misses {children}!", status: "bounced", sentAt: Date.now(), sentBy: "me" }], counts30: { delivered: 3, bounced: 1 }, resendWebhook: false },
    );
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<Emails onOpenFamily={onOpen} />);
    expect(await screen.findByText(/Delivery reports are off/)).toBeInTheDocument();
    expect(screen.getByText("1 (25%)")).toBeInTheDocument();
    const log = screen.getByRole("region", { name: "Emails sent" });
    expect(within(log).getByText("Ollie misses {children}!")).toBeInTheDocument();
    expect(within(log).getByText("Bounced")).toBeInTheDocument();
    await user.click(within(log).getByRole("button", { name: "pat@example.com" }));
    expect(onOpen).toHaveBeenCalledWith("fam-1");
  });
});

describe("Queue", () => {
  const items = [
    { key: "trial-ending:fam-1", kind: "trial-ending", title: "Trial ending, child practised", detail: "Trial ends in 2 days.", familyId: "fam-1", email: "pat@example.com", at: 1, action: { type: "email", preset: "trial-ending" } },
    { key: "unconfirmed:fam-2", kind: "unconfirmed", title: "Email not confirmed", detail: "Signed up 3 days ago.", familyId: "fam-2", email: "sam@example.com", at: 1, action: { type: "verify" } },
    { key: "inbox:m1", kind: "inbox", title: "Email waiting for an answer", detail: "“Help” from Lee", email: "lee@example.com", at: 1, action: { type: "inbox", id: "m1" } },
    { key: "reports", kind: "reports", title: "Question reports", detail: "2 question reports waiting.", at: 1, action: { type: "reports" } },
  ];

  it("offers the fitting action for each item", async () => {
    respond((url, method) => (url === "/api/admin/queue/" && method === "GET" ? { items } : undefined));
    const user = userEvent.setup();
    const onInbox = vi.fn();
    const onReports = vi.fn();
    const onCount = vi.fn();
    render(<Queue onOpenFamily={vi.fn()} onReports={onReports} onInbox={onInbox} onCount={onCount} />);
    expect(await screen.findByText("Trial ending, child practised")).toBeInTheDocument();
    expect(onCount).toHaveBeenCalledWith(4);

    await user.click(screen.getByRole("button", { name: "Write email" }));
    expect(screen.getByRole("button", { name: "Write email" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Subject")).toHaveValue("Your {app} free trial ends soon");

    await user.click(screen.getByRole("button", { name: "Resend confirmation" }));
    expect(sent("/api/admin/email/")).toEqual({ action: "verify", familyId: "fam-2" });
    expect(await screen.findByText("Confirmation email sent.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Read and reply" }));
    expect(onInbox).toHaveBeenCalledWith("m1");
    await user.click(screen.getByRole("button", { name: "Open reports" }));
    expect(onReports).toHaveBeenCalled();
  });

  it("snoozes and dismisses items", async () => {
    respond((url, method) => (url === "/api/admin/queue/" && method === "GET" ? { items } : undefined));
    const user = userEvent.setup();
    const onCount = vi.fn();
    render(<Queue onOpenFamily={vi.fn()} onReports={vi.fn()} onInbox={vi.fn()} onCount={onCount} />);
    await screen.findByText("Question reports");
    await user.click(screen.getAllByRole("button", { name: "Snooze a week" })[0]);
    expect(sent("/api/admin/queue/")).toEqual({ key: "trial-ending:fam-1", days: 7 });
    await waitFor(() => expect(screen.queryByText("Trial ending, child practised")).not.toBeInTheDocument());
    await user.click(screen.getAllByRole("button", { name: "Dismiss" })[0]);
    expect(sent("/api/admin/queue/")).toEqual({ key: "unconfirmed:fam-2", days: null });
    await waitFor(() => expect(onCount).toHaveBeenLastCalledWith(2));
  });

  it("says when there's nothing to do", async () => {
    respond(() => ({ items: [] }));
    render(<Queue onOpenFamily={vi.fn()} onReports={vi.fn()} onInbox={vi.fn()} />);
    expect(await screen.findByText(/Nothing to do right now/)).toBeInTheDocument();
  });
});

describe("Inbox", () => {
  const item = { id: "m1", from: "Lee <lee@example.com>", fromEmail: "lee@example.com", subject: "Help with fractions", receivedAt: Date.now(), attachments: 1, familyId: "fam-9", handledAt: null, repliedAt: null };

  it("lists mail, opens one as text and replies", async () => {
    respond((url, method) => {
      if (url === "/api/admin/inbox/" && method === "GET") return { configured: true, items: [item], hasMore: false };
      if (url === "/api/admin/inbox/?id=m1") return { message: { ...item, text: "<b>Hi</b> there", replyTo: "lee@example.com", attachmentNames: ["sheet.pdf"] } };
      return undefined;
    });
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<Inbox onOpenFamily={onOpen} />);
    expect(await screen.findByText("Waiting")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Help with fractions/ }));
    // Shown as text, never as HTML.
    expect(await screen.findByText("<b>Hi</b> there")).toBeInTheDocument();
    expect(screen.getByText(/sheet\.pdf/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open their account" }));
    expect(onOpen).toHaveBeenCalledWith("fam-9");
    expect(screen.getByRole("button", { name: "Send reply" })).toBeDisabled();
    await user.type(screen.getByLabelText("Your reply"), "Happy to help.");
    await user.click(screen.getByRole("button", { name: "Send reply" }));
    expect(sent("/api/admin/inbox/")).toEqual({ id: "m1", action: "reply", text: "Happy to help." });
    expect(await screen.findByText("Reply sent.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mark as done" }));
    expect(sent("/api/admin/inbox/")).toEqual({ id: "m1", action: "handled", handled: true });
  });

  it("opens straight to a message, and explains when email isn't set up", async () => {
    respond((url) => (url === "/api/admin/inbox/?id=m1" ? { message: { ...item, text: "Hello", replyTo: "lee@example.com", attachmentNames: [] } } : { configured: false, items: [], hasMore: false }));
    const user = userEvent.setup();
    render(<Inbox initialId="m1" onOpenFamily={vi.fn()} />);
    expect(await screen.findByRole("heading", { name: "Help with fractions" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "← Inbox" }));
    expect(await screen.findByText(/Email isn't set up yet/)).toBeInTheDocument();
  });
});

describe("FamilyEmail", () => {
  const parent = { verified: true, newsAndTips: true, bouncedAt: null, lastLogin: null };

  it("offers the composer and lists what was sent", () => {
    respond(() => undefined);
    render(<FamilyEmail familyId="fam-1" parent={parent} emails={[{ id: "1", familyId: "fam-1", email: "pat@example.com", kind: "weekly", label: null, status: "delivered", sentAt: Date.now(), sentBy: null }]} />);
    expect(screen.getByRole("button", { name: "Send email" })).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });

  it("only offers the confirmation email when the address isn't confirmed", async () => {
    respond(() => undefined);
    const user = userEvent.setup();
    render(<FamilyEmail familyId="fam-1" parent={{ ...parent, verified: false }} emails={[]} />);
    expect(screen.queryByRole("button", { name: "Send email" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Resend confirmation email" }));
    expect(sent("/api/admin/email/")).toEqual({ action: "verify", familyId: "fam-1" });
    expect(await screen.findByText("Confirmation email sent.")).toBeInTheDocument();
  });

  it("won't email a bouncing or unsubscribed address", () => {
    const { rerender } = render(<FamilyEmail familyId="fam-1" parent={{ ...parent, bouncedAt: 1 }} emails={[]} />);
    expect(screen.getByText(/bounced or was marked as spam/)).toBeInTheDocument();
    rerender(<FamilyEmail familyId="fam-1" parent={{ ...parent, newsAndTips: false }} emails={[]} />);
    expect(screen.getByText(/turned off news and tips/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send email" })).not.toBeInTheDocument();
  });
});
