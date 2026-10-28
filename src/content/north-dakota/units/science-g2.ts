import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// North Dakota Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with North Dakota examples added (prairie potholes, mixed-grass prairie, the Badlands, the Turtle Mountains, the Missouri
// and Red rivers, Lake Sakakawea and Devils Lake).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "nd-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, wetlands, woods and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from North Dakota's prairies, prairie potholes, Badlands and river woods to deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Ducks raise their young in the small, shallow ponds that dot North Dakota's prairie, called…", "prairie potholes", ["coral reefs", "sand dunes", "glaciers"], "Glaciers left these little ponds behind."],
      ["Prairie dogs dig their burrows under the grass of the…", "prairie", ["ocean floor", "rainforest", "ice cap"], "Their towns are in the Badlands and grasslands."],
      ["Bison, pronghorn and wild horses graze in the grassy hills and colorful buttes of the…", "Badlands", ["coral reef", "rainforest", "deep ocean"], "Theodore Roosevelt National Park is there."],
      ["Tall cottonwood trees grow best along the banks of the…", "Missouri River", ["driest hilltops", "salty sea", "inside caves"], "Their roots need lots of water."],
      ["The western meadowlark, North Dakota's state bird, nests on the ground in…", "open grasslands", ["the ocean", "deep caves", "rainforest treetops"], "It sings from fence posts on the prairie."],
      ["Aspen and oak woods, lakes and moose are found in the hills of the…", "Turtle Mountains", ["Sahara", "Great Barrier Reef", "Arctic Ocean"], "These wooded hills are in the north of the state."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many prairie animals, like prairie dogs, live in burrows?", "burrows keep them safe and sheltered from cold and heat", ["they cannot see in the light", "there is no grass to eat", "they live under the sea"], "The open prairie has few places to hide.", true],
      ["Why can't a duck that needs a pond live on a dry Badlands butte?", "there is no water there", ["it is too green", "there are too many fish", "the snow is too warm"], "Every animal needs a habitat that meets its needs.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "nd-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Buttes, plains, rivers and lakes.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using North Dakota places like the Missouri and Red rivers, Lake Sakakawea, Devils Lake, the Badlands and White Butte.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Missouri River flows across North Dakota. A river is…", "water that flows in a channel", ["a frozen lake", "a tall hill", "a sandy beach"], "Its water keeps moving downhill."],
      ["Lake Sakakawea formed behind the Garrison Dam on the Missouri River. A lake made by a dam is a…", "reservoir", ["glacier", "mountain", "island"], "The dam holds the water back."],
      ["Devils Lake is a large body of water with land all around it, so it is a…", "lake", ["river", "ocean", "valley"], "It is the biggest natural lake in North Dakota."],
      ["White Butte, the highest point in North Dakota, is a steep hill with a flat top called a…", "butte", ["valley", "lake", "river"], "Buttes stand above the land around them."],
      ["The very flat land along the Red River was once the bottom of a giant lake. Land that is flat and low is a…", "plain", ["mountain", "canyon", "volcano"], "The Red River Valley is one of the flattest places on Earth."],
      ["Low land between hills, where a river often flows, is a…", "valley", ["peak", "island", "butte"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in the Missouri River salty or fresh?", "fresh", ["salty like the ocean", "frozen all year", "made of sand"], "Rivers carry fresh water from rain and snow.", true],
    ],
  ),
];
