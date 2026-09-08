import { ArrowRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import { contactLinks } from "../../data/profile";

const PAGE_LINKS = [
  { label: "About", to: "/#about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
];

const email = contactLinks.find((link) => link.icon === "email");
const github = contactLinks.find((link) => link.icon === "github");
const linkedin = contactLinks.find((link) => link.icon === "linkedin");

const linkClass =
  "font-display text-[clamp(0.65rem,1.5vw,0.85rem)] leading-tight transition-opacity hover:opacity-70 md:whitespace-nowrap";

const ctaClass =
  "group w-fit items-center gap-2 self-start rounded-full border border-current/40 bg-transparent px-5 py-2 font-display text-[clamp(0.65rem,1.3vw,0.75rem)] tracking-wide uppercase transition-colors hover:border-current hover:bg-current/10";

function SendMessageLink({ className }: { className: string }) {
  return (
    <NavLink to="/contact" className={className}>
      Send me a message
      <ArrowRight size="1.1em" className="shrink-0 transition-transform group-hover:translate-x-1" />
    </NavLink>
  );
}

export function Footer() {
  return (
    <footer
      className="relative m-0 w-full p-0 text-surface bg-surface-accent"
    >
      <div className="flex flex-col gap-6 px-6 py-8">
        <div className="flex w-full items-start justify-between gap-x-4">
          <nav className="flex min-w-0 flex-col gap-[0.5vw]" aria-label="Pages">
            {PAGE_LINKS.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex min-w-0 flex-col gap-[0.5vw]">
            {linkedin && (
              <a href={linkedin.url} target="_blank" rel="noreferrer" className={`flex items-start gap-1.5 ${linkClass}`}>
                <LinkedinLogo size="1em" className="shrink-0" />
                LinkedIn
              </a>
            )}
            {github && (
              <a href={github.url} target="_blank" rel="noreferrer" className={`flex items-start gap-1.5 ${linkClass}`}>
                <GithubLogo size="1em" className="shrink-0" />
                GitHub
              </a>
            )}
          </div>
          {email && (
            <div className="flex min-w-0 flex-col gap-6">
              <a href={email.url} className={`flex min-w-0 items-start gap-1.5 wrap-break-word ${linkClass}`}>
                <EnvelopeSimple size="1em" className="shrink-0" />
                {email.value}
              </a>
              <SendMessageLink className={`hidden md:inline-flex ${ctaClass}`} />
            </div>
          )}
        </div>
        <SendMessageLink className={`inline-flex md:hidden ${ctaClass}`} />
      </div>
    </footer>
  );
}
