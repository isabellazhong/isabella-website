import { useEffect, useState } from "react";
import { readStored, writeStored } from "./browser-storage";

/**
 * useState that survives leaving the page, for selections that live in
 * component state rather than in the URL.
 *
 * `isValid` guards the restore: stored ids can outlive the content they point
 * at, so anything that no longer resolves falls back to `fallback`.
 */
export function useStickyState(
  key: string,
  fallback: string,
  isValid: (value: string) => boolean,
): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    const stored = readStored(key);
    return stored !== null && isValid(stored) ? stored : fallback;
  });

  useEffect(() => {
    writeStored(key, value);
  }, [key, value]);

  return [value, setValue];
}
