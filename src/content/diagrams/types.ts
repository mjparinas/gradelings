// Drawings for science questions, as plain data so a question can carry one and the apps draw it
// (`ScienceDiagram` in src/components/scienceDiagrams.tsx). Nothing here names a place or a curriculum.

export type CellPart = "nucleus" | "mitochondria" | "membrane" | "wall" | "chloroplast" | "vacuole";

export type Diagram =
  /** A battery, an optional switch and 1 to 3 bulbs in one loop (series) or on separate branches (parallel). */
  | {
      kind: "circuit";
      parallel: boolean;
      bulbs: number;
      switch: "none" | "open" | "closed";
      /** Index of one bulb drawn burnt out or unscrewed. */
      out?: number;
      /** A wire that doesn't reach the battery. */
      gap?: boolean;
    }
  /** A plant or animal cell; each mark is a letter pointing at one part. */
  | { kind: "cell"; cell: "plant" | "animal"; marks?: { part: CellPart; letter: string }[] }
  /** The Moon's orbit seen from above the North Pole, with sunlight arriving from the left.
   *  Spots are numbered 0 to 7: new moon, waxing crescent, first quarter, waxing gibbous, full, waning gibbous, third quarter, waning crescent. */
  | { kind: "orbit"; spots: { index: number; letter?: string }[]; moonAt?: number }
  /** Earth at four places on its orbit, its axis always tilting the same way. Letters go left, top, right, bottom. */
  | { kind: "seasons"; letters: [string, string, string, string] }
  /** Earth with the Sun on the left and children standing at lettered places. `angle` is degrees from the right-hand edge, counter-clockwise. */
  | { kind: "daynight"; dots: { letter: string; angle: number }[] };
