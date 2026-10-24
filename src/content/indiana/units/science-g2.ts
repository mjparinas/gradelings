import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { copyOf, from, localCopy } from "./kit";

// Indiana Grade 2 science: copies of California's habitat and land-and-water units and Washington's Earth-changes unit
// without their own states' places, with Indiana examples added (dunes, woods, wetlands, Lake Michigan and the rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "in-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Dunes, woods, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Indiana's sand dunes, forests, wetlands and Lake Michigan to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Sand hills beside Lake Michigan in northern Indiana are called…", "dunes", ["glaciers", "coral reefs", "volcanoes"], "Indiana Dunes National Park protects them."],
      ["Where would a white-tailed deer find shade and food in Indiana?", "a forest", ["the open ocean", "an ice cap", "a coral reef"], "Deer browse on leaves and acorns."],
      ["Frogs, cattails and herons live in a…", "wetland", ["desert", "mountain top", "sand dune"], "Wetlands are wet, marshy land."],
      ["Yellow perch and lake trout swim in…", "Lake Michigan", ["a sand dune", "a cornfield", "a cave"], "Lake Michigan is one of the Great Lakes."],
      ["Which red bird lives in Indiana all year?", "northern cardinal", ["penguin", "flamingo", "puffin"], "The cardinal is Indiana's state bird."],
      ["Blind cave fish live in the dark caves of southern Indiana. A cave habitat is…", "dark and cool", ["hot and sunny", "windy and dry", "salty like the ocean"], "Little or no light reaches inside."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a field in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do dune grasses have long roots?", "to hold on in shifting sand and reach water", ["to keep them warm", "to catch insects", "to grow fruit"], "Sand drains fast and moves in the wind.", true],
      ["Sandhill cranes stop at Indiana wetlands in fall because they…", "find food and rest on their long trip", ["build igloos", "eat cactus", "sleep in caves all winter"], "Wetlands are rest stops for migrating birds.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "in-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Indiana places like Lake Michigan, the Wabash and Ohio rivers and the hills of southern Indiana.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Michigan is one of the five…", "Great Lakes", ["oceans", "mountains", "deserts"], "The Great Lakes hold fresh water."],
      ["The Wabash is Indiana's state…", "river", ["mountain", "island", "glacier"], "It flows across the state to the Ohio River."],
      ["The Ohio River makes Indiana's southern…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Much of central Indiana is flat land called…", "plains", ["mountains", "canyons", "glaciers"], "Flat plains are good for farms."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Lake Michigan fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "The Great Lakes are fresh water.", true],
    ],
  ),
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "in-g2-earth-changes",
    ["2-ESS1-1; 2-ESS2-1", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"],
    [
      ["Water slowly dissolving rock to make a cave in southern Indiana is a… change.", "slow", ["fast", "sudden"], "Caves take thousands of years to form."],
      ["A tornado knocking down trees is a… change.", "fast", ["slow", "very slow"], "It happens in minutes."],
      ["Planting grass on a hill helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold soil in place."],
      ["A flood on the Wabash River changes the land…", "quickly", ["over millions of years", "never"], "Floods can move a lot of soil in days."],
      ["Which helps keep wind from blowing farm soil away?", "rows of trees beside the field", ["removing all plants", "plowing every day"], "Windbreaks slow the wind.", true],
      ["Glaciers flattened much of northern and central Indiana. That was a… change.", "very slow", ["sudden", "one-day"], "Glaciers move a few feet a day or less.", true],
    ],
  ),
];
