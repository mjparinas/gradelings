// @vitest-environment jsdom
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ classwork: [] as { profileId: string }[] }));

vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1" }),
  useStore: (select: (s: unknown) => unknown) => select({ classwork: h.classwork }),
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));
vi.mock("../visuals", () => ({ Coin: () => null, Shape: () => null, QuestionVisual: () => null }));

import { LiveQuestionCard, useLiveQuestion } from "./LiveQuestion";

const question = { id: "q1", className: "Room 4", mine: null, question: { prompt: "What is 2 + 2?", choices: [{ id: "a", label: "4" }, { id: "b", label: "5" }] } };
const respond = (body: unknown, ok = true) => Promise.resolve({ ok, status: ok ? 200 : 500, json: () => Promise.resolve(body) } as Response);

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.useFakeTimers();
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  h.classwork = [];
});

describe("useLiveQuestion", () => {
  it("never asks the server for a child who isn't in a class, so offline-only devices stay quiet", async () => {
    renderHook(() => useLiveQuestion());
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the open question, sends the first tap and says when the connection drops", async () => {
    h.classwork = [{ profileId: "p1" }];
    fetchMock.mockImplementation((url: string, init?: RequestInit) => (init?.method === "POST" ? respond({ ok: true }) : respond({ live: question })));
    function Probe() {
      return <LiveQuestionCard state={useLiveQuestion()} />;
    }
    render(<Probe />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock).toHaveBeenCalledWith("/api/live/?profile=p1", expect.objectContaining({ cache: "no-store" }));
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "4" }));
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock).toHaveBeenCalledWith("/api/live/", expect.objectContaining({ method: "POST", body: JSON.stringify({ questionId: "q1", profileId: "p1", choice: "a" }) }));
    expect(screen.getByText("Sent! Your teacher will show the answer.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeDisabled();

    // Offline: the question stays and a calm note says practice still works.
    fetchMock.mockImplementation(() => Promise.reject(new TypeError("offline")));
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(screen.getByText(/Live questions need the internet/)).toBeInTheDocument();
  });

  it("puts the answer back to pick again when it didn't send", async () => {
    h.classwork = [{ profileId: "p1" }];
    fetchMock.mockImplementation((url: string, init?: RequestInit) => (init?.method === "POST" ? respond({}, false) : respond({ live: question })));
    function Probe() {
      return <LiveQuestionCard state={useLiveQuestion()} />;
    }
    render(<Probe />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(screen.getByRole("alert")).toHaveTextContent("That didn't send.");
    expect(screen.getByRole("button", { name: "4" })).not.toBeDisabled();
  });

  it("takes over the screen with no way out, and number keys pick an answer", async () => {
    h.classwork = [{ profileId: "p1" }];
    fetchMock.mockImplementation((url: string, init?: RequestInit) => (init?.method === "POST" ? respond({ ok: true }) : respond({ live: question })));
    function Probe() {
      return <LiveQuestionCard state={useLiveQuestion()} />;
    }
    render(<Probe />);
    await act(() => vi.advanceTimersByTimeAsync(0));
    const dialog = screen.getByRole("dialog", { name: "Live question from your teacher" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByTestId("live-takeover")).toHaveClass("fixed", "inset-0");
    expect(screen.queryByRole("button", { name: /close|back|skip/i })).not.toBeInTheDocument();
    expect(dialog).toHaveFocus();
    fireEvent.keyDown(window, { key: "2" });
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock).toHaveBeenCalledWith("/api/live/", expect.objectContaining({ method: "POST", body: JSON.stringify({ questionId: "q1", profileId: "p1", choice: "b" }) }));
  });

  it("shows the answer once the teacher reveals it", () => {
    const state = { live: { id: "q1", className: "Room 4", mine: "b", answer: "a", hint: "Count the tens.", question: { prompt: "What is 3 tens?", choices: [{ id: "a", label: "30" }, { id: "b", label: "3" }] } }, offline: false, note: "", answer: vi.fn() };
    render(<LiveQuestionCard state={state as never} />);
    const card = screen.getByRole("dialog", { name: "Live question from your teacher" });
    expect(card).toHaveTextContent("Good try! The answer is 30.");
    expect(card).toHaveTextContent("Count the tens.");
    expect(screen.getAllByTestId("live-choice").every((b) => (b as HTMLButtonElement).disabled)).toBe(true);
  });
});
