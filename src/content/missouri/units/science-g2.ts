import type { Unit } from "../../types";
import { SCIENCE_COPIES as CALIFORNIA_SCIENCE_2 } from "../../california/units/science-g2";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { copyOf, from, localCopy } from "./kit";

// Missouri Grade 2 science: copies of Washington's Earth-changes unit and California's land-and-water unit without
// their own states' places, with Missouri examples added.

export const SCIENCE_2: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "mo-g2-earth-changes",
    ["2.ESS1.C.1; 2.ESS2.A.1", "Earth events happen quickly or slowly, and ways to stop wind and water from changing the land"],
    [
      ["Water slowly dissolving rock to make a cave in the Ozarks is a… change.", "slow", ["fast", "sudden"], "Caves take thousands of years to form."],
      ["A tornado knocking down trees is a… change.", "fast", ["slow", "very slow"], "It happens in minutes."],
      ["Planting grass on a hillside helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold the soil in place."],
      ["A flood on the Missouri River changes the land…", "quickly", ["over millions of years", "never"], "Floods can move a lot of soil in days."],
      ["Farmers plant rows of trees beside fields to slow the…", "wind", ["sun", "moon"], "Trees break the wind so soil stays put.", true],
      ["Rocks piled along a riverbank help stop the river from…", "wearing the bank away", ["flowing", "freezing"], "Rocks protect the soil behind them.", true],
    ],
    {
      parentNote:
        "Practices telling fast Earth changes (floods, tornadoes, landslides) from slow ones (caves forming, rivers carving valleys), and comparing ways to keep wind and water from changing the land, with Missouri examples.",
    },
  ),
  copyOf(
    from(CALIFORNIA_SCIENCE_2, "ca-g2-land-water"),
    {
      id: "mo-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Missouri places like the Missouri and Mississippi rivers, the Ozark hills and the Lake of the Ozarks.",
      standards: ["2.ESS2.B.1", "modeling the shapes and kinds of land and bodies of water in an area"],
    },
    [
      ["The Mississippi is a long…", "river", ["mountain", "island", "glacier"], "It flows south to the Gulf."],
      ["The Mississippi River makes Missouri's eastern…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["The Missouri River flows across the state and joins the…", "Mississippi River", ["Pacific Ocean", "Lake of the Ozarks", "Great Salt Lake"], "They meet just north of St. Louis."],
      ["Southern Missouri has rolling, rocky land called the Ozark…", "hills", ["glaciers", "beaches", "volcanoes"], "The Ozarks are old, worn-down highlands."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["The Lake of the Ozarks was made when people built a dam on a…", "river", ["mountain", "glacier", "desert"], "A dam holds back river water to make a lake.", true],
      ["Is the water in the Missouri River fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "Rivers carry fresh water.", true],
    ],
  ),
];
