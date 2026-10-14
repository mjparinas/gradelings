import { describe, expect, it } from "vitest";
import { getFramework } from "@/content/frameworks";
import { sayFor } from "./say";

describe("sayFor", () => {
  it("reads the country from a code or a framework, Canada when there is none", () => {
    expect(sayFor("US")("Practise in Grade 3")).toBe("Practice in 3rd grade");
    expect(sayFor(getFramework("us-tx"))("Days practised")).toBe("Days practiced");
    expect(sayFor(getFramework("ca-on"))("Days practised")).toBe("Days practised");
    expect(sayFor(undefined)("Grade 3 colours")).toBe("Grade 3 colours");
  });
});
