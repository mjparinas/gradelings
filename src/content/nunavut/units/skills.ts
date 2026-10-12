import { pick, randInt, sample, shuffle, textChoice } from "../../random";
import type { ChoiceQuestion, GenerateOptions, Question, Unit } from "../../types";
import { nu } from "../kit";

// Nunavut-only skills units, generated rather than banked: directions between real Nunavut communities, map scale, and
// population data. Community positions are rounded latitude and longitude from the Government of Nunavut's community
// list; a direction is only asked when it is clearly one compass point, so small rounding never changes an answer.
// Population questions use made-up communities and say so.

type Dir = "north" | "northeast" | "east" | "southeast" | "south" | "southwest" | "west" | "northwest";
const DIRS: Dir[] = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
const ARROWS: Record<Dir, string> = { north: "⬆️", northeast: "↗️", east: "➡️", southeast: "↘️", south: "⬇️", southwest: "↙️", west: "⬅️", northwest: "↖️" };

/** name, latitude (°N), longitude (°W). */
const PLACES: readonly [string, number, number][] = [
  ["Iqaluit", 63.75, 68.52],
  ["Pangnirtung", 66.15, 65.71],
  ["Kinngait", 64.23, 76.54],
  ["Kimmirut", 62.85, 69.88],
  ["Qikiqtarjuaq", 67.55, 64.03],
  ["Clyde River", 70.47, 68.59],
  ["Pond Inlet", 72.7, 77.96],
  ["Arctic Bay", 73.04, 85.15],
  ["Igloolik", 69.38, 81.8],
  ["Sanirajak", 68.78, 81.24],
  ["Grise Fiord", 76.42, 82.89],
  ["Resolute", 74.7, 94.83],
  ["Rankin Inlet", 62.81, 92.09],
  ["Arviat", 61.11, 94.06],
  ["Whale Cove", 62.17, 92.58],
  ["Chesterfield Inlet", 63.34, 90.71],
  ["Baker Lake", 64.32, 96.02],
  ["Naujaat", 66.52, 86.23],
  ["Coral Harbour", 64.14, 83.16],
  ["Kugaaruk", 68.53, 89.82],
  ["Taloyoak", 69.54, 93.53],
  ["Gjoa Haven", 68.63, 95.88],
  ["Cambridge Bay", 69.12, 105.06],
  ["Kugluktuk", 67.83, 115.1],
  ["Sanikiluaq", 56.54, 79.22],
];

interface Trip {
  from: string;
  to: string;
  dir: Dir;
}

/** Every pair of communities whose direction is clearly one of the eight compass points. */
const TRIPS: Trip[] = (() => {
  const out: Trip[] = [];
  for (const [from, lat1, lon1] of PLACES) {
    for (const [to, lat2, lon2] of PLACES) {
      if (from === to || Math.abs(lon2 - lon1) > 15) continue;
      const north = (lat2 - lat1) * 111;
      const east = -(lon2 - lon1) * 111 * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180);
      if (Math.hypot(north, east) < 100) continue;
      const bearing = ((Math.atan2(east, north) * 180) / Math.PI + 360) % 360;
      const idx = Math.round(bearing / 45) % 8;
      const off = Math.abs(bearing - idx * 45 > 180 ? bearing - idx * 45 - 360 : bearing - idx * 45);
      // Cardinal points within 15°, in-between points within 10°: never near a boundary.
      if (off <= (idx % 2 === 0 ? 15 : 10)) out.push({ from, to, dir: DIRS[idx] });
    }
  }
  return out;
})();

export const CARDINAL_TRIPS = TRIPS.filter((t) => DIRS.indexOf(t.dir) % 2 === 0);
export const DIAGONAL_TRIPS = TRIPS.filter((t) => DIRS.indexOf(t.dir) % 2 === 1);

const dirChoice = (d: Dir) => ({ label: d, emoji: ARROWS[d] });

