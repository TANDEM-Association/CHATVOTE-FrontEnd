"use client";

import { useState, useSyncExternalStore } from "react";

import Link from "next/link";

import { useTenant } from "../providers/tenant-provider";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDismissed(true);
    }
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Autorisation d&lsquo;intégration requise
          </AlertDialogTitle>
          <AlertDialogDescription>
            Pour utiliser chatvote dans un iFrame, veuillez nous contacter à
            l&lsquo;adresse e-mail{" "}
            <Link className="underline" href="mailto:info@chatvote.fr">
              info@chatvote.fr
            </Link>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
          <Button>
            <Link href="mailto:info@chatvote.fr">Contactez-nous</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IframeChecker;
