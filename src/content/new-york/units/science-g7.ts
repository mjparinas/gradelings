import type { Unit } from "../../types";
import { SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: the Finger Lakes,
// the Adirondacks, Long Island's glacial sand, salt beds under central New York, zebra mussels, New York Harbor's oysters
// and the bald eagle's return. Their own `ny-` ids keep New York progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_7, "wa-g7-earth-surface"),
    {
      id: "ny-g7-earth-surface",
      title: "Earth's Changing Surface",
      emoji: "🏔️",
      blurb: "The rock cycle, slow and fast changes, and moving plates.",
      parentNote:
        "Practices the rock cycle, how surface processes change land at different speeds and scales, and evidence that plates move, with examples from the glaciers that shaped the Finger Lakes and Long Island and the old rock of the Adirondacks.",
      standards: [
        "MS-ESS2-1; MS-ESS2-2; MS-ESS2-3",
        "the rock cycle, surface processes at different scales, and evidence for plate motion",
      ],
    },
    [
      ["The Finger Lakes valleys were deepened slowly by…", "glaciers over thousands of years", ["one earthquake in a day", "volcanoes", "people with shovels"], "Ice sheets scraped the land."],
      ["Sediment carried by the Hudson River settles out where the river…", "slows down as it meets the ocean", ["speeds up over rapids", "freezes in winter", "flows uphill"], "Slower water drops sediment."],
      ["Long Island is mostly made of sand and gravel left by…", "glaciers", ["volcanoes", "coral reefs", "meteorites"], "Ice sheets dropped what they carried."],
      ["The Adirondacks are made of very old rock that formed deep underground. It is at the surface now because…", "the land rose and erosion removed the rock above", ["it fell from space", "it formed last year", "lava poured out yesterday"], "Uplift plus erosion.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_7, "wa-g7-resources"),
    {
      id: "ny-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are found, forecasting hazards, and human impact.",
      parentNote:
        "Practices why minerals, fuels and groundwater are unevenly spread because of past geologic processes, how hazard data help forecast events like hurricanes and floods, and designing ways to reduce human impact, such as the salt beds under central New York and flood maps of its coast.",
      standards: [
        "MS-ESS3-1; MS-ESS3-2; MS-ESS3-3",
        "the uneven distribution of Earth's resources, forecasting natural hazards, and reducing human impact on the environment",
      ],
    },
    [
      ["Salt is mined deep under parts of central and western New York because…", "ancient seas dried up and left salt layers", ["salt rains from the sky", "volcanoes made the salt", "people buried it"], "Evaporating seawater leaves salt."],
      ["Hurricane forecasts help New York City by…", "giving people time to prepare and evacuate", ["stopping hurricanes", "making storms stronger", "changing the tides"], "Warning time saves lives."],
      ["Coal, oil and natural gas are found only in some places because…", "they formed from ancient living things buried under special conditions", ["they fall from space", "people put them there", "they form anywhere in a year"], "Past geologic processes."],
      ["Rain gardens and green roofs in New York City help by…", "soaking up stormwater before it floods streets and sewers", ["making more runoff", "adding pollution to rivers", "raising the sea level"], "Less runoff, cleaner water.", true],
      ["Flood maps for New York's coast show…", "which areas are likely to flood in a storm", ["where gold is buried", "where earthquakes start", "which roads are newest"], "Maps of risk.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_7, "wa-g7-biodiversity"),
    {
      id: "ny-g7-biodiversity",
      title: "Protecting Biodiversity",
      emoji: "🦅",
      blurb: "Why variety matters, and how we protect it.",
      parentNote:
        "Practices evaluating solutions that maintain biodiversity and ecosystem services, such as restoring oyster reefs in New York Harbor, controlling zebra mussels in the Great Lakes and the bald eagle's return to New York.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Zebra mussels in the Great Lakes harm ecosystems by…", "eating plankton that native animals need", ["adding native species", "pollinating plants", "making the water saltier"], "An invasive competitor."],
      ["Restoring oyster reefs in New York Harbor helps by…", "filtering water and giving fish a habitat", ["blocking all fish", "making the water dirtier", "removing oxygen"], "Oysters clean water."],
      ["Planting native plants along a stream bank helps biodiversity by…", "giving local animals food and shelter", ["removing all insects", "warming the stream", "blocking the water"], "Native plants support native animals."],
      ["Protecting Adirondack forests helps keep…", "clean water and habitat for many species", ["more pollution", "fewer kinds of animals", "dry rivers"], "Forests are ecosystem services.", true],
      ["Bald eagles returned to New York after…", "the pesticide DDT was banned and nests were protected", ["more forests were cut down", "DDT was used more", "their nests were removed"], "Their eggs became strong again.", true],
    ],
  ),
];
