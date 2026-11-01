// The pure SVG drawing of every critter, with no hooks, so server code (share
// images) can draw one too. `Critter` in Critter.tsx adds motion and eye-follow.

import { currentHoliday, type HolidayId } from "@/lib/holidays";
import type { CSSProperties } from "react";

// The mascot cast, all drawn from one parametric SVG so they share a style,
// moods and pointer-following eyes. Ollie the Otter is the main guide; each
// subject has its own guide; the rest can be unlocked in the shop. The ones marked
// `shopOnly` are earned buddies, kept out of the "pick your animal" avatar list.

export type Mood = "happy" | "cheer" | "think" | "oops" | "wave" | "sleepy";

type Ears = "round" | "small" | "pointy" | "long" | "tufts" | "big" | "floppy" | "none";
type Nose = "button" | "beak" | "bill" | "snout" | "big" | "pig" | "dots";
type Extra =
  | "shell" | "glasses" | "goggles" | "hat" | "mask" | "antlers" | "turtle" | "panda" | "horn" | "scarf" | "teeth" | "puffin"
  | "mane" | "stripes" | "spikes" | "dragon" | "unicorn" | "patch" | "bumps" | "tuft" | "sloth" | "toque" | "skunk";

export interface CritterDef {
  id: string;
  name: string;
  species: string;
  role?: string;
  fur: string;
  furDark: string;
  face: string;
  belly: string;
  ears: Ears;
  earInner?: string;
  nose: Nose;
  noseColour: string;
  extras: Extra[];
  /** Only bought in the shop, not offered as a profile avatar. */
  shopOnly?: boolean;
}

