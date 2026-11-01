// Help videos are copied to Cache Storage the first time they play, so they work offline afterwards. The service
// worker doesn't touch /videos/ (video uses range requests, which a cache can't answer), so the player plays a
// saved copy through a blob URL. Nothing here throws: a missing cache just means the plain network URL.

const CACHE = "grademap-video";

export async function cachedVideoUrl(src: string): Promise<string | null> {
  try {
    if (typeof caches === "undefined") return null;
    const hit = await (await caches.open(CACHE)).match(src);
    return hit ? URL.createObjectURL(await hit.blob()) : null;
  } catch {
    return null;
  }
}

/** Saves a copy for offline use. Quietly does nothing on mobile data saver, offline or a failed download. */
export async function saveVideo(src: string): Promise<void> {
  try {
    if (typeof caches === "undefined" || navigator.onLine === false) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    const cache = await caches.open(CACHE);
    if (await cache.match(src)) return;
    const res = await fetch(src);
    if (res.ok && res.status === 200) await cache.put(src, res);
  } catch {
    /* offline or full: the video just won't be there next time */
  }
}
