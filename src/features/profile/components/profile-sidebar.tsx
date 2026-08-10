import Image from "next/image";
import { Refresh2 } from "iconsax-reactjs";

import { Button } from "@/components/ui/button";

import type { CurrentUser } from "../schemas/user.schema";
import { ProfileAvatarDialog } from "./profile-avatar-dialog";

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export function ProfileSidebar({ user }: { user: CurrentUser }) {
  return (
    <aside className="flex w-full flex-col items-center gap-6 rounded-xl border border-[#dde2e8] bg-white p-6 lg:w-[266px] lg:shrink-0">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="relative size-24 overflow-hidden rounded-full border-4 border-white shadow-[0_12px_16px_-4px_rgba(10,13,18,0.08),0_4px_6px_-2px_rgba(10,13,18,0.03)]">
          <Image
            src={user.avatarUrl}
            alt={`${user.fullName}'s profile`}
            fill
            unoptimized
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#0f3678] sm:text-[32px]">{user.fullName}</h2>
          <p className="mt-1 text-sm text-[#73798f]">Member since {monthFormatter.format(new Date(user.joinedAt))}</p>
        </div>
      </div>
      <ProfileAvatarDialog>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full border-[#c8d0d9] px-3.5 font-normal text-[#051a50]"
        >
          <Refresh2 className="size-5" aria-hidden="true" />
          Change profile picture
        </Button>
      </ProfileAvatarDialog>
    </aside>
  );
}
