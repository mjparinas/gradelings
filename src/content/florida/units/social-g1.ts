import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 1 social studies units (`fl-` ids): the symbols, documents, holidays and people of the United
// States and Florida (SS.1.CG.2.3, SS.1.CG.2.4, SS.1.CG.2.5, SS.1.CG.3.1, SS.1.A.2.3, SS.1.A.2.4), Florida on a map
// (SS.1.G.1.1, SS.1.G.1.4, SS.1.G.1.5, SS.1.G.1.6), and the African American artists the standards name (SS.1.AA.1.1).

const SYMBOLS: Q[] = [
  ["The 50 stars on the American flag stand for the…", "50 states", ["50 presidents", "50 cities", "50 rivers"], "Florida is one of them."],
  ["The 13 stripes on the American flag stand for the…", "first 13 colonies", ["13 presidents", "13 rivers", "13 oceans"], "They became the first states."],
  ["What is a Constitution?", "a plan for how a government works", ["a kind of flag", "a holiday", "a game"], "It is a written set of rules for the government."],
  ["The United States has a…", "Constitution", ["circus", "crown", "treasure map"], "It was written long ago."],
  ["Does Florida have its own Constitution too?", "yes", ["no", "only on holidays", "only in the summer"], "The United States and Florida both have one."],
  ["Who is the leader of the state of Florida?", "the governor", ["the principal", "the coach", "the mail carrier"], "The governor works in Tallahassee."],
  ["Who is the leader of our whole country?", "the president", ["the governor", "the mayor", "the principal"], "He or she works in the White House."],
  ["George Washington was the first…", "president", ["governor of Florida", "astronaut", "teacher"], "He is on the dollar bill."],
  ["Abraham Lincoln was a…", "president of the United States", ["king of Spain", "Florida governor", "astronaut"], "He helped end slavery."],
  ["The Statue of Liberty is a symbol of…", "freedom", ["winter", "a big lunch", "a race"], "It stands in New York Harbor."],
  ["The Liberty Bell is a symbol of…", "freedom", ["a fire drill", "a school day", "a parade"], "It rang long ago in Philadelphia."],
  ["Which bird is a symbol of the United States?", "the bald eagle", ["the flamingo", "the owl", "the duck"], "It has a white head."],
  ["Which bird is a symbol of Florida?", "the northern mockingbird", ["the bald eagle", "the penguin", "the owl"], "It can copy other birds' songs."],
  ["Florida's state flower is the…", "orange blossom", ["rose", "daisy", "tulip"], "Florida grows many oranges."],
  ["Florida's state tree is the…", "sabal palm", ["maple", "apple tree", "pine tree only"], "It is a palm with fan-shaped leaves."],
  ["Florida's state animal is the Florida…", "panther", ["bear", "camel", "wolf"], "A big wild cat that lives in the south."],
  ["Florida's nickname is the…", "Sunshine State", ["Snow State", "Windy State", "Mountain State"], "It is warm and sunny a lot."],
  ["The capital of Florida is…", "Tallahassee", ["Miami", "Orlando", "Tampa"], "The governor works there."],
  ["Patriotism means…", "loving and showing respect for your country", ["hiding", "being the fastest", "winning every game"], "We can show it by saying the Pledge."],
  ["How can a person show patriotism?", "by respecting the flag", ["by tearing up a flag", "by hiding", "by not voting ever"], "We stand when we say the Pledge."],
  ["Independence Day is on…", "July 4", ["December 25", "January 1", "October 31"], "It celebrates the birthday of our country."],
  ["Veterans Day honors people who…", "served in the military", ["are in kindergarten", "drive trucks", "plant flowers"], "Veterans served our country."],
  ["Martin Luther King Jr. Day honors a man who worked for…", "fair treatment for all people", ["bigger houses", "faster cars", "longer summers"], "He gave speeches about fairness."],
  ["Which holiday honors presidents?", "Presidents' Day", ["Halloween", "Earth Day", "Groundhog Day"], "George Washington and Abraham Lincoln are honored.", true],
  ["Memorial Day is a day to…", "remember soldiers who died serving our country", ["go to school", "begin the year", "plant trees"], "We remember with thanks.", true],
  ["Mary McLeod Bethune started a school for girls in Florida. She believed in…", "learning for everyone", ["skipping school", "playing all day", "closing schools"], "She started the school that became Bethune-Cookman University.", true],
  ["Marjory Stoneman Douglas worked to protect the…", "Everglades", ["Moon", "Pacific Ocean", "mountains"], "A large wetland in south Florida.", true],
  ["Which shows good character?", "telling the truth even when it is hard", ["taking a toy", "tricking a friend", "breaking a rule"], "Honesty is a good character trait.", true],
];