export const CRITTERS: CritterDef[] = [
  { id: "ollie", name: "Ollie", species: "otter", role: "Your guide", fur: "#9a6440", furDark: "#74462a", face: "#f6e2c8", belly: "#f6e2c8", ears: "small", nose: "button", noseColour: "#3d2a20", extras: ["shell"] },
  { id: "hoot", name: "Hoot", species: "owl", role: "Math guide", fur: "#7b6fd6", furDark: "#5a4fb3", face: "#efeaff", belly: "#d9d2ff", ears: "tufts", nose: "beak", noseColour: "#ffa83d", extras: ["glasses"] },
  { id: "ruby", name: "Ruby", species: "fox", role: "Reading guide", fur: "#f07a2b", furDark: "#c95a12", face: "#fff4e8", belly: "#fff4e8", ears: "pointy", earInner: "#3d2a20", nose: "button", noseColour: "#2b1d16", extras: ["scarf"] },
  { id: "bolt", name: "Bolt", species: "beaver", role: "Science guide", fur: "#a86b3c", furDark: "#7f4c25", face: "#e9c8a3", belly: "#e9c8a3", ears: "small", nose: "button", noseColour: "#3d2a20", extras: ["goggles", "teeth"] },
  { id: "juniper", name: "Juniper", species: "bear", role: "Our World guide", fur: "#c9874a", furDark: "#a1652d", face: "#f3d9b8", belly: "#f3d9b8", ears: "round", nose: "button", noseColour: "#3d2a20", extras: ["hat"] },
  { id: "clover", name: "Clover", species: "bunny", fur: "#ece6f2", furDark: "#cfc4dc", face: "#ffffff", belly: "#ffffff", ears: "long", earInner: "#ffb8cf", nose: "button", noseColour: "#ff8fb1", extras: ["teeth"] },
  { id: "poppy", name: "Poppy", species: "puffin", fur: "#2f3445", furDark: "#1d2130", face: "#f7f8fb", belly: "#f7f8fb", ears: "none", nose: "bill", noseColour: "#ff7b39", extras: ["puffin"] },
  { id: "rocco", name: "Rocco", species: "raccoon", fur: "#9aa3ad", furDark: "#6c7580", face: "#eef1f4", belly: "#d9dee3", ears: "pointy", earInner: "#3b3f46", nose: "button", noseColour: "#2b2f36", extras: ["mask"] },
  { id: "maple", name: "Maple", species: "moose", fur: "#8a5a3b", furDark: "#5f3b24", face: "#c89a72", belly: "#c89a72", ears: "small", nose: "snout", noseColour: "#5f3b24", extras: ["antlers"] },
  { id: "shelly", name: "Shelly", species: "turtle", fur: "#5cc28a", furDark: "#3a9a68", face: "#a8e6c1", belly: "#f3e3a2", ears: "none", nose: "button", noseColour: "#2f6b4a", extras: ["turtle"] },
  { id: "bao", name: "Bao", species: "panda", fur: "#ffffff", furDark: "#2b2f36", face: "#ffffff", belly: "#ffffff", ears: "round", nose: "button", noseColour: "#2b2f36", extras: ["panda"] },
  { id: "marlo", name: "Marlo", species: "marmot", fur: "#b9a58a", furDark: "#8d7a5f", face: "#f1e6d2", belly: "#f1e6d2", ears: "small", nose: "button", noseColour: "#3d2a20", extras: ["teeth"] },
  { id: "willow", name: "Willow", species: "wolf", fur: "#8d97a8", furDark: "#5f6877", face: "#e6ebf2", belly: "#e6ebf2", ears: "pointy", earInner: "#414857", nose: "button", noseColour: "#2b2f36", extras: ["scarf"] },
  { id: "frost", name: "Frost", species: "arctic fox", fur: "#f4f8fc", furDark: "#c5d3e3", face: "#ffffff", belly: "#ffffff", ears: "pointy", earInner: "#9db4cf", nose: "button", noseColour: "#2b2f36", extras: [] },
  { id: "nori", name: "Nori", species: "narwhal", fur: "#7fa6d6", furDark: "#5a84b8", face: "#dbe9fa", belly: "#dbe9fa", ears: "none", nose: "button", noseColour: "#3a5a85", extras: ["horn"] },
  // Shop buddies added in October 2026.
  { id: "pip", name: "Pip", species: "mouse", fur: "#b8bcc6", furDark: "#8d929e", face: "#eef0f4", belly: "#eef0f4", ears: "big", earInner: "#ffb8cf", nose: "button", noseColour: "#ff8fb1", extras: [], shopOnly: true },
  { id: "ziggy", name: "Ziggy", species: "chick", fur: "#ffd84a", furDark: "#f0b81f", face: "#fff1a8", belly: "#fff1a8", ears: "none", nose: "beak", noseColour: "#ff9a2e", extras: ["tuft"], shopOnly: true },
  { id: "mochi", name: "Mochi", species: "cat", fur: "#f3a956", furDark: "#d7832d", face: "#fff1df", belly: "#fff1df", ears: "pointy", earInner: "#ffb8cf", nose: "button", noseColour: "#ff8fa8", extras: ["stripes"], shopOnly: true },
  { id: "biscuit", name: "Biscuit", species: "puppy", fur: "#e0b07a", furDark: "#a8743f", face: "#fbeedd", belly: "#fbeedd", ears: "floppy", nose: "big", noseColour: "#3d2a20", extras: ["patch"], shopOnly: true },
  { id: "petunia", name: "Petunia", species: "pig", fur: "#f6a5b8", furDark: "#e27f98", face: "#fbc6d2", belly: "#fbc6d2", ears: "pointy", earInner: "#e27f98", nose: "pig", noseColour: "#f48aa5", extras: [], shopOnly: true },
  { id: "tango", name: "Tango", species: "frog", fur: "#6cc24a", furDark: "#4a9a30", face: "#c9ef9e", belly: "#e3f7c4", ears: "none", nose: "dots", noseColour: "#3f7f2a", extras: ["bumps"], shopOnly: true },
  { id: "hazel", name: "Hazel", species: "hedgehog", fur: "#a87c5a", furDark: "#6f4e36", face: "#f5e3c8", belly: "#f5e3c8", ears: "small", nose: "button", noseColour: "#3d2a20", extras: ["spikes"], shopOnly: true },
  { id: "kiki", name: "Kiki", species: "koala", fur: "#9ea4ae", furDark: "#7a808b", face: "#d5d9df", belly: "#eef0f3", ears: "big", earInner: "#f4f1ec", nose: "big", noseColour: "#3a3f4a", extras: [], shopOnly: true },
  { id: "pepper", name: "Pepper", species: "penguin", fur: "#2f3445", furDark: "#1d2130", face: "#f7f8fb", belly: "#f7f8fb", ears: "none", nose: "beak", noseColour: "#ffa83d", extras: ["toque"], shopOnly: true },
  { id: "daisy", name: "Daisy", species: "skunk", fur: "#33384a", furDark: "#1f2330", face: "#eef0f4", belly: "#eef0f4", ears: "small", nose: "button", noseColour: "#ff8fb1", extras: ["skunk"], shopOnly: true },
  { id: "sage", name: "Sage", species: "sloth", fur: "#a89480", furDark: "#7a6654", face: "#efe2cf", belly: "#efe2cf", ears: "none", nose: "big", noseColour: "#4a3a2e", extras: ["sloth"], shopOnly: true },
  { id: "zuzu", name: "Zuzu", species: "zebra", fur: "#eceef2", furDark: "#3a3f4a", face: "#ffffff", belly: "#ffffff", ears: "pointy", earInner: "#2b2f36", nose: "snout", noseColour: "#2b2f36", extras: ["stripes"], shopOnly: true },
  { id: "sunny", name: "Sunny", species: "lion", fur: "#f2b347", furDark: "#c98320", face: "#fde3b0", belly: "#fde3b0", ears: "round", earInner: "#c98320", nose: "button", noseColour: "#7a4a2a", extras: ["mane"], shopOnly: true },
  { id: "ember", name: "Ember", species: "dragon", fur: "#5bbf6a", furDark: "#3a8f4a", face: "#d4f2a8", belly: "#d4f2a8", ears: "none", nose: "dots", noseColour: "#2f6b3a", extras: ["dragon"], shopOnly: true },
  { id: "luna", name: "Luna", species: "unicorn", fur: "#fbf7ff", furDark: "#d9cdee", face: "#ffffff", belly: "#ffffff", ears: "pointy", earInner: "#ffb8cf", nose: "dots", noseColour: "#c9a3d9", extras: ["unicorn"], shopOnly: true },
];

