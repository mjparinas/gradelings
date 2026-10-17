// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => ({ ...(await importOriginal<typeof import("@/lib/classroom")>()), call: mocks.call }));

import { RosterConnect, RosterReview } from "./RosterImport";

beforeEach(() => {
  mocks.call.mockReset();
  window.history.replaceState(null, "", "/teachers/");
});

describe("RosterConnect", () => {
  it("shows nothing while importing is off", async () => {
    mocks.call.mockResolvedValue({ access: "off", providers: [], plan: null });
    const { container } = render(<RosterConnect />);
    await waitFor(() => expect(mocks.call).toHaveBeenCalled());
    expect(container.querySelector("section")).toBeNull();
  });

  it("offers a button per provider that leaves for the provider", async () => {
    mocks.call.mockResolvedValue({ access: "ok", providers: [{ id: "clever", label: "Clever" }, { id: "classlink", label: "ClassLink" }], plan: null });
    render(<RosterConnect />);
    expect(await screen.findByRole("link", { name: "Import from Clever" })).toHaveAttribute("href", "/api/roster/start/?provider=clever");
    expect(screen.getByRole("link", { name: "Import from ClassLink" })).toBeInTheDocument();
  });

  it("explains the school plan, with the price only when there is one", async () => {
    mocks.call.mockResolvedValue({ access: "plan", providers: [], plan: { features: ["Import classes"], price: null } });
    render(<RosterConnect />);
    expect(await screen.findByText(/part of the school plan\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ask about the school plan" })).toHaveAttribute("href", expect.stringMatching(/^\/contact\/?$/));
  });

  it("shows why a sign-in failed and clears it from the address", async () => {
    window.history.replaceState(null, "", "/teachers/?roster_error=cancelled");
    mocks.call.mockResolvedValue({ access: "ok", providers: [], plan: null });
    render(<RosterConnect />);
    expect(await screen.findByRole("alert")).toHaveTextContent("cancelled");
    expect(window.location.search).toBe("");
  });
});

describe("RosterReview", () => {
  const sections = [
    { id: "c1", name: "Grade 4 Math", grade: "4", students: 2, newStudents: 2, existing: null, names: ["Ava", "Noor"] },
    { id: "c2", name: "Library club", grade: null, students: 1, newStudents: 1, existing: null, names: ["Kit"] },
  ];

  it("needs a grade for every ticked class, then brings the classes in", async () => {
    mocks.call.mockImplementation(async (url: string, method?: string) => {
      if (method === "POST") return { results: [{ classId: "k1", name: "Grade 4 Math", added: 2, alreadyThere: 0, tooMany: 0, noLongerListed: 0, created: true }] };
      return { provider: "google-classroom", label: "Google Classroom", sections };
    });
    const onOpenClass = vi.fn();
    render(<RosterReview id="imp1" onOpenClass={onOpenClass} onBack={() => undefined} />);
    expect(await screen.findByRole("heading", { name: "Bring in classes from Google Classroom" })).toBeInTheDocument();
    // Both start ticked, but the second has no grade yet.
    expect(screen.getByRole("button", { name: "Bring in 2 classes" })).toBeDisabled();
    await userEvent.click(screen.getByRole("checkbox", { name: /Library club/ }));
    const go = screen.getByRole("button", { name: "Bring in 1 class" });
    expect(go).toBeEnabled();
    await userEvent.click(go);
    expect(await screen.findByText("Grade 4 Math: 2 students added.")).toBeInTheDocument();
    const post = mocks.call.mock.calls.find((c) => c[1] === "POST")!;
    expect(post[2]).toEqual({ import: "imp1", classes: [{ sectionId: "c1", name: "Grade 4 Math", grade: "4", framework: "ca-bc" }] });
    await userEvent.click(screen.getByRole("button", { name: "Open Grade 4 Math" }));
    expect(onOpenClass).toHaveBeenCalledWith("k1");
  });

  it("says when an import has expired", async () => {
    mocks.call.mockRejectedValue(new Error("That import has expired. Start it again."));
    render(<RosterReview id="old" onOpenClass={() => undefined} onBack={() => undefined} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("expired");
  });
});
