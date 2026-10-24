import type { Unit } from "../../types";
import { UNITS as NEW_YORK_1 } from "../../new-york/units/social-g1";
import { from, localCopy } from "./kit";

// Indiana's copy of New York's American symbols unit, without its one question that names the Grand Canyon as a wrong
// answer, with Indiana's own symbols added (1.H.2, 1.H.4, 1.C.5).

export const SOCIAL_1: Unit[] = [
  localCopy(
    from(NEW_YORK_1, "ny-g1-american-symbols"),
    "in-g1-american-symbols",
    ["1.H.2; 1.H.4; 1.C.5", "American songs and symbols, national holidays, and the Pledge of Allegiance"],
    [
      ["Where does the Statue of Liberty stand?", "New York Harbor", ["a desert", "a mountaintop"], "Ships pass by it."],
      ["Indiana's state flag has a torch and…", "stars", ["a bear", "a ship"], "The torch stands for freedom and learning."],
      ["Indiana's state bird is the…", "cardinal", ["bald eagle", "robin"], "It is a bright red bird."],
      ["Indiana's state flower is the…", "peony", ["rose", "sunflower"], "It blooms in late spring."],
      ["People from Indiana are called…", "Hoosiers", ["Buckeyes", "Badgers"], "It is Indiana's nickname for its people."],
    ],
  ),
];
