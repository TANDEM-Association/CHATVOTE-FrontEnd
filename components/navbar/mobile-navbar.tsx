"use client";

import React, { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "motion/react";

import { useLockScroll } from "@/lib/hooks/useLockScroll";
import { type UserDetails } from "@/lib/utils";

import MobileNavbarItems from "./mobile-navbar-items";

type Props = {
  userDetails?: UserDetails;
};

function subscribe() {
  return () => {};
}

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const MobileNavbar = ({ userDetails }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useIsMounted();

  useLockScroll({ isLocked: isOpen });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <button
        className="group hover:bg-muted absolute inset-y-0 right-0 my-auto flex size-8 flex-col items-end justify-center gap-1 rounded-md p-2 transition-colors md:hidden"
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        onClick={handleToggle}
      >
        <div className="bg-foreground h-[2px] w-4 rounded-full transition-all duration-300 group-data-[state=open]:translate-y-[3px] group-data-[state=open]:rotate-45" />
        <div className="bg-foreground h-[2px] w-5 rounded-full transition-all duration-300 group-data-[state=open]:w-4 group-data-[state=open]:translate-y-[-3px] group-data-[state=open]:-rotate-45" />
      </button>

      {isMounted === true
        ? createPortal(
            <AnimatePresence>
              {isOpen === true ? (
                <React.Fragment>
                  <motion.div
                    className="bg-background/80 fixed inset-0 top-(--header-height) z-50 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClose}
                    aria-hidden="true"
                  />

                  <motion.div
                    className="bg-background fixed inset-x-0 top-[calc(var(--header-height)-1px)] bottom-0 z-50 flex flex-col items-center justify-center md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                  >
                    <MobileNavbarItems
                      userDetails={userDetails}
                      mobileClose={handleClose}
                    />
                  </motion.div>
                </React.Fragment>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
};

export default MobileNavbar;
