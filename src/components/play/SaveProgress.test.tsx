// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const NOW = new Date(2026, 9, 12, 10, 0).getTime();
const h = vi.hoisted(() => ({
  family: {} as Record<string, unknown>,
  sessions: 1,
  flag: true,
  framework: "ca-bc",
  signUp: vi.fn(),
}));

vi.mock("@/lib/store", () => ({
  useStore: (pick: (s: { family: unknown }) => unknown) => pick({ family: h.family }),
  useActiveProfile: () => ({ id: "p1", name: "Ava", framework: h.framework }),
  useDerived: () => ({ totals: { sessions: h.sessions }, days: { "2026-10-12": { sessions: h.sessions } } }),
}));
vi.mock("@/lib/useNow", () => ({ useNow: () => NOW }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => h.flag }));
vi.mock("@/lib/account", () => ({ signUpForReports: (email: string) => h.signUp(email) }));

import { SaveProgress } from "./SaveProgress";

const card = () => screen.queryByRole("region", { name: "For grown-ups" });
const send = (email: string) => {
  fireEvent.change(screen.getByLabelText("Your email"), { target: { value: email } });
  fireEvent.click(screen.getByRole("button", { name: "Send me the reports" }));
};

beforeEach(() => {
  h.family = { plan: "trial", trialEndsAt: NOW + 20 * 86_400_000, updatedAt: 1 };
  h.sessions = 1;
  h.flag = true;
  h.framework = "ca-bc";
  h.signUp.mockReset().mockResolvedValue(undefined);
});

describe("SaveProgress", () => {
  it("asks a grown-up for just an email after the first lesson, with a way in for an existing account", () => {
    render(<SaveProgress />);
    expect(card()).toHaveTextContent("get Ava's progress report by email each week");
    expect(screen.getByLabelText("Your email")).toHaveAttribute("type", "email");
    expect(screen.queryByLabelText(/password/i)).toBeNull();
    expect(screen.getByRole("link", { name: "I have an account" })).toHaveAttribute("href", "/parents/#/account");
  });

  it("makes the account from the email and says to check the inbox", async () => {
    render(<SaveProgress />);
    send(" parent@example.com ");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Check parent@example.com for a link to confirm"));
    expect(h.signUp).toHaveBeenCalledWith("parent@example.com");
    expect(screen.getByRole("status")).toHaveTextContent("Ava's progress is backed up.");
  });

  it("tells a US family the progress waits for the privacy notice", async () => {
    h.framework = "us-wa";
    render(<SaveProgress />);
    send("parent@example.com");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("To back up Ava's progress, open the Parent area and agree to the privacy notice."));
    expect(screen.getByRole("status")).not.toHaveTextContent("is backed up");
  });

  it("points to sign-in when the email already has an account, and shows other errors", async () => {
    h.signUp.mockRejectedValueOnce(new Error("That email already has an account. Try signing in."));
    render(<SaveProgress />);
    send("taken@example.com");
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("already has an account"));
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/parents/#/account");

    h.signUp.mockRejectedValueOnce(new Error("You're offline. Connect to the internet and try again."));
    send("new@example.com");
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("You're offline"));
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
  });

  it("stays away once the family has an account", () => {
    h.family = { ...h.family, account: { email: "p@example.com", familyId: "f" } };
    render(<SaveProgress />);
    expect(card()).toBeNull();
  });

  it("stays away after the first lesson, and when the flag is off", () => {
    h.sessions = 2;
    const { unmount } = render(<SaveProgress />);
    expect(card()).toBeNull();
    unmount();
    h.sessions = 1;
    h.flag = false;
    render(<SaveProgress />);
    expect(card()).toBeNull();
  });
});
