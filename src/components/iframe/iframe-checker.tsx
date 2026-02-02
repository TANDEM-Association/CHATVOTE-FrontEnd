"use client";

import { useState, useSyncExternalStore } from "react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { useTenant } from "../providers/tenant-provider";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

function subscribe() {
  // Iframe status never changes, so no-op subscription
  return () => {};
}

function getIsInIframe() {
  return window.self !== window.top;
}

function getServerSnapshot() {
  return false;
}

const IframeChecker = () => {
  const t = useTranslations("common");
  const tenant = useTenant();
  const isInIframe = useSyncExternalStore(
    subscribe,
    getIsInIframe,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  const showAlert = isInIframe && !tenant && !dismissed;

  if (!showAlert) {
    return null;
  }

  return (
    <Modal
      isOpen={showAlert}
      onClose={() => setDismissed(true)}
      className="w-full max-w-md p-6"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {t("iframePermissionRequired")}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t("iframePermissionDescription")}{" "}
          <Link className="underline" href="mailto:contact@chatvote.org">
            contact@chatvote.org
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={() => setDismissed(true)}>
          {t("close")}
        </Button>
        <Button asChild>
          <Link href="mailto:contact@chatvote.org">{t("contactUs")}</Link>
        </Button>
      </div>
    </Modal>
  );
};

export default IframeChecker;
