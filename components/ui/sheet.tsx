"use client";

import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useLockScroll } from "@/lib/hooks/useLockScroll";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);
  if (context === null) {
    throw new Error("Sheet components must be used within a Sheet");
  }
  return context;
}

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

type SheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const Sheet = ({
  open: controlledOpen,
  onOpenChange,
  children,
}: SheetProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (onOpenChange !== undefined) {
        onOpenChange(newOpen);
      }
      if (isControlled === false) {
        setInternalOpen(newOpen);
      }
    },
    [isControlled, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

type SheetTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onOpenChange(true);
    };

    if (asChild === true && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: (event: React.MouseEvent) => void;
        }>,
        {
          onClick: (event: React.MouseEvent) => {
            (
              children as React.ReactElement<{
                onClick?: (event: React.MouseEvent) => void;
              }>
            ).props.onClick?.(event);
            onOpenChange(true);
          },
        },
      );
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
SheetTrigger.displayName = "SheetTrigger";

type SheetCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild, children, onClick, className, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onOpenChange(false);
    };

    if (asChild === true && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: (event: React.MouseEvent) => void;
        }>,
        {
          onClick: (event: React.MouseEvent) => {
            (
              children as React.ReactElement<{
                onClick?: (event: React.MouseEvent) => void;
              }>
            ).props.onClick?.(event);
            onOpenChange(false);
          },
        },
      );
    }

    return (
      <button ref={ref} onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    );
  },
);
SheetClose.displayName = "SheetClose";

type SheetPortalProps = {
  children: React.ReactNode;
};

const SheetPortal = ({ children }: SheetPortalProps) => {
  const isMounted = useIsMounted();

  if (isMounted === false) {
    return null;
  }

  return createPortal(children, document.body);
};
SheetPortal.displayName = "SheetPortal";

type SheetOverlayProps = {
  className?: string;
};

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className }, ref) => {
    const { onOpenChange } = useSheetContext();

    return (
      <motion.div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80", className)}
        onClick={() => {
          onOpenChange(false);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    );
  },
);
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "bg-background fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const slideVariants = {
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

interface SheetContentProps extends VariantProps<typeof sheetVariants> {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, style }, ref) => {
    const { open } = useSheetContext();
    const sideValue = side ?? "right";
    const variants = slideVariants[sideValue];

    useLockScroll({ isLocked: open });

    return (
      <SheetPortal>
        <AnimatePresence>
          {open === true ? (
            <React.Fragment>
              <SheetOverlay />
              <motion.div
                ref={ref}
                className={cn(sheetVariants({ side }), className)}
                style={style}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                {children}
                <SheetClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </motion.div>
            </React.Fragment>
          ) : null}
        </AnimatePresence>
      </SheetPortal>
    );
  },
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-foreground text-lg font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
