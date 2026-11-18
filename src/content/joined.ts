import type { Visual } from "./types";

// Drawings for questions about the area of shapes made of rectangles. The question's own numbers go in the
// picture, so a child sees the floor plan the words describe instead of having to build it in their head.

type Joined = Extract<Visual, { type: "joined" }>;

/** Rectangles side by side along their bottom edge, each labelled with its width and height. */
export function sideBySide(parts: [number, number][], unit?: string, caption?: string): Joined {
  return { type: "joined", parts: parts.map(([w, h]) => ({ w, h })), ...(unit ? { unit } : {}), ...(caption ? { caption } : {}) };
}

/** A rectangle with a smaller rectangle cut away from its top right corner. */
export function cornerCut(w: number, h: number, cutW: number, cutH: number, unit?: string): Joined {
  return { type: "joined", parts: [{ w, h }], cut: { w: cutW, h: cutH }, ...(unit ? { unit } : {}) };
}

/** Two rectangles side by side where the second one's size is the thing to find. */
export function oneUnknown(w: number, h: number, unit?: string, caption?: string): Joined {
  return { type: "joined", parts: [{ w, h }, {}], ...(unit ? { unit } : {}), ...(caption ? { caption } : {}) };
}
