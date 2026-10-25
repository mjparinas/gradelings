import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// South Carolina's own Grade 1 social studies units (`sc-` ids), for Life in South Carolina: where South Carolina is and
// its symbols (1.G.2), its land, rural, suburban and urban places and the goods made in each (1.G.3, 1.G.4, 1.E.3), and
// how state and local government work and how citizens help (1.CG.2, 1.CG.3, 1.CG.4).

const OUR_STATE: Q[] = [
  ["South Carolina is in which country?", "the United States", ["Canada", "Mexico", "England"], "It is one of the 50 states."],
  ["Which ocean is on South Carolina's coast?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean", "the Indian Ocean"], "It is to the east."],
  ["Which state is north of South Carolina?", "North Carolina", ["Georgia", "Florida", "Virginia"], "Its name sounds like ours."],
  ["Which state is across the Savannah River from South Carolina?", "Georgia", ["North Carolina", "Tennessee", "Florida"], "It is to the south and west."],
  ["What is the capital city of South Carolina?", "Columbia", ["Charleston", "Greenville", "Myrtle Beach"], "It is in the middle of the state."],
  ["South Carolina's nickname is the…", "Palmetto State", ["Sunshine State", "Lone Star State", "Peach State"], "A tree is on our flag."],
  ["What tree is on the South Carolina flag?", "a palmetto tree", ["an oak tree", "a pine tree", "an apple tree"], "It is our state tree too."],
  ["What shape is next to the palmetto on our flag?", "a crescent", ["a star", "a heart", "a square"], "It looks like a thin moon."],
  ["What color is the South Carolina flag?", "blue with white shapes", ["red with gold stars", "green with a bird", "all white"], "Think of the deep blue."],
  ["South Carolina's state bird is the…", "Carolina wren", ["bald eagle", "robin", "penguin"], "A small brown bird with a loud song."],
  ["South Carolina's state flower is the…", "yellow jessamine", ["red rose", "tulip", "sunflower"], "It has small yellow flowers."],
  ["South Carolina's state dog is the…", "Boykin spaniel", ["poodle", "husky", "bulldog"], "A brown hunting dog from our state."],
  ["Which sea turtle is a South Carolina state symbol?", "the loggerhead", ["the leatherback", "the green turtle", "the box turtle"], "It lays eggs on our beaches."],
  ["Which state dance comes from South Carolina's beaches?", "the shag", ["ballet", "the hula", "the polka"], "People dance it to beach music."],
  ["On a map, South Carolina is in which part of the United States?", "the Southeast", ["the Northwest", "the Southwest", "the far North"], "Down and to the right on a US map."],
  ["Which city is an old port on South Carolina's coast?", "Charleston", ["Columbia", "Greenville", "Spartanburg"], "Ships come into its harbor."],
  ["A news story about a new school in your town is a…", "current event", ["fairy tale", "map key", "state symbol"], "It is happening now."],
  ["A big storm is coming to the coast. What might happen next?", "people get ready or leave", ["it snows all summer", "the ocean dries up", "nothing ever changes"], "Think about what people do to stay safe.", true],
  ["Is South Carolina bigger or smaller than the whole United States?", "smaller", ["bigger", "the same size", "it is not part of it"], "It is one part of the country.", true],
  ["Which is closer to South Carolina?", "North Carolina", ["Alaska", "Hawaii", "Canada"], "It touches our state.", true],
  ["Is Columbia a city, a state or a country?", "a city", ["a state", "a country", "an ocean"], "It is the capital city.", true],
  ["What can a map of the United States show you?", "where South Carolina is", ["what you ate today", "how old you are", "who your friends are"], "Maps show where places are.", true],
  ["The palmetto is on our flag because palmetto logs helped protect a…", "fort in a war long ago", ["school bus", "farm", "boat race"], "The soft logs stopped cannonballs.", true],
  ["Our state motto means \"While I breathe, I…\"", "hope", ["sleep", "eat", "run"], "It is a happy, hopeful word.", true],
];

