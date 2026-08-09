import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên phải có ít nhất 2 ký tự.").max(80, "Họ tên không được vượt quá 80 ký tự."),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
