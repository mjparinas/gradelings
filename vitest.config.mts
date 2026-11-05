import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Pure logic tests in src/lib (no DOM, no mocks, no stubbed globals, no timers, no storage) can share workers like the content
// tests do: a worker per file spent about a minute of an 8-minute run just starting up. A test that needs anything below is
// picked out here by its text and keeps its own worker, so adding such a test needs no config change.
const libDir = fileURLToPath(new URL("./src/lib", import.meta.url));
const needsOwnWorker = /vi\.(mock|doMock|stubGlobal|stubEnv|spyOn|useFakeTimers|setSystemTime|resetModules|unmock)|jsdom|process\.env|globalThis|indexedDB|localStorage|sessionStorage|\bwindow\b|\bdocument\b|navigator|vi\.hoisted|loadGrade|loadMoreLessons|loadStories|fetch\b|Date\.now\s*=|Math\.random\s*=/;
const sharedLib = readdirSync(libDir)
  .filter((f) => f.endsWith(".test.ts") && !needsOwnWorker.test(readFileSync(`${libDir}/${f}`, "utf8")))
  .map((f) => `src/lib/${f}`);

const alias = {
  "@": fileURLToPath(new URL("./src", import.meta.url)),
  // Server modules import this guard; it only matters inside a client bundle.
  "server-only": fileURLToPath(new URL("./node_modules/server-only/empty.js", import.meta.url)),
};

// Sign-up and login hash passwords with scrypt, which can pass the 5 s default on a busy CI machine.
const testTimeout = 20000;

export default defineConfig({
  resolve: { alias },
  test: {
    // Only measured with `npm run test:coverage`; plain `npm test` stays fast.
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["**/*.test.{ts,tsx}", "src/test/**"],
      reporter: ["text-summary", "json-summary"],
      reportsDirectory: "coverage",
    },
    projects: [
      {
        // The content tests only read the generated courses, so their files share workers instead of each starting
        // its own (about 40% faster on the content suite). Nothing in src/content mocks modules or changes globals.
        resolve: { alias },
        test: {
          name: "content",
          include: ["src/content/**/*.test.{ts,tsx}"],
          setupFiles: ["./src/test/setup.ts"],
          testTimeout,
          isolate: false,
        },
      },
      {
        // Pure logic tests in src/lib (see sharedLib above).
        resolve: { alias },
        test: {
          name: "lib",
          include: sharedLib,
          setupFiles: ["./src/test/setup.ts"],
          testTimeout,
          isolate: false,
        },
      },
      {
        // Component, server and page tests mock modules and use the DOM, so each file keeps its own worker.
        // Component tests opt in to jsdom with `// @vitest-environment jsdom`; everything else stays in node.
        resolve: { alias },
        test: {
          name: "app",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/content/**", ...sharedLib],
          setupFiles: ["./src/test/setup.ts"],
          testTimeout,
        },
      },
    ],
  },
});
