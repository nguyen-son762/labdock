import type { LegalDocument } from "../legal.types";
import { LegalDocumentSection } from "./legal-document-section";
import { LegalHero } from "./legal-hero";

export function LegalDocumentScreen({ document }: { document: LegalDocument }) {
  return (
    <div className="bg-[#f9fcff]">
      <LegalHero document={document} />
      <article className="mx-auto flex w-[calc(100%_-_40px)] max-w-[824px] flex-col gap-6 py-[50px] sm:w-[calc(100%_-_64px)]">
        {document.sections.map((section, index) => (
          <LegalDocumentSection key={section.title} index={index} section={section} />
        ))}
      </article>
    </div>
  );
}
