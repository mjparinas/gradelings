import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Rhode Island Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Rhode Island examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "ri-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Rhode Island examples such as Westerly granite, sand and gravel left by glaciers, offshore wind and hurricane forecasts.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Westerly granite, used for monuments across the country, formed from…", "melted rock that cooled slowly underground", ["layers of shells", "dried seawater", "packed snow"], "Granite is an igneous rock."],
      ["The sand and gravel dug from pits in Rhode Island were left behind by…", "Ice Age glaciers", ["volcanoes", "coral reefs", "deserts"], "Melting glaciers dropped huge amounts of sand and gravel."],
      ["Cumberlandite, Rhode Island's state rock, is found almost nowhere else because…", "it formed under special conditions in one place", ["people made it in a factory", "it falls from space", "animals build it"], "Geology decides where rocks and minerals are."],
      ["Rhode Island has no oil or coal fields to speak of, so most of its fuel is…", "brought in from other places", ["dug from Narragansett Bay", "made from sand", "pumped from the Scituate Reservoir"], "Resources are spread unevenly across Earth."],
      ["Weather satellites and ocean buoys help forecasters…", "track hurricanes before they reach the coast", ["predict eclipses", "find granite", "measure earthquakes"], "Data from many places shows where a storm is heading."],
      ["Maps of how high the sea could rise in a storm help towns plan…", "where it is safe to build", ["where to find oil", "when the moon is full", "where volcanoes will form"], "Storm surge floods low land near the coast.", true],
      ["Why is it harder to forecast an earthquake than a hurricane?", "earthquakes give few warning signs", ["hurricanes never happen", "earthquakes are always at noon", "storms do not move"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "ri-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Rhode Island examples like the eelgrass and salt marshes of Narragansett Bay, the New England cottontail, piping plovers and invasive common reed.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Underwater eelgrass meadows in Narragansett Bay give young fish and scallops…", "shelter and food", ["fresh water", "sunlight", "sand dunes"], "Eelgrass is a nursery for sea life."],
      ["Restoring salt marshes along the bay helps…", "filter water and protect the shore from storms", ["make the land a city", "stop all insects", "raise the ocean"], "Marshes soak up water and trap pollution."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Common reed, a tall plant brought from far away, harms marshes because it…", "crowds out native marsh plants", ["makes the water cold", "helps native fish grow", "plants new trees"], "Invasive species compete with native ones."],
      ["Fencing off parts of the beach where piping plovers nest helps…", "protect a bird species that is threatened", ["stop the tides", "make more sand", "keep the water warm"], "People and dogs can crush the eggs."],
      ["The New England cottontail is losing its thicket habitat. Which solution would help it most?", "letting shrubby thickets grow back", ["paving more parking lots", "mowing every field weekly", "releasing more foxes"], "Animals need the habitat they are adapted to.", true],
      ["Why does a forest with many species recover better after a disease than a forest of one tree type?", "other species survive and keep the ecosystem working", ["diseases never reach mixed forests", "one species always dies", "mixed forests grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
