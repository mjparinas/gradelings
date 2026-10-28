import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Washington, DC Grade 2 science: copies of California's habitat and land-and-water units without their California
// places, with DC examples added (the forests of Rock Creek Park, the marshes along the Anacostia, the Potomac and
// Anacostia rivers, Rock Creek, the Tidal Basin and Theodore Roosevelt Island).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "dc-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, marshes, rivers and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from the forests of Rock Creek Park and the marshes along the Anacostia River to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Deer, foxes and tall oak trees live in the forest of Washington, DC's…", "Rock Creek Park", ["Tidal Basin", "Union Station", "National Mall"], "It is one of the biggest city parks in the country."],
      ["Frogs, turtles and water lilies live in a…", "pond", ["sand dune", "glacier", "cave"], "Ponds are small, still bodies of fresh water."],
      ["A marsh along the Anacostia River is wet land where tall grasses grow. A marsh is a kind of…", "wetland", ["desert", "mountain top", "beach"], "Wetlands are wet, marshy land."],
      ["Great blue herons wade in the shallow water of the Anacostia River to catch…", "fish", ["acorns", "leaves", "rocks"], "Their long legs and beaks help them fish."],
      ["Bald eagles build nests in tall trees near DC's rivers because they eat…", "fish", ["grass", "bark", "berries only"], "The rivers are full of fish."],
      ["The wood thrush, DC's official bird, nests in shady…", "forests", ["deserts", "ice caps", "coral reefs"], "It sings from the trees in spring."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many desert animals come out at night?", "it is cooler then", ["they are afraid of the moon", "plants sleep in the day", "it rains every night"], "Desert days can be very hot.", true],
      ["A beaver builds a dam across a stream. What does the dam make?", "a pond", ["a mountain", "a desert", "an island of ice"], "The dam holds the water back.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "dc-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers and islands.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Washington, DC places like the Potomac and Anacostia rivers, Rock Creek, the Tidal Basin and Theodore Roosevelt Island.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Potomac, which flows past the Lincoln Memorial, is a wide…", "river", ["mountain", "desert", "glacier"], "Its water flows toward the ocean."],
      ["Theodore Roosevelt Island has the Potomac River all around it. It is an…", "island", ["ocean", "valley", "mountain"], "An island has water on every side."],
      ["Rock Creek flows through a deep… in its park, with hills on both sides.", "valley", ["volcano", "desert", "glacier"], "Running water slowly carved it."],
      ["The Anacostia River flows into the… at Washington, DC.", "Potomac River", ["Pacific Ocean", "Lake Superior", "Gulf of Mexico"], "The two rivers meet near Hains Point."],
      ["Land that rises high above the land around it is a…", "mountain", ["valley", "lake", "plain"], "DC has hills, but no mountains."],
      ["Low land between hills is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["The Tidal Basin, where the cherry trees grow, is filled with water from the…", "Potomac River", ["ocean", "rain only", "a glacier"], "Gates let river water in and out.", true],
    ],
  ),
];
