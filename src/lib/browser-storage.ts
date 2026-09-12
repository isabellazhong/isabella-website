/**
 * sessionStorage access that never throws.
 *
 * Private windows and storage-blocking settings turn every access into an
 * exception, and remembering where someone left off is never worth a blank
 * page. Session scope is deliberate: the memory lasts as long as the browser
 * tab -- reloads included -- and a fresh tab starts fresh.
 */

export function readStored(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage is unavailable; the visitor just loses the restore.
  }
}
