import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Hawaiʻi Kindergarten social studies: the roles and responsibilities of people at home, at school and in the
// neighborhood (SS.K.1.7.3), and the physical characteristics of places on maps and globes (SS.K.3.13.3), with the
// American flag, Hawaiʻi's islands and a few of its state symbols.

const ISLAND_HOME: Q[] = [
  ["Our country is the…", "United States", ["Hawaiʻi", "Pacific Ocean", "Honolulu"], "Hawaiʻi is our state."],
  ["Our state is…", "Hawaiʻi", ["the United States", "the Pacific Ocean", "the moon"], "Our state is in our country."],
  ["Hawaiʻi is made of many…", "islands", ["deserts", "glaciers", "big cities"], "Water is all around each one."],
  ["An island is land with… all around it.", "water", ["snow", "sand only", "trees"], "You need a boat or plane to get there."],
  ["The big ocean all around Hawaiʻi is the…", "Pacific Ocean", ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean"], "It is the biggest ocean on Earth."],
  ["On a globe, the blue parts show…", "water", ["land", "roads", "houses"], "Most of the globe is blue."],
  ["On a map, Hawaiʻi looks like a chain of… in the ocean.", "islands", ["mountains of snow", "rivers", "cities"], "They are small dots in a lot of blue."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the American flag stands for a…", "state", ["city", "island", "school"], "Hawaiʻi has a star too."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "beach"], "We stand and face it."],
  ["Hawaiʻi's state bird is the…", "nēnē", ["penguin", "parrot", "ostrich"], "It is a goose that lives only in Hawaiʻi."],
  ["Hawaiʻi's state flower is the yellow…", "hibiscus", ["rose", "tulip", "cactus"], "Its Hawaiian name is maʻo hau hele."],
  ["Hawaiʻi's state marine mammal is the humpback…", "whale", ["shark", "turtle", "crab"], "They visit Hawaiʻi every winter."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the mayor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who keeps swimmers safe at the beach?", "a lifeguard", ["a baker", "a librarian", "a dentist"], "Lifeguards watch the water."],
  ["Who catches fish to sell at the market?", "a fisher", ["a firefighter", "a teacher", "a nurse"], "Fishers go out in boats."],
  ["Who grows kalo, bananas and other food?", "a farmer", ["a pilot", "a librarian", "a lifeguard"], "Farmers work on the land."],
  ["At home, a job a child can do is…", "put away toys", ["drive the car", "fix the roof", "cook dinner alone"], "Everyone helps a little."],
  ["At school, a job for a student is to…", "listen and take turns", ["drive the bus", "lead the school", "cook lunch for all"], "Students help the class work well."],
  ["When we keep the beach clean, we help our…", "community", ["toothbrush", "shoelaces", "lunch box"], "A community is the people around us."],
  ["Who helps put out fires and keep us safe?", "firefighters", ["bakers", "farmers", "artists"], "They ride in a big red truck."],
  ["Who leads the whole state of Hawaiʻi?", "the governor", ["the principal", "a lifeguard", "the teacher"], "The governor works in Honolulu.", true],
  ["Honolulu is our state's…", "capital", ["volcano", "ocean", "farm"], "State leaders work there.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["islands", "presidents", "flowers"], "The colonies became states.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["On a map, land higher than the land around it, like Diamond Head, is a…", "mountain or crater", ["lake", "beach", "river"], "You climb up to see the view.", true],
  ["\"Mauka\" means toward the…", "mountains", ["ocean", "store", "school"], "Its opposite, makai, means toward the sea.", true],
  ["\"Makai\" means toward the…", "ocean", ["mountains", "sky", "forest"], "Its opposite, mauka, means toward the mountains.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "hi-k-island-home",
    title: "Our Island Home",
    emoji: "🏝️",
    blurb: "Our islands, our flag and the people who help us",
    parentNote: "Hawaiʻi as a state of islands in the Pacific Ocean, what the blue and green on a map or globe show, the words mauka (toward the mountains) and makai (toward the sea), the American flag and a few Hawaiʻi symbols (the nēnē and the yellow hibiscus), and the jobs of people at home, at school and in the community, from teachers and lifeguards to fishers and farmers.",
    standards: ["SS.K.1.7.3; SS.K.3.13.3", "roles and responsibilities at home, at school and in the neighborhood, and physical characteristics on maps and globes"],
    items: ISLAND_HOME,
  }),
];
