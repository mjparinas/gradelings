import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Every picture needs alt text, or alt="" when it is decoration (src/components/imageAlt.test.ts checks svgs too).
    rules: { "jsx-a11y/alt-text": ["error", { elements: ["img", "object", "area", "input[type=\"image\"]"], img: ["Image"] }] },
  },
  {
    // The apps load each grade's lessons on demand (src/content/index.ts). Importing
    // every grade at once is only for statically generated pages and tests.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/app/**", "src/components/site/**", "src/content/all.ts", "**/*.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/content/all", "./all", "**/content/grades/*", "./grades/*", "!./grades/manifest", "!./grades/framework"],
              message: "Client code must load grades on demand via @/content (loadGrade / useGradeContent), not import them statically.",
            },
            {
              // GUIDES loads every framework's guide copy with a top-level await; the apps only need its types.
              group: ["**/content/guides", "./guides", "../guides"],
              allowTypeImports: true,
              message: "Parent guide copy is for the public pages (server only). Import its types with `import type`.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "**/.next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Supertonic's speech engine, copied from node_modules by scripts/fetch-supertonic.mjs.
    "public/supertonic/**",
  ]),
]);

export default eslintConfig;
