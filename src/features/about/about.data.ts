export const aboutNarrative = {
  heading: "Simplifying scientific procurement, enhancing research efficiency.",
  paragraphs: [
    "Labdockpro.com (Labdock) is an online eCommerce marketplace, directly connecting researchers, laboratories, and businesses with a comprehensive ecosystem of high-quality scientific products and solutions. The platform also partners with globally recognized manufacturers and trusted suppliers, ensuring access to authentic products, high standards, and the latest technologies.",
    "Labdock offers a comprehensive portfolio including chemicals, consumables, laboratory equipment, animal research housing systems, and advanced biotechnology solutions. With strong expertise in the life sciences field, i-DNA goes beyond product distribution by delivering integrated solutions, technical consultation, and professional after-sales support.",
    "Labdock is designed to optimize procurement processes, standardize technical information, and enable customers to efficiently access products that meet their research and operational needs.",
  ],
} as const;

export const advantages = [
  {
    title: "Verified scientific suppliers",
    description: "Source authentic laboratory products from trusted manufacturers and distribution partners.",
  },
  {
    title: "Clear technical information",
    description: "Compare relevant product details and specifications before making a procurement decision.",
  },
  {
    title: "Integrated procurement support",
    description: "Get guidance from initial product selection through ordering, delivery and after-sales support.",
  },
  {
    title: "Built for research workflows",
    description: "Reduce sourcing friction so laboratory teams can focus more time on scientific work.",
  },
] as const;

export const partnerPlaceholders = Array.from({ length: 6 }, (_, index) => ({
  id: `medicore-${index + 1}`,
  name: "MediCore",
}));
