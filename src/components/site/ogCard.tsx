import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/brand";
import { critterDataUri } from "./ogCritter";

// The share cards that link previews show (Facebook, WhatsApp, iMessage, Slack, Pinterest...).
// Shapes, the subject's guide critter and text in our own fonts (committed in assets/fonts, OFL),
// so every card builds offline. No emoji: the renderer has no emoji font.

export const OG_SIZE = { width: 1200, height: 630 };
/** Pinterest's tall pin. */
export const PIN_SIZE = { width: 1000, height: 1500 };
export const OG_TYPE = "image/png";

const DOTS = ["#4f8ef7", "#e9559a", "#25b47e", "#ff9636", "#ffc233"];
const INK = "#253047";
const SOFT = "#5b6680";
/** Text on a bright fill is dark navy, never white (`onColour` in src/lib/contrast.ts). */
const ON_FILL = "#0f172a";

export interface OgQuestion {
  prompt: string;
  /** Answer choices; none for a typed answer. The answer itself is never on the card. */
  choices?: string[];
  /** After a typed answer's box, such as "cm". */
  suffix?: string;
}

export interface OgCardText {
  /** Small line above the title, such as "British Columbia curriculum". */
  kicker: string;
  title: string;
  /** One line under the title, such as a few unit names. */
  line?: string;
  /** The accent: a subject colour, or the brand blue. */
  colour?: string;
  /** The guide drawn on the card (a critter id); Ollie when unset. */
  critter?: string;
  /** A sample question, for "Can your Grade 4 solve this?" cards. */
  question?: OgQuestion;
  /** The tall card's list (up to 6), such as a worksheet's units. */
  items?: string[];
  /** A border colour per item, such as each subject's colour; the accent when unset. */
  itemColours?: string[];
}

/** Long titles shrink so they never spill off the card. */
export function titleSize(title: string): number {
  if (title.length <= 22) return 92;
  if (title.length <= 36) return 76;
  if (title.length <= 52) return 62;
  return 52;
}

const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

type Font = { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" };
let fonts: Promise<Font[]> | undefined;

function loadFonts(): Promise<Font[]> {
  // Whole literal paths, so the deployment's file tracing bundles the fonts with each image route.
  fonts ??= Promise.all([
    readFile(join(process.cwd(), "assets/fonts/fredoka-600.woff")),
    readFile(join(process.cwd(), "assets/fonts/fredoka-700.woff")),
    readFile(join(process.cwd(), "assets/fonts/andika-400.woff")),
  ]).then(([f6, f7, a4]) => [
    { name: "Fredoka", data: f6, weight: 600, style: "normal" },
    { name: "Fredoka", data: f7, weight: 700, style: "normal" },
    { name: "Andika", data: a4, weight: 400, style: "normal" },
  ]);
  return fonts;
}

function Brand({ size = 40 }: { size?: number }) {
  const dot = Math.round(size * 0.72);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: Math.round(dot / 2) }}>
      {DOTS.map((c) => (
        <div key={c} style={{ width: dot, height: dot, borderRadius: dot, background: c }} />
      ))}
      <div style={{ display: "flex", marginLeft: 12, fontSize: size, fontWeight: 700, color: "#2f6fd6" }}>{APP_NAME}</div>
    </div>
  );
}

/** The guide in a soft disc of the accent colour. */
function Guide({ critter, colour, size, mood = "cheer" }: { critter: string; colour: string; size: number; mood?: "cheer" | "think" | "happy" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size, borderRadius: size, background: `${colour}2e` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not a page */}
      <img src={critterDataUri(critter, mood)} width={Math.round(size * 0.86)} height={Math.round(size * 0.86)} alt="" />
    </div>
  );
}

function Button({ text, colour, size = 30, centre = false }: { text: string; colour: string; size?: number; centre?: boolean }) {
  return (
    <div style={{ display: "flex", alignSelf: centre ? "center" : "flex-start", padding: `${Math.round(size * 0.45)}px ${Math.round(size * 1.1)}px`, borderRadius: 999, background: colour, color: ON_FILL, fontSize: size, fontWeight: 700 }}>
      {text}
    </div>
  );
}