/** The critters a child can pick as their profile picture. */
export const AVATARS = CRITTERS.filter((c) => !c.shopOnly);

/** Species that don't get whiskers drawn beside a button nose. */
const NO_WHISKERS = new Set(["turtle", "narwhal", "bear", "panda"]);

/** Points of a spiky ring around the head, for the hedgehog. */
const SPIKES = Array.from({ length: 23 }, (_, i) => {
  const a = Math.PI * (0.92 + (i / 22) * 1.16);
  const r = i % 2 ? 80 : 54;
  return `${(100 + r * Math.cos(a)).toFixed(1)} ${(92 + r * Math.sin(a)).toFixed(1)}`;
}).join(" L");

/** Scallops of a lion's mane, all the way round the head. */
const MANE = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  return [100 + 64 * Math.cos(a), 92 + 64 * Math.sin(a)] as const;
});

export function getCritter(id: string | undefined): CritterDef {
  return CRITTERS.find((c) => c.id === id) ?? CRITTERS[0];
}

const INK = "#3d2a20";
const part: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

function EarsLayer({ c }: { c: CritterDef }) {
  const inner = c.earInner ?? c.furDark;
  switch (c.ears) {
    case "round":
      return (
        <g>
          <circle cx="55" cy="50" r="17" fill={c.ears === "round" && c.extras.includes("panda") ? "#2b2f36" : c.fur} />
          <circle cx="145" cy="50" r="17" fill={c.extras.includes("panda") ? "#2b2f36" : c.fur} />
          {!c.extras.includes("panda") && (
            <>
              <circle cx="55" cy="50" r="8" fill={inner} />
              <circle cx="145" cy="50" r="8" fill={inner} />
            </>
          )}
        </g>
      );
    case "small":
      return (
        <g>
          <circle cx="58" cy="52" r="13" fill={c.fur} />
          <circle cx="142" cy="52" r="13" fill={c.fur} />
          <circle cx="58" cy="52" r="6.5" fill={c.furDark} />
          <circle cx="142" cy="52" r="6.5" fill={c.furDark} />
        </g>
      );
    case "pointy":
      return (
        <g>
          <path d="M44 66 L52 18 L86 46 Z" fill={c.fur} />
          <path d="M156 66 L148 18 L114 46 Z" fill={c.fur} />
          <path d="M53 52 L56 30 L73 45 Z" fill={inner} />
          <path d="M147 52 L144 30 L127 45 Z" fill={inner} />
        </g>
      );
    case "long":
      return (
        <g>
          <ellipse cx="74" cy="22" rx="13" ry="38" fill={c.fur} transform="rotate(-12 74 22)" />
          <ellipse cx="126" cy="22" rx="13" ry="38" fill={c.fur} transform="rotate(12 126 22)" />
          <ellipse cx="74" cy="24" rx="6" ry="28" fill={inner} transform="rotate(-12 74 24)" />
          <ellipse cx="126" cy="24" rx="6" ry="28" fill={inner} transform="rotate(12 126 24)" />
        </g>
      );
    case "big":
      return (
        <g>
          <circle cx="50" cy="52" r="26" fill={c.fur} />
          <circle cx="150" cy="52" r="26" fill={c.fur} />
          <circle cx="52" cy="54" r="15" fill={inner} />
          <circle cx="148" cy="54" r="15" fill={inner} />
        </g>
      );
    case "floppy":
      // Drawn again over the head in FrontEars so they hang down the cheeks.
      return null;
    case "tufts":
      return (
        <g fill={c.furDark}>
          <path d="M50 58 L46 22 L80 44 Z" />
          <path d="M150 58 L154 22 L120 44 Z" />
        </g>
      );
    default:
      return null;
  }
}