const FLORIDA_MAP: Q[] = [
  ["Florida is a…", "state", ["country", "city", "continent"], "We live in one of 50."],
  ["A map of Florida shows the shape of…", "the state", ["a cat", "a heart", "a ball"], "It looks like a long thumb."],
  ["Which ocean is on the east side of Florida?", "the Atlantic Ocean", ["the Arctic Ocean", "the Pacific Ocean", "the Indian Ocean"], "Many beaches are along it."],
  ["Which body of water is on the west side of Florida?", "the Gulf of America", ["the Pacific Ocean", "the Arctic Ocean", "Lake Michigan"], "It was called the Gulf of Mexico before."],
  ["The Gulf of America was formerly called the…", "Gulf of Mexico", ["Gulf of Spain", "Pacific Gulf", "Sea of Florida"], "It is the same body of water."],
  ["Which direction is the Atlantic Ocean from most of Florida?", "east", ["west", "north", "up"], "The sun comes up over it."],
  ["Which direction is the Gulf of America from most of Florida?", "west", ["east", "south", "down"], "The sun sets over it."],
  ["The capital of Florida is…", "Tallahassee", ["Jacksonville", "Miami", "Naples"], "It is in the northern part of the state."],
  ["Where is the state capital on a map of Florida?", "in the north, called the Panhandle", ["in the Keys", "in the middle of the ocean", "on the moon"], "Look near the top left."],
  ["The Florida Keys are small…", "islands", ["mountains", "deserts", "lakes"], "They curve into the sea at the bottom of Florida."],
  ["Which Florida place is a big city on the Atlantic coast far south?", "Miami", ["Pensacola", "Tallahassee", "Gainesville"], "It is in south Florida."],
  ["Which Florida place has theme parks and is in the middle of the state?", "Orlando", ["Key West", "Pensacola", "Naples"], "Many visitors go there."],
  ["The Everglades is a large…", "wetland", ["desert", "mountain", "glacier"], "It is full of water, grasses and animals."],
  ["Lake Okeechobee is a very large…", "lake", ["desert", "mountain", "volcano"], "It is in south-central Florida."],
  ["Most of Florida is…", "low and flat", ["covered in tall mountains", "frozen all year", "a desert"], "There are no tall mountains."],
  ["A compass rose on a map shows…", "directions", ["prices", "the weather", "the time"], "North, south, east and west."],
  ["A map key or legend tells you…", "what the symbols mean", ["how old the map is", "what time it is", "the weather"], "Look at the box with the symbols."],
  ["On a map, a star often shows…", "a capital city", ["a lake", "a mountain", "a road"], "Look at the map key to check."],
  ["A physical map shows…", "land and water features", ["only roads", "only the weather", "only town names"], "Mountains, rivers and lakes."],
  ["Which is a physical feature of Florida?", "a beach", ["a stoplight", "a school", "a stadium"], "Nature made it."],
  ["Which is a cultural feature of Florida?", "a city", ["a river", "a beach", "a swamp"], "People made it."],
  ["What is Florida's weather like in summer?", "hot and rainy", ["cold and snowy", "always windy only", "frozen"], "That is why people swim and wear light clothes."],
  ["Why do people in Florida often wear light clothes?", "the weather is warm", ["it is snowy", "it is a rule", "clothes are free"], "Weather affects how we dress."],
  ["Many Florida homes have air conditioning because…", "it gets hot", ["it snows a lot", "it is always dark", "there is no sun"], "Weather affects how we live.", true],
  ["Strong storms called hurricanes can happen in Florida mostly in…", "summer and fall", ["winter", "spring only", "never"], "People get ready before one comes.", true],
  ["What should a family do to get ready for a hurricane?", "make a plan and have supplies", ["go swimming", "ignore the news", "hide food"], "Being ready keeps us safe.", true],
  ["Why do many people visit Florida beaches?", "the weather is warm and sunny", ["there are mountains to ski", "it is covered in snow", "it is far from water"], "The environment shapes what people do.", true],
  ["Which water is east of Florida: the Atlantic Ocean or the Gulf of America?", "the Atlantic Ocean", ["the Gulf of America", "neither", "both"], "The Atlantic is on the east side.", true],
];