function QuestionBox({ q, colour }: { q: OgQuestion; colour: string }) {
  const promptSize = q.prompt.length <= 50 ? 40 : q.prompt.length <= 80 ? 34 : 29;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "26px 30px", borderRadius: 28, background: "#ffffff", border: `4px solid ${colour}` }}>
      <div style={{ display: "flex", fontFamily: "Andika", fontSize: promptSize, color: INK, lineHeight: 1.25 }}>{clip(q.prompt, 120)}</div>
      {q.choices?.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {q.choices.slice(0, 4).map((c) => (
            <div key={c} style={{ display: "flex", padding: "8px 22px", borderRadius: 16, background: "#f3f1ec", border: "3px solid #e3e2de", fontFamily: "Andika", fontSize: 30, color: INK }}>
              {clip(c, 28)}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", width: 200, height: 58, borderRadius: 14, background: "#f3f1ec", border: "3px dashed #b9b7b0" }} />
          {q.suffix && <div style={{ display: "flex", fontFamily: "Andika", fontSize: 30, color: SOFT }}>{q.suffix}</div>}
        </div>
      )}
    </div>
  );
}

function Wide({ kicker, title, line, colour = "#4f8ef7", critter = "ollie", question }: OgCardText) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", background: "#fffaf1", color: INK, fontFamily: "Fredoka" }}>
      <Brand />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 36 }}>
        <div style={{ display: "flex", flexDirection: "column", width: question ? 760 : 700 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: SOFT }}>{clip(kicker, question ? 52 : 46)}</div>
          <div style={{ display: "flex", width: 150, height: 12, borderRadius: 6, background: colour, marginTop: 14, marginBottom: 14 }} />
          {question && <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.05, marginBottom: 20 }}>{clip(title, 40)}</div>}
          {question && <QuestionBox q={question} colour={colour} />}
          {!question && <div style={{ display: "flex", fontSize: Math.min(titleSize(title), 84), fontWeight: 700, letterSpacing: -1, lineHeight: 1.05 }}>{clip(title, 70)}</div>}
          {!question && line && <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: SOFT, marginTop: 20 }}>{clip(line, 70)}</div>}
        </div>
        <Guide critter={critter} colour={colour} size={question ? 300 : 360} mood={question ? "think" : "cheer"} />
      </div>
      <Button text={question ? "See the answer · Try it free" : "Practice that feels like play · Try it free"} colour="#ffc233" />
    </div>
  );
}

function Tall({ kicker, title, line, colour = "#4f8ef7", critter = "ollie", items = [], itemColours = [] }: OgCardText) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "72px 64px", background: "#fffaf1", color: INK, fontFamily: "Fredoka", textAlign: "center" }}>
      <Brand size={46} />
      <Guide critter={critter} colour={colour} size={items.length > 4 ? 320 : 420} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 600, color: SOFT }}>{clip(kicker, 44)}</div>
        <div style={{ display: "flex", width: 180, height: 14, borderRadius: 7, background: colour, marginTop: 18, marginBottom: 18 }} />
        <div style={{ display: "flex", fontSize: Math.min(titleSize(title) + 4, 92), fontWeight: 700, lineHeight: 1.05, justifyContent: "center" }}>{clip(title, 60)}</div>
        {line && <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: SOFT, marginTop: 18 }}>{clip(line, 50)}</div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {items.slice(0, 6).map((it, i) => (
          <div key={it} style={{ display: "flex", padding: "10px 28px", borderRadius: 999, background: "#ffffff", border: `4px solid ${itemColours[i] ?? colour}`, fontSize: 32, fontWeight: 600 }}>
            {clip(it, 34)}
          </div>
        ))}
      </div>
      <Button text="Free printable · Try it free" colour="#ffc233" size={36} centre />
    </div>
  );
}

export async function ogCard(card: OgCardText): Promise<ImageResponse> {
  return new ImageResponse(<Wide {...card} />, { ...OG_SIZE, fonts: await loadFonts() });
}

/** The tall Pinterest card (worksheets). */
export async function pinCard(card: OgCardText): Promise<ImageResponse> {
  return new ImageResponse(<Tall {...card} />, { ...PIN_SIZE, fonts: await loadFonts() });
}
