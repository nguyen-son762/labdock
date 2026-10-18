"use client";

import { Copy, CopySuccess } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CopyLinkButton() {
  const t = useTranslations("News");
  const [failedURL, setFailedURL] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyCurrentLink() {
    setFailedURL(null);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      resetTimer.current = setTimeout(() => setCopied(false), 2_000);
    } catch {
      setFailedURL(window.location.href);
      setCopied(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={copyCurrentLink}
        className="h-10 rounded-full border-[#c8d0d9] bg-white px-4 font-normal text-[#051a50]"
      >
        {copied ? (
          <CopySuccess className="size-5 text-[#147a55]" aria-hidden="true" />
        ) : (
          <Copy className="size-5" aria-hidden="true" />
        )}
        <span aria-live="polite">{t(copied ? "copied" : "copyLink")}</span>
      </Button>
      {failedURL ? (
        <Alert>
          {t("copyError")}
          <Input
            aria-label={t("linkToCopy")}
            value={failedURL}
            readOnly
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 bg-white"
          />
        </Alert>
      ) : null}
    </>
  );
}
