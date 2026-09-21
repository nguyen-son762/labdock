import { ArrowLeft, ArrowRight } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

function getVisiblePages(page: number, totalPages: number): Array<number | string> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const visible = [...pages].filter((value) => value > 0 && value <= totalPages).sort((a, b) => a - b);
  const result: Array<number | string> = [];

  visible.forEach((value, index) => {
    const previous = visible[index - 1];
    if (previous !== undefined && value - previous > 1) result.push(`ellipsis-${previous}`);
    result.push(value);
  });

  return result;
}

export function ProductPagination({
  page,
  totalPages,
  hrefForPage,
}: {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Product pagination" className="mt-8 flex flex-wrap items-center justify-center gap-1">
      {page > 1 ? (
        <Button asChild variant="ghost" size="sm" className="text-[#5e6375]">
          <Link href={hrefForPage(page - 1)}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Previous
          </Link>
        </Button>
      ) : (
        <Button type="button" variant="ghost" size="sm" disabled>
          <ArrowLeft className="size-4" aria-hidden="true" /> Previous
        </Button>
      )}

      {getVisiblePages(page, totalPages).map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-[#868da5]" aria-hidden="true">
            …
          </span>
        ) : (
          <Button key={item} asChild variant={item === page ? "default" : "ghost"} size="icon" className="size-8">
            <Link
              href={hrefForPage(item)}
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
            >
              {item}
            </Link>
          </Button>
        ),
      )}

      {page < totalPages ? (
        <Button asChild variant="ghost" size="sm" className="text-[#5e6375]">
          <Link href={hrefForPage(page + 1)}>
            Next <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button type="button" variant="ghost" size="sm" disabled>
          Next <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      )}
    </nav>
  );
}
