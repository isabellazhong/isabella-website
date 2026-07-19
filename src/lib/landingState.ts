// remembers (per browser session) that the landing animation already played,
// so returning to home lands on the hero instead of replaying from the top

const KEY = "landing-played";

export function hasPlayedLanding(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markLandingPlayed() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage unavailable, the animation will just replay */
  }
}
