import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/brand";

// The share card that link previews show (Facebook, WhatsApp, iMessage, Slack...). Shapes and text only
// (no emoji, no fetched fonts), so every card builds offline at build time.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const DOTS = ["#4f8ef7", "#e9559a", "#25b47e", "#ff9636", "#ffc233"];

export interface OgCardText {
  /** Small line above the title, such as "British Columbia curriculum". */
  kicker: string;
  title: string;
  /** One line under the title, such as a few unit names. */
  line?: string;
  /** The accent: a subject colour, or the brand blue. */
  colour?: string;
}

/** Long titles shrink so they never spill off the card. */
export function titleSize(title: string): number {
  if (title.length <= 22) return 92;
  if (title.length <= 36) return 76;
  if (title.length <= 52) return 62;
  return 52;
}

const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

export function ogCard({ kicker, title, line, colour = "#4f8ef7" }: OgCardText): ImageResponse {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#fffaf1", color: "#253047" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {DOTS.map((c) => (
            <div key={c} style={{ width: 30, height: 30, borderRadius: 15, background: c }} />
          ))}
          <div style={{ display: "flex", marginLeft: 12, fontSize: 40, fontWeight: 700, color: "#2f6fd6" }}>{APP_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#5b6680" }}>{clip(kicker, 60)}</div>
          <div style={{ display: "flex", width: 160, height: 12, borderRadius: 6, background: colour, marginTop: 18, marginBottom: 18 }} />
          <div style={{ display: "flex", fontSize: titleSize(title), fontWeight: 700, letterSpacing: -1, lineHeight: 1.08 }}>{clip(title, 80)}</div>
          {line && <div style={{ display: "flex", fontSize: 32, color: "#5b6680", marginTop: 22 }}>{clip(line, 90)}</div>}
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#1f7a58" }}>Practice that feels like play · Try it free</div>
      </div>
    ),
    OG_SIZE,
  );
}
