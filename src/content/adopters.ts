import type { FrameworkContract } from "./contract";
import type { FrameworkManifest } from "./manifest";

// Test-only: which frameworks may use another's own units, read from each framework's contract.ts (`adoptsFrom`), so a
// framework's own test doesn't list the other frameworks by name.

const manifests = import.meta.glob<{ manifest: FrameworkManifest }>("./*/manifest.ts", { eager: true });
const contracts = import.meta.glob<{ contract: FrameworkContract }>("./*/contract.ts", { eager: true });

/** The ids of the frameworks whose contracts say they may use `owner`'s own units. */
export function adoptersOf(owner: string): string[] {
  return Object.entries(manifests).flatMap(([path, { manifest }]) => {
    const contract = contracts[path.replace(/manifest\.ts$/, "contract.ts")]?.contract;
    return (contract?.adoptsFrom as readonly string[] | undefined)?.includes(owner) ? [manifest.id] : [];
  });
}
