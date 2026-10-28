import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// North Dakota Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with North Dakota examples added (oil in the Bakken, lignite coal, wind, flood forecasts, prairie potholes and native
// grassland).

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "nd-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with North Dakota examples such as oil in the Bakken shale, lignite coal, steady prairie winds and spring flood forecasts on the Red River.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Oil in western North Dakota is found in a deep rock layer called the…", "Bakken formation", ["Red River Valley", "Turtle Mountains", "Drift Prairie"], "It lies under the Williston Basin."],
      ["North Dakota has large lignite deposits because, millions of years ago, the area had…", "swamps full of plants that were buried", ["many volcanoes", "deserts of sand", "glaciers made of coal"], "Coal forms from buried plant matter."],
      ["Why is western North Dakota rich in oil while many other places have none?", "oil forms only where certain ancient rocks and conditions exist", ["oil rains from the sky", "oil grows on trees", "every place has the same oil"], "Resources are spread unevenly."],
      ["Forecasters predict Red River floods by measuring the snow and water on the ground and…", "the temperature as spring arrives", ["the price of oil", "the height of buildings", "the color of the river"], "Fast melting means a bigger flood."],
      ["Many wind farms are built in North Dakota because it has…", "strong, steady winds", ["no wind", "many volcanoes", "tall mountains everywhere"], "Wind is a renewable resource."],
      ["Water stored in rock and sand underground is called…", "groundwater", ["lava", "magma", "ice cap"], "Wells reach groundwater."],
      ["Why can scientists forecast a river flood days ahead but not an earthquake?", "they can measure snowmelt and rain moving toward the river", ["floods never happen", "earthquakes are always on time", "rivers do not move"], "Data about water helps make forecasts.", true],
      ["Pumping groundwater faster than rain and snow can refill it will…", "lower the water supply over time", ["make more water", "change nothing", "turn it into oil"], "Use and refill must balance.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "nd-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with North Dakota examples like prairie pothole wetlands, native grassland, pollinators, piping plovers on Missouri River sandbars and invasive leafy spurge.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Prairie pothole wetlands are home to so many nesting ducks that they are called the nation's…", "duck factory", ["fish market", "rock garden", "snow fort"], "Millions of ducks nest there."],
      ["Wetlands clean water and hold back floods. These benefits to people are called…", "ecosystem services", ["natural disasters", "fossil fuels", "invasive species"], "Healthy ecosystems help people."],
      ["Leafy spurge is a plant from another continent that spreads fast and crowds out native grasses. It is an…", "invasive species", ["endangered species", "native species", "extinct species"], "Invasive species harm ecosystems."],
      ["Bees and butterflies that visit prairie flowers and crops are important because they…", "pollinate plants", ["eat the soil", "make the wind", "melt snow"], "Many crops need pollinators."],
      ["Piping plovers nest on bare sandbars along the Missouri River. Fencing off nesting areas helps…", "protect their eggs and chicks", ["make the river flow faster", "grow more leafy spurge", "bring more people to the nests"], "These birds are threatened."],
      ["An ecosystem with many different kinds of living things is said to have high…", "biodiversity", ["pollution", "erosion", "gravity"], "Bio means life; diversity means variety."],
      ["Releasing tiny beetles that eat only leafy spurge is one way to control it. What should scientists check first?", "that the beetles will not harm native plants", ["that the beetles are colorful", "that the beetles live in water", "that the beetles eat snow"], "A good solution must not cause new problems.", true],
      ["Planting native grasses on land that was once cropland can help…", "bring back prairie animals and pollinators", ["make more pavement", "stop all rain", "remove all wildlife"], "Restoring habitat restores biodiversity.", true],
    ],
  ),
];
