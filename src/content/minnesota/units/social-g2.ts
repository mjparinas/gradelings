import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Minnesota's own Grade 2 social studies unit (`mn-` id): daily life for Dakota and Anishinaabe people through the
// seasons, long ago and today. Present tense for living nations, "many" and "some" rather than "all", and nothing
// sacred or ceremonial.

const SEASONS: Q[] = [
  ["Two Indigenous nations whose homelands include Minnesota are the Dakota and…", "Anishinaabe", ["Aztec", "Inuit", "Maya"], "Also called Ojibwe."],
  ["In early spring, many Dakota and Anishinaabe families tap maple trees to make…", "maple sugar and syrup", ["bread", "cheese", "juice from rocks"], "Sweet sap."],
  ["Maple sap runs best when days are warm and nights are…", "freezing", ["hot", "rainy all day", "windy only"], "Early spring."],
  ["In late summer, many Anishinaabe families harvest wild rice from…", "a canoe on the lake", ["a tall tree", "a cave", "the desert"], "Rice grows in shallow water."],
  ["Wild rice grows in…", "shallow lakes and rivers", ["deep ocean water", "dry sand", "snowbanks"], "A water grass."],
  ["The Anishinaabe word for wild rice is…", "manoomin", ["maple", "tipi", "canoe"], "A good berry."],
  ["Long ago, many Dakota families in summer villages grew…", "corn, beans and squash", ["rice paddies", "oranges", "coffee"], "Garden crops."],
  ["Long ago, many families moved with the seasons to…", "find food in each place", ["go to school", "visit a mall", "ride trains"], "Food changes by season."],
  ["In winter, many families long ago hunted…", "deer", ["whales", "camels", "kangaroos"], "Animals of the woods."],
  ["People fished through holes in the ice in…", "winter", ["summer", "fall only", "never"], "Frozen lakes."],
  ["Many Anishinaabe people made canoes from…", "birch bark", ["metal", "plastic", "glass"], "A white bark."],
  ["Berries were picked in…", "summer", ["winter", "midnight", "the snow"], "Warm months."],
  ["Today, Dakota and Anishinaabe people live…", "in cities, towns and on reservations", ["only long ago", "only in the woods", "only outside Minnesota"], "Living nations."],
  ["Today, many Dakota and Anishinaabe kids go to school and learn…", "their own languages too", ["only math", "no reading", "only French"], "Bringing languages back."],
  ["Many families still harvest wild rice and make maple sugar…", "today", ["only in stories", "never", "only in other countries"], "Traditions go on."],
  ["Which season comes after winter?", "Spring", ["Fall", "Summer", "Winter again"], "Snow melts."],
  ["Which tool helps ricers knock rice into the canoe?", "Wooden sticks", ["A hammer", "A shovel", "A net in the air"], "Called knockers.", true],
  ["Why do ricers leave some rice in the lake?", "So it can grow again next year", ["Because it tastes bad", "To feed sharks", "They forget"], "Seeds fall into the water.", true],
  ["Many Dakota people long ago lived in summer houses made of…", "bark", ["bricks", "glass", "steel"], "From trees.", true],
  ["In winter, many Dakota families long ago lived in tipis covered with…", "hides", ["glass", "paper", "metal"], "Animal skins.", true],
  ["Why did families long ago need to store food in fall?", "Food was hard to find in winter", ["Winter is warm", "Stores were open", "Animals bring food"], "Cold months.", true],
  ["How do we learn about life long ago?", "Stories, objects and pictures", ["Guessing only", "Video games", "Weather reports"], "Historical sources.", true],
  ["People who care for the land take only…", "what they need", ["everything", "the biggest trees", "all the fish"], "So more grows.", true],
  ["Lakes and rivers were important for travel because people used…", "canoes", ["cars", "airplanes", "trains"], "Paddling.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "mn-g2-seasons",
    title: "Seasons of the Land",
    emoji: "🍁",
    blurb: "Maple sugar, wild rice and life through the year",
    parentNote:
      "Daily life for Dakota and Anishinaabe people through the seasons, before European contact and today: maple sugaring in spring, gardens and berries in summer, wild rice in late summer and fall, and hunting and ice fishing in winter.",
    standards: ["2.4.18.1; 2.5.25.2; 2.4.21.1", "daily life for Dakota and Anishinaabe peoples in different times, their relationships to land and water, and the seasons"],
    items: SEASONS,
  }),
];
