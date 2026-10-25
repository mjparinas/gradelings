import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kentucky Kindergarten social studies, the community: symbols and events of American patriotism (K.C.RR.2) and of
// Kentucky (K.C.KGO.2), and the leaders of the local community and what they do (K.C.KGO.1), with the purpose of local
// government (K.C.CP.1).

const SYMBOLS: Q[] = [
  ["Our country is the…", "United States", ["Kentucky", "Ohio River", "Louisville"], "Kentucky is our state."],
  ["Our state is…", "Kentucky", ["the United States", "the Ohio River", "Mexico"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["When we say the Pledge of Allegiance, we face the…", "flag", ["door", "clock", "window"], "We put a hand on our heart."],
  ["The bald eagle is a bird that stands for the…", "United States", ["moon", "ocean", "winter"], "It is our national bird."],
  ["On the Fourth of July, we celebrate…", "our country's birthday", ["the first snow", "a new school year", "Thanksgiving"], "There are fireworks."],
  ["Kentucky's state bird is the red…", "cardinal", ["robin", "owl", "parrot"], "The male cardinal is bright red."],
  ["Kentucky's state flower is the yellow…", "goldenrod", ["rose", "tulip", "daisy"], "It blooms in late summer."],
  ["Kentucky's state flag is…", "blue with the state seal", ["green with a moon", "red with a bear", "white with a fish"], "The seal shows two people shaking hands."],
  ["The two people on Kentucky's seal are…", "shaking hands", ["running a race", "eating lunch", "riding bikes"], "It shows friendship."],
  ["Kentucky's nickname is the…", "Bluegrass State", ["Sunshine State", "Snow State", "Ocean State"], "It is named for a kind of grass."],
  ["Kentucky is famous for fast…", "horses", ["penguins", "camels", "whales"], "Horses race at the Kentucky Derby."],
  ["The Kentucky Derby is a famous…", "horse race", ["spelling bee", "boat race", "baking contest"], "It is held each May in Louisville."],
  ["A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country."],
  ["Kentucky's state song is…", "My Old Kentucky Home", ["Jingle Bells", "Happy Birthday", "Old MacDonald"], "It is sung before the Kentucky Derby.", true],
  ["Kentucky's motto is \"United We Stand, Divided We…\"", "Fall", ["Run", "Sing", "Swim"], "It means we are stronger together.", true],
  ["Kentucky's state tree is the tall…", "tulip poplar", ["palm tree", "cactus", "pine tree"], "Its flowers look like tulips.", true],
  ["Which famous president was born in Kentucky?", "Abraham Lincoln", ["George Washington", "Santa Claus", "a pilgrim"], "He was born in a small log cabin.", true],
  ["Mammoth Cave in Kentucky is the longest…", "cave in the world", ["river in the world", "road in town", "slide at the park"], "It goes on for hundreds of miles underground.", true],
  ["On Veterans Day, we thank people who…", "served in the military", ["drive buses", "bake bread", "build toys"], "It is in November.", true],
  ["When we say the Pledge of Allegiance, we put our hand…", "on our heart", ["on our head", "in our pocket", "on our knee"], "Stand up straight and face the flag."],
  ["Kentucky's state horse is the…", "Thoroughbred", ["zebra", "pony car", "rocking horse"], "Thoroughbreds race in the Kentucky Derby."],
];

const LEADERS: Q[] = [
  ["The leader of a city or town is the…", "mayor", ["principal", "coach", "chef"], "The mayor helps run the town."],
  ["The leader of a school is the…", "principal", ["mayor", "governor", "firefighter"], "The principal helps the whole school."],
  ["Who leads our state of Kentucky?", "the governor", ["the principal", "the coach", "the librarian"], "The governor works in Frankfort."],
  ["Who leads our whole country?", "the President", ["the mayor", "the principal", "the bus driver"], "The President lives in the White House."],
  ["A police officer helps keep people…", "safe", ["hungry", "sleepy", "lost"], "Police officers help in an emergency."],
  ["A firefighter's job is to…", "put out fires and help people", ["bake bread", "deliver mail", "fix teeth"], "Firefighters ride a fire truck."],
  ["A librarian helps you…", "find books", ["fix a car", "put out fires", "cut your hair"], "Libraries lend books for free."],
  ["The town makes a rule about speed near schools to…", "keep children safe", ["make cars faster", "close the school", "sell toys"], "Rules help people."],
  ["Local government takes care of things like…", "parks and roads", ["the moon", "the ocean floor", "other planets"], "Local means near where we live."],
  ["Who picks the mayor?", "the people who vote in the town", ["the principal", "a coin toss", "the mail carrier"], "Grown-ups vote."],
  ["Grown-ups choose leaders by…", "voting", ["shouting", "racing", "drawing straws"], "Each vote counts once."],
  ["A good leader…", "listens to people", ["never helps", "is mean", "breaks rules"], "Leaders help others."],
  ["Who keeps the town's parks clean and safe?", "park workers", ["astronauts", "pirates", "dragons"], "They work for the town."],
  ["When a street light is broken, the town can…", "fix it", ["paint the sky", "sell the street", "close the ocean"], "Local government helps fix things."],
  ["A crossing guard helps children…", "cross the street safely", ["learn to swim", "bake cookies", "buy toys"], "Crossing guards hold a stop sign."],
  ["Why does a town have leaders?", "to help everyone get along and stay safe", ["to eat all the food", "to stop all games", "to close the parks"], "Leaders make plans for the town."],
  ["The town council meets to…", "make rules for the town", ["play tag", "bake pies", "fly kites"], "Council members help the mayor.", true],
  ["Where does the town keep its fire trucks?", "the fire station", ["the library", "the bakery", "the pet store"], "Fire trucks wait there.", true],
  ["Taxes help the town pay for…", "schools, roads and parks", ["birthday gifts", "your toys", "candy"], "Grown-ups pay taxes.", true],
  ["A judge's job is to…", "decide what is fair under the rules", ["fly planes", "teach music", "grow corn"], "Judges work in a courthouse.", true],
  ["You can help your community by…", "picking up litter", ["breaking rules", "yelling", "wasting water"], "Everyone can help.", true],
  ["Kentucky's capital city, where the governor works, is…", "Frankfort", ["Louisville", "Lexington", "Paducah"], "It is on the Kentucky River.", true],
  ["A mail carrier helps the community by…", "bringing letters and packages", ["putting out fires", "teaching math", "fixing teeth"], "Mail comes to your home."],
  ["A doctor helps people…", "stay healthy", ["build roads", "drive buses", "make laws"], "Doctors work in clinics and hospitals."],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ky-k-symbols",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "American symbols and Kentucky's symbols",
    parentNote: "Symbols of the United States (the flag, the Pledge of Allegiance, the bald eagle and the Fourth of July) and of Kentucky, our state: the cardinal, the goldenrod, the state flag and seal, the Bluegrass State and the Kentucky Derby.",
    standards: ["K.C.RR.2; K.C.KGO.2", "symbols and events of American patriotism, and local and Kentucky symbols and events"],
    items: SYMBOLS,
  }),
  bankUnit({
    id: "ky-k-community-leaders",
    title: "Community Leaders",
    emoji: "🏛️",
    blurb: "Mayors, governors and the people who help us",
    parentNote: "Leaders in the community and what they do (the mayor, the principal, the governor and the President), community helpers, and what local government does: parks, roads, safety rules and choosing leaders by voting.",
    standards: ["K.C.KGO.1; K.C.CP.1", "leaders in the local community and their roles, and the purpose of local government"],
    items: LEADERS,
  }),
];