function tripQuestion(t: Trip, eight: boolean): ChoiceQuestion {
  const others = eight ? sample(DIRS.filter((d) => d !== t.dir), 3) : DIRS.filter((d, i) => i % 2 === 0 && d !== t.dir);
  const prompt = eight
    ? `You travel in a straight line from ${t.from} to ${t.to}. Which direction do you go?`
    : `Is ${t.to} north, south, east or west of ${t.from}?`;
  const hint = eight
    ? "Look at a map with north at the top. Is the place you are going higher or lower, and to the left or right?"
    : "On a map with north at the top, north is up, south is down, east is right and west is left.";
  return textChoice(prompt, dirChoice(t.dir), others.map(dirChoice), hint, { type: "emoji", emoji: "🧭" });
}

const COMPASS: readonly [string, string, string[], string][] = [
  ["Which direction is opposite to north?", "south", ["east", "west", "northeast"], "Opposites point in exactly the other way."],
  ["Which direction is opposite to east?", "west", ["north", "south", "southeast"], "Opposites point in exactly the other way."],
  ["Which direction is halfway between north and east?", "northeast", ["northwest", "southeast", "southwest"], "Put the two names together, north first."],
  ["Which direction is halfway between south and west?", "southwest", ["southeast", "northwest", "northeast"], "Put the two names together, south first."],
  ["Which direction is halfway between north and west?", "northwest", ["northeast", "southwest", "southeast"], "Put the two names together, north first."],
  ["Which direction is halfway between south and east?", "southeast", ["southwest", "northeast", "northwest"], "Put the two names together, south first."],
  ["On most maps, which direction is at the top?", "north", ["south", "east", "west"], "Look for the N on the compass rose."],
  ["In which direction does the sun rise?", "east", ["west", "north", "south"], "The sun comes up in the east and sets in the west."],
  ["In which direction does the sun set?", "west", ["east", "north", "south"], "The sun comes up in the east and sets in the west."],
  ["What is the drawing that shows directions on a map called?", "compass rose", ["legend", "scale", "title"], "It looks like a star with N, E, S and W on it."],
  ["You face north and turn right. Which way do you face now?", "east", ["west", "south", "north"], "On a compass, east is to the right of north."],
  ["You face north and turn left. Which way do you face now?", "west", ["east", "south", "north"], "On a compass, west is to the left of north."],
  ["You face east and turn all the way around. Which way do you face now?", "west", ["east", "north", "south"], "Turning around points you the opposite way."],
  ["You face south and turn right. Which way do you face now?", "west", ["east", "north", "south"], "Try it: face south, then turn to your right."],
  ["Where is the North Pole from anywhere in Nunavut?", "north", ["south", "east", "west"], "The North Pole is as far north as you can go."],
];

const compassQuestions = (n: number): ChoiceQuestion[] => sample(COMPASS, n).map(([prompt, right, wrong, hint]) => textChoice(prompt, right, wrong, hint));

export const directions4: Unit = {
  id: "nu-map-directions-4",
  title: "Which Way on the Map?",
  emoji: "🧭",
  blurb: "Compass directions between Nunavut communities.",
  parentNote:
    "Practises cardinal and in-between compass directions using real Nunavut communities, the skill of reading a map with north at the top. Directions are only asked when they are clearly one compass point.",
  standards: nu("Elementary Social Studies (NWT, 1993), Geography", "using cardinal and intermediate directions to locate Nunavut communities on a map"),
  generate: (opts?: GenerateOptions): Question[] => {
    const d = opts?.difficulty ?? 2;
    const nCompass = d === 1 ? 3 : 2;
    const nDiag = d === 3 ? 3 : 0;
    const trips = [...sample(CARDINAL_TRIPS, 8 - nCompass - nDiag).map((t) => tripQuestion(t, d === 3)), ...sample(DIAGONAL_TRIPS, nDiag).map((t) => tripQuestion(t, true))];
    return shuffle([...trips, ...compassQuestions(nCompass)]).slice(0, 8);
  },
};

// ---------- Map scale (Grade 4) ----------

const SCALES = [5, 10, 20, 25, 50, 100];

/** Three different wrong answers near `answer`, all positive and none equal to it. */
function near(answer: number, candidates: number[]): number[] {
  const out: number[] = [];
  for (const c of shuffle(candidates)) if (c > 0 && c !== answer && !out.includes(c)) out.push(c);
  return out.slice(0, 3);
}

