import { preKCite, type FrameworkContract } from "../contract";

// British Columbia: the standards text is copied from the curriculum documents on curriculum.gov.bc.ca, which have no
// machine-readable list in docs/research/ to check citations against. Its units are the shared base, so none are "own".
// Pre-K cites the pathways of the BC Early Learning Framework (docs/research/bc/prek).
export const contract: FrameworkContract = { cite: null, preK: preKCite("bc", "British Columbia") };
