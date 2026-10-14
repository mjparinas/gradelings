// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ speak: vi.fn(), stop: vi.fn() }));
vi.mock("@/lib/speech", () => ({ speak: h.speak, stopSpeaking: h.stop }));

import { SayButton, buddySpeech, useBuddySays } from "./BuddySays";

function Line({ text, on }: { text: string; on: boolean }) {
  useBuddySays(text, on);
  return <p>{text}</p>;
}

beforeEach(() => {
  h.speak.mockClear();
  h.stop.mockClear();
});

describe("buddySpeech", () => {
  it("drops emoji and stage-direction marks so voices don't read them", () => {
    expect(buddySpeech("*Yawn* You're back! 🔥")).toBe("Yawn You're back!");
    expect(buddySpeech("A shield kept it safe. 🛡️ Play today!")).toBe("A shield kept it safe. Play today!");
    expect(buddySpeech("Pick a lesson! I think “Materials” would be fun.")).toBe("Pick a lesson! I think “Materials” would be fun.");
  });
});

describe("SayButton", () => {
  it("reads the line when tapped", () => {
    render(<SayButton text="You did it! 🎉" />);
    fireEvent.click(screen.getByRole("button", { name: "Read it to me" }));
    expect(h.speak).toHaveBeenCalledWith("You did it!");
  });
});

describe("useBuddySays", () => {
  it("reads the line once when read-aloud is on, and stops when the screen closes", () => {
    const { rerender, unmount } = render(<Line text="Hello" on />);
    rerender(<Line text="Hello" on />);
    expect(h.speak).toHaveBeenCalledTimes(1);
    expect(h.speak).toHaveBeenCalledWith("Hello");
    rerender(<Line text="Next one" on />);
    expect(h.speak).toHaveBeenLastCalledWith("Next one");
    unmount();
    expect(h.stop).toHaveBeenCalled();
  });

  it("stays quiet when read-aloud is off", () => {
    render(<Line text="Hello" on={false} />);
    expect(h.speak).not.toHaveBeenCalled();
  });
});
