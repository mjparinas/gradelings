// Whether this device last had a teacher signed in. The session cookie is HttpOnly, so the page can't tell on
// its own; this hint lets a first-time visitor see the sign-up form at once instead of waiting for the server to
// say "not signed in". It only decides what to show first: the server still decides who is signed in.

const KEY = "grademap.teacher";

export function knownTeacher(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberTeacher(signedIn: boolean): void {
  try {
    if (signedIn) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private window): the hint just isn't kept.
  }
}
