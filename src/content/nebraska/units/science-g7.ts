import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Nebraska Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Nebraska examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "neb-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Nebraska examples such as the Ogallala Aquifer, sand and gravel along the Platte River and limestone in the east.",
      standards: ["SC.7.13.5.b; SC.7.14.6.c", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Much of the Ogallala Aquifer lies under Nebraska. It holds water…", "stored in sand and gravel underground", ["in a giant tank built by people", "frozen in glaciers", "in the clouds"], "An aquifer is rock and sediment full of water."],
      ["Sand and gravel dug along the Platte River were carried there by…", "rivers flowing from the Rocky Mountains", ["ocean waves", "people long ago", "volcanoes in Omaha"], "Rivers drop sediment as they slow down."],
      ["Limestone quarried in eastern Nebraska formed from…", "shells of sea life in an ancient sea", ["cooled lava", "melted ice", "burned trees"], "Limestone is a sedimentary rock."],
      ["Why are some places short of groundwater while others have plenty?", "rock and sediment that store water are spread unevenly", ["rain falls the same everywhere", "groundwater moves to cities", "water is made underground"], "Geology decides where water collects."],
      ["Why are some resources found in only a few places?", "they formed under special conditions long ago", ["people put them there", "they fall from space each year", "they are made by animals today"], "Geology decides where resources are."],
      ["Weather radar and storm spotters across Nebraska help forecasters…", "warn people when a tornado may form", ["predict eclipses", "stop hail", "measure earthquakes"], "Warnings give people time to take shelter."],
      ["Forecasts of hot, dry, windy days help firefighters warn of…", "grass fires", ["earthquakes", "floods only", "eclipses"], "Dry fuel and wind spread fire.", true],
      ["Why is it harder to forecast an earthquake than a flood?", "earthquakes give few warning signs", ["floods never happen", "earthquakes are always at noon", "rivers do not change"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "neb-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Nebraska examples like the Sandhills grasslands, the Rainwater Basin wetlands, eastern red cedars spreading into grassland and zebra mussels in Lewis and Clark Lake.",
      standards: ["SC.7.7.3.b", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Most of North America's tallgrass prairie has been plowed. Protecting grasslands like the Sandhills keeps…", "the plants and animals that need prairie", ["the hills from having grass", "the land from being sunny", "all birds the same"], "Some species need one kind of habitat."],
      ["Ranchers in Nebraska's Loess Canyons team up to burn the prairie on purpose. This helps…", "keep trees out and grow fresh grass", ["make the land a city", "stop all insects", "raise the ocean"], "Fire is a natural part of the prairie."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Zebra mussels in Lewis and Clark Lake harm the ecosystem because they…", "filter out food native animals need", ["make the water cold", "help native fish grow", "plant new trees"], "Invasive species compete with native ones."],
      ["Eastern red cedar trees spreading into the prairie where fires are stopped can turn grassland into…", "thick woods with less prairie life", ["glaciers", "rainforests", "deserts"], "Trees shade out prairie plants."],
      ["Which solution would best help a pollinator that is losing habitat?", "planting native flowers along roadsides", ["spraying more insect poison", "paving more parking lots", "mowing every field weekly"], "Food and shelter support pollinators.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
