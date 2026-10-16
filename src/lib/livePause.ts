// While the teacher's live question covers the screen, games and timed sessions hold still. Timers read
// this flag each tick (nothing re-renders for it), so a child loses no hearts, seconds or game time.
let paused = false;

export function setLivePaused(on: boolean): void {
  paused = on;
}

export function isLivePaused(): boolean {
  return paused;
}