function Eyes({ mood, c }: { mood: Mood; c: CritterDef }) {
  const owl = c.species === "owl";
  if (mood === "cheer") {
    return (
      <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M71 89 Q80 78 89 89" />
        <path d="M111 89 Q120 78 129 89" />
      </g>
    );
  }
  if (mood === "sleepy") {
    return (
      <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M71 87 Q80 95 89 87" />
        <path d="M111 87 Q120 95 129 87" />
      </g>
    );
  }
  const lookUp = mood === "think" ? -4 : 0;
  const r = owl ? 9 : 7.5;
  return (
    <g style={{ transform: "translate(calc(var(--look-x, 0) * 4px), calc(var(--look-y, 0) * 3px))", transition: "transform 0.15s ease-out" }}>
      <g className="animate-blink" style={part}>
        <ellipse cx="80" cy={87 + lookUp} rx={r} ry={r + 2} fill={INK} />
        <ellipse cx="120" cy={87 + lookUp} rx={r} ry={r + 2} fill={INK} />
        <circle cx="82.5" cy={83 + lookUp} r="3" fill="#fff" />
        <circle cx="122.5" cy={83 + lookUp} r="3" fill="#fff" />
      </g>
    </g>
  );
}

function Mouth({ mood, c }: { mood: Mood; c: CritterDef }) {
  const y = c.nose === "snout" || c.nose === "pig" ? 6 : 0;
  if (c.nose === "beak" || c.nose === "bill") {
    if (mood === "cheer") return <path d="M92 112 Q100 124 108 112 Z" fill="#7a2e35" />;
    return null;
  }
  if (mood === "cheer") {
    return (
      <g transform={`translate(0 ${y})`}>
        <path d="M86 111 Q100 134 114 111 Z" fill="#7a2e35" />
        <ellipse cx="100" cy="122" rx="7" ry="4.5" fill="#ff8a9a" />
      </g>
    );
  }
  if (mood === "oops") return <ellipse cx="100" cy={116 + y} rx="5" ry="6" fill="#7a2e35" />;
  if (mood === "think") return <path d={`M92 ${115 + y} Q100 ${113 + y} 108 ${117 + y}`} stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />;
  return (
    <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" transform={`translate(0 ${y})`}>
      <path d="M100 108 V112" />
      <path d="M100 112 Q93 120 86 113" />
      <path d="M100 112 Q107 120 114 113" />
    </g>
  );
}

function NoseLayer({ c }: { c: CritterDef }) {
  switch (c.nose) {
    case "beak":
      return <path d="M91 98 L109 98 L100 114 Z" fill={c.noseColour} stroke="#e08a1f" strokeWidth="2" strokeLinejoin="round" />;
    case "bill":
      return (
        <g>
          <path d="M84 98 Q100 92 116 98 L108 120 Q100 124 92 120 Z" fill={c.noseColour} />
          <path d="M90 104 Q100 100 110 104" stroke="#ffd23d" strokeWidth="4" fill="none" />
          <path d="M84 98 Q100 92 116 98" stroke="#ffd23d" strokeWidth="3" fill="none" />
        </g>
      );
    case "big":
      return (
        <g>
          <ellipse cx="100" cy="100" rx="14" ry="11" fill={c.noseColour} />
          <ellipse cx="95" cy="96.5" rx="4.5" ry="2.5" fill="#fff" opacity="0.45" />
        </g>
      );
    case "pig":
      return (
        <g>
          <ellipse cx="100" cy="104" rx="17" ry="12" fill={c.noseColour} stroke={c.furDark} strokeWidth="2.5" />
          <ellipse cx="94" cy="104" rx="3" ry="4.5" fill="#9b4a5e" />
          <ellipse cx="106" cy="104" rx="3" ry="4.5" fill="#9b4a5e" />
        </g>
      );
    case "dots":
      return (
        <g fill={c.noseColour}>
          <ellipse cx="94" cy="101" rx="2.5" ry="3" />
          <ellipse cx="106" cy="101" rx="2.5" ry="3" />
        </g>
      );
    case "snout":
      return (
        <g>
          <ellipse cx="100" cy="106" rx="24" ry="16" fill={c.furDark} opacity="0.35" />
          <ellipse cx="91" cy="104" rx="4" ry="5" fill={INK} />
          <ellipse cx="109" cy="104" rx="4" ry="5" fill={INK} />
        </g>
      );
    default:
      return (
        <g>
          <ellipse cx="100" cy="101" rx="11" ry="8" fill={c.noseColour} />
          <ellipse cx="96" cy="98.5" rx="3.5" ry="2" fill="#fff" opacity="0.5" />
        </g>
      );
  }
}