const LAND_AND_PLACES: Q[] = [
  ["The tallest mountains in South Carolina are in the…", "Upstate", ["Lowcountry", "Sandhills", "ocean"], "They are in the northwest corner."],
  ["South Carolina's highest mountain is…", "Sassafras Mountain", ["Mount Everest", "Pikes Peak", "Table Hill"], "It is near North Carolina."],
  ["Land by the ocean with beaches and marshes is the…", "coast", ["mountains", "desert", "plateau"], "Waves wash up on it."],
  ["Wet, grassy land near the ocean is a…", "salt marsh", ["mountain", "desert", "volcano"], "Crabs and birds live there."],
  ["A long piece of land with sand by the sea is a…", "beach", ["hill", "cave", "valley"], "People build sandcastles there."],
  ["The Sandhills in the middle of the state have lots of…", "sandy soil", ["snow", "lava", "ice"], "Think about the name."],
  ["Which is a big river in South Carolina?", "the Santee River", ["the Nile River", "the Amazon River", "the Thames River"], "It flows to the Atlantic."],
  ["Lake Marion and Lake Murray are big lakes made by…", "dams", ["volcanoes", "glaciers", "earthquakes"], "People built walls to hold the water."],
  ["A big city with tall buildings and lots of people is…", "urban", ["rural", "suburban", "an ocean"], "Think of downtown."],
  ["A place with farms and fields and few people is…", "rural", ["urban", "suburban", "downtown"], "Think of the countryside."],
  ["A place of homes just outside a big city is…", "suburban", ["rural", "urban", "a farm"], "Many people drive into the city to work."],
  ["Which is urban?", "downtown Columbia", ["a cotton farm", "a forest trail", "a quiet beach"], "Lots of buildings and people."],
  ["Which is rural?", "a peach farm in the country", ["a big city street", "a busy mall", "a tall office"], "Farms, fields and few people."],
  ["A farm in rural South Carolina might grow…", "peaches", ["cars", "phones", "tires"], "It is a fruit."],
  ["A factory in South Carolina might make…", "cars", ["clouds", "rain", "sand"], "Factories make goods."],
  ["A doctor helping sick people gives a…", "service", ["good", "landform", "river"], "It is work done for you."],
  ["Many people visit South Carolina beaches. They are…", "tourists", ["farmers", "factories", "rivers"], "They come to visit and have fun."],
  ["Which good comes from a fishing boat on the coast?", "shrimp", ["apples", "cotton", "corn"], "It comes from the sea.", true],
  ["Why do many people live near cities?", "there are lots of jobs there", ["cities have no roads", "there are no houses", "it never rains"], "People live near work.", true],
  ["Rural, suburban or urban: which has the most people?", "urban", ["rural", "suburban", "they are all the same"], "Cities are crowded.", true],
  ["Trees from South Carolina forests are used to make…", "paper and wood", ["glass", "salt", "metal"], "Wood comes from trees.", true],
  ["Mountains, hills, beaches and swamps are all…", "landforms", ["services", "laws", "jobs"], "Shapes of the land.", true],
  ["Congaree National Park has a…", "forest by a river", ["big desert", "snowy mountain", "busy city"], "It has very tall old trees.", true],
  ["Why might a farm be in a rural place?", "farms need lots of open land", ["cities have more land", "farms need tall buildings", "it is a rule"], "Fields take up space.", true],
];

