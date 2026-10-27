import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with Hawaiʻi examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "hi-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with Hawaiʻi examples such as its lack of fossil fuels and metal ores, its groundwater, geothermal heat, and the monitoring of Kīlauea and tsunamis.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Hawaiʻi has no coal, oil or metal ores to mine because the islands are made of…", "young volcanic rock", ["ancient seabed full of fossils", "old continental crust", "ice"], "Fossil fuels form over millions of years from buried life."],
      ["Fresh water on Oʻahu is stored in porous volcanic rock underground called an…", "aquifer", ["atoll", "estuary", "glacier"], "Rain soaks in and is held in the rock."],
      ["Hawaiʻi Island can make electricity from geothermal energy because it has…", "heat from an active volcano close to the surface", ["deep coal beds", "huge oil fields", "glaciers"], "Resources depend on geology."],
      ["Scientists at the Hawaiian Volcano Observatory forecast eruptions by measuring…", "earthquakes, ground swelling and volcanic gas", ["ocean temperature only", "the phases of the moon", "rainfall only"], "Magma moving underground leaves signs."],
      ["Tsunami warning centers use buoys in the deep ocean to…", "detect tsunami waves and warn coasts", ["catch fish", "measure lava", "make electricity"], "Pressure sensors on the sea floor feel the wave."],
      ["Sand for Hawaiʻi's beaches is a limited resource because it comes mostly from…", "coral, shells and the reef", ["mines on the mountains", "imported deserts", "melting glaciers"], "Healthy reefs make new sand slowly."],
      ["Why can forecasters give hours of warning for a tsunami from across the Pacific but only minutes for one from a local earthquake?", "the waves take hours to cross the ocean but arrive fast from nearby", ["local tsunamis move slower", "far tsunamis are not real", "buoys only work locally"], "Distance gives warning time.", true],
      ["Lava hazard zones on Hawaiʻi Island are based on…", "where lava has flowed in the past and how close an area is to active vents", ["the number of tourists", "how pretty the view is", "rainfall only"], "Past patterns help forecast risk.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "hi-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with Hawaiʻi examples like its many species found nowhere else, native forest birds and the mosquitoes that carry avian malaria, rapid ʻōhiʻa death, invasive species and fenced watershed forests.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Most of Hawaiʻi's native plants and animals are endemic, which means they…", "are found nowhere else on Earth", ["came from Europe", "live everywhere", "are extinct"], "Isolation let new species evolve."],
      ["Many native Hawaiian forest birds now live only high on the mountains because lower down there are…", "mosquitoes that spread avian malaria", ["no trees at all", "too many glaciers", "no insects"], "Mosquitoes struggle in cold air."],
      ["Rapid ʻōhiʻa death is a disease killing ʻōhiʻa trees. Losing ʻōhiʻa would harm…", "the forests that catch water and shelter native birds", ["only tourists", "coral reefs only", "nothing at all"], "ʻŌhiʻa is the main tree in many native forests."],
      ["Building fences to keep feral pigs and goats out of native forests helps…", "native plants regrow and protect the watershed", ["more pigs grow", "forests dry out", "invasive weeds spread"], "Hooves and rooting damage forests."],
      ["Washing your boots before hiking into a new forest helps stop…", "the spread of invasive species and diseases", ["the rain", "native birds", "erosion of the ocean"], "Seeds and spores ride on mud."],
      ["Coral reefs provide ecosystem services such as…", "protecting shorelines from waves and supporting fish", ["making snow", "growing coffee", "producing oil"], "Reefs act like natural seawalls."],
      ["Releasing mosquitoes that can't produce young is a solution meant to…", "shrink mosquito numbers and protect native birds", ["feed native birds", "spread malaria", "pollinate flowers"], "Scientists weigh benefits and risks.", true],
      ["Why are island species often hit harder by invasive predators than mainland species?", "they evolved without those predators and lack defenses", ["they are bigger", "they can always fly away", "they eat the predators"], "Many Hawaiian birds nest on the ground.", true],
    ],
  ),
];
