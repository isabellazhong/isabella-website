import { useState } from "react";
import { NavLink } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { SITE_NAME } from "../../data/profile";

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
    `text-sm transition-colors ${
      isActive
        ? "font-medium text-ink underline decoration-accent decoration-2 underline-offset-8"
        : "text-ink-soft hover:text-ink"
    }`;

  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm ${isActive ? "bg-surface-raised font-medium text-ink" : "text-ink-soft"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="font-display text-base font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {SITE_NAME}
        </NavLink>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={desktopLink}>
              {item.label}
            </NavLink>
          ))}
        </nav>
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
      {open && (
        <nav className="border-t border-line md:hidden" aria-label="Primary">
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
