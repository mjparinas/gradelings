import { APP_NAME } from "./brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN } from "./plan";

// Saved replies for the admin panel's inbox: answers to common questions, inserted into a reply and edited
// before sending. The owner can change them; until then these are used. `{app}` becomes the app's name.

export interface SavedReply {
  id: string;
  title: string;
  body: string;
}

export const DEFAULT_REPLIES: SavedReply[] = [
  {
    id: "billing",
    title: "Billing and cancelling",
    body: `Thanks for getting in touch. You can see your plan, update your card or cancel any time in the Parent area under Subscription. If you cancel, everything stays open until the end of the period you've paid for, and the first ${FREE_UNITS_PER_COURSE} units of every course stay free after that.\n\nIf something was charged by mistake, just reply and I'll sort it out.`,
  },
  {
    id: "add-child",
    title: "Adding a child",
    body: `Happy to help! Open the Parent area, go to Children and tap "Add a child". A first name and grade is all it needs, and the family plan covers up to ${MAX_CHILDREN} children. Each child then picks their own player on the home screen.`,
  },
  {
    id: "delete-account",
    title: "Deleting an account",
    body: "You can delete your account and everything in it any time: Parent area, Account, then Delete account. It removes every child's progress for good and cancels any subscription. If you'd like me to do it for you, just reply to confirm.",
  },
  {
    id: "thanks",
    title: "Thanks for the feedback",
    body: `Thank you so much for taking the time to write. I read every message, and feedback like yours shapes what we build next in {app}.`,
  },
];

export const REPLY_LIMITS = { count: 30, title: 60, body: 5000 };

/** Checks a list from the panel. Returns an error to show, or null. */
export function repliesProblem(list: unknown): string | null {
  if (!Array.isArray(list)) return "Send a list of replies.";
  if (list.length > REPLY_LIMITS.count) return `Keep it to ${REPLY_LIMITS.count} saved replies.`;
  const ids = new Set<string>();
  for (const r of list as Partial<SavedReply>[]) {
    if (!r || typeof r.id !== "string" || !/^[a-z0-9-]{1,40}$/.test(r.id) || ids.has(r.id)) return "Each reply needs its own id.";
    ids.add(r.id);
    if (typeof r.title !== "string" || !r.title.trim() || r.title.length > REPLY_LIMITS.title) return `Give each reply a title under ${REPLY_LIMITS.title} characters.`;
    if (typeof r.body !== "string" || !r.body.trim() || r.body.length > REPLY_LIMITS.body) return `Keep each reply under ${REPLY_LIMITS.body} characters.`;
  }
  return null;
}

export const fillReply = (body: string) => body.replaceAll("{app}", APP_NAME);
