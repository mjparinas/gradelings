// Wakes devices that are waiting on a class (see liveWatch.ts). Plain in-process memory: it only makes a
// change reach waiters on the same server instance at once; anything on another instance sees the change
// on its next check of the database, at most a second or two later. Holds nothing about a child.

const bumps = new Map<string, number>();
const waiters = new Map<string, Set<() => void>>();

/** Changes whenever the class has been changed on this instance, so a cached look at it is known to be old. */
export const classBump = (classId: string): number => bumps.get(classId) ?? 0;

/** Says a class's live question, timer or teacher presence changed. Call after the write. */
export function notifyClass(classId: string): void {
  bumps.set(classId, classBump(classId) + 1);
  for (const wake of [...(waiters.get(classId) ?? [])]) wake();
}

/** Resolves after `ms`, or sooner when one of the classes changes. */
export function sleepOrWake(classIds: string[], ms: number): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timer);
      for (const id of classIds) waiters.get(id)?.delete(done);
      resolve();
    };
    const timer = setTimeout(done, ms);
    for (const id of classIds) {
      let set = waiters.get(id);
      if (!set) waiters.set(id, (set = new Set()));
      set.add(done);
    }
  });
}
