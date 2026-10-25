import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Connecticut Grade 1 social studies, Society and Ourselves: Connecticut on the map and the communities in it, past and
// present (1.Geo.2.a, 1.Geo.3.a), the nation's symbols (1.Civ.8.b), and how storms can change how a community lives
// (1.Geo.12.a). Prompts stay short for little kids. Connecticut's Native nations are living communities today.

const OUR_STATE: Q[] = [
  ["What is the name of our state?", "Connecticut", ["Riverland", "Oakton"], "Its name comes from a Native word."],
  ["Connecticut's name means…", "long tidal river", ["tall mountain", "big desert"], "It comes from a Mohegan-Pequot word."],
  ["Connecticut's capital city is…", "Hartford", ["Bridgeport", "Mystic"], "The state's leaders work there."],
  ["Connecticut's biggest city is…", "Bridgeport", ["Hartford", "Norwich"], "It is on Long Island Sound."],
  ["The big river that flows through Connecticut is the…", "Connecticut River", ["Nile River", "Amazon River"], "It flows south to the Sound."],
  ["The water along Connecticut's south shore is…", "Long Island Sound", ["the Pacific Ocean", "a desert"], "It opens to the Atlantic Ocean."],
  ["Connecticut's state bird is the…", "American robin", ["penguin", "parrot"], "It has an orange-red chest."],
  ["Connecticut's state flower is the…", "mountain laurel", ["cactus flower", "sunflower"], "It has pink and white flowers."],
  ["Connecticut's state tree is the…", "white oak", ["palm tree", "banana tree"], "It grows acorns."],
  ["Connecticut's state animal lives in the sea. It is the…", "sperm whale", ["camel", "kangaroo"], "Whaling ships once sailed from Connecticut."],
  ["Connecticut is a small state. It is in…", "New England", ["the Southwest", "the Pacific Northwest"], "New England is in the northeast of the country."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Hartford has a star on Connecticut maps."],
  ["Which Native nation lives in Connecticut today?", "the Mohegan Tribe", ["the Maya", "the Aztec"], "Native nations are part of Connecticut now."],
  ["The Mashantucket Pequot Tribal Nation is a…", "Native nation in Connecticut today", ["kind of boat", "big city"], "It has its own government and museum."],
  ["People from many places live in Connecticut. They bring…", "foods, music and languages", ["only snow", "only rocks"], "Communities share their cultures."],
  ["Many families in Connecticut have roots in Puerto Rico, Jamaica, Poland and…", "many other places", ["only one place", "nowhere else"], "Connecticut's people come from all over."],
  ["A big snowstorm can close schools and…", "roads", ["the sun", "the ocean"], "Plows clear the roads after."],
  ["A hurricane brings strong wind and…", "heavy rain", ["sunny skies", "snowflakes"], "It can knock down trees."],
  ["The flag of the United States has…", "stars and stripes", ["moons and dots", "a tree"], "There is one star for each state."],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean"], "It is our national bird."],
  ["The Statue of Liberty stands for…", "freedom", ["winter", "sports"], "She holds a torch up high."],
  ["Why do we say the Pledge of Allegiance?", "to show we care about our country", ["to start a race", "to order lunch"], "We say it facing the flag."],
  ["Connecticut is called the Constitution State. A constitution is…", "a plan for a government", ["a kind of boat", "a song"], "Early Connecticut wrote down its rules.", true],
  ["Connecticut's state ship is a submarine named the…", "Nautilus", ["Mayflower", "Titanic"], "It was built in Groton.", true],
  ["Which state is next to Connecticut?", "Rhode Island", ["Hawaii", "Alaska"], "Rhode Island is on the east side.", true],
  ["Connecticut's state insect is the…", "praying mantis", ["monarch butterfly", "honeybee"], "It folds its front legs like it is praying.", true],
  ["After a storm knocks out power, neighbors can help by…", "checking on each other", ["staying away from everyone", "going to the beach"], "Communities work together.", true],
  ["A map of Connecticut that shows towns and roads helps you…", "find where places are", ["tell the weather", "count money"], "Maps show where things are.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ct-g1-connecticut-our-state",
    title: "Connecticut, Our State",
    emoji: "🌳",
    blurb: "Our state's places, symbols and communities",
    parentNote:
      "Connecticut on the map (Hartford, Bridgeport, the Connecticut River and Long Island Sound), its symbols (the robin, mountain laurel, white oak and sperm whale), the Native nations and the many cultural communities that live here today, the nation's symbols, and how storms can change daily life.",
    standards: ["1.Geo.2.a; 1.Geo.3.a; 1.Civ.8.b; 1.Geo.12.a", "Connecticut on maps, its Native nations and cultural communities, symbols of the United States, and how storms change the way a community lives"],
    items: OUR_STATE,
  }),
];
