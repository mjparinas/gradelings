import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Kindergarten social studies: the parts of an address and finding the school's city or town on a state
// map (K.T2.3, K.T2.4), with Massachusetts's symbols. Prompts stay short for little kids.

const MY_STATE: Q[] = [
  ["What is the name of our state?", "Massachusetts", ["Lakeland", "Sunnyvale"], "It has a long name with a lot of s's."],
  ["Massachusetts is one of the states in the…", "United States", ["ocean", "moon"], "There are 50 states."],
  ["The capital city of Massachusetts is…", "Boston", ["Springfield", "Worcester"], "It is by the ocean."],
  ["Our state bird is the…", "chickadee", ["flamingo", "penguin"], "It is small and says its name: chick-a-dee-dee."],
  ["Our state flower is the…", "mayflower", ["cactus flower", "sunflower"], "It shares its name with the Pilgrims' ship."],
  ["Our state tree is the…", "American elm", ["palm tree", "cactus"], "It is a tall shade tree."],
  ["Which ocean is next to Massachusetts?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "It is to the east."],
  ["Cape Cod is shaped a bit like…", "a bent arm", ["a circle", "a star"], "It curls out into the ocean."],
  ["Where do the leaders of Massachusetts meet?", "the State House", ["the zoo", "the beach"], "It has a gold dome in Boston."],
  ["What color is the dome on the State House?", "gold", ["green", "purple"], "It shines in the sun."],
  ["An address tells…", "where a place is", ["what time it is", "how old you are"], "Mail carriers use it."],
  ["Which part of an address is a number?", "the house number", ["the state", "the country"], "It is on the door or mailbox."],
  ["“Main Street” is the… in an address.", "street name", ["state", "country"], "It names the road."],
  ["In an address, the state comes after the…", "city or town", ["house number", "street name"], "City, then state."],
  ["The last part of a full address can be the…", "country", ["street", "house number"], "Ours is the United States."],
  ["A map of our state shows…", "cities and towns", ["what we ate", "our toys"], "A map shows places."],
  ["Our school is in a city or a…", "town", ["planet", "ocean"], "Massachusetts has many towns."],
  ["The flag of our country is the…", "Stars and Stripes", ["Rising Sun", "Union Jack"], "It has 50 stars."],
  ["How many stars are on the United States flag?", "50", ["13", "10"], "One star for each state.", true],
  ["What do we learn by heart so we can get home?", "our address", ["our shoe size", "a song"], "Street, town and state.", true],
  ["The Massachusetts flag is white and…", "blue", ["orange", "pink"], "It shows a shield in the middle.", true],
  ["Massachusetts is called the Bay…", "State", ["Island", "Star"], "Massachusetts Bay is by Boston.", true],
  ["Which sea animal swims off our coast?", "whale", ["camel", "lion"], "Boats take people to watch them.", true],
  ["We say the Pledge of Allegiance to the…", "flag", ["school bus", "cafeteria"], "Hand on heart.", true],
  ["The leader of our state is the…", "governor", ["king", "captain"], "The leader of our country is the President.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ma-gk-my-state",
    title: "My Address & My State",
    emoji: "🏠",
    blurb: "Where we live in Massachusetts",
    parentNote: "The parts of an address (house number, street, city or town, state and country), Massachusetts on a map with Boston, the State House, Cape Cod and the Atlantic Ocean, and state symbols such as the chickadee, the mayflower and the American elm.",
    standards: ["K.T2.3; K.T2.4", "the parts of an address, and finding our city or town on a map of Massachusetts"],
    items: MY_STATE,
  }),
];
