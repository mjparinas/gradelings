import type { Unit } from "../../types";
import { SCIENCE_3 as WASHINGTON_SCIENCE_3 } from "../../washington/units/science-35";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 2 units that fit Ohio except for a few questions naming another state's places.


export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_2, "ca-g2-reading-maps"),
    "oh-g2-reading-maps",
    [
      "Statement 3",
      "using maps, a compass rose and a map key to find local and distant places",
    ],
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_3, "wa-g3-weather-climate"), "oh-g2-weather-changes", ["2.ESS.3", "long- and short-term weather changes, measured with weather tools"], [
    ["Snow that falls near Lake Erie when cold wind blows over the warmer lake is called…", "lake-effect snow", ["desert snow", "sea fog"], "Cleveland often gets it."],
    ["Which tool measures how warm or cold the air is?", "thermometer", ["rain gauge", "ruler"], "Its numbers are degrees."],
    ["Which tool measures how much rain fell?", "rain gauge", ["thermometer", "compass"], "It collects rain in a tube."],
    ["A wind vane shows…", "which way the wind is blowing", ["how much rain fell", "the temperature"], "It points into the wind."],
    ["In Ohio, the coldest season is usually…", "winter", ["summer", "spring"], "Snow falls then."],
    ["In Ohio, thunderstorms and tornadoes happen most often in…", "spring and summer", ["only in winter", "no season at all"], "Warm, wet air feeds storms.", true],
    ["Ohio is 85°F in July and 25°F in January. This shows a change from…", "season to season", ["minute to minute", "year to year only"], "Seasons change the weather.", true],
  ], { parentNote: "Practises reading weather data and tools (thermometers, rain gauges, wind vanes), daily and seasonal weather patterns, and how weather changes over short and long times." }),
  localCopy(from(WASHINGTON_SCIENCE_3, "wa-g3-fossils"), "oh-g2-fossils", ["2.LS.2", "some kinds of living things that once lived on Earth no longer exist, and fossils show what they were like"], [
    ["Ohio's state fossil is a trilobite called…", "Isotelus", ["T. rex", "Stegosaurus"], "It lived in the sea that once covered Ohio."],
    ["Long ago, a warm, shallow sea covered Ohio. Fossils in Ohio rocks show many…", "sea animals", ["desert lizards", "penguins"], "Shells and trilobites are common."],
    ["Mastodons lived in Ohio during the Ice Age. Today mastodons are…", "extinct", ["living in Ohio forests", "kept as pets"], "Extinct means none are alive."],
    ["A fossil seashell found on an Ohio hill tells us the land was once…", "under water", ["on the moon", "always dry"], "Fossils are clues to the past."],
    ["Which is a fossil?", "a shell print in rock", ["a plastic toy dinosaur", "a fresh leaf"], "Fossils are remains or traces in rock."],
    ["Trilobites lived long ago and are no longer alive anywhere. We learn about them from…", "fossils", ["zoos", "pet stores"], "Fossils show living things that are gone.", true],
  ]),
];
