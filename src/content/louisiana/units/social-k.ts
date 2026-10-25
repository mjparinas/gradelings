import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Louisiana Kindergarten social studies: Louisiana's symbols, music, food and celebrations (K.4, K.5), and land, water
// and weather around us (K.19, K.20, K.22). Short prompts for little readers.

const TRADITIONS: Q[] = [
  ["Which bird is on the Louisiana state flag?", "brown pelican", ["owl", "parrot"], "It is a big bird that dives for fish."],
  ["Which bird is a symbol of the United States?", "bald eagle", ["brown pelican", "robin"], "It has a white head."],
  ["What do we say to the United States flag?", "the Pledge of Allegiance", ["a lullaby", "the alphabet"], "We stand and say it in school."],
  ["What is our country's song called?", "“The Star-Spangled Banner”", ["“Happy Birthday”", "“Twinkle, Twinkle”"], "We sing it at games and events."],
  ["What colors are on the United States flag?", "red, white and blue", ["green and yellow", "purple and orange"], "It has stars and stripes."],
  ["Who was the first President?", "George Washington", ["Dr. Martin Luther King Jr.", "Abraham Lincoln"], "His birthday is a holiday in February."],
  ["Who helped end slavery as President?", "Abraham Lincoln", ["George Washington", "Dr. Martin Luther King Jr."], "He was the 16th President."],
  ["Who spoke about a dream of fairness for all people?", "Dr. Martin Luther King Jr.", ["George Washington", "Abraham Lincoln"], "We honor him in January."],
  ["Which Louisiana party has parades and king cake?", "Mardi Gras", ["Labor Day", "Memorial Day"], "Beads are thrown from floats."],
  ["What is a king cake?", "a round cake for Mardi Gras", ["a cake for a king's crown", "a kind of bread for soup"], "A tiny baby is hidden inside."],
  ["What do many Louisiana families eat on Mondays?", "red beans and rice", ["birthday cake", "ice cream"], "It cooks all day on Mondays."],
  ["Which music comes from Louisiana?", "jazz", ["opera from Italy", "bagpipe music"], "It started in New Orleans."],
  ["Zydeco music often uses a washboard and an…", "accordion", ["harp", "tuba"], "You squeeze it to play."],
  ["Cajun music is often played on a fiddle and an…", "accordion", ["electric guitar only", "drum set only"], "It has buttons and folds."],
  ["Which holiday has fireworks for our country's birthday?", "Independence Day", ["Thanksgiving Day", "Christmas Day"], "It is on July 4th."],
  ["Which holiday is about giving thanks?", "Thanksgiving Day", ["Labor Day", "New Year's Day"], "It is in November."],
  ["Which day starts a new year?", "New Year's Day", ["Veterans Day", "Labor Day"], "It is January 1st."],
  ["Veterans Day honors people who…", "served in the military", ["build houses", "grow food"], "They helped keep our country safe."],
  ["Juneteenth remembers the end of…", "slavery", ["school", "summer"], "It is on June 19th.", true],
  ["Memorial Day remembers soldiers who…", "died serving our country", ["won a race", "built a bridge"], "It is a day to remember.", true],
  ["Labor Day honors people who…", "work", ["sleep", "play games"], "It is in September.", true],
  ["Which is a Louisiana symbol?", "the brown pelican", ["the kangaroo", "the panda"], "It is on our flag.", true],
  ["“Jazz” and “zydeco” are kinds of…", "music", ["food", "weather"], "You can dance to them.", true],
  ["Why do we have holidays?", "to remember people and events", ["to stop learning forever", "to make it rain"], "They help us remember.", true],
  ["On the Louisiana flag, the pelican is caring for its…", "babies", ["car", "house"], "It is feeding its chicks.", true],
];

