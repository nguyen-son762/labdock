import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { verificationSchema } from "../schemas/signup.schema";
import { useForm } from "react-hook-form";

import { renderWithProviders } from "@/test/render-with-providers";

import { SignupVerificationForm } from "./signup-verification-form";

function VerificationFixture({
  expiresAt = "2099-01-01T00:00:00Z",
  initialCode = "123456",
  submit = vi.fn(),
}: {
  expiresAt?: string;
  initialCode?: string;
  submit?: (value: { code: string }) => void;
}) {
  const form = useForm({ resolver: zodResolver(verificationSchema), defaultValues: { code: initialCode } });
  return (
    <>
      <SignupVerificationForm
        form={form}
        verifyMutation={{ error: null, isPending: false, reset: vi.fn() }}
        onSubmit={submit}
        onBack={vi.fn()}
        onResend={async () => undefined}
        resendPending={false}
        resendError={null}
        errorMessage={() => null}
        expiresAt={expiresAt}
      />
      <output aria-label="Stored OTP">{form.watch("code")}</output>
    </>
  );
}

describe("OTP regressions", () => {
  it("AUTH-037 preserves empty middle slots while replacing a digit", () => {
    renderWithProviders(<VerificationFixture />);
    const input = (digit: number) => screen.getByRole("textbox", { name: `Secure code digit ${digit}` });
    fireEvent.change(input(3), { target: { value: "" } });
    expect(input(3)).toHaveValue("");
    expect(input(4)).toHaveValue("4");
    expect(screen.getByRole("button", { name: "Verify" })).toBeDisabled();
    fireEvent.change(input(3), { target: { value: "9" } });
    expect(screen.getByLabelText("Stored OTP")).toHaveTextContent("129456");
    expect(screen.getByRole("button", { name: "Verify" })).toBeEnabled();
  });

  it("AUTH-037 clears the previous digit without shifting later slots", () => {
    renderWithProviders(<VerificationFixture />);
    const input = (digit: number) => screen.getByRole("textbox", { name: `Secure code digit ${digit}` });
    fireEvent.change(input(3), { target: { value: "" } });
    fireEvent.keyDown(input(3), { key: "Backspace" });
    expect(input(2)).toHaveValue("");
    expect(input(4)).toHaveValue("4");
  });

  it("AUTH-043 AUTH-047 expires against wall time after a hidden tab resumes", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      vi.setSystemTime(new Date("2026-10-18T02:00:00Z"));
      renderWithProviders(<VerificationFixture expiresAt="2026-10-18T02:01:01Z" />);
      expect(screen.getByText(/01:01/)).toBeInTheDocument();
      act(() => {
        vi.setSystemTime(new Date("2026-10-18T02:02:00Z"));
        fireEvent(document, new Event("visibilitychange"));
      });
      expect(screen.getByRole("button", { name: "Verify" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Resend now" })).toBeEnabled();
    } finally {
      vi.useRealTimers();
    }
  });
  it.each([
    ["AUTH-038", "01234", false],
    ["AUTH-039", "012345", true],
    ["AUTH-040", "0123456", false],
    ["AUTH-041", "12a456", false],
  ] as const)("%s validates complete code %s", async (_id, code, valid) => {
    const submit = vi.fn();
    renderWithProviders(<VerificationFixture initialCode={code} submit={submit} />);
    const button = screen.getByRole("button", { name: "Verify" });
    if (valid) {
      expect(button).toBeEnabled();
      fireEvent.click(button);
      await waitFor(() => expect(submit).toHaveBeenCalledWith({ code }, expect.anything()));
    } else {
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(submit).not.toHaveBeenCalled();
    }
  });

  it.each([
    [1, "123456"],
    [4, "123123"],
  ] as const)("AUTH-036 pastes digits into slot %s without exceeding six positions", (position, expected) => {
    renderWithProviders(<VerificationFixture />);
    fireEvent.paste(screen.getByRole("textbox", { name: `Secure code digit ${position}` }), {
      clipboardData: { getData: () => "12a34567" },
    });
    expect(screen.getByLabelText("Stored OTP")).toHaveTextContent(expected);
  });

  it("AUTH-035 moves focus for typed digits and arrow keys", async () => {
    renderWithProviders(<VerificationFixture initialCode="" />);
    const input = (digit: number) => screen.getByRole("textbox", { name: `Secure code digit ${digit}` });
    fireEvent.change(input(1), { target: { value: "0" } });
    await waitFor(() => expect(input(2)).toHaveFocus());
    fireEvent.keyDown(input(2), { key: "ArrowLeft" });
    expect(input(1)).toHaveFocus();
    fireEvent.keyDown(input(1), { key: "ArrowRight" });
    expect(input(2)).toHaveFocus();
  });
});
