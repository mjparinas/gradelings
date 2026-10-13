import type { Unit } from "../../types";
import { SCIENCE_7 } from "../../washington/units/science-68";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_7, "wa-g7-resources"),
    {
      id: "ca-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists map and forecast hazards like earthquakes, tsunamis, floods and wildfires, with California examples.",
      standards: [
        "MS-ESS3-1; MS-ESS3-2",
        "the uneven distribution of Earth's resources, and forecasting natural hazards",
      ],
    },
    [
      [
        "California's earthquake early warning system…",
        "warns people seconds before strong shaking arrives",
        ["stops earthquakes", "measures rain", "predicts quakes years ahead"],
        "Early warning.",
      ],
      [
        "Tsunami hazard maps for the California coast show…",
        "areas that could flood and routes to high ground",
        [
          "where volcanoes are",
          "where it never rains",
          "the best surfing spots",
        ],
        "Planning for safety.",
      ],
      [
        "Gold was found in the Sierra Nevada foothills because…",
        "geologic processes concentrated it there",
        [
          "people planted it",
          "it fell as rain",
          "it is everywhere in equal amounts",
        ],
        "Minerals form in certain places.",
      ],
      [
        "Pumping too much groundwater in the Central Valley has made some land…",
        "sink",
        ["float", "turn into a volcano", "freeze"],
        "Empty spaces underground squeeze shut.",
        true,
      ],
      [
        "Fire scientists forecast wildfire danger using…",
        "wind, temperature, humidity and how dry plants are",
        ["moon phases only", "the color of the sky", "how many birds sing"],
        "Hot, dry and windy is risky.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_7, "wa-g7-biodiversity"),
    {
      id: "ca-g7-biodiversity",
      title: "Biodiversity & Kelp Forests",
      emoji: "🦦",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect ecosystems such as California's kelp forests, wetlands and redwood forests.",
      standards: [
        "MS-LS2-5",
        "evaluating solutions that maintain biodiversity and ecosystem services",
      ],
    },
    [
      [
        "Sea otters help kelp forests by eating…",
        "sea urchins that eat kelp",
        ["kelp", "sharks", "whales"],
        "Fewer urchins, more kelp.",
      ],
      [
        "A kelp forest provides…",
        "food and shelter for many sea animals",
        ["oil", "fresh drinking water", "sand for beaches only"],
        "Underwater habitat.",
      ],
      [
        "Coastal wetlands help people by…",
        "filtering water and softening storm waves",
        ["making the ocean saltier", "causing floods", "removing all fish"],
        "An ecosystem service.",
      ],
      [
        "The California condor was saved from extinction by…",
        "breeding in zoos and releasing birds to the wild",
        ["moving them to the Arctic", "feeding them plastic", "doing nothing"],
        "A recovery program.",
        true,
      ],
      [
        "Which solution best protects a kelp forest?",
        "A marine protected area with limits on fishing",
        [
          "Dumping more runoff",
          "Removing all sea otters",
          "Building more seawalls",
        ],
        "Protect the whole system.",
        true,
      ],
    ],
  ),
];
