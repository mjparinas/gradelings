import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_5 } from "../../california/units/social-g5";
import { copyOf, from } from "./kit";

// Minnesota copies of other states' units. Each keeps the original's questions, leaves out the ones that name another
// state or are about Tribes, and adds Minnesota items where they fit. Their own `mn-` ids keep Minnesota progress apart
// from the originals.
export const UNITS: Unit[] = [
  copyOf(
    from(CALIFORNIA_5, "ca-g5-explorers"),
    {
      id: "mn-g5-explorers",
      title: "Explorers & Encounters",
      emoji: "⛵",
      blurb: "Why they sailed and what changed",
      parentNote: "Practices the religious, political and economic reasons Europeans sailed to the Americas, the explorers and the Indigenous nations they met, and what changed for both, read from maps and accounts of the time.",
      standards: ["5.4.21.1; 5.3.13.1", "why Europeans came to the Americas, and maps of early America from different perspectives"],
    },
    [
      ["The city of Duluth is named for a French explorer, Daniel Greysolon, Sieur du…", "Lhut", ["Paris", "Soto", "Gama"], "Say Duluth slowly."],
      ["The French priest who named St. Anthony Falls on the Mississippi in 1680 was…", "Louis Hennepin", ["Christopher Columbus", "Henry Hudson", "Amerigo Vespucci"], "A county is named for him too."],
      ["French explorers came to the western Great Lakes in the 1600s mostly to…", "trade for furs and search for a route west", ["find gold mines", "build cotton farms", "start a navy"], "Beaver pelts and a passage."],
      ["In 1832, with an Ojibwe guide, Henry Schoolcraft reached the lake that is the source of the Mississippi, now called…", "Lake Itasca", ["Lake Superior", "Lake Erie", "Red Lake"], "In northern Minnesota.", true],
      ["Zebulon Pike led a US Army expedition up the Mississippi into what is now Minnesota in…", "1805", ["1492", "1776", "1950"], "Soon after the Louisiana Purchase.", true],
    ]
  ),
  copyOf(
    from(CALIFORNIA_5, "ca-g5-slavery-and-resistance"),
    {
      id: "mn-g5-slavery-resistance",
      title: "Slavery & Resistance",
      emoji: "⛓️",
      blurb: "Enslaved people and their struggle for freedom",
      parentNote: "Practices the difference between indentured servitude and slavery, how enslaved people resisted slavery and kept and built their cultures, and free Black communities in early America.",
      standards: ["5.4.19.1; 5.4.21.2", "how enslaved people resisted slavery and kept their cultures, and indentured servitude and slavery"],
    },
  ),
];
