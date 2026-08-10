import { eventsSchema, newsArticlesSchema } from "../schemas/news.schema";

const articleBody = {
  introLines: [
    "The 3Rs—replacement, reduction and refinement—work best when they are designed into the research system from the beginning.",
    "That means connecting experimental design, validated alternatives and reusable data instead of treating each practice as a separate compliance task.",
  ],
  sections: [
    {
      heading: "Designing the 3Rs as a connected research system",
      paragraphs: [
        "Reduction starts with stronger study design and clearer decision points. Replacement depends on alternatives such as organoids and computational models being validated for the question at hand. Refinement improves when teams can learn from consistent, well-structured data.",
        "The practical opportunity is at the interfaces between these activities. Shared protocols, interoperable data and earlier collaboration can help teams make better scientific decisions while reducing avoidable repetition.",
      ],
    },
  ],
  gallery: ["/news/article-gallery.jpg"],
};

const collaborationBody = {
  introLines: [
    "Research teams across Southeast Asia often face similar challenges, from sourcing specialist equipment to sharing methods across institutions.",
  ],
  sections: [
    {
      heading: "Turning regional connections into practical progress",
      paragraphs: [
        "Effective collaboration needs more than introductions. Common documentation, clear ownership and dependable access to laboratory supplies help partners reproduce work and move projects forward together.",
      ],
    },
  ],
  gallery: [],
};

const expoBody = {
  introLines: [
    "Laboratory exhibitions give research and procurement teams a direct way to compare equipment, consumables and support models in one place.",
  ],
  sections: [
    {
      heading: "Evaluating solutions beyond the specification sheet",
      paragraphs: [
        "Useful product evaluation includes workflow fit, training, maintenance and the availability of replacement parts. Bringing these questions into early supplier conversations can reduce surprises after purchase.",
      ],
    },
  ],
  gallery: [],
};

const labTechBody = {
  introLines: [
    "Connected instruments and automation are changing how laboratories capture results, monitor processes and coordinate routine work.",
  ],
  sections: [
    {
      heading: "Adopting technology with the workflow in mind",
      paragraphs: [
        "The strongest implementations begin with a specific bottleneck. Teams can then assess interoperability, data ownership and operator training alongside throughput and accuracy.",
      ],
    },
  ],
  gallery: [],
};

const symposiumBody = {
  introLines: [
    "Integrated biology combines experimental models, analytical tools and shared data to answer questions that no single method can address alone.",
  ],
  sections: [
    {
      heading: "From promising methods to repeatable research",
      paragraphs: [
        "New technology creates value when laboratories can validate it, train users and compare results consistently. Open discussion between scientists and technical specialists is an important part of that transition.",
      ],
    },
  ],
  gallery: [],
};

const regionalSupportBody = {
  introLines: [
    "Reliable procurement depends on responsive support before, during and after an order—not only on access to a broad catalogue.",
  ],
  sections: [
    {
      heading: "Support closer to research teams",
      paragraphs: [
        "Labdock is developing its regional partner network to make product guidance, order coordination and technical follow-up easier to access for institutions across Southeast Asia.",
      ],
    },
  ],
  gallery: [],
};

const procurementBody = {
  introLines: [
    "A clear laboratory procurement workflow helps researchers spend less time tracing approvals, comparing incomplete quotes and responding to unexpected stock issues.",
  ],
  sections: [
    {
      heading: "Five practical improvements",
      paragraphs: [
        "Standardise request details, confirm technical requirements early, record approved alternatives, make ownership visible and review supplier performance after delivery. These simple habits improve decisions without adding unnecessary process.",
      ],
    },
  ],
  gallery: [],
};

export const newsArticles = newsArticlesSchema.parse([
  {
    slug: "future-of-3rs-integrated-biology-systems",
    title: "The Future of 3Rs: Integrated Biology Systems",
    excerpt:
      "Engineering the 3Rs through System Design — Not Just Compliance. At the SALAS Scientific Conference 2026, Thuan D. Bui, PhD, MBA shared...",
    category: "News",
    publishedAt: "2026-01-01T00:00:00.000Z",
    image: "/news/featured-article.jpg",
    heroImage: "/news/article-hero.jpg",
    ...articleBody,
  },
  {
    slug: "research-collaboration-across-southeast-asia",
    title: "Advancing research collaboration across Southeast Asia",
    excerpt:
      "Researchers, industry leaders and scientific suppliers gathered to exchange ideas for stronger laboratory ecosystems.",
    category: "News",
    publishedAt: "2025-12-19T00:00:00.000Z",
    image: "/news/conference-audience.jpg",
    ...collaborationBody,
  },
  {
    slug: "new-laboratory-solutions-at-labfriend-expo",
    title: "New laboratory solutions showcased at LabFriend Expo",
    excerpt:
      "A closer look at the tools and procurement solutions helping laboratories improve everyday research workflows.",
    category: "News",
    publishedAt: "2025-11-25T00:00:00.000Z",
    image: "/news/exhibition-hall.jpg",
    ...expoBody,
  },
  {
    slug: "labtech-innovations-showcase-2026",
    title: "LabTech Innovations Showcase connects science and technology",
    excerpt:
      "The event brings together experts in laboratory automation, instrumentation and connected scientific workflows.",
    category: "Events",
    publishedAt: "2025-10-16T00:00:00.000Z",
    image: "/news/technology-event.jpg",
    ...labTechBody,
  },
  {
    slug: "biolab-technology-symposium",
    title: "Biolab Technology Symposium explores the next research frontier",
    excerpt:
      "Scientific leaders share practical perspectives on new technologies and the future of integrated biology.",
    category: "Events",
    publishedAt: "2025-09-30T00:00:00.000Z",
    image: "/news/research-talk.jpg",
    ...symposiumBody,
  },
  {
    slug: "labdock-expands-regional-support",
    title: "Labdock expands regional support for research institutions",
    excerpt: "Our growing partner network makes trusted scientific procurement more accessible across the region.",
    category: "Company updates",
    publishedAt: "2025-09-12T00:00:00.000Z",
    image: "/news/conference-audience.jpg",
    ...regionalSupportBody,
  },
  {
    slug: "better-lab-procurement-workflows",
    title: "Five ways to build a better laboratory procurement workflow",
    excerpt: "Simple practices that help research teams reduce delays, improve visibility and keep projects moving.",
    category: "Features",
    publishedAt: "2025-08-18T00:00:00.000Z",
    image: "/news/exhibition-hall.jpg",
    ...procurementBody,
  },
]);

export const upcomingEvents = eventsSchema.parse([
  { month: "OCT", day: "01", title: "LabTech Innovations Showcase", location: "Marina Bay Sands" },
  { month: "OCT", day: "15", title: "Biolab Tech Symposium", location: "Suntec" },
  { month: "OCT", day: "15", title: "LumiLab Scientific Conference", location: "Marina Square" },
  { month: "NOV", day: "01", title: "GeneSys Tech Conference", location: "Guoco Towers" },
  { month: "NOV", day: "15", title: "ClarityBio Research Summit", location: "Marina Bay Sands" },
]);

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
