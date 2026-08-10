export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  closing?: readonly string[];
};

export type LegalDocument = {
  kind: "terms" | "privacy";
  title: string;
  sections: readonly LegalSection[];
};
