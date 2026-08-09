"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "iconsax-reactjs";
import * as React from "react";
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker";
import { vi } from "react-day-picker/locale";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/class-names";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, components, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={vi}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        [UI.Months]: "relative flex flex-col gap-4 sm:flex-row",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "relative flex h-9 items-center justify-center px-9",
        [UI.CaptionLabel]: "text-sm font-medium",
        [UI.Nav]: "absolute inset-x-0 top-0 flex items-center justify-between",
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        [UI.MonthGrid]: "w-full border-collapse space-y-1",
        [UI.Weekdays]: "flex",
        [UI.Weekday]: "w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground",
        [UI.Week]: "mt-2 flex w-full",
        [UI.Day]: "relative size-9 p-0 text-center text-sm [&:has([aria-selected])]:bg-accent",
        [UI.DayButton]: cn(buttonVariants({ variant: "ghost" }), "size-9 p-0 font-normal aria-selected:opacity-100"),
        [SelectionState.selected]:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        [SelectionState.range_start]: "rounded-l-md",
        [SelectionState.range_middle]: "rounded-none bg-accent text-accent-foreground",
        [SelectionState.range_end]: "rounded-r-md",
        [DayFlag.today]: "bg-accent text-accent-foreground",
        [DayFlag.outside]:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        [DayFlag.disabled]: "text-muted-foreground opacity-50",
        [DayFlag.hidden]: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className: chevronClassName, orientation, ...chevronProps }) => {
          const Icon =
            orientation === "left"
              ? ArrowLeft
              : orientation === "right"
                ? ArrowRight
                : orientation === "up"
                  ? ArrowUp
                  : ArrowDown;

          return <Icon className={cn("size-4", chevronClassName)} aria-hidden="true" {...chevronProps} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar, type CalendarProps };
