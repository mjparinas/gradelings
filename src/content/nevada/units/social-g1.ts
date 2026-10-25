import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nevada Grade 1 social studies, the Community We Live In and the Work We Do: what local government does, from
// garbage collection and roads to making and enforcing laws (SS.1.16), and the people who help a community
// (SS.1.15), with Nevada's cities and counties.

const LOCAL: Q[] = [
  ["Who leads many cities in Nevada?", "a mayor", ["a king", "a pilot", "a chef"], "Voters in the city choose the mayor."],
  ["A group that makes a city's laws is the…", "city council", ["school band", "ball team", "bus crew"], "The council votes on new laws."],
  ["Who takes away the trash each week?", "garbage collectors", ["bakers", "painters", "dentists"], "Trash pickup is a city service."],
  ["Who puts out fires in our town?", "firefighters", ["farmers", "singers", "pilots"], "Fire stations belong to the community."],
  ["Who helps keep people safe and makes sure laws are followed?", "police officers", ["bakers", "artists", "clowns"], "They enforce the laws."],
  ["Where can you borrow books for free?", "the public library", ["the gas station", "a shoe store", "the bank"], "Libraries are a community service."],
  ["Who fixes the roads in our town?", "road crews", ["doctors", "teachers", "cooks"], "Smooth roads keep cars safe."],
  ["A city builds parks so people can…", "play and rest outside", ["pay bills", "fix cars", "buy shoes"], "Parks are for everyone."],
  ["How does a city pay for parks and roads?", "with taxes", ["with game tickets", "with candy", "with coupons"], "People pay taxes to the community."],
  ["A town makes a rule that dogs need a leash in the park. That is a…", "law", ["holiday", "song", "game"], "The council made a new law."],
  ["Who chooses the mayor?", "the voters", ["the mayor's dog", "a pilot", "a baker"], "Grown-ups vote in elections."],
  ["Clean water from the tap comes from a…", "water service", ["toy store", "movie theater", "zoo"], "Many towns run a water plant."],
  ["What is the capital of Nevada?", "Carson City", ["Las Vegas", "Reno", "Elko"], "State leaders meet there."],
  ["Which is the biggest city in Nevada?", "Las Vegas", ["Carson City", "Ely", "Tonopah"], "It is in the south of the state."],
  ["Reno is a big city in which part of Nevada?", "the north", ["the south", "the ocean", "the moon"], "It is near Lake Tahoe."],
  ["The leader of our whole state is the…", "governor", ["mayor", "principal", "coach"], "The governor works in Carson City."],
  ["Who helps a community, not just leaders?", "all of us", ["only the mayor", "only adults", "no one"], "Everyone can help."],
  ["Picking up litter at the park is a way to…", "help the community", ["break a rule", "make a mess", "waste water"], "Small acts help everyone."],
  ["A crossing guard helps children…", "cross the street safely", ["read books", "bake bread", "fly kites"], "They stop the cars."],
  ["Nevada is split into parts called…", "counties", ["oceans", "planets", "islands"], "Each county has its own leaders.", true],
  ["Las Vegas is in which county?", "Clark County", ["Washoe County", "Elko County", "Lake County"], "Most Nevadans live there.", true],
  ["Reno is in which county?", "Washoe County", ["Clark County", "Nye County", "Lyon County"], "It is in the north.", true],
  ["If a street has many crashes, who might add a stop sign?", "the city", ["a grocery store", "a pet shop", "a bakery"], "Local roads are a local job.", true],
  ["Why do towns have laws?", "to keep people safe and fair", ["to make people sad", "to stop all fun", "to make noise"], "Laws help us live together.", true],
  ["Nevada is dry, so many towns ask people to…", "save water", ["waste water", "fill pools daily", "water the road"], "Water is precious in the desert.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "nv-g1-local-government",
    title: "Our Community Helpers",
    emoji: "🏛️",
    blurb: "Mayors, councils and the services a town runs",
    parentNote: "What local government in Nevada's cities and counties does: making and enforcing laws, collecting garbage, building roads and parks, fire protection, libraries and water, paid for with taxes, and how everyone, not only leaders, helps the community. Includes Carson City, Las Vegas, Reno and a few counties.",
    standards: ["SS.1.16; SS.1.15", "the purpose of government functions such as garbage collection, laws and road building, and how all people play roles in the community"],
    items: LOCAL,
  }),
];
