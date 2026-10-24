import { manifest as britishColumbia } from "./grades/manifest";
import { manifest as ontario } from "./ontario/manifest";
import { manifest as alberta } from "./alberta/manifest";
import { manifest as saskatchewan } from "./saskatchewan/manifest";
import { manifest as manitoba } from "./manitoba/manifest";
import { manifest as yukon } from "./yukon/manifest";
import { manifest as northwestTerritories } from "./nwt/manifest";
import { manifest as novaScotia } from "./nova-scotia/manifest";
import { manifest as newBrunswick } from "./new-brunswick/manifest";
import { manifest as newfoundlandAndLabrador } from "./newfoundland-and-labrador/manifest";
import { manifest as princeEdwardIsland } from "./prince-edward-island/manifest";
import { manifest as nunavut } from "./nunavut/manifest";
import { manifest as washington } from "./washington/manifest";
import { manifest as oregon } from "./oregon/manifest";
import { manifest as california } from "./california/manifest";
import { manifest as newYork } from "./new-york/manifest";
import { manifest as texas } from "./texas/manifest";
import { manifest as maine } from "./maine/manifest";
import { manifest as minnesota } from "./minnesota/manifest";
import { manifest as alaska } from "./alaska/manifest";
import { manifest as alabama } from "./alabama/manifest";
import { manifest as arizona } from "./arizona/manifest";
import { manifest as arkansas } from "./arkansas/manifest";
import { manifest as florida } from "./florida/manifest";
import { manifest as illinois } from "./illinois/manifest";
import { manifest as colorado } from "./colorado/manifest";
import { manifest as pennsylvania } from "./pennsylvania/manifest";
import { manifest as georgia } from "./georgia/manifest";
import { manifest as ohio } from "./ohio/manifest";
import { manifest as northCarolina } from "./north-carolina/manifest";
import type { FrameworkManifest } from "./manifest";

// Every province and state, in the order pickers and public pages list them. Each entry is the manifest in that
// framework's own folder (see ./manifest). FrameworkId, FRAMEWORKS (and so the classroom and public pages), the
// apps' grade loaders, ./all, the guide pages and the content tests all read this list, so a new framework is its
// folder plus one line here (and, for a new country, its country module in src/lib/country.ts). British Columbia
// comes first: its grade files are the shared base every other framework's download adds to.
export const REGISTRY = [
  britishColumbia,
  ontario,
  alberta,
  saskatchewan,
  manitoba,
  yukon,
  northwestTerritories,
  novaScotia,
  newBrunswick,
  newfoundlandAndLabrador,
  princeEdwardIsland,
  nunavut,
  washington,
  oregon,
  california,
  newYork,
  texas,
  maine,
  minnesota,
  alaska,
  alabama,
  arizona,
  arkansas,
  florida,
  illinois,
  colorado,
  pennsylvania,
  georgia,
  ohio,
  northCarolina,
] as const satisfies readonly FrameworkManifest[];

/** The ids of every framework, offered or still being built. */
export type RegisteredId = (typeof REGISTRY)[number]["id"];

/** A framework's manifest. Throws for an unknown id, so a typo can't fall back to another framework. */
export function manifestOf(id: string): FrameworkManifest {
  const found = REGISTRY.find((m) => m.id === id);
  if (!found) throw new Error(`No framework "${id}" in the registry`);
  return found;
}
