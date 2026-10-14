import { describe, expect, it } from "vitest";
import { checkHealth } from "./status";

const answer = (status: number, body: unknown) => (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;

describe("status page health check", () => {
  it("is ok only when the health endpoint says so", async () => {
    expect(await checkHealth(answer(200, { status: "ok" }))).toBe("ok");
    expect(await checkHealth(answer(503, { status: "degraded" }))).toBe("degraded");
    expect(await checkHealth(answer(503, "Under maintenance"))).toBe("degraded");
  });

  it("reports a network failure as unreachable", async () => {
    const fail = (async () => {
      throw new TypeError("Failed to fetch");
    }) as unknown as typeof fetch;
    expect(await checkHealth(fail)).toBe("unreachable");
  });
});
