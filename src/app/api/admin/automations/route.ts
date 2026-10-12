import { error, json } from "@/server/auth";
import { audit, requireAdmin } from "@/server/admin";
import { adminRecipients, alertSettings, saveAlertSettings } from "@/server/alerts";
import { automationStatuses, getAutomation, saveAutomation } from "@/server/automations";
import { messageProblem, type AdminMessage } from "@/lib/adminEmails";
import { automationDef, TURN_ON, validCap } from "@/lib/automations";

// Automatic nudges and the owner's alerts. A nudge only starts sending once the owner switches it on here and
// types TURN ON; switching it off takes effect before the next daily run.

export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const [automations, alerts, recipients] = await Promise.all([automationStatuses(), alertSettings(), adminRecipients()]);
  return json({ automations, alerts, alertRecipients: recipients.length });
}

interface Body {
  action?: unknown;
  id?: unknown;
  on?: unknown;
  confirm?: unknown;
  message?: unknown;
  dailyCap?: unknown;
  instant?: unknown;
  digest?: unknown;
}

/**
 * `{ action: "alerts", instant, digest }` saves the alert settings.
 * `{ action: "save", id, message, dailyCap }` edits a nudge; `{ action: "switch", id, on, confirm }` turns it on or off.
 */
export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const admin = gate.admin.email;
  const body = ((await req.json().catch(() => null)) ?? {}) as Body;

  if (body.action === "alerts") {
    if (typeof body.instant !== "boolean" || typeof body.digest !== "boolean") return error(400, "Bad request");
    await saveAlertSettings({ instant: body.instant, digest: body.digest });
    await audit(admin, "alerts.save", null, { instant: body.instant, digest: body.digest });
    return json({ ok: true });
  }

  const def = typeof body.id === "string" ? automationDef(body.id) : undefined;
  if (!def) return error(404, "No such automation.");
  const current = await getAutomation(def);

  if (body.action === "save") {
    const problem = messageProblem(body.message);
    if (problem) return error(400, problem);
    if (!validCap(body.dailyCap)) return error(400, "The daily limit must be a whole number from 1 to 50.");
    const m = body.message as AdminMessage;
    const message: AdminMessage = { subject: m.subject, body: m.body, button: m.button ? { label: m.button.label, path: m.button.path } : null };
    await saveAutomation(def, { ...current, message, dailyCap: body.dailyCap as number });
    await audit(admin, "automation.save", def.id, { subject: message.subject, dailyCap: body.dailyCap });
    return json({ ok: true });
  }

  if (body.action === "switch") {
    if (typeof body.on !== "boolean") return error(400, "Bad request");
    // Switching on starts real email to families, so it needs the words typed back.
    if (body.on && body.confirm !== TURN_ON) return error(400, `Type ${TURN_ON} to confirm.`);
    await saveAutomation(def, { ...current, on: body.on, onBy: body.on ? admin : current.onBy, onAt: body.on ? Date.now() : current.onAt });
    await audit(admin, body.on ? "automation.on" : "automation.off", def.id, body.on ? { subject: current.message.subject, dailyCap: current.dailyCap } : undefined);
    return json({ ok: true });
  }

  return error(400, "Unknown action.");
}
