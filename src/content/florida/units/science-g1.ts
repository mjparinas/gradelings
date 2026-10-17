import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 1 science units (`fl-` ids), for the benchmarks no shared unit practises: stars, gravity,
// magnifiers and the Sun's good and harmful properties (SC.1.E.5.1 to 5.4), and Earth's surface, water safety and fast
// and slow changes (SC.1.E.6.1 to 6.3), with Florida's beaches, storms and sunshine as the examples.

const SKY_AND_SUN: Q[] = [
  ["On a clear night, can you count every star?", "No, there are too many", ["Yes, there are only five", "Yes, easily", "There are none"], "There are more stars than anyone can easily count."],
  ["Are the stars spread out evenly in the sky?", "No, they are not", ["Yes, perfectly even", "They make a square", "They make a circle"], "Some parts of the sky have more stars."],
  ["Why can't people count all the stars?", "There are so many", ["They are too close", "They are too loud", "They are all the same"], "More stars than anyone can count."],
  ["What pulls a dropped ball down, without touching it?", "gravity", ["wind", "the Moon", "a shadow"], "Earth's gravity pulls things down."],
  ["Earth's gravity pulls things…", "toward Earth", ["away from Earth", "up to the sky", "only sideways"], "Gravity pulls toward the ground."],
  ["You drop a pencil. Nothing touches it. What happens?", "gravity pulls it down", ["it floats up", "it flies sideways", "it stays in the air"], "Gravity works without touching."],
  ["A magnifier makes small things look…", "bigger", ["smaller", "farther away", "darker"], "A magnifier helps you see more."],
  ["What helps you see an ant's tiny legs?", "a magnifying glass", ["a ruler", "a clock", "a scale"], "A magnifier shows small things bigger."],
  ["What can a magnifier help you do?", "see small things", ["hear far sounds", "smell flowers", "feel the wind"], "It helps your eyes."],
  ["The Sun gives us…", "light and warmth", ["only cold", "only sound", "rain"], "The Sun warms Earth and gives light."],
  ["How does the Sun help plants?", "it helps them grow", ["it freezes them", "it makes them walk", "it does nothing"], "Plants need sunlight."],
  ["Too much Sun can give you a…", "sunburn", ["haircut", "cold", "toothache"], "Sun can hurt your skin."],
  ["What helps protect your skin from the Sun?", "sunscreen and a hat", ["a snowball", "a boat", "a bicycle"], "Cover your skin."],
  ["You play outside on a sunny Florida day. What helps?", "a hat and water", ["a heavy coat", "a blanket", "snow boots"], "Stay cool and covered."],
  ["Never look straight at the Sun. It can hurt your…", "eyes", ["toes", "hair", "elbows"], "The Sun is very bright."],
  ["Which is a good way to stay safe in the Sun?", "rest in the shade and drink water", ["play all day with no water", "look right at the Sun", "never wear a hat"], "Shade and water help."],
  ["Stars look like tiny dots. They are really…", "very big, but far away", ["tiny, and close", "flat like paper", "lights on the roof"], "Stars are far, far away.", true],
  ["In the daytime, we cannot see stars because…", "the Sun is so bright", ["stars go out", "stars are asleep", "clouds eat them"], "Sunlight hides them.", true],
  ["Which tool helps you see the tiny parts of a flower?", "a magnifier", ["a thermometer", "a rain gauge", "a ruler"], "It makes small parts look bigger.", true],
  ["Earth's gravity pulls on a book even though…", "nothing is touching it", ["it is too heavy", "it is wet", "it is closed"], "Gravity pulls without touching.", true],
  ["The Sun is helpful and harmful. Which is a harm?", "it can burn your skin", ["it helps plants grow", "it warms Earth", "it gives light"], "Too much Sun hurts.", true],
  ["Why do people wear sunglasses on bright days?", "to protect their eyes from bright light", ["to hear better", "to smell flowers", "to run faster"], "Bright sunlight can hurt eyes.", true],
  ["With a magnifier, a grain of sand looks…", "bigger, with more to see", ["smaller", "the same", "like a star"], "It shows more detail.", true],
  ["Which of these is a harmful property of the Sun?", "burning your skin", ["warming the air", "helping plants", "making light"], "Too much Sun can burn.", true],
];

