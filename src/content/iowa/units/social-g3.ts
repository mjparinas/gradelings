import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_5 } from "../../california/units/social-g5";
import { from, localCopy } from "./kit";

// Iowa Grade 3 social studies, America's Early Story: copies of California's units on the nations before 1500 (SS.3.6,
// SS.3.7) and on explorers, without their California items, with Iowa items added: the cultures of Native Americans
// and how places shaped them, the routes of early explorations of the Americas (SS.3.13) and how Native Americans and
// Europeans met (SS.3.11). The rest of the grade is practised with adopted units (see ../plan/social.ts).

export const SOCIAL_3: Unit[] = [
  localCopy(
    from(CALIFORNIA_5, "ca-g5-first-nations"),
    "ia-g3-first-nations",
    ["SS.3.6; SS.3.7", "the different cultures of Native Americans before contact with Europeans, and how places shaped them"],
    [
      ["Before Europeans came, many Native nations in the land that is now Iowa lived in villages near…", "rivers", ["oceans", "glaciers", "deserts"], "Rivers gave water, fish and a way to travel."],
      ["Many Native families in the river valleys of the Midwest grew corn, beans and…", "squash", ["rice", "bananas", "coffee"], "These three crops grow well together."],
      ["Nations on the prairies hunted bison because bison gave them…", "food, clothing and shelter", ["gold", "glass", "paper money"], "Every part of the animal was used."],
      ["Homes made of bark and poles were common in the…", "eastern woodlands", ["Arctic", "Sahara", "Andes"], "Forests gave the wood and bark.", true],
    ],
  ),
  localCopy(
    from(CALIFORNIA_5, "ca-g5-explorers"),
    "ia-g3-explorers",
    ["SS.3.13; SS.3.11", "the routes of early explorations of the Americas, and the meetings between Native Americans and Europeans"],
    [
      ["In 1673, Father Jacques Marquette and Louis Jolliet paddled down the Mississippi River and became the first Europeans known to see…", "the land that is now Iowa", ["the Pacific Ocean", "the Rocky Mountains", "Florida"], "They traveled by canoe from the Great Lakes."],
      ["Marquette and Jolliet were exploring for…", "France", ["Spain", "Portugal", "England"], "France claimed land along the Mississippi."],
      ["Near the Mississippi, Marquette and Jolliet met people of the…", "Illinois nation", ["Aztec Empire", "Inca Empire", "Maya"], "Their hosts welcomed them with a feast."],
      ["Julien Dubuque, a French Canadian trader, worked with the Meskwaki people to mine…", "lead", ["gold", "diamonds", "salt"], "The city of Dubuque is named for him."],
      ["Lewis and Clark traveled up the Missouri River along Iowa's western edge in…", "1804", ["1492", "1673", "1900"], "They were exploring the Louisiana Purchase."],
      ["Sergeant Charles Floyd, the only member of the Lewis and Clark expedition to die on the journey, is buried near…", "Sioux City", ["Des Moines", "Dubuque", "Iowa City"], "A tall stone monument marks the place.", true],
      ["French fur traders traded metal pots, knives and cloth with Native nations for…", "beaver furs", ["oil", "coffee", "tea"], "Beaver hats were popular in Europe.", true],
      ["Explorers on the Mississippi traveled mostly by…", "canoe", ["car", "train", "airplane"], "Rivers were the easiest roads.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and the explorers and traders who reached the land that is now Iowa: Marquette and Jolliet in 1673, Julien Dubuque, and Lewis and Clark in 1804.",
    },
  ),
];