function scaleQuestion(d: number): ChoiceQuestion {
  const s = d === 1 ? pick([10, 100]) : pick(SCALES);
  const cm = randInt(2, d === 1 ? 5 : 9);
  const km = s * cm;
  const kind = d === 1 ? 0 : randInt(0, d === 3 ? 2 : 1);
  if (kind === 0) {
    const wrong = near(km, [km + s, km - s, s + cm, km * 2, km + 2 * s]);
    return textChoice(
      `On a map, 1 cm stands for ${s} km. Two communities are ${cm} cm apart on the map. How far apart are they on the land?`,
      `${km} km`,
      wrong.map((n) => `${n} km`),
      `Each centimetre is ${s} km, so multiply: ${cm} × ${s}.`,
      { type: "emoji", emoji: "🗺️" },
    );
  }
  if (kind === 1) {
    const wrong = near(cm, [cm + 1, cm - 1, cm + 2, cm * 2]);
    return textChoice(
      `On a map, 1 cm stands for ${s} km. A snowmobile trail is ${km} km long. How long is it on the map?`,
      `${cm} cm`,
      wrong.map((n) => `${n} cm`),
      `Divide the real distance by ${s}: ${km} ÷ ${s}.`,
      { type: "emoji", emoji: "📏" },
    );
  }
  // kind 2: a scale that is not 1 cm.
  const per = pick([2, 5]);
  const span = per * randInt(2, 4);
  const real = (span / per) * s;
  const wrong = near(real, [span * s, real + s, real - s, s * per, real * 2]);
  return textChoice(
    `On a map, ${per} cm stands for ${s} km. Two lakes are ${span} cm apart on the map. How far apart are they?`,
    `${real} km`,
    wrong.map((n) => `${n} km`),
    `Count how many groups of ${per} cm fit in ${span} cm, then multiply by ${s}.`,
    { type: "emoji", emoji: "🗺️" },
  );
}

const MAP_PARTS: readonly [string, string, string[], string][] = [
  ["Which part of a map tells you how far apart places really are?", "the scale", ["the title", "the legend", "the compass rose"], "It often looks like a small ruler."],
  ["Which part of a map explains what the symbols mean?", "the legend", ["the scale", "the title", "the compass rose"], "It is also called the key."],
  ["Which part of a map tells you what the map is about?", "the title", ["the legend", "the scale", "the grid"], "It is usually at the top in big letters."],
  ["Which part of a map shows north, south, east and west?", "the compass rose", ["the legend", "the scale", "the title"], "It has the letters N, E, S and W."],
  ["On a map, blue usually shows…", "water", ["roads", "mountains", "towns"], "Think of the colour of the sea and lakes."],
  ["A map scale says 1 cm = 10 km. Which is farther on the land: 3 cm or 5 cm?", "5 cm", ["3 cm", "They are the same", "You cannot tell"], "More centimetres on the map means more kilometres on the land."],
  ["Why do maps use a scale?", "Real places are too big to draw full size", ["To make the map colourful", "To show the weather", "To list the communities"], "A map is a small drawing of a big place."],
  ["A small airplane symbol in a map legend most likely shows…", "an airport", ["a school", "a lake", "a hill"], "Symbols are little pictures of what is there."],
];

export const mapScale4: Unit = {
  id: "nu-map-scale-4",
  title: "How Far on the Map?",
  emoji: "📏",
  blurb: "Use a map scale to find real distances.",
  parentNote:
    "Practises the parts of a map (title, legend, compass rose, scale) and using a scale to change map centimetres into real kilometres. Distances are made up so the arithmetic stays at Grade 4 level.",
  standards: nu("Elementary Social Studies (NWT, 1993), Geography", "reading maps: the title, legend, compass rose and scale, and measuring distances"),
  generate: (opts?: GenerateOptions): Question[] => {
    const d = opts?.difficulty ?? 2;
    const parts = sample(MAP_PARTS, d === 1 ? 3 : 2).map(([prompt, right, wrong, hint]) => textChoice(prompt, right, wrong, hint));
    const seen = new Set<string>();
    const scales: ChoiceQuestion[] = [];
    for (let tries = 0; scales.length < 8 - parts.length && tries < 50; tries++) {
      const q = scaleQuestion(d);
      if (!seen.has(q.prompt)) {
        seen.add(q.prompt);
        scales.push(q);
      }
    }
    return shuffle([...parts, ...scales]);
  },
};

