import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Tennessee Kindergarten social studies: the child's address, city and state (K.10), the American flag, the Tennessee
// flag and the Pledge of Allegiance (K.11), and the name, image and role of the President (K.12). The President is
// taught by role, not by name, so the unit stays true after an election. Prompts stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Tennessee", ["Lakeland", "Sunnyvale"], "It starts with a T."],
  ["Tennessee is one of the states in the…", "United States", ["ocean", "moon"], "There are 50 states."],
  ["Tennessee's capital city is…", "Nashville", ["Memphis", "Knoxville"], "The state's leaders work there."],
  ["How many stars are on Tennessee's flag?", "3", ["50", "13"], "Count the white stars in the blue circle."],
  ["Tennessee's flag is mostly what color?", "red", ["green", "purple"], "It has a blue circle in the middle."],
  ["The stars on Tennessee's flag sit inside a blue…", "circle", ["square", "heart"], "It is round."],
  ["How many stars are on the United States flag?", "50", ["3", "13"], "One star for each state."],
  ["The flag of our country is the…", "Stars and Stripes", ["Maple Leaf", "Rising Sun"], "It has stars and stripes."],
  ["How many stripes are on the United States flag?", "13", ["50", "3"], "One for each of the first states."],
  ["What colors are on the United States flag?", "red, white and blue", ["green and gold", "black and orange"], "Tennessee's flag has them too."],
  ["We say the Pledge of Allegiance to the…", "flag", ["school bus", "lunch box"], "Hand on heart."],
  ["When we say the Pledge, we put our right hand…", "over our heart", ["on our head", "in our pocket"], "Stand tall and face the flag."],
  ["The Pledge says we are one nation, with liberty and justice for…", "all", ["some", "no one"], "Everyone counts."],
  ["Your address tells people where you…", "live", ["eat lunch", "sleep at school"], "Mail comes to your address."],
  ["An address has a number and a…", "street name", ["favorite color", "pet's name"], "Like 12 Oak Street."],
  ["Nashville, Memphis and Knoxville are…", "cities in Tennessee", ["states", "oceans"], "Many people live in cities."],
  ["The leader of our country is the…", "President", ["governor", "principal"], "The President lives in the White House."],
  ["Where does the President live and work?", "the White House", ["the zoo", "a castle"], "It is in Washington, D.C."],
  ["How do we choose the President?", "people vote", ["a coin flip", "a race"], "Grown-ups vote every four years.", true],
  ["The President leads…", "the whole country", ["only one school", "one street"], "Every state is part of it.", true],
  ["The President's job is to…", "lead the country and keep laws working", ["drive every bus", "teach every class"], "It is a very big job.", true],
  ["The leader of Tennessee is the…", "governor", ["President", "mayor"], "The governor works in Nashville.", true],
  ["A city, a state and a country. Which is biggest?", "the country", ["the city", "the state"], "A country holds many states.", true],
  ["The three stars on Tennessee's flag stand for…", "the three parts of Tennessee", ["three rivers", "three kings"], "East, Middle and West Tennessee.", true],
  ["Why do we learn our address?", "so we can get help or get home", ["to win a prize", "to spell big words"], "It keeps you safe.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "tn-k-flags-and-leaders",
    title: "Flags & Our President",
    emoji: "🇺🇸",
    blurb: "Our address, our flags and our leader",
    parentNote:
      "Knowing your address, city and state, the American flag and the Tennessee flag (three stars for East, Middle and West Tennessee), the words of the Pledge of Allegiance, and what the President does. The President is taught by role, so ask your child the current President's name at home.",
    standards: ["K.10; K.11; K.12", "recalling an address, city and state, the American and Tennessee flags and the Pledge, and the role of the President"],
    items: SYMBOLS,
  }),
];