const ARTISTS: Q[] = [
  ["An artist is a person who…", "makes art, music or stories", ["fixes cars", "grows food only", "drives a bus"], "Artists share ideas in creative ways."],
  ["Aretha Franklin was a famous…", "singer", ["sailor", "baker", "farmer"], "She was called the Queen of Soul."],
  ["Aretha Franklin sang…", "songs with a big, strong voice", ["only in a whisper", "only on the moon", "only backwards"], "Many people loved her music."],
  ["Charles White was an artist who made…", "drawings and paintings", ["only songs", "only buildings", "only cars"], "He painted pictures of people."],
  ["Charles White drew a famous picture of…", "Abraham Lincoln", ["a spaceship", "a dinosaur", "a castle"], "He is remembered as a president."],
  ["James Earl Jones was a famous…", "actor", ["firefighter", "pilot", "farmer"], "He used his deep voice in movies."],
  ["James Earl Jones was known for his…", "deep voice", ["tall hat", "fast running", "bright shoes"], "People knew it when they heard it."],
  ["Maya Angelou was a famous…", "poet and writer", ["pilot", "chef", "judge"], "She wrote books and poems."],
  ["A poem is…", "words written in lines that sound or feel special", ["a kind of food", "a road", "a kind of weather"], "Poets choose words carefully."],
  ["Zora Neale Hurston grew up in Eatonville, a town in…", "Florida", ["Alaska", "Maine", "Texas"], "It was one of the first all-Black towns in the country."],
  ["Zora Neale Hurston was a…", "writer", ["pilot", "farmer", "sailor"], "She wrote books and collected folktales."],
  ["Which person was a singer?", "Aretha Franklin", ["Maya Angelou", "Charles White", "James Earl Jones"], "She sang soul music."],
  ["Which person was a poet?", "Maya Angelou", ["Aretha Franklin", "Charles White", "James Earl Jones"], "She wrote poems and books."],
  ["Which person was a painter?", "Charles White", ["Aretha Franklin", "Maya Angelou", "James Earl Jones"], "He made pictures."],
  ["Which person was an actor?", "James Earl Jones", ["Charles White", "Maya Angelou", "Aretha Franklin"], "He acted in plays and movies."],
  ["Music, painting and poetry are all kinds of…", "art", ["weather", "maps", "money"], "People make art to share feelings and ideas."],
  ["How can art help people?", "it can share ideas and feelings", ["it makes it rain", "it makes homework vanish", "it keeps people from talking"], "Art helps us understand each other."],
  ["Artists often show courage by…", "sharing their ideas, even when it is hard", ["hiding their work", "never trying", "copying all the time"], "It can take bravery."],
  ["When we learn about artists from the past, we learn about…", "people and times long ago", ["only today's weather", "only sports", "only toys"], "Art tells stories of the past.", true],
  ["Which is a way to enjoy art?", "listen to a song or look at a painting", ["cover your eyes", "stay away from music", "throw away books"], "Art is made to be shared.", true],
  ["Maya Angelou wrote a book about her…", "life story", ["pet fish", "trip to Mars", "favorite pizza"], "Writers tell true stories too.", true],
  ["A biography is a book about…", "a real person's life", ["a made-up place", "a recipe", "the weather"], "Someone writes about a person's life.", true],
  ["Aretha Franklin, Charles White, James Earl Jones and Maya Angelou were all…", "African American artists", ["astronauts", "explorers", "inventors of toys"], "They shared their gifts with the world.", true],
  ["Why do we remember artists like Maya Angelou?", "their work still inspires people", ["they were the fastest", "they built roads", "they invented flags"], "Their work lasts.", true],
  ["A mural is…", "a big painting on a wall", ["a tiny sticker", "a kind of song", "a bus ticket"], "Many cities have murals."],
  ["A character ideal is…", "a good quality such as honesty or courage", ["a kind of sandwich", "a toy", "a street name"], "Many artists show these qualities."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g1-symbols-people",
    title: "Florida & U.S. Symbols, Holidays & People",
    emoji: "🗽",
    blurb: "Constitutions, patriotic symbols and holidays",
    parentNote:
      "Symbols and individuals of the United States and Florida, the U.S. and Florida Constitutions, ways to show patriotism, national holidays and people from the past who showed character.",
    standards: ["SS.1.CG.2.3; SS.1.CG.2.4; SS.1.CG.2.5; SS.1.CG.3.1; SS.1.A.2.3; SS.1.A.2.4", "symbols and individuals of the United States and Florida, the Constitutions, patriotism, holidays and character ideals"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "fl-g1-florida-map",
    title: "Florida on the Map",
    emoji: "🗺️",
    blurb: "Where things are in Florida, and how weather shapes life",
    parentNote:
      "Physical, political and cultural maps of Florida, the Atlantic Ocean and the Gulf of America (formerly the Gulf of Mexico), cities, the Everglades and the Keys, and how weather and place affect the way people live.",
    standards: ["SS.1.G.1.1; SS.1.G.1.2; SS.1.G.1.4; SS.1.G.1.5; SS.1.G.1.6", "maps of Florida, key elements of maps, physical features, the Atlantic Ocean and the Gulf of America, and how location and weather affect life"],
    items: FLORIDA_MAP,
  }),
  bankUnit({
    id: "fl-g1-artists",
    title: "African American Artists",
    emoji: "🎨",
    blurb: "Singers, painters, actors and writers",
    parentNote:
      "African American artists named in the standards (Aretha Franklin, Charles White, James Earl Jones and Maya Angelou), with Florida writer Zora Neale Hurston.",
    standards: ["SS.1.AA.1.1; SS.1.A.2.4", "African American artists, and character ideals they showed"],
    items: ARTISTS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
