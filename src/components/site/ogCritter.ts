import { isValidElement, type ReactNode } from "react";
import { CritterSvg, type Mood } from "@/components/CritterArt";

// Share images draw the subject's guide from the same SVG the app uses. The
// image renderer can't run CSS (eye-follow variables, animation classes), so
// this walks the critter's elements into plain SVG markup without them, and the
// card shows it as an <img>.

/** The guide for each subject, as in the app; Ollie for everything else. */
export const SUBJECT_CRITTER: Record<string, string> = {
  math: "hoot",
  language: "ruby",
  science: "bolt",
  social: "juniper",
};

export function critterFor(subject: string | undefined): string {
  return (subject && SUBJECT_CRITTER[subject]) || "ollie";
}

const SKIP = new Set(["style", "className", "children", "key", "ref", "aria-hidden"]);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const attr = (k: string) => k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function markup(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return esc(String(node));
  if (Array.isArray(node)) return node.map(markup).join("");
  if (!isValidElement(node)) return "";
  const props = node.props as Record<string, unknown>;
  if (typeof node.type === "function") return markup((node.type as (p: unknown) => ReactNode)(props));
  if (typeof node.type !== "string") return markup(props.children as ReactNode);
  const attrs = Object.entries(props)
    .filter(([k, v]) => !SKIP.has(k) && v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k === "viewBox" ? k : attr(k)}="${esc(String(v))}"`)
    .join("");
  return `<${node.type}${attrs}>${markup(props.children as ReactNode)}</${node.type}>`;
}

/** A critter as standalone SVG markup, sized `px` square. */
export function critterSvg(id: string, mood: Mood = "cheer", px = 400): string {
  return markup(CritterSvg({ id, mood }))
    .replace('width="100%" height="100%"', `width="${px}" height="${px}" xmlns="http://www.w3.org/2000/svg"`);
}

/** The same, as a data URI for an <img> in a share image. */
export function critterDataUri(id: string, mood: Mood = "cheer", px = 400): string {
  return `data:image/svg+xml;base64,${Buffer.from(critterSvg(id, mood, px)).toString("base64")}`;
}
