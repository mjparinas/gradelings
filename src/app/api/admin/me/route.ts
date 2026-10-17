import { json, error } from "@/server/auth";
import { getAdminSetup, twoFactorMode } from "@/server/admin";
import { twoFactorState } from "@/server/twoFactor";

/**
 * Whether the signed-in account is an admin (404 when it isn't, or when the panel is off). `ready` is false
 * while the account still has to set up or pass two-step sign-in; the panel then shows only that.
 */
export async function GET(req: Request) {
  const found = await getAdminSetup(req);
  if (!found) return error(404, "Not found");
  const state = await twoFactorState(found.admin.parentId);
  return json({ email: found.admin.email, role: found.role, ready: found.ready, twoFactor: { enabled: state.enabled, required: twoFactorMode() === "required", backupCodesLeft: state.backupCodesLeft, enabledAt: state.enabledAt } });
}
