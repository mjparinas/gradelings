import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Montana Kindergarten social studies: the goods and products made in Montana and the people who make them
// (SS.E.K.2), and telling goods from services (SS.E.K.1). Prompts stay short for little kids.

const MADE_HERE: Q[] = [
  ["Many Montana farms grow a grain used to make bread. It is…", "wheat", ["rice", "cocoa"], "Fields of it turn gold in summer."],
  ["Ranchers in Montana raise cattle. Cattle give us…", "beef and milk", ["wool and silk", "apples and pears"], "Cows are cattle."],
  ["Sweet red cherries grow in orchards near…", "Flathead Lake", ["the ocean", "a desert"], "The lake keeps the orchards mild."],
  ["Bees on Montana farms make…", "honey", ["bread", "cheese"], "Bees collect nectar from flowers."],
  ["Trees from Montana forests are cut into boards called…", "lumber", ["bricks", "glass"], "Lumber is used to build houses."],
  ["Sheep on Montana ranches grow…", "wool", ["feathers", "scales"], "Wool keeps us warm."],
  ["Who grows the wheat for our bread?", "a farmer", ["a firefighter", "a pilot"], "Farmers plant and harvest crops."],
  ["Who takes care of cattle on a ranch?", "a rancher", ["a dentist", "a baker"], "Ranchers raise animals."],
  ["Who turns wheat flour into bread?", "a baker", ["a rancher", "a vet"], "Bakers bake bread and treats."],
  ["Wild purple berries picked in Montana mountains are…", "huckleberries", ["coconuts", "bananas"], "People make jam and pie with them."],
  ["Sugar beets grown in Montana are made into…", "sugar", ["salt", "milk"], "Beets are roots that hold sugar."],
  ["Peas and lentils grow on many Montana…", "farms", ["oceans", "rooftops"], "Farmers grow lots of foods."],
  ["A thing you can hold and buy, like a hat, is a…", "good", ["service", "song"], "Goods are things."],
  ["A job someone does for you, like a haircut, is a…", "service", ["good", "toy"], "Services are help people give."],
  ["A teacher helping you read is a…", "service", ["good", "plant"], "It is help, not a thing."],
  ["A loaf of bread from the store is a…", "good", ["service", "job"], "You can hold it."],
  ["A vet caring for a sick calf gives a…", "service", ["good", "game"], "A vet helps animals."],
  ["Milk, cheese and butter come from…", "cows", ["fish", "chickens"], "Dairy farms have cows."],
  ["Eggs come from…", "chickens", ["cows", "sheep"], "Hens lay eggs."],
  ["A farmers market sells food that is…", "grown nearby", ["made on the moon", "never sold"], "Local farmers bring their food."],
  ["Potatoes grow…", "under the ground", ["on tall trees", "in the sky"], "We dig them up."],
  ["Trucks and trains carry Montana wheat to…", "other places", ["the sun", "outer space"], "Wheat goes far away to be sold."],
  ["Wood from trees can be made into…", "paper", ["glass", "metal"], "Paper comes from wood.", true],
  ["Which is made from wheat?", "pasta", ["butter", "eggs"], "Pasta is made with flour.", true],
  ["Why do farms need rain or water?", "so crops can grow", ["so cows can fly", "so roads stay dry"], "Plants need water.", true],
  ["A mail carrier bringing letters gives a…", "service", ["good", "toy"], "Bringing mail is a job.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "mt-k-made-in-montana",
    title: "Made in Montana",
    emoji: "🌾",
    blurb: "Wheat, cattle, cherries and the people who grow them",
    parentNote:
      "The goods grown and made in Montana (wheat, beef, cherries, honey, lumber and wool), the people who make them, and telling goods (things) from services (help people give).",
    standards: ["SS.E.K.2; SS.E.K.1", "goods and products made in Montana, and telling goods from services"],
    items: MADE_HERE,
  }),
];
