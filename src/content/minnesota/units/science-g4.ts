import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_4, SCIENCE_5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

// Minnesota copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about other states, and adds Minnesota items: Lake Superior, the Mississippi
// headwaters and Minnesota's wind farms. Their own `mn-` ids keep Minnesota progress apart from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_5, "wa-g5-earth-water"),
    {
      id: "mn-g4-earth-water",
      title: "Earth's Systems & Water",
      emoji: "💧",
      blurb: "Land, water, air and life work together.",
      parentNote:
        "Practices how Earth's land, water, air and living things interact, how much of Earth's water is salty, fresh or frozen, and how communities protect water, using Minnesota's lakes and rivers as examples.",
      standards: ["4E.2.2.1.1; 4E.3.1.1.1", "how much of Earth's water is salt water, fresh water and ice, and how Earth's systems interact"],
    },
    [
      ["Lake Superior, on Minnesota's northeast edge, is a lake of…", "fresh water", ["salt water", "frozen sand", "oil"], "Great Lakes water is fresh."],
      ["The Mississippi River begins as a small stream flowing out of…", "Lake Itasca in Minnesota", ["the Gulf of Mexico", "the Pacific Ocean", "a glacier in Alaska"], "Its headwaters are in northern Minnesota."],
      ["Minnesota has thousands of lakes, but most of Earth's water is…", "salt water in the oceans", ["in Minnesota's lakes", "in rivers", "in clouds"], "Oceans hold about 97%."],
      ["In winter, many Minnesota lakes freeze over. Frozen water is part of the…", "hydrosphere", ["geosphere", "biosphere", "atmosphere"], "Ice is still water."],
      ["Which helps keep a Minnesota lake clean?", "Keeping fertilizer and trash out of storm drains", ["Washing paint into the lake", "Dumping grass clippings in the water", "Pouring oil on the ice"], "Drains lead to lakes."],
      ["Lake Superior holds about one tenth of the world's…", "fresh surface water", ["salt water", "glacier ice", "groundwater"], "It is the largest Great Lake.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_4, "wa-g4-energy-resources"),
    {
      id: "mn-g4-energy-resources",
      title: "Energy Resources",
      emoji: "⚡",
      blurb: "Where our energy and fuels come from.",
      parentNote:
        "Practices how energy and fuels come from natural resources like wind, sunlight, moving water, coal, oil and gas, how using them affects the environment, and how communities choose energy, including Minnesota's wind farms.",
      standards: ["4E.4.2.1.1; 4E.4.2.2.1", "energy and fuels come from natural resources, and how communities use them"],
    },
    [
      ["Rows of tall wind turbines on Minnesota's southwestern prairies make electricity from…", "wind", ["coal", "sunlight", "oil"], "Spinning blades."],
      ["Minnesota has no oil wells of its own, so gasoline for its cars is made from oil that…", "comes from other places", ["grows on farms", "falls as rain", "comes from lakes"], "Oil is brought in by pipeline or train."],
      ["A dam on the Mississippi River at Minneapolis makes electricity from…", "moving water", ["wind", "sunlight", "burning coal"], "Hydropower."],
      ["Which energy source is renewable and blows across Minnesota's open farmland?", "Wind", ["Coal", "Oil", "Natural gas"], "It won't run out."],
      ["In a cold Minnesota winter, which helps a home use less energy for heating?", "Sealing drafty windows and doors", ["Leaving the door open", "Turning the heat up and opening windows", "Running the oven all day"], "Keep warm air in."],
      ["Corn grown in Minnesota is made into ethanol, a fuel that is…", "renewable, because new corn can be grown", ["a fossil fuel", "a kind of metal", "made from sunlight directly"], "Crops regrow each year.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"),
    {
      id: "mn-g4-rocks-erosion",
      title: "Rock Layers & Erosion",
      emoji: "🪨",
      blurb: "Weathering, erosion and what rock layers tell us.",
      parentNote: "Practices how water, ice, wind and plants weather and erode rock, and how rock layers and fossils show how a landscape changed, with examples from Minnesota's river valleys and the North Shore.",
      standards: ["4E.1.2.1.1; 4E.3.2.1.1", "weathering and erosion, and what rock layers and fossils tell us about change"],
    },
    [
      ["Over thousands of years, the Mississippi River carved a deep valley through layers of rock in southeastern Minnesota. This is an example of…", "erosion by water", ["a volcano", "an earthquake", "melting rock"], "Moving water wears rock away."],
      ["Fossils of sea animals are found in limestone near the Twin Cities. This tells us the area was once…", "covered by a shallow sea", ["a desert of sand dunes", "always dry land", "on the moon"], "Sea creatures lived there."],
      ["Waves on Lake Superior slowly wear away the rocky shore. This is…", "erosion", ["deposition only", "a fossil", "weathering by plants only"], "Water carries rock away."],
    ]
  ),
];
