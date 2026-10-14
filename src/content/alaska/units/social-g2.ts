import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Alaska Grade 2 social studies: the meaning of Alaska's state symbols (SS.2.1.9.1) and what makes Alaska different from
// other places (SS.2.1.20.1). Short prompts and three choices, for young readers.

const SYMBOLS: Q[] = [
  ["What is the capital city of Alaska?", "Juneau", ["Anchorage", "Fairbanks"], "Alaska's lawmakers meet in Juneau."],
  ["Which is Alaska's biggest city?", "Anchorage", ["Juneau", "Nome"], "About two in every five Alaskans live in Anchorage."],
  ["Who leads the state of Alaska?", "the Governor", ["the mayor", "the principal"], "Alaskans vote for a Governor."],
  ["Alaska's flag shows the Big Dipper and the…", "North Star", ["sun", "moon"], "The stars are gold on a blue background."],
  ["Who designed Alaska's flag?", "Benny Benson, a 13-year-old student", ["the President", "a famous painter"], "He won a contest in 1927."],
  ["Why is the North Star on Alaska's flag?", "Alaska is the most northern state", ["it is the biggest star", "it shines only in summer"], "Benny Benson said the North Star stands for Alaska's future."],
  ["What is Alaska's state flower?", "the forget-me-not", ["the rose", "the sunflower"], "It is a tiny blue flower."],
  ["What is Alaska's state bird?", "the willow ptarmigan", ["the parrot", "the flamingo"], "Its feathers turn white in winter."],
  ["Why do willow ptarmigan turn white in winter?", "to hide in the snow", ["to stay cool", "to look like clouds"], "White feathers are hard to see on snow."],
  ["What is Alaska's state tree?", "the Sitka spruce", ["the palm tree", "the apple tree"], "It grows tall in Southeast Alaska."],
  ["Which big animal is Alaska's state land mammal?", "the moose", ["the camel", "the lion"], "It has long legs and big antlers."],
  ["Which fish is Alaska's state fish?", "the king salmon", ["the goldfish", "the shark"], "It is also called the chinook salmon."],
  ["Which whale is Alaska's state marine mammal?", "the bowhead whale", ["the orca", "the dolphin"], "It lives in Arctic waters all year."],
  ["What is Alaska's state sport?", "dog mushing", ["surfing", "baseball"], "Teams of dogs pull a sled over the snow."],
  ["Which dog is Alaska's state dog?", "the Alaskan malamute", ["the poodle", "the beagle"], "It is a strong sled dog."],
  ["Which green stone is Alaska's state gem?", "jade", ["ruby", "pearl"], "It is found in northwest Alaska."],
  ["Which shiny metal is Alaska's state mineral?", "gold", ["iron", "tin"], "Gold brought many people to Alaska long ago."],
  ["Alaska's nickname is…", "the Last Frontier", ["the Sunshine State", "the Lone Star State"], "A frontier is a wild place at the edge of what people know."],
  ["Alaska's motto is…", "North to the Future", ["In God We Trust", "Live Free or Die"], "It is about Alaska's bright future."],
  ["What is the name of Alaska's state song?", "Alaska's Flag", ["Yankee Doodle", "Home on the Range"], "It is a song about the flag's stars."],
  ["Alaska became a state in…", "1959", ["1776", "2009"], "Alaska was the 49th state."],
  ["How many states are in the United States?", "50", ["49", "13"], "Alaska was number 49, and Hawaii was number 50."],
  ["What is the tallest mountain in North America?", "Denali", ["Mount Everest", "Pikes Peak"], "Denali is in Alaska."],
  ["Which country is very close to Alaska across the Bering Strait?", "Russia", ["Mexico", "Brazil"], "On a clear day you can see from one to the other."],
  ["Which country shares a long land border with Alaska?", "Canada", ["Mexico", "Russia"], "You can drive from Alaska into Canada."],
  ["Alaska is the… state in size.", "biggest", ["smallest", "middle-sized"], "It is more than twice as big as Texas."],
  ["What makes summer days in northern Alaska special?", "the sun stays up almost all night", ["it snows every day", "the sun never comes up"], "Some people call it the midnight sun."],
  ["What colorful lights can people see in Alaska's winter sky?", "the northern lights", ["fireworks", "rainbows"], "They are also called the aurora borealis."],
  ["Which famous sled dog race goes from Anchorage to Nome?", "the Iditarod", ["the Kentucky Derby", "the Tour de France"], "It is more than 900 miles long.", true],
  ["A symbol is…", "a picture or object that stands for something", ["a kind of food", "a song you sing"], "The flag is a symbol of Alaska.", true],
  ["Why do states choose symbols like a flower and a bird?", "to show what is special about the state", ["to make new laws", "to count people"], "Symbols help people feel proud of where they live.", true],
  ["How many Alaska Native languages are official languages of Alaska, along with English?", "20", ["2", "200"], "Alaska made them official languages in 2014.", true],
];

export const SOCIAL_2: Unit[] = [
  bankUnit({
    id: "ak-g2-alaska-symbols",
    title: "Alaska's Symbols",
    emoji: "⭐",
    blurb: "The flag, the capital and what makes Alaska special",
    parentNote: "Alaska's state symbols and what they stand for: the flag Benny Benson designed, the capital and the Governor, the forget-me-not, willow ptarmigan, Sitka spruce, moose and king salmon, plus Denali, the midnight sun and Alaska's neighbors.",
    standards: ["SS.2.1.9.1; SS.2.1.20.1", "the meaning of Alaska's state symbols, and the geographical and cultural features that make Alaska distinct"],
    items: SYMBOLS,
  }),
];
