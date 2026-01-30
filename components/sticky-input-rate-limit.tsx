"use client";

import { useEffect, useRef, useState } from "react";

import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import MessageLoadingBorderTrail from "./chat/message-loading-border-trail";

type Props = {
  isLoading: boolean;
  onSubmit: (message: string) => void;
  quickReplies?: string[];
  className?: string;
};

const StickyInputRateLimit: React.FC<Props> = ({
  isLoading,
  onSubmit,
  quickReplies,
  className,
}) => {
  const [isSticky, setIsSticky] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current;

    if (cachedRef === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(entry.intersectionRatio < 1),
      { threshold: 1 },
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky bottom-px z-40 -mx-2 pb-4 transition-all duration-300 ease-out md:pb-2",
        isSticky === false ? "mx-0" : undefined,
        className,
      )}
    >
      <div
        className={cn(
          "border-input bg-muted relative w-full overflow-hidden rounded-lg border py-3 md:py-4",
          "shadow-2xl transition-shadow",
          isSticky === false ? "shadow-none" : undefined,
        )}
      >
        {typeof quickReplies !== "undefined" && quickReplies.length > 0 ? (
          <div
            className={cn(
              "flex gap-1 overflow-x-auto px-3 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] md:px-4 [&::-webkit-scrollbar]:hidden",
              isLoading === true ? "z-0 opacity-50" : undefined,
            )}
          >
            {quickReplies.map((reply) => {
              return (
                <button
                  key={reply}
                  className="shrink-0 rounded-full bg-zinc-200 px-2 py-1 transition-colors enabled:hover:bg-zinc-300 disabled:cursor-not-allowed dark:bg-zinc-900 dark:enabled:hover:bg-zinc-950"
                  onClick={() => onSubmit(reply)}
                  disabled={isLoading}
                  type="button"
                >
                  <p className="line-clamp-1 text-xs">{reply}</p>
                </button>
              );
            })}
          </div>
        ) : null}

        <section
          className={cn(
            "flex flex-col px-3 md:px-4",
            typeof quickReplies !== "undefined" && quickReplies.length > 0
              ? "mt-2"
              : undefined,
          )}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-yellow-500" />
            </span>
            <h2 className="font-bold">Serveur actuellement surchargé !</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Continuez avec les questions suggérées ou{" "}
            <span className="font-bold">connectez-vous</span> pour poser vos
            propres questions.
          </p>
          <LoginButton
            isAuthenticated={false}
            noUserChildren={
              <Button size="sm" className="mt-2">
                Se connecter
              </Button>
            }
          />
        </section>

        {isLoading === true ? <MessageLoadingBorderTrail /> : null}
      </div>
    </div>
  );
};

export default StickyInputRateLimit;
