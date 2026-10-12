// The kinds of email the app sends to accounts, as the admin panel's email log names them.

export const EMAIL_KINDS = {
  verify: "Confirm email",
  reset: "Password reset",
  "new-sign-in": "New sign-in",
  "password-changed": "Password changed",
  "trial-recap": "Trial recap",
  "trial-ending": "Trial ending",
  weekly: "Weekly report",
  reminder: "Practice reminder",
  "class-inactive": "Class inactivity warning",
  "class-invite": "Co-teacher invitation",
  admin: "Sent from the admin panel",
  reply: "Your reply to their email",
} as const;
export type EmailKind = keyof typeof EMAIL_KINDS;

/** What happened to an email: our send result first, then what Resend reported. */
export const EMAIL_STATUSES = {
  sent: "Sent",
  skipped: "Not sent (email not set up)",
  failed: "Failed to send",
  delivered: "Delivered",
  delayed: "Delayed",
  bounced: "Bounced",
  complained: "Marked as spam",
} as const;
export type EmailStatus = keyof typeof EMAIL_STATUSES;

export const emailKindLabel = (k: string) => (EMAIL_KINDS as Record<string, string>)[k] ?? k;
export const emailStatusLabel = (s: string) => (EMAIL_STATUSES as Record<string, string>)[s] ?? s;
