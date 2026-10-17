// Turns off two-step sign-in for one account and signs it out everywhere, for an admin who has lost both their
// authenticator app and their recovery codes (docs/ADMIN.md). Needs access to the database, which is the point:
// there is no button for this in the panel.
//
//   DATABASE_URL=... DATABASE_AUTH_TOKEN=... node scripts/admin-2fa-reset.mjs owner@example.com
//   (or TURSO_DATABASE_URL / TURSO_AUTH_TOKEN; with neither it uses ./data/grademap.db)
//
// The admin then signs in with the password and sets two-step up again.
import { createClient } from "@libsql/client";

const email = (process.argv[2] ?? "").trim().toLowerCase();
if (!email.includes("@")) {
  console.error("Usage: node scripts/admin-2fa-reset.mjs <email>");
  process.exit(1);
}
const env = process.env;
const url = env.DATABASE_URL ?? env.TURSO_DATABASE_URL ?? "file:./data/grademap.db";
const authToken = env.DATABASE_URL ? env.DATABASE_AUTH_TOKEN : env.TURSO_AUTH_TOKEN;
const db = createClient({ url, authToken: authToken || undefined });

const rows = (await db.execute({ sql: "SELECT id, totp_enabled_at FROM parents WHERE email = ?", args: [email] })).rows;
if (!rows.length) {
  console.error(`No account with the email ${email}.`);
  process.exit(1);
}
const id = String(rows[0].id);
if (rows[0].totp_enabled_at == null) console.log("Two-step sign-in was not on for this account; clearing anything half set up.");
await db.batch(
  [
    { sql: "UPDATE parents SET totp_secret = NULL, totp_pending = NULL, totp_enabled_at = NULL, totp_last_step = NULL WHERE id = ?", args: [id] },
    { sql: "DELETE FROM totp_backup_codes WHERE parent_id = ?", args: [id] },
    { sql: "DELETE FROM sessions WHERE parent_id = ?", args: [id] },
    {
      sql: "INSERT INTO admin_audit (at, admin, action, target, detail) VALUES (?, ?, ?, ?, ?)",
      args: [Date.now(), "database access", "2fa.reset", email, JSON.stringify({ via: "scripts/admin-2fa-reset.mjs" })],
    },
  ],
  "write",
);
console.log(`Two-step sign-in is off for ${email} and every session is signed out. Sign in with the password and set it up again.`);
