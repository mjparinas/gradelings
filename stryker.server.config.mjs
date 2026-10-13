// Mutation testing for the server code that guards children's data, billing and sign-in: sync, the Stripe
// webhook, auth, COPPA consent, codes, student accounts, admin and account deletion.
// Run with `npm run test:mutation:server` (about an hour from scratch; reruns only redo what changed).
// Report: reports/mutation-server/mutation.html
import base from "./stryker.config.mjs";
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  ...base,
  mutate: [
    "src/app/api/sync/route.ts",
    "src/app/api/billing/webhook/route.ts",
    "src/server/consent.ts",
    "src/server/codes.ts",
    "src/server/payments.ts",
    "src/server/stripe.ts",
    "src/server/referral.ts",
    "src/server/admin.ts",
    "src/server/auth.ts",
    "src/server/students.ts",
    "src/server/deleteFamily.ts",
    "src/server/maintenance.ts",
    "src/lib/coppa.ts",
    "src/lib/maintenance.ts",
    "src/lib/csv.ts",
    "src/lib/abVerdict.ts",
    "src/lib/flags.ts",
    "src/lib/sync.ts",
  ],
  htmlReporter: { fileName: "reports/mutation-server/mutation.html" },
  jsonReporter: { fileName: "reports/mutation-server/mutation.json" },
  incrementalFile: "reports/mutation-server/stryker-incremental.json",
  tempDirName: ".stryker-tmp-server",
};

export default config;
