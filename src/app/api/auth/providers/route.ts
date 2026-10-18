import { json } from "@/server/auth";
import { isFlagOn } from "@/server/flags";
import { googleAvailable } from "@/server/google";

/** Which ways of signing in are switched on, so the sign-in forms only show buttons that work. */
export async function GET() {
  return json({ google: await googleAvailable(), magic: await isFlagOn("magic-link", null) });
}
