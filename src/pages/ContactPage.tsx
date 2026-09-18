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
      </div>
    </>
  );
}
