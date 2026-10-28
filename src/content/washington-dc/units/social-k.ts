import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Washington, DC Kindergarten social studies, "Me and My Community" (the DC Social Studies Standards, 2023): the local
// community and its characteristics (K.21), why people live in different parts of Washington, DC (K.22), and the
// people who help the community and the leaders children hear about (K.1): the District's flag, its symbols and
// landmarks, the mayor and the president.

const CITY: Q[] = [
  ["Our city is Washington, DC. It is the capital of our…", "country", ["school", "street", "zoo"], "Our country is the United States."],
  ["Our country is the…", "United States", ["Potomac River", "White House", "National Mall"], "Washington, DC is its capital."],
  ["The DC flag has three red…", "stars", ["circles", "hearts", "moons"], "They sit above two red bars."],
  ["Under the three stars, the DC flag has two red…", "bars", ["dots", "fish", "trees"], "The bars go across the flag."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["How many stars are on the American flag?", "50", ["3", "13", "100"], "One star for each state."],
  ["Who lives and works in the White House?", "the president", ["the mayor", "a zookeeper", "a pilot"], "The president leads our country."],
  ["Who leads the city of Washington, DC?", "the mayor", ["the principal", "a bus driver", "a baker"], "DC voters choose the mayor."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the mayor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who helps put out fires in our city?", "firefighters", ["bakers", "pilots", "artists"], "They ride big red trucks."],
  ["The big white building with a dome where Congress meets is the…", "Capitol", ["zoo", "library", "playground"], "Laws are made there."],
  ["The tall, pointed stone tower on the National Mall is the…", "Washington Monument", ["White House", "Metro", "Capitol"], "It honors George Washington."],
  ["In spring, pink and white flowers bloom on DC's…", "cherry trees", ["cactus plants", "palm trees", "pine cones"], "Many people come to see them."],
  ["The trains that run under DC streets are called the…", "Metro", ["ferry", "rocket", "sled"], "Many people ride it to work and school."],
  ["Which river flows past Washington, DC?", "the Potomac", ["the Nile", "the Amazon", "the Thames"], "Boats sail on it."],
  ["DC's official bird sings in the woods. It is the wood…", "thrush", ["penguin", "parrot", "ostrich"], "It is a small brown bird."],
  ["DC's official flower is the American Beauty…", "rose", ["cactus", "tulip", "daisy"], "It is a red flower."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["Lots of families live close together in tall…", "apartment buildings", ["caves", "igloos", "tree nests"], "Cities have many homes in a small space."],
  ["Many people live in a city because it has lots of…", "jobs, schools and stores", ["sand", "snow", "cows"], "People live near work and school."],
  ["A park in the city is a good place to…", "play and enjoy nature", ["fly a plane", "build a ship", "sleep all day"], "Rock Creek Park has trees and trails."],
  ["Washington, DC has eight parts called…", "wards", ["oceans", "planets", "countries"], "Each ward has many neighborhoods.", true],
  ["DC's flag comes from the family shield of…", "George Washington", ["a pirate", "a dentist", "a pilot"], "The city is named for him.", true],
  ["The museums on the National Mall that are free to visit are the…", "Smithsonian", ["White House", "Metro", "Capitol"], "There are dinosaurs and airplanes inside.", true],
  ["DC's words \"Justitia Omnibus\" mean \"Justice for…\"", "All", ["Lunch", "Snow", "Recess"], "Justice means being fair.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "dc-k-my-city",
    title: "My City, Washington, DC",
    emoji: "🏛️",
    blurb: "DC's flag, places and leaders",
    parentNote: "Washington, DC as our city and the nation's capital: the DC flag and the American flag, a few of the District's symbols (the wood thrush and the American Beauty rose), places children may know (the Capitol, the White House, the Washington Monument, the Metro, the Potomac and the cherry trees), why so many people live close together in a city, and the people who lead and help, from teachers and firefighters to the mayor and the president.",
    standards: ["K.21; K.22; K.1", "the characteristics of our local community, why people live in different parts of Washington, DC, and the roles of people in a community"],
    items: CITY,
  }),
];
