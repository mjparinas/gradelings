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
  account: null as null | { familyId: string },
  flagOn: true,
  getKV: vi.fn(async () => undefined),
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ addProfile: h.addProfile, setActive: h.setActive, family: { account: h.account } }),
  useProfiles: () => h.profiles,
  useDerived: (id: string) => ({ level: id === "a" ? 4 : 1 }),
}));
vi.mock("@/lib/account", () => ({ signInStudent: h.signInStudent }));
vi.mock("@/lib/remoteFlags", () => ({ useFlag: () => h.flagOn }));
vi.mock("@/lib/localdb", () => ({ getKV: h.getKV }));
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
  h.account = null;
  h.flagOn = true;
  window.location.hash = "";
});

async function fillIn(name = "Sam") {
  await userEvent.type(screen.getByLabelText("Name"), name);
  click("Grade 3");
  click("Start!");
}

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

describe("FirstRun from a public page's link", () => {
  it("starts with the page's province or state and grade picked", () => {
    window.location.hash = "#/start?framework=ca-on&grade=2&subject=math&unit=adding-to-100";
    render(<FirstRun />);
    click(/Let's go!/);
    expect(screen.getByRole("button", { name: "Grade 2" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Grade 2 · .*Ontario/)).toBeInTheDocument();
  });

  it("ignores a link that names no framework we know", () => {
    window.location.hash = "#/start?framework=ca-qc&grade=2";
    render(<FirstRun />);
    click(/Let's go!/);
    expect(screen.getByRole("button", { name: "Grade 2" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("ClassSignIn", () => {
  it("takes one code, shown in two groups of five, and signs in once it is complete", async () => {
    h.signInStudent.mockResolvedValue(undefined);
    render(<ClassSignIn onBack={() => {}} />);
    expect(screen.queryByLabelText("Class code")).toBeNull();
    const go = screen.getByRole("button", { name: /Let's go!/ });
    await userEvent.type(screen.getByLabelText("My code"), "km7 pq-r3x");
    expect(screen.getByLabelText("My code")).toHaveValue("KM7PQ-R3X");
    expect(go).toBeDisabled();
    await userEvent.type(screen.getByLabelText("My code"), "ta");
    expect(screen.getByLabelText("My code")).toHaveValue("KM7PQ-R3XTA");
    expect(go).toBeEnabled();
    await userEvent.click(go);
    expect(h.signInStudent).toHaveBeenCalledWith("KM7PQR3XTA", "");
  });

  it("still takes a class code and an older eight-character code from a card printed before", async () => {
    h.signInStudent.mockResolvedValue(undefined);
    render(<ClassSignIn onBack={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "My card has a class code too" }));
    const go = screen.getByRole("button", { name: /Let's go!/ });
    await userEvent.type(screen.getByLabelText("Class code"), "ab-c 12");
    expect(screen.getByLabelText("Class code")).toHaveValue("ABC12");
    await userEvent.type(screen.getByLabelText("Class code"), "3x");
    expect(screen.getByLabelText("Class code")).toHaveValue("ABC123");
    await userEvent.type(screen.getByLabelText("My code"), "zz9qq7");
    expect(go).toBeDisabled();
    await userEvent.type(screen.getByLabelText("My code"), "-k4");
    expect(screen.getByLabelText("My code")).toHaveValue("ZZ9QQ7K4");
    expect(go).toBeEnabled();
    await userEvent.click(go);
    expect(h.signInStudent).toHaveBeenCalledWith("ZZ9QQ7K4", "ABC123");
  });

  it("shows the server's message when the code doesn't work, and lets the child try again", async () => {
    h.signInStudent.mockRejectedValue(new Error("That code doesn't match. Check it with your teacher."));
    render(<ClassSignIn onBack={() => {}} />);
    await userEvent.type(screen.getByLabelText("My code"), "XYZ789ABCD");
    await userEvent.click(screen.getByRole("button", { name: /Let's go!/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("That code doesn't match.");
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

describe("NewChild on a device with no account", () => {
  it("offers the progress emails before the first child plays, and Not now just starts", async () => {
    const onDone = vi.fn();
    render(<NewChild onDone={onDone} first />);
    await fillIn();
    expect(h.addProfile).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: /For grown-ups/ })).toBeInTheDocument();
    expect(screen.getByText(/Get Sam's progress by email/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email me the reports" })).toHaveAttribute("href", "/parents/#/account");
    click(/Not now, let's play!/);
    expect(h.addProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "Sam", grade: "3" }));
    expect(onDone).toHaveBeenCalledWith("new-id");
  });

  it("Email me the reports adds the child, waits for the save, then opens the parent area", async () => {
    const assign = vi.fn();
    const real = window.location;
    Object.defineProperty(window, "location", { configurable: true, value: { ...real, assign, href: real.href, hash: real.hash } });
    try {
      render(<NewChild onDone={() => {}} first />);
      await fillIn();
      fireEvent.click(screen.getByRole("link", { name: "Email me the reports" }));
      expect(h.addProfile).toHaveBeenCalled();
      await vi.waitFor(() => expect(assign).toHaveBeenCalledWith(expect.stringContaining("/parents/#/account")));
      expect(h.getKV).toHaveBeenCalledWith("profiles");
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: real });
    }
  });

  it.each([
    ["the family is signed in", () => (h.account = { familyId: "f" })],
    ["the flag is off", () => (h.flagOn = false)],
  ])("skips the step when %s", async (_, set) => {
    set();
    render(<NewChild onDone={() => {}} first />);
    await fillIn();
    expect(h.addProfile).toHaveBeenCalled();
    expect(screen.queryByRole("heading", { name: /For grown-ups/ })).not.toBeInTheDocument();
  });

  it("never asks when adding another child", async () => {
    render(<NewChild onDone={() => {}} onCancel={() => {}} />);
    await fillIn();
    expect(h.addProfile).toHaveBeenCalled();
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
