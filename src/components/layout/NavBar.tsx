import { useState } from "react";
import { NavLink } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Me", to: "/contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm transition-colors ${
      isActive
        ? "text-ink underline decoration-accent decoration-2 underline-offset-8"
        : "text-accent-ink hover:text-ink"
    }`;

  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `font-display rounded-full px-4 py-2 text-sm ${isActive ? "text-ink" : "text-accent-ink"}`;

  return (
    <header className="sticky top-0 z-40">
      <div className="container-page relative flex h-16 items-center justify-center">
        <nav className="hidden items-center gap-20 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={desktopLink}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute right-4 flex items-center gap-4 sm:right-6 lg:right-8">
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
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
