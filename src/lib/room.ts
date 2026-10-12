// The room: a place to spend coins on that a child keeps coming back to. Items are bought with coins
// like anything in the shop (a `buy` event, so ownership merges across devices), and where each one
// sits is a small per-child setting on the profile.

export type RoomSlot = "wall" | "floor" | "decor" | "lamp" | "plant" | "corner" | "toy";

export interface RoomItem {
  id: string;
  slot: RoomSlot;
  name: string;
  cost: number;
  /** Shown in the picker, and in the scene for everything except walls and floors. */
  icon: string;
  /** Background for walls and floors. */
  paint?: string;
  unlock?: { level: number; label: string };
}

export const ROOM_SLOTS: { slot: RoomSlot; label: string; icon: string; /** Where it sits in the scene, as percentages of its width and height, and a font size in px. */ at?: { x: number; y: number; size: number } }[] = [
  { slot: "wall", label: "Walls", icon: "🎨" },
  { slot: "floor", label: "Floors", icon: "🟫" },
  { slot: "decor", label: "Wall art", icon: "🖼️", at: { x: 12, y: 8, size: 64 } },
  { slot: "lamp", label: "Lights", icon: "💡", at: { x: 76, y: 14, size: 44 } },
  { slot: "plant", label: "Plants", icon: "🪴", at: { x: 84, y: 52, size: 56 } },
  { slot: "corner", label: "Cosy corner", icon: "🛋️", at: { x: 4, y: 50, size: 72 } },
  { slot: "toy", label: "Toys", icon: "🧸", at: { x: 26, y: 66, size: 40 } },
];

export const ROOM_STARTER: Record<string, string> = { wall: "room-wall-plain", floor: "room-floor-wood" };