function Arms({ mood, c }: { mood: Mood; c: CritterDef }) {
  const colour = c.extras.includes("panda") ? "#2b2f36" : c.furDark;
  if (mood === "cheer") {
    return (
      <g fill={colour}>
        <ellipse cx="44" cy="112" rx="12" ry="20" transform="rotate(-35 44 112)" />
        <ellipse cx="156" cy="112" rx="12" ry="20" transform="rotate(35 156 112)" />
      </g>
    );
  }
  if (mood === "wave") {
    return (
      <g fill={colour}>
        <ellipse cx="80" cy="146" rx="13" ry="10" />
        <g className="animate-wave" style={{ transformBox: "view-box", transformOrigin: "140px 140px" }}>
          <ellipse cx="158" cy="108" rx="12" ry="20" transform="rotate(30 158 108)" />
        </g>
      </g>
    );
  }
  if (mood === "think") {
    return (
      <g fill={colour}>
        <ellipse cx="80" cy="146" rx="13" ry="10" />
        <ellipse cx="124" cy="128" rx="11" ry="13" />
      </g>
    );
  }
  return (
    <g>
      {c.extras.includes("shell") && (
        <>
          <path d="M88 152 Q100 132 112 152 Q100 158 88 152 Z" fill="#ffb4c6" stroke="#f08aa5" strokeWidth="2" />
          <path d="M100 138 V154 M94 142 L96 153 M106 142 L104 153" stroke="#f08aa5" strokeWidth="1.6" />
        </>
      )}
      <g fill={colour}>
        <ellipse cx="82" cy="148" rx="12" ry="9.5" />
        <ellipse cx="118" cy="148" rx="12" ry="9.5" />
      </g>
    </g>
  );
}

function BackLayer({ c }: { c: CritterDef }) {
  return (
    <g>
      {c.extras.includes("turtle") && (
        <g>
          <ellipse cx="100" cy="160" rx="70" ry="44" fill="#8a6b3a" />
          <ellipse cx="100" cy="158" rx="62" ry="38" fill="#b48a4a" />
          <path d="M70 140 L100 128 L130 140 L130 172 L100 184 L70 172 Z" fill="#9c7740" opacity="0.6" />
        </g>
      )}
      {c.extras.includes("mane") && (
        <g fill="#c4622d">
          <circle cx="100" cy="92" r="66" />
          {MANE.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="17" />
          ))}
        </g>
      )}
      {c.extras.includes("spikes") && <path d={`M${SPIKES} Z`} fill={c.furDark} strokeLinejoin="round" />}
      {c.extras.includes("dragon") && (
        <g strokeWidth="2.5" strokeLinejoin="round">
          <g fill="#8fd6e8" stroke="#4fa7c2">
            <path d="M58 146 L14 104 Q22 120 18 132 Q30 130 34 142 Q42 140 46 152 Z" />
            <path d="M142 146 L186 104 Q178 120 182 132 Q170 130 166 142 Q158 140 154 152 Z" />
          </g>
          <g fill="#ffe6a3" stroke="#e0b44a">
            <path d="M66 52 L58 16 L86 40 Z" />
            <path d="M134 52 L142 16 L114 40 Z" />
          </g>
        </g>
      )}
      {c.extras.includes("bumps") && (
        <g fill={c.fur}>
          <circle cx="72" cy="46" r="18" />
          <circle cx="128" cy="46" r="18" />
        </g>
      )}
      {c.extras.includes("antlers") && (
        <g fill="#d9b277" stroke="#b88d4f" strokeWidth="2" strokeLinejoin="round">
          <path d="M60 50 C40 40 30 20 38 10 C42 22 50 26 54 24 C52 14 56 6 62 4 C62 16 66 26 70 30 C72 22 78 16 84 16 C80 28 76 40 68 52 Z" />
          <path d="M140 50 C160 40 170 20 162 10 C158 22 150 26 146 24 C148 14 144 6 138 4 C138 16 134 26 130 30 C128 22 122 16 116 16 C120 28 124 40 132 52 Z" />
        </g>
      )}
    </g>
  );
}

function FaceExtras({ c }: { c: CritterDef }) {
  // The puffin's white face sits under everything else.
  if (!c.extras.includes("puffin")) return null;
  return <path d="M52 92 Q60 60 100 56 Q140 60 148 92 Q140 120 100 124 Q60 120 52 92 Z" fill="#f7f8fb" />;
}

