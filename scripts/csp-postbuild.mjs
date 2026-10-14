// Runs after `next build`: gives every prerendered page a Content-Security-Policy <meta> tag
// that allows exactly its own inline scripts and styles by hash. See src/lib/csp.mjs.
// On Vercel the adapter wrapper (scripts/csp-adapter.mjs) has already done this; running again
// changes nothing.
import { writePolicyTags } from "./csp-pages.mjs";

const count = writePolicyTags();
if (!count) throw new Error("csp-postbuild: found no prerendered pages. Did `next build` run?");
console.log(`csp-postbuild: wrote a Content-Security-Policy tag into ${count} pages`);
