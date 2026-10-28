import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g7";
import { copyOf, from } from "./kit";

// South Dakota Grade 7 science: copies of California's resources and biodiversity units without their California places,
// with South Dakota examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_7: Unit[] = [
  copyOf(
    from(CA, "ca-g7-resources"),
    {
      id: "sd-g7-resources",
      title: "Resources & Hazards",
      emoji: "⛏️",
      blurb: "Where resources are, and forecasting natural hazards.",
      parentNote:
        "Practices why Earth's mineral, energy and water resources are unevenly spread, and how scientists forecast hazards, with South Dakota examples such as gold in the Black Hills, granite, groundwater, wind and tornado and blizzard forecasts.",
      standards: ["MS-ESS3-1; MS-ESS3-2", "the uneven distribution of Earth's resources, and forecasting natural hazards"],
    },
    [
      ["Gold in South Dakota is found mostly in the Black Hills because…", "of the way rocks there formed long ago", ["people buried it there", "it falls with the rain", "it grows like a plant"], "Geology decides where minerals are."],
      ["The granite carved at Mount Rushmore formed from…", "melted rock that cooled slowly underground", ["layers of shells", "dried seawater", "packed snow"], "Granite is an igneous rock."],
      ["Eastern South Dakota's sand and gravel, used for roads, was left behind by…", "Ice Age glaciers", ["volcanoes", "coral reefs", "deserts"], "Melting glaciers dropped huge amounts of sand and gravel."],
      ["South Dakota has strong winds but little oil, so wind power is a resource it has…", "more of than many places", ["none of", "only underground", "only in winter"], "Resources are spread unevenly across Earth."],
      ["Weather radar and storm spotters help forecasters…", "warn towns before a tornado arrives", ["predict eclipses", "find gold", "measure earthquakes"], "Data from many places shows where a storm is heading."],
      ["Maps of where rivers flooded before help towns plan…", "where it is safe to build", ["where to find oil", "when the moon is full", "where volcanoes will form"], "Floods return to low land near rivers.", true],
      ["Why is it harder to forecast an earthquake than a blizzard?", "earthquakes give few warning signs", ["blizzards never happen", "earthquakes are always at noon", "storms do not move"], "Some hazards are hard to predict.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g7-biodiversity"),
    {
      id: "sd-g7-biodiversity",
      title: "Biodiversity & Habitats",
      emoji: "🌾",
      blurb: "Healthy ecosystems and protecting variety of life.",
      parentNote:
        "Practices why biodiversity and ecosystem services matter, and how to evaluate solutions that protect them, with South Dakota examples like prairie potholes, native grasslands, black-footed ferrets, bison herds and invasive plants such as leafy spurge.",
      standards: ["MS-LS2-5", "evaluating solutions that maintain biodiversity and ecosystem services"],
    },
    [
      ["Prairie potholes give ducks and other birds…", "places to nest and feed", ["salt water", "sand dunes", "coral"], "These wetlands are a duck factory."],
      ["Keeping native grassland instead of plowing it all helps…", "hold soil and give animals habitat", ["make the land a city", "stop all insects", "dry up rivers"], "Grass roots hold soil and shelter wildlife."],
      ["Wetlands provide ecosystem services such as…", "filtering water and holding flood water", ["making sand", "creating earthquakes", "blocking sunlight"], "Wetlands clean and store water."],
      ["Leafy spurge, a plant brought from far away, harms grasslands because it…", "crowds out native plants", ["makes the soil cold", "helps native grass grow", "plants new trees"], "Invasive species compete with native ones."],
      ["Black-footed ferrets were returned to the prairie in Badlands National Park. This helps…", "an endangered species recover", ["stop the wind", "make more rocks", "keep the soil warm"], "Ferrets hunt prairie dogs."],
      ["Black-footed ferrets eat mostly prairie dogs. Which solution would help the ferrets most?", "protecting prairie dog towns", ["paving more parking lots", "removing all prairie dogs", "planting a forest"], "Animals need their food and habitat.", true],
      ["Why does a prairie with many plant species recover better after a drought than a field of one crop?", "other species survive and keep the ecosystem working", ["droughts never reach prairies", "one species always dies", "crops grow faster"], "Biodiversity makes ecosystems stable.", true],
    ],
  ),
];
