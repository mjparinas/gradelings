import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wyoming Grade 1 social studies: how families, including the Indigenous Tribes of Wyoming, meet their needs and how
// daily life compares with the past (SS2.2.1), and the tools and technologies that made or make life easier
// (SS2.4.2), with Wyoming's ranches, trails, towns and homes long ago and today.

const THEN_NOW: Q[] = [
  ["Long ago, many families here traveled by horse, wagon or…", "on foot", ["airplane", "rocket", "subway"], "Cars hadn't been invented yet."],
  ["Today, most people in Wyoming travel by…", "car or truck", ["covered wagon", "camel", "canoe only"], "Roads connect our towns."],
  ["Long ago, families got their water from a…", "well, spring or creek", ["faucet", "water bottle", "vending machine"], "They carried water in buckets."],
  ["Long ago, children often learned in a small…", "one-room schoolhouse", ["online class", "stadium", "airport"], "One teacher taught every grade."],
  ["Long ago, families heated their homes and cooked with…", "wood or coal stoves", ["microwaves", "air fryers", "electric heaters"], "Someone had to carry the fuel."],
  ["Long ago, people sent news far away by…", "letters", ["text messages", "video calls", "email"], "A letter could take weeks."],
  ["Some early Wyoming settlers built houses from blocks of grassy dirt called…", "sod", ["glass", "plastic", "ice"], "Trees were hard to find on the plains."],
  ["Many homesteaders in the mountains built houses from…", "logs", ["bricks of gold", "paper", "snow"], "Pine trees grow in the mountains."],
  ["Plains peoples moved things on a frame a dog or horse pulled, called a…", "travois", ["truck", "train", "sled with motors"], "Two poles dragged on the ground."],
  ["Long ago, many Shoshone and Arapaho families lived in homes they could move:", "tipis", ["skyscrapers", "castles", "trailers"], "Tipis could be packed up and moved."],
  ["Today, Shoshone and Arapaho families on the Wind River Reservation live in…", "houses, like other families", ["caves only", "castles", "tents only"], "Families live in many kinds of homes today."],
  ["Long ago, the bison gave many Plains families food, clothing and…", "tools", ["cars", "phones", "plastic"], "People used every part they could."],
  ["Something that is the same in the past and today is that families…", "share meals together", ["use smartphones", "watch TV", "drive cars"], "Some things don't change."],
  ["The past is…", "what already happened", ["what is happening now", "what will happen", "a kind of food"], "Yesterday is in the past."],
  ["The future is…", "what will happen later", ["what happened long ago", "what happened yesterday", "a kind of map"], "Tomorrow is in the future."],
  ["A tool that helps us see in the dark is a…", "flashlight", ["spoon", "pillow", "sock"], "Tools make life easier."],
  ["A washing machine is a tool that makes it easier to…", "wash clothes", ["cook soup", "plant seeds", "ride a horse"], "Long ago, people washed clothes by hand."],
  ["On a ranch long ago, cowboys moved cattle on…", "horseback", ["airplanes", "skateboards", "trains only"], "Many ranchers still ride horses."],
  ["Today, some ranchers check on their cattle with a…", "pickup truck or four-wheeler", ["covered wagon", "canoe", "hot air balloon"], "New tools help with old jobs."],
  ["A photo of your town from long ago helps you compare…", "the past and today", ["two planets", "two oceans", "two animals"], "Look for what changed."],
  ["How is a town today different from long ago?", "it has paved roads and electric lights", ["it has no houses", "it has no people", "it has no sun"], "Inventions changed how we live."],
  ["Before trains, goods came to Wyoming by…", "wagon", ["truck", "airplane", "drone"], "Wagon trails crossed the land.", true],
  ["When the railroad came to Wyoming, travel became…", "much faster", ["much slower", "impossible", "only by boat"], "Trains could cross the state in a day.", true],
  ["Why do some families keep old photos and stories?", "to remember their history", ["to throw them away", "to sell them", "to forget"], "Family stories teach us about the past.", true],
  ["A child's chores on a Wyoming ranch long ago might be…", "feeding the chickens and carrying water", ["charging a phone", "riding the school bus", "ordering food online"], "Everyone helped on the ranch.", true],
  ["A family, a school and a Tribe can all give people a sense of…", "belonging", ["hunger", "danger", "sleepiness"], "Groups help meet our needs.", true],
  ["Learning about how children lived long ago helps us…", "see how life has changed", ["forget the past", "stay the same", "stop learning"], "History is about people like us.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "wy-g1-then-and-now",
    title: "Wyoming Then & Now",
    emoji: "🏘️",
    blurb: "Life in Wyoming long ago and today",
    parentNote: "Comparing life in Wyoming long ago and today: sod houses and log cabins, tipis and the travois, wells and wood stoves, one-room schoolhouses, wagons, horses and the railroad, the tools that make life easier, past, present and future, and how families, schools and Tribes meet people's needs. Indigenous content is about living peoples and kept light.",
    standards: ["SS2.2.1; SS2.4.2", "how groups, including the Indigenous Tribes of Wyoming, meet people's needs and how daily life compares with the past, and tools and technologies that made or make life easier"],
    items: THEN_NOW,
  }),
];
