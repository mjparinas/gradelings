import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { applyImport, discardImport, pendingImport, reviewSections, rosterAccessFor, rosterStatus } from "@/server/rostering";
import { rosterProviderLabel, type ImportChoice } from "@/lib/rostering";

// Roster import for a signed-in teacher. Everything is checked against the signed-in account.

/** What the teacher area shows: the providers and whether this account may use them. With ?import=, the roster waiting for review. */
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const id = new URL(req.url).searchParams.get("import");
  if (!id) return json(await rosterStatus(session.familyId));
  if ((await rosterAccessFor(session.familyId)) !== "ok") return error(403, "Importing classes isn't available for this account.");
  const pending = await pendingImport(id, session.parentId);
  if (!pending) return error(404, "That import has expired. Start it again.");
  return json({ provider: pending.provider, label: rosterProviderLabel(pending.provider), sections: await reviewSections(session.parentId, pending) });
}

/** Makes the classes the teacher chose (`{ import, classes: [{ sectionId, name, grade, framework }] }`). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.verified) return error(403, "Please confirm your email first.");
  if ((await rosterAccessFor(session.familyId)) !== "ok") return error(403, "Importing classes isn't available for this account.");
  const body = (await readJson(req)) as { import?: unknown; classes?: unknown } | null;
  const pending = typeof body?.import === "string" ? await pendingImport(body.import, session.parentId) : null;
  if (!pending) return error(404, "That import has expired. Start it again.");
  const classes = Array.isArray(body?.classes) ? body.classes.slice(0, 40) : [];
  const choices: ImportChoice[] = classes.map((c: Record<string, unknown>) => ({ sectionId: String(c?.sectionId ?? ""), name: String(c?.name ?? ""), grade: String(c?.grade ?? "") as ImportChoice["grade"], framework: String(c?.framework ?? "ca-bc") }));
  const out = await applyImport(session.parentId, pending, choices);
  if (!out.ok) return error(out.status, out.message);
  await discardImport(body!.import as string, session.parentId);
  return json({ results: out.results });
}

/** Throws a read roster away without importing it. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const id = new URL(req.url).searchParams.get("import") ?? "";
  await discardImport(id, session.parentId);
  return json({ ok: true });
}
