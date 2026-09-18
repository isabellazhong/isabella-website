import { EnvelopeSimple, FileText, GithubLogo, LinkSimple, LinkedinLogo } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ContactForm } from "../components/contact/ContactForm";
import { PageHeader } from "../components/layout/PageHeader";
import { contactLinks } from "../data/profile";
import type { ContactLink } from "../types";

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
      <PageHeader title="Contact me" lede="Feel free to send me an email!" />
      <div className="container-page flex flex-col gap-12 pb-24">
        <ContactForm />
        {contactLinks.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {contactLinks.map((link) => {
              const IconComponent = ICON_MAP[link.icon];
              const external = !link.url.startsWith("mailto:");
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-line bg-surface-raised px-5 py-4 transition-transform hover:-translate-y-1"
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
