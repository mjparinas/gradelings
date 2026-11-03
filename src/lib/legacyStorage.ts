// The product used to be called GradeMap, and what it kept on a device carried that name. Everything now
// says Gradelings, so on the first visit after the rename the old entries are moved to the new names and
// the old ones removed. Nothing is lost: a child's unsynced progress (the on-device database, see
// localdb.ts), their choices and the downloaded voice all come across. Safe to run more than once.

const LEGACY_PREFIX = "grademap.";
const PREFIX = "gradelings.";

/** The voice files are about 100 MB, so they are copied across instead of downloaded again. */
const LEGACY_CACHES: Record<string, string> = { "grademap-piper": "gradelings-piper" };

/** Moves every `grademap.*` entry in a storage to `gradelings.*`, unless the new name already has a value. */
export function moveLegacyKeys(storage: Storage) {
  const legacy: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key?.startsWith(LEGACY_PREFIX)) legacy.push(key);
  }
  for (const key of legacy) {
    const next = PREFIX + key.slice(LEGACY_PREFIX.length);
    const value = storage.getItem(key);
    if (value !== null && storage.getItem(next) === null) storage.setItem(next, value);
    storage.removeItem(key);
  }
}

/** localStorage and sessionStorage. Call before anything reads them. */
export function migrateLegacyStorage() {
  for (const get of [() => window.localStorage, () => window.sessionStorage]) {
    try {
      moveLegacyKeys(get());
    } catch {
      // Storage blocked (a private mode): nothing was saved there.
    }
  }
}

/** Copies a legacy Cache Storage cache into its new name (only what the new one doesn't have), then deletes it. */
export async function migrateLegacyCaches() {
  if (typeof caches === "undefined") return;
  for (const [from, to] of Object.entries(LEGACY_CACHES)) {
    try {
      if (!(await caches.has(from))) continue;
      const source = await caches.open(from);
      const target = await caches.open(to);
      for (const request of await source.keys()) {
        if (await target.match(request)) continue;
        const response = await source.match(request);
        if (response) await target.put(request, response);
      }
      await caches.delete(from);
    } catch {
      // Left in place: the next visit tries again.
    }
  }
}
