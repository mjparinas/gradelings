import type { Unit } from "../../types";
import { SOCIAL_K as CALIFORNIA_K } from "../../california/units/social-k";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of other states' Kindergarten social studies units: the questions that name another state are left
// out, and Arizona items fill in. American symbols and stories (K.H4.1, K.H4.2).

const SYMBOLS_EXTRA: Q[] = [
  ["Arizona's flag has a big copper star. What color is the star?", "copper", ["green", "purple"], "Arizona mines lots of copper."],
  ["Which giant cactus blossom is Arizona's state flower?", "the saguaro blossom", ["the rose", "the tulip"], "The saguaro grows in the Sonoran Desert."],
  ["Arizona's state bird is the…", "cactus wren", ["bald eagle", "penguin"], "It builds nests in cactus."],
  ["Arizona's state tree has a green trunk. It is the…", "palo verde", ["maple", "palm"], "Palo verde means green stick."],
  ["Arizona's nickname is the…", "Grand Canyon State", ["Sunshine State", "Snow State"], "The canyon is very big and deep."],
  ["Arizona's state gemstone is blue-green. It is…", "turquoise", ["a diamond", "a ruby"], "Turquoise is found in Arizona."],
  ["Arizona's state mammal has a long striped tail. It is the…", "ringtail", ["polar bear", "kangaroo"], "Ringtails come out at night."],
  ["Arizona's state motto is Ditat Deus. It means…", "God enriches", ["land of snow", "big river"], "The motto is in Latin.", true],
  ["Arizona's flag has red and yellow rays. They stand for…", "a sunset", ["a rainbow", "a fire truck"], "Arizona has bright desert sunsets."],
  ["Arizona became a state on February 14. That is also…", "Valentine's Day", ["New Year's Day", "Halloween"], "People call Arizona the Valentine State."],
  ["Arizona's state reptile is the…", "ridge-nosed rattlesnake", ["sea turtle", "crocodile"], "It lives in the mountains of southern Arizona.", true],
];

const STORIES_EXTRA: Q[] = [
  ["Sandra Day O'Connor, from Arizona, was the first woman to…", "serve on the US Supreme Court", ["walk on the moon", "be president"], "She was a judge."],
  ["César Chávez was born near Yuma, Arizona. He worked to help…", "farm workers", ["astronauts", "kings"], "He wanted fair pay for workers."],
];

export const COPIES_K: Unit[] = [
  copyOf(
    from(CALIFORNIA_K, "ca-k-symbols"),
    {
      id: "az-k-symbols",
      title: "Flags & Symbols",
      emoji: "🇺🇸",
      blurb: "The flag, the bald eagle and Arizona's copper star",
      parentNote: "American symbols, traditions and holidays (the flag, the bald eagle, the Statue of Liberty and the Liberty Bell) and Arizona's own symbols: the copper star on the state flag, the saguaro blossom, the cactus wren and the palo verde.",
      standards: ["K.H4.1", "key American symbols, traditions and holidays, and Arizona's state symbols"],
    },
    SYMBOLS_EXTRA,
  ),
  copyOf(
    from(CALIFORNIA_K, "ca-k-american-stories"),
    {
      id: "az-k-american-stories",
      title: "American Stories",
      emoji: "📚",
      blurb: "Stories of people from America's past",
      parentNote: "Stories of key people from American history, told simply through biographies and informational text, including people from Arizona such as Sandra Day O'Connor and César Chávez.",
      standards: ["K.H4.2", "the stories of key historical figures through informational text and biographies"],
    },
    STORIES_EXTRA,
  ),
];
