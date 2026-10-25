import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Oklahoma copies of Grade 5 units that fit Oklahoma except for a few questions naming another state's places, with
// Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-sun-stars"), "ok-g5-sun-stars", ["5.ESS1.1; 5.ESS1.2", "why the sun looks brighter than other stars, and daily and seasonal patterns of shadows, day and night and stars"], [
    ["Days in Oklahoma are longest in…", "June", ["December", "March"], "Summer days are long."],
    ["Days in Oklahoma are shortest in…", "December", ["June", "August"], "Winter days are short."],
    ["At noon in Oklahoma, your shadow is shortest when the sun is…", "high in the sky", ["just rising", "setting"], "A high sun makes short shadows."],
    ["On a clear night far from Oklahoma City's lights, you can see…", "many more stars", ["no stars at all", "the sun"], "City lights hide dim stars."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-earth-water"), "ok-g5-earth-water", ["5.ESS2.2; 5.ESS3.1", "the amounts of salt water and fresh water on Earth, and ways communities protect Earth's resources"], [
    ["Most of Oklahoma's drinking water comes from…", "lakes, rivers and groundwater", ["the ocean", "melting glaciers"], "Oklahoma is far from the ocean."],
    ["Planting grass and trees along Oklahoma streams helps…", "keep soil out of the water", ["make the water salty", "dry up the stream"], "Plants hold soil in place."],
    ["Oklahoma farmers use no-till farming to…", "protect the soil from blowing and washing away", ["make more dust", "use more water"], "Leaving old stalks covers the soil."],
    ["Recycling in Oklahoma towns helps protect…", "land and resources", ["only the moon", "nothing at all"], "Less trash goes to landfills."],
  ], { parentNote: "Practises how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect resources like Oklahoma's lakes, streams and soil." }),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"), "ok-g5-ecosystems", ["5.LS2.1; 5.LS2.2", "how matter moves among plants, animals, decomposers and the environment, and what upsets an ecosystem's balance"], [
    ["On the Oklahoma prairie, grass is eaten by bison. The grass is a…", "producer", ["consumer", "decomposer"], "Producers make their own food."],
    ["A hawk that eats prairie dogs is a…", "consumer", ["producer", "decomposer"], "Consumers eat other living things."],
    ["Mushrooms on a fallen oak in an Oklahoma forest are…", "decomposers", ["producers", "predators"], "They break down dead matter."],
    ["When eastern redcedar trees spread across Oklahoma prairies, they…", "crowd out grasses and change the ecosystem", ["make more grass grow", "have no effect"], "Fire once kept them in check."],
  ], { parentNote: "Practises how matter moves among plants, animals, decomposers and the environment, and what can upset an ecosystem, with Oklahoma examples like bison and prairie grass and redcedar spreading across the prairie." }),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-gravity"), "ok-g5-gravity", ["5.PS2.1", "Earth's gravity pulls objects down, toward Earth's center"], [
    ["A pecan falls from a tree in Oklahoma because of…", "gravity", ["magnetism", "wind only"], "Gravity pulls things down."],
    ["Two students, one in Tulsa and one in Australia, drop balls. Both balls…", "fall toward Earth's center", ["float away", "fall in the same direction in space"], "Down means toward Earth's center."],
    ["A rain drop falling over Oklahoma City moves…", "toward the ground", ["up into space", "sideways forever"], "Gravity pulls water down too."],
    ["When you jump on a trampoline, you come back down because of…", "gravity", ["friction", "sound"], "Gravity always pulls."],
  ]),
];