export const ROOM_ITEMS: RoomItem[] = [
  { id: "room-wall-plain", slot: "wall", name: "Plain blue", cost: 0, icon: "⬜", paint: "#e6efff" },
  { id: "room-wall-bubblegum", slot: "wall", name: "Bubblegum", cost: 50, icon: "🍬", paint: "#ffe3ee" },
  { id: "room-wall-sun", slot: "wall", name: "Sunshine", cost: 60, icon: "🟨", paint: "#fff1b8" },
  { id: "room-wall-mint", slot: "wall", name: "Mint", cost: 60, icon: "🟩", paint: "#d5f5e8" },
  { id: "room-wall-lilac", slot: "wall", name: "Lilac", cost: 60, icon: "🟪", paint: "#e6defa" },
  { id: "room-wall-peach", slot: "wall", name: "Peach", cost: 60, icon: "🟧", paint: "#ffe0cf" },
  { id: "room-wall-night", slot: "wall", name: "Starry night", cost: 150, icon: "🌌", paint: "linear-gradient(#1e2a5e, #3a4fb8)" },
  { id: "room-wall-forest", slot: "wall", name: "Forest", cost: 150, icon: "🌲", paint: "linear-gradient(#bfe8c4, #6fbf8a)" },
  { id: "room-wall-stripes", slot: "wall", name: "Candy stripes", cost: 120, icon: "🍭", paint: "repeating-linear-gradient(90deg, #fff6e0 0 28px, #ffd9e6 28px 56px)" },
  { id: "room-wall-dots", slot: "wall", name: "Polka dots", cost: 120, icon: "🔵", paint: "radial-gradient(circle, #a9c8ff 18%, transparent 19%) 0 0 / 40px 40px, #f2f7ff" },
  { id: "room-wall-ocean", slot: "wall", name: "Under the sea", cost: 180, icon: "🐳", paint: "linear-gradient(#9fe3f5, #2f86c9)" },
  { id: "room-wall-sunset", slot: "wall", name: "Sunset", cost: 200, icon: "🌇", paint: "linear-gradient(#ffd6a5, #ff8fa3)", unlock: { level: 8, label: "Reach level 8" } },
  { id: "room-wall-rainbow", slot: "wall", name: "Rainbow", cost: 250, icon: "🌈", paint: "linear-gradient(#ffb3b3, #ffe0a3, #fff6a3, #b8f0b0, #a8d4ff, #d4b8ff)", unlock: { level: 12, label: "Reach level 12" } },
  { id: "room-wall-aurora", slot: "wall", name: "Northern lights", cost: 300, icon: "🎇", paint: "linear-gradient(160deg, #0f1f3d 20%, #1f7a6a 55%, #6b4bb8 85%)", unlock: { level: 18, label: "Reach level 18" } },
  { id: "room-wall-space", slot: "wall", name: "Outer space", cost: 400, icon: "🪐", paint: "radial-gradient(circle, #ffffff 2%, transparent 3%) 0 0 / 36px 36px, radial-gradient(circle, #ffe9a8 2%, transparent 3%) 18px 22px / 52px 52px, linear-gradient(#0b1030, #2a1b5c)", unlock: { level: 25, label: "Reach level 25" } },

  { id: "room-floor-wood", slot: "floor", name: "Wood", cost: 0, icon: "🟫", paint: "#e8c9a0" },
  { id: "room-floor-sand", slot: "floor", name: "Sandy beach", cost: 50, icon: "🏖️", paint: "#f3dfa8" },
  { id: "room-floor-grass", slot: "floor", name: "Grass", cost: 80, icon: "🌱", paint: "#9fd68a" },
  { id: "room-floor-blue", slot: "floor", name: "Blue carpet", cost: 80, icon: "🟦", paint: "#8fb4f0" },
  { id: "room-floor-red", slot: "floor", name: "Red carpet", cost: 80, icon: "🟥", paint: "#e88a8a" },
  { id: "room-floor-snow", slot: "floor", name: "Snow", cost: 100, icon: "❄️", paint: "#f4f8fc" },
  { id: "room-floor-check", slot: "floor", name: "Checkerboard", cost: 120, icon: "♟️", paint: "repeating-conic-gradient(#ffffff 0% 25%, #c9d6ef 0% 50%) 0 0 / 48px 48px" },
  { id: "room-floor-tiles", slot: "floor", name: "Stone tiles", cost: 120, icon: "🪨", paint: "linear-gradient(#b9b2a6 2px, transparent 2px) 0 0 / 40px 40px, linear-gradient(90deg, #b9b2a6 2px, transparent 2px) 0 0 / 40px 40px, #ddd6ca" },
  { id: "room-floor-pond", slot: "floor", name: "Lily pond", cost: 160, icon: "🐸", paint: "radial-gradient(ellipse, #7ccf8a 14%, transparent 15%) 10px 8px / 70px 44px, linear-gradient(#7fc8e8, #4a9fd0)" },
  { id: "room-floor-rainbow", slot: "floor", name: "Rainbow rug", cost: 250, icon: "🌈", paint: "repeating-linear-gradient(90deg, #ffb3b3 0 24px, #ffe0a3 24px 48px, #b8f0b0 48px 72px, #a8d4ff 72px 96px, #d4b8ff 96px 120px)", unlock: { level: 12, label: "Reach level 12" } },
  { id: "room-floor-moon", slot: "floor", name: "Moon dust", cost: 350, icon: "🌕", paint: "radial-gradient(circle, #a9a9b8 12%, transparent 13%) 0 0 / 30px 30px, linear-gradient(#e4e4ec, #c4c4d2)", unlock: { level: 20, label: "Reach level 20" } },

  { id: "room-decor-art", slot: "decor", name: "Painting", cost: 60, icon: "🖼️" },
  { id: "room-decor-star", slot: "decor", name: "Gold star", cost: 50, icon: "⭐" },
  { id: "room-decor-clock", slot: "decor", name: "Clock", cost: 70, icon: "🕰️" },
  { id: "room-decor-window", slot: "decor", name: "Window", cost: 80, icon: "🪟" },
  { id: "room-decor-mirror", slot: "decor", name: "Mirror", cost: 90, icon: "🪞" },
  { id: "room-decor-map", slot: "decor", name: "Big map", cost: 100, icon: "🗺️" },
  { id: "room-decor-night", slot: "decor", name: "City at night", cost: 120, icon: "🌃" },
  { id: "room-decor-mountains", slot: "decor", name: "Mountains", cost: 120, icon: "🏔️" },
  { id: "room-decor-sunrise", slot: "decor", name: "Sunrise", cost: 130, icon: "🌅" },
  { id: "room-decor-rainbow", slot: "decor", name: "Rainbow", cost: 150, icon: "🌈", unlock: { level: 6, label: "Reach level 6" } },
  { id: "room-decor-trophy", slot: "decor", name: "Trophy shelf", cost: 200, icon: "🏆", unlock: { level: 10, label: "Reach level 10" } },
  { id: "room-decor-fireworks", slot: "decor", name: "Fireworks", cost: 300, icon: "🎆", unlock: { level: 18, label: "Reach level 18" } },

  { id: "room-lamp-torch", slot: "lamp", name: "Flashlight", cost: 50, icon: "🔦" },
  { id: "room-lamp-bulb", slot: "lamp", name: "Desk lamp", cost: 70, icon: "💡" },
  { id: "room-lamp-balloon", slot: "lamp", name: "Glow balloon", cost: 70, icon: "🎈" },
  { id: "room-lamp-lantern", slot: "lamp", name: "Lantern", cost: 90, icon: "🏮" },
  { id: "room-lamp-star", slot: "lamp", name: "Glow star", cost: 100, icon: "🌟" },
  { id: "room-lamp-sun", slot: "lamp", name: "Sun lamp", cost: 120, icon: "☀️" },
  { id: "room-lamp-fairy", slot: "lamp", name: "Fairy lights", cost: 140, icon: "✨" },
  { id: "room-lamp-moon", slot: "lamp", name: "Moon light", cost: 160, icon: "🌙", unlock: { level: 10, label: "Reach level 10" } },
  { id: "room-lamp-comet", slot: "lamp", name: "Comet", cost: 250, icon: "☄️", unlock: { level: 15, label: "Reach level 15" } },
  { id: "room-lamp-shooting", slot: "lamp", name: "Shooting star", cost: 350, icon: "🌠", unlock: { level: 22, label: "Reach level 22" } },

  { id: "room-plant-clover", slot: "plant", name: "Clover", cost: 50, icon: "☘️" },
  { id: "room-plant-cactus", slot: "plant", name: "Cactus", cost: 60, icon: "🌵" },
  { id: "room-plant-herbs", slot: "plant", name: "Herbs", cost: 60, icon: "🌿" },
  { id: "room-plant-mushroom", slot: "plant", name: "Mushroom", cost: 70, icon: "🍄" },
  { id: "room-plant-pot", slot: "plant", name: "Potted plant", cost: 80, icon: "🪴" },
  { id: "room-plant-tulips", slot: "plant", name: "Tulips", cost: 90, icon: "🌷" },
  { id: "room-plant-hibiscus", slot: "plant", name: "Hibiscus", cost: 90, icon: "🌺" },
  { id: "room-plant-sunflower", slot: "plant", name: "Sunflower", cost: 100, icon: "🌻" },
  { id: "room-plant-bamboo", slot: "plant", name: "Bamboo", cost: 100, icon: "🎋" },
  { id: "room-plant-maple", slot: "plant", name: "Maple tree", cost: 120, icon: "🍁" },
  { id: "room-plant-blossom", slot: "plant", name: "Cherry blossoms", cost: 130, icon: "🌸" },
  { id: "room-plant-palm", slot: "plant", name: "Palm tree", cost: 150, icon: "🌴" },
  { id: "room-plant-evergreen", slot: "plant", name: "Evergreen", cost: 200, icon: "🌲", unlock: { level: 8, label: "Reach level 8" } },
  { id: "room-plant-oak", slot: "plant", name: "Big oak tree", cost: 300, icon: "🌳", unlock: { level: 15, label: "Reach level 15" } },

  { id: "room-corner-box", slot: "corner", name: "Cardboard box", cost: 50, icon: "📦" },
  { id: "room-corner-basket", slot: "corner", name: "Cosy basket", cost: 100, icon: "🧺" },
  { id: "room-corner-chair", slot: "corner", name: "Reading chair", cost: 90, icon: "🪑" },
  { id: "room-corner-books", slot: "corner", name: "Bookshelf", cost: 120, icon: "📚" },
  { id: "room-corner-drums", slot: "corner", name: "Drum kit", cost: 150, icon: "🥁" },
  { id: "room-corner-piano", slot: "corner", name: "Piano", cost: 180, icon: "🎹" },
  { id: "room-corner-bed", slot: "corner", name: "Snug bed", cost: 200, icon: "🛏️" },
  { id: "room-corner-couch", slot: "corner", name: "Couch", cost: 200, icon: "🛋️" },
  { id: "room-corner-fish", slot: "corner", name: "Fish tank", cost: 220, icon: "🐠" },
  { id: "room-corner-tent", slot: "corner", name: "Camping tent", cost: 250, icon: "⛺", unlock: { level: 12, label: "Reach level 12" } },
  { id: "room-corner-telescope", slot: "corner", name: "Telescope", cost: 300, icon: "🔭", unlock: { level: 15, label: "Reach level 15" } },
  { id: "room-corner-castle", slot: "corner", name: "Play castle", cost: 400, icon: "🏰", unlock: { level: 25, label: "Reach level 25" } },

  { id: "room-toy-ball", slot: "toy", name: "Soccer ball", cost: 50, icon: "⚽" },
  { id: "room-toy-yoyo", slot: "toy", name: "Yo-yo", cost: 60, icon: "🪀" },
  { id: "room-toy-teddy", slot: "toy", name: "Teddy bear", cost: 80, icon: "🧸" },
  { id: "room-toy-blocks", slot: "toy", name: "Building blocks", cost: 90, icon: "🧱" },
  { id: "room-toy-kite", slot: "toy", name: "Kite", cost: 100, icon: "🪁" },
  { id: "room-toy-rocket", slot: "toy", name: "Toy rocket", cost: 140, icon: "🚀" },
  { id: "room-toy-puzzle", slot: "toy", name: "Puzzle", cost: 110, icon: "🧩" },
  { id: "room-toy-train", slot: "toy", name: "Toy train", cost: 120, icon: "🚂" },
  { id: "room-toy-robot", slot: "toy", name: "Robot", cost: 150, icon: "🤖" },
  { id: "room-toy-dino", slot: "toy", name: "Dinosaur", cost: 160, icon: "🦕" },
  { id: "room-toy-unicorn", slot: "toy", name: "Unicorn", cost: 180, icon: "🦄" },
  { id: "room-toy-wand", slot: "toy", name: "Magic wand", cost: 200, icon: "🪄", unlock: { level: 10, label: "Reach level 10" } },
  { id: "room-toy-ufo", slot: "toy", name: "Flying saucer", cost: 250, icon: "🛸", unlock: { level: 15, label: "Reach level 15" } },
  { id: "room-toy-dragon", slot: "toy", name: "Dragon", cost: 350, icon: "🐉", unlock: { level: 20, label: "Reach level 20" } },
];

export function getRoomItem(id: string | undefined): RoomItem | undefined {
  return ROOM_ITEMS.find((i) => i.id === id);
}

export function isRoomOwned(item: RoomItem, owned: string[]): boolean {
  return item.cost === 0 || owned.includes(item.id);
}

/** What is in each slot right now, with the starter wall and floor filled in. Only owned, known items count. */
export function roomLayout(room: Record<string, string> | undefined, owned: string[]): Partial<Record<RoomSlot, RoomItem>> {
  const out: Partial<Record<RoomSlot, RoomItem>> = {};
  for (const [slot, id] of Object.entries({ ...ROOM_STARTER, ...room })) {
    const item = getRoomItem(id);
    if (item && item.slot === slot && isRoomOwned(item, owned)) out[slot as RoomSlot] = item;
  }
  return out;
}
