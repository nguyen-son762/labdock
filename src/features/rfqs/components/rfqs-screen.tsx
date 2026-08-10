"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";

import { useRfqsQuery } from "../api/use-rfqs-query";
import { rfqFiltersSchema, rfqFilterStatusSchema } from "../schemas/rfq.schema";
import { RfqsEmptyState } from "./rfqs-empty-state";
import { RfqsFilters } from "./rfqs-filters";
import { RfqsSummary } from "./rfqs-summary";
import { RfqsTable } from "./rfqs-table";

const DEFAULT_MONTH = "2026-01";

function parseFilters(searchParams: URLSearchParams) {
  const status = rfqFilterStatusSchema.safeParse(searchParams.get("status"));
  const month = searchParams.get("month");
  const page = Number(searchParams.get("page") ?? 1);
  return rfqFiltersSchema.parse({
    search: searchParams.get("search") ?? "",
    status: status.success ? status.data : "all",
    month: /^\d{4}-\d{2}$/.test(month ?? "") ? month : DEFAULT_MONTH,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  });
}

export function RfqsScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = parseFilters(searchParams);
  const rfqsQuery = useRfqsQuery(filters);

  function updateParams(updates: Record<string, string | number | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) =>
      value === null || value === "" ? params.delete(key) : params.set(key, String(value)),
    );
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-6 sm:px-10 xl:px-[100px]">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My RFQs" }]} />
      <h1 className="mb-4 mt-2 text-[32px] font-semibold leading-none text-[#0f3678]">My RFQs</h1>
      <RfqsFilters
        filters={filters}
        onSearchChange={(search) => updateParams({ search, page: 1 })}
        onStatusChange={(status) => updateParams({ status: status === "all" ? null : status, page: 1 })}
        onMonthChange={(month) => updateParams({ month, page: 1 })}
        onClear={clearFilters}
      />

      {rfqsQuery.isPending ? (
        <div className="mt-4 space-y-3" aria-label="Loading RFQs" aria-busy="true">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-[480px] w-full rounded-xl" />
        </div>
      ) : null}
      {rfqsQuery.isError ? <Alert className="mt-4">{getApiErrorMessage(rfqsQuery.error)}</Alert> : null}
      {rfqsQuery.data ? (
        <div
          className={
            rfqsQuery.isFetching ? "mt-4 space-y-3 opacity-70 transition-opacity" : "mt-4 space-y-3 transition-opacity"
          }
          aria-busy={rfqsQuery.isFetching}
        >
          <RfqsSummary summary={rfqsQuery.data.summary} />
          {rfqsQuery.data.rfqs.length ? (
            <RfqsTable
              rfqs={rfqsQuery.data.rfqs}
              total={rfqsQuery.data.total}
              page={filters.page}
              onPageChange={(page) => updateParams({ page })}
            />
          ) : (
            <RfqsEmptyState onClear={clearFilters} />
          )}
        </div>
      ) : null}
    </div>
  );
}
