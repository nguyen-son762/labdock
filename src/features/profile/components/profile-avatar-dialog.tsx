"use client";

import { DocumentUpload, Gallery, Refresh2, Trash } from "iconsax-reactjs";
import { useRef, useState, type DragEvent, type ReactNode } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getApiErrorMessage } from "@/lib/api-error";

import { useUpdateAvatarMutation } from "../api/use-update-avatar-mutation";

const MAX_FILE_SIZE = 1024 * 1024;
const acceptedTypes = new Set(["image/jpeg", "image/png"]);

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read this image."));
    reader.readAsDataURL(file);
  });
}

export function ProfileAvatarDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [validationError, setValidationError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const updateAvatar = useUpdateAvatarMutation();

  async function selectFile(nextFile: File | undefined) {
    setValidationError(undefined);
    updateAvatar.reset();
    if (!nextFile) return;
    if (!acceptedTypes.has(nextFile.type)) return setValidationError("Upload a PNG or JPG image.");
    if (nextFile.size > MAX_FILE_SIZE) return setValidationError("Profile picture must be 1MB or smaller.");
    try {
      setPreview(await readAsDataUrl(nextFile));
      setFile(nextFile);
    } catch (error) {
      setValidationError(getApiErrorMessage(error));
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void selectFile(event.dataTransfer.files[0]);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setFile(undefined);
      setPreview(undefined);
      setValidationError(undefined);
      updateAvatar.reset();
    }
  }

  function handleSave() {
    if (!preview) return;
    updateAvatar.mutate(preview, { onSuccess: () => setOpen(false) });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent hideClose className="max-w-[480px] gap-6 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Change profile picture</DialogTitle>
          <DialogDescription>Upload profile avatar for your account</DialogDescription>
        </DialogHeader>
        {validationError ? <Alert>{validationError}</Alert> : null}
        {updateAvatar.isError ? <Alert>{getApiErrorMessage(updateAvatar.error)}</Alert> : null}
        <div
          className="rounded-lg border border-[#c8d0d9] bg-white px-6 py-4 text-center"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#f5f7f8] text-[#73798f]">
            <DocumentUpload className="size-5" aria-hidden="true" />
          </span>
          <div className="mt-3 flex flex-wrap justify-center gap-1 text-sm text-[#73798f]">
            <Button
              type="button"
              variant="ghost"
              className="h-auto p-0 font-normal text-[#164990]"
              onClick={() => inputRef.current?.click()}
            >
              Click to upload
            </Button>
            <span>or drag and drop</span>
          </div>
          <p className="mt-1 text-xs text-[#b1bac8]">PNG or JPG - Max 1MB</p>
          <Input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="sr-only"
            aria-label="Choose profile picture"
            onChange={(event) => void selectFile(event.target.files?.[0])}
          />
        </div>
        {file ? (
          <div className="rounded-lg border border-[#5965b3] p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f0f1fb] text-[#5965b3]">
                <Gallery className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#051a50]">{file.name}</p>
                <p className="text-sm text-[#73798f]">{Math.ceil(file.size / 1024)} KB</p>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={100} aria-label="Upload complete" />
                  <span className="text-sm text-[#051a50]">100%</span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 text-red-600"
                aria-label="Remove image"
                onClick={() => {
                  setFile(undefined);
                  setPreview(undefined);
                }}
              >
                <Trash className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ) : null}
        <DialogFooter className="grid grid-cols-2 sm:grid-cols-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[#c8d0d9] font-normal text-[#051a50]"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="brand" disabled={!preview || updateAvatar.isPending} onClick={handleSave}>
            {updateAvatar.isPending ? <Refresh2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {updateAvatar.isPending ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