// ---------- Population data (Grade 9) ----------

const fmt = (n: number) => (n >= 10000 ? n.toLocaleString("en-CA").replace(/,/g, " ") : String(n));

function densityQuestion(): ChoiceQuestion {
  const area = pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
  const k = randInt(3, 60);
  const people = area * k;
  return textChoice(
    `A made-up community has ${fmt(people)} people living on ${area} km². What is its population density?`,
    `${k} people per km²`,
    near(k, [k + 1, k - 1, k * 2, people - area, k + area, Math.round(k / 2)].filter((n) => n !== people)).map((n) => `${n} people per km²`),
    "Population density is the number of people divided by the area.",
  );
}

function percentQuestion(): ChoiceQuestion {
  const total = pick([200, 400, 500, 800, 1000, 1200, 1600, 2000, 2400, 3000]);
  const pct = pick([10, 15, 20, 25, 30, 35, 40, 45]);
  const part = (total * pct) / 100;
  const group = pick(["are under 15 years old", "are 65 or older", "speak two languages at home", "moved there in the last five years"]);
  return textChoice(
    `In a made-up community of ${fmt(total)} people, ${part} ${group}. What percent is that?`,
    `${pct}%`,
    near(pct, [pct + 5, pct - 5, pct + 10, pct * 2, 100 - pct]).map((n) => `${n}%`),
    `Divide ${part} by ${total}, then multiply by 100.`,
  );
}

function growthQuestion(): ChoiceQuestion {
  const start = pick([500, 800, 1000, 1200, 1500, 2000, 2500, 4000, 5000]);
  const pct = pick([2, 4, 5, 8, 10, 12, 15, 20, 25].filter((p) => (start * p) % 100 === 0));
  const end = start + (start * pct) / 100;
  return textChoice(
    `A made-up town had ${fmt(start)} people in one census and ${fmt(end)} people five years later. By what percent did it grow?`,
    `${pct}%`,
    near(pct, [pct + 1, pct + 2, pct * 2, pct + 5, (end - start) / 10].filter((n) => Number.isInteger(n))).map((n) => `${n}%`),
    "Find the change, divide it by the starting population, then multiply by 100.",
  );
}

function naturalIncreaseQuestion(): ChoiceQuestion {
  const birth = randInt(10, 30);
  const death = randInt(3, Math.min(12, birth - 3));
  const ni = birth - death;
  return textChoice(
    `A made-up region has a birth rate of ${birth} per 1000 people and a death rate of ${death} per 1000. What is its rate of natural increase?`,
    `${ni} per 1000`,
    near(ni, [birth + death, ni + 2, ni - 2, ni + 1]).map((n) => `${n} per 1000`),
    "Natural increase is the birth rate minus the death rate.",
  );
}

function changeQuestion(): ChoiceQuestion {
  const births = randInt(10, 40);
  const deaths = randInt(3, 15);
  const moveIn = randInt(0, 30);
  const moveOut = randInt(5, 45);
  const change = births - deaths + moveIn - moveOut;
  const say = (n: number) => (n === 0 ? "stayed the same" : n > 0 ? `grew by ${n}` : `shrank by ${-n}`);
  const wrong = [births - deaths, births + deaths + moveIn - moveOut, births - deaths - moveIn + moveOut, change + 10, change - 10, -change].filter((n) => n !== change);
  const labels = [...new Set(wrong.map(say))].filter((l) => l !== say(change));
  return textChoice(
    "The table shows one year in a made-up community. How did the population change?",
    say(change),
    shuffle(labels).slice(0, 3),
    "Add births and people moving in, then take away deaths and people moving out.",
    { type: "table", title: "One year (made-up data)", headers: ["Births", "Deaths", "Moved in", "Moved out"], rows: [[births, deaths, moveIn, moveOut]] },
  );
}

