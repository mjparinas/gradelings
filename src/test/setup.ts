import { afterEach } from "vitest";

// Only component tests run in a DOM; skip the setup for the node-environment tests.
if (typeof document !== "undefined") {
  const { cleanup, configure } = await import("@testing-library/react");
  // findBy* and waitFor give up after 1 s by default. The suite runs thousands of tests at once on a busy CI
  // machine, and a screen that needs a few state updates can take longer than that (it did for the admin
  // panel's history test). They return as soon as the thing shows, so a larger limit only slows a real failure.
  configure({ asyncUtilTimeout: 5000 });
  await import("@testing-library/jest-dom/vitest");
  afterEach(() => cleanup());
}
