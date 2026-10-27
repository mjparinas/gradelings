import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Hawaiʻi Grade 1 social studies: the cultural and environmental characteristics of the child's community (beaches,
// forests, reefs, landmarks and plants; SS.1.2.14.3), how climate, weather and natural disasters such as storms,
// tsunamis and volcanic eruptions affect it (SS.1.2.14.4), and how people improve their community and environment (beach
// clean-ups, buying local, reducing, reusing and recycling; SS.1.2.8.5).

const COMMUNITY: Q[] = [
  ["A community is a place where people…", "live, work and play together", ["sleep only", "never meet", "only go to school"], "Your town is a community."],
  ["A coral reef is home to many…", "fish and sea animals", ["cows", "polar bears", "camels"], "Reefs are in warm ocean water."],
  ["Green sea turtles are often seen resting on Hawaiʻi's…", "beaches", ["rooftops", "highways", "mountaintops"], "Give them lots of space."],
  ["Most of the year in Hawaiʻi, the weather is…", "warm", ["snowy", "freezing", "icy"], "Hawaiʻi is in the tropics."],
  ["Steady winds that blow over Hawaiʻi from the northeast are called… winds.", "trade", ["snow", "desert", "polar"], "Sailors used them long ago."],
  ["The side of an island the wind blows onto gets more…", "rain", ["snow", "sand", "ice"], "It is green and wet."],
  ["A tsunami is a set of giant…", "ocean waves", ["snowflakes", "sand dunes", "clouds"], "They can come after an earthquake."],
  ["If tsunami sirens sound, people near the shore should…", "move to high ground", ["go swimming", "build a sandcastle", "stay on the beach"], "Go up and away from the water."],
  ["A hurricane brings strong wind and heavy…", "rain", ["snow", "sunshine", "dust"], "Stay inside when one comes."],
  ["Hot melted rock that flows from a volcano is called…", "lava", ["ice", "sand", "mud"], "Lava cools into black rock."],
  ["Some of Hawaiʻi's volcanoes still…", "erupt today", ["make snow", "talk", "move like cars"], "Kīlauea on Hawaiʻi Island erupts often."],
  ["Before a big storm, a family can get ready by…", "packing water, food and a flashlight", ["going to the beach", "opening every window", "turning off the radio"], "An emergency kit helps."],
  ["A beach clean-up helps the…", "ocean and its animals", ["shopping mall", "highway", "airport only"], "Trash can hurt turtles and birds."],
  ["Buying food grown on our island helps…", "local farmers", ["no one", "far-away stores only", "the moon"], "Local means close to home."],
  ["Using a cloth bag again and again is a way to…", "reuse", ["waste", "litter", "break"], "Reuse means use again."],
  ["Putting cans and bottles in the right bin is a way to…", "recycle", ["litter", "waste", "hide"], "They can be made into new things."],
  ["Turning off the water while you brush your teeth helps to…", "save water", ["waste water", "make rain", "fill the ocean"], "Fresh water is precious on an island."],
  ["Planting a native tree helps the…", "environment", ["traffic", "television", "parking lot"], "Trees give shade and homes for birds."],
  ["A landmark is a place that is…", "easy to know and remember", ["always a store", "under the sea", "hidden"], "Diamond Head is a famous landmark."],
  ["Where can you find a lot of kalo, or taro, growing?", "in wet fields called loʻi", ["in the snow", "on the beach", "in the ocean"], "Kalo likes lots of water."],
  ["Hawaiʻi is home to people from many…", "cultures", ["planets", "oceans", "zoos"], "Families share different foods and traditions."],
  ["A lei is a… people give to show aloha.", "garland of flowers or leaves", ["kind of fish", "kind of car", "loud song"], "It is worn around the neck."],
  ["People in Hawaiʻi often say \"aloha\" to mean hello, goodbye and…", "love", ["hurry", "be quiet", "stop"], "Aloha is a big word with many meanings.", true],
  ["Rain forests on Hawaiʻi's mountains matter because they…", "collect fresh water for the islands", ["make snow", "make sand", "keep the ocean warm"], "The water flows down to streams.", true],
  ["When lava flows into the ocean and cools, it can make…", "new land", ["new ice", "new clouds", "new fish"], "The islands are still growing.", true],
  ["A flash flood happens when heavy rain makes streams…", "rise very fast", ["dry up", "freeze", "turn to sand"], "Stay away from streams in heavy rain.", true],
  ["An island can't easily get things from far away, so people work hard to…", "grow food and save water", ["waste food", "use more plastic", "throw things away"], "Taking care of what we have matters.", true],
  ["Many neighbors working together to fix a park is an example of…", "people improving their community", ["a storm", "a tsunami", "a holiday sale"], "Many hands make work light.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "hi-g1-island-community",
    title: "My Island Community",
    emoji: "🌺",
    blurb: "Reefs, rain, volcanoes and taking care of home",
    parentNote: "What makes a Hawaiʻi community special (reefs, beaches, rain forests, loʻi kalo, landmarks such as Diamond Head, and its many cultures), how trade winds, rain, hurricanes, tsunamis and volcanoes affect it and how families get ready, and how people make their community better: beach clean-ups, buying local, saving water, and reducing, reusing and recycling.",
    standards: ["SS.1.2.14.3; SS.1.2.14.4; SS.1.2.8.5", "the cultural and environmental characteristics of the community, how weather and natural disasters affect it, and how people improve their community and environment"],
    items: COMMUNITY,
  }),
];
