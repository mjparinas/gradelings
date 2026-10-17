// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo } from "@/lib/model";

// The real store and the real account calls run; only the device database, the sync
// loop and the Next router are faked, and fetch answers like the server would.
const h = vi.hoisted(() => ({ push: vi.fn(), syncNow: vi.fn(), unsynced: [] as unknown[] }));
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn().mockResolvedValue(undefined),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  unsyncedEvents: vi.fn(async () => h.unsynced),
  markSynced: vi.fn().mockResolvedValue(undefined),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: h.syncNow, startBackgroundSync: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: h.push }) }));

import { useStore } from "@/lib/store";
import { saveReferralCode } from "@/lib/referral";
import { AccountPage } from "./Account";

type Handler = (init: RequestInit | undefined, url: string) => Response | Promise<Response>;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

let routes: Record<string, Handler>;
const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  const method = init?.method ?? "GET";
  const handler = routes[`${method} ${url}`] ?? routes[`${method} ${url.split("?")[0]}`];
  if (!handler) return json({ error: `no route for ${method} ${url}` }, 500);
  return handler(init, url);
});
const calls = (method: string, url: string) => fetchMock.mock.calls.filter(([u, i]) => String(u) === url && (i?.method ?? "GET") === method);
const bodyOf = (method: string, url: string) => JSON.parse(String(calls(method, url).at(-1)![1]!.body));

const family = (over: Partial<FamilyInfo> = {}): FamilyInfo => ({ plan: "trial", trialEndsAt: Date.now() + 86_400_000, updatedAt: 1, ...over });
const signedIn = (verified = true) => family({ account: { email: "parent@example.com", familyId: "fam1", verified } });

beforeEach(() => {
  routes = {
    "GET /api/account/prefs/": () => json({ weeklyReport: false, practiceReminders: true }),
    "GET /api/auth/sessions/": () =>
      json({
        sessions: [
          { id: "s1", device: "iPad", createdAt: Date.UTC(2026, 0, 5), current: true },
          { id: "s2", device: "Chromebook", createdAt: Date.UTC(2026, 1, 9), current: false },
        ],
      }),
    "GET /api/auth/me/": () => json({ family: signedIn(), billing: { stripe: true, dev: false } }),
  };
  fetchMock.mockClear();
  vi.stubGlobal("fetch", fetchMock);
  h.push.mockReset();
  h.syncNow.mockReset().mockResolvedValue(undefined);
  h.unsynced = [];
  // The router scrolls to the top on every hash change; jsdom has no scrolling.
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  window.location.hash = "#/account";
  localStorage.clear();
  useStore.setState({ family: family(), sync: { cursor: 5, status: "signed-out", dirtyProfiles: [], dirtyFamily: false } });
});
afterEach(() => vi.unstubAllGlobals());

