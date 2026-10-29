import { preKCite, type FrameworkContract } from "../contract";

// The Northwest Territories follows the BC curriculum and cites BC's learning standards, which have no machine-readable
// list to check against (see grades/contract.ts). Its own units are Our Territory, Dene Kede and Inuuqatigiit. Junior
// Kindergarten cites the NWT's own JK/K curriculum (docs/research/northwest-territories/prek).
export const contract: FrameworkContract = { cite: null, preK: preKCite("northwest-territories", "NWT"), ownPrefix: "nt-" };
