import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Delaware Grade 1 social studies: how families and daily life now compare with the past (H.4.K-3.a), and how people
// have used resources to meet their wants over time (E.3.K-3.a), with Delaware's farms, mills, towns and traditions
// long ago and today.

const THEN_NOW: Q[] = [
  ["Long ago, many families here built their houses from…", "wood", ["glass", "plastic", "ice"], "Delaware had lots of trees."],
  ["Long ago, people in Delaware traveled by horse, wagon or…", "on foot", ["airplane", "rocket", "subway"], "Cars hadn't been invented yet."],
  ["Today, most people in Delaware travel by…", "car or bus", ["covered wagon", "camel", "canoe only"], "Roads connect our towns."],
  ["Long ago, families got their water from a…", "well or a spring", ["faucet", "water bottle", "vending machine"], "They carried water in buckets."],
  ["Long ago, children often learned in a small…", "one-room schoolhouse", ["online class", "stadium", "airport"], "One teacher taught every grade."],
  ["Long ago, families heated their homes and cooked with…", "wood fires", ["microwaves", "air fryers", "electric heaters"], "Someone had to chop and carry the wood."],
  ["Long ago, people sent news far away by…", "letters", ["text messages", "video calls", "email"], "A letter could take weeks."],
  ["Something that is the same in the past and today is that families…", "share meals together", ["use smartphones", "watch TV", "drive cars"], "Some things don't change."],
  ["The past is…", "what already happened", ["what is happening now", "what will happen", "a kind of food"], "Yesterday is in the past."],
  ["The future is…", "what will happen later", ["what happened long ago", "what happened yesterday", "a kind of map"], "Tomorrow is in the future."],
  ["Long ago, many kids worked on the farm. Today, most kids spend their days…", "at school", ["in a factory", "at sea", "in a mine"], "Laws say children go to school."],
  ["Long ago, some kids worked in mills. Today, laws…", "protect children from that kind of work", ["make every child work", "close all schools", "ban playgrounds"], "Children's lives changed over time."],
  ["In summer, Delaware families have long picked ripe…", "peaches", ["coconuts", "bananas", "pineapples"], "Delaware once had huge peach orchards."],
  ["The capital city of Delaware is…", "Dover", ["Wilmington", "Newark", "Lewes"], "State leaders meet there."],
  ["The biggest city in Delaware is…", "Wilmington", ["Dover", "Lewes", "Milford"], "It grew up beside the Christina River."],
  ["Covered bridges, built long ago, let horses and wagons cross…", "creeks and rivers", ["mountains", "clouds", "oceans"], "The roof kept snow and rain off the wooden bridge."],
  ["A photo of your town from long ago helps you compare…", "the past and today", ["two planets", "two oceans", "two animals"], "Look for what changed."],
  ["Long ago, people kept food cold with blocks of ice cut from…", "frozen ponds", ["the freezer", "the store", "the sky"], "Ice was stored in sawdust to last into summer."],
  ["How is a town today different from long ago?", "it has paved roads and electric lights", ["it has no houses", "it has no people", "it has no sun"], "Inventions changed how we live."],
  ["Before trains, goods went between towns by…", "wagon or boat", ["truck", "airplane", "drone"], "Rivers and roads were the highways.", true],
  ["Why do some families keep old photos and stories?", "to remember their history", ["to throw them away", "to sell them", "to forget"], "Family stories teach us about the past.", true],
  ["Long ago, kids learned letters from a paddle with a page called a…", "hornbook", ["tablet computer", "comic book", "map"], "Paper was precious, so one page was shared.", true],
  ["A child's chores on a Delaware farm long ago might be…", "feeding the chickens and carrying wood", ["charging a phone", "riding the school bus", "ordering food online"], "Everyone helped on the farm.", true],
  ["Why did many families move from farms to mill towns long ago?", "to find jobs in the mills", ["to see the ocean", "to go to the moon", "to live in caves"], "The mills needed many workers.", true],
  ["Learning about how children lived long ago helps us…", "see how life has changed", ["forget the past", "stay the same", "stop learning"], "History is about people like us.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "de-g1-then-and-now",
    title: "Delaware Then & Now",
    emoji: "🏘️",
    blurb: "Life in Delaware long ago and today",
    parentNote: "Comparing life in Delaware long ago and today (farms, wood stoves, wells, one-room schoolhouses, covered bridges and mill towns), past, present and future, how children's lives have changed, and traditions such as picking peaches in summer.",
    standards: ["H.4.K-3.a; E.3.K-3.a", "how families and daily life today compare with the past, and the resources people have used to meet their wants over time"],
    items: THEN_NOW,
  }),
];
