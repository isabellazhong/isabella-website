import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./ThemeToggle";
import { navTarget } from "../../lib/nav-memory";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Me", to: "/contact" },
];

export function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > lastScrollY.current;
      const pastThreshold = currentScrollY > 80;

      setHidden(scrolledDown && pastThreshold);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  // A section stays highlighted while the visitor is anywhere inside it, so an
  // open project or blog post still reads as "Projects" / "Blogs".
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const desktopLink = (active: boolean) =>
    `font-display text-sm transition-colors ${
      active
        ? "text-accent"
        : "hover:text-ink"
    }`;

  const mobileLink = (active: boolean) =>
    `font-display rounded-full px-4 py-2 text-sm ${active ? "text-ink" : "text-accent-ink"}`;

  return (
    <header
      className={`sticky top-0 z-40 translate-y-0 transition-transform duration-300 ease-in-out ${
        hidden ? "md:-translate-y-full" : "md:translate-y-0"
      } ${open ? "bg-surface" : "bg-transparent"}`}
    >
      <div className="container-page relative flex h-16 items-center justify-center">
        <nav className="hidden items-center gap-20 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={navTarget(item.to, pathname)}
              aria-current={isActive(item.to) ? "page" : undefined}
              className={desktopLink(isActive(item.to))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute  right-4 flex items-center gap-4 sm:right-6 lg:right-8">
          <ThemeToggle />
          <button
            type="button"
            className="text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden" aria-label="Primary">
          <div className="bg-surface container-page flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={navTarget(item.to, pathname)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={mobileLink(isActive(item.to))}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
