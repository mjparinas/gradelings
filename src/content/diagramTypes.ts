// Pictures for geometry questions that are about a figure: angles made by lines, triangles and pairs of similar
// figures, and regular polygons. They are drawn from the question's own numbers (`diagrams.ts`), and every label is
// text, so a figure never has to be to scale: a transversal is drawn at a friendly slant whatever the angle is.

/** Where an angle sits where a line crosses another. "top" is the upper line (or the only crossing); "above" and
 *  "left" say which side of the crossing the angle is on. */
export type AnglePos = `${"top" | "bottom"}-${"above" | "below"}-${"left" | "right"}`;

export type DiagramVisual =
  /**
   * Two lines that cross (`layout: "cross"`, only "top-" positions) or two parallel lines cut by a transversal. The
   * angle at `at` measures `degrees`; `marks` are the angles to label ("143°", "?").
   */
  | { type: "lineAngles"; layout: "cross" | "parallel"; at: AnglePos; degrees: number; marks: { pos: AnglePos; label: string }[] }
  /**
   * Angles side by side that fill a straight line (180°), a square corner (90°) or one bigger angle. `degrees` is
   * what is drawn (an unknown part is drawn at its real size and labelled "?"); `totalLabel` labels the whole.
   */
  | { type: "angleSplit"; whole: "straight" | "right" | "angle"; parts: { label: string; degrees: number }[]; totalLabel?: string }
  /**
   * A triangle drawn from its three angles (they add up to 180). The bottom-left corner is A, bottom-right B, top C;
   * `sideLabels[i]` labels the side opposite corner i; a 90° angle gets a square corner; `ticks` marks equal sides
   * and `height` draws the dashed height from C down to the bottom side.
   */
  | {
      type: "triangleFigure";
      angles: [number, number, number];
      angleLabels?: [string, string, string];
      sideLabels?: [string, string, string];
      ticks?: number[];
      height?: string;
    }
  /**
   * Two figures of the same shape and different size, with the sides to compare labelled. Triangles list their
   * sides as [bottom, left, right], rectangles as [width, height]; `ratio` is how many times bigger B is drawn.
   */
  | { type: "figurePair"; shape: "triangle" | "rectangle"; a: string[]; b: string[]; ratio: number; caption?: string }
  /** A regular polygon with this many sides, and optionally one interior angle labelled. */
  | { type: "polygon"; sides: number; label?: string };
