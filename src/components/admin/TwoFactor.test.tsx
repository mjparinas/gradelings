// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { AdminApp } from "./AdminApp";
import { TwoFactorCard, TwoFactorSetup, type TwoFactorInfo } from "./TwoFactor";

const off: TwoFactorInfo = { enabled: false, required: true, backupCodesLeft: 0, enabledAt: null };
const on: TwoFactorInfo = { enabled: true, required: true, backupCodesLeft: 8, enabledAt: Date.UTC(2026, 9, 17) };
const codes = ["aaaaa-bbbbb", "ccccc-ddddd", "eeeee-fffff", "ggggg-hhhhh", "jjjjj-kkkkk", "mmmmm-nnnnn", "ppppp-qqqqq", "rrrrr-sssss"];

beforeEach(() => {
  mocks.call.mockReset();
  window.history.replaceState(null, "", "/admin/");
});

describe("TwoFactorSetup", () => {
  it("walks through scanning, confirming a code and saving the recovery codes", async () => {
    const user = userEvent.setup();
    const done = vi.fn();
    mocks.call.mockImplementation((url: string, _m: string, body: { action: string }) => {
      if (body.action === "start") return Promise.resolve({ secret: "JBSWY3DPEHPK3PXP", uri: "otpauth://totp/x?secret=JBSWY3DPEHPK3PXP" });
      if (body.action === "confirm") return Promise.resolve({ codes });
      return Promise.reject(new Error("unexpected"));
    });
    render(<TwoFactorSetup email="owner@example.com" info={off} onDone={done} />);
    expect(screen.getByRole("heading", { name: "Set Up Two-Step Sign-In" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Start Setup" }));
    expect(await screen.findByRole("img", { name: /QR code to add owner@example.com/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Setup key")).toHaveTextContent("JBSWY3DPEHPK3PXP");
    const turnOn = screen.getByRole("button", { name: "Turn On" });
    expect(turnOn).toBeDisabled(); // needs six digits
    await user.type(screen.getByLabelText("6-digit code"), "123 456");
    await user.click(turnOn);
    expect(mocks.call).toHaveBeenLastCalledWith("/api/admin/2fa/", "POST", { action: "confirm", code: "123 456" });
    // The recovery codes come next, and Continue waits until they are marked as saved.
    expect(await screen.findByRole("heading", { name: "Save Your Recovery Codes" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(codes);
    const next = screen.getByRole("button", { name: "Continue" });
    expect(next).toBeDisabled();
    await user.click(screen.getByRole("checkbox"));
    await user.click(next);
    expect(done).toHaveBeenCalled();
  });

  it("shows a wrong code's message and lets the admin try again", async () => {
    const user = userEvent.setup();
    mocks.call.mockImplementation((_u: string, _m: string, body: { action: string }) =>
      body.action === "start" ? Promise.resolve({ secret: "AAAA", uri: "otpauth://totp/x?secret=AAAA" }) : Promise.reject(new Error("That code didn't match.")),
    );
    render(<TwoFactorSetup email="owner@example.com" info={off} onDone={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Start Setup" }));
    await user.type(await screen.findByLabelText("6-digit code"), "000000");
    await user.click(screen.getByRole("button", { name: "Turn On" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("That code didn't match.");
    expect(screen.getByLabelText("6-digit code")).toHaveValue("000000");
  });

  it("tells an admin who already has it on to sign in again with the code", () => {
    render(<TwoFactorSetup email="owner@example.com" info={on} onDone={() => {}} />);
    expect(screen.getByRole("heading", { name: "Sign In With Your Code" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Start Setup" })).toBeNull();
  });
});

describe("TwoFactorCard", () => {
  it("shows the state and the recovery codes left", () => {
    render(<TwoFactorCard info={{ ...on, backupCodesLeft: 1 }} onChange={() => {}} />);
    expect(screen.getByText(/1 recovery code left/)).toBeInTheDocument();
    expect(screen.getByText(/Make new ones soon/)).toBeInTheDocument();
  });

  it("makes new recovery codes after a code, and shows them once", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    mocks.call.mockResolvedValue({ codes });
    render(<TwoFactorCard info={on} onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "Make New Recovery Codes" }));
    await user.type(screen.getByLabelText("Code from your authenticator app"), "654321");
    await user.click(screen.getByRole("button", { name: "Make New Codes" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/2fa/", "POST", { action: "regenerate", code: "654321" });
    expect(await screen.findByRole("heading", { name: "Save Your Recovery Codes" })).toBeInTheDocument();
    expect(changed).toHaveBeenCalled();
  });

  it("turns off with the password and a code, and says what happens", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    mocks.call.mockResolvedValue({ ok: true });
    render(<TwoFactorCard info={on} onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "Turn Off" }));
    expect(screen.getByText(/asked to set it up again straight away/)).toBeInTheDocument();
    await user.type(screen.getByLabelText("Password"), "correct horse");
    await user.type(screen.getByLabelText("Code from your authenticator app"), "654321");
    await user.click(screen.getAllByRole("button", { name: "Turn Off" })[0]);
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/2fa/", "POST", { action: "disable", code: "654321", password: "correct horse" });
    await waitFor(() => expect(changed).toHaveBeenCalled());
  });
});

describe("AdminApp sign-in with a code", () => {
  const needsCode = (message: string) => Object.assign(new Error(message), { data: { mfaRequired: true } });
  const loginCalls = () => mocks.call.mock.calls.filter(([u]) => u === "/api/auth/login/");
  beforeEach(() => {
    mocks.call.mockImplementation(() => Promise.reject(new Error("Not found"))); // signed out
  });

  it("asks for the code only after the server says the account uses one, then sends it with the password", async () => {
    const user = userEvent.setup();
    mocks.call.mockImplementation((url: string, _m: string, body: { code?: string }) => {
      if (url !== "/api/auth/login/") return Promise.reject(new Error("Not found"));
      return body.code ? Promise.resolve({ family: {} }) : Promise.reject(needsCode("This account uses two-step sign-in."));
    });
    render(<AdminApp />);
    await user.type(await screen.findByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Password"), "correct horse");
    expect(screen.queryByLabelText(/Authenticator code/)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    // The first answer only asks for the code; it isn't shown as an error.
    const field = await screen.findByLabelText(/Authenticator code/);
    expect(screen.queryByRole("alert")).toBeNull();
    await user.type(field, "123456");
    await user.click(screen.getByRole("button", { name: "Verify and Sign In" }));
    await waitFor(() => expect(loginCalls()).toHaveLength(2));
    expect(loginCalls()[1][2]).toEqual({ email: "owner@example.com", password: "correct horse", code: "123456" });
  });

  it("shows the server's message for a wrong code and keeps the code step open", async () => {
    const user = userEvent.setup();
    mocks.call.mockImplementation((url: string, _m: string, body: { code?: string }) =>
      url === "/api/auth/login/" ? Promise.reject(needsCode(body.code ? "That code didn't work." : "This account uses two-step sign-in.")) : Promise.reject(new Error("Not found")),
    );
    render(<AdminApp />);
    await user.type(await screen.findByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Password"), "correct horse");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    await user.type(await screen.findByLabelText(/Authenticator code/), "000000");
    await user.click(screen.getByRole("button", { name: "Verify and Sign In" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("That code didn't work.");
    expect(screen.getByLabelText(/Authenticator code/)).toBeInTheDocument();
  });

  it("shows the setup screen, not the panel, for an admin who still has to set it up", async () => {
    mocks.call.mockImplementation((url: string) => (url === "/api/admin/me/" ? Promise.resolve({ email: "owner@example.com", ready: false, twoFactor: off }) : Promise.reject(new Error("Not found"))));
    render(<AdminApp />);
    expect(await screen.findByRole("heading", { name: "Set Up Two-Step Sign-In" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Admin sections" })).toBeNull();
    expect(screen.getByRole("button", { name: "Sign Out" })).toBeInTheDocument();
  });
});
