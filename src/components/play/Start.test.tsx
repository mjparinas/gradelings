// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/lib/model";

const h = vi.hoisted(() => ({
  addProfile: vi.fn(() => "new-id"),
  setActive: vi.fn(),
  signInStudent: vi.fn(),
  profiles: [] as Partial<Profile>[],
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ addProfile: h.addProfile, setActive: h.setActive }),
  useProfiles: () => h.profiles,
  useDerived: (id: string) => ({ level: id === "a" ? 4 : 1 }),
}));
vi.mock("@/lib/account", () => ({ signInStudent: h.signInStudent }));
vi.mock("@/lib/sound", () => ({ sounds: { complete: vi.fn() } }));
vi.mock("../Critter", async (orig) => ({
  ...(await orig<typeof import("../Critter")>()),
  Critter: () => null,
  CritterSvg: () => null,
}));

import { CRITTERS } from "../Critter";
import { ClassSignIn, FirstRun, NewChild, Picker } from "./Start";

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));

beforeEach(() => {
  vi.clearAllMocks();
  h.profiles = [];
});

describe("FirstRun", () => {
  it("meets Ollie, then asks the first child's name", () => {
    render(<FirstRun />);
    expect(screen.getByText(/I'm Ollie the Otter/)).toBeInTheDocument();
    click(/Let's go!/);
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    // No Cancel on the very first child.
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

  it("a child with a teacher's code goes to class sign-in and can come back", () => {
    render(<FirstRun />);
    click("My teacher gave me a code");
    expect(screen.getByRole("heading", { name: "Sign in to your class" })).toBeInTheDocument();
    click("← Back");
    expect(screen.getByText(/I'm Ollie the Otter/)).toBeInTheDocument();
  });
});

describe("ClassSignIn", () => {
  it("tidies the codes and only allows signing in once both are complete", async () => {
    h.signInStudent.mockResolvedValue(undefined);
    render(<ClassSignIn onBack={() => {}} />);
    const go = screen.getByRole("button", { name: /Let's go!/ });
    await userEvent.type(screen.getByLabelText("Class code"), "ab-c 12");
    expect(screen.getByLabelText("Class code")).toHaveValue("ABC12");
    expect(go).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Class code"), "3x");
    expect(screen.getByLabelText("Class code")).toHaveValue("ABC123");
    await userEvent.type(screen.getByLabelText("My code"), "zz9qq7");
    expect(go).toBeEnabled();
    await userEvent.click(go);
    expect(h.signInStudent).toHaveBeenCalledWith("ABC123", "ZZ9QQ7");
  });

  it("shows the server's message when the codes don't work, and lets the child try again", async () => {
    h.signInStudent.mockRejectedValue(new Error("Those codes don't match. Check with your teacher."));
    render(<ClassSignIn onBack={() => {}} />);
    await userEvent.type(screen.getByLabelText("Class code"), "ABC123");
    await userEvent.type(screen.getByLabelText("My code"), "XYZ789");
    await userEvent.click(screen.getByRole("button", { name: /Let's go!/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Those codes don't match.");
    expect(screen.getByRole("button", { name: /Let's go!/ })).toBeEnabled();
  });
});

describe("NewChild", () => {
  it("needs a name and a grade before Start, then adds the child with their animal", async () => {
    const onDone = vi.fn();
    render(<NewChild onDone={onDone} />);
    const start = screen.getByRole("button", { name: "Start!" });
    expect(start).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Name"), "Sam");
    expect(start).toBeDisabled();
    click("Grade 3");
    expect(screen.getByRole("button", { name: "Grade 3" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Grade 3 · /)).toBeInTheDocument();
    const animal = CRITTERS[2];
    click(`${animal.name} the ${animal.species}`);
    expect(screen.getByRole("button", { name: `${animal.name} the ${animal.species}` })).toHaveAttribute("aria-pressed", "true");
    click("Start!");
    expect(h.addProfile).toHaveBeenCalledWith({ name: "Sam", avatar: animal.id, colour: "#25b47e", grade: "3", framework: "ca-bc" });
    expect(onDone).toHaveBeenCalledWith("new-id");
  });

  it("a blank name doesn't count, and names are kept short", async () => {
    render(<NewChild onDone={() => {}} />);
    click("Kindergarten");
    await userEvent.type(screen.getByLabelText("Name"), "   ");
    expect(screen.getByRole("button", { name: "Start!" })).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Name"), "Maximilianalexander");
    expect(screen.getByLabelText("Name")).toHaveValue("   Maximilianale");
  });

  it("can be cancelled when adding another player", () => {
    const onCancel = vi.fn();
    render(<NewChild onDone={() => {}} onCancel={onCancel} />);
    expect(screen.getByText("Who's joining us?")).toBeInTheDocument();
    click("Cancel");
    expect(onCancel).toHaveBeenCalled();
  });
});

describe("Picker", () => {
  const kid = (id: string, name: string): Partial<Profile> => ({ id, name, grade: "2", avatar: "ollie", colour: "#fff", framework: "ca-bc" });

  it("shows each player with their grade and level, and picks one", () => {
    h.profiles = [kid("a", "Ava"), kid("b", "Ben")];
    render(<Picker />);
    expect(screen.getByRole("button", { name: /Ava/ })).toHaveTextContent("Grade 2 · Lv 4");
    click(/Ben/);
    expect(h.setActive).toHaveBeenCalledWith("b");
  });

  it("adds a player, and Cancel goes back to the list", () => {
    h.profiles = [kid("a", "Ava")];
    render(<Picker />);
    click(/Add player/);
    expect(screen.getByText("Who's joining us?")).toBeInTheDocument();
    click("Cancel");
    expect(screen.getByText("Who's learning today?")).toBeInTheDocument();
  });

  it("has no Add player once the family has three children", () => {
    h.profiles = [kid("a", "Ava"), kid("b", "Ben"), kid("c", "Cy")];
    render(<Picker />);
    expect(screen.queryByRole("button", { name: /Add player/ })).not.toBeInTheDocument();
  });
});
