import type { InquiryType } from "../schemas/contact.schema";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";

export function ContactScreen({ initialType }: { initialType: InquiryType }) {
  return (
    <div>
      <ContactHero />
      <ContactForm initialType={initialType} />
    </div>
  );
}
