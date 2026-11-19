// Pictures for map and direction questions: a small town map (with a compass rose and, for grid questions, lettered
// columns and numbered rows) and a bare compass rose. Region-free: nothing here names a place, so every province and
// state shares them.

export type CompassPoint = "N" | "E" | "S" | "W";

/** One square of a town map: a picture and, when it helps, a short name under it. */
export interface MapCell {
  emoji: string;
  label?: string;
}

export type MapVisual =
  /**
   * A town map with north at the top. `rows` is read top to bottom (null is an empty square). `cols` and `rowLabels`
   * name the columns and rows, as on grid maps ("B2"). The compass rose is drawn unless `compass` is false.
   */
  | { type: "map"; rows: (MapCell | null)[][]; cols?: string[]; rowLabels?: string[]; title?: string; compass?: boolean }
  /**
   * A compass rose with N, E, S and W. `center` is drawn in the middle (a person, a house), `around` puts a picture
   * at a direction (the sun in the east), and `mark` rings one of the four letters.
   */
  | { type: "compass"; mark?: CompassPoint; center?: string; around?: { at: CompassPoint; emoji: string }[] };

const POINT_WORD: Record<CompassPoint, string> = { N: "north", E: "east", S: "south", W: "west" };

/** What a screen reader says for a picture: the map's squares in reading order, or the rose and what sits on it. */
export function mapAlt(v: MapVisual): string {
  if (v.type === "compass") {
    const parts = ["a compass rose with north at the top, east on the right, south at the bottom and west on the left"];
    if (v.center) parts.push(`${v.center} in the middle`);
    for (const a of v.around ?? []) parts.push(`${a.emoji} to the ${POINT_WORD[a.at]}`);
    if (v.mark) parts.push(`${POINT_WORD[v.mark]} is ringed`);
    return parts.join(", ");
  }
  const rows = v.rows.map((row, r) => {
    const name = v.rowLabels?.[r] ?? `row ${r + 1}`;
    const cells = row.map((cell, c) => `${v.cols?.[c] ? `${v.cols[c]}: ` : ""}${cell ? (cell.label ?? cell.emoji) : "empty"}`);
    return `${name}: ${cells.join(", ")}`;
  });
  return `${v.title ? `${v.title}. ` : ""}A map with north at the top. ${rows.join(". ")}`;
}

/** The compass points a prompt names. */
export const POINT_OF: Record<string, CompassPoint> = { north: "N", east: "E", south: "S", west: "W" };
