import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Vermont Grade 1 social studies, "People, Places and the Environment" (the Agency of Education's K-8 framework, theme
// Past and Present): comparing life in the past to life today (D2.His.2.K-2) and how the environment shapes the way
// people live and work (D2.Geo.4.K-2), with Vermont's farms, villages and traditions long ago and today.

const THEN_NOW: Q[] = [
  ["Long ago, many families here built their houses from…", "wood", ["glass", "plastic", "ice"], "Vermont had lots of trees."],
  ["Long ago, people in Vermont traveled by horse, wagon or…", "on foot", ["airplane", "rocket", "subway"], "Cars hadn't been invented yet."],
  ["Today, most people in Vermont travel by…", "car or bus", ["covered wagon", "camel", "canoe only"], "Roads connect our towns."],
  ["Long ago, families got their water from a…", "well or a spring", ["faucet", "water bottle", "vending machine"], "They carried water in buckets."],
  ["Long ago, children often learned in a small…", "one-room schoolhouse", ["online class", "stadium", "airport"], "One teacher taught every grade."],
  ["Long ago, families heated their homes and cooked with…", "wood fires", ["microwaves", "air fryers", "electric heaters"], "Someone had to chop and carry the wood."],
  ["Long ago, people sent news far away by…", "letters", ["text messages", "video calls", "email"], "A letter could take weeks."],
  ["Something that is the same in the past and today is that families…", "share meals together", ["use smartphones", "watch TV", "drive cars"], "Some things don't change."],
  ["The past is…", "what already happened", ["what is happening now", "what will happen", "a kind of food"], "Yesterday is in the past."],
  ["The future is…", "what will happen later", ["what happened long ago", "what happened yesterday", "a kind of map"], "Tomorrow is in the future."],
  ["Long ago, many kids worked on the farm. Today, most kids spend their days…", "at school", ["in a factory", "at sea", "in a mine"], "Laws say children go to school."],
  ["Long ago, some kids worked in mills and quarries. Today, laws…", "protect children from that kind of work", ["make every child work", "close all schools", "ban playgrounds"], "Children's lives changed over time."],
  ["In late winter, many Vermont families collect maple sap to make…", "maple syrup", ["apple juice", "milk", "honey"], "Sugaring is an old Vermont tradition."],
  ["The capital city of Vermont is…", "Montpelier", ["Burlington", "Rutland", "Bennington"], "State leaders meet there."],
  ["The biggest city in Vermont is…", "Burlington", ["Montpelier", "Barre", "St. Albans"], "It sits on the shore of Lake Champlain."],
  ["Covered bridges, built long ago, let horses and wagons cross…", "rivers", ["mountains", "clouds", "oceans"], "The roof kept snow and rain off the wooden bridge."],
  ["A photo of your town from long ago helps you compare…", "the past and today", ["two planets", "two oceans", "two animals"], "Look for what changed."],
  ["Long ago, people kept food cold with blocks of ice cut from…", "frozen lakes and ponds", ["the freezer", "the store", "the sky"], "Ice was stored in sawdust to last into summer."],
  ["How is a town today different from long ago?", "it has paved roads and electric lights", ["it has no houses", "it has no people", "it has no sun"], "Inventions changed how we live."],
  ["Vermont dairy cows eat hill grass. Their milk is made into…", "cheese and butter", ["paper", "bricks", "glass"], "The land helps decide what farmers do."],
  ["Long ago, villages had a general store where families could buy…", "flour, tools and cloth in one place", ["video games", "cell phones", "airplane tickets"], "One store sold a little of everything."],
  ["Before trains, goods went between towns by…", "wagon or boat", ["truck", "airplane", "drone"], "Rivers and roads were the highways.", true],
  ["Why do some families keep old photos and stories?", "to remember their history", ["to throw them away", "to sell them", "to forget"], "Family stories teach us about the past.", true],
  ["Long ago, kids learned letters from a paddle with a page called a…", "hornbook", ["tablet computer", "comic book", "map"], "Paper was precious, so one page was shared.", true],
  ["A child's chores on a Vermont farm long ago might be…", "feeding the chickens and carrying wood", ["charging a phone", "riding the school bus", "ordering food online"], "Everyone helped on the farm.", true],
  ["Why did many families long ago move from farms to mill and quarry towns?", "to find jobs", ["to see the ocean", "to go to the moon", "to live in caves"], "Mills and quarries needed many workers.", true],
  ["Learning about how children lived long ago helps us…", "see how life has changed", ["forget the past", "stay the same", "stop learning"], "History is about people like us.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "vt-g1-then-and-now",
    title: "Vermont Then & Now",
    emoji: "🏘️",
    blurb: "Life in Vermont long ago and today",
    parentNote: "Comparing life in Vermont long ago and today (farms, wood stoves, wells, one-room schoolhouses, covered bridges and general stores), past, present and future, how children's lives have changed, and how the land shapes Vermont's work and traditions, such as dairy farming and maple sugaring.",
    standards: ["D2.His.2.K-2; D2.Geo.4.K-2", "comparing life in the past to life today, and how the environment affects people's lives in a place"],
    items: THEN_NOW,
  }),
];
