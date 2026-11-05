import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

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
        // Component, server and page tests mock modules and use the DOM, so each file keeps its own worker.
        // Component tests opt in to jsdom with `// @vitest-environment jsdom`; everything else stays in node.
        resolve: { alias },
        test: {
          name: "app",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/content/**"],
          setupFiles: ["./src/test/setup.ts"],
          testTimeout,
        },
      },
    ],
  },
});
