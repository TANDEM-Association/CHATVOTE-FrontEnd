"use client";

import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { type UserDetails } from "@/lib/utils";

import MobileNavbarItems from "./mobile-navbar-items";

type Props = {
  userDetails?: UserDetails;
};

function MobileNavbar({ userDetails }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="group hover:bg-muted absolute inset-y-0 right-0 my-auto flex size-8 flex-col items-end justify-center gap-1 rounded-md p-2 transition-colors md:hidden"
          type="button"
          aria-label="Open menu"
        >
          <div className="bg-foreground h-[2px] w-4 rounded-full transition-all duration-300 group-data-[state=open]:translate-y-[3px] group-data-[state=open]:rotate-45" />
          <div className="bg-foreground h-[2px] w-5 rounded-full transition-all duration-300 group-data-[state=open]:w-4 group-data-[state=open]:translate-y-[-3px] group-data-[state=open]:-rotate-45" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-background/80 fixed inset-0 top-[var(--header-height)] z-50 md:hidden" />

        <Dialog.Content className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-x-0 top-[calc(var(--header-height)-1px)] bottom-0 z-50 flex flex-col items-center justify-center md:hidden">
          <VisuallyHidden>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Dialog Description</Dialog.Description>
          </VisuallyHidden>

          <MobileNavbarItems
            userDetails={userDetails}
            mobileClose={handleClose}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNavbar;
