// Starts a new US state: `node scripts/new-state.mjs <folder> <id> <Name>`, e.g. `node scripts/new-state.mjs idaho us-id Idaho`.
// It writes the mechanical files (manifest, citation helper, schools notice, contract, the framework's doc and research
// README) and adds the state to src/content/registry.ts in alphabetical place. It does not write the content: framework.ts,
// the grade files, guides.ts and the plan are the state's own work (docs/ADDING_A_PROVINCE.md). The manifest is
// `upcoming: true` until the state is ready to offer.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** "new-york" -> "newYork" */
export const camel = (folder) => folder.replace(/-(\w)/g, (_, c) => c.toUpperCase());

/** Adds a state's import and list entry to the registry's source, next to the folder that sorts just before it. */
export function addToRegistry(source, folder) {
  const ident = camel(folder);
  const importRe = /^import \{ manifest as (\w+) \} from "\.\/([\w-]+)\/manifest";$/gm;
  const imports = [...source.matchAll(importRe)];
  if (imports.some((m) => m[2] === folder)) throw new Error(`${folder} is already in the registry`);
  if (imports.some((m) => m[1] === ident)) throw new Error(`the name ${ident} is already used in the registry`);
  const before = imports.filter((m) => m[2] < folder).at(-1);
  if (!before) throw new Error("no earlier folder to place it after");
  const importLine = `import { manifest as ${ident} } from "./${folder}/manifest";`;
  let out = source.replace(before[0], `${before[0]}\n${importLine}`);
  const entry = new RegExp(`^  ${before[1]},$`, "m");
  if (!entry.test(out)) throw new Error(`could not find ${before[1]} in the list of manifests`);
  out = out.replace(entry, (line) => `${line}\n  ${ident},`);
  return out;
}

const GRADES = [["k", "k"], ["1", "g1"], ["2", "g2"], ["3", "g3"], ["4", "g4"], ["5", "g5"], ["6", "g6"], ["7", "g7"], ["8", "g8"], ["9", "g9"]];

export function files(folder, id, name) {
  const C = folder.toUpperCase().replace(/-/g, "_");
  const short = id.replace("us-", "");
  return {
    [`src/content/${folder}/manifest.ts`]: `import { defineFramework } from "../manifest";
import { ${C} } from "./framework";

export const manifest = defineFramework({
  id: "${id}",
  framework: ${C},
  grades: {
${GRADES.map(([g, f]) => `    ${/^\d/.test(g) ? `"${g}"` : g}: () => import("./${f}"),`).join("\n")}
  },
  guides: () => import("./guides").then((m) => m.${C}_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // ${name}: no French subject unless the state teaches it.
  french: { immersion: [], "core-french": [] },
  // Remove once ${name} is ready to offer to families.
  upcoming: true,
});
`,
    [`src/content/${folder}/cite.ts`]: `import type { Unit } from "../types";

/** Standards text for a ${name} unit: the citation, then a short plain description. */
export function ${short}(codes: string, text: string): Unit["standards"] {
  return { "${id}": \`\${codes} · \${text}\` };
}
`,
    [`src/content/${folder}/schools.ts`]: `import { APP_NAME } from "@/lib/brand";
import type { SchoolsNotice } from "../manifest";

// What /privacy/ tells ${name} schools: the student privacy law that applies and our commitments under it. Keep it
// true to docs/frameworks/${folder}.md and docs/school/.
export const SCHOOLS: SchoolsNotice = {
  heading: "Schools in ${name}.",
  text: \`TODO: the law that applies in ${name} and what ${"${APP_NAME}"} commits to under it.\`,
};
`,
    [`src/content/${folder}/contract.ts`]: `import { codeCite, research, type FrameworkContract } from "../contract";

// ${name}'s official standards, built by docs/research/${folder}/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("${folder}/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "${name}"),
  ownPrefix: "${short}-",
  adoptsFrom: [],
};
`,
    [`docs/research/${folder}/README.md`]: `# ${name}: sources and checking record

${name} (\`${id}\`, slug \`${folder}\`). List each official source here with its URL and the date it was checked. Sources go in \`source/\`, \`fetch.sh\` downloads them again and \`build_outcomes.py\` rebuilds \`outcomes.json\` from them exactly (docs/ADDING_A_PROVINCE.md, step 2).
`,
  };
}

function main() {
  const [folder, id, ...rest] = process.argv.slice(2);
  const name = rest.join(" ");
  if (!folder || !/^us-[a-z]{2}$/.test(id ?? "") || !name) {
    console.error("usage: node scripts/new-state.mjs <folder> <id, like us-id> <Name>");
    process.exit(1);
  }
  const dir = join(ROOT, "src/content", folder);
  if (existsSync(dir)) throw new Error(`${dir} already exists`);

  const registry = join(ROOT, "src/content/registry.ts");
  const updated = addToRegistry(readFileSync(registry, "utf8"), folder);

  const out = files(folder, id, name);
  const template = readFileSync(join(ROOT, "docs/frameworks/us-state-template.md"), "utf8");
  out[`docs/frameworks/${folder}.md`] = template.replace("# <State name>", `# ${name}`).split("\n").filter((l, i) => i !== 2).join("\n");
  for (const [rel, text] of Object.entries(out)) {
    const p = join(ROOT, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
  }
  writeFileSync(registry, updated);
  console.log(`Created ${Object.keys(out).length} files and added ${name} to src/content/registry.ts.`);
  console.log(`Next: write src/content/${folder}/framework.ts (export ${folder.toUpperCase().replace(/-/g, "_")}), the grade files, guides.ts and a plan, then run npm run curriculum:lock.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
