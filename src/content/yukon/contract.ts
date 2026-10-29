import { preKCite, type FrameworkContract } from "../contract";

// Yukon follows the BC curriculum and cites BC's learning standards, which have no machine-readable list to check
// against (see grades/contract.ts). Its own units are the Yukon First Nations units. Early Kindergarten follows the BC
// Early Learning Framework, so Pre-K cites BC's list (docs/research/bc/prek; the Yukon policy is in docs/research/yukon/prek).
export const contract: FrameworkContract = { cite: null, preK: preKCite("bc", "Yukon"), ownPrefix: "yk-" };
