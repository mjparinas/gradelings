// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClassGoalPanel } from "./ClassGoalPanel";

const respond = (body: unknown, status = 200) => Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) } as Response);
let fetchMock: ReturnType<typeof vi.fn>;
let goal: unknown;
beforeEach(() => {
  goal = null;
  fetchMock = vi.fn((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") {
      const { target } = JSON.parse(String(init.body)) as { target: number };
      goal = { target, answers: 12, met: false };
      return respond({ goal });
    }
    if (init?.method === "DELETE") {
      goal = null;
      return respond({ goal: null });
    }
    return respond({ goal });
  });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("class goal panel", () => {
  it("offers a target for the class size, sets it, shows progress and removes it", async () => {
    render(<ClassGoalPanel classId="c1" students={10} />);
    fireEvent.click(await screen.findByRole("button", { name: /200\s*\(20 each\)/ }));
    await screen.findByText("12 of 200 questions");
    const put = fetchMock.mock.calls.find(([, init]) => init?.method === "PUT")!;
    expect(JSON.parse(String(put[1].body))).toMatchObject({ classId: "c1", target: 200 });
    fireEvent.click(screen.getByRole("button", { name: "Remove it" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Set the goal" })).toBeTruthy());
  });

  it("takes a number of your own and refuses one out of range", async () => {
    render(<ClassGoalPanel classId="c1" students={0} />);
    const input = await screen.findByLabelText("Other number of questions");
    const set = screen.getByRole("button", { name: "Set the goal" }) as HTMLButtonElement;
    fireEvent.change(input, { target: { value: "5" } });
    expect(set.disabled).toBe(true);
    fireEvent.change(input, { target: { value: "75" } });
    expect(set.disabled).toBe(false);
    fireEvent.click(set);
    await screen.findByText("12 of 75 questions");
  });
});
