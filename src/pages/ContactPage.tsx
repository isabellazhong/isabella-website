import { EnvelopeSimple, FileText, GithubLogo, LinkSimple, LinkedinLogo } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { PageHeader } from "../components/layout/PageHeader";
import { contactLinks } from "../data/profile";
import type { ContactLink } from "../entities";

const ICON_MAP: Record<ContactLink["icon"], Icon> = {
  email: EnvelopeSimple,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  resume: FileText,
  other: LinkSimple,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact me" lede="The best ways to reach me." />
      <div className="container-page pb-24">
        {contactLinks.length === 0 ? (
          <p className="text-ink-soft">Add links in src/data/profile.ts and they will show up here.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactLinks.map((link) => {
              const IconComponent = ICON_MAP[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface-raised p-6 transition-transform hover:-translate-y-1"
                >
                  <IconComponent size={24} className="shrink-0 text-accent" />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-medium">{link.label}</span>
                    <span className="truncate text-sm text-ink-soft">{link.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
