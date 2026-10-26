import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Iowa Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Iowa examples added (prairies, woodlands, wetlands, the Mississippi and Missouri rivers and the Iowa Great Lakes).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ia-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, woods, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Iowa's prairies, woodlands, wetlands and rivers to deserts, oceans and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall grasses, wildflowers, bison and meadowlarks live on a…", "prairie", ["coral reef", "glacier", "sand dune"], "Tallgrass prairie once covered most of Iowa."],
      ["Frogs, cattails and ducks live in a…", "wetland", ["desert", "mountain top", "cave"], "Iowa's prairie potholes are small wetlands."],
      ["Catfish, turtles and river otters live in the…", "Mississippi River", ["Sahara Desert", "Arctic ice", "a cornfield"], "The Mississippi runs along Iowa's eastern edge."],
      ["Oak trees, squirrels and white-tailed deer live in a…", "woodland", ["coral reef", "ocean", "desert"], "Woodlands grow along many Iowa rivers."],
      ["Which animal is built for the dry desert?", "the desert tortoise", ["the river otter", "the walrus", "the puffin"], "It digs burrows to stay cool."],
      ["Monarch butterflies stop in Iowa to sip nectar from…", "prairie flowers", ["seaweed", "ice", "cactus spines"], "Milkweed and wildflowers feed monarchs."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a dry desert", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Bald eagles gather by the Mississippi River in winter because…", "they can catch fish where the water stays open", ["they like snow", "the river freezes solid", "there are no fish"], "Open water near dams is good fishing.", true],
      ["Why do fewer kinds of plants grow on a cornfield than on a prairie?", "people plant one crop there", ["prairies have no plants", "corn grows in the ocean", "cornfields are frozen"], "A prairie has hundreds of kinds of plants.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ia-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Iowa places like the Mississippi and Missouri rivers, the Loess Hills and the Iowa Great Lakes.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Mississippi River forms Iowa's…", "eastern border", ["western border", "northern border", "southern border"], "Iowa has a big river on each side."],
      ["The river that forms most of Iowa's western border is the…", "Missouri River", ["Nile River", "Amazon River", "Colorado River"], "It flows past Sioux City and Council Bluffs."],
      ["Spirit Lake and West Okoboji Lake in northern Iowa are…", "lakes", ["mountains", "oceans", "deserts"], "They are part of the Iowa Great Lakes."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Some rivers have islands in them."],
      ["The Loess Hills in western Iowa are…", "hills", ["oceans", "glaciers", "islands"], "Wind piled up fine soil to make them."],
      ["Low land between hills is a…", "valley", ["peak", "island", "lake"], "Rivers often flow through valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Rivers in Iowa flow toward the Mississippi or the Missouri, and then on to the…", "Gulf of Mexico", ["Arctic Ocean", "Great Salt Lake", "Pacific Ocean"], "The Missouri joins the Mississippi, which reaches the Gulf.", true],
    ],
  ),
];
