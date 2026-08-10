import { Award, BoxTick, DocumentText, MoneyChange, TruckFast } from "iconsax-reactjs";

const guarantees = [
  { title: "Lab Verified Products", description: "Ensuring authentic products and high standards.", icon: BoxTick },
  {
    title: "COA / SDS Available",
    description: "Standardized technical information for all orders.",
    icon: DocumentText,
  },
  {
    title: "Rapid Delivery",
    description: "Fast fulfillment to enhance research efficiency (SG 1-2 days)",
    icon: TruckFast,
  },
  {
    title: "Bulk Pricing Available",
    description: "Scalable procurement solutions for laboratories.",
    icon: MoneyChange,
  },
  { title: "S5G & CSBE Certified", description: "Committed to global standards and compliance.", icon: Award },
] as const;

export function ServiceGuarantees() {
  return (
    <section className="bg-[#f5f8fb] py-12" aria-label="Labdock service guarantees">
      <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {guarantees.map(({ title, description, icon: Icon }) => (
          <article key={title} className="text-center">
            <Icon className="mx-auto size-10 text-[#299a86]" variant="Bulk" aria-hidden="true" />
            <h2 className="mt-4 text-sm font-semibold text-[#051a50]">{title}</h2>
            <p className="mx-auto mt-1 max-w-[220px] text-xs leading-[18px] text-[#73798f]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