const WATER_AND_CHANGES: Q[] = [
  ["Which can you find on Earth's surface?", "water, rocks, soil and living things", ["only water", "only rocks", "none of these"], "Earth's surface has all of them."],
  ["The dirt in a garden is called…", "soil", ["ice", "steam", "metal"], "Plants grow in soil."],
  ["Which is a body of water?", "a lake", ["a rock", "a hill", "a field"], "A lake is water."],
  ["Which of these is a living thing on Earth's surface?", "a tree", ["a rock", "a puddle", "sand"], "Trees are alive."],
  ["Who should watch you when you swim?", "a grown-up", ["no one", "a shell", "a rock"], "Always swim with a grown-up."],
  ["What should you do before you go near water?", "ask a grown-up", ["run in alone", "close your eyes", "jump in fast"], "Ask first."],
  ["Where is the safest place to swim at a beach?", "near a lifeguard", ["far from everyone", "alone at night", "by the rocks"], "A lifeguard can help."],
  ["You hear thunder at the beach. What should you do?", "get out of the water and go inside", ["swim faster", "float on your back", "dive deep"], "Lightning is dangerous near water."],
  ["Alligators live in some Florida ponds. What should you do?", "stay back from the water's edge", ["feed them", "swim with them", "pet them"], "Wild animals are not pets."],
  ["A life jacket helps keep you…", "afloat", ["hungry", "sleepy", "cold"], "It helps you float."],
  ["Which is dangerous?", "swimming alone", ["swimming with a grown-up", "wearing a life jacket", "staying near a lifeguard"], "Never swim alone."],
  ["Why do people need water?", "to drink and stay healthy", ["to make noise", "to build roofs", "to cover the road"], "Bodies need water."],
  ["Which happens fast?", "a flash of lightning", ["a mountain growing", "a rock turning into sand", "a tree growing tall"], "Lightning is over in a blink."],
  ["Which happens slowly?", "a tree growing tall", ["a thunderclap", "a ball bouncing", "a door slamming"], "Trees take years to grow."],
  ["Which changes a beach quickly?", "a big storm", ["a sleeping crab", "a seashell sitting still", "a bird flying by"], "Strong waves and wind move sand fast."],
  ["A sand dune grows bigger over many years. The change is…", "slow", ["fast", "instant", "a flash"], "It takes a long time."],
  ["A puddle dries on a hot Florida day. This takes…", "a few hours", ["a million years", "one second", "never"], "The Sun dries it fast.", true],
  ["Rocks wearing down into sand takes…", "a very long time", ["a minute", "one second", "a blink"], "Rocks change slowly.", true],
  ["A seed grows into a tall palm tree. This change is…", "slow", ["fast", "a flash", "instant"], "It takes years.", true],
  ["Which change is fast?", "an ice pop melting in the Sun", ["a river carving a canyon", "a seashell turning to sand", "a hill getting lower"], "It melts in minutes.", true],
  ["Which change is slow?", "a river carving a valley", ["a balloon popping", "a camera flash", "a clap"], "Rivers wear rock away a little at a time.", true],
  ["On the surface of Earth, oceans, lakes and rivers are all…", "water", ["soil", "rock", "living things"], "They are bodies of water.", true],
  ["Where is it safest to swim?", "in a place with a lifeguard", ["in a dark pond", "in a canal", "where it is deep and alone"], "Swim where a lifeguard watches.", true],
  ["A wave carries sand away from a beach a little at a time. This change is…", "slow", ["a flash", "very fast", "over in a second"], "Beaches change a little at a time.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g1-sky-and-sun",
    title: "Stars, Sun & Magnifiers",
    emoji: "☀️",
    blurb: "Stars, gravity, magnifiers and the Sun's good and harmful sides.",
    parentNote:
      "Practices four Florida Grade 1 Earth and space benchmarks: there are more stars than anyone can count and they are not spread evenly, gravity pulls objects toward Earth without touching them, magnifiers make small things look bigger, and the Sun has helpful and harmful properties.",
    standards: ["SC.1.E.5.1; SC.1.E.5.2; SC.1.E.5.3; SC.1.E.5.4", "stars, gravity, magnifiers, and the beneficial and harmful properties of the Sun"],
    items: SKY_AND_SUN,
  }),
  bankUnit({
    id: "fl-g1-water-and-changes",
    title: "Water, Earth & Changes",
    emoji: "💧",
    blurb: "What is on Earth's surface, water safety, and fast and slow changes.",
    parentNote:
      "Practices water, rocks, soil and living things on Earth's surface, how to be safe around water (swimming with a grown-up, lifeguards, storms, alligators), and telling fast changes from slow ones, with Florida examples.",
    standards: ["SC.1.E.6.1; SC.1.E.6.2; SC.1.E.6.3", "what is found on Earth's surface, water safety, and things that happen fast and slowly"],
    items: WATER_AND_CHANGES,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
