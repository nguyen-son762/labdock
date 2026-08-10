import { ArrowRight, CalendarTick, Clock, Location } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { upcomingEvents } from "../data/news-data";
import type { NewsEvent } from "../schemas/news.schema";

function EventBadge({ icon: Icon, children }: { icon: typeof Location; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#ecf0f3] bg-white px-2 py-1 text-[11px] leading-none text-[#5e6375]">
      <Icon className="size-3 text-[#2f7ac6]" variant="Bold" aria-hidden="true" />
      {children}
    </span>
  );
}

function EventRow({ event }: { event: NewsEvent }) {
  return (
    <li className="flex gap-3 rounded-lg bg-[#f5f7f8] p-1">
      <time className="w-20 shrink-0 overflow-hidden rounded-lg border border-white text-center">
        <span className="block bg-[#d1ecfa] py-1 text-[13px] leading-4 text-black">{event.month}</span>
        <strong className="block bg-[#ecf0f3] px-2 py-1 text-[32px] font-semibold leading-[43px] text-black">
          {event.day}
        </strong>
      </time>
      <div className="min-w-0 py-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#051a50]">{event.title}</h3>
        <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-[#ecf0f3] bg-white px-2 py-1 text-[11px] leading-none text-[#5e6375]">
          <Location className="size-3 shrink-0 text-[#2f7ac6]" variant="Bold" aria-hidden="true" />
          <span className="truncate">{event.location}</span>
        </span>
      </div>
    </li>
  );
}

export function NewsSidebar() {
  return (
    <aside aria-label="Upcoming scientific events" className="space-y-4">
      <section className="rounded-xl bg-gradient-to-b from-[#80bde8] to-[#edf8ff] p-4 text-[#051a50]">
        <div className="flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white/70">
            <CalendarTick className="size-8 text-[#1f5fa8]" variant="Bold" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold">Upcoming events</h2>
        </div>
        <h3 className="mt-4 text-sm font-semibold">LabFriend Expo</h3>
        <p className="mt-1 text-xs leading-4">Discover cutting-edge lab solutions and connect with industry experts.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <EventBadge icon={CalendarTick}>01 Sep 2026</EventBadge>
          <EventBadge icon={Clock}>09:00 AM</EventBadge>
          <EventBadge icon={Location}>Marina Bay Sands</EventBadge>
        </div>
      </section>

      <section className="rounded-xl bg-white p-4">
        <h2 className="text-2xl font-semibold leading-8 text-[#092661]">Other events</h2>
        <ul className="mt-4 space-y-2">
          {upcomingEvents.map((event) => (
            <EventRow key={`${event.month}-${event.day}-${event.title}`} event={event} />
          ))}
        </ul>
      </section>

      <section className="relative isolate overflow-hidden rounded-xl px-3 py-6 text-center text-white">
        <Image src="/news/research-cta.png" alt="" fill sizes="404px" className="-z-10 object-cover" />
        <h2 className="mx-auto max-w-[340px] text-2xl font-semibold leading-8">
          Powering 200+ research institutions across Southeast Asia
        </h2>
        <Button asChild variant="brand" className="mt-4 h-14 pl-[18px] pr-1.5 text-base font-normal">
          <Link href="/products">
            Explore products
            <span className="flex size-11 items-center justify-center rounded-full bg-[#efa33b]">
              <ArrowRight className="size-6" aria-hidden="true" />
            </span>
          </Link>
        </Button>
      </section>
    </aside>
  );
}
