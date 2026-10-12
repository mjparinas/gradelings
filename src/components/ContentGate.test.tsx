// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GradeStatus } from "@/lib/useGradeContent";

const mocks = vi.hoisted(() => ({ status: "loading" as GradeStatus, retry: vi.fn(), cacheLoadedScripts: vi.fn(), useGradeContent: vi.fn() }));
vi.mock("@/lib/useGradeContent", () => ({ useGradeContent: mocks.useGradeContent }));
vi.mock("@/lib/offline", () => ({ cacheLoadedScripts: mocks.cacheLoadedScripts }));

import { ContentGate } from "./ContentGate";

const targets = [
  { grade: "3", framework: "ca-bc" },
  { grade: "3", framework: "ca-on" },
  { grade: "k", framework: "ca-bc" },
] as const;

beforeEach(() => {
  mocks.retry.mockReset();
  mocks.cacheLoadedScripts.mockReset();
  mocks.useGradeContent.mockReset();
  mocks.useGradeContent.mockImplementation(() => ({ status: mocks.status, retry: mocks.retry }));
});

const gate = (props: { optional?: boolean; onSwitch?: () => void } = {}) =>
  render(
    <ContentGate targets={[...targets]} {...props}>
      <p>Lessons</p>
    </ContentGate>,
  );

describe("ContentGate", () => {
  it("waits for the lessons, then shows them and hands the downloads to the offline cache", () => {
    mocks.status = "loading";
    const { rerender } = gate();
    expect(screen.getByText("Getting ready…")).toBeInTheDocument();
    expect(screen.queryByText("Lessons")).not.toBeInTheDocument();
    expect(mocks.cacheLoadedScripts).not.toHaveBeenCalled();
    expect(mocks.useGradeContent).toHaveBeenCalledWith(targets);

    mocks.status = "ready";
    rerender(
      <ContentGate targets={[...targets]}>
        <p>Lessons</p>
      </ContentGate>,
    );
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(mocks.cacheLoadedScripts).toHaveBeenCalledOnce();
  });

  it("asks a child to get a grown-up online, naming each grade once, and retries", async () => {
    mocks.status = "failed";
    gate();
    expect(screen.getByRole("heading", { name: "We need the internet for a moment" })).toBeInTheDocument();
    expect(screen.getByText(/download the Grade 3 and Kindergarten lessons/)).toBeInTheDocument();
    expect(screen.queryByText("Lessons")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Choose another player" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(mocks.retry).toHaveBeenCalledOnce();
  });

  it("offers another player when it can", async () => {
    mocks.status = "failed";
    const onSwitch = vi.fn();
    gate({ onSwitch });
    await userEvent.click(screen.getByRole("button", { name: "Choose another player" }));
    expect(onSwitch).toHaveBeenCalledOnce();
  });

  it("shows the parent area anyway under a notice when lessons are optional", async () => {
    mocks.status = "failed";
    gate({ optional: true });
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Grade 3 and Kindergarten lessons haven't downloaded to this device yet, so some reports are incomplete.");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(mocks.retry).toHaveBeenCalledOnce();
  });
});
