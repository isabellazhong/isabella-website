import { useEffect } from "react";
import { useLocation } from "react-router";
import { readStored, writeStored } from "./browser-storage";

/**
 * Sections whose nav link returns the visitor to the page they left, instead
 * of to the section's index: an open blog post stays open across a detour to
 * Contact, an open project write-up stays open across a detour to Home.
 */
const REMEMBERED_SECTIONS = ["/projects", "/blogs"];

const storageKey = (section: string) => `nav:last${section}`;

/** The remembered section a path belongs to, if any. */
export function sectionOf(pathname: string): string | null {
  return REMEMBERED_SECTIONS.find((section) => pathname === section || pathname.startsWith(`${section}/`)) ?? null;
}

/** Records the deepest path visited inside each remembered section. */
export function useRememberSection(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const section = sectionOf(pathname);
    if (section) writeStored(storageKey(section), pathname);
  }, [pathname]);
}

/**
 * Where a top-level nav link should actually go.
 *
 * While the visitor is already inside the section, the current path is the
 * freshest answer -- `useRememberSection` writes to storage in an effect, one
 * beat after the nav bar has rendered.
 */
export function navTarget(to: string, currentPath: string): string {
  const section = sectionOf(to);
  if (!section) return to;
  if (sectionOf(currentPath) === section) return currentPath;
  return readStored(storageKey(section)) ?? to;
}
