import "server-only";
import { createHash } from "node:crypto";
import { databaseUrl } from "@/server/db";

/**
 * Names the database the sync endpoint is reading. Devices remember it, and when it changes (the site was
 * pointed at a restored copy, whose URL is new) they upload everything again and download from the start,
 * because their "already sent" marks and download position belong to the old database.
 * Only a hash leaves the server. Set SYNC_EPOCH to any new value to make every device resync once without
 * changing the database (docs/RESTORE.md).
 */
export function syncEpoch(): string {
  return createHash("sha256").update(`${databaseUrl()}|${process.env.SYNC_EPOCH ?? ""}`).digest("hex").slice(0, 16);
}
