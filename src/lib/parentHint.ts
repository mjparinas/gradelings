// Whether a parent's account has been signed in on this device. It stays after signing out, so the same person is welcomed back. Like the teacher hint, it only decides what to show
// first ("Welcome back", "My account"): the server still decides who is signed in. It holds a flag and nothing
// about the family.

const KEY = "grademap.parent";

export function knownParent(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberParent(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // Storage blocked (private window): the hint just isn't kept.
  }
}
