// The contact form's fixed topics and limits, shared by the page and /api/contact/.

export const CONTACT_TOPICS = [
  { id: "question", label: "A question about the app" },
  { id: "billing", label: "Subscription or billing" },
  { id: "problem", label: "Something isn’t working" },
  { id: "school", label: "Schools and classes" },
  { id: "privacy", label: "A privacy request" },
  { id: "idea", label: "An idea or feedback" },
  { id: "other", label: "Something else" },
] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number]["id"];

export const CONTACT_LIMITS = { name: 60, email: 254, message: 4000, minMessage: 10 } as const;

const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

export interface ContactMessage {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
}

/** Cleans a submitted message, or says what is wrong with it in words a parent can act on. */
export function checkContact(body: unknown): { ok: true; value: ContactMessage } | { ok: false; error: string } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const name = str(b.name).replace(/[\u0000-\u001f\u007f<>]+/g, " ").replace(/\s+/g, " ").trim();
  const email = str(b.email).trim();
  const message = str(b.message).replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b-\u001f\u007f]+/g, "").trim();
  const topic = CONTACT_TOPICS.find((t) => t.id === b.topic)?.id;
  if (name.length > CONTACT_LIMITS.name) return { ok: false, error: `Please keep your name under ${CONTACT_LIMITS.name} characters.` };
  if (email.length > CONTACT_LIMITS.email || !EMAIL.test(email)) return { ok: false, error: "Please enter an email address we can reply to." };
  if (!topic) return { ok: false, error: "Please pick what your message is about." };
  if (message.length < CONTACT_LIMITS.minMessage) return { ok: false, error: "Please tell us a little more." };
  if (message.length > CONTACT_LIMITS.message) return { ok: false, error: `Please keep your message under ${CONTACT_LIMITS.message} characters.` };
  return { ok: true, value: { name, email, topic, message } };
}

export const topicLabel = (id: ContactTopic) => CONTACT_TOPICS.find((t) => t.id === id)!.label;
