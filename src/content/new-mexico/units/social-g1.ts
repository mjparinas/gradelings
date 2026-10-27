import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Mexico Grade 1 social studies: comparing life in New Mexico in the past with life today (1.9), and the different
// cultures and ways of life within New Mexico's communities (1.12), with its towns, foods, homes and traditions.

const THEN_NOW: Q[] = [
  ["Long ago, many New Mexico homes were built of mud and straw bricks called…", "adobe", ["glass", "plastic", "ice"], "Adobe keeps homes cool in summer."],
  ["Long ago, people in New Mexico traveled by horse, wagon or…", "on foot", ["airplane", "rocket", "subway"], "Cars hadn't been invented yet."],
  ["Today, most people in New Mexico travel by…", "car or bus", ["covered wagon", "camel", "canoe"], "Roads connect our towns."],
  ["Long ago, families got water from a river, a well or a…", "ditch called an acequia", ["faucet", "water bottle", "vending machine"], "Acequias carry river water to fields."],
  ["Long ago, children often learned at home or in a small…", "one-room school", ["online class", "stadium", "airport"], "One teacher taught every grade."],
  ["Long ago, many families baked bread in an outdoor oven called a…", "horno", ["microwave", "air fryer", "toaster"], "Hornos are shaped like beehives."],
  ["Long ago, people sent news far away by…", "letters", ["text messages", "video calls", "email"], "A letter could take weeks."],
  ["Something that is the same in the past and today is that families…", "share meals together", ["use smartphones", "watch TV", "drive cars"], "Some things don't change."],
  ["The past is…", "what already happened", ["what is happening now", "what will happen", "a kind of food"], "Yesterday is in the past."],
  ["The future is…", "what will happen later", ["what happened long ago", "what happened yesterday", "a kind of map"], "Tomorrow is in the future."],
  ["People in New Mexico speak many languages, such as English, Spanish and…", "Diné (Navajo)", ["French only", "Latin only", "no other languages"], "Many families speak more than one language."],
  ["Different groups of people have their own…", "foods, music and traditions", ["same favorite color", "same birthday", "same name"], "Cultures are ways of living."],
  ["Many New Mexico families make tamales or biscochitos for…", "celebrations", ["school buses", "car washes", "fire drills"], "Special foods go with special days."],
  ["The capital city of New Mexico is…", "Santa Fe", ["Albuquerque", "Las Cruces", "Roswell"], "State leaders meet there."],
  ["The biggest city in New Mexico is…", "Albuquerque", ["Santa Fe", "Taos", "Gallup"], "It is on the Rio Grande."],
  ["Some Pueblo communities in New Mexico have lived in the same place for…", "hundreds of years", ["one week", "two days", "one month"], "Taos Pueblo is very old and people still live there."],
  ["A culture is a group's…", "way of life", ["favorite toy", "bus route", "telephone"], "It includes food, language and celebrations."],
  ["When classmates celebrate different holidays, we should…", "be curious and respectful", ["laugh at them", "ignore them", "tell them to stop"], "Learning about others is fun."],
  ["A photo of your town from long ago helps you compare…", "the past and today", ["two planets", "two oceans", "two animals"], "Look for what changed."],
  ["Long ago, the first trains came to New Mexico. Before that, goods came by…", "wagon", ["truck", "airplane", "drone"], "Wagon trains crossed long trails.", true],
  ["El Camino Real was a long road that people used long ago to…", "travel and trade", ["swim", "play baseball", "watch movies"], "It means the royal road.", true],
  ["Why do some families keep old photos and stories?", "to remember their history", ["to throw them away", "to sell them", "to forget"], "Family stories teach us about the past.", true],
  ["A strand of dried red chiles hanging by a door is called a…", "ristra", ["kite", "rope swing", "banner"], "Ristras are a New Mexico tradition.", true],
  ["How is a town today different from long ago?", "it has paved roads and electric lights", ["it has no houses", "it has no people", "it has no sun"], "Inventions changed how we live.", true],
  ["Learning another family's traditions helps us…", "understand each other", ["argue more", "stay apart", "forget our own"], "Different is interesting.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "nm-g1-then-and-now",
    title: "New Mexico Then & Now",
    emoji: "🏘️",
    blurb: "Life in New Mexico long ago and today",
    parentNote: "Comparing life in New Mexico long ago and today (adobe homes, hornos, acequias, wagons and one-room schools), past, present and future, and the many cultures, languages, foods and traditions of New Mexico's communities, including Santa Fe, Albuquerque and the Pueblos.",
    standards: ["1.9; 1.12", "comparing life in New Mexico in the past with life today, and cultural differences within the community"],
    items: THEN_NOW,
  }),
];