const POPULATION_FACTS: readonly [string, string, string[], string][] = [
  ["What is population density?", "the number of people living in each square kilometre", ["the total number of people in a country", "how fast a city grows", "the number of births each year"], "Density compares people to area."],
  ["How often does Canada take a full census?", "every five years", ["every year", "every ten years", "every twenty years"], "Statistics Canada counts the population on a regular five-year cycle."],
  ["Compared with the provinces and other territories, Nunavut's population is…", "the youngest on average", ["the oldest on average", "the largest", "the most crowded"], "Nunavut has a high birth rate and many children and youth."],
  ["Most people in Nunavut are…", "Inuit", ["newcomers from other countries", "seasonal visitors", "people who live on farms"], "Nunavut was created through an Inuit land claim, and most Nunavummiut are Inuit."],
  ["Why is Nunavut's population density very low?", "A small number of people live across a huge area", ["Nobody lives there in winter", "The land is all water", "People live only in one city"], "Divide a small population by a very large area."],
  ["What is migration?", "people moving from one place to live in another", ["animals sleeping through winter", "the number of births", "a kind of map"], "Migrants move their homes."],
  ["What does a population pyramid show?", "how many people are in each age group", ["where the mountains are", "how much money people earn", "which languages are spoken"], "Each bar is an age group."],
  ["A population pyramid with a very wide base shows a population that is…", "young, with many children", ["mostly elderly", "shrinking fast", "all the same age"], "The bottom bars are the youngest age groups."],
  ["What is natural increase?", "births minus deaths", ["people moving in minus people moving out", "births plus deaths", "the total population"], "It is growth that comes from inside the population."],
  ["People moving into a country to live are called…", "immigrants", ["emigrants", "tourists", "commuters"], "Immigrants come in; emigrants exit."],
];

export const populationData9: Unit = {
  id: "nu-population-data-9",
  title: "People by the Numbers",
  emoji: "📊",
  blurb: "Density, growth and change in a population.",
  parentNote:
    "Practises population geography: density, percentages, growth between censuses, natural increase and migration, using made-up communities so the numbers are easy to check, plus a few facts about Nunavut's young population.",
  standards: nu("Junior Secondary Social Studies (NWT, 1993), Geography", "population: density, growth, natural increase and migration, and reading population data"),
  generate: (opts?: GenerateOptions): Question[] => {
    const d = opts?.difficulty ?? 2;
    const makers = d === 1 ? [densityQuestion, percentQuestion, naturalIncreaseQuestion] : [densityQuestion, percentQuestion, growthQuestion, naturalIncreaseQuestion, changeQuestion];
    const facts = sample(POPULATION_FACTS, d === 1 ? 3 : 2).map(([prompt, right, wrong, hint]) => textChoice(prompt, right, wrong, hint));
    const seen = new Set<string>();
    const sums: ChoiceQuestion[] = [];
    for (let i = 0; sums.length < 8 - facts.length && i < 60; i++) {
      const q = makers[i % makers.length]();
      const key = q.prompt + JSON.stringify(q.visual ?? "");
      if (!seen.has(key)) {
        seen.add(key);
        sums.push(q);
      }
    }
    return shuffle([...facts, ...sums]);
  },
};

// ---------- Time zones (Grade 8) ----------

/** Communities whose time zone is not in doubt: Qikiqtaaluk on Eastern, Kivalliq on Central, Kitikmeot on Mountain time. */
const ZONES: readonly [place: string, zone: "Eastern" | "Central" | "Mountain"][] = [
  ["Iqaluit", "Eastern"],
  ["Pangnirtung", "Eastern"],
  ["Pond Inlet", "Eastern"],
  ["Clyde River", "Eastern"],
  ["Rankin Inlet", "Central"],
  ["Arviat", "Central"],
  ["Baker Lake", "Central"],
  ["Cambridge Bay", "Mountain"],
  ["Kugluktuk", "Mountain"],
];
const OFFSET = { Eastern: 0, Central: -1, Mountain: -2 } as const;

