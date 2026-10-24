// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FeedbackForm } from "./FeedbackForm";

afterEach(() => vi.unstubAllGlobals());

describe("FeedbackForm", () => {
  it("sends the picked face and line, offering a reply box only when signed in", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const onSent = vi.fn();
    const user = userEvent.setup();
    render(<FeedbackForm audience="parent" signedIn compact onSent={onSent} />);
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
    expect(screen.queryByLabelText(/anything you’d like/i)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.type(screen.getByLabelText(/anything you’d like/i), "Loving it");
    await user.click(screen.getByLabelText(/OK to email me back/));
    await user.click(screen.getByRole("button", { name: "Send" }));
    await waitFor(() => expect(onSent).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/app-feedback/");
    expect(JSON.parse(String(init.body))).toEqual({ audience: "parent", rating: 4, comment: "Loving it", topic: null, canReply: true });
    expect(screen.getByRole("status")).toHaveTextContent(/thank you/i);
  });

  it("shows the server's message and hides the reply box when not signed in", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: "Too many." }), { status: 429 })));
    const user = userEvent.setup();
    render(<FeedbackForm audience="teacher" signedIn={false} onSent={() => {}} />);
    expect(screen.queryByLabelText(/OK to email me back/)).toBeNull();
    await user.type(screen.getByLabelText(/anything you’d like/i), "Hi");
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Too many.");
  });
});
