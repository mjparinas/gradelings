import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g4";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { copyOf, from, localCopy } from "./kit";

// Indiana Grade 4 science: copies of California's earth-hazards and energy-resources units and Oregon's rocks-and-erosion
// unit without their own states' places, with Indiana examples added.

export const SCIENCE_4: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-earth-hazards"),
    {
      id: "in-g4-earth-hazards",
      title: "Quakes, Storms & Maps",
      emoji: "🌪️",
      blurb: "Earth's features on maps, and staying safe from hazards.",
      parentNote:
        "Practices reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and ways to reduce harm from hazards such as the tornadoes and floods Indiana knows well.",
      standards: ["4-ESS2-2; 4-ESS3-2", "patterns of Earth's features on maps, and solutions to reduce the impacts of natural hazards"],
    },
    [
      ["A tornado siren helps people…", "take shelter in time", ["stop the wind", "cool the air", "find their way home"], "Warnings save lives."],
      ["During a tornado warning, the safest place in a house is…", "a basement or inside room", ["next to a window", "on the roof", "in the car outside"], "Stay low and away from glass."],
      ["Floodwalls and levees along the Ohio River help…", "hold back flood water", ["make tornadoes", "start earthquakes", "melt snow"], "A levee is a wall of earth."],
      ["Southwestern Indiana sits near fault zones known for…", "earthquakes", ["volcanoes", "hurricanes", "glaciers"], "Big quakes shook the region in 1811 and 1812."],
      ["Building on high ground near a river helps keep homes safe from…", "floods", ["droughts", "earthquakes", "lightning only"], "Water rises in low places."],
      ["On a map, most volcanoes and earthquakes are found…", "along the edges of plates", ["in the middle of every country", "only in Indiana", "at the North Pole"], "Plates meet in long chains.", true],
      ["Why do engineers test buildings with shaking tables?", "to see if they survive earthquakes", ["to make them taller", "to paint them", "to cool them"], "Tests show what needs to be stronger.", true],
      ["Wetlands along rivers can reduce flooding because they…", "soak up extra water", ["make more rain", "stop all rivers", "freeze in summer"], "Wetlands act like sponges.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g4-energy-resources"),
    {
      id: "in-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like coal, natural gas, wind, sunlight and moving water, using Indiana examples such as its coal mines and wind farms.",
      standards: ["4-ESS3-1", "energy and fuels come from natural resources, and their use affects the environment"],
    },
    [
      ["Indiana has large wind farms on its flat farmland. Wind is a…", "renewable resource", ["fossil fuel", "kind of rock", "kind of coal"], "Wind will not run out."],
      ["Coal mined in southwestern Indiana is a…", "fossil fuel", ["renewable resource", "kind of wind", "kind of water"], "It formed from ancient swamp plants."],
      ["For many years, most of Indiana's electricity came from burning…", "coal", ["wood", "corn husks", "sea water"], "Coal power plants have long run much of the state."],
      ["Corn grown in Indiana can be made into a fuel called…", "ethanol", ["coal", "uranium", "natural gas"], "Ethanol is mixed into gasoline."],
      ["Solar panels turn… into electricity.", "sunlight", ["wind", "coal", "water"], "The sun is a renewable resource."],
      ["Which resource will run out if we keep using it?", "coal", ["wind", "sunlight", "flowing water"], "Fossil fuels take millions of years to form."],
      ["Burning coal and gas adds… to the air.", "carbon dioxide and pollution", ["more sunlight", "fresh water", "new forests"], "Burning fuels has effects on the environment.", true],
      ["Why are wind farms a good fit for the flat land of northwest Indiana?", "it is open and windy", ["it has tall mountains", "it has no wind", "it is under water"], "Turbines need steady wind.", true],
    ],
  ),
  localCopy(
    from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    "in-g4-rocks-erosion",
    ["4-ESS1-1; 4-ESS2-1", "rock layers and fossils show landscape change, and weathering and erosion shape the land"],
    [
      ["Underground water slowly dissolved Indiana limestone to make…", "caves", ["volcanoes", "glaciers"], "Marengo Cave formed this way."],
      ["Breaking rock into smaller pieces is called…", "weathering", ["erosion", "melting"], "Erosion is moving the pieces away."],
      ["Moving rock and soil to a new place is called…", "erosion", ["weathering", "freezing"], "Wind, water and ice carry it."],
      ["In layers of rock that haven't been disturbed, the oldest layer is usually at the…", "bottom", ["top", "middle"], "Newer layers settle on older ones."],
      ["Coral fossils at the Falls of the Ohio show the land was once…", "under a warm, shallow sea", ["a desert", "a glacier"], "Fossils show past environments.", true],
      ["Water freezing in a crack in a rock can…", "split the rock", ["glue the rock", "make it grow"], "Ice takes up more space than water.", true],
    ],
  ),
];
