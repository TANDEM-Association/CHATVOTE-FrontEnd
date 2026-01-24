"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "./chat/logo";
import MessageLoadingBorderTrail from "./chat/message-loading-border-trail";
import { Button } from "./ui/button";

type Props = {
  isLoading: boolean;
  onSubmit: (message: string) => void;
  quickReplies?: string[];
  className?: string;
};

function StickyInput({ isLoading, onSubmit, quickReplies, className }: Props) {
  const [input, setInput] = useState("");
  const [isSticky, setIsSticky] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current;

    if (!cachedRef) return;

    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: 1 },
    );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, [ref]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleQuickReplyClick = (reply: string) => {
    onSubmit(reply);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "sticky -bottom-px -mx-2 pb-4 transition-all duration-300 ease-out md:pb-2",
        !isSticky && "mx-0",
        className,
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "border-input bg-chat-input relative mx-auto grid w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl transition-shadow duration-300 ease-out focus-within:border-zinc-300 md:shadow-none dark:focus-within:border-zinc-700",
          !isSticky && "shadow-none",
        )}
      >
        {isLoading && <MessageLoadingBorderTrail />}

        {typeof quickReplies !== "undefined" && quickReplies.length > 0 ? (
          <div className="flex gap-1 overflow-x-auto px-2 pt-2 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quickReplies?.map((reply) => {
              return (
                <button
                  key={reply}
                  className={cn(
                    "bg-muted enabled:hover:bg-muted/70 shrink-0 rounded-full px-2 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                  type="button"
                  onClick={() => handleQuickReplyClick(reply)}
                >
                  <p className="line-clamp-1 text-xs">{reply}</p>
                </button>
              );
            })}
          </div>
        ) : null}
        <Logo
          variant="small"
          className="border-border absolute bottom-2 left-2 size-8 translate-y-0 rounded-full border p-1"
        />
        <input
          className="bg-chat-input placeholder:text-muted-foreground w-full px-12 py-3 text-[16px] focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed"
          name="question"
          placeholder="Posez vos questions aux partis..."
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
        />
        <Button
          type="submit"
          className={cn(
            "bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/20 disabled:text-muted absolute right-2 bottom-2 flex size-8 translate-y-0 items-center justify-center rounded-full transition-colors",
          )}
          disabled={!input.length || isLoading}
        >
          <ArrowUp className="size-4 font-bold" />
        </Button>
      </form>
    </div>
  );
}

export default StickyInput;
