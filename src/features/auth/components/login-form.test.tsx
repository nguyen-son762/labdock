import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { authService } from "../api/auth.service";
import { LoginForm } from "./login-form";

const { replaceMock } = vi.hoisted(() => ({ replaceMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });

  it("hiển thị lỗi accessible khi submit dữ liệu rỗng", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Vui lòng nhập email.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address *")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Mật khẩu phải có ít nhất 8 ký tự.")).toBeInTheDocument();
  });

  it("gửi dữ liệu qua service và chuyển đến Dashboard khi thành công", async () => {
    const loginSpy = vi.spyOn(authService, "login").mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText("Email address *"), "user@labdock.vn");
    await user.type(screen.getByLabelText("Password *"), "mat-khau-an-toan");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalled();
      expect(loginSpy.mock.calls[0]?.[0]).toEqual({
        email: "user@labdock.vn",
        password: "mat-khau-an-toan",
        remember: false,
      });
      expect(replaceMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
