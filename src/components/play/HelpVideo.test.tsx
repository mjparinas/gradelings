// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HelpVideoPlayer } from "./HelpVideo";

const video = { id: "v", title: "What a fraction is", seconds: 40, src: "/videos/help/v.mp4", captions: "/videos/help/v.vtt" };
afterEach(cleanup);

describe("HelpVideoPlayer", () => {
  it("shows a captioned player and reports the watch when 'Try one more' is tapped", async () => {
    const onWatched = vi.fn();
    const onNext = vi.fn();
    const onClose = vi.fn();
    const { container } = render(<HelpVideoPlayer video={video} onClose={onClose} onNext={onNext} onWatched={onWatched} />);
    const el = await vi.waitFor(() => {
      const v = container.querySelector("video");
      if (!v) throw new Error("no video yet");
      return v;
    });
    expect(el.querySelector("track")?.getAttribute("kind")).toBe("captions");
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /watch again/i })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /video progress/i })).toBeInTheDocument();
    Object.defineProperty(el, "currentTime", { value: 12.4, configurable: true });
    fireEvent.timeUpdate(el);
    await userEvent.click(screen.getByRole("button", { name: /try one more/i }));
    expect(onWatched).toHaveBeenCalledWith(12, false);
    expect(onClose).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it("falls back to the text lesson when the video can't load", async () => {
    const onLesson = vi.fn();
    const onWatched = vi.fn();
    const { container } = render(<HelpVideoPlayer video={video} onClose={() => undefined} onNext={() => undefined} onWatched={onWatched} onLesson={onLesson} />);
    const el = await vi.waitFor(() => {
      const v = container.querySelector("video");
      if (!v) throw new Error("no video yet");
      return v;
    });
    fireEvent.error(el);
    expect(screen.getByRole("alert")).toHaveTextContent(/isn.t here right now/i);
    await userEvent.click(screen.getByRole("button", { name: /show me another way/i }));
    expect(onLesson).toHaveBeenCalled();
    expect(onWatched).not.toHaveBeenCalled();
  });

  it("changes speed", async () => {
    render(<HelpVideoPlayer video={video} onClose={() => undefined} onNext={() => undefined} onWatched={() => undefined} />);
    await userEvent.click(await screen.findByRole("button", { name: /change speed/i }));
    expect(screen.getByRole("button", { name: /speed 1.25/i })).toBeInTheDocument();
  });
});
