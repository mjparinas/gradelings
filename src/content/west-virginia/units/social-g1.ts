import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// West Virginia Grade 1 social studies: West Virginia and the United States on a map (SS.1.15), the state motto
// (SS.1.20), the work people do in West Virginia (SS.1.21), finding your town and county (SS.1.22), and the state's
// games, toys, music and crafts (SS.1.23). Prompts stay short for little kids.

const OUR_STATE: Q[] = [
  ["What is the name of our state?", "West Virginia", ["Riverland", "Oakton"], "It is called the Mountain State."],
  ["West Virginia is one state in the…", "United States", ["Pacific Ocean", "Arctic"], "There are 50 states."],
  ["On a map of the United States, West Virginia is in the…", "east", ["far west", "middle of the ocean"], "It is closer to the Atlantic than the Pacific."],
  ["The capital of West Virginia is…", "Charleston", ["Wheeling", "Elkins"], "It is on the Kanawha River."],
  ["Our state motto is 'Montani Semper Liberi.' It means…", "Mountaineers are always free", ["Rivers run fast", "We love snow"], "It is on the state seal."],
  ["Our state is split into parts called…", "counties", ["countries", "oceans"], "Each one has a county seat."],
  ["Your hometown is inside a…", "county", ["lake", "cloud"], "Every town in our state is in a county."],
  ["To find your town on a state map, read the map's…", "names and key", ["price tag", "weather report"], "The key tells what the symbols mean."],
  ["The big river on West Virginia's west side is the…", "Ohio River", ["Nile River", "Amazon River"], "It is a border with Ohio."],
  ["Spruce Knob is the top of West Virginia's highest…", "mountain", ["lake", "river"], "It is in the Allegheny Mountains."],
  ["On a map, rivers and lakes are shown in…", "blue", ["red", "orange"], "Water is blue on most maps."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Charleston has a star on state maps."],
  ["Many West Virginians dig coal in…", "mines", ["oceans", "clouds"], "Coal is deep underground."],
  ["A person who digs coal is a…", "coal miner", ["pilot", "baker"], "Miners wear hard hats with lights."],
  ["Many West Virginians care for sick people as…", "nurses and doctors", ["astronauts", "sailors"], "They work in hospitals and clinics."],
  ["People who cut trees for wood work in…", "timber", ["fishing at sea", "space travel"], "Forests cover most of the state."],
  ["Many West Virginia farmers raise…", "cattle and chickens", ["penguins", "camels"], "Farms are in the valleys and hills."],
  ["Visitors come to West Virginia to…", "ski, raft and hike", ["surf ocean waves", "ride camels"], "Our mountains and rivers are fun to explore."],
  ["West Virginia glassmakers have made…", "marbles and glass dishes", ["cheese", "shoes"], "Glass is made from melted sand."],
  ["A quilt is made by sewing… together.", "pieces of cloth", ["rocks", "leaves"], "Quilts keep people warm."],
  ["Old-time music here is often played on a fiddle and a…", "banjo", ["tuba", "harp"], "Both have strings."],
  ["A corn husk doll is made from…", "the leaves around an ear of corn", ["plastic", "metal"], "The husks are dried and tied."],
  ["At a festival, people may square dance to…", "fiddle music", ["no music", "a fire alarm"], "A caller tells the dancers what to do."],
  ["Long ago, kids played with toys they…", "made from wood and cloth", ["bought online", "printed on a computer"], "Families made toys at home."],
  ["How many counties does West Virginia have?", "55", ["5", "100"], "That is more than 50.", true],
  ["Our state motto is written in…", "Latin", ["Spanish", "French"], "Latin is a very old language.", true],
  ["A limberjack is a wooden toy that…", "dances when you tap its board", ["flies in the sky", "floats on water"], "Its arms and legs are loose.", true],
  ["The Vandalia Gathering in Charleston celebrates…", "old-time music, crafts and stories", ["ocean surfing", "space rockets"], "It is held each spring.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "wv-g1-our-state",
    title: "West Virginia, Our State",
    emoji: "🌳",
    blurb: "Our state on the map, its motto, its work and its music",
    parentNote:
      "West Virginia on maps of the state and the nation, the capital, rivers and Spruce Knob, finding your own town and county, the state motto Montani Semper Liberi, the work many West Virginians do (mining, health care, timber, farming, tourism and glass), and the state's quilts, toys, festivals and old-time music.",
    standards: ["SS.1.15; SS.1.20; SS.1.21; SS.1.22; SS.1.23", "West Virginia and the United States on maps, the state motto, common occupations, finding your hometown and county, and the state's games, toys and art forms"],
    items: OUR_STATE,
  }),
];
