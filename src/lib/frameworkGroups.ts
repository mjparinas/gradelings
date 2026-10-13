import { FRAMEWORKS, type Framework } from "@/content/frameworks";

export type Country = Framework["country"];

/** What the pickers call each country's group. */
export const COUNTRY_NAME: Record<Country, string> = { CA: "Canada", US: "United States" };

const COUNTRY_ORDER: Country[] = ["CA", "US"];

export interface FrameworkGroup {
  country: Country;
  label: string;
  frameworks: Framework[];
}

/**
 * The curricula a family or teacher can pick, grouped by country (Canadian provinces and territories first, then
 * US states), keeping FRAMEWORKS' order inside each group. Countries with nothing offered are left out, so before
 * the first US state launches there is one group.
 */
export function frameworkGroups(list: readonly Framework[] = FRAMEWORKS): FrameworkGroup[] {
  return COUNTRY_ORDER.map((country) => ({ country, label: COUNTRY_NAME[country], frameworks: list.filter((f) => f.country === country) })).filter((g) => g.frameworks.length > 0);
}

/** The same frameworks in the order the grouped pickers show them, for keyboard movement and type-ahead. */
export function orderedFrameworks(list: readonly Framework[] = FRAMEWORKS): Framework[] {
  return frameworkGroups(list).flatMap((g) => g.frameworks);
}

/**
 * Options for a SelectMenu: plain options while one country is offered, groups once there are two.
 * `label` turns a framework into the option's text.
 */
export function frameworkMenu(label: (f: Framework) => string, list: readonly Framework[] = FRAMEWORKS): { options?: { value: string; label: string }[]; groups?: { label: string; options: { value: string; label: string }[] }[] } {
  const groups = frameworkGroups(list);
  const option = (f: Framework) => ({ value: f.id, label: label(f) });
  if (groups.length <= 1) return { options: groups.flatMap((g) => g.frameworks.map(option)) };
  return { groups: groups.map((g) => ({ label: g.label, options: g.frameworks.map(option) })) };
}
