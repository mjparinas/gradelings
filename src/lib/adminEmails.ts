import { APP_NAME } from "./brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, SUBSCRIBE_HREF } from "./plan";

// Emails the owner sends from the admin panel: ready-made messages and the groups they can go to. Shared by
// the panel (to preview) and the server (to send). `{children}` becomes the children's first names only when the
// email is sent, so the panel never shows them; `{app}` is the app's name.

export interface AdminMessage {
  subject: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  /** A button to a page of the site (a path starting with /), or none. */
  button: { label: string; path: string } | null;
}

export interface MessagePreset extends AdminMessage {
  id: string;
  name: string;
  /** Who it suits, for the picker. */
  when: string;
}

export const MESSAGE_PRESETS: MessagePreset[] = [
  {
    id: "miss-you",
    name: "Ollie misses you",
    when: "Families who have gone quiet",
    subject: "Ollie misses {children}!",
    body: "Ollie the Otter has been looking for {children}. Every lesson is right where it was left.\n\nA short session today, even 10 minutes, picks the momentum right back up. There's no streak to lose and nothing to catch up on.",
    button: { label: "Play now", path: "/play/" },
  },
  {
    id: "getting-started",
    name: "Getting started",
    when: "New families who haven't practised yet",
    subject: "Getting started with {app}",
    body: "Thanks for signing up! The quickest way to start: add your child in the Parent area (a first name and grade is all it needs), then tap Adventure. It picks lessons for their grade, so there's nothing to set up.\n\nOne 10-minute session is a great first step, and your free trial has everything switched on.",
    button: { label: "Start playing", path: "/play/" },
  },
  {
    id: "trial-ending",
    name: "Trial ending",
    when: "Trials ending soon",
    subject: "Your {app} free trial ends soon",
    body: `Thanks for trying {app} with {children}. Your free trial ends soon.\n\nSubscribe to keep every lesson, game and report open for up to ${MAX_CHILDREN} children. If you'd rather not, the first ${FREE_UNITS_PER_COURSE} units of every course stay free forever.`,
    button: { label: "See the family plan", path: SUBSCRIBE_HREF },
  },
  {
    id: "come-back",
    name: "Free lessons are waiting",
    when: "Trial over, not paying",
    subject: "Free lessons are still waiting for {children}",
    body: `Your trial has ended, but the first ${FREE_UNITS_PER_COURSE} units of every course stay free forever, and Ollie is still around.\n\nWhenever you'd like everything unlocked again, the family plan covers up to ${MAX_CHILDREN} children.`,
    button: { label: "Open {app}", path: "/play/" },
  },
  {
    id: "feedback",
    name: "Ask why they left",
    when: "Recent cancellations",
    subject: "Could you tell us what didn't work?",
    body: "You recently cancelled your {app} subscription. We're a small team, and hearing why helps us more than anything.\n\nJust reply to this email with a line or two. Thank you for giving us a try.",
    button: null,
  },
  { id: "custom", name: "Write your own", when: "Anything else", subject: "", body: "", button: null },
];

export const SEGMENTS = {
  "quiet-7": { name: "Gone quiet", description: "Practised before, but not in the last 7 days (up to 60)." },
  "never-practised": { name: "Never practised", description: "Signed up 2 or more days ago, and no child has practised yet." },
  "trial-ending": { name: "Trial ending", description: "Trial ends in the next 7 days, not paying, no code access." },
  "trial-over": { name: "Trial over, not paying", description: "Trial ended in the last 60 days, not paying, no code access." },
  cancelled: { name: "Cancelled", description: "Cancelled a subscription in the last 90 days." },
  everyone: { name: "Everyone", description: "Every account that can get news and tips." },
} as const;
export type Segment = keyof typeof SEGMENTS;
export const isSegment = (v: unknown): v is Segment => typeof v === "string" && Object.hasOwn(SEGMENTS, v);

/** A group send skips families that got an email from the panel this recently, so nobody gets two in a row. */
export const ADMIN_MAIL_GAP_DAYS = 3;
/** The most a group send emails in one go; sending again continues with the rest. */
export const SEND_BATCH = 100;

export const LIMITS = { subject: 150, body: 5000, buttonLabel: 40, path: 200 };

/** Checks a message from the panel. Returns an error to show, or null. */
export function messageProblem(m: unknown): string | null {
  if (!m || typeof m !== "object") return "Write a message first.";
  const { subject, body, button } = m as Partial<AdminMessage>;
  if (typeof subject !== "string" || !subject.trim()) return "Add a subject.";
  if (typeof body !== "string" || !body.trim()) return "Add a message.";
  if (subject.length > LIMITS.subject) return `Keep the subject under ${LIMITS.subject} characters.`;
  if (body.length > LIMITS.body) return `Keep the message under ${LIMITS.body} characters.`;
  if (button != null) {
    if (typeof button !== "object" || typeof button.label !== "string" || typeof button.path !== "string") return "The button needs a label and a page.";
    if (!button.label.trim() || button.label.length > LIMITS.buttonLabel) return `Give the button a label under ${LIMITS.buttonLabel} characters.`;
    if (!/^\/(?!\/)[^\s]*$/.test(button.path) || button.path.length > LIMITS.path) return "The button must open a page of this site, like /play/.";
  }
  return null;
}

/** "Sam", "Sam and Ava", "Sam, Ava and Lee"; with no names, "your child". */
export function joinNames(names: string[]): string {
  if (!names.length) return "your child";
  return names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** Fills the placeholders. The panel passes no names, so its preview shows a stand-in. */
export function fillMessage(text: string, names: string[] | null): string {
  return text.replaceAll("{app}", APP_NAME).replaceAll("{children}", names === null ? "[child's first name]" : joinNames(names));
}

export const paragraphs = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
