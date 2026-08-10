import { BoxSearch } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";

export function RfqsEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <section className="rounded-xl border border-dashed border-[#c8d0d9] bg-white px-5 py-16 text-center">
      <BoxSearch className="mx-auto size-10 text-[#73798f]" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold text-[#0f3678]">No RFQs found</h2>
      <p className="mt-1 text-sm text-[#73798f]">Try changing your search or quotation status.</p>
      <Button type="button" variant="outline" className="mt-5 rounded-full" onClick={onClear}>
        Clear filters
      </Button>
    </section>
  );
}
