import { ContactForm } from "../components/contact/ContactForm";
import { PageHeader } from "../components/layout/PageHeader";

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
