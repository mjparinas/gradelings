import { APP_NAME } from "./brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, REFUND_DAYS, SUBSCRIBE_HREF } from "./plan";

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

/** Who a message or group is for: parents (about their children), teachers (about their classes) or both. */
export type Audience = "parents" | "teachers" | "all";

export interface MessagePreset extends AdminMessage {
  id: string;
  name: string;
  /** Who it suits, for the picker. */
  when: string;
  /** Who it is written for. Teachers get no talk of children, trials or the family plan. */
  audience: Audience;
}

export const MESSAGE_PRESETS: MessagePreset[] = [
  {
    id: "miss-you",
    name: "Ollie misses you",
    when: "Families who have gone quiet",
    audience: "parents",
    subject: "Ollie misses {children}!",
    body: "Ollie the Otter has been looking for {children}. Every lesson is right where it was left.\n\nShort, regular sessions are what make skills stick, so a session today, even 10 minutes, picks the momentum right back up. There's no streak to lose and nothing to catch up on.",
    button: { label: "Play now", path: "/play/" },
  },
  {
    id: "getting-started",
    name: "Getting started",
    when: "New families who haven't practised yet",
    audience: "parents",
    subject: "One minute to set up {app}",
    body: "Thanks for signing up! Right now {app} can't match lessons to your child because it doesn't know who's playing. The fix takes about a minute: add your child in the Parent area (a first name and grade is all it needs), then tap Adventure. It picks lessons for their grade, Pre-K to Grade 9, so there's nothing to set up.\n\nOne 10-minute session is enough to see how it works, and your free trial has every lesson, game and progress report open. The earlier they start, the more of the trial they get to use.",
    button: { label: "Add my child and start", path: "/parents/" },
  },
  {
    id: "trial-ending",
    name: "Trial ending",
    when: "Trials ending soon",
    audience: "parents",
    subject: "{children}'s {app} trial ends soon",
    body: `Thanks for trying {app} with {children}. The free trial ends soon, and after that the first ${FREE_UNITS_PER_COURSE} units of every course stay free while the rest close.\n\nThe family plan keeps every unit, game and full progress report open for up to ${MAX_CHILDREN} children, so what {children} has started can keep going. If it isn't right for your family, any payment is refunded in full within ${REFUND_DAYS} days.`,
    button: { label: "Keep everything open", path: SUBSCRIBE_HREF },
  },
  {
    id: "come-back",
    name: "Free lessons are waiting",
    when: "Trial over, not paying",
    audience: "parents",
    subject: "Free lessons are still waiting for {children}",
    body: `Your trial has ended, but the first ${FREE_UNITS_PER_COURSE} units of every course stay free, and Ollie is still around. Pick up where {children} left off today.\n\nWhen you'd like the rest back, the family plan reopens every unit, game and full progress report for up to ${MAX_CHILDREN} children, with a full refund within ${REFUND_DAYS} days if it isn't right for you.`,
    button: { label: "Open {app}", path: "/play/" },
  },
  {
    id: "feedback",
    name: "Ask why they left",
    when: "Recent cancellations",
    audience: "parents",
    subject: "Could you tell us what didn't work?",
    body: "You recently cancelled your {app} subscription. We're a small team, and hearing why helps us more than anything.\n\nJust reply to this email with a line or two. Thank you for giving us a try.",
    button: null,
  },
  {
    id: "keep-going",
    name: "Keep the momentum",
    when: "Practising often, not paying",
    audience: "parents",
    subject: "{children} is on a roll with {app}",
    body: `{children} has been practising on several days, which is exactly how skills stick.\n\nThe family plan keeps every unit, game and full progress report open for up to ${MAX_CHILDREN} children, so that momentum doesn't hit a locked unit. Either way, the first ${FREE_UNITS_PER_COURSE} units of every course stay free, and any payment is refunded in full within ${REFUND_DAYS} days.`,
    button: { label: "Keep everything open", path: SUBSCRIBE_HREF },
  },
  {
    id: "teacher-getting-started",
    name: "Set up your first class",
    when: "Teachers who haven't made a class yet",
    audience: "teachers",
    subject: "Set up your first class on {app}",
    body: "Thanks for signing up as a teacher! A class takes about two minutes: give it a name and a grade, then add your students' first names. Each student gets a code to sign in with, so they need no email or password.\n\nYou choose what to assign by unit, and you see how each student is practising. {app} is free for classes.",
    button: { label: "Open my classes", path: "/teachers/" },
  },
  {
    id: "teacher-add-students",
    name: "Add your students",
    when: "Teachers whose class has no students yet",
    audience: "teachers",
    subject: "Your {app} class is ready for students",
    body: "Your class is set up. The next step is adding students: type their first names or nicknames and {app} makes a sign-in code for each one. You can print the login cards and hand them out.\n\nOnce they're in, assign a unit and watch their practice come in.",
    button: { label: "Add students", path: "/teachers/" },
  },
  {
    id: "teacher-hello",
    name: "A note for teachers",
    when: "Any message to teachers",
    audience: "teachers",
    subject: "A note from {app}",
    body: "Thanks for using {app} with your class.\n\nIf there's something that would make it more useful in your classroom, just reply to this email. A real person reads every reply.",
    button: { label: "Open my classes", path: "/teachers/" },
  },
  { id: "custom", name: "Write your own", when: "Anything else", audience: "all", subject: "", body: "", button: null },
];

export const SEGMENTS = {
  "quiet-7": { audience: "parents", name: "Gone quiet", description: "Practised before, but not in the last 7 days (up to 60)." },
  "never-practised": { audience: "parents", name: "Never practised", description: "Signed up 2 or more days ago, and no child has practised yet." },
  "no-child": { audience: "parents", name: "No child added", description: "Signed up 2 to 60 days ago and hasn't added a child. Teachers are left out." },
  "tried-few": { audience: "parents", name: "Tried it, then stopped", description: "Practised on only 1 or 2 days, nothing in the last 3 days, not paying." },
  "engaged-not-paying": { audience: "parents", name: "Practising often, not paying", description: "Practised on 3 or more days, not paying, no code access." },
  "trial-ending": { audience: "parents", name: "Trial ending", description: "Trial ends in the next 7 days, not paying, no code access." },
  "trial-over": { audience: "parents", name: "Trial over, not paying", description: "Trial ended in the last 60 days, not paying, no code access." },
  cancelled: { audience: "parents", name: "Cancelled", description: "Cancelled a subscription in the last 90 days." },
  "teacher-no-class": { audience: "teachers", name: "Teachers: no class yet", description: "Teacher account made 2 to 60 days ago that hasn't started a class." },
  "teacher-no-students": { audience: "teachers", name: "Teachers: no students yet", description: "Has a class made 3 to 60 days ago with no students in it." },
  teachers: { audience: "teachers", name: "All teachers", description: "Every teacher account that can get news and tips." },
  parents: { audience: "parents", name: "All parents", description: "Every account except teachers that can get news and tips." },
  everyone: { audience: "all", name: "Everyone", description: "Every account that can get news and tips, parents and teachers. Write for both." },
} as const satisfies Record<string, { audience: Audience; name: string; description: string }>;
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
