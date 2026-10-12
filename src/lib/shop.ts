// Things kids can spend coins on. Coins are only ever earned by learning and
// playing: there's no way to buy them with real money.

export type ItemKind = "companion" | "confetti" | "title";

/** How a celebration's pieces move (see `celebrate` in juice.ts). Cannons is the default. */
export type CelebrationPattern = "cannons" | "fall" | "float" | "fireworks";

export interface ShopItem {
  id: string;
  kind: ItemKind;
  name: string;
  cost: number;
  /** Emoji for confetti/titles; companions draw their critter. */
  icon: string;
  critter?: string;
  confetti?: string[];
  /** How the celebration's pieces move. Leave it out for cannons from both sides. */
  pattern?: CelebrationPattern;
  /** Must be reached before it can be bought. Coins alone aren't enough. */
  unlock?: { level?: number; trophy?: string; label: string };
}

export const STARTER = { companion: "ollie", confetti: "classic", title: "rookie" };

export const SHOP: ShopItem[] = [
  // Companions: your buddy on the home screen.
  { id: "ollie", kind: "companion", name: "Ollie the Otter", cost: 0, icon: "🦦", critter: "ollie" },
  { id: "hoot", kind: "companion", name: "Hoot the Owl", cost: 120, icon: "🦉", critter: "hoot" },
  { id: "ruby", kind: "companion", name: "Ruby the Fox", cost: 120, icon: "🦊", critter: "ruby" },
  { id: "bolt", kind: "companion", name: "Bolt the Beaver", cost: 120, icon: "🦫", critter: "bolt" },
  { id: "juniper", kind: "companion", name: "Juniper the Bear", cost: 120, icon: "🐻", critter: "juniper" },
  { id: "clover", kind: "companion", name: "Clover the Bunny", cost: 200, icon: "🐰", critter: "clover" },
  { id: "poppy", kind: "companion", name: "Poppy the Puffin", cost: 250, icon: "🐧", critter: "poppy" },
  { id: "rocco", kind: "companion", name: "Rocco the Raccoon", cost: 250, icon: "🦝", critter: "rocco" },
  { id: "maple", kind: "companion", name: "Maple the Moose", cost: 300, icon: "🦌", critter: "maple" },
  { id: "shelly", kind: "companion", name: "Shelly the Turtle", cost: 300, icon: "🐢", critter: "shelly" },
  { id: "bao", kind: "companion", name: "Bao the Panda", cost: 350, icon: "🐼", critter: "bao" },
  { id: "nori", kind: "companion", name: "Nori the Narwhal", cost: 500, icon: "🐋", critter: "nori" },
  { id: "marlo", kind: "companion", name: "Marlo the Marmot", cost: 350, icon: "🐿️", critter: "marlo", unlock: { level: 12, label: "Reach level 12" } },
  { id: "willow", kind: "companion", name: "Willow the Wolf", cost: 400, icon: "🐺", critter: "willow", unlock: { level: 18, label: "Reach level 18" } },
  { id: "frost", kind: "companion", name: "Frost the Arctic Fox", cost: 600, icon: "🦊", critter: "frost", unlock: { level: 30, label: "Reach level 30" } },
  { id: "pip", kind: "companion", name: "Pip the Mouse", cost: 150, icon: "🐭", critter: "pip" },
  { id: "ziggy", kind: "companion", name: "Ziggy the Chick", cost: 150, icon: "🐥", critter: "ziggy" },
  { id: "mochi", kind: "companion", name: "Mochi the Cat", cost: 200, icon: "🐱", critter: "mochi" },
  { id: "biscuit", kind: "companion", name: "Biscuit the Puppy", cost: 200, icon: "🐶", critter: "biscuit" },
  { id: "petunia", kind: "companion", name: "Petunia the Pig", cost: 200, icon: "🐷", critter: "petunia" },
  { id: "tango", kind: "companion", name: "Tango the Frog", cost: 250, icon: "🐸", critter: "tango" },
  { id: "hazel", kind: "companion", name: "Hazel the Hedgehog", cost: 250, icon: "🦔", critter: "hazel" },
  { id: "kiki", kind: "companion", name: "Kiki the Koala", cost: 300, icon: "🐨", critter: "kiki" },
  { id: "daisy", kind: "companion", name: "Daisy the Skunk", cost: 300, icon: "🦨", critter: "daisy" },
  { id: "pepper", kind: "companion", name: "Pepper the Penguin", cost: 300, icon: "🐧", critter: "pepper", unlock: { trophy: "daily-7", label: "Win Regular" } },
  { id: "sage", kind: "companion", name: "Sage the Sloth", cost: 350, icon: "🦥", critter: "sage", unlock: { trophy: "streak-14", label: "Win Fortnight" } },
  { id: "zuzu", kind: "companion", name: "Zuzu the Zebra", cost: 350, icon: "🦓", critter: "zuzu", unlock: { level: 10, label: "Reach level 10" } },
  { id: "sunny", kind: "companion", name: "Sunny the Lion", cost: 450, icon: "🦁", critter: "sunny", unlock: { trophy: "challenge-1", label: "Win Challenger" } },
  { id: "ember", kind: "companion", name: "Ember the Dragon", cost: 600, icon: "🐉", critter: "ember", unlock: { level: 25, label: "Reach level 25" } },
  { id: "luna", kind: "companion", name: "Luna the Unicorn", cost: 800, icon: "🦄", critter: "luna", unlock: { level: 40, label: "Reach level 40" } },

  // Celebration styles.
  { id: "classic", kind: "confetti", name: "Classic confetti", cost: 0, icon: "🎉", confetti: [] },
  { id: "hearts", kind: "confetti", name: "Hearts", cost: 150, icon: "💖", confetti: ["💖", "💜", "💛"] },
  { id: "snow", kind: "confetti", name: "Snowflakes", cost: 150, icon: "❄️", confetti: ["❄️", "⛄"], pattern: "fall" },
  { id: "leaves", kind: "confetti", name: "Maple leaves", cost: 150, icon: "🍁", confetti: ["🍁", "🍂"], pattern: "fall" },
  { id: "balloons", kind: "confetti", name: "Balloons", cost: 150, icon: "🎈", confetti: ["🎈", "🎈", "🎀"], pattern: "float" },
  { id: "fruit", kind: "confetti", name: "Fruit salad", cost: 150, icon: "🍓", confetti: ["🍓", "🍉", "🍌", "🍇"] },
  { id: "number-magic", kind: "confetti", name: "Number magic", cost: 150, icon: "🔢", confetti: ["🔢", "💯", "🧮", "✨"] },
  { id: "story-time", kind: "confetti", name: "Story time", cost: 150, icon: "📚", confetti: ["📚", "✏️", "⭐"] },
  { id: "stars", kind: "confetti", name: "Stars", cost: 200, icon: "⭐", confetti: ["⭐", "🌟", "✨"] },
  { id: "butterflies", kind: "confetti", name: "Butterflies", cost: 200, icon: "🦋", confetti: ["🦋", "🌼"], pattern: "float" },
  { id: "music", kind: "confetti", name: "Music notes", cost: 200, icon: "🎵", confetti: ["🎵", "🎶", "🎸"], pattern: "float" },
  { id: "garden", kind: "confetti", name: "Garden", cost: 200, icon: "🌻", confetti: ["🌻", "🌷", "🐝"], pattern: "fall" },
  { id: "sports", kind: "confetti", name: "Sports day", cost: 200, icon: "⚽", confetti: ["⚽", "🏀", "🏒", "🥅"] },
  { id: "sea", kind: "confetti", name: "Under the sea", cost: 250, icon: "🐠", confetti: ["🐠", "🐚", "🐙"] },
  { id: "dinos", kind: "confetti", name: "Dinosaurs", cost: 250, icon: "🦕", confetti: ["🦕", "🦖", "🌿"] },
  { id: "space", kind: "confetti", name: "Space", cost: 300, icon: "🚀", confetti: ["🚀", "🪐", "🌟"] },
  { id: "unicorns", kind: "confetti", name: "Unicorns", cost: 300, icon: "🦄", confetti: ["🦄", "🌈", "✨"], pattern: "float" },
  { id: "rain", kind: "confetti", name: "Rain City", cost: 200, icon: "🌧️", confetti: ["💧", "☔", "🌧️"], pattern: "fall", unlock: { level: 8, label: "Reach level 8" } },
  { id: "pancakes", kind: "confetti", name: "Pancake stack", cost: 200, icon: "🥞", confetti: ["🥞", "🍁", "🧈"], unlock: { trophy: "streak-7", label: "Win Week Warrior" } },
  { id: "blossoms", kind: "confetti", name: "Cherry blossoms", cost: 250, icon: "🌸", confetti: ["🌸", "💮"], pattern: "fall", unlock: { level: 10, label: "Reach level 10" } },
  { id: "robots", kind: "confetti", name: "Robots", cost: 250, icon: "🤖", confetti: ["🤖", "⚙️", "🔋"], unlock: { level: 12, label: "Reach level 12" } },
  { id: "fireworks", kind: "confetti", name: "Fireworks", cost: 300, icon: "🎆", confetti: ["🎆", "🎇", "✨"], pattern: "fireworks", unlock: { level: 15, label: "Reach level 15" } },
  { id: "rainbow", kind: "confetti", name: "Rainbow", cost: 300, icon: "🌈", confetti: ["🌈", "☁️", "⭐"], unlock: { level: 20, label: "Reach level 20" } },
  { id: "shooting-stars", kind: "confetti", name: "Shooting stars", cost: 350, icon: "🌠", confetti: ["🌠", "💫", "⭐"], pattern: "fireworks", unlock: { trophy: "proficient-10", label: "Win Forest" } },
  { id: "dragons", kind: "confetti", name: "Dragons", cost: 400, icon: "🐉", confetti: ["🐉", "🔥", "✨"], unlock: { level: 25, label: "Reach level 25" } },
  { id: "gold", kind: "confetti", name: "Gold coins", cost: 400, icon: "🪙", confetti: ["🪙", "✨"], unlock: { trophy: "coins-1000", label: "Win Treasure Hunter" } },
  { id: "bookworm-party", kind: "confetti", name: "Book party", cost: 400, icon: "📖", confetti: ["📖", "🐛", "🌟"], pattern: "float", unlock: { trophy: "correct-1000", label: "Win Knowledge Machine" } },
  { id: "aurora", kind: "confetti", name: "Northern lights", cost: 500, icon: "🌌", confetti: ["🌌", "✨", "💚"], pattern: "fall", unlock: { level: 35, label: "Reach level 35" } },
  { id: "royal", kind: "confetti", name: "Royal parade", cost: 600, icon: "👑", confetti: ["👑", "💎", "✨"], pattern: "fireworks", unlock: { level: 50, label: "Reach level 50" } },

  // Titles shown under your name.
  { id: "rookie", kind: "title", name: "Rookie", cost: 0, icon: "🌱" },
  { id: "math-whiz", kind: "title", name: "Math Whiz", cost: 120, icon: "🧮" },
  { id: "bookworm", kind: "title", name: "Bookworm", cost: 120, icon: "📚" },
  { id: "lab-legend", kind: "title", name: "Lab Legend", cost: 120, icon: "🧪" },
  { id: "globetrotter", kind: "title", name: "Globetrotter", cost: 120, icon: "🌍" },
  { id: "speedster", kind: "title", name: "Speedster", cost: 180, icon: "⚡" },
  { id: "champion", kind: "title", name: "Champion", cost: 300, icon: "🏆" },
  { id: "legend", kind: "title", name: "Legend", cost: 600, icon: "👑" },
  { id: "comeback-kid", kind: "title", name: "Comeback Kid", cost: 150, icon: "💪", unlock: { trophy: "comeback-100", label: "Win Bounce Back" } },
  { id: "streak-keeper", kind: "title", name: "Streak Keeper", cost: 200, icon: "🔥", unlock: { trophy: "streak-30", label: "Win Monthly Master" } },
  { id: "quiz-whiz", kind: "title", name: "Quiz Whiz", cost: 250, icon: "🧠", unlock: { trophy: "correct-1000", label: "Win Knowledge Machine" } },
  { id: "mastermind", kind: "title", name: "Mastermind", cost: 250, icon: "🌲", unlock: { trophy: "proficient-10", label: "Win Forest" } },
  { id: "trailblazer", kind: "title", name: "Trailblazer", cost: 300, icon: "🧭", unlock: { level: 25, label: "Reach level 25" } },
  { id: "year-round", kind: "title", name: "Year-Round Learner", cost: 400, icon: "🗓️", unlock: { trophy: "days-365", label: "Win A Full Year" } },
  { id: "north-star", kind: "title", name: "North Star", cost: 500, icon: "🌟", unlock: { level: 50, label: "Reach level 50" } },
];

export function getItem(id: string | undefined): ShopItem | undefined {
  return SHOP.find((i) => i.id === id);
}

/** The pieces and movement for a child's chosen celebration; anything unknown gets classic confetti. */
export function celebrationOf(id: string | undefined): { emoji: string[]; pattern: CelebrationPattern } {
  const item = getItem(id);
  return item?.kind === "confetti" ? { emoji: item.confetti ?? [], pattern: item.pattern ?? "cannons" } : { emoji: [], pattern: "cannons" };
}

export function isOwned(id: string, owned: string[]): boolean {
  const item = getItem(id);
  return !!item && (item.cost === 0 || owned.includes(id));
}

/** Whether a child has reached what an item needs (level or trophy). Cost is checked separately. */
export function isUnlocked(item: ShopItem, level: number, trophies: Record<string, number>): boolean {
  const u = item.unlock;
  if (!u) return true;
  return (u.level === undefined || level >= u.level) && (u.trophy === undefined || !!trophies[u.trophy]);
}
