import { useMemo } from "react";
import { getFramework } from "@/content/frameworks";
import { localizeCopy } from "@/content/locale";
import { familyCountry } from "./coppa";
import { countryOf, type CountryCode } from "./country";
import { useActiveProfile, useStore } from "./store";

// The parent area is written once, in Canadian English. A US family reads it in US English: "practiced", "color",
// "4th grade". Wrap copy a parent reads in `say(...)`; Canadian families see it exactly as written.

export type Say = (text: string) => string;

/** `say` for a country, or for anything that names one (a framework, a family). */
export function sayFor(from: Parameters<typeof countryOf>[0]): Say {
  const locale = countryOf(from).locale;
  return (text) => localizeCopy(text, locale);
}

/** The family's country: the one the server set, or, on a device with no account yet, the first child's. */
export function useFamilyCountry(): CountryCode {
  return useStore((s) => s.family?.country ?? familyCountry(s.profiles ?? []));
}

/** `say` in the family's English, for the parent area. */
export function useSay(): Say {
  const country = useFamilyCountry();
  return useMemo(() => sayFor(country), [country]);
}

/** The family's locale, for dates and times ("2:05 p.m." in Canada, "2:05 PM" in the US). */
export function useLocale(): "en-CA" | "en-US" {
  return countryOf(useFamilyCountry()).locale;
}

/** `say` in the active child's English, for the kids' app: "practice", "cozy" and "4th grade" for a US child. */
export function useChildSay(): Say {
  const framework = useActiveProfile()?.framework;
  return useMemo(() => sayFor(getFramework(framework)), [framework]);
}