/** Patterns painted on the head, under the eyes. */
function HeadMarks({ c }: { c: CritterDef }) {
  return (
    <g>
      {c.extras.includes("stripes") && (
        <g stroke={c.furDark} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M100 36 V52" />
          <path d="M86 38 Q88 46 85 54" />
          <path d="M114 38 Q112 46 115 54" />
        </g>
      )}
      {c.extras.includes("skunk") && <path d="M90 36 Q100 32 110 36 L104 70 Q100 74 96 70 Z" fill="#ffffff" />}
      {c.extras.includes("patch") && <ellipse cx="121" cy="86" rx="17" ry="16" fill={c.furDark} opacity="0.55" />}
      {c.extras.includes("sloth") && (
        <g fill="#6b5646">
          <ellipse cx="76" cy="91" rx="20" ry="11" transform="rotate(18 76 91)" />
          <ellipse cx="124" cy="91" rx="20" ry="11" transform="rotate(-18 124 91)" />
        </g>
      )}
    </g>
  );
}

/** Ears that hang down in front of the head, like a puppy's. */
function FrontEars({ c }: { c: CritterDef }) {
  if (c.ears !== "floppy") return null;
  return (
    <g fill={c.furDark}>
      <path d="M62 44 Q34 40 34 76 Q34 104 48 112 Q60 100 62 76 Q66 56 62 44 Z" />
      <path d="M138 44 Q166 40 166 76 Q166 104 152 112 Q140 100 138 76 Q134 56 138 44 Z" />
    </g>
  );
}

function TopExtras({ c }: { c: CritterDef }) {
  return (
    <g>
      {c.extras.includes("teeth") && (
        <g>
          <rect x="92" y="111" width="8" height="10" rx="2" fill="#fff" stroke="#d9d2c4" strokeWidth="1.2" />
          <rect x="100" y="111" width="8" height="10" rx="2" fill="#fff" stroke="#d9d2c4" strokeWidth="1.2" />
        </g>
      )}
      {c.extras.includes("glasses") && (
        <g fill="none" stroke="#2b2f45" strokeWidth="3.5">
          <circle cx="80" cy="87" r="15" />
          <circle cx="120" cy="87" r="15" />
          <path d="M95 86 Q100 82 105 86" />
        </g>
      )}
      {c.extras.includes("goggles") && (
        <g>
          <rect x="52" y="52" width="96" height="10" rx="5" fill="#4b5563" />
          <circle cx="78" cy="56" r="14" fill="#9fe3ff" stroke="#4b5563" strokeWidth="4" />
          <circle cx="122" cy="56" r="14" fill="#9fe3ff" stroke="#4b5563" strokeWidth="4" />
          <ellipse cx="74" cy="52" rx="4" ry="3" fill="#fff" opacity="0.8" />
          <ellipse cx="118" cy="52" rx="4" ry="3" fill="#fff" opacity="0.8" />
        </g>
      )}
      {c.extras.includes("hat") && (
        <g>
          <ellipse cx="100" cy="44" rx="58" ry="12" fill="#5f8a3a" />
          <path d="M66 44 Q66 14 100 12 Q134 14 134 44 Z" fill="#76a64a" />
          <rect x="66" y="34" width="68" height="8" fill="#e6b422" />
        </g>
      )}
      {c.extras.includes("horn") && (
        <g>
          <path d="M96 40 L100 0 L104 40 Z" fill="#f3ead2" stroke="#d6c9a5" strokeWidth="2" strokeLinejoin="round" />
          <path d="M97 30 L103 26 M98 20 L102 17 M99 11 L101 9" stroke="#d6c9a5" strokeWidth="1.5" />
        </g>
      )}
      {c.extras.includes("toque") && (
        <g>
          <path d="M52 60 Q52 22 100 20 Q148 22 148 60 Z" fill="#e0433a" />
          <rect x="48" y="52" width="104" height="14" rx="7" fill="#b72f28" />
          <path d="M60 58 h80" stroke="#fff" strokeWidth="3" strokeDasharray="6 6" />
          <circle cx="100" cy="18" r="11" fill="#ffffff" stroke="#e4e6ec" strokeWidth="2" />
        </g>
      )}
      {c.extras.includes("tuft") && (
        <g fill="none" stroke={c.furDark} strokeWidth="5" strokeLinecap="round">
          <path d="M100 36 Q96 22 104 14" />
          <path d="M100 36 Q88 28 86 18" />
          <path d="M100 36 Q112 28 116 20" />
        </g>
      )}
      {c.extras.includes("unicorn") && (
        <g>
          <path d="M60 52 Q62 30 84 30 Q78 40 86 46 Q74 44 70 56 Z" fill="#c9a3f5" />
          <path d="M70 46 Q76 32 94 34 Q86 42 92 50 Q82 46 78 56 Z" fill="#ff9fcf" />
          <path d="M94 40 L100 2 L106 40 Z" fill="#ffd45e" stroke="#e0a91f" strokeWidth="2" strokeLinejoin="round" />
          <path d="M96 30 L104 26 M97 20 L103 17 M98 11 L102 9" stroke="#e0a91f" strokeWidth="1.5" />
        </g>
      )}
      {c.extras.includes("scarf") && (
        <g>
          <path d="M56 128 Q100 146 144 128 L144 140 Q100 158 56 140 Z" fill="#4f8ef7" />
          <rect x="118" y="134" width="14" height="28" rx="4" fill="#3b78e0" />
        </g>
      )}
    </g>
  );
}