const GOVERNMENT: Q[] = [
  ["Who is the leader of South Carolina's government?", "the governor", ["the mayor", "the principal", "the king"], "Every state has one."],
  ["Who is the leader of a city or town?", "the mayor", ["the governor", "the president", "the coach"], "City hall is where they work."],
  ["Where do South Carolina's leaders make state laws?", "the State House in Columbia", ["a school gym", "the beach", "a farm"], "It is in our capital city."],
  ["What does a government make?", "laws", ["toys", "candy", "cars"], "Rules for everyone."],
  ["People who make our state laws meet in the…", "General Assembly", ["school library", "fire station", "zoo"], "Many lawmakers meet together."],
  ["Who chooses the governor?", "the voters", ["the teachers", "the children", "the mayor"], "Grown-ups vote."],
  ["A state law says to wear a seat belt. Why?", "to keep people safe", ["to make cars faster", "to win a prize", "for no reason"], "Laws help keep us safe."],
  ["Who keeps a town safe and helps people?", "police officers", ["artists", "bakers", "singers"], "They work for the town."],
  ["Money that pays for roads and schools comes from…", "taxes", ["birthdays", "games", "wishes"], "People pay it to the government."],
  ["Which is a service your town gives?", "picking up trash", ["selling toys", "baking cakes", "painting pictures"], "The town does it for everyone."],
  ["A good citizen…", "follows rules and helps others", ["breaks the rules", "throws trash", "is unkind"], "Think about being a good helper."],
  ["How can a child help their community?", "pick up litter", ["yell in class", "break things", "waste water"], "Small acts help a lot."],
  ["Grown-up citizens choose leaders by…", "voting", ["shouting", "drawing", "racing"], "They mark a ballot."],
  ["People who are different can work together when they…", "listen and share ideas", ["never talk", "only argue", "stay home"], "Kind talk helps."],
  ["The park needs more trash cans. What is a good first step?", "tell the town leaders", ["throw trash on the ground", "do nothing", "move away"], "Share the problem with leaders."],
  ["Who helps make rules for a county?", "the county council", ["the class pet", "the ice cream truck", "the beach"], "Counties have leaders too."],
  ["Which helps everyone in the community?", "a public library", ["a toy you keep", "your lunch", "your shoes"], "It is open to all."],
  ["Why do we vote?", "so everyone has a say", ["to make noise", "to skip school", "to get candy"], "Each vote counts.", true],
  ["A city decides where to build a new park. This is a job of…", "local government", ["the state bird", "a store", "the ocean"], "Think of city leaders.", true],
  ["The state government, not the town, runs the…", "big highways across the state", ["school class rules", "your bedtime", "a family game"], "It covers the whole state.", true],
  ["Three kids want different games at recess. A fair way to decide is…", "take a vote", ["the loudest wins", "nobody plays", "one kid picks always"], "Everyone gets a say.", true],
  ["A good citizen tells leaders about a problem by…", "writing a letter", ["breaking a window", "hiding", "yelling at a friend"], "Share ideas kindly.", true],
  ["Why do towns have rules for parks?", "so everyone can be safe and have fun", ["so no one can play", "to sell toys", "for no reason"], "Rules help people share.", true],
  ["Who works for the state in the State House?", "lawmakers and the governor", ["pirates", "zookeepers only", "astronauts"], "They lead the state.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "sc-g1-our-state",
    title: "Our State: South Carolina",
    emoji: "🌴",
    blurb: "Where South Carolina is, and its flag and symbols",
    parentNote:
      "Where South Carolina is in the United States (the Atlantic Ocean, North Carolina and Georgia), its capital, the palmetto and crescent on the flag, state symbols such as the Carolina wren and yellow jessamine, and thinking about a current event.",
    standards: ["1.G.2; 1.H.2", "where South Carolina is in the United States, its symbols, and current events in the state"],
    items: OUR_STATE,
  }),
  bankUnit({
    id: "sc-g1-land-and-places",
    title: "Land, Towns & Cities",
    emoji: "🏞️",
    blurb: "Mountains to the coast, and rural, suburban and urban places",
    parentNote:
      "South Carolina's landforms from the Upstate mountains to the Sandhills and the coast, telling rural, suburban and urban places apart, and the goods and services found in each.",
    standards: ["1.G.3; 1.G.4; 1.E.3", "rural, suburban and urban areas, South Carolina's landforms, and goods and services in each kind of place"],
    items: LAND_AND_PLACES,
  }),
  bankUnit({
    id: "sc-g1-government",
    title: "Leaders & Good Citizens",
    emoji: "🏛️",
    blurb: "The governor, the mayor, laws and helping out",
    parentNote:
      "What state and local government do (the governor, the General Assembly, the mayor and county council), why we have laws and taxes, and how citizens vote, help and work together to solve a local problem.",
    standards: ["1.CG.2; 1.CG.3; 1.CG.4", "the purpose and work of state and local government, and being an active, responsible citizen"],
    items: GOVERNMENT,
  }),
];
