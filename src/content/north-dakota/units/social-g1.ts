import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// North Dakota Grade 1 social studies, my school: comparing people in the past with people today (H.K_2.1) and changes
// over time (H.K_2.4), comparing school and family life in North Dakota long ago with life today: one-room schools,
// sod houses, horses and trains, and farm work.

const THEN_NOW: Q[] = [
  ["Long ago, many North Dakota children went to a school with just…", "one room", ["ten floors", "a swimming pool", "an elevator"], "One teacher taught every grade."],
  ["In a one-room school, children of all ages…", "learned together", ["never met", "stayed home", "drove buses"], "Big kids helped little kids."],
  ["Long ago, many children walked to school or rode a…", "horse", ["jet", "subway", "scooter"], "There were few cars."],
  ["Today, many North Dakota children ride to school on a…", "school bus", ["horse", "sled dog team", "raft"], "Buses carry kids from farms and towns."],
  ["Long ago, a school was often warmed by a…", "wood or coal stove", ["heat pump", "space heater", "solar panel"], "Children helped carry fuel."],
  ["Long ago, children wrote on small boards called…", "slates", ["tablets", "laptops", "phones"], "They wrote with chalk."],
  ["Today, many children learn with books and…", "computers", ["slates only", "quills", "stone tablets"], "Technology has changed school."],
  ["Some early families on the prairie built houses from blocks of…", "sod", ["glass", "ice", "plastic"], "Sod is grass with its roots and dirt."],
  ["Why did early families on the prairie use sod for houses?", "there were few trees", ["sod was shiny", "it was easy to buy", "it floated"], "The prairie had lots of grass."],
  ["Long ago, families got water from a…", "well or pump", ["faucet", "water bottle", "vending machine"], "People pumped water by hand."],
  ["Long ago, farm families plowed fields with…", "horses or oxen", ["robots", "drones", "trucks"], "Animals pulled the plow."],
  ["Today, most farmers plow and plant with…", "tractors", ["oxen", "shovels only", "spoons"], "Machines do big jobs fast."],
  ["Long ago, families kept food cold with…", "ice from a lake", ["a freezer", "a fan", "a phone"], "Ice was cut in winter."],
  ["Long ago, trains brought people and mail to North Dakota towns.", "true", ["false"], "Towns grew up along the railroad."],
  ["Long ago, families sent news far away by…", "writing letters", ["sending texts", "video calls", "email"], "Letters came by train."],
  ["Something that happened long ago is in the…", "past", ["future", "present"], "Past means before now."],
  ["What is happening right now is the…", "present", ["past", "future"], "Present means now."],
  ["What will happen tomorrow is in the…", "future", ["past", "present"], "Future means later."],
  ["Long ago, many children helped on the farm by…", "feeding the chickens", ["fixing computers", "flying planes", "driving trucks"], "Everyone had chores."],
  ["A photo of your town from long ago can show…", "how it has changed", ["what you ate today", "tomorrow's weather", "your birthday"], "Compare old and new photos."],
  ["An older person who tells you about school long ago is sharing a…", "memory of the past", ["weather report", "math problem", "recipe for soup"], "People's stories teach history.", true],
  ["How is your school the same as a school long ago?", "children still learn to read", ["it has no teacher", "it has no children", "nobody reads"], "Some things stay the same.", true],
  ["Why do fewer people live on farms today than long ago?", "machines let one family farm much more land", ["farms disappeared", "nobody eats food", "it never rains"], "One tractor does the work of many horses.", true],
  ["An old school bell rang to tell children…", "school was starting", ["it was bedtime", "a train was coming", "it was snowing"], "It called children in from play.", true],
  ["Long ago, many families made their own clothes and…", "grew their own food", ["built computers", "made cars", "flew to stores"], "Stores were far away.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "nd-g1-then-and-now",
    title: "Then & Now in North Dakota",
    emoji: "🕰️",
    blurb: "How school and family life have changed",
    parentNote: "Comparing school and family life in North Dakota long ago with today: one-room schools and slates, sod houses on the prairie, horses, trains and letters, farm chores and tractors, and the words past, present and future.",
    standards: ["H.K_2.1; H.K_2.4", "comparing people in the past with people today, and changes over time"],
    items: THEN_NOW,
  }),
];
