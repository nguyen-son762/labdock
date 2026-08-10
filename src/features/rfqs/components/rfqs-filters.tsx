"use client";

import { Calendar1, CloseCircle, SearchNormal1 } from "iconsax-reactjs";
import { enUS } from "react-day-picker/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { rfqFilterStatusSchema, type RfqFilters, type RfqStatus } from "../schemas/rfq.schema";

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

type RfqsFiltersProps = {
  filters: RfqFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: RfqStatus | "all") => void;
  onMonthChange: (value: string) => void;
  onClear: () => void;
};

function monthToDate(month: string) {
  return new Date(`${month}-01T00:00:00.000Z`);
}

export function RfqsFilters({ filters, onSearchChange, onStatusChange, onMonthChange, onClear }: RfqsFiltersProps) {
  const selectedMonth = monthToDate(filters.month ?? "2026-01");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-80">
        <SearchNormal1
          className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#73798f]"
          aria-hidden="true"
        />
        <Input
          aria-label="Search RFQs"
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          className="h-11 rounded-full border-[#dde2e8] bg-white pl-11 shadow-none"
        />
      </div>
      <Select value={filters.status} onValueChange={(value) => onStatusChange(rfqFilterStatusSchema.parse(value))}>
        <SelectTrigger
          aria-label="Filter by status"
          className="h-11 w-[132px] rounded-full border-[#dde2e8] bg-white shadow-none"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Status</SelectItem>
          <SelectItem value="quoted">Quoted</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="declined">Declined</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex h-10 overflow-hidden rounded-full border border-[#c8d0d9] bg-white">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-none border-r border-[#dde2e8] px-3 font-normal text-[#051a50]"
            >
              <Calendar1 className="size-5" aria-hidden="true" /> {monthFormatter.format(selectedMonth)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white p-0" align="start">
            <Calendar
              mode="single"
              locale={enUS}
              selected={selectedMonth}
              defaultMonth={selectedMonth}
              onSelect={(date) =>
                date && onMonthChange(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`)
              }
            />
          </PopoverContent>
        </Popover>
        <Select defaultValue="month">
          <SelectTrigger
            aria-label="Date grouping"
            className="h-10 w-[92px] rounded-none border-0 bg-white shadow-none focus:ring-0"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="button" variant="ghost" className="h-10 px-1.5 font-normal text-[#73798f]" onClick={onClear}>
        <CloseCircle className="size-5" aria-hidden="true" /> Clear all
      </Button>
    </div>
  );
}