/** Minutes after midnight as a Canadian clock time, like "9:30 a.m." or "12:15 p.m.". */
function clock(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m % 60).padStart(2, "0")} ${h24 < 12 ? "a.m." : "p.m."}`;
}

function zoneQuestion(d: number): ChoiceQuestion {
  const [[from, zf], [to, zt]] = sample(ZONES, 2);
  const start = randInt(d === 1 ? 16 : 0, d === 1 ? 40 : 47) * 30;
  const diff = (OFFSET[zt] - OFFSET[zf]) * 60;
  const answer = clock(start + diff);
  const wrong = [...new Set([diff - 60, diff + 60, -diff, diff - 120, diff + 120].map((x) => clock(start + x)))].filter((t) => t !== answer);
  return textChoice(
    `It is ${clock(start)} in ${from} (${zf} time). What time is it in ${to} (${zt} time)?`,
    answer,
    shuffle(wrong).slice(0, 3),
    zf === zt ? "Both places are in the same time zone, so the clocks match." : "Clocks go back one hour for each time zone you move west, and forward one hour moving east.",
    { type: "emoji", emoji: "🕒" },
  );
}

const ZONE_FACTS: readonly [string, string, string[], string][] = [
  ["How many time zones does Nunavut stretch across?", "three", ["one", "two", "five"], "Eastern, Central and Mountain time are all used in Nunavut."],
  ["Iqaluit uses which time zone?", "Eastern", ["Central", "Mountain", "Atlantic"], "Most of the Qikiqtaaluk region uses Eastern time."],
  ["Rankin Inlet uses which time zone?", "Central", ["Eastern", "Mountain", "Pacific"], "Most of the Kivalliq region uses Central time."],
  ["Cambridge Bay uses which time zone?", "Mountain", ["Central", "Eastern", "Atlantic"], "The Kitikmeot region in the west uses Mountain time."],
  ["Why does Canada have several time zones?", "It is very wide, so the sun rises at different times across the country", ["Each territory chooses its own hours", "To make travel harder", "Because of the northern lights"], "Earth turns toward the sun from east to west."],
  ["As you travel west into the next time zone, you set your clock…", "back one hour", ["forward one hour", "back two hours", "it stays the same"], "The sun reaches places farther west later."],
  ["As you travel east into the next time zone, you set your clock…", "forward one hour", ["back one hour", "back two hours", "it stays the same"], "The sun reaches places farther east earlier."],
  ["How many time zones does Canada have?", "six", ["three", "four", "ten"], "From Newfoundland time in the east to Pacific time in the west."],
  ["Earth turns once on its axis in about…", "24 hours", ["12 hours", "one week", "one year"], "One turn makes one day and night."],
  ["Each standard time zone is about how wide?", "15° of longitude", ["1° of longitude", "45° of longitude", "90° of longitude"], "360° ÷ 24 hours = 15° for each hour."],
];

export const timeZones8: Unit = {
  id: "nu-time-zones-8",
  title: "Time Zones Across Nunavut",
  emoji: "🕒",
  blurb: "Three time zones in one territory.",
  parentNote:
    "Practises how time zones work and converting clock times between Nunavut's Eastern, Central and Mountain time communities. Uses communities whose time zone is settled; a few places (such as Coral Harbour) keep their own time, so check locally.",
  standards: nu("Junior Secondary Social Studies (NWT, 1993), Geography", "longitude, time zones and converting times across Nunavut and Canada"),
  generate: (opts?: GenerateOptions): Question[] => {
    const d = opts?.difficulty ?? 2;
    const facts = sample(ZONE_FACTS, d === 1 ? 4 : 3).map(([prompt, right, wrong, hint]) => textChoice(prompt, right, wrong, hint));
    const seen = new Set<string>();
    const times: ChoiceQuestion[] = [];
    for (let i = 0; times.length < 8 - facts.length && i < 50; i++) {
      const q = zoneQuestion(d);
      if (!seen.has(q.prompt)) {
        seen.add(q.prompt);
        times.push(q);
      }
    }
    return shuffle([...facts, ...times]);
  },
};