const LAND: Q[] = [
  ["Land that is much higher than the land around it is a…", "mountain", ["lake", "river"], "It is very tall."],
  ["Water that flows in a long path is a…", "river", ["hill", "island"], "The Mississippi is one."],
  ["Land with water all around it is an…", "island", ["lake", "mountain"], "You need a boat to get there."],
  ["Water with land all around it is a…", "lake", ["river", "coast"], "Lake Pontchartrain is one."],
  ["Where land meets the sea is the…", "coast", ["mountain", "hill"], "Louisiana has a long one."],
  ["Land that is a little higher than the land around it is a…", "hill", ["lake", "ocean"], "It is smaller than a mountain."],
  ["Which big river flows through Louisiana?", "the Mississippi River", ["the Nile River", "the Amazon River"], "It flows to the Gulf."],
  ["On a map, water is usually colored…", "blue", ["red", "black"], "Think of the sea."],
  ["What do people use trees to build?", "houses", ["clouds", "rain"], "Wood comes from trees."],
  ["Fish from the Gulf are a natural…", "resource", ["machine", "toy"], "It comes from nature."],
  ["Why do people build houses?", "for shelter", ["to make it rain", "to grow fish"], "Houses keep us safe and dry."],
  ["Some houses near water are built on tall legs to stay…", "dry in a flood", ["cold in winter", "close to clouds"], "These legs are called stilts."],
  ["It is raining. What should you take outside?", "an umbrella", ["sunglasses only", "a sled"], "It keeps you dry."],
  ["It is very hot. What should you wear?", "light clothes and a hat", ["a heavy coat", "snow boots"], "Stay cool in the sun."],
  ["It is cold. What should you wear?", "a warm coat", ["a swimsuit", "sandals"], "Stay warm."],
  ["A storm is coming. Where should you go?", "inside", ["to the beach", "up a tree"], "Inside is safer."],
  ["Which weather is good for flying a kite?", "windy", ["calm", "foggy"], "Wind lifts the kite."],
  ["When it is sunny and hot, it is a good day to…", "swim", ["build a snowman", "go sledding"], "Water cools you down."],
  ["Thunder and lightning mean we should…", "go indoors", ["stand under a tree", "go swimming"], "Lightning is dangerous.", true],
  ["A hurricane is a big storm with strong…", "wind and rain", ["snow and ice", "sand and sun"], "It starts over warm water.", true],
  ["Why do people plant crops?", "to grow food", ["to make storms", "to build roads"], "Rice and sugarcane grow here.", true],
  ["People build levees to keep out…", "river water", ["sunshine", "birds"], "Levees are walls of earth.", true],
  ["A swamp is land that is…", "wet, with trees", ["dry and sandy", "icy all year"], "Alligators live there.", true],
  ["A bridge helps people…", "cross water", ["make rain", "dig holes"], "It goes over a river.", true],
  ["Weather that changes plans for a picnic is…", "rain", ["a sunny sky", "a light breeze"], "We might stay inside.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "la-k-louisiana-traditions",
    title: "Louisiana and Our Nation",
    emoji: "🎺",
    blurb: "Symbols, music, food and holidays",
    parentNote:
      "The symbols and customs of Louisiana and the United States (the flags, the brown pelican, the bald eagle, the Pledge and the national anthem), famous Americans, our holidays, and Louisiana traditions such as Mardi Gras, king cake, red beans and rice, jazz, Cajun music and zydeco.",
    standards: ["K.4; K.5", "symbols, customs, famous people and holidays of the state and nation, and Louisiana's cultures and traditions"],
    items: TRADITIONS,
  }),
  bankUnit({
    id: "la-k-land-water-weather",
    title: "Land, Water and Weather",
    emoji: "🌦️",
    blurb: "Rivers, islands, using nature and dressing for the weather",
    parentNote:
      "Naming landforms and bodies of water (mountains, hills, coasts, islands, lakes and rivers), how people use natural resources and build shelter, and how the weather changes what we wear and do.",
    standards: ["K.19; K.20; K.22", "landforms and bodies of water, how people use and change their environment, and how weather affects daily life"],
    items: LAND,
  }),
];
