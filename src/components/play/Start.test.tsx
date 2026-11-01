// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/lib/model";

const h = vi.hoisted(() => ({
  addProfile: vi.fn(() => "new-id"),
  setActive: vi.fn(),
  signInStudent: vi.fn(),
  signOutStudent: vi.fn(),
  profiles: [] as Partial<Profile>[],
  account: null as null | { familyId: string; student?: boolean },
}));

vi.mock("@/lib/store", () => ({
  useStore: (select: (s: unknown) => unknown) => select({ addProfile: h.addProfile, setActive: h.setActive, family: { account: h.account } }),
  useProfiles: () => h.profiles,
  useDerived: (id: string) => ({ level: id === "a" ? 4 : 1 }),
}));
vi.mock("@/lib/account", () => ({ signInStudent: h.signInStudent, signOutStudent: h.signOutStudent }));
vi.mock("@/lib/sound", () => ({ sounds: { complete: vi.fn() } }));
vi.mock("../Critter", async (orig) => ({
  ...(await orig<typeof import("../Critter")>()),
  Critter: () => null,
  CritterSvg: () => null,
}));

import { CRITTERS } from "../Critter";
import { CardSignIn, ClassSignIn, FirstRun, NewChild, Picker } from "./Start";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));

beforeEach(() => {
  vi.clearAllMocks();
  h.profiles = [];
  h.account = null;
  window.location.hash = "";
  localStorage.clear();
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

  it("a link from a public page skips the hello and asks the name at once, unless a parent signed in here before", () => {
    window.location.hash = "#/start?framework=ca-ab&grade=3&subject=science&unit=water-cycle-ab";
    const { unmount } = render(<FirstRun />);
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    expect(screen.queryByText(/I'm Ollie the Otter/)).not.toBeInTheDocument();
    unmount();
    localStorage.setItem("grademap.parent", "1");
    render(<FirstRun />);
    expect(screen.getByText(/I'm Ollie the Otter/)).toBeInTheDocument();
  });

  it("a child with a teacher's code goes to class sign-in and can come back", () => {
    render(<FirstRun />);
    click("My teacher gave me a code");
    expect(screen.getByRole("heading", { name: "Sign in to your class" })).toBeInTheDocument();
    click("← Back");
    expect(screen.getByText(/I'm Ollie the Otter/)).toBeInTheDocument();
  });
});

describe("FirstRun sign-in", () => {
  it("offers a link to sign in with an existing account", () => {
    localStorage.clear();
    render(<FirstRun />);
    expect(screen.getByRole("link", { name: "Already have an account? Sign in" })).toHaveAttribute("href", "/parents/#/account?mode=signin");
    expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument();
  });

  it("welcomes back a device a parent has signed in on, still letting a new child start", () => {
    localStorage.setItem("grademap.parent", "1");
    render(<FirstRun />);
    expect(screen.getByRole("link", { name: "Welcome back! Sign in" })).toHaveAttribute("href", "/parents/#/account?mode=signin");
    expect(screen.queryByRole("link", { name: "Already have an account? Sign in" })).not.toBeInTheDocument();
    click("I'm new here");
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    localStorage.clear();
  });

  it("opens the class sign-in with no codes when the link asks for it", () => {
    window.location.hash = "#/class";
    render(<FirstRun />);
    expect(screen.getByRole("heading", { name: "Sign in to your class" })).toBeInTheDocument();
  });
});

describe("FirstRun from a public page's link", () => {
  it("starts with the page's province or state and grade picked", () => {
    window.location.hash = "#/start?framework=ca-on&grade=2&subject=math&unit=adding-to-100";
    render(<FirstRun />);
    expect(screen.getByText(/Grade 2 · .*Ontario/)).toBeInTheDocument();
    click("Change grade");
    expect(screen.getByRole("button", { name: "Grade 2" })).toHaveAttribute("aria-pressed", "true");
  });

  it("ignores a link that names no framework we know", () => {
    window.location.hash = "#/start?framework=ca-qc&grade=2";
    render(<FirstRun />);
    click(/Let's go!/);
    expect(screen.getByRole("button", { name: "Grade 2" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("a login card's QR code", () => {
  it("opens the class sign-in with the code filled in, then takes it out of the address", async () => {
    window.location.hash = "#/class?s=KM7PQR3XTA";
    h.signInStudent.mockResolvedValue(undefined);
    render(<FirstRun />);
    expect(screen.getByRole("heading", { name: "Sign in to your class" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Class code")).toBeNull();
    expect(screen.getByLabelText("My code")).toHaveValue("KM7PQ-R3XTA");
    expect(window.location.hash).toBe("");
    // Nobody is signed in until the student taps.
    expect(h.signInStudent).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: /Let's go!/ }));
    expect(h.signInStudent).toHaveBeenCalledWith("KM7PQR3XTA", "");
  });

  it("fills in the class code too for a card printed before one-code sign-in", async () => {
    window.location.hash = "#/class?c=AB12CD&s=ZX91PQ2M";
    h.signInStudent.mockResolvedValue(undefined);
    render(<FirstRun />);
    expect(screen.getByRole("heading", { name: "Sign in to your class" })).toBeInTheDocument();
    expect(screen.getByLabelText("Class code")).toHaveValue("AB12CD");
    expect(screen.getByLabelText("My code")).toHaveValue("ZX91PQ2M");
    expect(window.location.hash).toBe("");
    // Nobody is signed in until the student taps.
    expect(h.signInStudent).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: /Let's go!/ }));
    expect(h.signInStudent).toHaveBeenCalledWith("ZX91PQ2M", "AB12CD");
  });

  it("ignores a link whose codes aren't the right shape", () => {
    window.location.hash = "#/class?c=nope&s=nope";
    render(<FirstRun />);
    expect(screen.getByText(/I'm Ollie the Otter/)).toBeInTheDocument();
  });
});

describe("CardSignIn (a login card scanned where players already are)", () => {
  const codes = { studentCode: "KM7PQR3XTA" };

  it("says what will be replaced, and signs in with the card's code once the child agrees", async () => {
    h.profiles = [{ id: "a", name: "Maya" }, { id: "b", name: "Sam" }];
    h.signInStudent.mockResolvedValue(undefined);
    const onDone = vi.fn();
    render(<CardSignIn codes={codes} onDone={onDone} />);
    expect(screen.getByText(/This device has players: Maya, Sam\. Signing in to a class replaces them/)).toBeInTheDocument();
    expect(h.signInStudent).not.toHaveBeenCalled();
    click("Replace them and sign in");
    expect(screen.getByLabelText("My code")).toHaveValue("KM7PQ-R3XTA");
    await userEvent.click(screen.getByRole("button", { name: /Let's go!/ }));
    expect(h.signInStudent).toHaveBeenCalledWith("KM7PQR3XTA", "");
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("keeps the device as it is when the child says no", () => {
    h.profiles = [{ id: "a", name: "Maya" }];
    const onDone = vi.fn();
    render(<CardSignIn codes={codes} onDone={onDone} />);
    expect(screen.getByText(/a player: Maya/)).toBeInTheDocument();
    click("Keep this device as it is");
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(h.signInStudent).not.toHaveBeenCalled();
  });

  it("asks a grown-up to sign out first when a grown-up's account is on the device", () => {
    h.profiles = [{ id: "a", name: "Maya" }];
    h.account = { familyId: "f1" };
    const onDone = vi.fn();
    render(<CardSignIn codes={codes} onDone={onDone} />);
    expect(screen.getByRole("heading", { name: "A grown-up is signed in here" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Replace them and sign in" })).not.toBeInTheDocument();
    click("OK");
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("signs the last student out first, then goes to the sign-in", async () => {
    h.profiles = [{ id: "a", name: "Maya" }];
    h.account = { familyId: "f1", student: true };
    h.signOutStudent.mockResolvedValue(undefined);
    render(<CardSignIn codes={codes} onDone={() => {}} />);
    expect(screen.getByText(/signed in to a class on this device/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Sign in to my class" }));
    expect(h.signOutStudent).toHaveBeenCalledTimes(1);
    expect(await screen.findByLabelText("My code")).toHaveValue("KM7PQ-R3XTA");
  });

  it("goes straight to the sign-in, with both codes, on a device with no players", () => {
    render(<CardSignIn codes={{ classCode: "AB12CD", studentCode: "ZX91PQ2M" }} onDone={() => {}} />);
    expect(screen.getByLabelText("Class code")).toHaveValue("AB12CD");
    expect(screen.getByLabelText("My code")).toHaveValue("ZX91PQ2M");
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

describe("NewChild", () => {
  it("starts the first child at once, with no screen before play", async () => {
    const onDone = vi.fn();
    render(<NewChild onDone={onDone} first />);
    await fillIn();
    expect(h.addProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "Sam", grade: "3" }));
    expect(onDone).toHaveBeenCalledWith("new-id");
    expect(screen.queryByRole("heading", { name: /For grown-ups/ })).not.toBeInTheDocument();
  });

  it("shows a grade a link named as one line, so the name is all it needs, and can still change it", async () => {
    render(<NewChild onDone={() => {}} first preset={{ framework: "ca-ab", grade: "3" }} />);
    expect(screen.queryByRole("button", { name: "Grade 4" })).not.toBeInTheDocument();
    expect(screen.getByText(/Grade 3 · /)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Name"), "Sam");
    expect(screen.getByRole("button", { name: "Start!" })).toBeEnabled();
    click("Change grade");
    click("Grade 4");
    click("Start!");
    expect(h.addProfile).toHaveBeenCalledWith(expect.objectContaining({ name: "Sam", grade: "4", framework: "ca-ab" }));
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

  it("has no Add player once the family has five children", () => {
    h.profiles = [kid("a", "Ava"), kid("b", "Ben"), kid("c", "Cy"), kid("d", "Dee"), kid("e", "Eli")];
    render(<Picker />);
    expect(screen.queryByRole("button", { name: /Add player/ })).not.toBeInTheDocument();
  });
});