/** What a buddy has grown into: a bow tie, a cape, a medal and a crown as the child levels up. */
function GrowthBack({ stage }: { stage: number }) {
  if (stage < 3) return null;
  return <path d="M62 128 Q36 170 48 204 Q100 190 152 204 Q164 170 138 128 Q100 144 62 128 Z" fill="#c43a7c" opacity="0.95" />;
}

function GrowthFront({ stage }: { stage: number }) {
  if (stage < 2) return null;
  return (
    <g>
      <path d="M100 152 L80 140 L80 164 Z M100 152 L120 140 L120 164 Z" fill="#e9559a" stroke="#c43a7c" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="100" cy="152" r="6" fill="#c43a7c" />
      {stage >= 4 && (
        <g>
          <path d="M92 172 L92 190 L100 184 L108 190 L108 172 Z" fill="#4f8ef7" />
          <circle cx="100" cy="171" r="10" fill="#f0bd2a" stroke="#b88905" strokeWidth="2" />
          <path d="M100 165 L102 169 L106 169 L103 172 L104 176 L100 174 L96 176 L97 172 L94 169 L98 169 Z" fill="#fff4cc" />
        </g>
      )}
    </g>
  );
}

function GrowthTop({ stage }: { stage: number }) {
  if (stage < 5) return null;
  return (
    <g>
      <path d="M68 40 L72 12 L86 28 L100 6 L114 28 L128 12 L132 40 Z" fill="#f0bd2a" stroke="#b88905" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="72" cy="12" r="4" fill="#e9559a" />
      <circle cx="100" cy="6" r="4" fill="#4f8ef7" />
      <circle cx="128" cy="12" r="4" fill="#25b47e" />
    </g>
  );
}

const heart = (x: number, y: number, scale: number, rotate: number, fill: string) => (
  <path
    d="M0 6 C-14 -4 -12 -16 -5 -16 C-2 -16 0 -13 0 -11 C0 -13 2 -16 5 -16 C12 -16 14 -4 0 6Z"
    transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    fill={fill}
  />
);

/** The hat or ears a character wears while a holiday theme is on (see src/lib/holidays.ts). Sits on the top of the head. */
export function HolidayHat({ holiday }: { holiday: HolidayId }) {
  switch (holiday) {
    case "christmas":
      return (
        <g data-holiday="christmas">
          <path d="M62 42 Q64 8 104 6 Q136 6 152 30 L142 42 Z" fill="#d93a3a" />
          <rect x="56" y="34" width="90" height="15" rx="7.5" fill="#ffffff" />
          <circle cx="152" cy="30" r="10" fill="#ffffff" />
        </g>
      );
    case "easter":
      return (
        <g data-holiday="easter">
          <g transform="rotate(-12 80 40)">
            <ellipse cx="80" cy="8" rx="13" ry="34" fill="#ffffff" stroke="#e4d9ee" strokeWidth="2" />
            <ellipse cx="80" cy="10" rx="6.5" ry="24" fill="#ffb3c7" />
          </g>
          <g transform="rotate(12 120 40)">
            <ellipse cx="120" cy="8" rx="13" ry="34" fill="#ffffff" stroke="#e4d9ee" strokeWidth="2" />
            <ellipse cx="120" cy="10" rx="6.5" ry="24" fill="#ffb3c7" />
          </g>
          <path d="M62 44 Q100 30 138 44" fill="none" stroke="#b9a4e8" strokeWidth="7" strokeLinecap="round" />
        </g>
      );
    case "halloween":
      return (
        <g data-holiday="halloween">
          <ellipse cx="100" cy="42" rx="60" ry="11" fill="#2f2350" />
          <path d="M70 42 Q86 16 108 -10 Q116 -14 118 -6 Q116 14 130 42 Z" fill="#4b3480" />
          <path d="M70 40 Q100 48 130 40 L129 30 Q100 38 71 30 Z" fill="#ff8a1f" />
          <rect x="94" y="30" width="12" height="12" rx="2" fill="none" stroke="#ffd166" strokeWidth="3" />
        </g>
      );
    case "stpatricks":
      return (
        <g data-holiday="stpatricks">
          <ellipse cx="100" cy="42" rx="58" ry="10" fill="#1f8f4e" />
          <rect x="72" y="4" width="56" height="38" rx="6" fill="#2fae62" />
          <rect x="72" y="28" width="56" height="9" fill="#0f5132" />
          <rect x="94" y="26" width="12" height="13" rx="2" fill="none" stroke="#f0bd2a" strokeWidth="3" />
        </g>
      );
    case "valentines":
      return (
        <g data-holiday="valentines">
          <path d="M76 40 Q74 28 74 24 M124 40 Q126 28 126 24" fill="none" stroke="#e0507a" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 44 Q100 32 138 44" fill="none" stroke="#e0507a" strokeWidth="6" strokeLinecap="round" />
          {heart(74, 16, 1.5, -14, "#ff4f7b")}
          {heart(126, 16, 1.5, 14, "#ff4f7b")}
        </g>
      );
    case "thanksgiving":
      return (
        <g data-holiday="thanksgiving">
          <path d="M60 44 Q100 30 140 44" fill="none" stroke="#9a5a22" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="72" cy="30" rx="8" ry="15" fill="#e8741c" transform="rotate(-35 72 30)" />
          <ellipse cx="88" cy="22" rx="8" ry="16" fill="#f0bd2a" transform="rotate(-12 88 22)" />
          <ellipse cx="112" cy="22" rx="8" ry="16" fill="#c8402a" transform="rotate(12 112 22)" />
          <ellipse cx="128" cy="30" rx="8" ry="15" fill="#e8741c" transform="rotate(35 128 30)" />
        </g>
      );
  }
}

