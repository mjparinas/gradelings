import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kansas Grade 1 social studies, Role of Individuals: rules and laws, leaders and the people who help a community, as
// the Kansas History, Government, and Social Studies Standards' Grade 1 civics/government unit suggests (rules, rights,
// responsibilities, leadership), with what local government does and Kansas's cities and counties.

const LOCAL: Q[] = [
  ["Who leads many cities in Kansas?", "a mayor", ["a king", "a pilot", "a chef"], "Voters in the city choose the mayor."],
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
  ["What is the capital of Kansas?", "Topeka", ["Wichita", "Dodge City", "Salina"], "State leaders meet there."],
  ["Which is the biggest city in Kansas?", "Wichita", ["Topeka", "Hays", "Emporia"], "It is on the Arkansas River."],
  ["Kansas City, Kansas, is in which part of Kansas?", "the east", ["the west", "the ocean", "the moon"], "It is next to Missouri."],
  ["The leader of our whole state is the…", "governor", ["mayor", "principal", "coach"], "The governor works in Topeka."],
  ["Who helps a community, not just leaders?", "all of us", ["only the mayor", "only adults", "no one"], "Everyone can help."],
  ["Picking up litter at the park is a way to…", "help the community", ["break a rule", "make a mess", "waste water"], "Small acts help everyone."],
  ["A crossing guard helps children…", "cross the street safely", ["read books", "bake bread", "fly kites"], "They stop the cars."],
  ["Kansas is split into 105 parts called…", "counties", ["oceans", "planets", "islands"], "Each county has its own leaders.", true],
  ["Wichita is in which county?", "Sedgwick County", ["Johnson County", "Shawnee County", "Ford County"], "It is in south central Kansas.", true],
  ["Topeka is in which county?", "Shawnee County", ["Sedgwick County", "Finney County", "Ellis County"], "The capital is in northeast Kansas.", true],
  ["If a street has many crashes, who might add a stop sign?", "the city", ["a grocery store", "a pet shop", "a bakery"], "Local roads are a local job.", true],
  ["Why do towns have laws?", "to keep people safe and fair", ["to make people sad", "to stop all fun", "to make noise"], "Laws help us live together.", true],
  ["When the tornado sirens sound, a good citizen…", "goes to shelter and helps others get there", ["goes outside to look", "turns off the radio", "ignores them"], "Sirens are a community warning.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "ks-g1-local-government",
    title: "Our Community Helpers",
    emoji: "🏛️",
    blurb: "Mayors, councils and the services a town runs",
    parentNote: "What local government in Kansas's cities and counties does: making and enforcing laws, collecting garbage, building roads and parks, fire protection, libraries and water, paid for with taxes, and how everyone, not only leaders, helps the community. Includes Topeka, Wichita, Kansas City and a few of Kansas's 105 counties.",
    standards: ["2.1; 1.1", "the rights and responsibilities of people in a community, the rules and laws local government makes and the services it provides, and the choices people make to help"],
    items: LOCAL,
  }),
];
