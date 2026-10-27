import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Hawaiʻi copies of Grade 2 units that fit Hawaiʻi except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "hi-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "Rain and streams slowly carving the deep valleys of Kauaʻi is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes a very long time.",
      ],
      [
        "A lava flow covering a road on Hawaiʻi Island is a… change.",
        "fast",
        ["slow", "very slow"],
        "It can happen in hours.",
      ],
      [
        "Planting grass on a hill helps stop…",
        "soil washing away",
        ["the wind from blowing", "rain from falling"],
        "Roots hold soil in place.",
      ],
      [
        "A big storm washing away part of a beach changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Storm waves can move a lot of sand in a day.",
      ],
      [
        "Which helps keep waves from washing a beach away?",
        "native plants that hold the sand dunes",
        ["removing all plants", "driving on the dunes"],
        "Plant roots hold sand in place.",
        true,
      ],
      [
        "The Hawaiian Islands rose up from the sea floor over millions of years. That was a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Islands grow far too slowly to see.",
        true,
      ],
    ],
  ),
];
