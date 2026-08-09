"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Refresh, Save2, TickCircle } from "iconsax-reactjs";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/api-error";

import { useUpdateProfileMutation } from "../api/use-update-profile-mutation";
import { profileFormSchema, type ProfileFormValues } from "../schemas/profile-form.schema";
import type { CurrentUser } from "../schemas/user.schema";

export function ProfileForm({ user }: { user: CurrentUser }) {
  const updateMutation = useUpdateProfileMutation();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { fullName: user.fullName },
  });

  function handleUpdate(values: ProfileFormValues): void {
    updateMutation.mutate(values, {
      onSuccess: (updatedUser) => form.reset({ fullName: updatedUser.fullName }),
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-5" noValidate onSubmit={form.handleSubmit(handleUpdate)}>
        {updateMutation.isError ? <Alert>{getApiErrorMessage(updateMutation.error)}</Alert> : null}
        {updateMutation.isSuccess ? (
          <p role="status" className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
            <TickCircle className="size-4" aria-hidden="true" /> Hồ sơ đã được cập nhật.
          </p>
        ) : null}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input id="profile-email" value={user.email} disabled readOnly />
          <p className="text-sm text-muted-foreground">Liên hệ quản trị viên nếu bạn cần thay đổi email đăng nhập.</p>
        </div>

        <Button type="submit" disabled={!form.formState.isDirty || updateMutation.isPending}>
          {updateMutation.isPending ? (
            <Refresh className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save2 className="size-4" aria-hidden="true" />
          )}
          {updateMutation.isPending ? "Đang lưu…" : "Lưu thay đổi"}
        </Button>
      </form>
    </Form>
  );
}
