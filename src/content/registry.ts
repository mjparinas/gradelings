import { manifest as alabama } from "./alabama/manifest";
import { manifest as alaska } from "./alaska/manifest";
import { manifest as alberta } from "./alberta/manifest";
import { manifest as arizona } from "./arizona/manifest";
import { manifest as arkansas } from "./arkansas/manifest";
import { manifest as california } from "./california/manifest";
import { manifest as colorado } from "./colorado/manifest";
import { manifest as florida } from "./florida/manifest";
import { manifest as georgia } from "./georgia/manifest";
import { manifest as britishColumbia } from "./grades/manifest";
import { manifest as illinois } from "./illinois/manifest";
import { manifest as indiana } from "./indiana/manifest";
import { manifest as louisiana } from "./louisiana/manifest";
import { manifest as maine } from "./maine/manifest";
import { manifest as manitoba } from "./manitoba/manifest";
import { manifest as maryland } from "./maryland/manifest";
import { manifest as massachusetts } from "./massachusetts/manifest";
import { manifest as michigan } from "./michigan/manifest";
import { manifest as minnesota } from "./minnesota/manifest";
import { manifest as missouri } from "./missouri/manifest";
import { manifest as newBrunswick } from "./new-brunswick/manifest";
import { manifest as newJersey } from "./new-jersey/manifest";
import { manifest as newYork } from "./new-york/manifest";
import { manifest as newfoundlandAndLabrador } from "./newfoundland-and-labrador/manifest";
import { manifest as northCarolina } from "./north-carolina/manifest";
import { manifest as novaScotia } from "./nova-scotia/manifest";
import { manifest as nunavut } from "./nunavut/manifest";
import { manifest as northwestTerritories } from "./nwt/manifest";
import { manifest as ohio } from "./ohio/manifest";
import { manifest as oklahoma } from "./oklahoma/manifest";
import { manifest as ontario } from "./ontario/manifest";
import { manifest as oregon } from "./oregon/manifest";
import { manifest as pennsylvania } from "./pennsylvania/manifest";
import { manifest as princeEdwardIsland } from "./prince-edward-island/manifest";
import { manifest as saskatchewan } from "./saskatchewan/manifest";
import { manifest as southCarolina } from "./south-carolina/manifest";
import { manifest as tennessee } from "./tennessee/manifest";
import { manifest as texas } from "./texas/manifest";
import { manifest as virginia } from "./virginia/manifest";
import { manifest as washington } from "./washington/manifest";
import { manifest as wisconsin } from "./wisconsin/manifest";
import { manifest as yukon } from "./yukon/manifest";
import type { FrameworkManifest } from "./manifest";

// Every province and state. Each entry is the manifest in that framework's own folder (see ./manifest). FrameworkId,
// FRAMEWORKS (and so the classroom and public pages), the apps' grade loaders, ./all, the guide pages and the content
// tests all read this list, so a new framework is its folder plus one import and one line here (and, for a new
// country, its country module in src/lib/country.ts).
//
// Keep both lists in alphabetical order by folder: the order here does not matter to the app (see REGISTRY below), and
// alphabetical placement means two pull requests that each add a framework rarely touch neighbouring lines, so they
// don't conflict with each other. If they do, keep both frameworks' lines.
const MANIFESTS = [
  alabama,
  alaska,
  alberta,
  arizona,
  arkansas,
  california,
  colorado,
  florida,
  georgia,
  britishColumbia,
  illinois,
  indiana,
  louisiana,
  maine,
  manitoba,
  maryland,
  massachusetts,
  michigan,
  minnesota,
  missouri,
  newBrunswick,
  newJersey,
  newYork,
  newfoundlandAndLabrador,
  northCarolina,
  novaScotia,
  nunavut,
  northwestTerritories,
  ohio,
  oklahoma,
  ontario,
  oregon,
  pennsylvania,
  princeEdwardIsland,
  saskatchewan,
  southCarolina,
  tennessee,
  texas,
  virginia,
  washington,
  wisconsin,
  yukon,
] as const satisfies readonly FrameworkManifest[];

/**
 * The order pickers and public pages list frameworks in: the ones that launched first keep their launch order (this
 * list is frozen, don't add to it), and every later framework follows by id, with British Columbia first because its
 * grade files are the shared base every other framework's download adds to.
 */
const LAUNCH_ORDER: readonly string[] = [
  "ca-bc", "ca-on", "ca-ab", "ca-sk", "ca-mb", "ca-yt", "ca-nt", "ca-ns", "ca-nb", "ca-nl", "ca-pe", "ca-nu", "us-wa", "us-or", "us-ca", "us-ny", "us-tx", "us-me", "us-mn", "us-ak", "us-al", "us-az", "us-ar", "us-fl", "us-il", "us-co", "us-pa", "us-ga", "us-oh", "us-nj", "us-in", "us-va",
];

const rank = (id: string) => {
  const i = LAUNCH_ORDER.indexOf(id);
  return i === -1 ? LAUNCH_ORDER.length : i;
};

export const REGISTRY: readonly (typeof MANIFESTS)[number][] = [...MANIFESTS].sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));

/** The ids of every framework, offered or still being built. */
export type RegisteredId = (typeof MANIFESTS)[number]["id"];

/** A framework's manifest. Throws for an unknown id, so a typo can't fall back to another framework. */
export function manifestOf(id: string): FrameworkManifest {
  const found = REGISTRY.find((m) => m.id === id);
  if (!found) throw new Error(`No framework "${id}" in the registry`);
  return found;
}