const fill = (label: string | RegExp, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe("AccountPage signed out", () => {
  it("creates an account at /api/auth/signup/, adopts the family and reports billing", async () => {
    routes["POST /api/auth/signup/"] = () => json({ family: signedIn(false) });
    const onBilling = vi.fn();
    const trialEndsAt = useStore.getState().family.trialEndsAt;
    render(<AccountPage onBilling={onBilling} />);
    expect(screen.getByRole("heading", { name: "Create a free account" })).toBeInTheDocument();
    expect(screen.getByText("At least 8 characters.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "terms" })).toHaveAttribute("href", "/terms/");
    fill("Email", "parent@example.com");
    fill(/^Password/, "longenough");
    await userEvent.click(screen.getByRole("button", { name: "Create account & sync" }));
    await waitFor(() => expect(onBilling).toHaveBeenCalledWith({ stripe: true, dev: false }));
    const body = bodyOf("POST", "/api/auth/signup/");
    expect(body).toMatchObject({ email: "parent@example.com", password: "longenough" });
    // The device's trial carries over into the new account.
    expect(body.trialEndsAt).toBe(trialEndsAt);
    expect(useStore.getState().family.account?.email).toBe("parent@example.com");
    expect(h.syncNow).toHaveBeenCalled();
    expect(calls("GET", "/api/auth/me/")).toHaveLength(1);
  });

  it("signs in at /api/auth/login/ and downloads the whole history from cursor 0", async () => {
    routes["POST /api/auth/login/"] = () => json({ family: signedIn() });
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.queryByText("At least 8 characters.")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "current-password");
    fill("Email", "parent@example.com");
    fill(/^Password/, "secret-pass");
    await userEvent.click(screen.getByRole("button", { name: "Sign in & sync" }));
    await waitFor(() => expect(useStore.getState().family.account?.email).toBe("parent@example.com"));
    expect(bodyOf("POST", "/api/auth/login/")).toEqual({ email: "parent@example.com", password: "secret-pass" });
    expect(useStore.getState().sync.cursor).toBe(0);
  });

  it("shows the server's error for a wrong password and keeps the form", async () => {
    routes["POST /api/auth/login/"] = () => json({ error: "Wrong email or password." }, 401);
    const onBilling = vi.fn();
    render(<AccountPage onBilling={onBilling} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    fill("Email", "parent@example.com");
    fill(/^Password/, "nope-nope");
    await userEvent.click(screen.getByRole("button", { name: "Sign in & sync" }));
    expect(await screen.findByText("Wrong email or password.")).toBeInTheDocument();
    expect(onBilling).not.toHaveBeenCalled();
    expect(useStore.getState().family.account).toBeUndefined();
    expect(screen.getByRole("button", { name: "Sign in & sync" })).toBeEnabled();
  });

  it("says the parent is offline when the request can't be sent", async () => {
    routes["POST /api/auth/signup/"] = () => Promise.reject(new TypeError("Failed to fetch"));
    render(<AccountPage onBilling={vi.fn()} />);
    fill("Email", "parent@example.com");
    fill(/^Password/, "longenough");
    await userEvent.click(screen.getByRole("button", { name: "Create account & sync" }));
    expect(await screen.findByText("You're offline. Connect to the internet and try again.")).toBeInTheDocument();
  });

  it("sends a reset link from /api/auth/forgot/ without asking for a password", async () => {
    routes["POST /api/auth/forgot/"] = () => json({ message: "If that email has an account, a reset link is on its way." });
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await userEvent.click(screen.getByRole("button", { name: "Forgot your password?" }));
    expect(screen.queryByLabelText("Password")).not.toBeInTheDocument();
    fill("Email", "parent@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Email me a reset link" }));
    expect(await screen.findByText("If that email has an account, a reset link is on its way.")).toBeInTheDocument();
    expect(bodyOf("POST", "/api/auth/forgot/")).toEqual({ email: "parent@example.com" });
    await userEvent.click(screen.getByRole("button", { name: "Back to sign in" }));
    expect(screen.getByRole("button", { name: "Sign in & sync" })).toBeInTheDocument();
  });

  it("thanks an invited parent and sends the friend's code with the sign-up", async () => {
    saveReferralCode("FRND2345");
    routes["POST /api/auth/signup/"] = () => json({ family: signedIn(false) });
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByText(/A friend invited you/)).toBeInTheDocument();
    fill("Email", "parent@example.com");
    fill(/^Password/, "longenough");
    await userEvent.click(screen.getByRole("button", { name: "Create account & sync" }));
    await waitFor(() => expect(calls("POST", "/api/auth/signup/")).toHaveLength(1));
    expect(bodyOf("POST", "/api/auth/signup/").referralCode).toBe("FRND2345");
  });

  it("goes on to the plans after creating an account from the Subscribe button", async () => {
    window.location.hash = "#/account?next=subscription";
    routes["POST /api/auth/signup/"] = () => json({ family: signedIn(false) });
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Create an account to subscribe" })).toBeInTheDocument();
    expect(screen.getByText(/you'll pick monthly or yearly/)).toBeInTheDocument();
    fill("Email", "parent@example.com");
    fill(/^Password/, "longenough");
    await userEvent.click(screen.getByRole("button", { name: "Create account & sync" }));
    await waitFor(() => expect(window.location.hash).toBe("#/subscription"));
  });

  it("hides the security and delete panels until signed in", () => {
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.queryByRole("heading", { name: "🔒 Security" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Delete my account…" })).not.toBeInTheDocument();
  });
});

describe("AccountPage signed in", () => {
  beforeEach(() => {
    useStore.setState({ family: signedIn(), sync: { cursor: 5, status: "idle", lastSyncAt: undefined, dirtyProfiles: [], dirtyFamily: false } });
  });

  it("shows the email and sync time, with the upload count folded under Sync details", async () => {
    h.unsynced = [{}, {}, {}];
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByText("parent@example.com")).toBeInTheDocument();
    expect(screen.getByText("Not synced yet")).toBeInTheDocument();
    const details = screen.getByText("Sync details").closest("details")!;
    expect(details).not.toHaveAttribute("open");
    await waitFor(() => expect(details).toHaveTextContent("3 events"));
  });

  it("shows a sync error and syncs or signs out on request", async () => {
    routes["POST /api/auth/logout/"] = () => json({});
    useStore.setState({ sync: { ...useStore.getState().sync, error: "Couldn't reach the server." } });
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByText("Couldn't reach the server.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Sync now" }));
    expect(h.syncNow).toHaveBeenCalledTimes(1);
    // The first "Sign out" is the account's own; the security panel lists other devices after it.
    await userEvent.click(screen.getAllByRole("button", { name: "Sign out" })[0]);
    await waitFor(() => expect(useStore.getState().family.account).toBeUndefined());
    expect(calls("POST", "/api/auth/logout/")).toHaveLength(1);
    expect(useStore.getState().sync.status).toBe("signed-out");
  });

  it("saves one progress-email choice to both preferences at /api/account/prefs/", async () => {
    routes["GET /api/account/prefs/"] = () => json({ weeklyReport: true, practiceReminders: false });
    routes["POST /api/account/prefs/"] = (init) => json(JSON.parse(String(init!.body)));
    render(<AccountPage onBilling={vi.fn()} />);
    const weekly = await screen.findByRole("radio", { name: "Weekly summary" });
    expect(weekly).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("radio", { name: "Summary and reminders" }));
    await waitFor(() => expect(screen.getByRole("radio", { name: "Summary and reminders" })).toHaveAttribute("aria-checked", "true"));
    expect(bodyOf("POST", "/api/account/prefs/")).toEqual({ weeklyReport: true, practiceReminders: true });
    expect(screen.getByText(/never to your child/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "None" }));
    await waitFor(() => expect(screen.getByRole("radio", { name: "None" })).toHaveAttribute("aria-checked", "true"));
    expect(bodyOf("POST", "/api/account/prefs/")).toEqual({ weeklyReport: false, practiceReminders: false });
  });

  it("turns news and tips off and on", async () => {
    routes["GET /api/account/prefs/"] = () => json({ weeklyReport: false, practiceReminders: false, adminMail: true });
    routes["POST /api/account/prefs/"] = (init) => json({ weeklyReport: false, practiceReminders: false, adminMail: true, ...JSON.parse(String(init!.body)) });
    render(<AccountPage onBilling={vi.fn()} />);
    const news = await screen.findByRole("radiogroup", { name: "News and tips" });
    expect(within(news).getByRole("radio", { name: "On" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(within(news).getByRole("radio", { name: "Off" }));
    await waitFor(() => expect(within(news).getByRole("radio", { name: "Off" })).toHaveAttribute("aria-checked", "true"));
    expect(bodyOf("POST", "/api/account/prefs/")).toEqual({ adminMail: false });
  });

  it("picks no option for reminders without the weekly summary, which older versions allowed", async () => {
    render(<AccountPage onBilling={vi.fn()} />);
    await screen.findByRole("radiogroup", { name: "Progress emails" });
    for (const name of ["Weekly summary", "Summary and reminders", "None"]) expect(screen.getByRole("radio", { name })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("Practice reminders only. Pick an option to change it.")).toBeInTheDocument();
  });

  it("keeps the email choice as it was and explains when the change fails", async () => {
    routes["GET /api/account/prefs/"] = () => json({ weeklyReport: false, practiceReminders: false });
    routes["POST /api/account/prefs/"] = () => json({ error: "Confirm your email first." }, 403);
    useStore.setState({ family: signedIn(false) });
    render(<AccountPage onBilling={vi.fn()} />);
    const none = await screen.findByRole("radio", { name: "None" });
    expect(screen.getByText("Confirm your email first to turn these on.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Weekly summary" }));
    expect(await screen.findByText("Confirm your email first.")).toBeInTheDocument();
    expect(none).toHaveAttribute("aria-checked", "true");
  });

  it("falls back to an offline message when the choice can't be saved", async () => {
    routes["POST /api/account/prefs/"] = () => Promise.reject(new TypeError("offline"));
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(await screen.findByRole("radio", { name: "Weekly summary" }));
    expect(await screen.findByText("You’re offline. Try again when connected.")).toBeInTheDocument();
  });

  it("has no browser notification switch: the Sunday push was removed", async () => {
    render(<AccountPage onBilling={vi.fn()} />);
    await screen.findByRole("radiogroup", { name: "Progress emails" });
    expect(screen.queryByRole("switch", { name: /notification/i })).not.toBeInTheDocument();
  });

  it("keeps this device's voice and PIN, and the privacy panels, on the Account page", () => {
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "🗣️ Read-aloud voice (this device)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "🔒 Parent PIN (this device)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your data, your choice" })).toBeInTheDocument();
  });

  it("hides the email toggles when the preferences can't be loaded", async () => {
    routes["GET /api/account/prefs/"] = () => json({}, 500);
    render(<AccountPage onBilling={vi.fn()} />);
    await waitFor(() => expect(calls("GET", "/api/account/prefs/").length).toBeGreaterThan(0));
    await act(async () => {});
    expect(screen.queryByRole("radiogroup", { name: "Progress emails" })).not.toBeInTheDocument();
  });

  it("asks an unconfirmed parent to confirm, and resends the link once", async () => {
    routes["POST /api/auth/resend-verification/"] = () => json({});
    useStore.setState({ family: signedIn(false) });
    render(<AccountPage onBilling={vi.fn()} />);
    expect(screen.getByText("Please confirm your email.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Send the link again" }));
    const sent = await screen.findByRole("button", { name: "Sent. Check your inbox" });
    expect(sent).toBeDisabled();
    expect(calls("POST", "/api/auth/resend-verification/")).toHaveLength(1);
  });

  it("shows why the confirmation link couldn't be resent", async () => {
    routes["POST /api/auth/resend-verification/"] = () => json({ error: "Too many requests. Try again later." }, 429);
    useStore.setState({ family: signedIn(false) });
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Send the link again" }));
    expect(await screen.findByText("Too many requests. Try again later.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send the link again" })).toBeEnabled();
  });

  it("changes the password at /api/auth/password/ and clears the fields", async () => {
    routes["POST /api/auth/password/"] = () => json({});
    render(<AccountPage onBilling={vi.fn()} />);
    fill("Current password", "old-password");
    fill("New password", "new-password");
    await userEvent.click(screen.getByRole("button", { name: "Change password" }));
    expect(await screen.findByText("Password changed. Other devices were signed out.")).toBeInTheDocument();
    expect(bodyOf("POST", "/api/auth/password/")).toEqual({ current: "old-password", password: "new-password" });
    expect(screen.getByLabelText("Current password")).toHaveValue("");
  });

  it("shows the error when the current password is wrong", async () => {
    routes["POST /api/auth/password/"] = () => json({ error: "Your current password is wrong." }, 400);
    render(<AccountPage onBilling={vi.fn()} />);
    fill("Current password", "bad");
    fill("New password", "new-password");
    await userEvent.click(screen.getByRole("button", { name: "Change password" }));
    expect(await screen.findByText("Your current password is wrong.")).toBeInTheDocument();
  });

  it("lists signed-in devices and signs out one, or every other one", async () => {
    routes["DELETE /api/auth/sessions/"] = () => json({});
    render(<AccountPage onBilling={vi.fn()} />);
    const ipad = await screen.findByText(/iPad/);
    expect(ipad).toHaveTextContent("(this device)");
    // Only the other device gets its own sign-out button.
    const signOuts = screen.getAllByRole("button", { name: "Sign out" });
    expect(signOuts).toHaveLength(2); // the account's own Sign out, plus the Chromebook's
    await userEvent.click(signOuts[1]);
    expect(await screen.findByText("Signed out.")).toBeInTheDocument();
    expect(calls("DELETE", "/api/auth/sessions/?id=s2")).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Sign out everywhere else" }));
    expect(await screen.findByText("Every other device was signed out.")).toBeInTheDocument();
    expect(calls("DELETE", "/api/auth/sessions/")).toHaveLength(1);
    // The list reloads after each change.
    expect(calls("GET", "/api/auth/sessions/").length).toBeGreaterThanOrEqual(3);
  });

  it("offers no 'everywhere else' button when this is the only device", async () => {
    routes["GET /api/auth/sessions/"] = () => json({ sessions: [{ id: "s1", device: "iPad", createdAt: 0, current: true }] });
    render(<AccountPage onBilling={vi.fn()} />);
    await screen.findByText(/iPad/);
    expect(screen.queryByRole("button", { name: "Sign out everywhere else" })).not.toBeInTheDocument();
  });

  it("deletes the account only with the password, then wipes the device and leaves", async () => {
    routes["DELETE /api/account/"] = (init) =>
      JSON.parse(String(init!.body)).password === "right-password" ? json({}) : json({ error: "That password isn't right." }, 403);
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete my account…" }));
    const dialog = screen.getByRole("dialog", { name: "Delete everything?" });
    expect(dialog).toHaveTextContent("This can't be undone.");
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong" } });
    await userEvent.click(screen.getByRole("button", { name: "Yes, delete my account" }));
    expect(await screen.findByText("That password isn't right.")).toBeInTheDocument();
    expect(h.push).not.toHaveBeenCalled();
    expect(useStore.getState().family.account).toBeDefined();

    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "right-password" } });
    await userEvent.click(screen.getByRole("button", { name: "Yes, delete my account" }));
    await waitFor(() => expect(h.push).toHaveBeenCalledWith("/play/"));
    expect(useStore.getState().family.account).toBeUndefined();
  });

  it("asks a Google-only account for its email to delete, and offers a link to add a password", async () => {
    routes["GET /api/auth/sessions/"] = () => json({ sessions: [{ id: "s1", device: "iPad", createdAt: Date.UTC(2026, 0, 5), current: true }], hasPassword: false });
    routes["DELETE /api/account/"] = () => json({});
    routes["POST /api/auth/forgot/"] = () => json({ message: "If that address has an account, we sent a link." });
    render(<AccountPage onBilling={vi.fn()} />);
    expect(await screen.findByRole("button", { name: "Email me a link to add a password" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Change password" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Email me a link to add a password" }));
    expect(await screen.findByText(/we sent a link/)).toBeInTheDocument();
    expect(bodyOf("POST", "/api/auth/forgot/")).toEqual({ email: "parent@example.com" });

    await userEvent.click(screen.getByRole("button", { name: "Delete my account…" }));
    expect(screen.getByRole("dialog", { name: "Delete everything?" })).toHaveTextContent("Type your email address to confirm.");
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "parent@example.com" } });
    await userEvent.click(screen.getByRole("button", { name: "Yes, delete my account" }));
    await waitFor(() => expect(h.push).toHaveBeenCalledWith("/play/"));
    expect(bodyOf("DELETE", "/api/account/")).toEqual({ email: "parent@example.com" });
  });

  it("closes the delete dialog on Cancel without calling the server", async () => {
    render(<AccountPage onBilling={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete my account…" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(calls("DELETE", "/api/account/")).toHaveLength(0);
  });
});
