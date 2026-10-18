import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/render-with-providers";
import { profileService } from "../api/profile.service";
import { profileFixture } from "../test/profile-fixture";
import { ProfileScreen } from "./profile-screen";

async function openAvatar() {
  vi.spyOn(profileService, "getCurrent").mockResolvedValue(profileFixture);
  const user = userEvent.setup({ applyAccept: false });
  renderWithProviders(<ProfileScreen />);
  await screen.findByRole("heading", { name: "QA Tester" });
  await user.click(screen.getByRole("button", { name: "Change profile picture" }));
  return user;
}
it.each([
  ["PRO-043", "image/png", 1024, true],
  ["PRO-044", "image/jpeg", 1048576, true],
  ["PRO-045", "image/png", 1048577, false],
  ["PRO-046", "image/gif", 1024, false],
  ["PRO-047", "image/svg+xml", 1024, false],
  ["PRO-048", "", 1024, false],
] as const)("%s validates avatar type %s and byte size %s", async (_id, type, size, valid) => {
  const update = vi.spyOn(profileService, "updateAvatar").mockResolvedValue(profileFixture);
  const user = await openAvatar();
  const file = new File([new Uint8Array(size)], "qa-avatar", { type });
  await user.upload(screen.getByLabelText("Choose profile picture"), file);
  const save = screen.getByRole("button", { name: "Save" });
  if (valid) {
    expect(save).toBeEnabled();
    await user.click(save);
    await waitFor(() => expect(update).toHaveBeenCalledWith(file, profileFixture));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  } else {
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(save).toBeDisabled();
    expect(update).not.toHaveBeenCalled();
  }
});
it("PRO-050 retains the selected file and current avatar when saving fails", async () => {
  vi.spyOn(profileService, "updateAvatar").mockRejectedValue(new Error("Profile save failed"));
  const user = await openAvatar();
  await user.upload(
    screen.getByLabelText("Choose profile picture"),
    new File(["image"], "retry.png", { type: "image/png" }),
  );
  await user.click(screen.getByRole("button", { name: "Save" }));
  expect(await screen.findByRole("alert")).toBeInTheDocument();
  expect(screen.getByText("retry.png")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
});
it("PRO-052 locks changes and dismissal while a single avatar save is pending", async () => {
  let finish: (() => void) | undefined;
  const update = vi.spyOn(profileService, "updateAvatar").mockImplementation(async () => {
    await new Promise<void>((resolve) => {
      finish = resolve;
    });
    return profileFixture;
  });
  const user = await openAvatar();
  await user.upload(
    screen.getByLabelText("Choose profile picture"),
    new File(["image"], "pending.png", { type: "image/png" }),
  );
  await user.click(screen.getByRole("button", { name: "Save" }));
  await user.keyboard("{Escape}");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
  expect(update).toHaveBeenCalledOnce();
  finish?.();
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});
