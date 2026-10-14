import type { Unit } from "../../types";
import { SCIENCE_2 } from "../../washington/units/science-k2";
import { copyOf, from } from "./kit";

// New York copies of Washington science units built around Pacific Northwest places. Each keeps the original's
// questions, leaves out the ones about Washington, Oregon or California, and adds New York items: the Great Lakes, the
// Hudson River, the Adirondacks, Long Island and Niagara Falls. Their own `ny-` ids keep New York progress apart from
// the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(SCIENCE_2, "wa-g2-habitats"),
    {
      id: "ny-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🦫",
      blurb: "Forests, ponds, oceans and deserts are full of life.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, such as forests, ponds, oceans, deserts and salt marshes, including New York's Adirondack forests and Long Island marshes.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Which habitat has tall trees, lakes and long snowy winters, like the Adirondacks?", "A northern forest", ["A desert", "A coral reef", "A grassland"], "Think of trees and snow."],
      ["Salt marshes on Long Island are wet, grassy places next to the…", "ocean", ["desert", "mountain top", "volcano"], "They flood with salty water."],
      ["A beaver builds its home in…", "a pond or stream", ["a sand dune", "a cactus", "a snowbank"], "Beavers swim and build dams."],
      ["Which animal lives in the Hudson River?", "A fish", ["A camel", "A polar bear", "A penguin"], "It needs water to live."],
      ["Which habitat has the fewest plants?", "A dry desert", ["A rainforest", "A pond", "A meadow"], "Plants need water.", true],
      ["Loons, fish and frogs share an Adirondack lake. This shows a habitat…", "has many kinds of living things", ["has only one kind of animal", "has no plants", "has no water"], "Count the kinds.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_2, "wa-g2-land-water"),
    {
      id: "ny-g2-land-water",
      title: "Land & Water",
      emoji: "🗺️",
      blurb: "Mountains, valleys, lakes, rivers and oceans.",
      parentNote:
        "Practices naming and modeling kinds of land and water, such as mountains, valleys, islands, lakes, rivers and oceans, and noticing where water is found as a solid or a liquid, with the Great Lakes, the Hudson River and Long Island as examples.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Ontario and Lake Erie are two of the…", "Great Lakes", ["Great Deserts", "Great Mountains", "Great Oceans"], "Five big lakes."],
      ["The Hudson River flows south into the…", "Atlantic Ocean", ["Pacific Ocean", "Arctic Ocean", "Indian Ocean"], "The ocean east of New York."],
      ["The Adirondacks in New York are a group of…", "mountains", ["lakes", "islands", "deserts"], "High, rocky land."],
      ["Long Island has water all around it. It is an…", "island", ["mountain", "valley", "river"], "Land with water on every side."],
      ["The Great Lakes hold…", "fresh water", ["salt water", "only ice", "only sand"], "Lakes are not salty like the ocean."],
      ["At Niagara Falls, a river…", "drops over a cliff", ["flows uphill", "turns into a mountain", "stays frozen all year"], "A waterfall.", true],
      ["In winter, parts of Lake Erie are covered with…", "ice", ["sand", "lava", "grass"], "Water freezes when it is cold.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_2, "wa-g2-earth-changes"),
    {
      id: "ny-g2-earth-changes",
      title: "Fast & Slow Earth Changes",
      emoji: "🌋",
      blurb: "Floods in a day, valleys over ages.",
      parentNote:
        "Practices sorting Earth events into fast ones (eruptions, landslides, floods) and slow ones (erosion, glaciers carving valleys), and comparing ways people slow wind and water from changing land, such as dune grass on Long Island beaches.",
      standards: ["2-ESS1-1; 2-ESS2-1", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"],
    },
    [
      ["Glaciers slowly carved the Finger Lakes over thousands of years. That was…", "slow", ["fast", "done in one day", "done in one hour"], "Ice moves very slowly."],
      ["A big storm washed away part of a Long Island beach in one night. That was…", "fast", ["slow", "thousands of years long", "not a change"], "One night is a short time."],
      ["Which helps keep sand dunes from blowing away?", "Planting beach grass", ["Pulling up plants", "Digging holes in the dunes", "Driving on the dunes"], "Roots hold the sand."],
      ["Water at Niagara Falls wears the rock away a tiny bit each year. That is…", "slow", ["fast", "done in one hour", "done in one day"], "Little by little.", true],
    ],
  ),
];
