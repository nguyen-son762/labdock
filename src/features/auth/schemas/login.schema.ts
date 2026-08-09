import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Vui lòng nhập email.").email("Email chưa đúng định dạng."),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự.").max(128, "Mật khẩu quá dài."),
  remember: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;
