import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Montana Grade 1 social studies: Montana's human and physical landmarks (SS.G.1.1) and maps of familiar places
// (SS.G.1.2). Prompts stay short for little kids. Montana's Tribal Nations are living communities today.

const OUR_STATE: Q[] = [
  ["What is the name of our state?", "Montana", ["Riverland", "Oakton"], "Its name means mountain in Spanish."],
  ["Montana's capital city is…", "Helena", ["Billings", "Missoula"], "The state's leaders work there."],
  ["Montana's biggest city is…", "Billings", ["Helena", "Butte"], "It is on the Yellowstone River."],
  ["Montana is called Big Sky Country because…", "the sky looks huge over open land", ["the sky is always blue", "it has no clouds"], "You can see far in every direction."],
  ["Tall, rocky mountains stand in the…", "west of Montana", ["middle of the ocean", "east of the plains"], "They are the Rocky Mountains."],
  ["The wide, flat, grassy land in eastern Montana is the…", "plains", ["ocean", "jungle"], "Farms and ranches spread across it."],
  ["A long river that starts in Montana is the…", "Missouri River", ["Nile River", "Amazon River"], "It flows east across the state."],
  ["A huge lake in western Montana is…", "Flathead Lake", ["Lake Erie", "the Dead Sea"], "Cherry orchards grow near it."],
  ["A park with glaciers and tall peaks is…", "Glacier National Park", ["Central Park", "a parking lot"], "It is in northwest Montana."],
  ["Montana's state animal is the…", "grizzly bear", ["camel", "kangaroo"], "It is a big brown bear."],
  ["Montana's state bird is the…", "western meadowlark", ["penguin", "parrot"], "It has a yellow chest."],
  ["Montana's state flower is the…", "bitterroot", ["cactus flower", "sunflower"], "It has pink petals."],
  ["Montana's state tree is the…", "ponderosa pine", ["palm tree", "banana tree"], "It has long needles."],
  ["A building where the state's laws are made is the…", "capitol", ["barn", "zoo"], "Montana's has a copper dome."],
  ["A landmark made by nature is a…", "physical landmark", ["human landmark", "road sign"], "Mountains and lakes are physical."],
  ["A landmark built by people is a…", "human landmark", ["physical landmark", "river"], "Bridges and buildings are human."],
  ["Which is a physical landmark?", "a mountain", ["a school", "a bridge"], "People did not build it."],
  ["Which is a human landmark?", "a library", ["a lake", "a hill"], "People built it."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Helena has a star on Montana maps."],
  ["On a map, blue usually shows…", "water", ["roads", "towns"], "Rivers and lakes are blue."],
  ["The part of a map that tells what symbols mean is the…", "key", ["title", "edge"], "It is also called a legend."],
  ["A compass rose on a map shows…", "directions", ["the weather", "the time"], "It points north, south, east and west."],
  ["A map of your classroom would show…", "desks and the door", ["the ocean", "the moon"], "Maps show places from above."],
  ["Montana's Tribal Nations live in…", "Montana today", ["only long ago", "another country"], "They are part of Montana now."],
  ["Which state is next to Montana?", "Idaho", ["Hawaii", "Florida"], "Idaho is on Montana's west side.", true],
  ["The country north of Montana is…", "Canada", ["Mexico", "Brazil"], "Montana shares a border with it.", true],
  ["A map drawn from above shows things as a…", "bird would see them", ["fish would see them", "worm would see them"], "It is a bird's-eye view.", true],
  ["A map of your town helps you…", "find where places are", ["tell the weather", "count money"], "Maps show where things are.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "mt-g1-montana-on-the-map",
    title: "Montana on the Map",
    emoji: "🏔️",
    blurb: "Mountains, plains, rivers and the places we know",
    parentNote:
      "Montana's physical and human landmarks (the Rocky Mountains, the plains, the Missouri River, Flathead Lake, the capitol in Helena), the state symbols, and reading simple maps with a key and a compass rose.",
    standards: ["SS.G.1.1; SS.G.1.2", "Montana's human and physical landmarks, and maps of familiar places"],
    items: OUR_STATE,
  }),
];