export function CritterSvg({ id, mood = "happy", stage = 1, holiday = currentHoliday() }: { id: string; mood?: Mood; stage?: number; holiday?: HolidayId | null }) {
  const c = getCritter(id);
  const headFill = c.extras.includes("panda") ? "#ffffff" : c.fur;
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true" overflow="visible">
      <GrowthBack stage={stage} />
      <BackLayer c={c} />
      <ellipse cx="100" cy="162" rx="58" ry="40" fill={c.extras.includes("turtle") ? c.fur : c.extras.includes("panda") ? "#2b2f36" : c.fur} />
      <ellipse cx="100" cy="168" rx="38" ry="27" fill={c.belly} />
      <GrowthFront stage={stage} />
      <Arms mood={mood} c={c} />
      <g className={mood === "oops" ? "animate-wiggle" : undefined} style={{ ...part, transformOrigin: "50% 80%" }}>
        <EarsLayer c={c} />
        <circle cx="100" cy="90" r="56" fill={headFill} />
        <FaceExtras c={c} />
        {c.nose !== "bill" && <ellipse cx="100" cy="101" rx="45" ry="36" fill={c.face} opacity={c.extras.includes("panda") ? 0 : 1} />}
        <HeadMarks c={c} />
        <FrontEars c={c} />
        {c.extras.includes("mask") && (
          <path d="M58 80 Q80 66 100 82 Q120 66 142 80 Q140 98 120 98 Q108 98 100 90 Q92 98 80 98 Q60 98 58 80 Z" fill="#3b3f46" />
        )}
        {c.extras.includes("panda") && (
          <g fill="#2b2f36">
            <ellipse cx="78" cy="88" rx="15" ry="18" transform="rotate(-20 78 88)" />
            <ellipse cx="122" cy="88" rx="15" ry="18" transform="rotate(20 122 88)" />
          </g>
        )}
        <ellipse cx="80" cy="64" rx="10" ry="5" fill="#ffffff" opacity="0.18" />
        <Eyes mood={mood} c={c} />
        <circle cx="66" cy="106" r="8" fill="#ff9fb0" opacity="0.55" />
        <circle cx="134" cy="106" r="8" fill="#ff9fb0" opacity="0.55" />
        {c.nose === "button" && !NO_WHISKERS.has(c.species) && (
          <g stroke="#c9a98a" strokeWidth="2" strokeLinecap="round">
            <path d="M80 104 L56 99" />
            <path d="M80 109 L55 110" />
            <path d="M120 104 L144 99" />
            <path d="M120 109 L145 110" />
          </g>
        )}
        <NoseLayer c={c} />
        <Mouth mood={mood} c={c} />
        <TopExtras c={c} />
        <GrowthTop stage={stage} />
        {holiday && stage < 5 && <HolidayHat holiday={holiday} />}
        {mood === "sleepy" && (
          // Drawn as lines, not <text>: letters inside the SVG would join the name of a button the critter
          // sits in ("Pat your buddy"), which axe flags as a label mismatch.
          <g data-part="zz" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
            <path d="M151 37h12l-12 15h12" />
            <path d="M167 22h8l-8 10h8" />
          </g>
        )}
        {mood === "think" && (
          <g fill="#4f8ef7">
            <circle cx="160" cy="40" r="5" />
            <circle cx="172" cy="26" r="7" />
          </g>
        )}
      </g>
    </svg>
  );
}

