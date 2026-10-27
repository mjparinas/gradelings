import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Dakota Kindergarten social studies: naming our town, state, country and continent (K.SS.1), South Dakota and its
// neighbors, Alaska and Hawaii on a map of the United States (K.SS.2), and symbols of America, Mount Rushmore among them
// (K.SS.4).

const OUR_STATE: Q[] = [
  ["Our country is the…", "United States", ["South Dakota", "Pierre", "Black Hills"], "South Dakota is our state."],
  ["Our state is…", "South Dakota", ["the United States", "North America", "the moon"], "Our state is in our country."],
  ["Our country is on the continent of…", "North America", ["South Dakota", "the moon", "Pierre"], "A continent is a very big piece of land."],
  ["How many states are in the United States?", "50", ["13", "5", "100"], "Count the stars on the flag."],
  ["The state just north of South Dakota is…", "North Dakota", ["Hawaii", "Alaska", "Texas"], "Both are named Dakota."],
  ["Which state is far away in the ocean?", "Hawaii", ["North Dakota", "Nebraska", "Iowa"], "Hawaii is made of islands."],
  ["Which state is big, cold and far to the north?", "Alaska", ["Hawaii", "Iowa", "Nebraska"], "Alaska has lots of snow."],
  ["The big ocean on the east side of our country is the…", "Atlantic Ocean", ["Pacific Ocean", "Missouri River", "Lake Oahe"], "East is where the sun comes up."],
  ["The big ocean on the west side of our country is the…", "Pacific Ocean", ["Atlantic Ocean", "Big Sioux River", "Lake Oahe"], "Hawaii is in this ocean."],
  ["On a map, water is often colored…", "blue", ["red", "black", "pink"], "Look for the blue parts."],
  ["A round model of Earth is a…", "globe", ["map", "kite", "drum"], "You can spin it."],
  ["A flat drawing of a place is a…", "map", ["globe", "ball", "song"], "Maps show where things are."],
  ["Mount Rushmore is in our state. It has the faces of four…", "presidents", ["teachers", "farmers", "bakers"], "They are carved in the rock."],
  ["Mount Rushmore is carved into a…", "mountain", ["lake", "tree", "river"], "It is in the Black Hills."],
  ["The American flag has red and white…", "stripes", ["circles", "hearts", "triangles"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["The bald eagle is a symbol of…", "the United States", ["the moon", "winter", "a farm"], "It is our national bird."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "river", "lunch"], "We stand and face it."],
  ["The Statue of Liberty holds up a…", "torch", ["fish", "shoe", "kite"], "Its light stands for freedom."],
  ["On the Fourth of July we celebrate our country's…", "birthday", ["first snow", "school day", "bedtime"], "It is Independence Day."],
  ["Which state is next to South Dakota?", "Nebraska", ["Hawaii", "Alaska", "Florida"], "Nebraska is just south of us.", true],
  ["Wyoming and Montana are next to South Dakota on the…", "west", ["east", "ocean", "moon"], "The Black Hills are on the west side.", true],
  ["Minnesota and Iowa are next to South Dakota on the…", "east", ["west", "ocean", "moon"], "The sun comes up in the east.", true],
  ["Our state's capital city is…", "Pierre", ["Hawaii", "the White House", "Mount Rushmore"], "State leaders work there.", true],
  ["The White House is where the… lives.", "president", ["mayor", "principal", "farmer"], "It is in Washington, D.C.", true],
  ["A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "lunch", "sleep"], "It has a big crack.", true],
  ["Uncle Sam wears a tall hat with…", "stars and stripes", ["flowers", "fish", "dots"], "He stands for our country.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "sd-k-our-state",
    title: "Our State & Country",
    emoji: "🇺🇸",
    blurb: "South Dakota on the map, and symbols of America",
    parentNote:
      "Naming our state, country and continent, finding South Dakota, its neighbors, Alaska, Hawaii and the two oceans on a map of the United States, maps and globes, and symbols of America such as the flag, the bald eagle, the Statue of Liberty and Mount Rushmore in the Black Hills.",
    standards: ["K.SS.1; K.SS.2; K.SS.4", "naming our state, country and continent, South Dakota and its neighbors on a map, and symbols of America"],
    items: OUR_STATE,
  }),
];
