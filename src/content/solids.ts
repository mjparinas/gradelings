import type { SolidKind, SolidLabels, Visual } from "./types";

// Pictures of solids and their nets for volume and surface-area questions. Each is drawn from the numbers the
// question uses, so the picture can never disagree with the words. Pass a measurement as a number (written with
// its unit) or as "?" for the one the child has to find.

type Measures = Partial<Record<keyof SolidLabels, number | string>>;

function labelled(measures: Measures, unit: string): SolidLabels {
  const out: SolidLabels = {};
  for (const [key, value] of Object.entries(measures)) {
    if (value === undefined) continue;
    out[key as keyof SolidLabels] = typeof value === "number" ? `${Number.isInteger(value) ? value : String(value)} ${unit}` : value;
  }
  return out;
}

/** A solid with its measurements on the edges. */
export function solid(kind: SolidKind, measures: Measures = {}, unit = "cm"): Visual {
  return { type: "solid", solid: kind, labels: labelled(measures, unit) };
}

/** The flat net of a solid, with measurements on its edges. */
export function net(kind: SolidKind, measures: Measures = {}, unit = "cm"): Visual {
  return { type: "net", net: kind, labels: labelled(measures, unit) };
}
